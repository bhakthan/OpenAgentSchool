import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChatCircle, User, CheckCircle, Scales } from '@phosphor-icons/react';

export const LLMAsJudgeVisual = () => {
  return (
    <Card className="bg-muted/30">
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <p className="font-semibold">1. Agent Responds to Prompt</p>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-background">
              <User size={24} className="text-blue-500" />
              <p className="text-sm">"Summarize this article."</p>
              <ChatCircle size={24} className="text-purple-500" />
              <p className="text-sm">"The article is about..."</p>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          <div className="text-center">
            <p className="font-semibold">2. Judge LLM Receives Data</p>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-background">
               <Scales size={32} className="text-red-500" />
               <div className="text-sm">
                 <p><strong>Prompt:</strong> "Summarize..."</p>
                 <p><strong>Response:</strong> "The article is..."</p>
                 <p><strong>Rubric:</strong> "Is it accurate? Fluent?"</p>
               </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          <div className="text-center">
            <p className="font-semibold">3. Judge LLM Provides Score & Reasoning</p>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-background">
              <CheckCircle size={24} className="text-green-500" />
              <p className="text-sm">"Score: 9/10. Accurate and fluent."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
