import React from 'react';

interface ProgressBadgeProps {
  count: number;
  className?: string;
  title?: string;
}

export const ProgressBadge: React.FC<ProgressBadgeProps> = ({ count, className = '', title }) => {
  if (!count || count <= 0) return null;
  return (
    <span
      title={title || `${count} completed`}
      className={`ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary/20 text-primary text-xs px-1 ${className}`}
    >
      {count}
    </span>
  );
};

export default ProgressBadge;
