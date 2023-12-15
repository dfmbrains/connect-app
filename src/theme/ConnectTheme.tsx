import React from 'react';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import { themeOptions } from './themeOptions';

const ConnectTheme = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  const newTheme = createTheme({
    ...themeOptions(theme),
  });

  return (
    <ThemeProvider theme={newTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ConnectTheme;
