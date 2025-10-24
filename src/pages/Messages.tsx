import { Container, Box, Typography } from '@mui/material';

export const Messages = () => {
  return (
    <Box className="min-h-screen bg-black pt-[100px]">
      <Container maxWidth="lg" className="py-8">
        <Typography variant="h4" className="font-bold mb-6 text-white">
          💬 Messages
        </Typography>

        <Box className="text-center py-12 bg-gray-900 rounded-lg shadow border border-gray-800">
          <Typography variant="h6" className="text-gray-400">
            Messaging system - Coming soon
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
