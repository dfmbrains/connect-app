import { instance } from '../index';
import { IServerStatus } from '../../models/server.models';

const serviceEndpoint = 'api/likes';

interface IIsProfileLikedResponse extends IServerStatus {
  value: boolean;
}

interface ILikesCountResponse extends IServerStatus {
  value: number;
}

export const getIsProfileLiked = async (postId: string): Promise<IIsProfileLikedResponse> => {
  const response = await instance.get(`${serviceEndpoint}/isProfileLiked`, { params: { postId } });
  return response.data;
};

export const getLikesCount = async (postId: string): Promise<ILikesCountResponse> => {
  const response = await instance.get(`${serviceEndpoint}/count`, { params: { postId } });
  return response.data;
};

export const createLike = async (postId: string): Promise<void> => {
  const response = await instance.post(serviceEndpoint, {}, { params: { postId } });
  return response.data;
};

export const deleteLike = async (postId: string): Promise<void> => {
  const response = await instance.delete(serviceEndpoint, { params: { postId } });
  return response.data;
};