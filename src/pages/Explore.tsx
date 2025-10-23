import { Container, Typography, Box } from '@mui/material';
import { MOCK_CREATORS } from '../data/mockData';
import { CreatorCard } from '../components/creator/CreatorCard';

export const Explore = () => {
  return (
    <Box className="min-h-screen bg-black">
      <Container maxWidth="lg" className="py-8">
        <Typography variant="h4" className="font-bold mb-2 text-white">
          🔥 Explore Creators
        </Typography>
        <Typography variant="body1" className="text-gray-400 mb-6">
          Discover amazing content creators
        </Typography>

        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_CREATORS.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
