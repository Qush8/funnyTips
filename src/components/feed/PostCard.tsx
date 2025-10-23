import { Card, CardContent, CardMedia, CardActions, IconButton, Typography, Avatar, Box } from '@mui/material';
import { Favorite, FavoriteBorder, Comment, Share, MoreVert } from '@mui/icons-material';
import type { Post } from '../../types';
import { useLikePost } from '../../hooks/usePosts';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const likeMutation = useLikePost();

  const handleLike = () => {
    likeMutation.mutate(post.id);
  };

  return (
    <Card className="mb-4 shadow-md">
      <Box className="flex items-center justify-between p-4">
        <Box className="flex items-center gap-3">
          <Avatar src={post.creator?.avatar} alt={post.creator?.displayName} />
          <Box>
            <Typography variant="subtitle2" className="font-semibold">
              {post.creator?.displayName}
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              @{post.creator?.username}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>

      {post.content && (
        <CardContent>
          <Typography variant="body1">{post.content}</Typography>
        </CardContent>
      )}

      {post.media && post.media.length > 0 && (
        <CardMedia
          component={post.media[0].type === 'video' ? 'video' : 'img'}
          image={post.isPPV && !post.isPurchased ? post.media[0].thumbnailUrl : post.media[0].url}
          alt="Post media"
          className="w-full max-h-[600px] object-cover"
          controls={post.media[0].type === 'video'}
        />
      )}

      {post.isPPV && !post.isPurchased && (
        <Box className="bg-gray-100 p-4 text-center">
          <Typography variant="body2" className="text-gray-600">
            🔒 Unlock this content for ${post.price}
          </Typography>
        </Box>
      )}

      <CardActions className="flex justify-between px-4">
        <Box className="flex items-center gap-2">
          <IconButton size="small" onClick={handleLike} disabled={likeMutation.isPending}>
            {post.isLiked ? <Favorite className="text-red-500" /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2">{post.likes}</Typography>

          <IconButton size="small" className="ml-2">
            <Comment />
          </IconButton>
          <Typography variant="body2">{post.comments}</Typography>
        </Box>

        <IconButton size="small">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

