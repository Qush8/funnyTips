import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubble, Share, MoreVert } from '@mui/icons-material';
import { useState } from 'react';

const MOCK_SHORTS = [
  {
    id: '1',
    creator: { name: 'Bella Rose', avatar: 'https://i.pravatar.cc/150?img=1' },
    video: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    caption: 'Sunset vibes 🌅✨',
    likes: 12500,
    comments: 234,
  },
  {
    id: '2',
    creator: { name: 'Sophia Star', avatar: 'https://i.pravatar.cc/150?img=5' },
    video: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
    caption: 'New look! What do you think? 💄',
    likes: 8900,
    comments: 156,
  },
  {
    id: '3',
    creator: { name: 'Emma Luxury', avatar: 'https://i.pravatar.cc/150?img=9' },
    video: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    caption: 'Behind the scenes 🎬',
    likes: 15200,
    comments: 289,
  },
];

export const Shorts = () => {
  const [currentIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const currentShort = MOCK_SHORTS[currentIndex];

  return (
    <Box className="min-h-screen bg-black flex items-center justify-center">
      {/* TikTok-style vertical video viewer */}
      <Box className="relative w-full max-w-md h-[calc(100vh-80px)] bg-gray-900 rounded-2xl overflow-hidden">
        {/* Video Background */}
        <img
          src={currentShort.video}
          alt="Short video"
          className="w-full h-full object-cover"
        />

        {/* Top Gradient Overlay */}
        <Box
          className="absolute top-0 left-0 right-0 h-32"
          sx={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
          }}
        />

        {/* Bottom Gradient Overlay */}
        <Box
          className="absolute bottom-0 left-0 right-0 h-48"
          sx={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
          }}
        />

        {/* Top Right Actions */}
        <Box className="absolute top-4 right-4">
          <IconButton sx={{ color: 'white' }}>
            <MoreVert />
          </IconButton>
        </Box>

        {/* Bottom Info */}
        <Box className="absolute bottom-0 left-0 right-0 p-6">
          <Box className="flex items-end justify-between">
            {/* Creator Info & Caption */}
            <Box className="flex-1 mr-4">
              <Box className="flex items-center gap-3 mb-3">
                <Avatar src={currentShort.creator.avatar} sx={{ width: 48, height: 48 }} />
                <Typography variant="h6" className="text-white font-bold">
                  {currentShort.creator.name}
                </Typography>
              </Box>
              <Typography variant="body1" className="text-white">
                {currentShort.caption}
              </Typography>
            </Box>

            {/* Right Side Actions */}
            <Box className="flex flex-col gap-4">
              <Box className="flex flex-col items-center">
                <IconButton
                  onClick={() => setLiked(!liked)}
                  sx={{
                    color: liked ? '#ef4444' : 'white',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                  }}
                >
                  {liked ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Typography variant="caption" className="text-white font-semibold mt-1">
                  {(currentShort.likes + (liked ? 1 : 0)).toLocaleString()}
                </Typography>
              </Box>

              <Box className="flex flex-col items-center">
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                  }}
                >
                  <ChatBubble />
                </IconButton>
                <Typography variant="caption" className="text-white font-semibold mt-1">
                  {currentShort.comments}
                </Typography>
              </Box>

              <Box className="flex flex-col items-center">
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                  }}
                >
                  <Share />
                </IconButton>
                <Typography variant="caption" className="text-white font-semibold mt-1">
                  Share
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Navigation Hint */}
        <Box className="absolute left-1/2 transform -translate-x-1/2 bottom-32 text-center">
          <Typography variant="caption" className="text-gray-400">
            Swipe up for next • {currentIndex + 1}/{MOCK_SHORTS.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

