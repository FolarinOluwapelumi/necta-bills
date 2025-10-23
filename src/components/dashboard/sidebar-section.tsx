"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface SidebarSectionProps {
  title: string
  isOpen: boolean
  children: React.ReactNode
}

export function SidebarSection({ title, isOpen, children }: SidebarSectionProps) {
  const [expanded, setExpanded] = useState(true)

  if (!isOpen) return null

  return (
    <div className="mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors duration-200"
      >
        {title}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            expanded ? "rotate-0" : "-rotate-90"
          }`} 
        />
      </button>
      {expanded && <div className="space-y-1 mt-2">{children}</div>}
    </div>
  )
}