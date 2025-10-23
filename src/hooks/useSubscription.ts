import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import apiClient from '../lib/api';
import type { Subscription } from '../types';

// Mock data
const MOCK_SUBSCRIPTIONS: Subscription[] = [];

export const useSubscriptions = (_userId?: string) => {
  return useQuery({
    queryKey: ['subscriptions', _userId],
    queryFn: async () => {
      // Mock API response
      return MOCK_SUBSCRIPTIONS;
    },
    enabled: !!_userId,
  });
};

export const useSubscription = (_creatorId: string, _subscriberId: string) => {
  return useQuery({
    queryKey: ['subscription', _creatorId, _subscriberId],
    queryFn: async () => {
      // Mock API response
      return null;
    },
    enabled: !!_creatorId && !!_subscriberId,
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_data: { creatorId: string; paymentMethodId: string }) => {
      // Mock create subscription
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_subscriptionId: string) => {
      // Mock cancel subscription
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
};
