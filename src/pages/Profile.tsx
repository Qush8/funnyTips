import { useState } from 'react';
import { 
  Container, 
  Box, 
  Avatar, 
  Typography, 
  Button, 
  Tabs, 
  Tab, 
  CircularProgress,
  IconButton,
  Card,
  CardContent,
  Paper,
  Divider
} from '@mui/material';
import { 
  Add, 
  Edit, 
  MoreVert,
  Share
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../components/feed/PostCard';
import CreatePostModal from '../components/common/CreatePostModal';
import { useQuery } from '@tanstack/react-query';
import { models } from '../lib/api';

export const Profile = () => {
  const { userData } = useAuth();
  const { data: posts, isLoading: postsLoading } = usePosts(userData?.id);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState(0);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  // Use posts-with-data endpoint from api.ts
  const { data: postsWithData } = useQuery({
    queryKey: ['posts-with-data'],
    queryFn: async () => {
      const response = await models.getModelPostsWithData();
      console.log('Posts with data response:', response);
      return response;
    },
  });

  // Extract data from postsWithData
  const profileData = postsWithData?.data || postsWithData;
  const userProfile = profileData?.user || profileData?.model;
  const userPosts = profileData?.posts || [];
  const userStats = profileData?.stats || {};

  // Use postsWithData for profile info if available
  const displayUser = userProfile || userData;
  const displayPosts = userPosts.length > 0 ? userPosts : (Array.isArray(posts) ? posts : []);

 

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFilterChange = (_: React.SyntheticEvent, newValue: number) => {
    setFilter(newValue);
  };

  // Tab-ების მიხედვით კონტენტის ფილტრაცია (Posts-ის მსგავსად)
  const getFilteredPosts = () => {
    if (!displayPosts || !Array.isArray(displayPosts)) {
      return [];
    }

    switch (filter) {
      case 0: // All Posts
        return displayPosts;
      case 1: // Free
        return displayPosts.filter((post: any) => 
          post.access_level === 'free' || !post.is_premium
        );
      case 2: // Premium
        return displayPosts.filter((post: any) => 
          post.is_premium === true || post.access_level === 'premium'
        );
      case 3: // Images
        return displayPosts.filter((post: any) => 
          post.media_urls && post.media_urls.length > 0 && 
          (post.type === 'image' || post.type === 'gallery')
        );
      case 4: // Videos
        return displayPosts.filter((post: any) => 
          post.media_urls && post.media_urls.length > 0 && 
          post.type === 'video'
        );
      default:
        return displayPosts;
    }
  };

  const filteredPosts = getFilteredPosts();

  if (!userData) {
    return (
      <Box className="min-h-screen bg-black flex justify-center items-center">
        <CircularProgress sx={{ color: '#ef4444' }} />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-black pt-[100px]">
      {/* Cover Photo Section */}
      <Box className="relative ">
        <Box className="h-80 bg-gradient-to-r from-red-900 to-pink-900">
          {displayUser?.coverImage || displayUser?.bannerImage ? (
            <img 
              src={displayUser?.coverImage || displayUser?.bannerImage} 
              alt="Cover" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Cover Photo" 
              className="w-full h-full object-cover" 
            />
          )}
        </Box>
        
        {/* Cover Photo Edit Button */}
        {/* <IconButton
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
          size="small"
        >
          <CameraAlt />
        </IconButton> */}
      </Box>

      <Container className='absolute  top-[680px]' maxWidth="lg">
        {/* Profile Info Section */}
        <Box className="relative pb-6">
          <Card 
            className="bg-gray-900 shadow-2xl"
            sx={{
              background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(45,45,45,0.9) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <CardContent className="p-6">
              <Box className="flex flex-col md:flex-row items-start md:items-end gap-[10px]">
                {/* Profile Picture */}
                <Box className="relative">
                  <Avatar
                    src={displayUser?.avatar || displayUser?.profileImage || displayUser?.photo}
                    alt={displayUser?.displayName || displayUser?.name}
                    className="w-32 h-32 shadow-lg"
                  />
                  {/* <IconButton
                    className="absolute -bottom-2 -right-2 bg-red-500 text-white hover:bg-red-600"
                    size="small"
                  >
                    <CameraAlt fontSize="small" />
                  </IconButton> */}
                </Box>

                {/* Profile Details */}
                <Box className="flex-1">
                  {/* <Box className="flex items-center gap-2 mb-2">
                    <Typography variant="h4" className="font-bold text-white">
                      {displayUser?.displayName || displayUser?.name || displayUser?.username}
                    </Typography>
                    {displayUser?.verified && (
                      <Verified className="text-blue-500 w-6 h-6" />
                    )}
                  </Box>
                  
                  <Typography variant="body1" className="text-gray-400 mb-2">
                    @{displayUser?.username || displayUser?.handle || displayUser?.user_handle}
                  </Typography>

                  {(displayUser?.bio || displayUser?.description || displayUser?.about || displayUser?.summary) && (
                    <Typography variant="body1" className="text-gray-300 mb-3">
                      {displayUser?.bio || displayUser?.description || displayUser?.about || displayUser?.summary}
                    </Typography>
                  )} */}

                  {/* Social Links */}
                  {/* {(displayUser?.socialLinks || displayUser?.social_links || displayUser?.social_media) && (
                    <Box className="flex gap-2 mb-3">
                      {(displayUser?.socialLinks?.instagram || displayUser?.social_links?.instagram || displayUser?.social_media?.instagram) && (
                        <Chip 
                          label="Instagram" 
                          size="small" 
                          variant="outlined"
                          className="text-pink-500 border-pink-500"
                        />
                      )}
                      {(displayUser?.socialLinks?.twitter || displayUser?.social_links?.twitter || displayUser?.social_media?.twitter) && (
                        <Chip 
                          label="Twitter" 
                          size="small" 
                          variant="outlined"
                          className="text-blue-500 border-blue-500"
                        />
                      )}
                      {(displayUser?.socialLinks?.tiktok || displayUser?.social_links?.tiktok || displayUser?.social_media?.tiktok) && (
                        <Chip 
                          label="TikTok" 
                          size="small" 
                          variant="outlined"
                          className="text-white border-white"
                        />
                      )}
                      {(displayUser?.socialLinks?.youtube || displayUser?.social_links?.youtube || displayUser?.social_media?.youtube) && (
                        <Chip 
                          label="YouTube" 
                          size="small" 
                          variant="outlined"
                          className="text-red-500 border-red-500"
                        />
                      )}
                      {(displayUser?.socialLinks?.onlyfans || displayUser?.social_links?.onlyfans || displayUser?.social_media?.onlyfans) && (
                        <Chip 
                          label="OnlyFans" 
                          size="small" 
                          variant="outlined"
                          className="text-purple-500 border-purple-500"
                        />
                      )}
                    </Box>
                  )} */}


                  {/* Stats */}
                  

                  {/* User Info from useQuery */}
                  <Box className="mt-4 space-y-2">
                      {/* Debug Info */}
                    
                      {/* Display from model object */}
                      {displayUser?.model?.first_name && displayUser?.model?.last_name && (
                        <Typography variant="body2" className="text-white font-semibold">
                          {displayUser.model.first_name} {displayUser.model.last_name}
                        </Typography>
                      )}
                      {displayUser?.model?.age && (
                        <Typography variant="body2" className="text-gray-400">
                          Age: {displayUser.model.age}
                        </Typography>
                      )}
                      {displayUser?.model?.bio && (
                        <Typography variant="body2" className="text-gray-300">
                          {displayUser.model.bio}
                        </Typography>
                      )}
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box className="flex gap-[10px]">
                  <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    onClick={() => setShowCreatePostModal(true)}
                    sx={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
                      },
                    }}
                  >
                    Create Post
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    startIcon={<Edit />}
                    className="border-red-500 text-red-500 hover:bg-red-500/10"
                  >
                    Edit Profile
                  </Button>
                 
                  
                </Box>
                
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Navigation Tabs */}
        <Paper 
          className="bg-gray-900 shadow-lg mt-[20px]"
          sx={{
            background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(45,45,45,0.9) 100%)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { 
                color: 'gray',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500
              },
              '& .Mui-selected': { 
                color: '#ef4444',
                fontWeight: 600
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#ef4444',
                height: 3
              }
            }}
          >
            <Tab label={`Posts (${displayPosts.length})`} />
            <Tab label="Subscriptions" />
          </Tabs>
        </Paper>

        {/* Content Area */}
        <Box className="mt-[20px]">
          {activeTab === 0 && (
            <Box className="flex flex-col lg:flex-row gap-6">
              {/* Posts Column */}
              <Box className="flex-1 lg:w-2/3">
                {/* Posts Filter Tabs - Posts-ის მსგავსად */}
                <Box className="mb-6">
                  <Tabs
                    value={filter}
                    onChange={handleFilterChange}
                    sx={{
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

                {postsLoading ? (
                  <Box className="flex justify-center py-8">
                    <CircularProgress sx={{ color: '#ef4444' }} />
                  </Box>
                ) : (
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
                          />
                        );
                      })
                    ) : (
                      <Box className="col-span-full text-center py-12 bg-gray-900 rounded-lg shadow">
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
                )}
              </Box>

              {/* Sidebar */}
              <Box className="w-full lg:w-1/3">
                <Box className="space-y-4">
                  {/* About Card */}
                  <Card className="bg-gray-900">
                    <CardContent>
                      <Typography variant="h6" className="font-semibold mb-3 text-white">
                        About
                      </Typography>
                      <Box className="space-y-3">
                        {(displayUser?.bio || displayUser?.description) && (
                          <Typography variant="body2" className="text-gray-300">
                            {displayUser?.bio || displayUser?.description}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Stats Card */}
                  <Card className="bg-gray-900">
                    <CardContent>
                      <Typography variant="h6" className="font-semibold mb-3 text-white">
                        Stats
                      </Typography>
                      <Box className="space-y-2">
                        <Box className="flex justify-between">
                          <Typography variant="body2" className="text-gray-400">
                            Posts
                          </Typography>
                          <Typography variant="body2" className="font-semibold text-white">
                            {displayPosts.length}
                          </Typography>
                        </Box>
                        {(userStats?.followers || userStats?.follower_count || userStats?.total_followers) && (
                          <Box className="flex justify-between">
                            <Typography variant="body2" className="text-gray-400">
                              Followers
                            </Typography>
                            <Typography variant="body2" className="font-semibold text-white">
                              {userStats?.followers || userStats?.follower_count || userStats?.total_followers}
                            </Typography>
                          </Box>
                        )}
                        {(userStats?.likes || userStats?.like_count || userStats?.total_likes) && (
                          <Box className="flex justify-between">
                            <Typography variant="body2" className="text-gray-400">
                              Likes
                            </Typography>
                            <Typography variant="body2" className="font-semibold text-red-500">
                              {userStats?.likes || userStats?.like_count || userStats?.total_likes}
                            </Typography>
                          </Box>
                        )}
                        {(userStats?.views || userStats?.view_count || userStats?.total_views) && (
                          <Box className="flex justify-between">
                            <Typography variant="body2" className="text-gray-400">
                              Views
                            </Typography>
                            <Typography variant="body2" className="font-semibold text-blue-500">
                              {userStats?.views || userStats?.view_count || userStats?.total_views}
                            </Typography>
                          </Box>
                        )}
                        {(userStats?.subscribers || userStats?.subscriber_count || userStats?.total_subscribers) && (
                          <Box className="flex justify-between">
                            <Typography variant="body2" className="text-gray-400">
                              Subscribers
                            </Typography>
                            <Typography variant="body2" className="font-semibold text-purple-500">
                              {userStats?.subscribers || userStats?.subscriber_count || userStats?.total_subscribers}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          )}

          {activeTab === 1 && (
            <Card className="bg-gray-900">
              <CardContent className="p-6">
                <Typography variant="h6" className="font-semibold mb-4 text-white">
                  About {displayUser?.displayName || displayUser?.name || displayUser?.username}
                </Typography>
                <Divider className="mb-4" />
                <Box className="space-y-4">
                  <Box>
                    <Typography variant="subtitle1" className="font-semibold mb-2 text-white">
                      Bio
                    </Typography>
                    <Typography variant="body1" className="text-gray-300">
                      {displayUser?.bio || displayUser?.description || 'No bio available'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

      
        </Box>
      </Container>

      {/* Create Post Modal */}
      <CreatePostModal
        open={showCreatePostModal}
        onClose={() => setShowCreatePostModal(false)}
      />
    </Box>
  );
};
