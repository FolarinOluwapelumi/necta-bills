export const config = {
    api: {
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
      timeout: 30000,
    },
    features: {
      enableCustomerExport: process.env.NEXT_PUBLIC_ENABLE_EXPORT === 'true',
    },
    pagination: {
      defaultLimit: 10,
      maxLimit: 100,
    }
  };