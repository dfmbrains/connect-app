import { atom } from 'recoil';

export const isAuthenticatedState = atom({
  key: 'isAuthenticated',
  default: false,
});
