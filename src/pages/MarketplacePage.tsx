/**
 * MarketplacePage – Phase 7 Content Marketplace
 *
 * Browse, search, filter, and subscribe to content packages.
 */

import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listPackages,
  getPackage,
  subscribe as apiSubscribe,
  unsubscribe as apiUnsubscribe,
  createReview,
  listReviews,
  type PackageSummary,
  type PackageDetail,
  type Review,
  type ListPackagesParams,
} from '@/lib/api/marketplace';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'ai-fundamentals', label: 'AI Fundamentals' },
  { value: 'security', label: 'Security' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'custom', label: 'Custom' },
];

const SORT_OPTIONS: { value: ListPackagesParams['sort_by']; label: string }[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StarRating({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30 fill-muted-foreground/30'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function PriceBadge({ price, currency }: { price: number; currency: string }) {
  if (price === 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        Free
      </span>
    );
  }
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price / 100);
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
      {formatted}
    </span>
  );
}

function CategoryBadge({ category }: { category: string | null }) {
  if (!category) return null;
  const label = CATEGORIES.find((c) => c.value === category)?.label ?? category;
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      {label}
    </span>
  );
}

function PackageCard({
  pkg,
  onClick,
}: {
  pkg: PackageSummary;
  onClick: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(pkg.id)}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Cover image or placeholder */}
      <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-muted">
        {pkg.cover_image ? (
          <img
            src={pkg.cover_image}
            alt={pkg.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
      </div>

      {/* Title + category */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {pkg.title}
        </h3>
        <PriceBadge price={pkg.price} currency={pkg.currency} />
      </div>

      {/* Description */}
      <p className="mb-3 flex-1 text-sm text-muted-foreground line-clamp-2">
        {pkg.description || 'No description available.'}
      </p>

      {/* Footer: category, rating, installs */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <CategoryBadge category={pkg.category} />
        <div className="flex items-center gap-1">
          <StarRating rating={pkg.rating_avg} />
          <span>({pkg.rating_count})</span>
        </div>
        <span className="ml-auto flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {pkg.install_count}
        </span>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail Modal                                                       */
/* ------------------------------------------------------------------ */

function PackageDetailModal({
  packageId,
  onClose,
}: {
  packageId: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: detail, isLoading } = useQuery<PackageDetail>({
    queryKey: ['marketplace-package', packageId],
    queryFn: () => getPackage(packageId),
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ['marketplace-reviews', packageId],
    queryFn: () => listReviews(packageId),
  });

  const subscribeMut = useMutation({
    mutationFn: () => apiSubscribe(packageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace-package', packageId] });
      queryClient.invalidateQueries({ queryKey: ['marketplace-subscriptions'] });
    },
  });

  const unsubscribeMut = useMutation({
    mutationFn: () => apiUnsubscribe(packageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace-package', packageId] });
      queryClient.invalidateQueries({ queryKey: ['marketplace-subscriptions'] });
    },
  });

  const reviewMut = useMutation({
    mutationFn: () =>
      createReview(packageId, {
        rating: reviewRating,
        review_text: reviewText || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace-reviews', packageId] });
      queryClient.invalidateQueries({ queryKey: ['marketplace-package', packageId] });
      setShowReviewForm(false);
      setReviewText('');
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card border border-border shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : detail ? (
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              {detail.cover_image && (
                <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg">
                  <img src={detail.cover_image} alt={detail.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-bold text-card-foreground">{detail.title}</h2>
                <PriceBadge price={detail.price} currency={detail.currency} />
              </div>
              <p className="mt-2 text-muted-foreground">{detail.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <CategoryBadge category={detail.category} />
                <div className="flex items-center gap-1">
                  <StarRating rating={detail.rating_avg} />
                  <span>({detail.rating_count})</span>
                </div>
                <span>{detail.install_count} installs</span>
              </div>
            </div>

            {/* Subscribe / Unsubscribe */}
            <div className="mb-6 flex gap-3">
              <button
                onClick={() => subscribeMut.mutate()}
                disabled={subscribeMut.isPending}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {subscribeMut.isPending ? 'Subscribing...' : 'Subscribe'}
              </button>
              <button
                onClick={() => unsubscribeMut.mutate()}
                disabled={unsubscribeMut.isPending}
                className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-card-foreground hover:bg-muted disabled:opacity-50 transition-colors"
              >
                {unsubscribeMut.isPending ? 'Removing...' : 'Unsubscribe'}
              </button>
            </div>

            {subscribeMut.isError && (
              <p className="mb-4 text-sm text-red-500">
                {(subscribeMut.error as Error)?.message || 'Subscription failed'}
              </p>
            )}

            {/* Content items */}
            {detail.items.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-card-foreground">Included Content</h3>
                <ul className="divide-y divide-border rounded-lg border border-border">
                  {detail.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground uppercase">
                        {item.type.slice(0, 2)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-card-foreground">{item.title}</p>
                        {item.description && (
                          <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">Reviews</h3>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {showReviewForm ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {showReviewForm && (
                <div className="mb-4 rounded-lg border border-border p-4">
                  <label className="mb-2 block text-sm font-medium text-card-foreground">Rating</label>
                  <div className="mb-3 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="focus-visible:outline-none"
                        aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                      >
                        <svg
                          className={`h-6 w-6 ${star <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30 fill-muted-foreground/30'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <label className="mb-1 block text-sm font-medium text-card-foreground">Comment (optional)</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="mb-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Share your thoughts on this package..."
                  />
                  <button
                    onClick={() => reviewMut.mutate()}
                    disabled={reviewMut.isPending}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    {reviewMut.isPending ? 'Submitting...' : 'Submit Review'}
                  </button>
                  {reviewMut.isError && (
                    <p className="mt-2 text-sm text-red-500">
                      {(reviewMut.error as Error)?.message || 'Failed to submit review'}
                    </p>
                  )}
                </div>
              )}

              {reviews && reviews.length > 0 ? (
                <ul className="space-y-3">
                  {reviews.map((r) => (
                    <li key={r.id} className="rounded-lg border border-border p-4">
                      <div className="mb-1 flex items-center gap-2">
                        <StarRating rating={r.rating} />
                        <span className="text-xs text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {r.review_text && (
                        <p className="text-sm text-card-foreground">{r.review_text}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState<ListPackagesParams['sort_by']>('popular');
  const [page, setPage] = useState(1);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  // Simple debounce
  const debounceRef = React.useRef<ReturnType<typeof setTimeout>>();
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 300);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['marketplace-packages', { search: debouncedSearch, category, sortBy, page }],
    queryFn: () =>
      listPackages({
        search: debouncedSearch || undefined,
        category: category || undefined,
        sort_by: sortBy,
        page,
        per_page: 20,
      }),
  });

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Content Marketplace</h1>
        <p className="mt-2 text-muted-foreground">
          Discover and subscribe to expert-curated content packages to accelerate your learning.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search packages..."
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as ListPackagesParams['sort_by']);
            setPage(1);
          }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setCategory(cat.value);
              setPage(1);
            }}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              category === cat.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center">
          <p className="text-destructive">Failed to load packages. Please try again later.</p>
        </div>
      ) : data && data.items.length > 0 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.items.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onClick={setSelectedPackageId} />
            ))}
          </div>

          {/* Pagination */}
          {data.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              <span className="mx-2 text-sm text-muted-foreground">
                Page {data.page} of {data.pages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                disabled={page >= data.pages}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 h-12 w-12 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="font-medium text-muted-foreground">No packages found</p>
          <p className="text-sm text-muted-foreground/70">
            {debouncedSearch ? 'Try a different search term.' : 'Check back soon for new content!'}
          </p>
        </div>
      )}

      {/* Detail modal */}
      {selectedPackageId && (
        <PackageDetailModal
          packageId={selectedPackageId}
          onClose={() => setSelectedPackageId(null)}
        />
      )}
    </div>
  );
}
