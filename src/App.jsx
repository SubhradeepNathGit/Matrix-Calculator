import './App.css';
import Routing from './Routing/Routing';
import { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

function App() {
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: 'light',
        background: {
          default: '#f4f4f4',
        },
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routing />
    </ThemeProvider>
  );
}

export default App;
