'use client';

interface Filters {
  status: string;
  kycStatus: string;
  search: string;
}

interface CustomerFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function CustomerFilters({ filters, onFiltersChange }: CustomerFiltersProps) {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
      <div className="relative">
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border border-gray-300 rounded-2xl px-4 py-2 focus:ring-blue-500 focus:border-blue-500 w-auto appearance-none pr-8 bg-white"
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="restricted">Restricted</option>
          </select>
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative">
        <select
          value={filters.kycStatus}
          onChange={(e) => handleFilterChange('kycStatus', e.target.value)}
          className="border border-gray-300 rounded-2xl px-4 py-2 focus:ring-blue-500 focus:border-blue-500 w-auto appearance-none pr-8 bg-white"
        >
          <option value="">KYC Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}