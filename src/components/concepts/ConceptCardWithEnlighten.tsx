import React from 'react';
import { EnlightenCard } from '@/components/ui/enlighten-card';
import { Button } from '@/components/ui/button';
import { EnlightenMeButton } from '@/components/ui/enlighten-me-button';

interface ConceptCardWithEnlightenProps {
  title: string;
  description?: string;
  customPrompt?: string;
  children: React.ReactNode;
  onLearnMore?: () => void;
  buttonText?: string;
  showDetailsButton?: boolean;
  className?: string;
  footerContent?: React.ReactNode;
  // Show an inline Ask AI button inside this card (disabled by default to avoid duplicates)
  showAskAI?: boolean;
}

const ConceptCardWithEnlighten: React.FC<ConceptCardWithEnlightenProps> = ({
  title,
  description,
  customPrompt,
  children,
  onLearnMore,
  buttonText = 'Learn More',
  showDetailsButton = true,
  className,
  footerContent,
  showAskAI = false,
}) => {
  return (
    <EnlightenCard 
      title={title}
      description={description}
      enlightenPrompt={customPrompt}
      className={className}
      renderFooter={
        showDetailsButton || footerContent
          ? () => (
              <div className="flex justify-between w-full items-center">
                {showDetailsButton && (
                  <Button 
                    variant="outline" 
                    onClick={onLearnMore}
                  >
                    {buttonText}
                  </Button>
                )}
                {footerContent}
              </div>
            )
          : undefined
      }
    >
      {children}
      {showAskAI && (
        <EnlightenMeButton
          title={title}
          contextDescription={description}
          className={className}
        />
      )}
    </EnlightenCard>
  );
};

export default ConceptCardWithEnlighten;











