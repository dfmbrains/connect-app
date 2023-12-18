import { instance } from '../index';
import { IPost } from '../../models/posts.models';
import { getFileById } from '../files/files.api';

const serviceEndpoint = 'api/posts';

const getPostsImages = async (posts: IPost[]): Promise<IPost[]> => {
  if (posts.every(el => el.profile)) {
    return await Promise.all(posts.map(async post => {
      const [avatar, image] = await Promise.all([
        getFileById(post.profile.avatar || ''),
        getFileById(post.image),
      ]);

      return { ...post, image, profile: { ...post.profile, avatar } };
    }));
  } else {
    return posts;
  }
};

export const getPopularPosts = async (): Promise<IPost[]> => {
  const response = await instance.get(`${serviceEndpoint}/popular`);
  return response.data;
};

export const getPopularPostsWithImages = async (): Promise<IPost[]> => {
  const response = await getPopularPosts();
  return await getPostsImages(response);
};

export const getPopularBySub = async (): Promise<IPost[]> => {
  const response = await instance.get(`${serviceEndpoint}/bySubscriptions`);
  return response.data;
};

export const getPostsBySubWithImages = async (): Promise<IPost[]> => {
  const response = await getPopularBySub();
  return await getPostsImages(response);
};