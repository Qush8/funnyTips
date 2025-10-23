import { AppBar, Toolbar, IconButton, Button, Avatar, Menu, MenuItem, Box, Typography } from '@mui/material';
import { Notifications, Message, VideoCall, Collections, Person, Article, FlashOn } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NAV_ITEMS = [
  { label: 'LIVE', path: '/live', icon: VideoCall },
  { label: 'Shorts', path: '/shorts', icon: FlashOn },
  { label: 'Images', path: '/images', icon: Collections },
  { label: 'Models', path: '/models', icon: Person },
  { label: 'Posts', path: '/posts', icon: Article },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userData, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleClose();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
// 
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,20,20,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(239, 68, 68, 0.1)',
      }}
    >
      <Toolbar className="flex justify-between px-4">
        {/* Logo */}
        <Box className="flex items-center gap-2">
          <Typography
            variant="h5"
            className="font-bold cursor-pointer"
            onClick={() => navigate('/home')}
            sx={{
              background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              letterSpacing: '-0.5px',
            }}
          >
            FunnyTips
          </Typography>
        </Box>

        {/* Navigation Links */}
        {currentUser && (
          <Box className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  startIcon={<Icon />}
                  sx={{
                    color: active ? '#ef4444' : 'rgba(255,255,255,0.7)',
                    fontWeight: active ? 700 : 500,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    px: 2,
                    py: 1,
                    borderRadius: '12px',
                    position: 'relative',
                    '&:hover': {
                      color: '#ef4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    },
                    '&::after': active ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: '3px',
                      background: 'linear-gradient(90deg, #ef4444, #ec4899)',
                      borderRadius: '2px',
                    } : {},
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        )}

        {/* Right Actions */}
        <Box className="flex items-center gap-2">
          {currentUser ? (
            <>
              <IconButton
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': {
                    color: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  },
                }}
                onClick={() => navigate('/messages')}
              >
                <Message />
              </IconButton>
              <IconButton
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': {
                    color: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  },
                }}
              >
                <Notifications />
              </IconButton>
              <IconButton onClick={handleMenu}>
                <Avatar
                  src={userData?.avatar}
                  alt={userData?.displayName}
                  sx={{
                    width: 36,
                    height: 36,
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #ef4444, #ec4899) 1',
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    border: '1px solid #333',
                    borderRadius: '12px',
                    mt: 1,
                  },
                }}
              >
                <MenuItem onClick={() => { navigate(`/@${userData?.username}`); handleClose(); }}>
                  👤 Profile
                </MenuItem>
                <MenuItem onClick={() => { navigate('/settings'); handleClose(); }}>
                  ⚙️ Settings
                </MenuItem>
                {userData?.role === 'CREATOR' && (
                  <MenuItem onClick={() => { navigate('/upload'); handleClose(); }}>
                    📤 Upload
                  </MenuItem>
                )}
                <MenuItem onClick={handleSignOut} sx={{ color: '#ef4444' }}>
                  🚪 Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: '#ef4444',
                  color: 'white',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/signup')}
                sx={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
