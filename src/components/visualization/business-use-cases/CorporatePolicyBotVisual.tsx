import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User, Lightbulb, CheckCircle, FileMagnifyingGlass } from '@phosphor-icons/react';

export const CorporatePolicyBotVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Corporate Policy Assistant</p>
            <p className="text-xs text-muted-foreground">Intelligent HR & Compliance Queries</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: User Question */}
          <div className="flex items-center space-x-2">
            <User size={28} className="text-blue-500" />
            <p className="text-sm font-medium">"How many PTO days do I get after 3 years?"</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: Agentic RAG Process */}
          <div className="w-full p-3 border rounded-lg bg-background/70">
            <p className="text-xs font-bold text-center mb-2">Agentic RAG Cycle</p>
            <div className="flex justify-around items-center">
                <div className="text-center">
                    <p className="text-xs font-semibold">🤔 Reflect & Plan</p>
                    <p className="text-xs">"Query needs PTO policy for 3-year tenure."</p>
                </div>
                <div className="text-xl">→</div>
                <div className="text-center">
                    <p className="text-xs font-semibold">🔍 Search</p>
                    <div className="flex space-x-2">
                        <FileMagnifyingGlass size={20} className="text-green-500" />
                    </div>
                    <p className="text-xs">Search("PTO policy seniority")</p>
                </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Synthesized Answer */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <CheckCircle size={32} className="text-green-600" />
            <div>
                <p className="text-sm font-semibold">Verified Answer</p>
                <p className="text-xs">"After 3 years, you are entitled to 20 days of PTO per the 2024 HR Policy, page 12."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
