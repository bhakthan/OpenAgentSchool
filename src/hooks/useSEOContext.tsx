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
  
  // Create enhanced prompt that includes SEO context
  const enhancedPrompt = (basePrompt: string, conceptTitle?: string) => {
    const contextSection = config.description ? `
    
**Page Context & Learning Objectives:**
${config.description}

**Your Original Question:**
${basePrompt}` : basePrompt;

    return `I want to learn about ${conceptTitle ? `"${conceptTitle}"` : 'this topic'} in the context of AI agents, Azure AI services, and modern AI-native practices.
${contextSection}

Please provide a comprehensive explanation that covers:
1. What it is and why it's important in modern AI agent development
2. How it works and its key components
3. Real-world applications and use cases
4. Best practices for implementation
5. How it relates to other AI agent concepts and patterns

Please make your response educational, practical, and actionable for someone learning about AI agents and Azure AI services.`;
  };
  
  return {
    title: config.title,
    description: config.description,
    enhancedPrompt
  };
}
