import axios, {AxiosError, AxiosInstance} from "axios";
import React, {DependencyList, EffectCallback, FormEventHandler, Fragment, useEffect, useState} from "react";

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

const useRepeatableEffect = (effect: EffectCallback, deps: DependencyList = []) => {
    const [count, setCount] = useState(0);

    const repeat = () => {setCount(count + 1)};

    useEffect(effect, [count, ...deps]);

    return repeat;
};

const useToggle = (initial: boolean = false): [boolean, () => void] => {
    const [enabled, setEnabled] = useState(initial);

    const toggle = () => {setEnabled(!enabled); console.log(!enabled)};

    return [enabled, toggle];
}

const truncate = (text: string, length: number): string => {
    return (text.length > length)? text.slice(0, length-3)+'...' : text;
}

export {
    makeAxios,
    preventingDefault,
    useRepeatableEffect,
    useToggle,
    truncate,
}