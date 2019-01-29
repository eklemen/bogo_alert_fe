import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {withService} from '../Context/withService';

const PrivateRoute = ({ component: Component, user, cookies, ...rest }) => {
  const token = cookies.get('bogoUserToken');
  return (
    <Route
      {...rest}
      render={props =>
        user.data.token || token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default withService(withCookies(PrivateRoute));
