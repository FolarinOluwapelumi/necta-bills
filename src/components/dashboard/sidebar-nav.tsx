"use client"

import type React from "react"

import { LayoutDashboard, Bell, Headphones, Settings, Zap } from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Headphones, label: "Support", href: "/dashboard/support" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: Zap, label: "Feature Management", href: "/dashboard/features" },
]

interface SidebarNavProps {
  isOpen: boolean
}

export function SidebarNav({ isOpen }: SidebarNavProps) {
  return (
    <>
      {navItems.map((item) => (
        <SidebarNav.Item key={item.label} icon={item.icon.name} label={item.label} isOpen={isOpen} />
      ))}
    </>
  )
}

interface ItemProps {
  icon: string
  label: string
  isOpen: boolean
}

SidebarNav.Item = function Item({ icon, label, isOpen }: ItemProps) {
  const iconMap: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
    Bell: <Bell className="w-5 h-5" />,
    Headphones: <Headphones className="w-5 h-5" />,
    Settings: <Settings className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Users: <LayoutDashboard className="w-5 h-5" />,
    Shield: <Settings className="w-5 h-5" />,
    Wallet: <LayoutDashboard className="w-5 h-5" />,
    CreditCard: <LayoutDashboard className="w-5 h-5" />,
  }

  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
      <span className="text-gray-600">{iconMap[icon]}</span>
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </button>
  )
}
