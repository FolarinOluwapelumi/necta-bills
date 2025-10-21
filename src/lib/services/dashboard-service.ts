import { User, Transaction, StatCardData, ChartData } from "@/lib/types/dashboard";
import { mockUser, mockStats, mockTransactions, mockChartData } from "@/lib/data/mock-data";

// Mock service - Replace these with actual API calls when backend is ready
export class DashboardService {
  private static readonly BASE_URL = '/api'; // Update this when backend is ready

  // User methods
  static async getCurrentUser(): Promise<User> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${this.BASE_URL}/user/current`);
    // return response.json();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUser;
  }

  // Stats methods
  static async getStats(): Promise<StatCardData[]> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${this.BASE_URL}/dashboard/stats`);
    // return response.json();
    
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockStats;
  }

  // Transactions methods
  static async getTransactions(page = 1, limit = 10): Promise<{ data: Transaction[]; total: number }> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${this.BASE_URL}/transactions?page=${page}&limit=${limit}`);
    // return response.json();
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      data: mockTransactions,
      total: mockTransactions.length
    };
  }

  // Chart methods
  static async getChartData(timeRange: string): Promise<ChartData[]> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${this.BASE_URL}/dashboard/chart?range=${timeRange}`);
    // return response.json();
    
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockChartData;
  }

  // Export methods
  static async exportData(format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${this.BASE_URL}/export?format=${format}`);
    // return response.blob();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return new Blob();
  }
}











  // Future API methods (commented for now)
  /*
  static async getStatsFromAPI(): Promise<StatCardData[]> {
    const response = await fetch('/api/dashboard/stats');
    return response.json();
  }

  static async getTransactionsFromAPI(): Promise<Transaction[]> {
    const response = await fetch('/api/dashboard/transactions');
    return response.json();
  }
  */
