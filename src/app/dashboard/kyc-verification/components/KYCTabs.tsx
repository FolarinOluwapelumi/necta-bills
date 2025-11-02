'use client';

interface KYCTabsProps {
  activeTab: 'pending' | 'verified' | 'rejected';
  onTabChange: (tab: 'pending' | 'verified' | 'rejected') => void;
  counts: {
    pending: number;
    verified: number;
    rejected: number;
  };
}

export default function KYCTabs({ activeTab, onTabChange, counts }: KYCTabsProps) {
  const tabs = [
    { id: 'pending' as const, name: `Pending (${counts.pending})` },
    { id: 'verified' as const, name: `Verified (${counts.verified})` },
    { id: 'rejected' as const, name: `Rejected (${counts.rejected})` }
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
}