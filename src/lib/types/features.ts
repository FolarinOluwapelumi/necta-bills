export interface Feature {
  id: string;
  title: string;
  description: string;
  category: 'CORE' | 'SECURITY' | 'NOTIFICATIONS' | 'PAYMENTS' | 'ANALYTICS';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  enabled: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'PENDING';
  createdAt: string;
  updatedAt: string;
  version?: string;
  dependencies?: string[];
}

export interface FeatureUpdateRequest {
  enabled?: boolean;
  status?: Feature['status'];
  priority?: Feature['priority'];
}

export interface FeatureStats {
  total: number;
  enabled: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
}