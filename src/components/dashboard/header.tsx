"use client"

import { Search, Download, Home, Menu, Settings, Bell, Headphones, Zap, Users, Shield, Wallet, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface HeaderProps {
  onMenuClick: () => void
}

interface PageConfig {
  title: string;
  icon: any;
  breadcrumb?: string;
}

const pageConfig: Record<string, PageConfig> = {
  // Main pages
  "/dashboard": { title: "Overview", icon: Home },
  "/dashboard/notifications": { title: "Notifications", icon: Bell },
  "/dashboard/support": { title: "Support", icon: Headphones },
  "/dashboard/settings": { title: "Settings", icon: Settings },
  "/dashboard/features": { title: "Feature Management", icon: Zap },
  "/dashboard/customers": { title: "Customers", icon: Users },
  "/dashboard/kyc": { title: "KYC Verification", icon: Shield },
  "/dashboard/wallet": { title: "Wallet Overview", icon: Wallet },
  "/dashboard/transactions": { title: "Transactions", icon: CreditCard },
  
  // Settings sub-pages - EXACT FORMAT YOU WANT
  "/dashboard/settings/personal-details": { 
    title: "Settings / Personal Details", 
    icon: Settings,
    breadcrumb: "Settings / Personal Details"
  },
  "/dashboard/settings/notifications": { 
    title: "Settings / Notifications", 
    icon: Settings,
    breadcrumb: "Settings / Notifications"
  },
  "/dashboard/settings/signin-security": { 
    title: "Settings / Sign In & Security", 
    icon: Settings,
    breadcrumb: "Settings / Sign In & Security"
  },
  "/dashboard/settings/active-sessions": { 
    title: "Settings / Active Sessions", 
    icon: Settings,
    breadcrumb: "Settings / Active Sessions"
  },
  "/dashboard/settings/role-management": { 
    title: "Settings / Role Management", 
    icon: Settings,
    breadcrumb: "Settings / Role Management"
  },
  "/dashboard/settings/admin-management": { 
    title: "Settings / Admin Management", 
    icon: Settings,
    breadcrumb: "Settings / Admin Management"
  },
};

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<PageConfig>({ title: "Overview", icon: Home });

  useEffect(() => {
    let config = pageConfig[pathname];
    
    if (!config) {
      // For dynamic routes, create the exact breadcrumb format you want
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length >= 3 && segments[1] === 'settings') {
        const pageTitle = segments[2].split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        config = {
          title: `Settings / ${pageTitle}`,
          icon: Settings,
          breadcrumb: `Settings / ${pageTitle}`
        };
      }
    }
    
    setCurrentPage(config || { title: "Overview", icon: Home });
  }, [pathname]);

  const IconComponent = currentPage.icon;

  return (
    <header className="bg-white">
      <div className="border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={onMenuClick}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200 md:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="w-5 h-5 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <IconComponent className="w-4 h-4 text-white" />
            </div>
            
            <div>
              {/* Single line with the exact format you want */}
              <h1 className="text-sm md:text-lg font-medium text-gray-900">
                {currentPage.breadcrumb || currentPage.title}
              </h1>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent text-xs md:text-sm whitespace-nowrap transition-all duration-200 hover:scale-105"
        >
          <Download className="w-3 md:w-4 h-3 md:h-4" />
          <span className="hidden sm:inline">Export Or Import</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex px-4 md:px-8 items-center gap-2 py-3 transition-all duration-200 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Anything"
            className="bg-transparent outline-none text-sm md:text-base w-full placeholder-gray-500"
          />
        </div>
      </div>
    </header>
  );
}