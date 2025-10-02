import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Share, Link as LinkIcon, Check, TwitterLogo, LinkedinLogo, FacebookLogo, InstagramLogo } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface ShareButtonProps {
  /**
   * The URL to share. If not provided, will use current window location.
   */
  url?: string;
  /**
   * Title for the shared content
   */
  title: string;
  /**
   * Optional description for the shared content
   */
  description?: string;
  /**
   * Button variant
   */
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  /**
   * Button size
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Show only the icon (no text)
   */
  iconOnly?: boolean;
  /**
   * Analytics event category
   */
  analyticsCategory?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title,
  description,
  variant = 'outline',
  size = 'sm',
  className,
  iconOnly = false,
  analyticsCategory = 'Share',
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = description ? `${title}\n\n${description}` : title;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: 'Link copied!',
        description: 'The link has been copied to your clipboard.',
      });
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'copy_link', {
          event_category: analyticsCategory,
          event_label: title,
        });
      }
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Copy failed',
        description: 'Please try again or copy the URL manually.',
        variant: 'destructive',
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
        
        // Track analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'native_share', {
            event_category: analyticsCategory,
            event_label: title,
          });
        }
      } catch (err) {
        // User cancelled or error occurred
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share_twitter', {
        event_category: analyticsCategory,
        event_label: title,
      });
    }
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share_linkedin', {
        event_category: analyticsCategory,
        event_label: title,
      });
    }
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share_facebook', {
        event_category: analyticsCategory,
        event_label: title,
      });
    }
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct web share URL for posts
    // Copy link and show instructions
    copyToClipboard();
    toast({
      title: 'Link copied!',
      description: 'Open Instagram app and paste the link in your story or bio.',
      duration: 5000,
    });
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share_instagram', {
        event_category: analyticsCategory,
        event_label: title,
      });
    }
  };

  const shareOnBluesky = () => {
    const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(blueskyUrl, '_blank', 'noopener,noreferrer');
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share_bluesky', {
        event_category: analyticsCategory,
        event_label: title,
      });
    }
  };

  // Check if native share is available
  const hasNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn('gap-2', className)}
        >
          <Share size={16} weight="bold" />
          {!iconOnly && 'Share'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {hasNativeShare && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share size={16} className="mr-2" />
            Share...
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check size={16} className="mr-2 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <LinkIcon size={16} className="mr-2" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnTwitter}>
          <TwitterLogo size={16} className="mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnLinkedIn}>
          <LinkedinLogo size={16} className="mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnFacebook}>
          <FacebookLogo size={16} className="mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnBluesky}>
          <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
          </svg>
          Share on Bluesky
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnInstagram}>
          <InstagramLogo size={16} className="mr-2" />
          Share on Instagram
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
