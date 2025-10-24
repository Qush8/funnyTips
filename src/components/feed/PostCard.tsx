import { Card, CardMedia, Typography, Box } from '@mui/material';
import type { Post } from '../../types';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact' | 'wide' | 'tall';
  tabType?: 'all' | 'free' | 'premium' | 'images' | 'videos';
}

export const PostCard = ({ post, variant = 'default', tabType = 'all' }: PostCardProps) => {
  // Fallback images მხოლოდ error-ის შემთხვევაში
  const randomGirlImages = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face'
  ];

  // API-დან მომავალი სურათები
  const getImageUrl = () => {
    if (post.media_urls && post.media_urls.length > 0) {
      return post.media_urls[0];
    }
    return randomGirlImages[Math.floor(Math.random() * randomGirlImages.length)];
  };

  // CSS სტილების ფუნქცია
  const getCardStyles = () => {
    const baseStyles = {
      background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(45,45,45,0.9) 100%)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    };

    // Variant-ის მიხედვით სტილები
    const variantStyles = {
      default: {
        width: '100%',
        height: { xs: '250px', sm: '280px', md: '300px' },
        aspectRatio: '1/1',
      },
      compact: {
        width: { xs: '280px', sm: '320px', md: '370px' },
        height: { xs: '280px', sm: '320px', md: '350px' },
        aspectRatio: '1/1',
        flexShrink: 0,
      },
      wide: {
        width: '100%',
        height: { xs: '180px', sm: '200px', md: '200px' },
        aspectRatio: '2/1',
      },
      tall: {
        width: { xs: '200px', sm: '230px', md: '250px' },
        height: { xs: '320px', sm: '360px', md: '400px' },
        aspectRatio: '5/8',
      },
    };

    // Tab-ის მიხედვით სტილები
    const tabStyles = {
      all: {
        border: '1px solid rgba(239, 68, 68, 0.2)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      },
      free: {
        border: '1px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)',
      },
      premium: {
        border: '1px solid rgba(245, 158, 11, 0.3)',
        boxShadow: '0 8px 20px rgba(245, 158, 11, 0.2)',
      },
      images: {
        border: '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 8px 20px rgba(59, 130, 246, 0.2)',
      },
      videos: {
        border: '1px solid rgba(168, 85, 247, 0.3)',
        boxShadow: '0 8px 20px rgba(168, 85, 247, 0.2)',
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...tabStyles[tabType],
    };
  };

  return (
    <Card 
      className="relative group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
      sx={getCardStyles()}
    >
      {/* Top Left Badge */}
      <Box className="absolute top-[13px] left-[10px] z-10 flex flex-col gap-[10px]">
        <Box 
          className="px-2 py-1 rounded-[10px] text-xs font-medium flex items-center justify-center"
          sx={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
            width: '100px',
            height: '40px',
          }}
        >
          {post.is_premium ? 'პრემიუმი' : 'პუბლიკური'}
        </Box>
        {post.is_premium && (
          <Box 
            className="px-2 py-1 rounded-[10px] text-xs font-medium mt-1 flex items-center justify-center"
            sx={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
              width: '80px',
              height: '40px',
            }}
          >
            💰 ${post.unlock_price || 0}
          </Box>
        )}
      </Box>

      {/* Post Content Text - Top */}
      {post.content && (
        <Box 
          className="absolute top-[10px]  right-[10px] z-20"
          sx={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Typography 
            variant="body2" 
            className="text-white font-medium leading-relaxed"
            sx={{
              fontSize: '0.875rem',
              lineHeight: 1.4,
              textShadow: '0 1px 2px rgba(0,0,0,0.8)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.content}
          </Typography>
        </Box>
      )}

      {/* Main Content Image */}
      <Box className="relative h-full">
        <CardMedia
          component="img"
          image={getImageUrl()}
          alt="Post media"
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            const randomImage = randomGirlImages[Math.floor(Math.random() * randomGirlImages.length)];
            (e.target as HTMLImageElement).src = randomImage;
          }}
        />

        {/* Lock Icon for Premium Content */}
        {post.is_premium && (
          <Box className="absolute inset-0 flex items-center justify-center">
            <Box 
              className="bg-black/60 backdrop-blur-sm rounded-full p-3"
              sx={{
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </Box>
          </Box>
        )}

        {/* Bottom Stats Overlay */}
        <Box 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          sx={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }}
        >
          {/* Stats */}
          <Box className="flex items-center justify-between text-white text-xs">
            <Box className="flex items-center space-x-3">
              <Box className="flex items-center space-x-1">
                <span className="text-yellow-400">👁️</span>
                <span>{post.views || 0}</span>
              </Box>
              <Box className="flex items-center space-x-1">
                <span className="text-red-400">❤️</span>
                <span>{post.likes || 0}</span>
              </Box>
            </Box>
            {post.is_premium && (
              <Box className="flex items-center space-x-1">
                <span className="text-green-400">💵</span>
                <span className="font-semibold">${post.unlock_price || 0}</span>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

