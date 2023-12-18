import { IProfile } from './profile.models';

export interface IPost {
  id: string;
  title: string;
  description: string;
  likes: number;
  image: string;
  updated: Date | null;
  created: string;
  user_id: string;
  profile: IProfile;
}