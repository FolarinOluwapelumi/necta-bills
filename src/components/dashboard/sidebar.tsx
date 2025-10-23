// src/app/dashboard/sidebar.tsx
"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarNav } from "./sidebar-nav"
import { SidebarSection } from "./sidebar-section"
import { X } from "lucide-react"
import { mockUser } from "@/lib/data/mock-data"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  const initials = `${mockUser.firstName.charAt(0)}${mockUser.lastName.charAt(0)}`.toUpperCase()

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close sidebar on route change (mobile) - Fixed version
  useEffect(() => {
    if (isOpen && isMounted) {
      console.log('Route changed, closing sidebar')
      onClose()
    }
  }, [pathname, isMounted]) // Remove onClose from dependencies

  const handleNavigation = (href: string) => {
    console.log('Navigating to:', href)
    router.push(href)
    // Let the useEffect above handle closing the sidebar
  }

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMounted && isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isMounted])

  // Remember not to render sidebar during SSR to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Mobile Overlay - Higher z-index */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          style={{ backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Mobile Drawer - Even higher z-index */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-50 md:hidden ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
        style={{ 
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          willChange: 'transform'
        }}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-end border-b border-gray-200">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">NectaBills</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav 
          className="flex-1 overflow-y-auto p-4 space-y-2"
          onClick={(e) => e.stopPropagation()} // Prevent overlay close when clicking inside
        >
          {/* Main Navigation Items */}
          <SidebarNav currentPath={pathname} isOpen={true} />
          
          {/* USER MANAGEMENT Section */}
          <SidebarSection title="USER MANAGEMENT" isOpen={true}>
            <SidebarNav.Item 
              icon="Users" 
              label="Customers" 
              href="/dashboard/customers"
              isActive={pathname === "/dashboard/customers"}
              isOpen={true}
              onClick={() => handleNavigation("/dashboard/customers")}
            />
            <SidebarNav.Item 
              icon="Shield" 
              label="KYC Verification" 
              href="/dashboard/kyc"
              isActive={pathname === "/dashboard/kyc"}
              isOpen={true}
              onClick={() => handleNavigation("/dashboard/kyc")}
            />
          </SidebarSection>
          
          {/* WALLET & TRANSACTIONS Section */}
          <SidebarSection title="WALLET & TRANSACTIONS" isOpen={true}>
            <SidebarNav.Item 
              icon="Wallet" 
              label="Wallet Overview" 
              href="/dashboard/wallet"
              isActive={pathname === "/dashboard/wallet"}
              isOpen={true}
              onClick={() => handleNavigation("/dashboard/wallet")}
            />
            <SidebarNav.Item 
              icon="CreditCard" 
              label="Transactions" 
              href="/dashboard/transactions"
              isActive={pathname === "/dashboard/transactions"}
              isOpen={true}
              onClick={() => handleNavigation("/dashboard/transactions")}
            />
          </SidebarSection>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {mockUser.firstName} {mockUser.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{mockUser.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar - Separate component */}
      <DesktopSidebar isCollapsed={isCollapsed} pathname={pathname} />
    </>
  )
}

// Separate desktop sidebar to avoid mobile issues
function DesktopSidebar({ isCollapsed, pathname }: { isCollapsed: boolean; pathname: string }) {
  const router = useRouter()
  const initials = `${mockUser.firstName.charAt(0)}${mockUser.lastName.charAt(0)}`.toUpperCase()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <aside
      className={`hidden md:flex ${
        isCollapsed ? "w-20" : "w-64"
      } bg-white border-r border-gray-200 flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-300">
              <p className="font-semibold text-gray-900">NectaBills</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <SidebarNav currentPath={pathname} isOpen={!isCollapsed} />
        
        <SidebarSection title="USER MANAGEMENT" isOpen={!isCollapsed}>
          <SidebarNav.Item 
            icon="Users" 
            label="Customers" 
            href="/dashboard/customers"
            isActive={pathname === "/dashboard/customers"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/customers")}
          />
          <SidebarNav.Item 
            icon="Shield" 
            label="KYC Verification" 
            href="/dashboard/kyc"
            isActive={pathname === "/dashboard/kyc"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/kyc")}
          />
        </SidebarSection>
        
        <SidebarSection title="WALLET & TRANSACTIONS" isOpen={!isCollapsed}>
          <SidebarNav.Item 
            icon="Wallet" 
            label="Wallet Overview" 
            href="/dashboard/wallet"
            isActive={pathname === "/dashboard/wallet"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/wallet")}
          />
          <SidebarNav.Item 
            icon="CreditCard" 
            label="Transactions" 
            href="/dashboard/transactions"
            isActive={pathname === "/dashboard/transactions"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/transactions")}
          />
        </SidebarSection>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 transition-opacity duration-300">
              <p className="text-sm font-medium text-gray-900 truncate">
                {mockUser.firstName} {mockUser.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{mockUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}