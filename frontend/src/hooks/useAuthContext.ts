import {useEffect as _useEffect, useReducer as _useReducer} from "react";

interface PersistenceSettings {
    saveUser: (user: Object) => void,
    restoreUser: () => Object|null,
    clearUser: () => void,
}

export interface UseAuthResult {
    loggedIn: boolean,
    loggedOut: boolean,
    currentUser: Object|null,
    login: (user: Object) => void,
    logout: () => void,
}

interface AuthReducerState {
    loggedIn: boolean,
    currentUser: Object|null,
}

interface AuthReducerAction {
    type: 'login' | 'logout',
    user?: Object,
}

const useAuth = (settings: PersistenceSettings): UseAuthResult => {
    const {saveUser, restoreUser, clearUser} = settings;

    const [state, dispatch] = _useReducer(
        (state: AuthReducerState, action: AuthReducerAction): AuthReducerState => {
            switch (action.type) {
                case 'login':
                    if (state.loggedIn) {
                        console.log('logged in twice???');
                    }

                    saveUser(action.user ?? {});

                    return {
                        ...state,
                        loggedIn: true,
                        currentUser: action.user ?? {},
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

    const login = (user: Object) => dispatch({type: 'login', user});
    const logout = () => dispatch({type: 'logout'});

    _useEffect(() => {
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
}

const userKey = 'currentUser';

const withLocalStorageUserPersistence: PersistenceSettings = {
    saveUser: (user) => localStorage.setItem(userKey, JSON.stringify(user)),
    restoreUser: () => JSON.parse(localStorage.getItem(userKey) ?? 'null'),
    clearUser: () => localStorage.removeItem(userKey),
};

export {
    useAuth,
    withLocalStorageUserPersistence,
};
