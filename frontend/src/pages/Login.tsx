import React from "react";
import {useAuthContext} from "../App";
import {Redirect} from "react-router-dom";
import {validationRules as r} from "../utilities/validationRules";
import {makeAxios, preventingDefault} from "../utilities";
import {useFormValue, useFormValueSet} from "../hooks/useFormValue";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {AxiosPromise} from "axios";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Alert from "../components/Alert";

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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-12 w-auto"
                     src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                     alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                </div>
            </div>
        </div>
    );
}