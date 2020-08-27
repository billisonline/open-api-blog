import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import {useAuth} from "./App";
import {makeUseAuthRedirects, withReactRouterRedirects} from "./hooks/useAuthRedirects";

const loginRoute = "/login";
const homeRoute = "/blog";

export default function () {
  const useAuthRedirects = makeUseAuthRedirects({
    useAuth,
    loginRoute,
    homeRoute,
    ...withReactRouterRedirects,
  });

  const [Protected, RedirectHomeIfLoggedIn] = useAuthRedirects();

  return (
    <Router>
      <Route exact path="/">
        <Protected />
        <RedirectHomeIfLoggedIn />
      </Route>
      <Route path={loginRoute}>
        <RedirectHomeIfLoggedIn />
        <Login />
      </Route>
      <Route path={homeRoute}>
        <Protected />
        <Blog />
      </Route>
    </Router>
  );
}