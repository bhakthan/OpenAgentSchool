import { useEffect, useState } from 'react';
import { useAudioNarration } from '@/contexts/AudioNarrationContext';

// Centralized hook to retrieve and track available SpeechSynthesis voices
export function useAvailableVoices() {
  const { getAvailableVoices } = useAudioNarration();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const load = () => {
      try {
        const v = getAvailableVoices();
        setVoices(v || []);
      } catch {
        setVoices([]);
      }
    };
    load();

    if ('speechSynthesis' in window) {
      const handler = () => load();
      speechSynthesis.addEventListener('voiceschanged', handler);
      return () => speechSynthesis.removeEventListener('voiceschanged', handler);
    }
  }, [getAvailableVoices]);

  return voices;
}
