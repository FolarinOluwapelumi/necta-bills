export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-6" />
      <div className="h-64 bg-gray-100 rounded" />
      <div className="flex gap-2 mt-6 justify-between">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 rounded w-12" />
        ))}
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="flex gap-8">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-16" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
          <div className="flex gap-2">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}