import { Customer, Transaction, CustomerStats } from "@/lib/types/customer";

// Mock data that matches YOUR EXACT DESIGNS
const mockCustomers: Customer[] = [
  {
    id: "1",
    user_id: "1",
    first_name: "Dominic",
    last_name: "Praise",
    email: "nigerpower@hotmail.com",
    phone: "+234 915 573 7177",
    date_joined: "09/03/2025",
    kyc_status: "verified",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 84343000,
    total_transactions: 1388,
    address: "123 Main Street, San Francisco, CA 94102",
    date_of_birth: "1990-05-15",
    last_login: "2024-10-07 14:23:45",
    last_ip_address: "192.168.1.1",
    kyc_level: "Level 1",
    tags: [],
    created_at: "2025-03-09T00:00:00Z",
    updated_at: "2025-03-09T00:00:00Z",
  },
  {
    id: "2",
    user_id: "2",
    first_name: "Martha",
    last_name: "Dokuko",
    email: "emilyre@vandex.com",
    phone: "+234 700 882 5651",
    date_joined: "09/04/2025",
    kyc_status: "pending",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 5421000,
    total_transactions: 245,
    address: "456 Oak Avenue, Lagos, Nigeria",
    date_of_birth: "1985-08-22",
    last_login: "2024-10-06 09:15:30",
    kyc_level: "Level 0",
    tags: [],
    created_at: "2025-04-09T00:00:00Z",
    updated_at: "2025-04-09T00:00:00Z",
  },
  {
    id: "3",
    user_id: "3",
    first_name: "Elizabeth",
    last_name: "Bashir",
    email: "kanoroyalty@yahoo.com",
    phone: "+234 907 410 5814",
    date_joined: "09/05/2025",
    kyc_status: "verified",
    active_status: "suspended",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 15200000,
    total_transactions: 89,
    address: "789 Palm Street, Kano, Nigeria",
    date_of_birth: "1992-12-10",
    last_login: "2024-10-05 14:45:00",
    kyc_level: "Level 2",
    tags: [],
    created_at: "2025-05-09T00:00:00Z",
    updated_at: "2025-05-09T00:00:00Z",
  },
  {
    id: "4",
    user_id: "4",
    first_name: "John",
    last_name: "Adeyemi",
    email: "john.adeyemi@gmail.com",
    phone: "+234 801 234 5678",
    date_joined: "09/06/2025",
    kyc_status: "pending",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 2500000,
    total_transactions: 45,
    address: "12 Victoria Island, Lagos, Nigeria",
    date_of_birth: "1988-03-15",
    last_login: "2024-10-04 16:20:00",
    kyc_level: "Level 0",
    tags: [],
    created_at: "2025-06-09T00:00:00Z",
    updated_at: "2025-06-09T00:00:00Z",
  },
  {
    id: "5",
    user_id: "5",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.j@outlook.com",
    phone: "+234 802 345 6789",
    date_joined: "09/07/2025",
    kyc_status: "pending",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 1800000,
    total_transactions: 32,
    address: "45 Allen Avenue, Ikeja, Lagos",
    date_of_birth: "1991-07-22",
    last_login: "2024-10-03 11:30:00",
    kyc_level: "Level 0",
    tags: [],
    created_at: "2025-07-09T00:00:00Z",
    updated_at: "2025-07-09T00:00:00Z",
  },
  {
    id: "6",
    user_id: "6",
    first_name: "Michael",
    last_name: "Okafor",
    email: "michael.o@yahoo.com",
    phone: "+234 803 456 7890",
    date_joined: "09/08/2025",
    kyc_status: "pending",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 3200000,
    total_transactions: 67,
    address: "78 Broad Street, Lagos Island",
    date_of_birth: "1987-11-30",
    last_login: "2024-10-02 14:15:00",
    kyc_level: "Level 0",
    tags: [],
    created_at: "2025-08-09T00:00:00Z",
    updated_at: "2025-08-09T00:00:00Z",
  },
  {
    id: "7",
    user_id: "7",
    first_name: "Grace",
    last_name: "Williams",
    email: "grace.w@hotmail.com",
    phone: "+234 804 567 8901",
    date_joined: "09/09/2025",
    kyc_status: "verified",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 7500000,
    total_transactions: 156,
    address: "23 Marina Road, Apapa, Lagos",
    date_of_birth: "1993-04-18",
    last_login: "2024-10-01 09:45:00",
    kyc_level: "Level 1",
    tags: [],
    created_at: "2025-09-09T00:00:00Z",
    updated_at: "2025-09-09T00:00:00Z",
  },
  {
    id: "8",
    user_id: "8",
    first_name: "David",
    last_name: "Brown",
    email: "david.brown@gmail.com",
    phone: "+234 805 678 9012",
    date_joined: "09/10/2025",
    kyc_status: "verified",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 9200000,
    total_transactions: 234,
    address: "56 Herbert Macaulay Road, Yaba, Lagos",
    date_of_birth: "1989-09-12",
    last_login: "2024-09-30 17:20:00",
    kyc_level: "Level 2",
    tags: [],
    created_at: "2025-10-09T00:00:00Z",
    updated_at: "2025-10-09T00:00:00Z",
  },
  {
    id: "9",
    user_id: "9",
    first_name: "Jennifer",
    last_name: "Martins",
    email: "jennifer.m@outlook.com",
    phone: "+234 806 789 0123",
    date_joined: "09/11/2025",
    kyc_status: "verified",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 4800000,
    total_transactions: 89,
    address: "34 Awolowo Road, Ikoyi, Lagos",
    date_of_birth: "1994-01-25",
    last_login: "2024-09-29 13:10:00",
    kyc_level: "Level 1",
    tags: [],
    created_at: "2025-11-09T00:00:00Z",
    updated_at: "2025-11-09T00:00:00Z",
  },
  {
    id: "10",
    user_id: "10",
    first_name: "Peter",
    last_name: "Okonkwo",
    email: "peter.okonkwo@yahoo.com",
    phone: "+234 807 890 1234",
    date_joined: "09/12/2025",
    kyc_status: "rejected",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 1200000,
    total_transactions: 12,
    address: "67 Adeola Odeku Street, Victoria Island",
    date_of_birth: "1986-06-08",
    last_login: "2024-09-28 10:05:00",
    kyc_level: "Level 0",
    tags: [],
    created_at: "2025-12-09T00:00:00Z",
    updated_at: "2025-12-09T00:00:00Z",
  },
  {
    id: "11",
    user_id: "11",
    first_name: "Susan",
    last_name: "Adebayo",
    email: "susan.adebayo@gmail.com",
    phone: "+234 808 901 2345",
    date_joined: "09/13/2025",
    kyc_status: "rejected",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 800000,
    total_transactions: 8,
    address: "89 Ozumba Mbadiwe Avenue, Victoria Island",
    date_of_birth: "1990-12-14",
    last_login: "2024-09-27 15:40:00",
    kyc_level: "Level 0",
    tags: [],
    created_at: "2025-13-09T00:00:00Z",
    updated_at: "2025-13-09T00:00:00Z",
  },
  {
    id: "12",
    user_id: "12",
    first_name: "Robert",
    last_name: "Eze",
    email: "robert.eze@hotmail.com",
    phone: "+234 809 012 3456",
    date_joined: "09/14/2025",
    kyc_status: "rejected",
    active_status: "active",
    is_restricted: false,
    is_deleted: false,
    wallet_balance: 950000,
    total_transactions: 15,
    address: "14 Ahmadu Bello Way, Kaduna",
    date_of_birth: "1984-02-28",
    last_login: "2024-09-26 12:25:00",
    kyc_level: "Level 0",
    tags: [],
    created_at: "2025-14-09T00:00:00Z",
    updated_at: "2025-14-09T00:00:00Z",
  }
];

