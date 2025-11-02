"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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
  const [isMounted, setIsMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  
  const initials = `${mockUser.firstName.charAt(0)}${mockUser.lastName.charAt(0)}`.toUpperCase()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Smooth close function
  const handleClose = useCallback(() => {
    setIsClosing(true)
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300) // Match this with your CSS transition duration
  }, [onClose])

  // Close sidebar when route changes
  useEffect(() => {
    if (isOpen && isMounted) {
      handleClose()
    }
  }, [pathname, isOpen, isMounted, handleClose]) // Added missing dependencies

  // Handle outside click and escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        handleClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, handleClose]) // Added missing dependencies

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  // Body scroll lock and blur effect
  useEffect(() => {
    if (isMounted && isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      // Add blur class to main content
      document.getElementById('main-content')?.classList.add('backdrop-blur-sm')
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'static'
      document.body.style.width = 'auto'
      // Remove blur class from main content
      document.getElementById('main-content')?.classList.remove('backdrop-blur-sm')
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'static'
      document.body.style.width = 'auto'
      document.getElementById('main-content')?.classList.remove('backdrop-blur-sm')
    }
  }, [isOpen, isMounted])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-opacity-40 z-40 md:hidden transition-opacity duration-300"
          onClick={handleClose}
          style={{ 
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Mobile Drawer with Enhanced Animations */}
      <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div
          ref={sidebarRef}
          className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-all duration-300 ease-out ${
            isOpen && !isClosing 
              ? "translate-x-0 opacity-100" 
              : "-translate-x-full opacity-0"
          }`}
          style={{
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
            willChange: 'transform, opacity'
          }}
        >
          {/* Close Button with Animation */}
          <div className="p-2 flex justify-end border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5 transition-transform duration-200 hover:rotate-90" />
            </button>
          </div>

          {/* Logo with Fade-in Effect */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg transition-transform duration-300 hover:scale-105">
                S
              </div>
              <div className="transition-all duration-500 delay-100">
                <p className="font-semibold text-gray-900 text-sm">NectaBills</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation with Staggered Animation */}
          <nav 
            className="flex-1 overflow-y-auto p-4 space-y-2 bg-white/90 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
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
                href="/dashboard/wallet"
                isActive={pathname === "/dashboard/wallet"}
                isOpen={true}
                onClick={() => handleNavigation("/dashboard/wallet")}
              />
              <SidebarNav.Item 
                icon={CreditCard}
                label="Transactions" 
                href="/dashboard/transactions"
                isActive={pathname === "/dashboard/transactions"}
                isOpen={true}
                onClick={() => handleNavigation("/dashboard/transactions")}
              />
            </SidebarSection>
          </nav>

          {/* User Profile with Hover Animation */}
          <div className="p-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-100"
              onClick={handleClose}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg transition-transform duration-300 hover:scale-110">
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
      <DesktopSidebar isCollapsed={isCollapsed} pathname={pathname} />
    </>
  )
}

// DesktopSidebar 
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
      } bg-white border-r border-gray-200 flex-col transition-all duration-500 ease-in-out`}
      style={{
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Logo */}
      <div className="py-3 px-6 pt-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg transition-transform duration-300 hover:scale-105">
            S
          </div>
          {!isCollapsed && (
            <div className="transition-all duration-500 ease-out">
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
            href="/dashboard/wallet"
            isActive={pathname === "/dashboard/wallet"}
            isOpen={!isCollapsed}
            onClick={() => handleNavigation("/dashboard/wallet")}
          />
          <SidebarNav.Item 
            icon={CreditCard}
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
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300 hover:shadow-md">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-transform duration-300 hover:scale-110">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 transition-all duration-500 ease-out">
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