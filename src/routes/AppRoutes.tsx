import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardByRole } from '../utils/getDashboardByRole';
import { LoadingScreen } from '../components/ui/LoadingScreen';

// Layout
import { Layout } from '../components/layout/Layout';

// Public pages
import { Login } from '../pages/Login';
import { SignUp } from '../pages/SignUp';

// Protected pages
import { Home } from '../pages/Home';
import { Explore } from '../pages/Explore';
import { CreatorProfile } from '../pages/CreatorProfile';
import { Messages } from '../pages/Messages';
import { Live } from '../pages/Live';
import { Shorts } from '../pages/Shorts';
import { Images } from '../pages/Images';
import { Models } from '../pages/Models';
import { Posts } from '../pages/Posts';
import CreatePostPage from '../pages/CreatePostPage';

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <Routes>
      {!currentUser ? (
        <Fragment>
          {/* Public routes - No Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Fragment>
      ) : (
        <Fragment>
          {/* Protected routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to={getDashboardByRole(currentUser)} replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/@:username" element={<CreatorProfile />} />
            <Route path="/messages" element={<Messages />} />
            
            {/* New Navigation Pages */}
            <Route path="/live" element={<Live />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/images" element={<Images />} />
            <Route path="/models" element={<Models />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={getDashboardByRole(currentUser)} replace />} />
        </Fragment>
      )}
    </Routes>
  );
};

export default AppRoutes;