const mockTransactions: Transaction[] = [
  {
    id: "1",
    transaction_id: "TXN-00123456789",
    user_id: "1",
    type: "deposit",
    amount: 9900,
    fee: 0,
    net_amount: 9900,
    date_time: "09/03/2025, 09:34PM",
    status: "successful",
    recipient: "80/2345678 - Opey",
    reference_number: "TXN2024/007001",
    processing_time: "Instant",
    user: {
      name: "Dominic Praise",
      first_name: "Dominic",
      last_name: "Praise",
    },
    created_at: "2025-03-09T21:34:00Z",
    updated_at: "2025-03-09T21:34:00Z",
  },
  {
    id: "2",
    transaction_id: "TXN-00123456790",
    user_id: "1",
    type: "transfer",
    amount: 4000,
    fee: 10,
    net_amount: 3990,
    date_time: "09/04/2025, 10:00AM",
    status: "successful",
    recipient: "70/1234567 - Jane",
    reference_number: "TXN2024/007002",
    processing_time: "Instant",
    user: {
      name: "Martha Dokubo",
      first_name: "Martha",
      last_name: "Dokubo",
    },
    created_at: "2025-04-09T10:00:00Z",
    updated_at: "2025-04-09T10:00:00Z",
  },
  {
    id: "3",
    transaction_id: "TXN-00123456791",
    user_id: "1",
    type: "airtime",
    amount: 6500,
    fee: 0,
    net_amount: 6500,
    date_time: "09/05/2025, 11:15PM",
    status: "pending",
    recipient: "MTN Nigeria",
    reference_number: "TXN2024/007003",
    processing_time: "2-5 minutes",
    user: {
      name: "Elizabeth Bashir",
      first_name: "Elizabeth",
      last_name: "Bashir",
    },
    created_at: "2025-05-09T23:15:00Z",
    updated_at: "2025-05-09T23:15:00Z",
  },
];

