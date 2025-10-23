export enum UserRole {
  FAN = 'FAN',
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role: UserRole;
  verified: boolean;
  subscriptionPrice?: number;
  bio?: string;
  coverImage?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatorStats {
  subscribersCount: number;
  postsCount: number;
  totalEarnings: number;
  monthlyEarnings: number;
}

