import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../contexts/AuthContext';
import { PostCard } from '../components/feed/PostCard';

export const Home = () => {
  const { userData } = useAuth();
  const { data: posts, isLoading } = usePosts();

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
        <Typography variant="h4" className="font-bold mb-6 text-white">
          {userData ? `Welcome back, ${userData.displayName}! 🔥` : 'Explore Content'}
        </Typography>

        <Box className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <Box className="md:col-span-8">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {!posts || posts.length === 0 ? (
              <Box className="text-center py-12 bg-gray-900 rounded-lg shadow border border-gray-800">
                <Typography variant="h6" className="text-gray-400">
                  No posts yet. Follow some creators!
                </Typography>
              </Box>
            ) : null}
          </Box>

          <Box className="md:col-span-4">
            <Box className="bg-gray-900 rounded-lg shadow p-4 sticky top-20 border border-gray-800">
              <Typography variant="h6" className="font-semibold mb-3 text-white">
                🔥 Suggested Creators
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Discover amazing creators
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
