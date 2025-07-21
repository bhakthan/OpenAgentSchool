import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Gavel, MagnifyingGlass, FileText, CheckSquare } from '@phosphor-icons/react';

export const LegalResearchVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">AI Legal Research Assistant</p>
            <p className="text-xs text-muted-foreground">Deep Researcher Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: Initial Query */}
          <div className="flex items-center space-x-2">
            <Gavel size={28} className="text-blue-500" />
            <p className="text-sm font-medium">"Find precedents for autonomous vehicle liability."</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: Deep Research Loop */}
          <div className="w-full p-3 border rounded-lg bg-background/70 text-center">
            <p className="text-xs font-bold mb-2">Deep Research Cycle</p>
            <div className="flex justify-around items-center">
                <div className="text-center">
                    <p className="text-xs font-semibold">1. Generate Questions</p>
                    <p className="text-xs">"What defines liability?"</p>
                </div>
                <div className="text-xl">→</div>
                <div className="text-center">
                    <p className="text-xs font-semibold">2. Search Sources</p>
                    <MagnifyingGlass size={20} className="text-green-500 mx-auto" />
                </div>
                 <div className="text-xl">→</div>
                <div className="text-center">
                    <p className="text-xs font-semibold">3. Synthesize</p>
                    <FileText size={20} className="text-purple-500 mx-auto" />
                </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Final Report */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <CheckSquare size={32} className="text-green-600" />
            <div>
                <p className="text-sm font-semibold">Comprehensive Research Memo</p>
                <p className="text-xs">"Memo citing 15 relevant cases and 3 legal articles on AI liability."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
