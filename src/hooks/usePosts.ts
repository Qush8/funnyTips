import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MOCK_POSTS } from '../data/mockData';
import { models } from '../lib/api';

export const usePosts = (_creatorId?: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['posts', _creatorId, page, limit],
    queryFn: async () => {
      try {
        // Real API call to get model posts with pagination
        const response = await models.getModelPosts(page, limit);
        
        // Transform API response to match Post type
        const posts = (response as any).data || response || [];
        
        // Filter by creator if needed
        if (_creatorId) {
          return posts.filter((p: any) => p.creator_id === _creatorId || p.model_id === _creatorId);
        }
        
        return posts;
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to mock data if API fails
        if (_creatorId) {
          return MOCK_POSTS.filter(p => p.creatorId === _creatorId);
        }
        return MOCK_POSTS;
      }
    },
  });
};

export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_POSTS.find(p => p.id === postId) || null;
    },
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: any) => {
      // Real API call to create post
      return await models.createPost(postData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_postId: string) => {
      // Mock like with delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { liked: true };
    },
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};
