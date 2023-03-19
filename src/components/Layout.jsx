import { ThemeOptions } from '@mui/material/styles';
import * as React from 'react';
import Navbar from '@/components/Nabvar';
import { useState, useEffect } from 'react';
import { useTheme, ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AuthProvider from '@/context/userContext';

export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
    
        main: '#1976d2',
      
    },
    secondary: {
      main: '#9c27b0',
    },
  },
};

function Layout({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        const prevTheme = localStorage.getItem('mode');
        localStorage.setItem('mode', prevTheme === 'light' ? 'dark' : 'light');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  useEffect(() => {
    const localTheme = localStorage.getItem('mode');
    const orgTheme = localTheme ? localTheme : 'light';
    setMode(orgTheme);
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main:'#1976d2'
          },
          secondary: {
            main: '#9c27b0',
          },
        },
      }),
    [mode],
  );

  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Navbar colorMode={colorMode} />

        {children}
      </AuthProvider>
    </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default Layout;
