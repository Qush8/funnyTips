import { Container, Typography, Box } from '@mui/material';
import { MOCK_CREATORS } from '../data/mockData';
import { CreatorCard } from '../components/creator/CreatorCard';

export const Models = () => {
  return (
    <Box className="min-h-screen bg-black pt-[100px]">
      <Container maxWidth="xl" className="py-8">
        <Box className="mb-8">
          <Typography variant="h3" className="font-bold text-white mb-2">
            👥 All Models
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Discover and subscribe to amazing creators
          </Typography>
        </Box>

        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_CREATORS.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

