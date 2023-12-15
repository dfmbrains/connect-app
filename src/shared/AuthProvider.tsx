import React, { FC, useEffect, useState } from 'react';
import { isAuthenticatedState } from 'store/auth.states';
import Loader from 'components/Loader';
import useAuth from '../hooks/useAuth';
import { getCookiesCredentials } from '../services/auth.service';
import { useSetRecoilState } from 'recoil';

type AuthProviderProps = React.PropsWithChildren<{}>;

const credentials = getCookiesCredentials();

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);

  const handleCheckAuth = async () => {
    if (credentials) setIsAuthenticated(true);
    else logout();
  };

  useEffect(() => {
    handleCheckAuth()
      .catch(logout)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
