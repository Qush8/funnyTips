export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  PPV = 'PPV',
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  sender?: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
  type: MessageType;
  content?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  isPPV: boolean;
  price?: number;
  isPurchased?: boolean;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantDetails?: Array<{
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  }>;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
  createdAt: string;
}

