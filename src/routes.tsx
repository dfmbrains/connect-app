import { lazy } from 'react';
import AuthGuard from './layouts/AuthGuard';
import AppLayout from './layouts/AppLayout';
import Loadable from './components/Loadable';

const Auth = Loadable(lazy(() => import('./views/auth/Auth')));
const Home = Loadable(lazy(() => import('./views/home/Home')));

const routes = [
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/create', element: <Home /> },
          { path: '/favorite', element: <Home /> },
        ],
      },
    ],
  },

  { path: '/auth', element: <Auth /> },
  { path: '*', element: <>not found</> },
];

export default routes;
