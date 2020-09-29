import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import {useAuthContext} from "./App";
import {useAuthRedirects} from "./hooks/useAuthRedirects";
import {makeUseAuthPermissions, UseAuthPermissionsHook} from "./hooks/useAuthPermissions";
import {AppPermissions, policies} from "./utilities/policies";
import {UserData} from "./utilities/apiTypes";
import WritePost from "./pages/WritePost";
import UpdatePost from "./pages/UpdatePost";

const loginRoute = "/login";
const homeRoute = "/blog";
const createPostRoute = "/blog/create";

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
      <Route exact path={loginRoute}>
        <RedirectHomeIfAuthenticated />
        <Login />
      </Route>
      <Route exact path={homeRoute}>
        <RedirectToLoginUnlessAuthenticated />
        <Blog />
      </Route>
      <Route exact path={createPostRoute}>
        {/*<RedirectToLoginUnlessAuthenticated />*/ /*todo: why?*/}
        <WritePost />
      </Route>
      <Route path={"/blog/:id/edit"}>
        {/*<RedirectToLoginUnlessAuthenticated />*/ /*todo: why?*/}
        <UpdatePost />
      </Route>
    </Router>
  );
}

export {useAuthPermissions}