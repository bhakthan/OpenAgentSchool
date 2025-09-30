import { CircleNotch } from '@phosphor-icons/react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <CircleNotch 
        size={size === 'sm' ? 32 : size === 'md' ? 48 : 64} 
        className="animate-spin text-indigo-600 dark:text-indigo-400"
        weight="bold"
      />
      {message && (
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

// Full-page loading for route transitions
export const PageLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner message="Loading content..." size="lg" />
  </div>
);

export default LoadingSpinner;
