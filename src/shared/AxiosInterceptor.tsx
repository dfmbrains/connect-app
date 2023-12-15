import { FC, ReactElement, useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import { instance } from 'api';
import { getCookiesCredentials } from '../services/auth.service';

type InterceptorProps<T extends ReactElement> = {
  children: T;
};

const AxiosInterceptor: FC<InterceptorProps<ReactElement>> = ({
  children,
}: InterceptorProps<ReactElement>) => {
  const { logout, refresh } = useAuth();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      res => res,
      async err => {
        if (err?.response?.status === 401) {
          const credentials = getCookiesCredentials();
          if (credentials) {
            await refresh(credentials.refresh_token);
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
