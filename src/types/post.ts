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
  isPPV: boolean;
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

