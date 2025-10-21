
'use client';

import { NotificationTab } from '../page';

interface NotificationTabsProps {
  activeTab: NotificationTab;
  onTabChange: (tab: NotificationTab) => void;
}

export default function NotificationTabs({ 
  activeTab, 
  onTabChange 
}: NotificationTabsProps) {
  const tabs = [
    { id: 'compose' as NotificationTab, label: 'Compose Message' },
    { id: 'history' as NotificationTab, label: 'Sent History' },
  ];

  return (
    <div>
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}