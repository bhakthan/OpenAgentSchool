import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Code, CheckCircle, FileCode, Terminal } from '@phosphor-icons/react';

export const CodeActVisualizer = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Automated Task Solving</p>
            <p className="text-xs text-muted-foreground">CodeAct Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: Input Task */}
          <div className="flex items-center space-x-2">
            <FileCode size={28} className="text-blue-500" />
            <p className="text-sm font-medium">"Calculate the 15th Fibonacci number."</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: CodeAct Agent */}
          <div className="w-full p-3 border rounded-lg bg-background/70 text-center">
            <p className="text-xs font-bold mb-2">CodeAct Agent</p>
            <div className="flex justify-around items-center">
                <div className="text-center">
                    <p className="text-xs font-semibold">1. Think & Write Code</p>
                    <Code size={20} className="text-green-500 mx-auto" />
                </div>
                 <div className="text-xl">→</div>
                <div className="text-center">
                    <p className="text-xs font-semibold">2. Execute in Sandbox</p>
                    <Terminal size={20} className="text-purple-500 mx-auto" />
                </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Output */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <CheckCircle size={32} className="text-green-600" />
            <div>
                <p className="text-sm font-semibold">Execution Result</p>
                <p className="text-xs">"The 15th Fibonacci number is 610."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
