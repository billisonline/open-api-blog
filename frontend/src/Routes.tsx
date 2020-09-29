import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import {useAuthContext} from "./App";
import {useAuthRedirects} from "./hooks/useAuthRedirects";
import {makeUseAuthPermissions, UseAuthPermissionsHook} from "./hooks/useAuthPermissions";
import {AppPermissions, policies} from "./utilities/policies";
import {UserData} from "./utilities/apiTypes";

const loginRoute = "/login";
const homeRoute = "/blog";

let useAuthPermissions: UseAuthPermissionsHook<UserData, AppPermissions>;

export default function () {
  const {
    RedirectToLoginUnlessAuthenticated,
    RedirectHomeIfAuthenticated,
  } = useAuthRedirects(useAuthContext(), {loginRoute, homeRoute});

  useAuthPermissions = makeUseAuthPermissions(policies);

  return (
    <Router>
      <Route exact path="/">
        <RedirectToLoginUnlessAuthenticated />
        <RedirectHomeIfAuthenticated />
      </Route>
      <Route path={loginRoute}>
        <RedirectHomeIfAuthenticated />
        <Login />
      </Route>
      <Route path={homeRoute}>
        <RedirectToLoginUnlessAuthenticated />
        <Blog />
      </Route>
    </Router>
  );
}

export {useAuthPermissions}