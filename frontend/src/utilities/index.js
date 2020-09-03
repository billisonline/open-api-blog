import axios, {AxiosInstance, AxiosResponse, AxiosError} from "axios";

/**
 * @param {AxiosResponse} response
 * @return {boolean}
 */
const isResponseSuccessful = (response) => {
  return response && (response.status >= 200) && (response.status < 300);
}

/**
 * @param {AxiosResponse} response
 * @return {boolean}
 */
const isResponseSuccessfulWithData = (response) => {
  return isResponseSuccessful(response) && response.data;
}

/**
 * @param {AxiosError} error
 * @return {boolean}
 */
const isUnauthenticatedError = (error) => {
  return error.response && (error.response.status === 401);
}

const preventingDefault = (callback) => {
  return (event) => {
    event.preventDefault();

    callback(event);
  };
};

/**
 * @param {Function} logoutCallback
 * @return {AxiosInstance}
 */
const makeAxios = (logoutCallback=() => {}) => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000',
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      isUnauthenticatedError(error) && logoutCallback();

      return error;
    }
  );

  return instance;
}

export {
  isResponseSuccessful,
  isResponseSuccessfulWithData,
  makeAxios,
  preventingDefault,
}