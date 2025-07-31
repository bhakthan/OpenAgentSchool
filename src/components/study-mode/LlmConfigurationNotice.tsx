import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Sparkle } from "@phosphor-icons/react";
import { isLlmProviderConfigured } from '@/lib/config';

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
    <Alert className={`border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-1">
          <Sparkle size={16} className="text-amber-600 dark:text-amber-400" />
          <Lightbulb size={16} className="text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">{message.title}</h4>
          <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm">
            {message.description}
          </AlertDescription>
          <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            <strong>Tip:</strong> Add your API key to environment variables to enable "LLM as Judge" features for enhanced learning!
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default LlmConfigurationNotice;
