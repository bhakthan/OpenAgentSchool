import { useState } from 'react';
import { useEnlightenMe } from './EnlightenMeProvider';
import { callLlm, LlmProvider } from '@/lib/llm';
import { formatLlmErrorMessage } from '@/lib/llmErrors';

interface UseEnlightenButtonProps {
  conceptId: string;
  defaultPrompt?: string;
}

interface UseEnlightenButtonResult {
  isOpen: boolean;
  isLoading: boolean;
  prompt: string;
  response: string | null;
  showResponse: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  submitPrompt: (provider: LlmProvider) => Promise<void>;
  setPrompt: (value: string) => void;
  resetPrompt: () => void;
}

export const useEnlightenButton = ({
  conceptId,
  defaultPrompt,
}: UseEnlightenButtonProps): UseEnlightenButtonResult => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  
  const { getInsight, saveInsight } = useEnlightenMe();
  
  // Generate a default prompt based on the conceptId
  const generateDefaultPrompt = () => {
    if (defaultPrompt) {
      return defaultPrompt;
    }
    
    return `You are a senior AI architect mentoring a practitioner. Teach the concept "${conceptId}" the way a great technical book would.

Start with the *why* — what problem does this solve and what is the key insight? Then build up the *how* — architecture, moving parts, data flow, and a concise code sketch if it helps. Finish with the *so what* — when to use it, when not to, common anti-patterns, and how it connects to adjacent concepts.

Keep the explanation cloud-neutral (Azure, AWS, GCP, open-source) so the learner can map it to any stack. Be opinionated where it helps — share rules of thumb and the questions an experienced engineer would ask before adopting this in production.`;
  };
  
  const openDialog = () => {
    // Set the default prompt when opening
    setPrompt(generateDefaultPrompt());
    
    // Check if we have a saved response
    const savedInsight = getInsight(conceptId);
    if (savedInsight) {
      setResponse(savedInsight);
      setShowResponse(true);
    } else {
      setShowResponse(false);
    }
    
    setIsOpen(true);
  };
  
  const closeDialog = () => {
    setIsOpen(false);
  };
  
  const resetPrompt = () => {
    setPrompt(generateDefaultPrompt());
  };
  
  const submitPrompt = async (provider: LlmProvider) => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await callLlm(prompt, provider);
      
      setResponse(result.content);
      setShowResponse(true);
      
      // Save this response for future reference
      saveInsight(conceptId, result.content);
    } catch (error) {
      setResponse(formatLlmErrorMessage(error, 'Ask AI'));
      setShowResponse(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isOpen,
    isLoading,
    prompt,
    response,
    showResponse,
    openDialog,
    closeDialog,
    submitPrompt,
    setPrompt,
    resetPrompt,
  };
};