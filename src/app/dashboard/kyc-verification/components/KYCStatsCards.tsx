'use client';

import { KYCStats } from '../types/kyc';

interface KYCStatsCardsProps {
  stats: KYCStats;
}

export default function KYCStatsCards({ stats }: KYCStatsCardsProps) {
  const cards = [
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews.toLocaleString(),
      change: stats.pendingChange,
      color: 'text-green-500',
      icon: (
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Verified Today',
      value: stats.verifiedToday.toLocaleString(),
      change: stats.verifiedChange,
      color: 'text-orange-500',
      icon: (
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Rejection Rate',
      value: stats.rejectionRate.toLocaleString(),
      change: stats.rejectionChange,
      color: 'text-red-500',
      icon: (
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 font-medium">{card.title}</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{card.value}</div>
          <div className={`flex items-center mt-2 ${card.color}`}>
            {card.icon}
            <span className="text-sm font-medium">
              {Math.abs(card.change)}% July 2025
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}