import {Redirect} from "react-router-dom";
import * as React from "react";
import {UseAuthResult} from "./useAuth";

interface AuthRedirectsSettings {
    loginRoute: string,
    homeRoute: string,
}

interface UseAuthRedirectsResult<T> extends UseAuthResult<T> {
    RedirectToLoginUnlessAuthenticated: React.FunctionComponent,
    RedirectHomeIfAuthenticated: React.FunctionComponent,
}

// Consume the useAuth hook (created by useAuthContext) and produce a new hook with React Router elements to
// automatically redirect based on login state
const useAuthRedirects: <T>(parent: UseAuthResult<T>, settings: AuthRedirectsSettings) => UseAuthRedirectsResult<T> = (parent, settings) => {
    const {loggedIn, loggedOut} = parent;
    const {loginRoute, homeRoute} = settings;

    return {
        ...parent,
        RedirectToLoginUnlessAuthenticated: () => <>{loggedOut && <Redirect to={loginRoute}/>}</>,
        RedirectHomeIfAuthenticated: () => <>{loggedIn && <Redirect to={homeRoute}/>}</>,
    };
};

export {useAuthRedirects};