export enum PaymentType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  TIP = 'TIP',
  PPV = 'PPV',
  MESSAGE = 'MESSAGE',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

export interface Payment {
  id: string;
  userId: string;
  creatorId?: string;
  type: PaymentType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripePaymentId?: string;
  stripePaymentIntentId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PayoutAccount {
  id: string;
  userId: string;
  stripeAccountId: string;
  isVerified: boolean;
  payoutsEnabled: boolean;
  chargesEnabled: boolean;
  createdAt: string;
}

