import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import {useAuthContext} from "./App";
import {useAuthRedirects} from "./hooks/useAuthRedirects";

const loginRoute = "/login";
const homeRoute = "/blog";

export default function () {
  const {
    RedirectToLoginUnlessAuthenticated,
    RedirectHomeIfAuthenticated,
  } = useAuthRedirects(useAuthContext(), {loginRoute, homeRoute});

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