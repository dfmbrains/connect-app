import { instance } from '../index';
import { IProfile } from '../../models/profile.models';
import { getFileById } from '../files/files.api';
import { AxiosResponse } from 'axios';

const serviceEndpoint = 'api/profile';

export const getProfile = async (): Promise<IProfile> => {
  const response = await instance.get(serviceEndpoint);
  return response.data;
};

export const getProfileById = async (): Promise<IProfile> => {
  const response = await instance.get(serviceEndpoint);
  return response.data;
};

export const getRecommendedProfiles = async (id: string): Promise<IProfile[]> => {
  const response: AxiosResponse<IProfile[]> = await instance.get(`${serviceEndpoint}/getRecs`, { params: { id } });

  return Promise.all(response.data.map(async profile => (
    { ...profile, avatar: await getFileById(profile.avatar || '') }
  )));
};