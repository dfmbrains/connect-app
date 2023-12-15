import React, { FC, useEffect, useState } from 'react';
import Loader from 'components/Loader';
import useAuth from 'hooks/useAuth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authCredentialsState, isAuthenticatedState } from 'store/auth.states';
import { getProfile } from '../api/profile/profile.api';
import { profileState } from '../store/profile.states';

type PrefetchProviderProps = React.PropsWithChildren<{}>;

const PrefetchProvider: FC<PrefetchProviderProps> = ({ children }) => {
  const credentials = useRecoilValue(authCredentialsState);

  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setProfile = useSetRecoilState(profileState);

  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);

  const handleGetData = async () => {
    try {
      const profile = await getProfile();
      setProfile(profile);
      setIsAuthenticated(true);
    } catch {
      logout();
    }
  };

  const handleCheckAuth = async () => {
    if (credentials) await handleGetData();
    else logout();
  };

  useEffect(() => {
    handleCheckAuth()
      .finally(() => setLoading(false));
  }, [credentials]);

  if (loading) return <Loader />;

  return <>{children}</>;
};

export default PrefetchProvider;
