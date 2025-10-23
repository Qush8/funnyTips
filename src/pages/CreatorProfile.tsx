import { useParams } from 'react-router-dom';
import { Container, Box, Avatar, Typography, Button, Tabs, Tab, CircularProgress } from '@mui/material';
import { Verified, Add } from '@mui/icons-material';
import { useState } from 'react';
import { MOCK_CREATORS } from '../data/mockData';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../components/feed/PostCard';
import { useAuth } from '../contexts/AuthContext';

export const CreatorProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  // Find creator by username
  const creator = MOCK_CREATORS.find(c => c.username === username?.replace('@', ''));
  const { data: posts, isLoading: postsLoading } = usePosts(creator?.id);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!creator) {
    return (
      <Box className="min-h-screen bg-black">
        <Container className="py-8">
          <Typography variant="h5" className="text-white">Creator not found</Typography>
        </Container>
      </Box>
    );
  }

  const isOwnProfile = userData?.id === creator.id;

  return (
    <Box className="min-h-screen bg-black">
      <Box className="relative h-64 bg-gradient-to-r from-red-900 to-pink-900">
        {creator.coverImage && (
          <img src={creator.coverImage} alt="Cover" className="w-full h-full object-cover" />
        )}
      </Box>

      <Container maxWidth="lg">
        <Box className="relative -mt-20 pb-8">
          <Box className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <Avatar
              src={creator.avatar}
              alt={creator.displayName}
              className="w-32 h-32 border-4 border-black shadow-lg"
            />

            <Box className="flex-1">
              <Box className="flex items-center gap-2">
                <Typography variant="h4" className="font-bold text-white">
                  {creator.displayName}
                </Typography>
                {creator.verified && <Verified className="text-blue-500 w-6 h-6" />}
              </Box>
              <Typography variant="body1" className="text-gray-400">
                @{creator.username}
              </Typography>
            </Box>

            <Box className="flex gap-2">
              {isOwnProfile ? (
                <Button variant="outlined" startIcon={<Add />} sx={{ color: 'white', borderColor: '#ef4444' }}>
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
                      },
                    }}
                  >
                    Subscribe ${creator.subscriptionPrice}/mo
                  </Button>
                  <Button variant="outlined" sx={{ color: 'white', borderColor: '#ef4444' }}>
                    Message
                  </Button>
                </>
              )}
            </Box>
          </Box>

          {creator.bio && (
            <Typography variant="body1" className="mt-4 text-gray-300">
              {creator.bio}
            </Typography>
          )}

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="mt-6 border-b border-gray-800"
            sx={{
              '& .MuiTab-root': { color: 'gray' },
              '& .Mui-selected': { color: '#ef4444' },
            }}
          >
            <Tab label="Posts" />
            <Tab label="Media" />
            <Tab label="About" />
          </Tabs>

          <Box className="mt-6">
            {activeTab === 0 && (
              <Box>
                {postsLoading ? (
                  <Box className="flex justify-center py-8">
                    <CircularProgress sx={{ color: '#ef4444' }} />
                  </Box>
                ) : (
                  <Box className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <Box className="md:col-span-8">
                      {posts?.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                      {!posts || posts.length === 0 ? (
                        <Typography variant="body1" className="text-gray-400 text-center py-8">
                          No posts yet
                        </Typography>
                      ) : null}
                    </Box>
                    <Box className="md:col-span-4">
                      <Box className="bg-gray-900 rounded-lg shadow p-4 sticky top-20 border border-gray-800">
                        <Typography variant="h6" className="font-semibold mb-2 text-white">
                          About
                        </Typography>
                        <Typography variant="body2" className="text-gray-400">
                          {creator.bio || 'No bio available'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
            {activeTab === 1 && (
              <Typography variant="body1" className="text-gray-400 text-center py-8">
                Media gallery - Coming soon
              </Typography>
            )}
            {activeTab === 2 && (
              <Box className="bg-gray-900 rounded-lg shadow p-6 border border-gray-800">
                <Typography variant="h6" className="font-semibold mb-4 text-white">
                  About {creator.displayName}
                </Typography>
                <Typography variant="body1" className="text-gray-300">
                  {creator.bio || 'No bio available'}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
