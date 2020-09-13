import React from "react";
import {useAuthContext} from "../App";
import {Redirect} from "react-router-dom";
import {validationRules as r} from "../utilities/validationRules";
import {makeAxios, preventingDefault} from "../utilities";
import {useFormValue, useFormValueSet} from "../hooks/useFormValue";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {AxiosPromise} from "axios";

interface UserData {
    id: number;
    email: string;
    name: string;
}

interface UserResponse {
    data: UserData
}

export default function () {
    const authContext = useAuthContext();

    const axios = makeAxios();

    const loginPromise = (email: string, password: string): AxiosPromise<UserResponse> =>
        new Promise((resolve, reject) => {
            axios.get('/sanctum/csrf-cookie')
                .then(() => {
                    axios.post('/api/authenticate', {email, password})
                        .then(() => {
                            axios.get('/api/users/me')
                                .then(resolve)
                                .catch(reject)
                        })
                })
        });

    const email = useFormValue({
        initial: '',
        name: 'email',
        rules: [r.required, r.email]
    });

    const password = useFormValue({
        initial: '',
        name: 'password',
        rules: [r.required, r.minLength(8)]
    });

    const [anyInvalid, checkAllBeforeSubmit] = useFormValueSet(email, password);

    const [, loginState, attemptLogin] = useAxiosPromise(
        () => loginPromise(email.value, password.value),
        {
            getContent: (result) => result.data.data,
            onSuccess: (_, user: UserData) => authContext.login(user),
        });

    return (
        <form onSubmit={preventingDefault(() => checkAllBeforeSubmit() && attemptLogin())}>
            {loginState.loading && <p>🌀</p>}

            {loginState.loaded && <Redirect to="/blog"/>}

            {loginState.failed && <p>Invalid username or password!</p>}

            Email:
            <input
                name="email"
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
            />
            <br/>

            {email.validationErrors.map((error, i) =>
                <p key={i} style={{color: "red"}}>{error}</p>
            )}

            Password:
            <input
                name="password"
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onBlur}
            />
            <br/>

            {password.validationErrors.map((error, i) =>
                <p key={i} style={{color: "red"}}>{error}</p>
            )}

            <button type="submit" disabled={anyInvalid || loginState.loading}>weklwkefuw</button>
        </form>
    );
}