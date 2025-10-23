import axios, { type AxiosResponse } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { showToast } from '../utils/toast';
import { authService } from './auth';

export interface RegisterModelData {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  bio: string;
  age: string;
  location: string;
  birthDate: string;
  gender: string;
  country: string;
  city: string;
  address: string;
  photo: string;
  idFront: string;
  idBack: string;
  idIssueDate: string;
  idExpiryDate: string;
  idIssuingCountry: string;
  idIssuingCity: string;
  idIssuingAddress: string;
}

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Axios instance-ის შექმნა
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - ტოკენის ავტომატური დამატება
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - შეცდომების მართვა
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      authService.removeToken();
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'მოხდა შეცდომა';
    console.error('API Error:', errorMessage);
    showToast.error(errorMessage);
    throw new Error(errorMessage);
  }
);

// ავტორიზაციის API
export const authorization = {
  loginUser: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      console.error('Error signing in user:', error);
      throw error;
    }
  },

  loginModel: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login/model', { email, password });
      return response;
    } catch (error) {
      console.error('Error signing in model:', error);
      throw error;
    }
  },

  registerUser: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
  }) => {
    try {
      const response = await apiClient.post('/auth/register/user', {
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: userData.password,
        username: userData.username,
      });
      return response;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  registerModel: async (modelData: RegisterModelData) => {
    try {
      const response = await apiClient.post('/auth/register/model', {
        address: modelData.address,
        age: parseInt(modelData.age) || 0,
        bio: modelData.bio,
        birth_date: modelData.birthDate,
        country: modelData.country,
        email: modelData.email,
        first_name: modelData.name,
        gender: modelData.gender,
        id_back: modelData.idBack,
        id_front: modelData.idFront,
        last_name: modelData.name,
        password: modelData.password,
        phone_number: modelData.phone,
        username: modelData.username,
      });
      return response;
    } catch (error) {
      console.error('Error registering model:', error);
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      console.error('Error sending forgot password:', error);
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, newPassword });
      return response;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      return response;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await apiClient.post('/auth/refresh', { refreshToken });
      return response;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  },
};

// მომხმარებლის API
export const user = {
  getProfile: async (userId?: string) => {
    try {
      const response = await apiClient.get(userId ? `/users/${userId}/profile` : '/users/profile');
      return response;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  updateProfile: async (profileData: unknown) => {
    try {
      const response = await apiClient.put('/users/profile', profileData);
      return response;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  uploadAvatar: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await apiClient.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  },

  deleteUser: async () => {
    try {
      const response = await apiClient.delete('/users/me');
      return response;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

// ფაილების API
export const file = {
  uploadFile: async (file: File, folder?: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) formData.append('folder', folder);
      
      const response = await apiClient.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  deleteFile: async (fileUrl: string) => {
    try {
      const response = await apiClient.delete('/files/delete', { data: { fileUrl } });
      return response;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
};

// მოდელების API
export const models = {
  getModels: async () => {
    try {
      const response = await apiClient.get('/auth/models');
      return response;
    } catch (error) {
      console.error('Error getting models:', error);
      throw error;
    }
  },

  createPost: async (postData: {
    access_level: string;
    blur_intensity: number;
    blurred_media_urls: string[];
    content: string;
    content_visibility: string;
    hashtags: string[];
    is_premium: boolean;
    media_urls: string[];
    preview_content: string;
    preview_media_urls: string[];
    required_tier_id: number;
    type: string;
    unlock_price: number;
  }) => {
    try {
      const response = await apiClient.post('/models/posts', postData);
      return response;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  updatePost: async (postId: number, postData: unknown) => {
    try {
      const response = await apiClient.put(`/models/posts/${postId}`, postData);
      return response;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  getModelPosts: async () => {
    try {
      const response = await apiClient.get('/models/posts');
      return response;
    } catch (error) {
      console.error('Error getting model posts:', error);
      throw error;
    }
  },

  deleteModelPost: async (postId: number) => {
    try {
      const response = await apiClient.delete(`/models/posts/${postId}`);
      return response;
    } catch (error) {
      console.error('Error deleting model post:', error);
      throw error;
    }
  },

  uploadProfileImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await apiClient.post('/models/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  },

  uploadBanner: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('banner', file);
      
      const response = await apiClient.post('/models/profile/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      console.error('Error uploading banner:', error);
      throw error;
    }
  },

  updateProfile: async (profileData: Record<string, unknown>) => {
    try {
      const response = await apiClient.put('/models/profile', profileData);
      return response;
    } catch (error) {
      console.error('Error updating model profile:', error);
      throw error;
    }
  },
};

// ძირითადი API ობიექტი
export const CreateRequest = {
  authorization,
  user,
  models,
  file,
};

export default apiClient;
