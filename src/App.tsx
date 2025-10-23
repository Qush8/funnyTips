import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { queryClient } from './lib/queryClient';
import AppRoutes from './routes/AppRoutes';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ef4444', // წითელი
      light: '#f87171',
      dark: '#dc2626',
    },
    secondary: {
      main: '#ec4899', // ვარდისფერი
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#000000', // შავი background
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
        contained: {
          background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#ef4444',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ec4899',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '16px',
        },
      },
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
            <Toaster position="top-right" />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
