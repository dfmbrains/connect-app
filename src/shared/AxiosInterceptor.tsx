import { FC, ReactElement, useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import { instance } from 'api';
import { getCookiesCredentials } from '../services/auth.service';

type InterceptorProps = {
  children: ReactElement;
};

const AxiosInterceptor: FC<InterceptorProps> = ({ children }) => {
  const { logout, refresh } = useAuth();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      res => res,
      async err => {
        if (err?.response?.status === 401) {
          const credentials = getCookiesCredentials();
          if (credentials) {
            await refresh(credentials.refreshToken);
          } else {
            logout('error');
          }
        }

        return Promise.reject(err);
      },
    );

    return () => instance.interceptors.response.eject(responseInterceptor);
  }, []);

  return children;
};

export default AxiosInterceptor;
