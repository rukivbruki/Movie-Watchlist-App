import axios from "axios";

const Error = {
  UNAUTHORIZED: 401
};
const FETCH_TIMEOUT = 5000;
const BASE_URL = `https://htmlacademy-react-3.appspot.com/wtw`;

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: FETCH_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      if (typeof onUnauthorized === `function`) {
        onUnauthorized();
      }

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
