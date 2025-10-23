"use client";

import { useState } from "react";
import { Feature } from "../page";
import {
  CreditCard,
  Send,
  Zap,
  Users,
  Shield,
  Bell,
  MessageSquare,
  FileText,
} from "lucide-react";

interface FeatureCardProps {
  feature: Feature;
  onToggle: (featureId: string, enabled: boolean) => void;
  isLast?: boolean;
}

// Icon mapping based on feature titles
const getFeatureIcon = (featureId: string) => {
  const iconProps = { className: "w-4 h-4 sm:w-5 sm:h-5" };

  switch (featureId) {
    case "payment-processing":
      return <CreditCard {...iconProps} />;
    case "money-transfers":
      return <Send {...iconProps} />;
    case "instant-transfers":
      return <Zap {...iconProps} />;
    case "bulk-payments":
      return <Users {...iconProps} />;
    case "kyc-verification":
      return <Shield {...iconProps} />;
    case "push-notifications":
      return <Bell {...iconProps} />;
    case "sms-alerts":
      return <MessageSquare {...iconProps} />;
    case "account-statements":
      return <FileText {...iconProps} />;
    default:
      return <CreditCard {...iconProps} />;
  }
};

export default function FeatureCard({
  feature,
  onToggle,
  isLast = false,
}: FeatureCardProps) {
  const [isEnabled, setIsEnabled] = useState(feature.enabled);

  const handleToggle = () => {
    const newEnabledState = !isEnabled;
    setIsEnabled(newEnabledState);
    onToggle(feature.id, newEnabledState);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 transition-all duration-200 gap-3 sm:gap-4 ${
        !isLast ? "border-b border-gray-200" : ""
      }`}
    >
      {/* Left side: Icon + Content */}
      <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1 sm:mt-0">
          {getFeatureIcon(feature.id)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {feature.title}
            </h3>

            {/* Priority Badge - Only show if CRITICAL */}
            {feature.priority === "CRITICAL" && (
              <span className="bg-gray-100 text-green-800 text-[.5rem] sm:text-xs font-bold px-2 py-1 rounded self-start sm:self-auto w-fit">
                CRITICAL
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Right side: Toggle + Status - Close together on mobile */}
      <div className="flex items-center justify-end space-x-1 sm:space-x-4 w-full sm:w-auto">
        {/* Status Button */}
        <span
          className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[.5rem] sm:text-xs font-bold border flex-shrink-0 ${
            isEnabled
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-800 border-gray-200"
          }`}
        >
          {isEnabled ? "ACTIVE" : "INACTIVE"}
        </span>

        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
            isEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
              isEnabled ? "translate-x-4 sm:translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
