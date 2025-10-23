import type { User } from '../types';
import { UserRole } from '../types';

export const getDashboardByRole = (user: User | null): string => {
  if (!user) return '/home';
  
  switch (user.role) {
    case UserRole.CREATOR:
      return '/home'; // Creator home page
    case UserRole.ADMIN:
      return '/home'; // Admin dashboard
    case UserRole.FAN:
    default:
      return '/home'; // Fan home page
  }
};
