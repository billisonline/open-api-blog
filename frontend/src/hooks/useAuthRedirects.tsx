import {Redirect} from "react-router-dom";
import * as React from "react";
import {UseAuthResult} from "./useAuthContext";

interface AuthRedirectsSettings {
    loginRoute: string,
    homeRoute: string,
}

interface UseAuthRedirectsResult extends UseAuthResult {
    RedirectToLoginUnlessAuthenticated: React.FunctionComponent,
    RedirectHomeIfAuthenticated: React.FunctionComponent,
}

// Consume the useAuth hook (created by useAuthContext) and produce a new hook with React Router elements to
// automatically redirect based on login state
const useAuthRedirects = (parent: UseAuthResult, settings: AuthRedirectsSettings): UseAuthRedirectsResult => {
    const {loggedIn, loggedOut} = parent;
    const {loginRoute, homeRoute} = settings;

    return {
        ...parent,
        RedirectToLoginUnlessAuthenticated: () => <>{loggedOut && <Redirect to={loginRoute}/>}</>,
        RedirectHomeIfAuthenticated: () => <>{loggedIn && <Redirect to={homeRoute}/>}</>,
    };
};

export {useAuthRedirects};