import { lazy } from 'react';
import AuthGuard from './layouts/AuthGuard';
import AppLayout from './layouts/AppLayout';
import Loadable from './components/Loadable';
import authRoutes from './views/auth/AuthRoutes';

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

  ...authRoutes,
  { path: '*', element: <>not found</> },
];

export default routes;
