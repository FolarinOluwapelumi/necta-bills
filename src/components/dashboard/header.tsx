
// "use client"

// import { Search, Download, Home } from "lucide-react"
// import { Button } from "@/components/ui/button"

// interface HeaderProps {
//   onMenuClick: () => void
// }

// export function Header({ onMenuClick }: HeaderProps) {
//   return (
//     <header className="bg-white">
//       <div className="border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//             <Home className="w-4 h-4 text-white" />
//           </div>
//           <h1 className="text-sm md:text-lg font-semibold text-gray-900">Overview</h1>
//         </div>

//         {/* Right: Export Button */}
//         <Button
//           variant="outline"
//           size="sm"
//           className="gap-2 bg-transparent text-xs md:text-sm whitespace-nowrap transition-all duration-200 hover:scale-105"
//         >
//           <Download className="w-3 md:w-4 h-3 md:h-4" />
//           <span className="hidden sm:inline">Export Or Import</span>
//           <span className="sm:hidden">Export</span>
//         </Button>
//       </div>

//       <div className="border-b border-gray-200">
//         <div className="flex px-4 md:px-8 items-center gap-2 py-3 transition-all duration-200 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
//           <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input
//             type="text"
//             placeholder="Search Anything"
//             className="bg-transparent outline-none text-sm md:text-base w-full placeholder-gray-500"
//           />
//         </div>
//       </div>
//     </header>
//   )
// }


// src/components/dashboard/header.tsx
"use client"

import { Search, Download, Home, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white">
      <div className="border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 md:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-sm md:text-lg font-semibold text-gray-900">Overview</h1>
          </div>
        </div>

        {/* Right: Export Button */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent text-xs md:text-sm whitespace-nowrap transition-all duration-200 hover:scale-105"
        >
          <Download className="w-3 md:w-4 h-3 md:h-4" />
          <span className="hidden sm:inline">Export Or Import</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex px-4 md:px-8 items-center gap-2 py-3 transition-all duration-200 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Anything"
            className="bg-transparent outline-none text-sm md:text-base w-full placeholder-gray-500"
          />
        </div>
      </div>
    </header>
  )
}