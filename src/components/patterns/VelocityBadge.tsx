import React from 'react';
import { VelocityImpact } from '@/lib/data/patterns/types';

interface VelocityBadgeProps {
  impact: VelocityImpact;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const VelocityBadge: React.FC<VelocityBadgeProps> = ({ 
  impact, 
  size = 'md',
  showLabel = true 
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const config = {
    high: {
      icon: '🚀',
      label: 'High Velocity',
      bgClass: 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30',
      textClass: 'text-green-700 dark:text-green-400',
      tooltip: 'Quick to implement with high complexity reduction'
    },
    medium: {
      icon: '⚡',
      label: 'Medium Velocity',
      bgClass: 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30',
      textClass: 'text-yellow-700 dark:text-yellow-400',
      tooltip: 'Moderate implementation time with good reusability'
    },
    low: {
      icon: '📈',
      label: 'Low Velocity',
      bgClass: 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30',
      textClass: 'text-blue-700 dark:text-blue-400',
      tooltip: 'Specialized pattern requiring deeper investment'
    }
  };

  // Guard against undefined or invalid impact values
  const validImpact = impact && config[impact] ? impact : 'medium';
  const { icon, label, bgClass, textClass, tooltip } = config[validImpact];

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        ${bgClass} ${textClass} ${sizeClasses[size]}
        font-medium transition-all duration-200
        hover:scale-105 cursor-help
      `}
      title={tooltip}
    >
      <span className="leading-none">{icon}</span>
      {showLabel && <span>{label}</span>}
    </div>
  );
};
