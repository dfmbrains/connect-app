import { IAuthCredentials, ILogin, ISignUp } from 'models/auth.models';
import { instanceAuth } from '../index';

const serviceEndpoint = 'api/identity';

export interface ISignupUserResponse {
  message: string,
  status: boolean
}

export const signupUser = async (body: ISignUp): Promise<ISignupUserResponse> => {
  const response = await instanceAuth.post(`${serviceEndpoint}/register`, body);
  return response.data;
};

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