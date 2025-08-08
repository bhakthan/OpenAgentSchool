import { markNodeComplete } from '@/lib/utils/markComplete';
import { Button } from '@/components/ui/button';
import ConceptLayout from './ConceptLayout';

export default function MCPA2AIntegrationConcept({ onMarkComplete, onNavigateToNext }) {
  const handleMarkComplete = () => {
    markNodeComplete('mcp-a2a-integration');
    if (onMarkComplete) onMarkComplete();
  };

  return (
    <ConceptLayout
      conceptId="mcp-a2a-integration"
      // ...existing props...
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  );
}


