import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Robot, MagnifyingGlass, CheckCircle, User } from '@phosphor-icons/react';

export const InsuranceClaimVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Automated Insurance Claim Processing</p>
            <p className="text-xs text-muted-foreground">Orchestrator-Worker Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: Claim Submitted */}
          <div className="flex items-center space-x-2">
            <FileText size={28} className="text-blue-500" />
            <p className="text-sm font-medium">"New auto damage claim submitted."</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: Orchestrator delegates */}
          <div className="w-full p-3 border rounded-lg bg-background/70 text-center">
            <p className="text-xs font-bold mb-2">Orchestrator Agent</p>
            <div className="flex justify-around items-start">
                <div className="text-center">
                    <p className="text-xs">"Worker 1: Validate policy."</p>
                    <div className="text-xl">↓</div>
                    <Robot size={24} className="text-purple-500 mx-auto" />
                </div>
                <div className="text-center">
                    <p className="text-xs">"Worker 2: Assess damage."</p>
                    <div className="text-xl">↓</div>
                    <MagnifyingGlass size={24} className="text-yellow-500 mx-auto" />
                </div>
                 <div className="text-center">
                    <p className="text-xs">"Worker 3: Check for fraud."</p>
                    <div className="text-xl">↓</div>
                    <User size={24} className="text-red-500 mx-auto" />
                </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Final Decision */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <CheckCircle size={32} className="text-green-600" />
            <div>
                <p className="text-sm font-semibold">Claim Approved</p>
                <p className="text-xs">"Claim #12345 approved for $2,500. All checks passed."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
