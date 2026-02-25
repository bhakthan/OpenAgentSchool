import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MagnifyingGlass, ArrowSquareOut, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

// Google Programmable Search Engine ID (optional – reserved for future embedded CSE)
const _GOOGLE_CSE_ID = import.meta.env.VITE_GOOGLE_CSE_ID as string | undefined; // eslint-disable-line @typescript-eslint/no-unused-vars

// The site to restrict search results to
const SEARCH_SITE = 'openagentschool.org';

/* ────────────────────────────────────────────────────────
 * SiteSearch Component
 * ──────────────────────────────────────────────────────── */

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SiteSearch: React.FC<SiteSearchProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dialog opens; reset when closed
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    } else {
      setQuery('');
    }
  }, [open]);

  const openGoogleTab = useCallback(
    (q: string) => {
      if (!q.trim()) return;
      const searchUrl = `https://www.google.com/search?q=site%3A${SEARCH_SITE}+${encodeURIComponent(q.trim())}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    },
    [],
  );

  const executeSearch = useCallback(() => {
    const q = query.trim();
    if (!q) return;

    // Always open in a new Google tab for now
    openGoogleTab(q);
  }, [query, openGoogleTab]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeSearch();
      }
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    },
    [executeSearch, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={cn(
            'sm:max-w-[720px] p-0 gap-0 overflow-hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
        >
          {/* ── Search input bar ── */}
          <div className="flex items-center border-b px-3">
            <MagnifyingGlass size={20} className="shrink-0 text-muted-foreground" aria-hidden />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search openagentschool.org…"
              className="h-12 border-0 shadow-none focus-visible:ring-0 text-base placeholder:text-muted-foreground/60"
              aria-label="Search within Open Agent School"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={executeSearch}
              disabled={!query.trim()}
              className="shrink-0 ml-1 h-8 px-3 text-xs"
            >
              Search
            </Button>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2 shrink-0">
              ESC
            </kbd>
          </div>

          {/* ── Results area ── */}
          <div className="min-h-[240px] max-h-[65vh] overflow-y-auto">
              <div className="p-6 text-center space-y-4 flex-1 flex flex-col items-center justify-center">
                {query.trim() ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Press{' '}
                      <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-xs">Enter</kbd>{' '}
                      or click below to search Google for:
                    </p>
                    <p className="font-medium text-lg">
                      <span className="text-muted-foreground">site:{SEARCH_SITE}</span>{' '}
                      <span className="text-foreground">{query}</span>
                    </p>
                    <Button onClick={() => openGoogleTab(query)} className="gap-2">
                      <MagnifyingGlass size={16} />
                      Search on Google
                      <ArrowSquareOut size={14} className="text-muted-foreground" />
                    </Button>
                  </>
                ) : (
                  <EmptyState />
                )}
              </div>
          </div>

          {/* ── Footer ── */}
          <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <GoogleLogo />
              Powered by Google Search
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">
                {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}
              </kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">K</kbd>
              <span>to toggle</span>
            </span>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

/* ── Small helper components ── */

function EmptyState() {
  return (
    <div className="py-12 space-y-3 text-center flex-1 flex flex-col items-center justify-center">
      <MagnifyingGlass size={40} className="mx-auto text-muted-foreground/40" />
      <p className="text-sm text-muted-foreground">
        Search across all Open Agent School content
      </p>
      <p className="text-xs text-muted-foreground/60">
        Powered by Google &middot; Results scoped to {SEARCH_SITE}
      </p>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/**
 * Hook to manage SiteSearch open state with Ctrl+K keyboard shortcut
 */
export function useSiteSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to toggle search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { open, setOpen };
}

export default SiteSearch;
