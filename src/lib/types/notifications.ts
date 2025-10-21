
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'email' | 'push';
  recipients: string[];
  status: 'draft' | 'sending' | 'sent' | 'failed';
  createdAt: string;
  sentAt?: string;
}

export interface SentNotification {
  id: string;
  title: string;
  description: string;
  recipients: string;
  type: 'Email' | 'Push Notification';
  sentAt: string;
  status: 'DELIVERED' | 'PENDING' | 'FAILED';
}

export interface RecipientGroup {
  id: string;
  label: string;
  description: string;
  count: number;
}