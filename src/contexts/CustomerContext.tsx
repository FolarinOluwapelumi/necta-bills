'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CustomerContextType {
  customerName: string;
  setCustomerName: (name: string) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customerName, setCustomerName] = useState('');

  return (
    <CustomerContext.Provider value={{ customerName, setCustomerName }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}