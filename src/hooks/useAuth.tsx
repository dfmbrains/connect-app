import { useSetRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import { IAuthCredentials, ILogin } from 'models/auth.models';
import { isAuthenticatedState } from 'store/auth.states';
import {
  COOKIES_AUTH_CREDENTIALS,
  removeCookie,
  setCookie,
} from 'services/cookies.service';
import { authToken, refreshToken } from 'api/auth/auth.api';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IServerStatus } from 'models/server.models';

const useAuth = () => {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

  const { enqueueSnackbar } = useSnackbar();
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleAuthError = (e: unknown) => {
    let message = 'Server error';

    if (e instanceof AxiosError) {
      const axiosErr: AxiosError<IServerStatus> = e;
      const errorMessage = axiosErr.response?.data.message;

      if (errorMessage) message = errorMessage;
    }

    enqueueSnackbar(message, { variant: 'error' });
  };
  const handleAuthSuccess = (credentials: IAuthCredentials) => {
    setCookie(
      COOKIES_AUTH_CREDENTIALS,
      JSON.stringify(credentials),
      credentials.expires_in,
    );
    setIsAuthenticated(true);
  };

  const logout = (variant?: 'success' | 'error'): void => {
    setIsAuthenticated(false);
    removeCookie(COOKIES_AUTH_CREDENTIALS);

    if (variant) {
      enqueueSnackbar(
        variant === 'success' ? 'Logged out' : 'Session expired',
        { variant },
      );
    }
  };

  const refresh = async (refresh_token: string): Promise<void> => {
    try {
      const response = await refreshToken(refresh_token);
      handleAuthSuccess(response);
    } catch (e) {
      handleAuthError(e);
      logout('error');
    }
  };

  const login = async (values: ILogin): Promise<void> => {
    try {
      const response = await authToken(values);
      handleAuthSuccess(response);

      enqueueSnackbar('Logged in!', { variant: 'success' });
      navigate(state ? state.from : '/');
    } catch (e) {
      handleAuthError(e);
    }
  };

  return { logout, login, refresh };
};

export default useAuth;