import React from 'react';
import CreatePostForm from '../components/creator/CreatePostForm';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (postData: any) => {
    console.log('Post Data:', postData);
    showToast.success('Post created successfully!');
    navigate('/home');
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <CreatePostForm 
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default CreatePostPage;
