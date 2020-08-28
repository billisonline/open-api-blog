import React from 'react';
import './App.css';
import {useAuthContext, withLocalStorageUserPersistence} from "./hooks/useAuthContext"
import Routes from "./Routes";
import RedirectFromLocalhostToLoopbackIp from "./components/RedirectFromLocalhostToLoopbackIp";

const {useAuth, AuthProvider} = useAuthContext({...withLocalStorageUserPersistence});

function App() {
  return (
    <>
      <RedirectFromLocalhostToLoopbackIp />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export {useAuth};

export default App;
