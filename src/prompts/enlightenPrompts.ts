// Centralized prompt builder for the Enlighten (Ask AI) feature

export interface SEOContextLike {
  title?: string;
  description?: string;
}

export interface BuildEnlightenPromptInput {
  topic?: string;
  title?: string;
  basePrompt?: string; // user-entered or default prompt seed
  seo?: SEOContextLike; // optional SEO context for richer guidance
}

/**
 * Build a consistent Enlighten prompt, optionally enriched with SEO page context.
 * Keeps output structure stable while allowing future tweaks in a single place.
 */
export function buildEnlightenPrompt({
  topic,
  title,
  basePrompt,
  seo,
}: BuildEnlightenPromptInput): string {
  const conceptTitle = title || topic;
  const userSeed = basePrompt || `Explain ${conceptTitle ?? 'this topic'} in detail.`;

  const hasSEO = Boolean(seo?.description);
  const contextSection = hasSEO
    ? `
**Page Context & Learning Objectives:**
${seo!.description}

**Your Original Question:**
${userSeed}`
    : userSeed;

  return `I want to learn about ${conceptTitle ? `"${conceptTitle}"` : 'this topic'} in the context of AI agents, Azure AI services, and modern AI-native practices.
${contextSection}

Please provide a comprehensive explanation that covers:
1. What it is and why it's important in modern AI agent development
2. How it works and its key components
3. Real-world applications and use cases
4. Best practices for implementation
5. How it relates to other AI agent concepts and patterns

Please make your response educational, practical, and actionable for someone learning about AI agents and Azure AI services.`;
}

// Optional: future variants (e.g., concise, code-focused) can be added here
// export function buildConciseEnlightenPrompt(...) {}
