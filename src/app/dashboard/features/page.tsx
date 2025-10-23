'use client';

import { useState } from 'react';
import FeatureSection from './components/FeatureSection';

// Types for our features
export interface Feature {
  id: string;
  title: string;
  description: string;
  category: 'CORE' | 'SECURITY_NOTIFICATIONS';
  priority?: 'CRITICAL';
  enabled: boolean;
}

// Mock data - exactly matching the design
const featuresData: Feature[] = [
  // Core Features
  {
    id: 'payment-processing',
    title: 'Payment Processing',
    description: 'Enable users to send and receive payments',
    category: 'CORE',
    priority: 'CRITICAL',
    enabled: true
  },
  {
    id: 'money-transfers',
    title: 'Money Transfers',
    description: 'Allow transfers between users',
    category: 'CORE',
    priority: 'CRITICAL',
    enabled: true
  },
  {
    id: 'instant-transfers',
    title: 'Instant Transfers',
    description: 'Real-time transfer processing',
    category: 'CORE',
    enabled: true
  },
  {
    id: 'bulk-payments',
    title: 'Bulk Payments',
    description: 'Process multiple payments at once',
    category: 'CORE',
    enabled: true
  },
  
  // Security & Notifications
  {
    id: 'kyc-verification',
    title: 'KYC Verification',
    description: 'User identity verification system',
    category: 'SECURITY_NOTIFICATIONS',
    priority: 'CRITICAL',
    enabled: true
  },
  {
    id: 'push-notifications',
    title: 'Push Notifications',
    description: 'Send push notifications to users',
    category: 'SECURITY_NOTIFICATIONS',
    priority: 'CRITICAL',
    enabled: true
  },
  {
    id: 'sms-alerts',
    title: 'SMS Alerts',
    description: 'Transaction SMS notifications',
    category: 'SECURITY_NOTIFICATIONS',
    enabled: true
  },
  {
    id: 'account-statements',
    title: 'Account Statements',
    description: 'Generate PDF account statements',
    category: 'SECURITY_NOTIFICATIONS',
    enabled: true
  }
];

export default function FeatureManagementPage() {
  const [features, setFeatures] = useState<Feature[]>(featuresData);

  const handleFeatureToggle = (featureId: string, enabled: boolean) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId ? { ...feature, enabled } : feature
    ));
  };

  const coreFeatures = features.filter(feature => feature.category === 'CORE');
  const securityNotificationsFeatures = features.filter(feature => 
    feature.category === 'SECURITY_NOTIFICATIONS'
  );

  const enabledCoreCount = coreFeatures.filter(f => f.enabled).length;
  const enabledSecurityCount = securityNotificationsFeatures.filter(f => f.enabled).length;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">

        {/* Core Features Section */}
        <FeatureSection
          title="Core Features"
          subtitle={`${enabledCoreCount} of ${coreFeatures.length} enabled`}
          features={coreFeatures}
          onFeatureToggle={handleFeatureToggle}
        />

        {/* Security & Notifications Section */}
        <FeatureSection
          title="Security & Notifications"
          subtitle={`${enabledSecurityCount} of ${securityNotificationsFeatures.length} enabled`}
          features={securityNotificationsFeatures}
          onFeatureToggle={handleFeatureToggle}
        />
      </div>
    </div>
  );
}