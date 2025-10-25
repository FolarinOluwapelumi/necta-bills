"use client"

import { useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Bell, 
  Headphones, 
  Settings, 
  Zap, 
  LucideIcon
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Headphones, label: "Support", href: "/dashboard/support" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: Zap, label: "Feature Management", href: "/dashboard/features" },
]

interface SidebarNavProps {
  currentPath: string
  isOpen: boolean
}

export function SidebarNav({ currentPath, isOpen }: SidebarNavProps) {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <>
      {navItems.map((item) => (
        <SidebarNav.Item 
          key={item.label} 
          icon={item.icon}
          label={item.label} 
          href={item.href}
          isActive={
            currentPath === item.href || 
            (item.href !== "/dashboard" && currentPath.startsWith(item.href))
          }
          isOpen={isOpen}
          onClick={() => handleNavigation(item.href)}
        />
      ))}
    </>
  )
}

interface ItemProps {
  icon: LucideIcon 
  label: string
  href: string
  isActive: boolean
  isOpen: boolean
  onClick: () => void
}

SidebarNav.Item = function Item({ icon: IconComponent, label, isActive, isOpen, onClick }: ItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? "bg-blue-50 text-blue-600 font-semibold" 
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className={isActive ? "text-blue-600" : "text-gray-600"}>
        <IconComponent className="w-5 h-5" /> 
      </span>
      {isOpen && <span className="text-sm">{label}</span>}
    </button>
  )
}