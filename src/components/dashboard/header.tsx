"use client";

import {
  Search,
  Download,
  Home,
  Menu,
  Settings,
  Bell,
  Headphones,
  Zap,
  Users,
  Shield,
  Wallet,
  CreditCard,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCustomer } from "@/contexts/CustomerContext";

interface HeaderProps {
  onMenuClick: () => void;
}

interface PageConfig {
  title: string;
  icon: LucideIcon;
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
  "/dashboard/kyc-verification": { title: "KYC Verification", icon: Shield },
  "/dashboard/wallet-transactions/overview": { title: "Wallet Overview", icon: Wallet },
  "/dashboard/wallet-transactions/transactions": { title: "Transactions/List", icon: CreditCard },

  "/dashboard/settings/personal-details": {
    title: "Settings / Personal Details",
    icon: Settings,
    breadcrumb: "Settings / Personal Details",
  },
  "/dashboard/settings/notifications": {
    title: "Settings / Notifications",
    icon: Settings,
    breadcrumb: "Settings / Notifications",
  },
  "/dashboard/settings/signin-security": {
    title: "Settings / Sign In & Security",
    icon: Settings,
    breadcrumb: "Settings / Sign In & Security",
  },
  "/dashboard/settings/active-sessions": {
    title: "Settings / Active Sessions",
    icon: Settings,
    breadcrumb: "Settings / Active Sessions",
  },
  "/dashboard/settings/role-management": {
    title: "Settings / Role Management",
    icon: Settings,
    breadcrumb: "Settings / Role Management",
  },
  "/dashboard/settings/admin-management": {
    title: "Settings / Admin Management",
    icon: Settings,
    breadcrumb: "Settings / Admin Management",
  },
};

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<PageConfig>({
    title: "Overview",
    icon: Home,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { customerName } = useCustomer();

  useEffect(() => {
    let config = pageConfig[pathname];

    if (!config) {
      // For dynamic routes like /dashboard/customers/[id]
      const segments = pathname.split("/").filter(Boolean);

      // Handle customer profile pages
      if (segments.length >= 3 && segments[1] === "customers") {
        config = {
          title: customerName
            ? `Customers / ${customerName}`
            : "Customer Profile",
          icon: Users,
          breadcrumb: customerName
            ? `Customers / ${customerName}`
            : "Customers / Customer Profile",
        };
      }
      // Handle settings pages
      else if (segments.length >= 3 && segments[1] === "settings") {
        const pageTitle = segments[2]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        config = {
          title: `Settings / ${pageTitle}`,
          icon: Settings,
          breadcrumb: `Settings / ${pageTitle}`,
        };
      }
    }

    setCurrentPage(config || { title: "Overview", icon: Home });
  }, [pathname, customerName]);

  const IconComponent = currentPage.icon;

  const getSearchPlaceholder = () => {
    if (pathname.includes("/wallet-transactions")) {
      return "Search by transaction ID or user...";
    }
    if (pathname.includes("/customers")) {
      return "Search by customer name, email, or phone...";
    }
    if (pathname.includes("/kyc-verification")) {
      return "Search by customer name or email...";
    }
    return "Search Anything";
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    // Add debounced search functionality here
    // You can integrate with your existing search logic
    console.log('Search query:', value);
    
    // If you want to implement real-time search, you can:
    // 1. Use a context to share search state across components
    // 2. Dispatch a search action to your data layer
    // 3. Use URL search params for persistent search
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log('Search submitted:', searchQuery);
    
    // You can integrate with your existing search logic here
    // For example, if using URL search params:
    // const searchParams = new URLSearchParams(window.location.search);
    // searchParams.set('search', searchQuery);
    // router.push(`${pathname}?${searchParams.toString()}`);
  };

  const isTransactionPage = pathname.includes("/wallet-transactions");

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
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <IconComponent className="w-4 h-4 text-white" />
            </div>

            <div>
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

      {/* Enhanced Search Section with Transaction Search Integration */}
      <div className="border-b border-gray-200">
        <form onSubmit={handleSearchSubmit} className="px-4 md:px-8">
          <div className="flex items-center gap-2 py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={getSearchPlaceholder()}
              className="bg-transparent outline-none text-sm md:text-base w-full placeholder-gray-500"
            />
            
            {/* Optional: Add search filters for transaction pages */}
            {isTransactionPage && searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>
        
        {/* Optional: Additional filters for transaction pages */}
        {isTransactionPage && (
          <div className="px-4 md:px-8 pb-3 flex gap-2">
            {/* You can add filter chips or additional controls here */}
            {searchQuery && (
              <div className="text-xs text-gray-500">
                Searching for: `&quot;`{searchQuery}`&quot;`
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}