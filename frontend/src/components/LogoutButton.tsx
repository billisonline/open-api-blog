import React from "react";
import {useAuthContext} from "../App";
import {useAxiosRequest} from "../hooks/useAxiosRequest";
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

    const [, logoutState, attemptLogout] = useAxiosRequest({
        makeRequestPromise: logoutPromise,
        onCompletion: () => logout(),
    });

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