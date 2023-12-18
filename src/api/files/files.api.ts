import { instance } from '../index';

const serviceEndpoint = 'api/files/image';

export const getFileById = async (id: string): Promise<string> => {
  if (id) {
    const response = await instance.get(serviceEndpoint, { params: { id }, responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } else {
    return id;
  }
};