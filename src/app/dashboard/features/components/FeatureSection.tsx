'use client';

import { Feature } from '../page';
import FeatureCard from './FeatureCard';

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  onFeatureToggle: (featureId: string, enabled: boolean) => void;
}

export default function FeatureSection({ 
  title, 
  subtitle, 
  features, 
  onFeatureToggle 
}: FeatureSectionProps) {
  return (
    <div className="mb-6 overflow-hidden">
      {/* Section Header */}
      <div className="p-3 sm:pt-1 sm:pb-4 sm:pl-6 sm:pr-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Features Container*/}
      <div className="rounded-xl border border-gray-100 p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              onToggle={onFeatureToggle}
              isLast={index === features.length - 1} // Pass isLast prop
            />
          ))}
        </div>
      </div>
    </div>
  );
}