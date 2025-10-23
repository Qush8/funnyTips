import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Box } from '@mui/material';

export const Layout = () => {
  return (
    <Box className="min-h-screen bg-black">
      <Navbar />
      <Box component="main" className="pt-16">
        <Outlet />
      </Box>
    </Box>
  );
};
