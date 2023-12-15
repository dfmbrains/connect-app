import axios from 'axios';
import { BASE_URL } from 'helpers/enviroment';
import { getCookiesCredentials } from 'services/auth.service';

export const instanceAuth = axios.create({
  baseURL: BASE_URL,
});

export const instance = axios.create({
  baseURL: BASE_URL,
});

instanceAuth.interceptors.request.use(config => {
  config.headers.set(
    'Authorization',
    'Basic Nzc3Zjg3NGY5YTdlNGYxOTk2MDM1MDkxNjExMWI2NGY6ZTA2N2U4YTMxZTQ5M2FhNTgyNjI4ZWYzZDJhOGUzZjU=',
  );

  return config;
});

instance.interceptors.request.use(config => {
  const credentials = getCookiesCredentials();

  if (credentials)
    config.headers.set(
      'authorization',
      `${credentials.token_type} ${credentials.access_token}`,
    );

  return config;
});
