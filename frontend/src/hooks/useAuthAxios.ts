import {UseAuthResult} from "./useAuthContext";
import {makeAxios} from "../utilities";
import {AxiosInstance} from "axios";

interface UseAuthAxiosResult extends UseAuthResult {
    axios: AxiosInstance
}

const useAuthAxios = (parent: UseAuthResult): UseAuthAxiosResult => {
    return {
        ...parent,
        axios: makeAxios(parent.logout),
    }
}

export {useAuthAxios}