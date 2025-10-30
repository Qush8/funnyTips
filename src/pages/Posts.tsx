import { Container, Typography, Box, CircularProgress, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { models } from '../lib/api';
import { PostCard } from '../components/feed/PostCard';
import { PostDetailModal } from '../components/common/PostDetailModal';
import type { Post } from '../types';

export const Posts = () => {
  const [filter, setFilter] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const page = 1;
  const limit = 10;
  
  const { data: modelPosts, isLoading } = useQuery({
    queryKey: ['modelPosts', page, limit],
    queryFn: () => models.getModelPosts(page, limit),
    enabled: true
  });

  const handleFilterChange = (_: React.SyntheticEvent, newValue: number) => {
    setFilter(newValue);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Tab-ების მიხედვით კონტენტის ფილტრაცია
  const getFilteredPosts = () => {
    if (!modelPosts?.data?.posts || !Array.isArray(modelPosts.data.posts)) {
      return [];
    }

    const posts = modelPosts.data.posts.map((post: any) => ({
      ...post,
      // Creator ინფორმაციის დამატება თუ არ არის
      creator: post.creator || {
        id: post.creator_id || post.creatorId || 'unknown',
        username: post.creator_username || 'unknown',
        displayName: post.creator_name || post.creator_display_name || 'Unknown Creator',
        avatar: post.creator_avatar || 'https://i.pravatar.cc/150?img=1'
      }
    }));

    switch (filter) {
      case 0: // All Posts
        return posts;
      case 1: // Free
        return posts.filter((post: any) => 
          post.access_level === 'free' || !post.is_premium
        );
      case 2: // Premium
        return posts.filter((post: any) => 
          post.is_premium === true || post.access_level === 'premium'
        );
      case 3: // Images
        return posts.filter((post: any) => 
          post.media_urls && post.media_urls.length > 0 && 
          (post.type === 'image' || post.type === 'gallery')
        );
      case 4: // Videos
        return posts.filter((post: any) => 
          post.media_urls && post.media_urls.length > 0 && 
          post.type === 'video'
        );
      default:
        return posts;
    }
  };

  const filteredPosts = getFilteredPosts();

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center min-h-screen bg-black">
        <CircularProgress sx={{ color: '#ef4444' }} />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-black pt-[100px]">
      <Container maxWidth="lg" className="py-8">
        <Box className="mb-6">
          <Typography variant="h3" className="font-bold text-white mb-2">
            📝 All Posts
          </Typography>
          <Typography variant="body1" className="text-gray-400 mb-4">
            Latest content from all creators
          </Typography>

          <Tabs
            value={filter}
            onChange={handleFilterChange}
            sx={{
              borderBottom: '1px solid #333',
              '& .MuiTab-root': { color: 'gray', textTransform: 'none', fontSize: '1rem' },
              '& .Mui-selected': { color: '#ef4444' },
            }}
          >
            <Tab label="🔥 All Posts" />
            <Tab label="🆓 Free" />
            <Tab label="💎 Premium" />
            <Tab label="📷 Images" />
            <Tab label="🎥 Videos" />
          </Tabs>
        </Box>

        <Box className={`${filter === 1 || filter === 2 ? 'flex flex-wrap gap-[20px] justify-center' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'} pt-[20px]`}>
          {filteredPosts && filteredPosts.length > 0 ? (
            filteredPosts.map((post: any, index: number) => {
              // Tab-ის მიხედვით variant-ის განსაზღვრა
              const getVariant = () => {
                switch (filter) {
                  case 0: return 'default'; // All Posts
                  case 1: return 'compact'; // Free
                  case 2: return 'tall'; // Premium
                  case 3: return 'wide'; // Images
                  case 4: return 'default'; // Videos
                  default: return 'default';
                }
              };

              // Tab-ის მიხედვით tabType-ის განსაზღვრა
              const getTabType = () => {
                switch (filter) {
                  case 0: return 'all';
                  case 1: return 'free';
                  case 2: return 'premium';
                  case 3: return 'images';
                  case 4: return 'videos';
                  default: return 'all';
                }
              };

              return (
                <PostCard 
                  key={post.id || index} 
                  post={post} 
                  variant={getVariant()}
                  tabType={getTabType()}
                  onClick={handlePostClick}
                />
              );
            })
          ) : (
            <Box className="col-span-full text-center py-12 bg-gray-900 rounded-lg shadow border border-gray-800">
              <Typography variant="h6" className="text-gray-400">
                {filter === 0 ? 'No posts found' : 
                 filter === 1 ? 'No free posts found' :
                 filter === 2 ? 'No premium posts found' :
                 filter === 3 ? 'No image posts found' :
                 filter === 4 ? 'No video posts found' : 'No posts found'}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>

      {/* Post Detail Modal */}
      <PostDetailModal
        open={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </Box>
  );
};

