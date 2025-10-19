// import { redirect } from "next/navigation";

// export default function DashboardPage() {
//   redirect("/dashboard/overview");
// }

"use client"

import { Suspense } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { CustomersChart } from "@/components/dashboard/customers-chart"
import { TransactionsTable } from "@/components/dashboard/transactions-table"
import { ChartSkeleton, TableSkeleton } from "@/components/dashboard/skeletons"

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Master Balance" value="₦84,343,000.00" change={24.3} period="July 2025" variant="dark" />
        <StatCard title="Total Transactions" value="14,388" change={-22.1} period="July 2025" />
        <StatCard title="Total Users" value="8,235" change={-22.1} period="July 2025" />
        <StatCard title="Total Transaction Volume" value="₦4,343,000.00" change={-22.1} period="July 2025" />
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
