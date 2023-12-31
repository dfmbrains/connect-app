import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import ConnectTheme from './theme/ConnectTheme';

//fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <RecoilRoot>
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <ConnectTheme>
          <App />
        </ConnectTheme>
      </SnackbarProvider>
    </BrowserRouter>
  </RecoilRoot>,
);
