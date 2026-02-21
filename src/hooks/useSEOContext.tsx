// Hook to provide rich SEO descriptions as context for Ask AI components
import { useLocation } from 'react-router-dom';
import { pageSEOConfigs } from '../components/seo/SEO';

interface SEOContextResult {
  title: string;
  description: string;
  enhancedPrompt: (basePrompt: string, conceptTitle?: string) => string;
}

export function useSEOContext(): SEOContextResult {
  const location = useLocation();
  
  // Get SEO config for current path
  const getSEOConfig = () => {
    const path = location.pathname;
    
    // Try exact path first
    let config = pageSEOConfigs[path as keyof typeof pageSEOConfigs];
    
    // If no exact match, try base paths for sections
    if (!config) {
      if (path.startsWith('/patterns/')) {
        // For specific pattern pages, try to find the exact pattern config first
        config = pageSEOConfigs[path as keyof typeof pageSEOConfigs];
        if (!config) {
          config = pageSEOConfigs['/patterns'];
        }
      } else if (path.startsWith('/concepts/')) {
        // For specific concept pages, try to find the exact concept config first
        config = pageSEOConfigs[path as keyof typeof pageSEOConfigs];
        if (!config) {
          config = pageSEOConfigs['/concepts'];
        }
      } else if (path.startsWith('/ai-skills/')) {
        config = pageSEOConfigs[path as keyof typeof pageSEOConfigs];
        if (!config) {
          config = pageSEOConfigs['/ai-skills'];
        }
      } else if (path.startsWith('/azure-services/')) {
        config = pageSEOConfigs[path as keyof typeof pageSEOConfigs];
        if (!config) {
          config = pageSEOConfigs['/azure-services'];
        }
      }
    }
    
    // Fallback to homepage config
    return config || pageSEOConfigs['/'];
  };
  
  const config = getSEOConfig();
  
  // Create enhanced prompt that weaves page-level learning context into the question
  const enhancedPrompt = (basePrompt: string, conceptTitle?: string) => {
    const topic = conceptTitle ? `"${conceptTitle}"` : 'this topic';
    const pageContext = config.description
      ? `\n\n**Page the learner is on:**\n${config.description}\n`
      : '';

    return `You are a senior AI architect and educator. A learner is studying ${topic} and has asked the following:
${pageContext}
---
${basePrompt}
---

Craft your response to be:
• **Insight-first** — lead with the core insight or mental model before diving into mechanics.
• **Cloud-neutral** — draw examples from Azure, AWS, GCP, and open-source ecosystems so the learner can transfer knowledge to any stack.
• **Layered** — start accessible, then progressively reveal deeper architecture, edge cases, and production trade-offs.
• **Actionable** — include a concise code sketch, architecture diagram (Mermaid or ASCII), or decision checklist where it aids understanding.
• **Connected** — link to related concepts and patterns the learner should explore next.`;
  };
  
  return {
    title: config.title,
    description: config.description,
    enhancedPrompt
  };
}
