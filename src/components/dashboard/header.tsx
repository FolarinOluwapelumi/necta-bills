"use client"

import { Search, Download, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 md:px-4 py-2 flex-1 max-w-md transition-all duration-200 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-4 md:w-5 h-4 md:h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Anything"
            className="bg-transparent outline-none text-xs md:text-sm w-full"
          />
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
    </header>
  )
}
