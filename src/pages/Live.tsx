import { Container, Typography, Box, Card, CardMedia, CardContent, Chip, Avatar } from '@mui/material';
import { Visibility, FiberManualRecord } from '@mui/icons-material';

const MOCK_LIVE_STREAMS = [
  {
    id: '1',
    creator: { name: 'Bella Rose', avatar: 'https://i.pravatar.cc/150?img=1', username: 'bella_rose' },
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
    title: 'Good Morning Live Stream 🌅',
    viewers: 1234,
    isLive: true,
  },
  {
    id: '2',
    creator: { name: 'Sophia Star', avatar: 'https://i.pravatar.cc/150?img=5', username: 'sophia_star' },
    thumbnail: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600',
    title: 'Q&A Session - Ask Me Anything! 💬',
    viewers: 892,
    isLive: true,
  },
  {
    id: '3',
    creator: { name: 'Emma Luxury', avatar: 'https://i.pravatar.cc/150?img=9', username: 'emma_luxury' },
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600',
    title: 'Workout Session 💪',
    viewers: 567,
    isLive: true,
  },
];

export const Live = () => {
  return (
    <Box className="min-h-screen bg-black">
      <Container maxWidth="xl" className="py-8">
        <Box className="mb-8">
          <Typography variant="h3" className="font-bold text-white mb-2">
            🔴 Live Streams
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Watch live content from your favorite creators
          </Typography>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_LIVE_STREAMS.map((stream) => (
            <Card
              key={stream.id}
              className="cursor-pointer hover:scale-105 transition-transform"
              sx={{
                backgroundColor: '#111',
                border: '1px solid #333',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <Box className="relative">
                <CardMedia
                  component="img"
                  height="200"
                  image={stream.thumbnail}
                  alt={stream.title}
                  sx={{ aspectRatio: '16/9', objectFit: 'cover' }}
                />
                <Chip
                  icon={<FiberManualRecord sx={{ fontSize: 12 }} />}
                  label="LIVE"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontWeight: 700,
                  }}
                />
                <Box
                  className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg"
                  sx={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                >
                  <Visibility sx={{ fontSize: 16, color: 'white' }} />
                  <Typography variant="caption" className="text-white font-semibold">
                    {stream.viewers.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <CardContent>
                <Box className="flex items-start gap-3">
                  <Avatar src={stream.creator.avatar} alt={stream.creator.name} />
                  <Box className="flex-1">
                    <Typography variant="body1" className="text-white font-semibold line-clamp-2">
                      {stream.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400 mt-1">
                      {stream.creator.name}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

