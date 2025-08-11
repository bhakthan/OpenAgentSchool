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
      title="MCP to A2A Integration"
      description="Learn how to integrate Model Context Protocol with Agent-to-Agent communication patterns"
      tabs={[
        {
          id: 'overview',
          title: 'Overview',
          description: 'Introduction to MCP to A2A Integration',
          icon: <div>📋</div>,
          level: 'fundamentals' as const,
          content: <div>MCP to A2A Integration content coming soon...</div>
        }
      ]}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  );
}


