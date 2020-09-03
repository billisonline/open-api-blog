import {Redirect} from "react-router-dom";
import React from "react";

// Consume the useAuth hook (created by useAuthContext) and produce a new hook with React Router elements to
// automatically redirect based on login state
const useAuthRedirects = ({parent, loginRoute, homeRoute}) => {
  const {loggedIn, loggedOut} = parent;

  return {
    ...parent,
    RedirectToLoginUnlessAuthenticated: () => loggedOut && <Redirect to={loginRoute} />,
    RedirectHomeIfAuthenticated: () => loggedIn && <Redirect to={homeRoute} />,
  };
};

export {useAuthRedirects};