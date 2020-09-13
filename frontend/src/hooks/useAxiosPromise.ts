import {AxiosPromise} from "axios";
import React, {useState} from "react";
import {AxiosResult, AxiosObject, makeAxiosResult, makeAxiosPendingResult, makeAxiosLoadingResult} from "../utilities/makeAxiosResult";

export interface PromiseMaker<T> {
    (): AxiosPromise<T>
}

interface UseAxiosPromiseSettings<Data, Content> {
    getContent?: (result: AxiosResult<Data>) => Content,
    onSuccess?: (result: AxiosResult<Data>, content: Content) => void,
    onError?: (result: AxiosResult<Data>) => void,
    onCompletion?: (result: AxiosResult<Data>) => void,
}

const useAxiosPromise = <Data, Content = Data>(promiseMaker: PromiseMaker<Data>, settings?: UseAxiosPromiseSettings<Data, Content>): [Content, AxiosResult<Data>, () => void] => {
    settings = settings ?? {};

    const [getContent, onSuccess, onError, onCompletion] = [
        settings.getContent ?? ((r: AxiosResult<Data>) => (r.data as unknown as Content)),
        settings.onSuccess ?? ((r: AxiosResult<Data>) => {}),
        settings.onError ?? ((r: AxiosResult<Data>) => {}),
        settings.onCompletion ?? ((r: AxiosResult<Data>) => {})
    ];

    const [result, setResult]: [AxiosResult<Data>, React.Dispatch<React.SetStateAction<AxiosResult<Data>>>] = useState(makeAxiosPendingResult<Data>());

    const handlePromise = (obj: AxiosObject<Data>) => {
        const result = makeAxiosResult(obj);

        setResult(result);

        if (result.failed) {
            onError(result);
        } else {
            onSuccess(result, getContent(result));
        }

        onCompletion(result);
    };

    const fetcher = () => {
        setResult(makeAxiosLoadingResult<Data>());

        promiseMaker().then(handlePromise).catch(handlePromise)
    }

    return [getContent(result), result, fetcher];
}

export {useAxiosPromise}