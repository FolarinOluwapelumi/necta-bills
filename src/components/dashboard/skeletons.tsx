export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse" />
      <div className="h-64 bg-gray-100 rounded animate-pulse" />
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}