const mockStats: CustomerStats = {
  total_customers: 150,
  active_customers: 120,
  new_customers_today: 5,
  new_customers_this_week: 25,
  new_customers_this_month: 15,
  total_transactions: 12500,
  total_volume: 45000000,
  average_transaction_value: 3600,
  pending_kyc: 8,
  restricted_customers: 3,
};




export class CustomerService {
  static async getCustomers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    kycStatus?: string;
  }): Promise<{ customers: Customer[]; total: number }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredCustomers = mockCustomers;

    // Apply search filter
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          customer.first_name.toLowerCase().includes(searchLower) ||
          customer.last_name.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.phone.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (params?.status && params.status !== "") {
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.active_status === params.status
      );
    }

    // Apply KYC status filter
    if (params?.kycStatus && params.kycStatus !== "") {
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.kyc_status === params.kycStatus
      );
    }

    // Apply pagination
    if (params?.page && params?.limit) {
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      filteredCustomers = filteredCustomers.slice(startIndex, endIndex);
    }

    return {
      customers: filteredCustomers,
      total: mockCustomers.length, // Return total count of all customers (not filtered)
    };
  }


// Update your CustomerService in customerService.ts - FIXED VERSION

static async getAllTransactions(params?: {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  search?: string;
}): Promise<{ transactions: Transaction[]; total: number }> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  // Get all customers first
  const { customers } = await this.getCustomers();
  let allTransactions: Transaction[] = [];

  // Create comprehensive transaction data that works for BOTH tables
  const transactionTypes: Transaction['type'][] = ['deposit', 'transfer', 'airtime', 'data', 'e-sim', 'refund'];
  const statusTypes: Transaction['status'][] = ['successful', 'pending', 'failed'];
  
  // Generate transactions for each customer
  customers.forEach((customer, customerIndex) => {
    // Each customer gets 3-8 transactions
    const transactionCount = 3 + (customerIndex % 6);
    
    for (let i = 0; i < transactionCount; i++) {
      const transactionType = transactionTypes[i % transactionTypes.length];
      const transactionStatus = statusTypes[i % statusTypes.length];
      const amount = 1000 + (customerIndex * 500) + (i * 250); // Varied amounts
      
      const transaction: Transaction = {
        id: `tx-${customer.user_id}-${i}`,
        transaction_id: `TXN-00${customerIndex}${i}${customer.user_id}`,
        user_id: customer.user_id,
        type: transactionType,
        amount: amount,
        fee: transactionType === 'transfer' ? 10 : 0,
        net_amount: transactionType === 'transfer' ? amount - 10 : amount,
        date_time: this.generateRandomDate(),
        status: transactionStatus,
        recipient: transactionType === 'transfer' ? `80/${1234567 + i} - Opay` : undefined,
        reference_number: `REF${customerIndex}${i}${Date.now()}`,
        processing_time: transactionStatus === 'successful' ? 'Instant' : '2-5 minutes',
        user: {
          name: `${customer.first_name} ${customer.last_name}`,
          first_name: customer.first_name,
          last_name: customer.last_name,
          avatar: customer.avatar
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      allTransactions.push(transaction);
    }
  });

  // Apply filters
  if (params?.type && params.type !== "") {
    allTransactions = allTransactions.filter(
      transaction => transaction.type === params.type
    );
  }

  if (params?.status && params.status !== "") {
    allTransactions = allTransactions.filter(
      transaction => transaction.status === params.status
    );
  }

  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    allTransactions = allTransactions.filter(
      transaction =>
        transaction.transaction_id.toLowerCase().includes(searchLower) ||
        transaction.user.name.toLowerCase().includes(searchLower) ||
        transaction.user.first_name.toLowerCase().includes(searchLower) ||
        transaction.user.last_name.toLowerCase().includes(searchLower)
    );
  }

  // Sort by date (newest first)
  allTransactions.sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime());

  // Apply pagination
  let paginatedTransactions = allTransactions;
  if (params?.page && params?.limit) {
    const startIndex = (params.page - 1) * params.limit;
    const endIndex = startIndex + params.limit;
    paginatedTransactions = allTransactions.slice(startIndex, endIndex);
  }

  return {
    transactions: paginatedTransactions,
    total: allTransactions.length,
  };
}

