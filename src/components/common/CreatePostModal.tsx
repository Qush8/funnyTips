import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Switch,
  FormControlLabel,
  Slider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Add,
  CloudUpload,
  Delete,
  Close,
} from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { file as fileAPI, models } from '../../lib/api';
import { showToast } from '../../utils/toast';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
}

interface UploadedImage {
  file: File;
  preview: string;
  blurIntensity: number;
  uploadedUrl?: string;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    access_level: 'free',
    blurred_media_urls: [] as string[],
    content: '',
    content_visibility: 'hidden',
    hashtags: [] as string[],
    is_premium: false,
    media_urls: [] as string[],
    price: 0,
    tags: [] as string[],
    title: '',
    type: 'text',
  });

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newHashtag, setNewHashtag] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: models.createPost,
    onSuccess: () => {
      showToast.success('Post created successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts-with-data'] });
      handleClose();
    },
    onError: (error: any) => {
      showToast.error(error.response?.data?.message || 'Failed to create post');
    },
  });

  const uploadFileMutation = useMutation({
    mutationFn: (file: File) => fileAPI.uploadFile(file),
    onSuccess: (data) => {
      return data;
    },
    onError: (error: any) => {
      showToast.error(error.response?.data?.message || 'Failed to upload file');
      throw error;
    },
  });

  const handleClose = () => {
    setFormData({
      access_level: 'free',
      blurred_media_urls: [],
      content: '',
      content_visibility: 'hidden',
      hashtags: [],
      is_premium: false,
      media_urls: [],
      price: 0,
      tags: [],
      title: '',
      type: 'text',
    });
    setUploadedImages([]);
    setNewTag('');
    setNewHashtag('');
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (files: FileList) => {
    setIsUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        // 1. შევქმნათ preview
        const reader = new FileReader();
        const preview = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });

        // 2. ავტომატურად ატვირთოთ API-ზე useMutation-ით
        const uploadResult = await uploadFileMutation.mutateAsync(file);
        
        // 3. დავამატოთ uploadedImages-ში
        const newImage: UploadedImage = {
          file: file,
          preview: preview,
          blurIntensity: 0,
          uploadedUrl: (uploadResult as any).data?.blurred_url || (uploadResult as any).blurred_url || (uploadResult as any).url // API response-იდან URL-ის მიღება
        };
        
        setUploadedImages(prev => [...prev, newImage]);
        showToast.success(`Image "${file.name}" uploaded successfully!`);
      } catch (error) {
        console.error('Error uploading image:', error);
        showToast.error(`Failed to upload image "${file.name}"`);
      }
    }
    
    setIsUploading(false);
  };


  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const updateBlurIntensity = (index: number, intensity: number) => {
    setUploadedImages(prev => 
      prev.map((img, i) => 
        i === index ? { ...img, blurIntensity: intensity } : img
      )
    );
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !formData.hashtags.includes(newHashtag.trim())) {
      handleInputChange('hashtags', [...formData.hashtags, newHashtag.trim()]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (hashtagToRemove: string) => {
    handleInputChange('hashtags', formData.hashtags.filter(hashtag => hashtag !== hashtagToRemove));
  };

  const handleSubmit = async () => {
    try {
      setIsUploading(true);

      // მივიღოთ უკვე ატვირთული URL-ები
      const mediaUrls = uploadedImages
        .filter(img => img.uploadedUrl) // მხოლოდ წარმატებით ატვირთული სურათები
        .map(img => {
          // Extract URL from response object
          if (typeof img.uploadedUrl === 'string') {
            return img.uploadedUrl;
          }
          return img.uploadedUrl;
        });

      const blurredMediaUrls = uploadedImages
        .filter(img => img.uploadedUrl && img.blurIntensity > 0)
        .map(img => {
          if (typeof img.uploadedUrl === 'string') {
            return img.uploadedUrl;
          }
          return img.uploadedUrl;
        });

      const postData = {
        ...formData,
        media_urls: mediaUrls.filter(url => url !== undefined) as string[],
        blurred_media_urls: blurredMediaUrls.filter(url => url !== undefined) as string[],
        blur_intensity: 0,
        preview_content: formData.content,
        preview_media_urls: mediaUrls.filter(url => url !== undefined) as string[],
        required_tier_id: 0,
        unlock_price: formData.price,
      };

      await createPostMutation.mutateAsync(postData);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(rgb(17 45 83), rgb(34 48 70))',
          color: 'white',
          maxHeight: '90vh',
          borderRadius: '12px',
          border: '1px solid #374151',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)', // Safari-ისთვის
        },
      }}
    >
      <DialogTitle className="flex items-center justify-between">
        <Typography variant="h6" className="text-white font-bold">
          Create New Post
        </Typography>
        <IconButton onClick={handleClose} className="text-gray-400">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent 
        className="space-y-6 flex flex-col gap-[20px]"
        sx={{
          paddingTop: '12px !important',
        }}
      >
        {/* Post Type */}
        <FormControl fullWidth>
          <InputLabel className="text-gray-300">Post Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="text-white"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
              '& .MuiSvgIcon-root': { color: '#9CA3AF' },
            }}
          >
            <MenuItem value="text">Text Post</MenuItem>
            <MenuItem value="image">Image Post</MenuItem>
            <MenuItem value="gallery">Gallery Post</MenuItem>
            <MenuItem value="video">Video Post</MenuItem>
          </Select>
        </FormControl>

        {/* Title */}
        <TextField
          fullWidth
          label="Post Title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="text-white"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: '#374151' },
              '&:hover fieldset': { borderColor: '#6B7280' },
              '&.Mui-focused fieldset': { borderColor: '#EF4444' },
            },
            '& .MuiInputLabel-root': { color: '#9CA3AF' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#EF4444' },
          }}
        />

        {/* Content */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Post Content"
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          className="text-white"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: '#374151' },
              '&:hover fieldset': { borderColor: '#6B7280' },
              '&.Mui-focused fieldset': { borderColor: '#EF4444' },
            },
            '& .MuiInputLabel-root': { color: '#9CA3AF' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#EF4444' },
          }}
        />

        {/* Access Level */}
        <FormControl fullWidth>
          <InputLabel className="text-gray-300">Access Level</InputLabel>
          <Select
            value={formData.access_level}
            onChange={(e) => handleInputChange('access_level', e.target.value)}
            className="text-white"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
              '& .MuiSvgIcon-root': { color: '#9CA3AF' },
            }}
          >
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
          </Select>
        </FormControl>

        {/* Premium Settings */}
        {formData.access_level === 'premium' && (
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent>
              <Typography variant="h6" className="text-white mb-4">
                Premium Settings
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_premium}
                    onChange={(e) => handleInputChange('is_premium', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#EF4444' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#EF4444' },
                    }}
                  />
                }
                label="Premium Post"
                className="text-white"
              />

              <TextField
                fullWidth
                type="number"
                label="Price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className="text-white mt-4"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: '#374151' },
                    '&:hover fieldset': { borderColor: '#6B7280' },
                    '&.Mui-focused fieldset': { borderColor: '#EF4444' },
                  },
                  '& .MuiInputLabel-root': { color: '#9CA3AF' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#EF4444' },
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Image Upload */}
        {(formData.type === 'image' || formData.type === 'gallery') && (
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent>
              <Typography variant="h6" className="text-white mb-4">
                Upload Images
              </Typography>
              
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Upload Images
                </Button>
              </label>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <Box className="mt-4 space-y-4">
                  {uploadedImages.map((image, index) => (
                    <Card key={index} className="bg-gray-700 border border-gray-600">
                      <CardContent>
                        <Box className="flex items-center justify-between mb-2">
                          <Typography variant="subtitle2" className="text-white">
                            Image {index + 1}
                          </Typography>
                          <IconButton
                            onClick={() => removeImage(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                        
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        
                        <Typography variant="body2" className="text-gray-300 mb-2">
                          Blur Intensity: {image.blurIntensity}%
                        </Typography>
                        <Slider
                          value={image.blurIntensity}
                          onChange={(_, value) => updateBlurIntensity(index, value as number)}
                          min={0}
                          max={100}
                          className="text-red-500"
                          sx={{
                            '& .MuiSlider-thumb': { color: '#EF4444' },
                            '& .MuiSlider-track': { color: '#EF4444' },
                            '& .MuiSlider-rail': { color: '#374151' },
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        <Box className='flex flex-col gap-[8px]'>
          {/* Tags form */}
             <Card sx={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        }}>
          <CardContent>
            <Typography variant="h6" className="text-white mb-4">
              Tags
            </Typography>
            
            <Box className="flex gap-2 mb-4">
              <TextField
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: '#374151' },
                    '&:hover fieldset': { borderColor: '#6B7280' },
                    '&.Mui-focused fieldset': { borderColor: '#EF4444' },
                  },
                  '& .MuiInputLabel-root': { color: '#9CA3AF' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#EF4444' },
                }}
              />
              <Button
                onClick={addTag}
                variant="outlined"
                startIcon={<Add />}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Add
              </Button>
            </Box>
            
            <Box className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                  className="bg-gray-600 text-white"
                  deleteIcon={<Close />}
                />
              ))}
            </Box>
          </CardContent>
            </Card>

          {/* Tags list */}

           {/* Hashtags */}
          <Card sx={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          }}>
            <CardContent>
              <Typography variant="h6" className="text-white mb-4">
                Hashtags
              </Typography>
              
              <Box className="flex gap-2 mb-4">
                <TextField
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  placeholder="Add hashtag"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: '#374151' },
                      '&:hover fieldset': { borderColor: '#6B7280' },
                      '&.Mui-focused fieldset': { borderColor: '#EF4444' },
                    },
                    '& .MuiInputLabel-root': { color: '#9CA3AF' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#EF4444' },
                  }}
                />
                <Button
                  onClick={addHashtag}
                  variant="outlined"
                  startIcon={<Add />}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Add
                </Button>
              </Box>
              
              <Box className="flex flex-wrap gap-2">
                {formData.hashtags.map((hashtag, index) => (
                  <Chip
                    key={index}
                    label={`#${hashtag}`}
                    onDelete={() => removeHashtag(hashtag)}
                    className="bg-gray-600 text-white"
                    deleteIcon={<Close />}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
          {/* Hashtags list */}
        </Box>
       

       
      </DialogContent>

      <DialogActions className="p-6">
        <Button
          onClick={handleClose}
          variant="outlined"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isUploading || createPostMutation.isPending}
          sx={{
            background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
            },
            '&:disabled': {
              background: '#6B7280',
            },
          }}
        >
          {isUploading || createPostMutation.isPending ? 'Creating...' : 'Create Post'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
