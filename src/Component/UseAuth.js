import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './Context/Sign_In_Context';
import { ADMIN_MAIL } from '../constants';
export function PrivateRoute({ children, ...rest }) {
  const [user] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export function AdminRoute({ children, ...rest }) {
  const [user] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.email === ADMIN_MAIL ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
