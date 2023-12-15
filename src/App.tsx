import React from 'react';
import AxiosInterceptor from './shared/AxiosInterceptor';
import PrefetchProvider from './shared/PrefetchProvider';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const content = useRoutes(routes);

  return (
    <AxiosInterceptor>
      <PrefetchProvider>{content}</PrefetchProvider>
    </AxiosInterceptor>
  );
}

export default App;
