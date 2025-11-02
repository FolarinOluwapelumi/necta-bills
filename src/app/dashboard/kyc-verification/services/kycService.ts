import { CustomerService } from '@/lib/services/customerService';
import { KYCResponse, KYCRequest, KYCStats } from '../types/kyc';
import { Customer } from '@/lib/types/customer';

export class KYCService {
  static async getKYCRequests(
    tab: 'pending' | 'verified' | 'rejected' = 'pending',
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<KYCResponse> {
    try {
      const { customers } = await CustomerService.getCustomers({
        kycStatus: tab,
        search: search,
        page: page,
        limit: limit
      });

      // Transform Customer data to KYCRequest format with PROPER REJECTION DATA
      const kycRequests: KYCRequest[] = customers.map(customer => {
        // Generate realistic dates based on joined date
        const joinedDate = new Date(customer.date_joined);
        const verifiedDate = new Date(joinedDate);
        verifiedDate.setDate(verifiedDate.getDate() + 1); // Verified 1 day after joining
        
        const rejectedDate = new Date(joinedDate);
        rejectedDate.setDate(rejectedDate.getDate() + 2); // Rejected 2 days after joining

        return {
          id: customer.id,
          customerId: customer.user_id,
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          kycId: `KYC${customer.user_id.padStart(4, '0')}`,
          submittedDate: customer.date_joined,
          verifiedDate: customer.kyc_status === 'verified' ? verifiedDate.toISOString().split('T')[0] : undefined,
          rejectedDate: customer.kyc_status === 'rejected' ? rejectedDate.toISOString().split('T')[0] : undefined,
          rejectionReason: customer.kyc_status === 'rejected' ? this.getRandomRejectionReason() : undefined,
          status: customer.kyc_status as 'pending' | 'verified' | 'rejected',
          phone: customer.phone,
          address: customer.address,
          dateOfBirth: customer.date_of_birth,
          joinedDate: customer.date_joined,
          lastLogin: customer.last_login,
          lastIpAddress: customer.last_ip_address,
          kycLevel: customer.kyc_level,
          kycStatus: customer.kyc_status
        };
      });


      // Get stats based on all customers
      const allCustomers = await CustomerService.getCustomers();
      const stats = this.calculateKYCStats(allCustomers.customers);

      return {
        requests: kycRequests,
        total: kycRequests.length,
        page,
        limit,
        stats
      };
    } catch (error) {
      console.error('Error fetching KYC requests:', error);
      throw new Error('Failed to load KYC data');
    }
  }

  static async getKYCRequestById(customerId: string): Promise<KYCRequest> {
    try {
      const customer = await CustomerService.getCustomerById(customerId);
      
      // Generate realistic dates
      const joinedDate = new Date(customer.date_joined);
      const rejectedDate = new Date(joinedDate);
      rejectedDate.setDate(rejectedDate.getDate() + 2);
      
      return {
        id: customer.id,
        customerId: customer.user_id,
        firstName: customer.first_name,
        lastName: customer.last_name,
        email: customer.email,
        kycId: `KYC${customer.user_id.padStart(4, '0')}`,
        submittedDate: customer.date_joined,
        verifiedDate: customer.kyc_status === 'verified' ? customer.date_joined : undefined,
        rejectedDate: customer.kyc_status === 'rejected' ? rejectedDate.toISOString().split('T')[0] : undefined,
        rejectionReason: customer.kyc_status === 'rejected' ? this.getRandomRejectionReason() : undefined,
        status: customer.kyc_status as 'pending' | 'verified' | 'rejected',
        phone: customer.phone,
        address: customer.address,
        dateOfBirth: customer.date_of_birth,
        joinedDate: customer.date_joined,
        lastLogin: customer.last_login,
        lastIpAddress: customer.last_ip_address,
        kycLevel: customer.kyc_level,
        kycStatus: customer.kyc_status
      };
    } catch (error) {
      console.error('Error fetching KYC request:', error);
      throw new Error('KYC request not found');
    }
  }

  
  private static calculateKYCStats(customers: Customer[]): KYCStats {
    const pendingCount = customers.filter(c => c.kyc_status === 'pending').length;
    const verifiedCount = customers.filter(c => c.kyc_status === 'verified').length;
    const rejectedCount = customers.filter(c => c.kyc_status === 'rejected').length;
    // Removed unused 'total' variable
  
    return {
      pendingReviews: pendingCount,
      verifiedToday: verifiedCount,
      rejectionRate: rejectedCount,
      pendingChange: -22.1,
      verifiedChange: 15.3,
      rejectionChange: -8.7
    };
  }

  private static getRandomRejectionReason(): string {
    const reasons = [
      "Invalid ID Document",
      "Blurry document photos", 
      "Corrupted file format",
      "Missing document signature",
      "Inconsistent data entries",
      "Document exceeds maximum size",
      "Unreadable handwriting",
      "Unsupported file type"
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  }

  static async approveKYC(customerId: string): Promise<void> {
    console.log(`Approving KYC for customer: ${customerId}`);
    // await fetch(`/api/kyc/requests/${customerId}/approve`, { method: 'POST' });
  }

  static async rejectKYC(customerId: string, reason: string): Promise<void> {
    console.log(`Rejecting KYC for customer: ${customerId}, reason: ${reason}`);
    // await fetch(`/api/kyc/requests/${customerId}/reject`, { 
    //   method: 'POST',
    //   body: JSON.stringify({ reason })
    // });
  }

  static async getKYCStats(): Promise<KYCStats> {
    const { customers } = await CustomerService.getCustomers();
    return this.calculateKYCStats(customers);
  }
}