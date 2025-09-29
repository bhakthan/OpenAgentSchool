import { PatternData } from '@/lib/data/patterns/types';

const extractFirstSentence = (text?: string): string | null => {
  if (!text) return null;
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return null;

  const sentenceMatch = normalized.match(/[^\.\?\!]+[\.\?\!]?/);
  return sentenceMatch ? sentenceMatch[0].trim() : normalized;
};

export const getPatternFlowPrompt = (pattern: PatternData): string => {
  if (!pattern) {
    return 'Walk me through this agent flow.';
  }

  const businessSentence = extractFirstSentence(pattern.businessUseCase?.description);
  const industry = pattern.businessUseCase?.industry?.trim();
  const firstUseCase = pattern.useCases?.find(Boolean)?.trim();
  const patternName = pattern.name.trim();

  if (businessSentence && industry) {
    return `Show how ${patternName} runs in ${industry}: ${businessSentence}`;
  }

  if (businessSentence) {
    return `Show how ${patternName} operates: ${businessSentence}`;
  }

  const softenUseCase = (value: string) => {
    if (!value) return value;
    const trimmedValue = value.trim();
    if (!trimmedValue) return trimmedValue;
    return trimmedValue.charAt(0).toLowerCase() + trimmedValue.slice(1);
  };

  if (industry && firstUseCase) {
    return `Walk me through ${patternName} supporting ${industry} teams for ${softenUseCase(firstUseCase)}.`;
  }

  if (firstUseCase) {
    return `How does ${patternName} handle ${softenUseCase(firstUseCase)}?`;
  }

  return `Walk me through the ${patternName} agent flow.`;
};
