import { Card, CardContent, Avatar, Typography, Button, Box, Chip } from '@mui/material';
import { Verified } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';

interface CreatorCardProps {
  creator: User;
  isSubscribed?: boolean;
}

export const CreatorCard = ({ creator, isSubscribed = false }: CreatorCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/@${creator.username}`);
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <Box className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
        {creator.coverImage && (
          <img src={creator.coverImage} alt="Cover" className="w-full h-full object-cover" />
        )}
      </Box>

      <CardContent className="text-center -mt-12">
        <Avatar
          src={creator.avatar}
          alt={creator.displayName}
          className="w-24 h-24 mx-auto border-4 border-white"
        />

        <Box className="flex items-center justify-center gap-1 mt-2">
          <Typography variant="h6" className="font-bold">
            {creator.displayName}
          </Typography>
          {creator.verified && <Verified className="text-blue-500 w-5 h-5" />}
        </Box>

        <Typography variant="body2" className="text-gray-500">
          @{creator.username}
        </Typography>

        {creator.bio && (
          <Typography variant="body2" className="text-gray-600 mt-2 line-clamp-2">
            {creator.bio}
          </Typography>
        )}

        {creator.subscriptionPrice && (
          <Chip
            label={`$${creator.subscriptionPrice}/month`}
            color="primary"
            size="small"
            className="mt-3"
          />
        )}

        <Box className="flex gap-2 mt-4">
          <Button variant="outlined" fullWidth onClick={handleViewProfile}>
            View Profile
          </Button>
          {!isSubscribed && (
            <Button variant="contained" color="primary" fullWidth>
              Subscribe
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

