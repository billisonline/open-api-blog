import React from "react";
import {useAuthContext} from "../App";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {AxiosPromise} from "axios";
import {makeAxios} from "../utilities";

const LogoutButton = () => {
    const {logout, loggedOut} = useAuthContext();

    const axios = makeAxios();

    const logoutPromise = (): AxiosPromise =>
        new Promise((resolve, reject) => (
            axios.get('/sanctum/csrf-cookie')
                .then(() => {
                    axios.post('/api/logout')
                        .then(resolve)
                        .catch(reject)
                })
        ));

    const [, logoutState, attemptLogout] = useAxiosPromise(
        logoutPromise,
        {
            onCompletion: (r) => logout(),
        }
    );

    return (
        <button onClick={attemptLogout}
                disabled={loggedOut || logoutState.loading}
        >
            Logout
        </button>
    )
};

export {LogoutButton}

//