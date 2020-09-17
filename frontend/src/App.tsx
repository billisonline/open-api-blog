import React from 'react';
import './App.css';
import {PersistenceSettings, useAuth as _useAuth, UseAuthResult, withLocalStorageUserPersistence} from "./hooks/useAuth"
import Routes from "./Routes";
import RedirectFromLocalhostToLoopbackIp from "./components/RedirectFromLocalhostToLoopbackIp";
import constate from "constate";
import {UserData} from "./utilities/apiTypes";

let AuthProvider, useAuthContext: () => UseAuthResult<UserData>;

function App() {
    [AuthProvider, useAuthContext] = constate((settings: PersistenceSettings<UserData>) => _useAuth(settings));

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
