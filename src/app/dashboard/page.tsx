
"use client"

import { Suspense } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { CustomersChart } from "@/components/dashboard/customers-chart"
import { TransactionsTable } from "@/components/dashboard/transactions-table"
import { ChartSkeleton, TableSkeleton } from "@/components/dashboard/skeletons"
import { mockStats } from "@/lib/data/mock-data"

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Stats Grid - Now starts immediately after header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {mockStats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            period={stat.period}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Chart Section */}
      <Suspense fallback={<ChartSkeleton />}>
        <CustomersChart />
      </Suspense>

      {/* Table Section */}
      <Suspense fallback={<TableSkeleton />}>
        <TransactionsTable />
      </Suspense>
    </div>
  )
}