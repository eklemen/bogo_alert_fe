import React from 'react';
import {withCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';
import {withService} from "../Context/withService";

class Logout extends React.Component {
  componentDidMount() {
    const {_clear, cookies} = this.props;
    _clear();
    cookies.remove('bogoUserToken', { path: '/' });
  }

  render() {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    )
  }
}

export default withService(withCookies(Logout));
