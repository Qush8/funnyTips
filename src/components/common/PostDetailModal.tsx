import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Box, 
  Typography, 
  IconButton,
  Chip,
  Divider,
  Avatar,
  Button,
  Card,
  CardMedia
} from '@mui/material';
import { Close as CloseIcon, Lock as LockIcon, Favorite, Comment } from '@mui/icons-material';
import { useState } from 'react';
import type { Post } from '../../types';

interface PostDetailModalProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
}

export const PostDetailModal = ({ open, onClose, post }: PostDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log('post', post);
  if (!post) return null;

  // Fallback images დროებით - უფრო მაღალი quality
  const fallbackImages = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c172c3db96?w=1200&h=800&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=800&fit=crop&crop=face&q=80'
  ];

  // Creator avatar fallback
  const creatorAvatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=9',
    'https://i.pravatar.cc/150?img=10',
    'https://i.pravatar.cc/150?img=11',
    'https://i.pravatar.cc/150?img=12'
  ];

  // Fallback media URLs-ის მიღება
  const getMediaUrls = () => {
    if (post.media_urls && post.media_urls.length > 0) {
      return post.media_urls;
    }
    // დროებით fallback სურათები
    return [fallbackImages[Math.floor(Math.random() * fallbackImages.length)]];
  };

  const getCreatorAvatar = () => {
    if (post.creator?.avatar) {
      return post.creator.avatar;
    }
    // დროებით fallback avatar
    return creatorAvatars[Math.floor(Math.random() * creatorAvatars.length)];
  };

  const mediaUrls = getMediaUrls();
  const isPremium = Boolean(post.is_premium || post.access_level === 'premium');
  const shouldBlur = Boolean(isPremium && (post.blur_intensity ?? 0) > 0);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  // no-op hooks for potential future use
  const handleImageLoad = () => {};
  const handleImageError = () => {};

  const handleUnlock = () => {
    // TODO: Implement unlock functionality
    console.log('Unlocking post:', post.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ka-GE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '📷';
      case 'video': return '🎥';
      case 'gallery': return '🖼️';
      default: return '📝';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#0a0a0a',
          color: 'white',
          borderRadius: '16px',
          border: '1px solid rgba(239, 68, 68, 0.2)',
        }
      }}
    >
      <DialogTitle className="flex items-center justify-between p-6">
        <Box className="flex items-center space-x-3">
          <Avatar 
            src={getCreatorAvatar()} 
            alt={post.creator?.displayName || 'Creator'}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6" className="text-white font-semibold">
              {post.creator?.displayName || 'Unknown Creator'}
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              @{post.creator?.username || 'unknown'}
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <DialogContent className="p-0">
        <Box className="flex flex-col lg:flex-row">
          {/* Left Side - Media */}
          <Box className="w-full lg:w-2/3">
            <Box className="relative">
              {mediaUrls && mediaUrls.length > 0 ? (
                <>
                  {/* Main Image/Video */}
                  <Box className="relative h-[300px] md:h-[500px]">
                    { /* საბოლოო სურათის წყარო (დროებით hardcoded) */ }
                    <img 
                      src={"https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=2070&q=80"}
                      alt="Cover Photo"
                      className="w-full h-full object-cover"
                      style={{
                        filter: shouldBlur ? `blur(${Math.min(post.blur_intensity ?? 8, 20)}px)` : 'none'
                      }}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />

                    { /* ზედა შრე: კროპის დარელატიური კონტეინერი */ }
                    <Box className="pointer-events-none absolute inset-0">
                      { /* ბნელადი ფენა თუ ბლარია */ }
                      {shouldBlur && (
                        <Box className="absolute inset-0 bg-black/30" />
                      )}

                      { /* ბოქლომი ცენტრში მხოლოდ პრემიუმზე */ }
                      {isPremium && (
                        <Box className="absolute inset-0 flex items-center justify-center">
                          <Box className="bg-black/60 rounded-full p-3">
                            <LockIcon sx={{ color: 'white', fontSize: 40 }} />
                          </Box>
                        </Box>
                      )}

                      { /* სტატისტიკა - ზედა მარჯვენა მხარეს */ }
                      <Box className="absolute top-4 right-4 flex flex-col space-y-2">
                        <Box className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-2">
                          <Favorite sx={{ color: '#ef4444', fontSize: 18 }} />
                          <Typography variant="body2" className="text-white font-semibold">
                            {post.likes || 0}
                          </Typography>
                        </Box>
                        <Box className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-2">
                          <Comment sx={{ color: '#10b981', fontSize: 18 }} />
                          <Typography variant="body2" className="text-white font-semibold">
                            {post.comments || 0}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    {/* Loading Overlay */}
                    {/* {imageLoading && (
                      <Box className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Box className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                          <Typography variant="body2" className="text-white">
                            Loading...
                          </Typography>
                        </Box>
                      </Box>
                    )} */}

                    {/* Error Overlay */}
                    {/* {imageError && (
                      <Box className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <Box className="text-center">
                          <Typography variant="h6" className="text-white mb-2">
                            🖼️ Image not available
                          </Typography>
                          <Typography variant="body2" className="text-gray-300">
                            This content is temporarily unavailable
                          </Typography>
                        </Box>
                      </Box>
                    )} */}
                    
                    {/* CTA ფენა მხოლოდ პრემიუმზე */}
                    {isPremium && (
                      <Box className="absolute inset-0 flex items-end justify-center pb-6">
                        <Button
                          variant="contained"
                          onClick={handleUnlock}
                          sx={{
                            backgroundColor: '#ef4444',
                            '&:hover': { backgroundColor: '#dc2626' }
                          }}
                        >
                          Unlock for ${post.unlock_price || 0}
                        </Button>
                      </Box>
                    )}

                    {/* Image Navigation for Gallery */}
                    {mediaUrls.length > 1 && (
                      <Box className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {mediaUrls.map((_, index) => (
                          <Box
                            key={index}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            onClick={() => handleImageChange(index)}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>

                  {/* Thumbnail Navigation */}
                  {mediaUrls.length > 1 && (
                    <Box className="flex space-x-2 p-4 overflow-x-auto">
                      {mediaUrls.map((url, index) => (
                        <Card
                          key={index}
                          className={`cursor-pointer transition-all ${
                            index === currentImageIndex ? 'ring-2 ring-red-500' : ''
                          }`}
                          onClick={() => handleImageChange(index)}
                          sx={{ minWidth: 80, height: 80 }}
                        >
                          <CardMedia
                            component="img"
                            image={url}
                            alt={`Thumbnail ${index + 1}`}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Card>
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                <Box className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
                  <Typography variant="h6" className="text-gray-400">
                    No media available
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Right Side - Details */}
          <Box className="w-full lg:w-1/3 mt-[10px]">
            <Box className="p-6 h-full">
              {/* Post Type & Status */}
              <Box className="flex items-center space-x-2 mb-4">
                <Chip
                  icon={<span>{getPostTypeIcon(post.type)}</span>}
                  label={post.type.toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    color: '#60a5fa',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                  }}
                />
                <Chip
                  label={post.is_premium ? 'Premium' : 'Free'}
                  size="small"
                  sx={{
                    backgroundColor: post.is_premium ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: post.is_premium ? '#fbbf24' : '#10b981',
                    border: post.is_premium ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                />
              </Box>

              {/* Content */}
              {post.content && (
                <Box className="mb-6 mt-[5px]">
                  
                  <Typography variant="body1" className="text-gray-300 leading-relaxed">
                    {post.content}
                  </Typography>
                </Box>
              )}

              {/* Stats */}
              {/* <Box className="mb-6">
                <Typography variant="h6" className="text-white mb-3">
                  Statistics
                </Typography>
                <Box className="space-y-3 flex items-center gap-[10px]">
                  
                  
                 
                </Box>
              </Box> */}

              {/* Price Info */}
              {post.is_premium && (
                <Box className="mb-6 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg border border-yellow-500/30">
                  <Typography variant="h6" className="text-yellow-400 mb-2">
                    💰 Premium Content
                  </Typography>
                  <Typography variant="h4" className="text-white font-bold">
                    ${post.unlock_price || 0}
                  </Typography>
                  <Typography variant="body2" className="text-gray-300 mt-1">
                    Unlock to view full content
                  </Typography>
                </Box>
              )}

              {/* Date */}
              <Box className="mb-4">
                <Typography variant="body2" className="text-gray-400">
                  Published: {formatDate(post.createdAt)}
                </Typography>
                {post.updatedAt !== post.createdAt && (
                  <Typography variant="body2" className="text-gray-400">
                    Updated: {formatDate(post.updatedAt)}
                  </Typography>
                )}
              </Box>

              {/* Action Buttons */}
              <Box className="space-y-2 mt-[10px] flex flex-col gap-[10px]">
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Favorite />}
                  sx={{
                    backgroundColor: '#ef4444',
                    '&:hover': { backgroundColor: '#dc2626' }
                  }}
                >
                  Like ({post.likes || 0})
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Comment />}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': { 
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Comment ({post.comments || 0})
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