// Helper method to generate random dates
private static generateRandomDate(): string {
  const start = new Date(2024, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  const date = randomDate.toLocaleDateString('en-US');
  const time = randomDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  return `${date}, ${time}`;
}

// Enhanced getTransactionStats method
static async getTransactionStats(): Promise<{
  totalVolume: number;
  totalTransactions: number;
  completed: number;
  pending: number;
  failed: number;
}> {
  const { transactions } = await this.getAllTransactions();
  
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalTransactions = transactions.length;
  const completed = transactions.filter(t => t.status === 'successful' || t.status === 'completed').length;
  const pending = transactions.filter(t => t.status === 'pending').length;
  const failed = transactions.filter(t => t.status === 'failed' || t.status === 'cancelled').length;

  return {
    totalVolume,
    totalTransactions,
    completed,
    pending,
    failed,
  };
}



static async getLatestUsers(params?: {
  limit?: number;
  page?: number;
}): Promise<{ customers: Customer[]; total: number }> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const { customers } = await this.getCustomers();
  
  // Sort by date_joined (newest first) - improved sorting
  const sortedCustomers = [...customers].sort((a, b) => {
    // Convert date strings to proper Date objects for accurate sorting
    const parseDate = (dateStr: string) => {
      const [month, day, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day);
    };
    
    const dateA = parseDate(a.date_joined);
    const dateB = parseDate(b.date_joined);
    return dateB.getTime() - dateA.getTime(); // Newest first
  });

  // Apply pagination
  let paginatedCustomers = sortedCustomers;
  if (params?.page && params?.limit) {
    const startIndex = (params.page - 1) * params.limit;
    const endIndex = startIndex + params.limit;
    paginatedCustomers = sortedCustomers.slice(startIndex, endIndex);
  } else if (params?.limit) {
    paginatedCustomers = sortedCustomers.slice(0, params.limit);
  }

  return {
    customers: paginatedCustomers,
    total: customers.length,
  };
}

  static async getCustomerById(id: string): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const customer = mockCustomers.find((c) => c.user_id === id);
    if (!customer) throw new Error("Customer not found");
    return customer;
  }

  static async getCustomerTransactions(
    customerId: string,
    params?: { page?: number; limit?: number; type?: string; status?: string }
  ): Promise<{ transactions: Transaction[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    let customerTransactions = mockTransactions.filter(
      (t) => t.user_id === customerId
    );

    // Apply transaction type filter
    if (params?.type && params.type !== "") {
      customerTransactions = customerTransactions.filter(
        (transaction) => transaction.type === params.type
      );
    }

    // Apply transaction status filter
    if (params?.status && params.status !== "") {
      customerTransactions = customerTransactions.filter(
        (transaction) => transaction.status === params.status
      );
    }

    // Apply pagination
    if (params?.page && params?.limit) {
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      customerTransactions = customerTransactions.slice(startIndex, endIndex);
    }

    return {
      transactions: customerTransactions,
      total: mockTransactions.filter(t => t.user_id === customerId).length, // Total for this customer
    };
  }

  static async getCustomerStats(): Promise<CustomerStats> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockStats;
  }

  // Additional utility methods for future use
  static async updateCustomerStatus(
    customerId: string, 
    status: 'active' | 'suspended' | 'restricted'
  ): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const customer = mockCustomers.find((c) => c.user_id === customerId);
    if (!customer) throw new Error("Customer not found");
    
    // In real implementation, this would update the database
    console.log(`Updating customer ${customerId} status to: ${status}`);
    return { ...customer, active_status: status };
  }

  static async updateKYCStatus(
    customerId: string, 
    status: 'pending' | 'verified' | 'rejected',
    reason?: string
  ): Promise<Customer> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const customer = mockCustomers.find((c) => c.user_id === customerId);
    if (!customer) throw new Error("Customer not found");
    
    // In real implementation, this would update the database
    console.log(`Updating customer ${customerId} KYC status to: ${status}`, reason ? `Reason: ${reason}` : '');
    return { ...customer, kyc_status: status };
  }
}