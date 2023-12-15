import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticatedState } from '../store/auth.states';
import { useRecoilValue } from 'recoil';

const AuthGuard = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  const { pathname } = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate replace to="/auth/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
