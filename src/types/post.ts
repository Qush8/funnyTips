export enum PostType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  GALLERY = 'GALLERY',
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
}

export interface Post {
  id: string;
  creatorId: string;
  creator?: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
  type: PostType;
  content?: string;
  media: Media[];
  media_urls?: string[]; // API-დან მომავალი ველი
  blur_intensity?: number; // API-დან მომავალი ველი
  access_level?: string; // API-დან მომავალი ველი
  isPPV: boolean;
  is_premium?: boolean; // API-დან მომავალი ველი
  unlock_price?: number; // API-დან მომავალი ველი
  price?: number;
  subscribersOnly: boolean;
  likes: number;
  comments: number;
  views: number;
  isLiked?: boolean;
  isPurchased?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
  content: string;
  likes: number;
  createdAt: string;
}

