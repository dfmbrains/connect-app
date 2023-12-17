import { instance } from '../index';
import { IProfile } from '../../models/profile.models';

const serviceEndpoint = 'api/profile';

export const getProfile = async (): Promise<IProfile> => {
  const response = await instance.get(serviceEndpoint);
  return response.data;
};