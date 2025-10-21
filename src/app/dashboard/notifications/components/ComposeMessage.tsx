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
  const [characterCount, setCharacterCount] = useState(0);

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

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    setCharacterCount(value.length);
  };

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

  const isFormValid = title.trim() && message.trim() && selectedRecipients.length > 0;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Section - Notification Content (Flexible Height) */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-6 border border-gray-100 min-h-[400px] h-fit">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Notification Content
              </h2>
              <p className="text-sm text-gray-600">
                Compose your notification message
              </p>
            </div>

            <div className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title*
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notification title"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors duration-200 text-base placeholder-gray-400"
                  required
                />
              </div>

              {/* Message Input with Flexible Height */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Message*
                </label>
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Write your message here..."
                    rows={4}
                    maxLength={500}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-0 resize-none transition-colors duration-200 text-base placeholder-gray-400 min-h-[120px]"
                    style={{ 
                      height: 'auto',
                      minHeight: '120px',
                      resize: 'vertical'
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                    required
                  />
                  {/* Character Counter Below Border */}
                  <div className="flex justify-end pt-2">
                    <span className={`text-xs ${
                      characterCount > 500 ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {characterCount}/500 characters
                    </span>
                  </div>
                </div>
              </div>

              {/* Send Button at Bottom */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Settings (Stacked Vertically) */}
          <div className="space-y-6">
            {/* Notification Type */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Notification Type
                </h2>
                <p className="text-sm text-gray-600">
                  Select delivery channel
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'email' as const, label: 'Email', description: 'Send via email notification' },
                  { value: 'push' as const, label: 'Push Notification', description: 'Send in app push notification' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                      notificationType === option.value
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="notificationType"
                      value={option.value}
                      checked={notificationType === option.value}
                      onChange={() => setNotificationType(option.value)}
                      className="sr-only"
                    />
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{option.label}</p>
                          <p className="text-gray-500">{option.description}</p>
                        </div>
                      </div>
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        notificationType === option.value 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {notificationType === option.value && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Recipients */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Recipients
                </h2>
                <p className="text-sm text-gray-600">
                  Choose who will receive this notification
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {selectedRecipients.length} group(s)
                </p>
              </div>

              <div className="space-y-3">
                {recipientGroups.map((group) => (
                  <label
                    key={group.id}
                    className={`flex items-start space-x-3 cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                      selectedRecipients.includes(group.id)
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                    }`}
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
                        {group.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {group.count.toLocaleString()} users
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}