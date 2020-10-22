import {AxiosPromise} from "axios";
import React, {useState} from "react";
import {AxiosResult, AxiosObject, makeAxiosResult, makeAxiosPendingResult, makeAxiosLoadingResult} from "../utilities/makeAxiosResult";

interface UseAxiosRequestSettings<Data, Content, Params> {
    makeRequestPromise: (params: Params) => AxiosPromise<Data>,
    getContent?: (result: AxiosResult<Data>) => Content,
    onSuccess?: (result: AxiosResult<Data>, content: Content) => void,
    onError?: (result: AxiosResult<Data>) => void,
    onCompletion?: (result: AxiosResult<Data>) => void,
}

type UseAxiosRequestResult<Data, Content, Params> = [
    Content, AxiosResult<Data>, (params?: Params) => void
];

const useAxiosRequest = <Data, Content = Data, Params = any>(settings: UseAxiosRequestSettings<Data, Content, Params>)
    : UseAxiosRequestResult<Data, Content, Params> =>
{
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

    const fetcher = (params?: Params) => {
        params = params ?? {} as Params;

        setResult(makeAxiosLoadingResult<Data>());

        settings.makeRequestPromise(params).then(handlePromise).catch(handlePromise)
    };

    return [getContent(result), result, fetcher];
}

export {useAxiosRequest}
