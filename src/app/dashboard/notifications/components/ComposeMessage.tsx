// src/app/dashboard/notifications/components/ComposeMessage.tsx
'use client';

import { useState } from 'react';

interface RecipientGroup {
  id: string;
  label: string;
  description: string;
  count: number;
}

export default function ComposeMessage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'email' | 'push'>('email');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  const recipientGroups: RecipientGroup[] = [
    {
      id: 'all',
      label: 'All Users',
      description: 'Send to everyone',
      count: 24563,
    },
    {
      id: 'active',
      label: 'Active Users',
      description: 'Users active in last 7 days',
      count: 18234,
    },
    {
      id: 'verified',
      label: 'KYC Verified Users',
      description: 'Users with verified KYC',
      count: 18942,
    },
    {
      id: 'pending',
      label: 'Pending KYC Users',
      description: 'Users with pending KYC',
      count: 3421,
    },
    {
      id: 'inactive',
      label: 'Inactive Users',
      description: 'No activity in 30+ days',
      count: 2329,
    },
  ];

  const handleRecipientToggle = (groupId: string) => {
    setSelectedRecipients(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement notification sending logic
    console.log({
      title,
      message,
      notificationType,
      selectedRecipients,
    });
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Notification Content Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Content
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Compose your notification message
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title*
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message*
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Notification Type Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Type
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Select delivery channel
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="relative flex cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none">
              <input
                type="radio"
                name="notificationType"
                value="email"
                checked={notificationType === 'email'}
                onChange={() => setNotificationType('email')}
                className="sr-only"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-500">Send via email notification</p>
                  </div>
                </div>
                <div className={`h-4 w-4 rounded-full border-2 ${
                  notificationType === 'email' 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`} />
              </div>
            </label>

            <label className="relative flex cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none">
              <input
                type="radio"
                name="notificationType"
                value="push"
                checked={notificationType === 'push'}
                onChange={() => setNotificationType('push')}
                className="sr-only"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Push Notification</p>
                    <p className="text-gray-500">Send in app push notification</p>
                  </div>
                </div>
                <div className={`h-4 w-4 rounded-full border-2 ${
                  notificationType === 'push' 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`} />
              </div>
            </label>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Recipients Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recipients
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Choose who will receive this notification
          </p>

          <div className="space-y-3">
            {recipientGroups.map((group) => (
              <label
                key={group.id}
                className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedRecipients.includes(group.id)}
                  onChange={() => handleRecipientToggle(group.id)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {group.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    {group.description} ({group.count.toLocaleString()} users)
                  </p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={!title || !message || selectedRecipients.length === 0}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
}