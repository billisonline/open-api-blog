import {useEffect as _useEffect, useReducer as _useReducer} from "react";

export interface PersistenceSettings<T> {
    saveUser: (user: T) => void,
    restoreUser: () => T|null,
    clearUser: () => void,
}

export interface UseAuthResult<T> {
    loggedIn: boolean,
    loggedOut: boolean,
    currentUser: T|null,
    login: (user: T) => void,
    logout: () => void,
}

export interface UseAuthResultLoggedIn<T> extends UseAuthResult<T> {
    loggedIn: true,
    currentUser: T,
}

interface AuthReducerState<T> {
    loggedIn: boolean,
    currentUser: T|null,
}

interface AuthReducerAction<T> {
    type: 'login' | 'logout',
    user: T|null,
}

const useAuth = <T>(settings: PersistenceSettings<T>): UseAuthResult<T> => {
    const {saveUser, restoreUser, clearUser} = settings;

    const [state, dispatch] = _useReducer(
        (state: AuthReducerState<T>, action: AuthReducerAction<T>): AuthReducerState<T> => {
            const [user, type] = [
                action.user ?? null as T|null,
                action.type,
            ]

            switch (type) {
                case 'login':
                    if (state.loggedIn) {
                        console.log('logged in twice???');
                    }

                    if (user === null) {
                        throw new Error();
                    }

                    saveUser(user);

                    return {
                        ...state,
                        loggedIn: true,
                        currentUser: user,
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
            currentUser: null,
        }
    );

    const login = (user: T) => dispatch({type: 'login', user});
    const logout = () => dispatch({type: 'logout', user: null});

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

const withLocalStorageUserPersistence = {
    saveUser: (user: any) => localStorage.setItem(userKey, JSON.stringify(user)),
    restoreUser: () => JSON.parse(localStorage.getItem(userKey) ?? 'null'),
    clearUser: () => localStorage.removeItem(userKey),
};

export {
    useAuth,
    withLocalStorageUserPersistence,
};
