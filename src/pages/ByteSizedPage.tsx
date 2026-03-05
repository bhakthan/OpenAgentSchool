import React, { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics/ga';
import {
  ALL_BYTE_CARDS,
  getByteCardsByConceptId,
} from '@/lib/data/byteSized';
import { ByteSizedHero } from '@/components/byte-sized/ByteSizedHero';
import { CategoryBrowser } from '@/components/byte-sized/CategoryBrowser';
import { ByteCardStack } from '@/components/byte-sized/ByteCardStack';
import { ContentLanguageSelector } from '@/components/ui/ContentLanguageSelector';
import { useContentLanguage } from '@/lib/hooks/useContentLanguage';

type View = 'landing' | 'browse' | 'stack';

export default function ByteSizedPage() {
  const { categoryId, conceptId } = useParams<{ categoryId?: string; conceptId?: string }>();
  const navigate = useNavigate();

  // Content language preference for translation
  const { language, setLanguage, isLlmAvailable } = useContentLanguage();

  // Derive initial view from URL params
  const initialView: View = conceptId ? 'stack' : categoryId ? 'browse' : 'landing';
  const [view, setView] = useState<View>(initialView);
  const [activeCategoryId, setActiveCategoryId] = useState(categoryId || '');
  const [activeConceptId, setActiveConceptId] = useState(conceptId || '');

  // Cards for the active concept
  const conceptCards = useMemo(
    () => (activeConceptId ? getByteCardsByConceptId(activeConceptId) : []),
    [activeConceptId],
  );

  const conceptTitle = activeConceptId
    ? activeConceptId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : '';

  // ─── Navigation Handlers ────────────────────────────────────

  const goLanding = useCallback(() => {
    setView('landing');
    setActiveCategoryId('');
    setActiveConceptId('');
    navigate('/byte-sized', { replace: true });
  }, [navigate]);

  const goBrowse = useCallback(() => {
    setView('browse');
    setActiveCategoryId('');
    setActiveConceptId('');
    navigate('/byte-sized', { replace: true });
  }, [navigate]);

  const selectCategory = useCallback(
    (catId: string) => {
      if (!catId) {
        setActiveCategoryId('');
        navigate('/byte-sized', { replace: true });
        return;
      }
      setActiveCategoryId(catId);
      navigate(`/byte-sized/${catId}`, { replace: true });
      trackEvent({ action: 'byte_category_view', category: 'byte_sized', label: catId });
    },
    [navigate],
  );

  const selectConcept = useCallback(
    (cId: string) => {
      setActiveConceptId(cId);
      setView('stack');
      const catPath = activeCategoryId ? `${activeCategoryId}/` : '';
      navigate(`/byte-sized/${catPath}${cId}`, { replace: true });
      trackEvent({ action: 'byte_card_view', category: 'byte_sized', label: cId });
    },
    [navigate, activeCategoryId],
  );

  const handleRandom = useCallback(() => {
    const card = ALL_BYTE_CARDS[Math.floor(Math.random() * ALL_BYTE_CARDS.length)];
    trackEvent({ action: 'byte_random_card', category: 'byte_sized', label: card.conceptId });
    selectConcept(card.conceptId);
  }, [selectConcept]);

  const handleBackFromStack = useCallback(() => {
    setActiveConceptId('');
    if (activeCategoryId) {
      setView('browse');
      navigate(`/byte-sized/${activeCategoryId}`, { replace: true });
    } else {
      setView('browse');
      navigate('/byte-sized', { replace: true });
    }
  }, [activeCategoryId, navigate]);

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Content language selector */}
      <div className="flex justify-end">
        <ContentLanguageSelector
          language={language}
          onChange={setLanguage}
          isLlmAvailable={isLlmAvailable}
        />
      </div>

      {/* Landing */}
      {view === 'landing' && (
        <ByteSizedHero onBrowse={goBrowse} onRandom={handleRandom} />
      )}

      {/* Category Browser */}
      {(view === 'landing' || view === 'browse') && (
        <>
          {view === 'landing' && (
            <h2 className="text-xl font-bold text-foreground">Categories</h2>
          )}
          <CategoryBrowser
            onSelectConcept={selectConcept}
            onSelectCategory={selectCategory}
            activeCategoryId={activeCategoryId || undefined}
          />
        </>
      )}

      {/* Card Stack */}
      {view === 'stack' && conceptCards.length > 0 && (
        <ByteCardStack
          cards={conceptCards}
          conceptTitle={conceptTitle}
          onBack={handleBackFromStack}
          contentLanguage={language}
        />
      )}

      {view === 'stack' && conceptCards.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No cards found for this concept.</p>
          <button
            onClick={goBrowse}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Browse categories →
          </button>
        </div>
      )}
    </div>
  );
}
