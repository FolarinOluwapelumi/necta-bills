export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Transaction {
  id: string;
  user: string;
  email: string;
  transactionId: string;
  type: "Deposit" | "Transfer" | "Airtime" | "Airline";
  amount: string;
  date: string;
  time: string;
  status: "SUCCESSFUL" | "PENDING";
}

export interface StatCardData {
  title: string;
  value: string;
  change: number;
  period: string;
  variant?: "dark" | "light";
}

export interface ChartData {
  name: string;
  value: number;
}