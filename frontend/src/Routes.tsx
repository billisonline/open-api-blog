import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import {useAuthContext} from "./App";
import {useAuthRedirects} from "./hooks/useAuthRedirects";
import {makeUseAuthPermissions, UseAuthPermissionsHook} from "./hooks/useAuthPermissions";
import {AppPermissions, policies} from "./utilities/policies";
import UpdatePost from "./pages/UpdatePost";
import ShowPost from "./pages/ShowPost";
import CreatePost from "./pages/CreatePost";
import {User} from "./api";

const loginRoute = "/login";
const homeRoute = "/blog";
const createPostRoute = "/blog/create";

let useAuthPermissions: UseAuthPermissionsHook<User, AppPermissions>;

export default function () {
    const {
        RedirectToLoginUnlessAuthenticated,
        RedirectHomeIfAuthenticated,
        authReady,
    } = useAuthRedirects(useAuthContext(), {loginRoute, homeRoute});

    useAuthPermissions = makeUseAuthPermissions(policies);

    if (!authReady) {return <></>;}

    return (
        <Router>

            <Switch>
                <Route exact path="/">
                    <RedirectHomeIfAuthenticated/>
                    <Login/>
                </Route>
                <Route exact path={loginRoute}>
                    <RedirectHomeIfAuthenticated/>
                    <Login/>
                </Route>
                <Route exact path={homeRoute}>
                    <RedirectToLoginUnlessAuthenticated/>
                    <Blog/>
                </Route>
                <Route exact path={"/blog/create"}>
                    {/*<RedirectToLoginUnlessAuthenticated />*/ /*todo: why?*/}
                    <CreatePost/>
                </Route>
                <Route exact path={"/blog/:id/edit"}>
                    {/*<RedirectToLoginUnlessAuthenticated />*/ /*todo: why?*/}
                    <UpdatePost/>
                </Route>
                <Route exact path={"/blog/:id"}>
                    {/*<RedirectToLoginUnlessAuthenticated />*/ /*todo: why?*/}
                    <ShowPost/>
                </Route>
            </Switch>
        </Router>
    );
}

export {useAuthPermissions}