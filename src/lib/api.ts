// Mock data for now - replace with real API calls later
export const dashboardService = {
  getOverviewData: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      stats: [
        {
          title: "Master Balance",
          value: "₦84,343,000.00",
          change: "+24.3%",
          period: "July 2025",
        },
        // ... other stats
      ],
      transactions: [
        // ... transactions data
      ]
    };
  }
};