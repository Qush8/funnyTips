import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post } from '../types';
import { MOCK_POSTS } from '../data/mockData';

export const usePosts = (_creatorId?: string) => {
  return useQuery({
    queryKey: ['posts', _creatorId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter by creator if needed
      if (_creatorId) {
        return MOCK_POSTS.filter(p => p.creatorId === _creatorId);
      }
      
      return MOCK_POSTS;
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
    mutationFn: async (_data: FormData) => {
      // Mock create post
      const mockPost: Post = {
        id: Date.now().toString(),
        creatorId: '1',
        type: 'TEXT' as any,
        content: 'New mock post',
        media: [],
        isPPV: false,
        subscribersOnly: false,
        likes: 0,
        comments: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return mockPost;
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
