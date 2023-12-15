import { atom } from 'recoil';
import { getCookiesCredentials } from '../services/auth.service';

export const isAuthenticatedState = atom({
  key: 'isAuthenticated',
  default: false as boolean,
});

export const authCredentialsState = atom({
  key: 'authCredentials',
  default: getCookiesCredentials(),
});
