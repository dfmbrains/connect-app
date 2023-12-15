import { IAuthCredentials, ILogin } from 'models/auth.models';
import { instanceAuth } from '../index';

const serviceEndpoint = 'api/identity';

export const authToken = async (body: ILogin): Promise<IAuthCredentials> => {
  const response = await instanceAuth.post(`${serviceEndpoint}/login`, body);
  return response.data;
};

export const refreshToken = async (refreshToken: string): Promise<IAuthCredentials> => {
  const response = await instanceAuth.post(`${serviceEndpoint}/refresh`, {
    refreshToken,
  });
  return response.data;
};