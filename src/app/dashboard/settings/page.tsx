
"use client"

import { useRouter } from "next/navigation"
import { User, Lock, Users, Shield, Bell, Smartphone } from "lucide-react"

interface SettingCard {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  href: string
  bgColor: string
}

const settingCards: SettingCard[] = [
  {
    id: "personal-details",
    icon: <User className="w-8 h-8" />,
    title: "Personal Details",
    description: "Your name, contact details and other relevant information.",
    href: "/dashboard/settings/personal-details",
    bgColor: "bg-blue-100",
  },
  {
    id: "signin-security",
    icon: <Lock className="w-8 h-8" />,
    title: "Sign In & Security",
    description: "These details are used to sign-in and access your account.",
    href: "/dashboard/settings/signin-security",
    bgColor: "bg-yellow-100",
  },
  {
    id: "role-management",
    icon: <Users className="w-8 h-8" />,
    title: "Role Management",
    description: "Create and manage user roles with specific permissions.",
    href: "/dashboard/settings/role-management",
    bgColor: "bg-blue-100",
  },
  {
    id: "admin-management",
    icon: <Shield className="w-8 h-8" />,
    title: "Admin Management",
    description: "Manage admin users, permissions, and access controls.",
    href: "/dashboard/settings/admin-management",
    bgColor: "bg-blue-100",
  },
  {
    id: "notifications",
    icon: <Bell className="w-8 h-8" />,
    title: "Notifications",
    description: "Manage your notification preferences and alert settings.",
    href: "/dashboard/settings/notifications",
    bgColor: "bg-blue-100",
  },
  {
    id: "active-sessions",
    icon: <Smartphone className="w-8 h-8" />,
    title: "Active Sessions",
    description: "Manage your active login sessions across all devices.",
    href: "/dashboard/settings/active-sessions",
    bgColor: "bg-gray-900",
  },
]

export default function SettingsPage() {
  const router = useRouter()

  const handleCardClick = (href: string) => {
    router.push(href)
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="mt-3 text-2xl font-semibold text-gray-900">Account Settings</h1>
        <p className="text-sm md:text-base text-gray-600">Manage account settings, preferences, and configurations</p>
      </div>

      {/* Settings Grid*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {settingCards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.href)}
            className="group p-6 border bg-gray-50 border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:scale-105 text-left"
          >
            {/* Icon Container */}
            <div
              className={`${card.bgColor} w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 ${
                card.id === "active-sessions" ? "text-white" : "text-blue-600"
              }`}
            >
              {card.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">{card.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}