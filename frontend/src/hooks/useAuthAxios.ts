import {UseAuthResult, UseAuthResultLoggedIn} from "./useAuth";
import {makeAxios} from "../utilities";
import {AxiosInstance} from "axios";

export interface UseAuthAxiosResult<T> extends UseAuthResultLoggedIn<T> {
    axios: AxiosInstance,
}

const useAuthAxios = <T>(parent: UseAuthResult<T>): UseAuthAxiosResult<T> => {
    const axios = makeAxios(parent.logout);

    const makeOpenApiRequest = <T>(req: (axios: AxiosInstance, basePath: string) => T): T => {
        return req(axios, axios.defaults.baseURL!);
    }

    return {
        ...parent,

        // Assume we're logged in for typechecking reasons, but the hook should still log us out dynamically on any
        // 401 response. Of course, any component consuming this hook must be responsible and wrap all currentUser
        // access inside `(loggedIn && <Foo/>)`

        loggedIn: parent.loggedIn as true,
        currentUser: parent.currentUser as T,
        axios: makeAxios(parent.logout),
    }
}

export {useAuthAxios}