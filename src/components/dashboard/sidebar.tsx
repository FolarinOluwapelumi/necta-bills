"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarNav } from "./sidebar-nav"
import { SidebarSection } from "./sidebar-section"
import { X, Users, Shield, Wallet, CreditCard } from "lucide-react"
import { mockUser } from "@/lib/data/mock-data"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isCollapsed] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  
  const initials = `${mockUser.firstName.charAt(0)}${mockUser.lastName.charAt(0)}`.toUpperCase()

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  // Body scroll lock and blur effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Add blur to main content
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.style.filter = 'blur(4px)'
        mainContent.style.transition = 'filter 0.3s ease'
      }
    } else {
      document.body.style.overflow = 'unset'
      // Remove blur from main content
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.style.filter = 'none'
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.style.filter = 'none'
      }
    }
  }, [isOpen])

  const handleNavigation = (href: string) => {
    router.push(href)
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      onClose()
    }
      router.push(href)
      onClose()
  }

  // Don't render anything if not open on mobile
  if (!isOpen) {
    return <DesktopSidebar isCollapsed={isCollapsed} pathname={pathname} />
  }

  return (
    <>
      {/* Mobile Overlay with Blur Effect */}
      <div 
        className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        onClick={onClose}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      />

      {/* Mobile Sidebar */}
      <div className="fixed inset-0 z-50 md:hidden">
        <div
          ref={sidebarRef}
          className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-out shadow-xl"
        >
          {/* Close Button */}
          <div className="p-2 flex justify-end border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Logo */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                S
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">NectaBills</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2 bg-white/90 backdrop-blur-sm">
            <div className="space-y-2">
              <SidebarNav currentPath={pathname} isOpen={true} />
            </div>
            
            <SidebarSection title="USER MANAGEMENT" isOpen={true}>
              <SidebarNav.Item 
                icon={Users}
                label="Customers" 
                href="/dashboard/customers"
                isActive={pathname === "/dashboard/customers"}
                isOpen={true}
                onClick={() => handleNavigation("/dashboard/customers")}
              />
              <SidebarNav.Item 
                icon={Shield}
                label="KYC Verification" 
                href="/dashboard/kyc-verification"
                isActive={pathname === "/dashboard/kyc-verification"}
                isOpen={true}
                onClick={() => handleNavigation("/dashboard/kyc-verification")}
              />
            </SidebarSection>
            
            <SidebarSection title="WALLET & TRANSACTIONS" isOpen={true}>
              <SidebarNav.Item 
                icon={Wallet}
                label="Wallet Overview" 
                href="/dashboard/wallet-transactions/overview"
                isActive={pathname === "/dashboard/wallet-transactions/overview"}
                isOpen={true}
                onClick={() => handleNavigation("/dashboard/wallet-transactions/overview")}
              />
              <SidebarNav.Item 
                icon={CreditCard}
                label="Transactions" 
                href="/dashboard/wallet-transactions/transactions"
                isActive={pathname === "/dashboard/wallet-transactions/transactions"}
                isOpen={true}
                onClick={() => handleNavigation("/dashboard/wallet-transactions/transactions")}
              />
            </SidebarSection>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
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
        </div>
      </div>

      {/* Always show desktop sidebar */}
      <DesktopSidebar isCollapsed={isCollapsed} pathname={pathname} />
    </>
  )
}

// DesktopSidebar component (unchanged)
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
      } bg-white border-r border-gray-200 flex-col transition-all duration-300 ease-in-out shadow-sm`}
    >
      {/* Logo */}
      <div className="py-3 px-6 pt-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
            S
          </div>
          {!isCollapsed && (
            <div>
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
            icon={Users}
            label="Customers" 
            href="/dashboard/customers"
            isActive={pathname === "/dashboard/customers"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/customers")}
          />
          <SidebarNav.Item 
            icon={Shield}
            label="KYC Verification" 
            href="/dashboard/kyc-verification"
            isActive={pathname === "/dashboard/kyc-verification"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/kyc-verification")}
          />
        </SidebarSection>
        
        <SidebarSection title="WALLET & TRANSACTIONS" isOpen={!isCollapsed}>
          <SidebarNav.Item 
            icon={Wallet}
            label="Wallet Overview" 
            href="/dashboard/wallet-transactions/overview"
            isActive={pathname === "/dashboard/wallet-transactions/overview"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/wallet-transactions/overview")}
          />
          <SidebarNav.Item 
            icon={CreditCard}
            label="Transactions" 
            href="/dashboard/wallet-transactions/transactions"
            isActive={pathname === "/dashboard/wallet-transactions/transactions"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/wallet-transactions/transactions")}
          />
        </SidebarSection>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
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