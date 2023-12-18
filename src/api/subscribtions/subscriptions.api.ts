import { instance } from '../index';
import { IServerStatus } from '../../models/server.models';

const serviceEndpoint = 'api/subscribe';

interface IIsProfileSubscribedResponse extends IServerStatus {
  value: boolean;
}

export const getIsProfileSubbed = async (targetUserId: string): Promise<IIsProfileSubscribedResponse> => {
  const response = await instance.get(`${serviceEndpoint}/isProfileSubbed`, { params: { targetUserId } });
  return response.data;
};

export const createSubscription = async (targetUserId: string): Promise<void> => {
  const response = await instance.post(serviceEndpoint, {}, { params: { targetUserId } });
  return response.data;
};

export const deleteSubscription = async (targetUserId: string): Promise<void> => {
  const response = await instance.delete(serviceEndpoint, { params: { targetUserId } });
  return response.data;
};