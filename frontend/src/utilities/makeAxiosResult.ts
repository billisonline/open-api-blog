import {AxiosError, AxiosPromise, AxiosResponse} from "axios";

export interface AxiosResult<T> {
    pending: boolean,
    loading: boolean,
    loaded: boolean,
    failed: boolean,
    errorMessage: string | null,
    data: T,
}

const makeAxiosPendingResult = <T>(): AxiosResult<T> => {
    return {
        data: {} as T,
        errorMessage: '',
        failed: false,
        loaded: false,
        loading: false,
        pending: true,
    }
};

const makeAxiosLoadingResult = <T>(): AxiosResult<T> => {
    return {
        data: {} as T,
        errorMessage: '',
        failed: false,
        loaded: false,
        loading: true,
        pending: false,
    }
};

const makeAxiosResponseResult = <T>(response: AxiosResponse<T>): AxiosResult<T> => {
    return new class<T> implements AxiosResult<T> {
        private readonly response: AxiosResponse;

        data: T;
        loading: boolean;
        pending: boolean;

        constructor(response: AxiosResponse<T>) {
            this.response = response;

            this.data = ((typeof response.data === "object") ? response.data : {} as T);
            this.loading = false;
            this.pending = false;
        }

        get loaded(): boolean {
            return (this.response.status >= 200) && (this.response.status < 300);
        }

        get failed(): boolean {
            return !this.loaded;
        }

        get errorMessage(): string {
            return this.response.data?.error ?? this.response.data?.message ?? '';
        }
    }(response)
}

const makeAxiosNetworkErrorResult = <T>(error: AxiosError<T>) => {
    return {
        data: {} as T,
        errorMessage: error.message,
        failed: true,
        loaded: false,
        loading: false,
        pending: false,
    }
}

const makeAxiosErrorResult = <T>(error: AxiosError<T>): AxiosResult<T> => {
    if (typeof error.response === 'object') {
        return makeAxiosResponseResult(error.response);
    } else {
        return makeAxiosNetworkErrorResult(error);
    }
}

export type AxiosObject<T> = AxiosResponse<T> | AxiosError<T>;

const makeAxiosResult: <T>(obj: AxiosObject<T>) => AxiosResult<T> = (obj) => {
    return (
        ('isAxiosError' in obj)
            ? makeAxiosErrorResult(obj)
            : makeAxiosResponseResult(obj)
    );
}

export {
    makeAxiosPendingResult,
    makeAxiosLoadingResult,
    makeAxiosResult,
}