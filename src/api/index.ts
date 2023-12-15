import axios from 'axios';
import { BASE_URL } from 'helpers/enviroment';
import { getCookiesCredentials } from 'services/auth.service';

export const instanceAuth = axios.create({
  baseURL: BASE_URL,
});

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(config => {
  const credentials = getCookiesCredentials();

  if (credentials) {
    config.headers.set('authorization', credentials.accessToken);
  }

  return config;
});
