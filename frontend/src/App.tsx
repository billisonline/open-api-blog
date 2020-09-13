import React from 'react';
import './App.css';
import {useAuth, UseAuthResult, withLocalStorageUserPersistence} from "./hooks/useAuthContext"
import Routes from "./Routes";
import RedirectFromLocalhostToLoopbackIp from "./components/RedirectFromLocalhostToLoopbackIp";
import constate from "constate";

let AuthProvider, useAuthContext: () => UseAuthResult;

function App() {
    [AuthProvider, useAuthContext] = constate(useAuth);

    return (
        <>
            <RedirectFromLocalhostToLoopbackIp/>
            <AuthProvider {...withLocalStorageUserPersistence}>
                <Routes/>
            </AuthProvider>
        </>
    );
}

export {useAuthContext};

export default App;
