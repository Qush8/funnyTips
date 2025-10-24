import React from 'react';
import CreatePostForm from '../components/creator/CreatePostForm';
import { useNavigate } from 'react-router-dom';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <CreatePostForm 
      onCancel={handleCancel}
    />
  );
};

export default CreatePostPage;
