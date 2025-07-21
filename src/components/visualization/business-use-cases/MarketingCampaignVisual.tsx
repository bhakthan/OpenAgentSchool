import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User, ShoppingCart, Envelope, CheckCircle } from '@phosphor-icons/react';

export const MarketingCampaignVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Personalized Marketing Campaigns</p>
            <p className="text-xs text-muted-foreground">Prompt Chaining Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: Input Data */}
          <div className="flex items-center space-x-2">
            <User size={28} className="text-blue-500" />
            <ShoppingCart size={28} className="text-purple-500" />
            <p className="text-sm font-medium">User Profile + Purchase History</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: Prompt Chain */}
          <div className="w-full p-3 border rounded-lg bg-background/70 text-center">
            <p className="text-xs font-bold mb-2">Prompt Chain Execution</p>
            <div className="flex justify-around items-center">
                <p className="text-xs">1. Analyze Style</p>
                <div className="text-xl">→</div>
                <p className="text-xs">2. Suggest Products</p>
                <div className="text-xl">→</div>
                <p className="text-xs">3. Draft Email</p>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Final Output */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <Envelope size={32} className="text-green-600" />
            <div>
                <p className="text-sm font-semibold">Personalized Email Sent</p>
                <p className="text-xs">"Hi Alex, you might like these new hiking boots..."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
