// src/app/dashboard/settings/active-sessions/page.tsx
"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, MoreVertical, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Session {
  id: string
  device: string
  location: string
  ipAddress: string
  lastActivity: string
  status: "CURRENT" | "ACTIVE" | "DEACTIVATED"
  date: string
}

const mockSessions: Session[] = [
  {
    id: "1",
    device: "Chrome OS",
    location: "Lagos, Nigeria",
    ipAddress: "192.168.1.100",
    lastActivity: "09/03/2025 • 14:45",
    status: "CURRENT",
    date: "2025-09-03"
  },
  {
    id: "2",
    device: "Windows 11",
    location: "Cape Town, South Africa",
    ipAddress: "192.168.1.101",
    lastActivity: "09/04/2025 • 09:30",
    status: "ACTIVE",
    date: "2025-09-04"
  },
  {
    id: "3",
    device: "macOS Monterey",
    location: "Nairobi, Kenya",
    ipAddress: "192.168.1.102",
    lastActivity: "09/05/2025 • 16:15",
    status: "ACTIVE",
    date: "2025-09-05"
  },
  {
    id: "4",
    device: "Ubuntu 22.04",
    location: "Accra, Ghana",
    ipAddress: "192.168.1.103",
    lastActivity: "09/06/2025 • 12:00",
    status: "DEACTIVATED",
    date: "2025-09-06"
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "CURRENT":
      return "bg-green-100 text-green-700"
    case "ACTIVE":
      return "bg-blue-100 text-blue-700"
    case "DEACTIVATED":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function ActiveSessionsPage() {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [dateFilter, setDateFilter] = useState<string>("")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  
  const dateInputRef = useRef<HTMLInputElement>(null)

  const totalRows = 70

  // Filter sessions based on selected filters
  const filteredSessions = mockSessions.filter(session => {
    const statusMatch = statusFilter === "ALL" || session.status === statusFilter
    const dateMatch = !dateFilter || session.date === dateFilter
    return statusMatch && dateMatch
  })

  // Calculate paginated sessions
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedSessions = filteredSessions.slice(startIndex, endIndex)

  const handleSelectAll = () => {
    if (selectedSessions.length === paginatedSessions.length) {
      setSelectedSessions([])
    } else {
      setSelectedSessions(paginatedSessions.map((s) => s.id))
    }
  }

  const handleSelectSession = (id: string) => {
    setSelectedSessions((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    setShowStatusDropdown(false)
    setCurrentPage(1)
  }

  const handleDateFilter = (date: string) => {
    setDateFilter(date)
    setShowDatePicker(false)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setStatusFilter("ALL")
    setDateFilter("")
    setCurrentPage(1)
  }

  const triggerDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker()
    }
  }

  // Calculate dynamic counts
  const showingCount = paginatedSessions.length
  const totalFilteredCount = filteredSessions.length
  const totalPages = Math.ceil(totalFilteredCount / rowsPerPage)

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Filters - Horizontal on all screens */}
      <div className="flex flex-row gap-3 items-center">
        {/* Status Filter with Dropdown */}
        <div className="relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 text-xs md:text-sm bg-transparent"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            Status
            <ChevronDown className="w-3 h-3" />
          </Button>
          
          {showStatusDropdown && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => handleStatusFilter("ALL")}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  statusFilter === "ALL" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => handleStatusFilter("CURRENT")}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  statusFilter === "CURRENT" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                Current
              </button>
              <button
                onClick={() => handleStatusFilter("ACTIVE")}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  statusFilter === "ACTIVE" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleStatusFilter("DEACTIVATED")}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  statusFilter === "DEACTIVATED" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                Deactivated
              </button>
            </div>
          )}
        </div>

        {/* Date Filter with Proper Calendar */}
        <div className="relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 text-xs md:text-sm bg-transparent relative"
            onClick={triggerDatePicker}
          >
            <Calendar className="w-3 h-3" />
            Date
            {dateFilter && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </Button>
          
          <input
            ref={dateInputRef}
            type="date"
            value={dateFilter}
            onChange={(e) => handleDateFilter(e.target.value)}
            className="absolute top-full left-0 mt-1 opacity-0 w-full h-8 cursor-pointer"
          />
        </div>

        {/* Clear Filters */}
        {(statusFilter !== "ALL" || dateFilter) && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs md:text-sm bg-transparent text-red-600 hover:text-red-700"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filter Display */}
      {(statusFilter !== "ALL" || dateFilter) && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>Active filters:</span>
          {statusFilter !== "ALL" && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Status: {statusFilter}</span>
          )}
          {dateFilter && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Date: {new Date(dateFilter).toLocaleDateString()}
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedSessions.length === paginatedSessions.length && paginatedSessions.length > 0}
                  onChange={handleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">DEVICE</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">LOCATION</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">IP ADDRESS</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">LAST ACTIVITY</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">STATUS</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSessions.length > 0 ? (
              paginatedSessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedSessions.includes(session.id)}
                      onChange={() => handleSelectSession(session.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-medium">{session.device}</td>
                  <td className="px-4 py-3 text-gray-600">{session.location}</td>
                  <td className="px-4 py-3 text-gray-600">{session.ipAddress}</td>
                  <td className="px-4 py-3 text-gray-600">{session.lastActivity}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors duration-200">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No sessions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Exact Layout */}
      <div className="space-y-3">
        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between text-xs md:text-sm">
          {/* Left Side: Page box + Rows per page */}
          <div className="flex items-center gap-4">
            {/* Page Box */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Page</span>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 bg-white cursor-pointer hover:border-gray-400 transition-colors w-16"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
              <span className="text-gray-600">of {totalPages}</span>
            </div>

            {/* Rows per page - Beside page box */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="border border-gray-300 rounded px-2 py-1 bg-white cursor-pointer hover:border-gray-400 transition-colors"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* Right Side: Pagination arrows + Showing text */}
          <div className="flex items-center gap-4">
            {/* Pagination Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* DYNAMIC Showing text - Based on actual filtered content */}
            <span className="text-gray-600">
              Showing {showingCount} of {totalFilteredCount}
            </span>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="sm:hidden space-y-3">
          {/* Top Row: Page box + Rows per page */}
          <div className="flex items-center justify-between">
            {/* Page Box */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-xs">Page</span>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 bg-white cursor-pointer hover:border-gray-400 transition-colors w-12 text-xs"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
              <span className="text-gray-600 text-xs">of {totalPages}</span>
            </div>

            {/* Rows per page - Right side on mobile */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-xs">Rows:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="border border-gray-300 rounded px-2 py-1 bg-white cursor-pointer hover:border-gray-400 transition-colors text-xs"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* Middle Row: Pagination arrows centered */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Row: DYNAMIC Showing text centered below */}
          <div className="flex justify-center">
            <span className="text-gray-600 text-xs">
              Showing {showingCount} of {totalFilteredCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}