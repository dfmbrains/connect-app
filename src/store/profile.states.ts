import { atom } from 'recoil';
import { IProfile } from '../models/profile.models';

export const profileState = atom({
  key: 'profile',
  default: null as IProfile | null,
});