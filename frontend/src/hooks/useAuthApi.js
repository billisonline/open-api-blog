import {isResponseSuccessfulWithData, makeAxios} from "../utilities";

export default function (parent) {
  const axios = makeAxios();

  const login = (email, password, callback) => {
    axios.get('/sanctum/csrf-cookie')
      .then(() => {
        axios.post('/api/authenticate', {email, password})
          .then(() => {
            axios.get('/api/users/me')
              .then((response) => {
                if (isResponseSuccessfulWithData(response)) {
                  parent.login(response.data.data);

                  (typeof callback === 'function') && callback();
                }
              })
          })
      })
  }

  const logout = (callback) => {
    axios.get('/sanctum/csrf-cookie')
      .then(() => {
        axios.post('/api/logout')
          .then(() => {
            parent.logout();

            (typeof callback === 'function') && callback();
          })
      })
  }

  return {
    ...parent,
    login,
    logout,
  };
}