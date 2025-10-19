"use client"

import { useState } from "react"
import { useCurrentUser } from "@/lib/use-current-user"
import { SidebarNav } from "./sidebar-nav"
import { SidebarSection } from "./sidebar-section"
import { X } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const user = useCurrentUser()

  const initials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : "PD"

  return (
    <>
      {/* Mobile Drawer */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50 md:hidden ${
          isOpen ? "translate-x-0 animate-slide-in-left" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 pb-4 border-b border-gray-200">
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
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <SidebarNav isOpen={true} />
          <SidebarSection title="USER MANAGEMENT" isOpen={true}>
            <SidebarNav.Item icon="Users" label="Customers" isOpen={true} />
            <SidebarNav.Item icon="Shield" label="KYC Verification" isOpen={true} />
          </SidebarSection>
          <SidebarSection title="WALLET & TRANSACTIONS" isOpen={true}>
            <SidebarNav.Item icon="Wallet" label="Overview" isOpen={true} />
            <SidebarNav.Item icon="CreditCard" label="Transactions" isOpen={true} />
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
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </p>
              <p className="text-xs text-gray-500 truncate">{user ? user.email : ""}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
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
          <SidebarNav isOpen={!isCollapsed} />
          <SidebarSection title="USER MANAGEMENT" isOpen={!isCollapsed}>
            <SidebarNav.Item icon="Users" label="Customers" isOpen={!isCollapsed} />
            <SidebarNav.Item icon="Shield" label="KYC Verification" isOpen={!isCollapsed} />
          </SidebarSection>
          <SidebarSection title="WALLET & TRANSACTIONS" isOpen={!isCollapsed}>
            <SidebarNav.Item icon="Wallet" label="Overview" isOpen={!isCollapsed} />
            <SidebarNav.Item icon="CreditCard" label="Transactions" isOpen={!isCollapsed} />
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
                  {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
                </p>
                <p className="text-xs text-gray-500 truncate">{user ? user.email : ""}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
