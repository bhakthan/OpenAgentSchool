import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Code, TestTube, CheckCircle, FileCode } from '@phosphor-icons/react';

export const TestGenerationVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Automated Unit Test Generation</p>
            <p className="text-xs text-muted-foreground">CodeAct Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: Input Code */}
          <div className="flex items-center space-x-2">
            <FileCode size={28} className="text-blue-500" />
            <p className="text-sm font-medium">"Here is my new Python function: `calculate_tax()`"</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: CodeAct Agent */}
          <div className="w-full p-3 border rounded-lg bg-background/70 text-center">
            <p className="text-xs font-bold mb-2">CodeAct Agent</p>
            <div className="flex justify-around items-center">
                <div className="text-center">
                    <p className="text-xs font-semibold">1. Read & Understand</p>
                    <p className="text-xs">Analyzes `calculate_tax.py`</p>
                </div>
                <div className="text-xl">→</div>
                <div className="text-center">
                    <p className="text-xs font-semibold">2. Write Test Code</p>
                    <Code size={20} className="text-green-500 mx-auto" />
                </div>
                 <div className="text-xl">→</div>
                <div className="text-center">
                    <p className="text-xs font-semibold">3. Execute & Verify</p>
                    <TestTube size={20} className="text-purple-500 mx-auto" />
                </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Generated Test File */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <CheckCircle size={32} className="text-green-600" />
            <div>
                <p className="text-sm font-semibold">Generated `test_calculate_tax.py`</p>
                <p className="text-xs">"Test file created with 5 passing test cases for edge conditions."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
