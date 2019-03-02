import React from 'react';
import axios from 'axios';
import {withCookies} from 'react-cookie';

export const ServiceContext = React.createContext();
axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class ContextProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {error: null, data: {}, fetching: false},
      storesList: {error: null, data: {}, fetching: false},
      typeAhead: {error: null, data: null, fetching: false}
    };
    this.baseState = this.state;
  }

  query = ({name, url, reqObj = null, method = 'post', hotSwap = false}) => {

    if (!hotSwap) {
      this.setState({
        [name]: {
          ...this.state[name],
          fetching: true,
        }
      });
    }
    return axios({url, data: reqObj, method})
      .then(({data}) => {
        let rData = data;
        if (hotSwap) {
          rData = {...this.state[name], ...data}
        }
        this.setState({
          [name]: {
            ...this.state[name],
            fetching: false,
            data: rData,
            error: null
          }
        });
        return data;
      })
      .catch(error => {
        this.setState({
          [name]: {
            ...this.state[name],
            fetching: false,
            data: {},
            error: error.response
          }
        });
        return error;
      });
  };

  _clear = () => {
    this.setState(this.baseState)
  };

  _getUser = () => (
    this.query({name: 'user', url: '/api/user', method: 'get'})
  );

  _registerUser = async (user) => (
    this.query({name: 'user', reqObj: user, url: '/register'})
  );

  _login = (user) => (
    this.query({name: 'user', reqObj: user, url: '/login'})
  );

  _getStoresByZip = (zipCode) => {
    return this.query({name: 'storesList', reqObj: {zipCode}, url:'api/stores'})
  };

  _updateStore = (store, hotSwap = false) => {
    const reqObj = {
      storeNum: store.WASTORENUM,
      name: store.NAME,
      address: store.ADDR,
      city: store.CITY,
      state: store.STATE,
      lat: store.CLAT,
      long: store.CLON,
    };
    return (
      this.query({name: 'user', reqObj, url: '/api/user/store', hotSwap})
    );
  };

  _updateUserTerms = (terms) => (
    this.query({name: 'user', reqObj: {terms}, url: '/api/terms'})
  );

  _getTypeAhead = (term) => (
    this.query({name: 'typeAhead', method: 'get', url: `/api/terms/search/${term}`})
  );

  render() {
    return (
      <ServiceContext.Provider value={{
        ...this.state,
        _registerUser: this._registerUser,
        _login: this._login,
        _getUser: this._getUser,
        _getStoresByZip: this._getStoresByZip,
        _updateStore: this._updateStore,
        _updateUserTerms: this._updateUserTerms,
        _clear: this._clear,
        _getTypeAhead: this._getTypeAhead
      }}>
        {this.props.children}
      </ServiceContext.Provider>
    )
  }
}

export default withCookies(ContextProvider);