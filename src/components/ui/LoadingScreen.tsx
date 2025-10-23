import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <Box className="flex flex-col justify-center items-center min-h-screen gap-4 bg-black">
      <CircularProgress size={60} sx={{ color: '#ef4444' }} />
      {message && (
        <Typography variant="body1" className="text-gray-400">
          {message}
        </Typography>
      )}
    </Box>
  );
};
