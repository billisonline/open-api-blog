import React from "react";
import {useAuthContext} from "../App";
import {Redirect} from "react-router-dom";
import {validationRules as r} from "../utilities/validationRules";
import {makeAxios, preventingDefault} from "../utilities";
import {useFormValue, useFormValueSet} from "../hooks/useFormValue";
import {useAxiosRequest} from "../hooks/useAxiosRequest";
import {AxiosInstance, AxiosPromise} from "axios";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import LoginPanel from "../components/LoginPanel";
import {CsrfCookieApiFp, InlineResponse200, User, UserApiFp} from "../api";

export default function () {
    const {login} = useAuthContext();

    const axios = makeAxios();

    const makeOpenApiRequest: <T>(req: (axios: AxiosInstance, basePath: string) => T) => T = (req) => {
        return req(axios, axios.defaults.baseURL!);
    };

    const [csrfCookieGet, userAuthenticate, userShowCurrent] = [
        CsrfCookieApiFp().csrfCookieGet,
        UserApiFp().userAuthenticate,
        UserApiFp().userShowCurrent,
    ];

    const loginPromise = (email: string, password: string): AxiosPromise<InlineResponse200> =>
        new Promise((resolve, reject) => {
            csrfCookieGet().then(makeOpenApiRequest).then(() => {
                userAuthenticate({email, password}).then(makeOpenApiRequest).then(() => {
                    userShowCurrent().then(makeOpenApiRequest)
                        .then(resolve)
                        .catch(reject);
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

    const [, loginState, attemptLogin] = useAxiosRequest({
        makeRequestPromise: () => loginPromise(email.value, password.value),
        getContent: (result) => result.data.data!,
        onSuccess: (_, user: User) => login(user),
    });

    return (
        <LoginPanel>
            <form onSubmit={preventingDefault(() => checkAllBeforeSubmit() && attemptLogin())}
                  className="space-y-2">
                {loginState.loaded && <Redirect to="/blog"/>}

                {loginState.failed && <Alert text="Incorrect username or password!" spaceAfter="medium" />}

                <FormInput name="email"
                           label="Email"
                           placeholder="you@example.com"
                           value={email.value}
                           onChange={email.onChange}
                           onBlur={email.onBlur}
                           errors={email.validationErrors}
                />
                <FormInput name="password"
                           label="Password"
                           value={password.value}
                           onChange={password.onChange}
                           onBlur={password.onBlur}
                           errors={password.validationErrors}
                           type="password"
                />

                <Button full
                        type="submit"
                        text="Submit"
                        loading={loginState.loading}
                        disabled={anyInvalid}
                />
            </form>
        </LoginPanel>
    );
}