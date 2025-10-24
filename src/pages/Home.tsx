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

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts && Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Box className="col-span-full text-center py-12 bg-gray-900 rounded-lg shadow border border-gray-800">
              <Typography variant="h6" className="text-gray-400">
                No posts yet. Follow some creators!
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
