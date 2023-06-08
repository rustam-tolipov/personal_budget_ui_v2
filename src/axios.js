import axios from 'axios';
import Cookies from 'js-cookie';
import { authFail } from './redux/actions/auth';
import store from './redux';
import { history } from './main';

// axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.baseURL = 'https://personal-bg-v2.fly.dev/api/v1';

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (!token) {
      store.dispatch(authFail());
      return;
    }

    config.headers.Authorization = token;
    config.headers['Content-Type'] = 'application/json';
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(authFail());
    } else {
      return Promise.reject(error);
    }
  }
);

export default axios;

export const baseAxios = axios.create();
