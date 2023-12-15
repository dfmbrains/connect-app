import { lazy } from 'react';
import Loadable from 'components/Loadable';

const Login = Loadable(lazy(() => import('./Login/Login')));

const authRoutes = [
  {
    path: '/auth/signin',
    element: <Login />,
  },
];

export default authRoutes;
