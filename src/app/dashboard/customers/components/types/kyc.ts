export interface KYCDocument {
    id: string;
    type: string;
    documentNumber: string;
    uploadedDate: string;
    expiryDate: string;
    verifiedDate: string;
    verifiedBy: string;
    status: 'verified' | 'pending' | 'rejected';
    thumbnailUrl?: string;
  }
  
  export interface KYCDocumentsResponse {
    documents: KYCDocument[];
  }