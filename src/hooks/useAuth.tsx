import { useSetRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import { IAuthCredentials, ILogin, ISignUp } from 'models/auth.models';
import { authCredentialsState, isAuthenticatedState } from 'store/auth.states';
import { COOKIES_AUTH_CREDENTIALS, removeCookie, setCookie } from 'services/cookies.service';
import { authToken, ISignupUserResponse, refreshToken, signupUser } from 'api/identity/auth.api';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IServerStatus } from 'models/server.models';

const useAuth = () => {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setCredentials = useSetRecoilState(authCredentialsState);

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
      credentials.expiresHours,
    );
    setIsAuthenticated(true);
    setCredentials(credentials);
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

  const signup = async (values: ISignUp): Promise<ISignupUserResponse | undefined> => {
    try {
      return await signupUser(values);
    } catch (e) {
      handleAuthError(e);
    }
  };

  return { logout, login, refresh, signup };
};

export default useAuth;
