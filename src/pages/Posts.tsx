import { Container, Typography, Box, CircularProgress, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../components/feed/PostCard';

export const Posts = () => {
  const [filter, setFilter] = useState(0);
  const { data: posts, isLoading } = usePosts();

  const handleFilterChange = (_: React.SyntheticEvent, newValue: number) => {
    setFilter(newValue);
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center min-h-screen bg-black">
        <CircularProgress sx={{ color: '#ef4444' }} />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-black">
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

        <Box className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <Box className="md:col-span-8">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {!posts || posts.length === 0 ? (
              <Box className="text-center py-12 bg-gray-900 rounded-lg shadow border border-gray-800">
                <Typography variant="h6" className="text-gray-400">
                  No posts found
                </Typography>
              </Box>
            ) : null}
          </Box>

          <Box className="md:col-span-4">
            <Box className="bg-gray-900 rounded-lg shadow p-4 sticky top-20 border border-gray-800">
              <Typography variant="h6" className="font-semibold mb-3 text-white">
                🔥 Trending Now
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Trending posts and creators
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

