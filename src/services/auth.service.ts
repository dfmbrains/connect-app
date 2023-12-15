import { COOKIES_AUTH_CREDENTIALS, getCookie } from './cookies.service';
import { IAuthCredentials } from '../models/auth.models';

export const getCookiesCredentials = (): IAuthCredentials | null => {
  let credentials = getCookie(COOKIES_AUTH_CREDENTIALS);

  if (credentials) return JSON.parse(credentials);
  else return null;
};
