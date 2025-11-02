export interface KYCStats {
    pendingReviews: number;
    verifiedToday: number;
    rejectionRate: number;
    pendingChange: number;
    verifiedChange: number;
    rejectionChange: number;
  }
  
  export interface KYCRequest {
    id: string;
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    kycId: string;
    submittedDate: string;
    verifiedDate?: string;
    rejectedDate?: string;
    rejectionReason?: string;
    status: 'pending' | 'verified' | 'rejected' | 'under_review';
    phone: string;
    address?: string; // Make optional to match Customer
    dateOfBirth?: string; // Make optional to match Customer
    joinedDate: string;
    lastLogin?: string;
    lastIpAddress?: string; // Make optional to match Customer
    kycLevel?: string;
    kycStatus: string;
  }


  export interface KYCResponse {
    requests: KYCRequest[];
    total: number;
    page: number;
    limit: number;
    stats: KYCStats;
  }