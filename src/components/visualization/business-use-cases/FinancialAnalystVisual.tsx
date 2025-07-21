import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChartLine, ChartBar } from "@phosphor-icons/react";
import { User } from '@phosphor-icons/react/dist/ssr/User';
import { FileText } from '@phosphor-icons/react/dist/ssr/FileText';
import { Database } from '@phosphor-icons/react/dist/ssr/Database';

export const FinancialAnalystVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Financial Analyst Assistant</p>
            <p className="text-xs text-muted-foreground">Automating Quarterly Earnings Analysis</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: User Input */}
          <div className="flex items-center space-x-2">
            <User size={28} className="text-blue-500" />
            <p className="text-sm font-medium">"Analyze the latest earnings report for $XYZ Corp."</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: ReAct Loop */}
          <div className="w-full p-3 border rounded-lg bg-background/70">
            <p className="text-xs font-bold text-center mb-2">ReAct Cycle</p>
            <div className="flex justify-around items-center">
                {/* Thought */}
                <div className="text-center">
                    <p className="text-xs font-semibold">🤔 Thought</p>
                    <p className="text-xs">"I need the report and stock data."</p>
                </div>
                <div className="text-xl">→</div>
                {/* Action */}
                <div className="text-center">
                    <p className="text-xs font-semibold">🛠️ Action</p>
                    <div className="flex space-x-2">
                        <FileText size={20} className="text-green-500" />
                        <Database size={20} className="text-yellow-500" />
                    </div>
                    <p className="text-xs">GetReport(), GetStock()</p>
                </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Synthesized Output */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <div className="flex-shrink-0">
              <ChartLine size={32} className="text-green-600" />
              <ChartBar size={32} className="text-green-600" />
            </div>
            <div>
                <p className="text-sm font-semibold">Synthesized Report</p>
                <p className="text-xs">"$XYZ revenue is up 15% YoY, beating estimates. Stock reacted positively."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
