// "use client"

// import { useState } from "react"
// import { Sidebar } from "@/components/dashboard/sidebar"
// import { Header } from "@/components/dashboard/header"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="flex h-screen">
//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
//           onClick={() => setSidebarOpen(false)} 
//         />
//       )}

//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
//         <main className="flex-1 overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }


// src/app/dashboard/layout.tsx
'use client';

import { useState, useCallback } from 'react';
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from '@/components/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    console.log('Toggle sidebar, current state:', isSidebarOpen);
    setIsSidebarOpen(prev => !prev);
  }, [isSidebarOpen]);

  const handleSidebarClose = useCallback(() => {
    console.log('Closing sidebar');
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleSidebarClose} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header with Hamburger */}
        <Header onMenuClick={handleMenuToggle} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}