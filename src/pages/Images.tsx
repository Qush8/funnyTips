import { Container, Typography, Box, ImageList, ImageListItem, ImageListItemBar, IconButton, Chip } from '@mui/material';
import { Favorite, Lock, FavoriteBorder } from '@mui/icons-material';
import { useState } from 'react';

const MOCK_IMAGES = [
  { id: 1, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', title: 'Sunset vibes', likes: 234, isPPV: false, isLiked: false },
  { id: 2, img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', title: 'Exclusive', likes: 567, isPPV: true, price: 4.99, isLiked: true },
  { id: 3, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', title: 'Behind scenes', likes: 892, isPPV: false, isLiked: false },
  { id: 4, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', title: 'Premium content', likes: 445, isPPV: true, price: 9.99, isLiked: true },
  { id: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', title: 'Beach day', likes: 678, isPPV: false, isLiked: false },
  { id: 4, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', title: 'Premium content', likes: 445, isPPV: true, price: 9.99, isLiked: true },
  { id: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', title: 'Beach day', likes: 678, isPPV: false, isLiked: false },
  { id: 6, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', title: 'VIP Access', likes: 1023, isPPV: true, price: 14.99, isLiked: true },
  { id: 6, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', title: 'VIP Access', likes: 1023, isPPV: true, price: 14.99, isLiked: true },
  // { id: 6, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', title: 'VIP Access', likes: 1023, isPPV: true, price: 14.99, isLiked: true },
  { id: 4, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', title: 'Premium content', likes: 445, isPPV: true, price: 9.99, isLiked: true },
  { id: 4, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', title: 'Premium content', likes: 445, isPPV: true, price: 9.99, isLiked: true },


];

export const Images = () => {
  const [likedImages, setLikedImages] = useState<Set<number>>(
    new Set(MOCK_IMAGES.filter(img => img.isLiked).map(img => img.id))
  );

  const handleLike = (imageId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  return (
    <Box className="min-h-screen bg-black pt-[100px]">
      <Container maxWidth="xl" className="py-8">
        <Box className="mb-8">
          <Typography variant="h3" className="font-bold text-white mb-2">
            📸 TOP Images
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Browse exclusive photos from top creators
          </Typography>
        </Box>

        <ImageList variant="masonry" cols={3} gap={16} sx={{ mt: 2, pt: 2, width: '95%', mx: 'auto' }}>
          {MOCK_IMAGES.map((item) => {
            const isLiked = likedImages.has(item.id);
            const currentLikes = item.likes + (isLiked && !item.isLiked ? 1 : 0) - (!isLiked && item.isLiked ? 1 : 0);

            return (
              <ImageListItem
                key={item.id}
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #333',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.005)',
                    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)',
                    borderColor: '#ef4444',
                    '& img': {
                      transform: 'scale(1.1)',
                      filter: item.isPPV ? 'blur(0px)' : 'none',
                    },
                    '& .image-overlay': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    borderRadius: '16px',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease',
                    display: 'block',
                    filter: item.isPPV ? 'blur(8px)' : 'none',
                  }}
                />
                
                {/* PPV Badge */}
                {item.isPPV && (
                  <Chip
                    icon={<Lock sx={{ fontSize: 14, color: 'white' }} />}
                    label={`$${item.price}`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                      color: 'white',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      zIndex: 3,
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                    }}
                  />
                )}

                {/* PPV Lock Overlay */}
                {item.isPPV && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Lock
                      sx={{
                        fontSize: 64,
                        color: 'white',
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
                      }}
                    />
                    <Typography
                      variant="h5"
                      className="text-white font-bold"
                      sx={{
                        textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                      }}
                    >
                      ${item.price}
                    </Typography>
                  </Box>
                )}

                {/* Hover Overlay */}
                <Box
                  className="image-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />

                <ImageListItemBar
                  title={item.title}
                  actionIcon={
                    <Box className="flex items-center gap-1 mr-2">
                      <IconButton
                        onClick={(e) => handleLike(item.id, e)}
                        sx={{
                          color: isLiked ? '#ef4444' : 'white',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'scale(1.2)',
                            color: '#ef4444',
                          },
                        }}
                      >
                        {isLiked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                      </IconButton>
                      <Typography variant="caption" className="text-white font-semibold">
                        {currentLikes}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    '& .MuiImageListItemBar-title': {
                      fontSize: '0.95rem',
                      fontWeight: 600,
                    },
                  }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Container>
    </Box>
  );
};
