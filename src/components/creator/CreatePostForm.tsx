import React, { useState } from 'react';
import {
  Box,
  Container,
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
  Paper,
} from '@mui/material';
import {
  Add,
  Lock,
  Tag,
  Image,
  TextFields,
  CloudUpload,
  Delete,
} from '@mui/icons-material';

interface CreatePostProps {
  onSubmit: (postData: any) => void;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    access_level: 'free',
    blur_intensity: 0,
    blurred_media_urls: [] as string[],
    content: '',
    content_visibility: 'hidden',
    hashtags: [] as string[],
    is_premium: false,
    media_urls: [] as string[],
    preview_content: '',
    preview_media_urls: [] as string[],
    required_tier_id: 0,
    type: 'text',
    unlock_price: 0,
  });

  const [newHashtag, setNewHashtag] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newPreviewMediaUrl, setNewPreviewMediaUrl] = useState('');
  const [newBlurredMediaUrl, setNewBlurredMediaUrl] = useState('');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddHashtag = () => {
    if (newHashtag.trim() && !formData.hashtags.includes(newHashtag.trim())) {
      setFormData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag.trim()]
      }));
      setNewHashtag('');
    }
  };

  const handleRemoveHashtag = (hashtag: string) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(h => h !== hashtag)
    }));
  };

  const handleAddMediaUrl = () => {
    if (newMediaUrl.trim() && !formData.media_urls.includes(newMediaUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        media_urls: [...prev.media_urls, newMediaUrl.trim()]
      }));
      setNewMediaUrl('');
    }
  };

  const handleRemoveMediaUrl = (url: string) => {
    setFormData(prev => ({
      ...prev,
      media_urls: prev.media_urls.filter(u => u !== url)
    }));
  };

  const handleAddPreviewMediaUrl = () => {
    if (newPreviewMediaUrl.trim() && !formData.preview_media_urls.includes(newPreviewMediaUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        preview_media_urls: [...prev.preview_media_urls, newPreviewMediaUrl.trim()]
      }));
      setNewPreviewMediaUrl('');
    }
  };

  const handleRemovePreviewMediaUrl = (url: string) => {
    setFormData(prev => ({
      ...prev,
      preview_media_urls: prev.preview_media_urls.filter(u => u !== url)
    }));
  };

  const handleAddBlurredMediaUrl = () => {
    if (newBlurredMediaUrl.trim() && !formData.blurred_media_urls.includes(newBlurredMediaUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        blurred_media_urls: [...prev.blurred_media_urls, newBlurredMediaUrl.trim()]
      }));
      setNewBlurredMediaUrl('');
    }
  };

  const handleRemoveBlurredMediaUrl = (url: string) => {
    setFormData(prev => ({
      ...prev,
      blurred_media_urls: prev.blurred_media_urls.filter(u => u !== url)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setUploadedImages(prev => [...prev, ...files]);
      
      // Create previews
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box 
      className="min-h-screen pt-[100px]"
      sx={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d1b69 100%)',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg" className="py-8">
        <Card 
          sx={{ 
            background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(45,45,45,0.9) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '24px',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(239, 68, 68, 0.1)',
          }}
        >
          <CardContent className="p-8">
            <Box className="text-center mb-12">
              <Box className="inline-flex items-center gap-6 mb-6">
                <Box 
                  sx={{
                    p: 3,
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                    boxShadow: '0 12px 30px rgba(239, 68, 68, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 16px 40px rgba(239, 68, 68, 0.6)',
                    },
                  }}
                >
                  <TextFields sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <Typography 
                  variant="h3" 
                  className="text-white font-bold"
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Create New Post
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                className="text-gray-300"
                sx={{
                  opacity: 0.8,
                  fontWeight: 400,
                  letterSpacing: '0.5px',
                }}
              >
                Share your content with the world
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box className="space-y-8 flex flex-col gap-[20px]">
                {/* Basic Content */}
                <Box>
                  <Paper 
                    className="flex flex-col gap-[20px]"
                    sx={{ 
                      p: 4, 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', 
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: 'rgba(239, 68, 68, 0.4)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      className="text-white mb-8 flex items-center gap-[3px]"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.3px',
                      }}
                    >
                      <Box 
                        sx={{
                          p: 1.5,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                        }}
                      >
                        <TextFields sx={{ fontSize: 22, color: 'white' }} />
                      </Box>
                      Basic Content
                    </Typography>
                    
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-[15px] ">
                      <Box className="w-full md:w-1/2">
                        <FormControl fullWidth>
                          <InputLabel className="text-gray-300">Post Type</InputLabel>
                          <Select
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="text-white"
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ef4444' },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ef4444' },
                            }}
                          >
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="image">Image</MenuItem>
                            <MenuItem value="video">Video</MenuItem>
                            <MenuItem value="gallery">Gallery</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box className="w-full md:w-1/2">
                        <FormControl fullWidth>
                          <InputLabel className="text-gray-300">Access Level</InputLabel>
                          <Select
                            value={formData.access_level}
                            onChange={(e) => handleInputChange('access_level', e.target.value)}
                            className="text-white"
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ef4444' },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ef4444' },
                            }}
                          >
                            <MenuItem value="free">Free</MenuItem>
                            <MenuItem value="premium">Premium</MenuItem>
                            <MenuItem value="vip">VIP</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Content"
                          value={formData.content}
                          onChange={(e) => handleInputChange('content', e.target.value)}
                          className="text-white"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#444' },
                              '&:hover fieldset': { borderColor: '#ef4444' },
                              '&.Mui-focused fieldset': { borderColor: '#ef4444' },
                            },
                            '& .MuiInputLabel-root': { color: '#9ca3af' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' },
                          }}
                        />
                      </Box>

                      <Box>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Preview Content"
                          value={formData.preview_content}
                          onChange={(e) => handleInputChange('preview_content', e.target.value)}
                          className="text-white"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#444' },
                              '&:hover fieldset': { borderColor: '#ef4444' },
                              '&.Mui-focused fieldset': { borderColor: '#ef4444' },
                            },
                            '& .MuiInputLabel-root': { color: '#9ca3af' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' },
                          }}
                        />
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                {/* Premium Settings */}
                <Box>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', 
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: 'rgba(239, 68, 68, 0.4)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      className="text-white mb-6 flex items-center gap-[3px]"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      <Box 
                        sx={{
                          p: 1.5,
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Lock sx={{ fontSize: 20, color: 'white' }} />
                      </Box>
                      Premium Settings
                    </Typography>
                    
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 flex flex-col gap-[15px]">
                      <Box className="w-full md:w-1/2">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={formData.is_premium}
                              onChange={(e) => handleInputChange('is_premium', e.target.checked)}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#ef4444',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#ef4444',
                                },
                              }}
                            />
                          }
                          label={
                            <Typography className="text-white">
                              Premium Content
                            </Typography>
                          }
                        />
                      </Box>

                      <Box className="w-full md:w-1/2">
                        <FormControl fullWidth>
                          <InputLabel className="text-gray-300">Content Visibility</InputLabel>
                          <Select
                            value={formData.content_visibility}
                            onChange={(e) => handleInputChange('content_visibility', e.target.value)}
                            className="text-white"
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ef4444' },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ef4444' },
                            }}
                          >
                            <MenuItem value="visible">Visible</MenuItem>
                            <MenuItem value="hidden">Hidden</MenuItem>
                            <MenuItem value="blurred">Blurred</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box className="w-full md:w-1/2">
                        <TextField
                          fullWidth
                          type="number"
                          label="Unlock Price ($)"
                          value={formData.unlock_price}
                          onChange={(e) => handleInputChange('unlock_price', parseFloat(e.target.value) || 0)}
                          className="text-white"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#444' },
                              '&:hover fieldset': { borderColor: '#ef4444' },
                              '&.Mui-focused fieldset': { borderColor: '#ef4444' },
                            },
                            '& .MuiInputLabel-root': { color: '#9ca3af' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' },
                          }}
                        />
                      </Box>

                      <Box className="w-full md:w-1/2">
                        <TextField
                          fullWidth
                          type="number"
                          label="Required Tier ID"
                          value={formData.required_tier_id}
                          onChange={(e) => handleInputChange('required_tier_id', parseInt(e.target.value) || 0)}
                          className="text-white"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#444' },
                              '&:hover fieldset': { borderColor: '#ef4444' },
                              '&.Mui-focused fieldset': { borderColor: '#ef4444' },
                            },
                            '& .MuiInputLabel-root': { color: '#9ca3af' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' },
                          }}
                        />
                      </Box>

                     
                    </Box>
                  </Paper>
                </Box>

                {/* Media URLs */}
                

                {/* Image Upload Section */}
                <Box>
                  <Paper 
                  className='flex flex-col gap-[15px]'
                    sx={{ 
                      p: 4, 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', 
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: 'rgba(239, 68, 68, 0.4)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      className="text-white mb-8 flex items-center gap-[3px]"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.3px',
                      }}
                    >
                      <Box 
                        sx={{
                          p: 1.5,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                        }}
                      >
                        <CloudUpload sx={{ fontSize: 22, color: 'white' }} />
                      </Box>
                      Upload Images
                    </Typography>
                    
                    {/* Upload Button */}
                    <Box className="mb-6">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button
                          onClick={() => console.log("clicked")}
                          component="span"
                          variant="outlined"
                          startIcon={<CloudUpload />}
                          sx={{
                            borderColor: '#ef4444',
                            color: '#ef4444',
                            border: '2px dashed #ef4444',
                            borderRadius: '12px',
                            py: 2,
                            px: 4,
                            width: '100%',
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            '&:hover': {
                              borderColor: '#dc2626',
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          Click to Upload Images
                        </Button>
                      </label>
                    </Box>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {imagePreviews.map((preview, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: 'relative',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              border: '2px solid #333',
                              background: 'linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(45,45,45,0.6) 100%)',
                              backdropFilter: 'blur(10px)',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                              '&:hover': {
                                borderColor: '#ef4444',
                                transform: 'scale(1.02)',
                                boxShadow: '0 12px 30px rgba(239, 68, 68, 0.4)',
                              },
                            }}
                          >
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '300px',
                                objectFit: 'cover',
                                display: 'block',
                                filter: `blur(${formData.blur_intensity}px)`,
                                transition: 'filter 0.3s ease',
                              }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                background: 'rgba(0,0,0,0.7)',
                                borderRadius: '50%',
                                p: 0.5,
                                cursor: 'pointer',
                                '&:hover': {
                                  background: 'rgba(239, 68, 68, 0.8)',
                                },
                                transition: 'all 0.2s',
                              }}
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Delete sx={{ color: 'white', fontSize: 20 }} />
                            </Box>
                            
                            
                            {/* Blur Slider for each image */}
                            <Box 
                              sx={{ 
                                p: 3, 
                                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(26,26,26,0.9) 100%)', 
                                borderRadius: '0 0 16px 16px',
                                borderTop: '1px solid rgba(239, 68, 68, 0.2)',
                              }}
                            >
                              <Typography 
                                variant="body2" 
                                className="text-white mb-3 block text-center font-semibold"
                                sx={{
                                  background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                }}
                              >
                                Blur Intensity
                              </Typography>
                              <Slider
                                value={formData.blur_intensity}
                                onChange={(_, value) => handleInputChange('blur_intensity', value)}
                                min={0}
                                max={20}
                                step={1}
                                size="small"
                                sx={{
                                  color: '#ef4444',
                                  '& .MuiSlider-thumb': {
                                    backgroundColor: '#ef4444',
                                    width: 20,
                                    height: 20,
                                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                                    '&:hover': {
                                      boxShadow: '0 6px 16px rgba(239, 68, 68, 0.6)',
                                    },
                                  },
                                  '& .MuiSlider-track': {
                                    backgroundColor: '#ef4444',
                                    height: 6,
                                    borderRadius: '3px',
                                  },
                                  '& .MuiSlider-rail': {
                                    backgroundColor: '#333',
                                    height: 6,
                                    borderRadius: '3px',
                                  },
                                }}
                              />
                              <Typography 
                                variant="caption" 
                                className="text-gray-300 text-center block mt-2 font-medium"
                              >
                                Blur Level: {formData.blur_intensity}px
                              </Typography>
                            </Box>
                             
                            </Box>
                           
                           
                          ))}
                      </Box>
                    )}
                  </Paper>
                </Box>

                {/* Hashtags */}
                <Box>
                  <Paper 
                  className='flex flex-col gap-[15px]'
                    sx={{ 
                      p: 4, 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', 
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: 'rgba(239, 68, 68, 0.4)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      className="text-white mb-8 flex items-center gap-[3px]"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.3px',
                      }}
                    >
                      <Box 
                        sx={{
                          p: 1.5,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                        }}
                      >
                        <Tag sx={{ fontSize: 22, color: 'white' }} />
                      </Box>
                      Hashtags
                    </Typography>
                    
                    <Box className="flex gap-[15px] mb-4">
                      <TextField
                        fullWidth
                        placeholder="Add hashtag"
                        value={newHashtag}
                        onChange={(e) => setNewHashtag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHashtag())}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#444' },
                            '&:hover fieldset': { borderColor: '#ef4444' },
                            '&.Mui-focused fieldset': { borderColor: '#ef4444' },
                          },
                          '& .MuiInputLabel-root': { color: '#9ca3af' },
                        }}
                      />
                      <Button
                        onClick={handleAddHashtag}
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
                          },
                        }}
                      >
                        <Add />
                      </Button>
                    </Box>
                    
                    <Box className="flex flex-wrap gap-[8px]">
                      {formData.hashtags.map((hashtag, index) => (
                        <Chip
                          key={index}
                          label={`#${hashtag}`}
                          onDelete={() => handleRemoveHashtag(hashtag)}
                          sx={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                            color: 'white',
                            fontWeight: 600,
                            '& .MuiChip-deleteIcon': { color: 'white' },
                          }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Box>

                {/* Action Buttons */}
                <Box className="mt-12">
                  <Box className="flex gap-[15px] justify-end">
                    <Button
                      onClick={onCancel}
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: '#444',
                        color: 'white',
                        '&:hover': {
                          borderColor: '#ef4444',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
                        },
                      }}
                    >
                      Create Post
                    </Button>
                  </Box>
                </Box>
                      </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CreatePostForm;
