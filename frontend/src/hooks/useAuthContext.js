import React, {createContext, useContext, useEffect, useReducer} from "react";

const useAuthContext = ({
  saveUser,
  restoreUser,
  clearUser,
}) => {
  const authContext = createContext();

  const useAuth = () => useContext(authContext);

  const useAuthReducer = () => {
    const [state, dispatch] = useReducer(
      (state, action) => {
        switch (action.type) {
          case 'login':
            if (state.loggedIn) {
              console.log('logged in twice???');
            }

            saveUser(action.user);

            return {
              ...state,
              loggedIn: true,
              currentUser: action.user,
            };
          case 'logout':
            if (!state.loggedIn) {
              console.log('logged out twice???');
            }

            clearUser();

            return {
              ...state,
              loggedIn: false,
              currentUser: null,
            };
          default:
            throw new Error();
        }
      },
      {
        loggedIn: false,
        currentUser: {},
      }
    );

    const login = (user) => dispatch({type: 'login', user});
    const logout = () => dispatch({type: 'logout'});

    useEffect(() => {
      const restoredUser = restoreUser();

      if (restoredUser) {login(restoredUser);}
    }, [])

    return {
      loggedIn: state.loggedIn,
      loggedOut: !state.loggedIn,
      currentUser: state.currentUser,
      login,
      logout,
    }
  };

  const AuthProvider = ({ children }) => {
    return <authContext.Provider value={useAuthReducer()}>{children}</authContext.Provider>;
  };

  return {useAuth, AuthProvider};
}

const userKey = 'currentUser';

const withLocalStorageUserPersistence = {
  saveUser: (user) => localStorage.setItem(userKey, JSON.stringify(user)),
  restoreUser: () => JSON.parse(localStorage.getItem(userKey)),
  clearUser: () => localStorage.removeItem(userKey),
};

export {
  useAuthContext,
  withLocalStorageUserPersistence,
};