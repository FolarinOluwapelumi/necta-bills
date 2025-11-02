export type CustomerStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'restricted';
export type KYCStatus = 'verified' | 'pending' | 'failed' | 'approved' | 'rejected';
export type TransactionType = 'deposit' | 'transfer' | 'withdrawal' | 'airtime' | 'data' | 'e-sim' | 'refund' | 'debit' | 'credit';
export type TransactionStatus = 'successful' | 'pending' | 'failed' | 'completed' | 'cancelled';

export interface Customer {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username?: string;
  date_joined: string;
  kyc_status: KYCStatus;
  active_status: CustomerStatus;
  is_restricted: boolean;
  is_deleted: boolean;
  avatar?: string;
  wallet_balance: number;
  total_transactions: number;
  address?: string;
  date_of_birth?: string;
  last_login?: string;
  last_ip_address?: string;
  kyc_level?: string;
  company?: string;
  notes?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  transaction_id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  fee: number;
  net_amount: number;
  date_time: string;
  status: TransactionStatus;
  recipient?: string;
  reference_number: string;
  processing_time: string;
  description?: string;
  user: {
    name: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CustomerStats {
  total_customers: number;
  active_customers: number;
  new_customers_today: number;
  new_customers_this_week: number;
  new_customers_this_month: number;
  total_transactions: number;
  total_volume: number;
  average_transaction_value: number;
  pending_kyc: number;
  restricted_customers: number;
}

export interface KYCData {
  id: string;
  user_id: string;
  document_type: string;
  document_number: string;
  document_front_url: string;
  document_back_url: string;
  selfie_url: string;
  status: KYCStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  total?: number;
  page?: number;
  limit?: number;
}