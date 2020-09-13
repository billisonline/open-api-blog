import axios, {AxiosError, AxiosInstance} from "axios";
import React, {FormEventHandler} from "react";

const makeAxios = (logoutCallback?: () => void): AxiosInstance => {
    const instance = axios.create({
        withCredentials: true,
        baseURL: 'http://127.0.0.1:8000',
    });

    const isUnauthenticatedError = (error: AxiosError): boolean => {
        return (error.response && (error.response.status === 401)) || false;
    }

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isUnauthenticatedError(error) && logoutCallback) {
                logoutCallback();
            }

            return error;
        }
    );

    return instance;
}

const preventingDefault: (callback: (event: React.FormEvent) => void) => FormEventHandler = (callback) => {
    return (event) => {
        event.preventDefault();

        callback(event);
    };
};

export {
    makeAxios,
    preventingDefault,
}