import { User, Transaction, StatCardData, ChartData } from "@/lib/types/dashboard";

export const mockUser: User = {
  id: "1",
  firstName: "Dominic",
  lastName: "Praise", 
  email: "dominic@gmail.com"
};

export const mockStats: StatCardData[] = [
  {
    title: "Master Balance",
    value: "₦84,343,000.00",
    change: 24.3,
    period: "July 2025",
    variant: "dark"
  },
  {
    title: "Total Transactions", 
    value: "14,388",
    change: 22.1,
    period: "July 2025"
  },
  {
    title: "Total Users",
    value: "8,235", 
    change: 22.1,
    period: "July 2025"
  },
  {
    title: "Total Transaction Volume",
    value: "₦4,343,000.00",
    change: 22.1, 
    period: "July 2025"
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    user: "Dominic Praise",
    email: "dominic@gmail.com",
    transactionId: "TXN-00123456789",
    type: "Deposit",
    amount: "₦9,900",
    date: "09/03/2025",
    time: "09:34PM",
    status: "SUCCESSFUL"
  },
  {
    id: "2",
    user: "Martha Dokubo",
    email: "martha@email.com", 
    transactionId: "TXN-00123456790",
    type: "Transfer",
    amount: "₦4,000",
    date: "09/04/2025",
    time: "10:00AM",
    status: "SUCCESSFUL"
  },
  {
    id: "3", 
    user: "Elizabeth Bashir",
    email: "elizabeth@email.com",
    transactionId: "TXN-00123456791",
    type: "Airtime",
    amount: "₦6,500",
    date: "09/05/2025", 
    time: "11:15PM",
    status: "PENDING"
  },
  {
    id: "4",
    user: "John Bozimo",
    email: "john@email.com",
    transactionId: "TXN-00123456792", 
    type: "Deposit",
    amount: "₦3,250",
    date: "09/06/2025",
    time: "12:45PM",
    status: "SUCCESSFUL"
  }
];

export const mockChartData: ChartData[] = [
  { name: "1D", value: 400 },
  { name: "1W", value: 300 },
  { name: "2W", value: 200 },
  { name: "3W", value: 278 },
  { name: "1M", value: 189 },
  { name: "2M", value: 239 },
  { name: "3M", value: 349 },
  { name: "6M", value: 200 },
  { name: "1Y", value: 278 },
  { name: "All", value: 189 }
];