import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'course';
  author?: string;
}

const DEFAULT_SEO = {
  title: 'Open Agent School - Where AI Agent Concepts Come to Life',
  description: 'Interactive educational platform for mastering AI agents, MCP, A2A communication, and multi-agent systems through hands-on learning and visualizations.',
  keywords: 'AI agents, artificial intelligence education, MCP, Model Context Protocol, A2A communication, multi-agent systems, agent architecture, interactive learning, AI tutorials, agent security, OpenAI, Microsoft Azure AI, LLM agents, agentic AI, agent orchestration',
  image: 'https://www.openagentschool.org/images/og-image.png',
  type: 'website' as const,
  author: 'Open Agent School'
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  author
}) => {
  const location = useLocation();
  const currentUrl = `https://www.openagentschool.org${location.pathname}`;
  
  const seoTitle = title || DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  const seoKeywords = keywords || DEFAULT_SEO.keywords;
  const seoImage = image || DEFAULT_SEO.image;
  const seoAuthor = author || DEFAULT_SEO.author;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    updateMetaTag('author', seoAuthor);
    
    // Update Open Graph tags
    updateMetaProperty('og:title', seoTitle);
    updateMetaProperty('og:description', seoDescription);
    updateMetaProperty('og:image', seoImage);
    updateMetaProperty('og:url', currentUrl);
    updateMetaProperty('og:type', type);
    
    // Update Twitter tags
    updateMetaProperty('twitter:title', seoTitle);
    updateMetaProperty('twitter:description', seoDescription);
    updateMetaProperty('twitter:image', seoImage);
    updateMetaProperty('twitter:url', currentUrl);
    
    // Update canonical link
    updateCanonicalLink(currentUrl);
    
  }, [seoTitle, seoDescription, seoKeywords, seoImage, seoAuthor, currentUrl, type]);

  return null;
};

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateCanonicalLink(url: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

// Page-specific SEO configurations
export const pageSEOConfigs = {
  '/': {
    title: 'Open Agent School - Where AI Agent Concepts Come to Life',
    description: 'Interactive educational platform for mastering AI agents, MCP, A2A communication, and multi-agent systems through hands-on learning and visualizations.',
    keywords: 'AI agents, artificial intelligence education, MCP, Model Context Protocol, A2A communication, multi-agent systems, agent architecture, interactive learning'
  },
  '/concepts': {
    title: 'Core Concepts - AI Agent Fundamentals | Open Agent School',
    description: 'Master fundamental AI agent concepts including architecture, security, multi-agent systems, and communication protocols through interactive visualizations.',
    keywords: 'AI agent concepts, agent architecture, multi-agent systems, agent security, AI fundamentals, interactive learning'
  },
  '/concepts/agent-architecture': {
    title: 'AI Agent Architecture - Core Concepts | Open Agent School',
    description: 'Learn AI agent architecture fundamentals including components, design patterns, and implementation strategies through interactive tutorials.',
    keywords: 'AI agent architecture, agent design patterns, agent components, AI system design, agent development'
  },
  '/concepts/multi-agent-systems': {
    title: 'Multi-Agent Systems - Advanced Concepts | Open Agent School',
    description: 'Explore multi-agent systems, coordination protocols, distributed AI, and agent collaboration patterns through hands-on learning.',
    keywords: 'multi-agent systems, agent coordination, distributed AI, agent collaboration, MAS protocols'
  },
  '/concepts/mcp': {
    title: 'Model Context Protocol (MCP) - Integration Guide | Open Agent School',
    description: 'Master Model Context Protocol implementation for secure tool integration with AI agents through interactive demonstrations.',
    keywords: 'Model Context Protocol, MCP, AI tool integration, agent tools, secure AI integration'
  },
  '/study-mode': {
    title: 'Study Mode - Interactive AI Agent Learning | Open Agent School',
    description: 'Discover AI agent concepts through Socratic questioning, interactive scenarios, and personalized learning paths.',
    keywords: 'AI learning, interactive study, Socratic method, personalized learning, AI education'
  },
  '/patterns': {
    title: 'AI Agent Patterns - Design Templates | Open Agent School',
    description: 'Explore proven AI agent design patterns, architectural templates, and implementation examples for building robust agent systems.',
    keywords: 'AI agent patterns, design patterns, agent templates, architectural patterns, agent development'
  },
  '/ai-skills': {
    title: 'AI Skills Explorer - Practical Applications | Open Agent School',
    description: 'Develop practical AI agent skills through hands-on exercises, real-world scenarios, and skill assessment tools.',
    keywords: 'AI skills, practical AI, agent development skills, AI applications, hands-on learning'
  },
  '/playbook': {
    title: 'Code Playbook - AI Agent Implementation | Open Agent School',
    description: 'Access comprehensive code examples, implementation guides, and best practices for building AI agent systems.',
    keywords: 'AI agent code, implementation guide, coding examples, agent development, programming tutorials'
  }
};
