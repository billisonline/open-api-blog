import React from 'react';
import './App.css';
import {useAuthContext, withLocalStorageUserPersistence} from "./hooks/useAuthContext"
import Routes from "./Routes";

const {useAuth, AuthProvider} = useAuthContext({...withLocalStorageUserPersistence});

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export {useAuth};

export default App;
