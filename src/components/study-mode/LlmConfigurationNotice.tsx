import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkle } from "@phosphor-icons/react";
import { isLlmProviderConfigured } from '@/lib/config';
import { Link } from 'react-router-dom';

interface LlmConfigurationNoticeProps {
  className?: string;
  mode?: 'socratic' | 'debug' | 'scenario';
}

const LlmConfigurationNotice: React.FC<LlmConfigurationNoticeProps> = ({ 
  className = "", 
  mode = 'socratic' 
}) => {
  // Don't show if LLM is configured
  if (isLlmProviderConfigured()) {
    return null;
  }

  const modeMessages = {
    socratic: {
      title: "Enhanced Socratic Learning Available",
      description: "Configure an LLM provider to unlock AI-powered learning assessment that provides personalized feedback on your discovery journey and critical thinking development."
    },
    debug: {
      title: "AI-Powered Debug Assessment Available", 
      description: "Configure an LLM provider to get detailed feedback on your debugging methodology, with personalized suggestions for each phase of your problem-solving approach."
    },
    scenario: {
      title: "Intelligent Scenario Assessment Available",
      description: "Configure an LLM provider to receive personalized feedback on each challenge step and comprehensive learning analytics for your scenario completion."
    }
  };

  const message = modeMessages[mode];

  return (
    <Alert className={`border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 ${className}`}>
      <div className="flex items-start gap-3">
        <Sparkle size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <h4 className="font-semibold text-amber-800 dark:text-amber-200">{message.title}</h4>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            {message.description}
          </AlertDescription>
          <div className="text-xs text-amber-600 dark:text-amber-400">
            <strong>Tip:</strong> Open{' '}
            <Link to="/settings" className="underline hover:text-amber-800 dark:hover:text-amber-200">
              Settings
            </Link>{' '}
            (⚙ gear icon in the header) to add your own API key and unlock "LLM as Judge" features!
            Your keys stay in your browser — never sent to our servers.
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default LlmConfigurationNotice;
