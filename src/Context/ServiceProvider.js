import React from 'react';
import axios from 'axios';

export const ServiceContext = React.createContext();
axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class ContextProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      userAuth: {error: null, data: {}, fetching: false}
    }
  }

  query = ({name, url, reqObj = null, method = 'post'}) => {
    this.setState({
      [name]: {
        ...this.state[name],
        fetching: true,
      }
    });
    return axios({url, data: reqObj, method})
      .then(({data}) => {
        console.log('good');
        this.setState({
          [name]: {
            ...this.state[name],
            fetching: false,
            data,
            error: null
          }
        });
      })
      .catch(error => {
        this.setState({
          [name]: {
            ...this.state[name],
            fetching: false,
            data: {},
            error: new Error(error)
          }
        });
      });
  };

  _registerUser = (user) => (
    this.query({name: 'userAuth', reqObj: user, url: '/register'})
  );

  _login = (user) => (
    this.query({name: 'userAuth', reqObj: user, url: '/login'})
  );

  render() {
    console.log(this.state);
    return (
      <ServiceContext.Provider value={{
        ...this.state,
        _registerUser: this._registerUser,
        _login: this._login
      }}>
        {this.props.children}
      </ServiceContext.Provider>
    )
  }
}