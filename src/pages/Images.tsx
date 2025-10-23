import { Container, Typography, Box, ImageList, ImageListItem, ImageListItemBar, IconButton, Chip } from '@mui/material';
import { Favorite, Lock } from '@mui/icons-material';

const MOCK_IMAGES = [
  { id: 1, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', title: 'Sunset vibes', likes: 234, isPPV: false },
  { id: 2, img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', title: 'Exclusive', likes: 567, isPPV: true, price: 4.99 },
  { id: 3, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', title: 'Behind scenes', likes: 892, isPPV: false },
  { id: 4, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', title: 'Premium content', likes: 445, isPPV: true, price: 9.99 },
  { id: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', title: 'Beach day', likes: 678, isPPV: false },
  { id: 6, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', title: 'VIP Access', likes: 1023, isPPV: true, price: 14.99 },
];

export const Images = () => {
  return (
    <Box className="min-h-screen bg-black">
      <Container maxWidth="xl" className="py-8">
        <Box className="mb-8">
          <Typography variant="h3" className="font-bold text-white mb-2">
            📸 Image Gallery
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Browse exclusive photos from creators
          </Typography>
        </Box>

        <ImageList variant="masonry" cols={3} gap={16}>
          {MOCK_IMAGES.map((item) => (
            <ImageListItem
              key={item.id}
              className="cursor-pointer hover:scale-105 transition-transform"
              sx={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #333',
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{ borderRadius: '16px' }}
              />
              {item.isPPV && (
                <Chip
                  icon={<Lock sx={{ fontSize: 14 }} />}
                  label={`$${item.price}`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    fontWeight: 700,
                  }}
                />
              )}
              <ImageListItemBar
                title={item.title}
                actionIcon={
                  <Box className="flex items-center gap-1 mr-2">
                    <IconButton sx={{ color: 'white' }}>
                      <Favorite fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" className="text-white">
                      {item.likes}
                    </Typography>
                  </Box>
                }
                sx={{
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Box>
  );
};

