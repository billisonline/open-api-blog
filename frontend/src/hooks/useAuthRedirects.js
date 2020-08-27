import {Redirect} from "react-router-dom";
import React from "react";

// Consume the useAuth hook (created by useAuthContext) and produce a new hook with React Router elements to
// automatically redirect based on login state
const makeUseAuthRedirects = ({useAuth: _useAuth, makeRedirectElement, loginRoute, homeRoute}) => {
  return () => {
    const {loggedIn, loggedOut} = _useAuth();

    return [
      () => loggedOut && makeRedirectElement(loginRoute),
      () => loggedIn && makeRedirectElement(homeRoute),
    ];
  }
};

const withReactRouterRedirects = {
  makeRedirectElement: (route) => <Redirect to={route} />,
};

export {makeUseAuthRedirects, withReactRouterRedirects};