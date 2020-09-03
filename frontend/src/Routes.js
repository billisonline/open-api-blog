import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import {useAuth} from "./App";
import {useAuthRedirects} from "./hooks/useAuthRedirects";
import axios from "axios";

const loginRoute = "/login";
const homeRoute = "/blog";

export default function () {
  const {
    RedirectToLoginUnlessAuthenticated,
    RedirectHomeIfAuthenticated,
    loggedIn,
    logout,
  } = useAuthRedirects({parent: useAuth(), loginRoute, homeRoute});

  axios.defaults.withCredentials = true;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401)) {

        logout();
      } else (
        console.log({loggedIn, error})
      )

      return error;
    }
  );

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