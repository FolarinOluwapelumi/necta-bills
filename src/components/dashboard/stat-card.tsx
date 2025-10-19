"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: number
  period: string
  variant?: "dark" | "light"
}

export function StatCard({ title, value, change, period, variant = "light" }: StatCardProps) {
  const isPositive = change >= 0
  const isDark = variant === "dark"

  return (
    <div
      className={`p-4 md:p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
        isDark ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-900"
      }`}
    >
      <p className={`text-xs md:text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>{title}</p>
      <p className="text-lg md:text-2xl font-bold mt-2">{value}</p>
      <div className="flex items-center gap-2 mt-4">
        {isPositive ? (
          <TrendingUp className="w-3 md:w-4 h-3 md:h-4 text-green-500 animate-bounce" />
        ) : (
          <TrendingDown className="w-3 md:w-4 h-3 md:h-4 text-orange-500" />
        )}
        <span className={`text-xs md:text-sm font-medium ${isPositive ? "text-green-500" : "text-orange-500"}`}>
          {isPositive ? "+" : ""}
          {change}%
        </span>
        <span className={`text-xs md:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{period}</span>
      </div>
    </div>
  )
}
