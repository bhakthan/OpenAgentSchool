/**
 * Share Button Component
 * Uses Web Share API with clipboard fallback
 */

import { useState } from 'react';
import { ShareNetwork, Copy, Check } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics/ga';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

export function ShareButton({
  title,
  text,
  url,
  variant = 'ghost',
  size = 'icon',
  showLabel = false,
  className = '',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title,
      text: text || title,
      url: shareUrl,
    };

    // Try Web Share API first (mobile-friendly)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
        
        trackEvent({
          action: 'content_shared',
          category: 'engagement',
          label: title,
          method: 'web_share_api',
        });
        
        return;
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    }

    // Fallback to clipboard copy
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      
      trackEvent({
        action: 'content_shared',
        category: 'engagement',
        label: title,
        method: 'clipboard',
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      className={className}
      aria-label="Share"
      title="Share"
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
      ) : (
        <ShareNetwork className="w-5 h-5" />
      )}
      {showLabel && (
        <span className="ml-2">
          {copied ? 'Copied!' : 'Share'}
        </span>
      )}
    </Button>
  );
}
