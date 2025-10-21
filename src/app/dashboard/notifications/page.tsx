
'use client';

import { useState } from 'react';
import ComposeMessage from './components/ComposeMessage';
import SentHistory from './components/SentHistory';
import NotificationTabs from './components/NotificationTabs';

export type NotificationTab = 'compose' | 'history';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<NotificationTab>('compose');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Send Notifications
          </h1>
          <p className="text-gray-600 mt-2">
            Send push notifications or emails to your users
          </p>
        </div>

        {/* Tabs */}
        <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="mt-4">
          {activeTab === 'compose' ? <ComposeMessage /> : <SentHistory />}
        </div>
      </div>
    </div>
  );
}