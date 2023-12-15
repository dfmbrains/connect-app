import { Theme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles/createTheme';

export const themeOptions = (theme: Theme): ThemeOptions => {
  return {
    palette: {
      primary: {
        main: '#0471b9',
        light: '#5d8cb4',
      },
      secondary: {
        main: '#14d6ab',
        light: '#66d2b9',
        contrastText: '#FFFFFF',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': { boxSizing: 'border-box', padding: 0, margin: 0 },
          body: {
            height: '100%',
            fontFamily: "'Roboto', Helvetica, Arial, sans-serif",
            background: '#F5F5F5',
          },
          a: { color: 'inherit', textDecoration: 'none', display: 'flex' },
          li: { listStyleType: 'none' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: '#FFF',
            boxShadow:
              '0px 3px 3px -2px rgb(0 0 0 / 6%), 0px 3px 4px 0px rgb(0 0 0 / 4%), 0px 1px 8px 0px rgb(0 0 0 / 4%) !important',
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          input: {
            fontSize: '14px',
          },
          option: {
            fontSize: '14px',
          },
        },
      },
    },
  };
};
