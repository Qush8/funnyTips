import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black pt-[100px]">
      {/* Decorative animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: '400px',
            height: '400px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '25%',
            right: '25%',
            width: '400px',
            height: '400px',
            background: 'rgba(236, 72, 153, 0.1)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'pulse 3s ease-in-out infinite',
            animationDelay: '0.7s',
          }}
        />
      </Box>

      <Container maxWidth="sm" className="py-12 relative z-10">
        <Paper
          elevation={24}
          className="p-8 ring-2 ring-blue-500  bg-gradient-to-br from-gray-900 to-black border border-gray-800 px-[20px] py-[40px]"
          sx={{ borderRadius: '24px' }}
        >
          <Box className="text-center mb-8">
            <Box className="inline-block p-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 mb-4">
              <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h4" className="font-bold text-white mb-2">
              Welcome Back
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              Sign in to continue to FunnyTips
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-4" sx={{ borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-[16px] mt-[10px]">
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              className="py-4 mt-6"
              sx={{
                background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Box className="text-center mt-6 pt-[3px]">
            <Typography 
              variant="body2" 
              className="text-gray-400"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}
            >
              Don't have an account?{' '}
              <Link
                to="/signup"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
