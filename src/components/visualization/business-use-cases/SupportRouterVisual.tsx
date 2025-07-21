import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User, Question, Robot, Wrench, CreditCard } from '@phosphor-icons/react';

export const SupportRouterVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Smart Customer Support</p>
            <p className="text-xs text-muted-foreground">Routing Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: User Query */}
          <div className="flex items-center space-x-2">
            <User size={28} className="text-blue-500" />
            <p className="text-sm font-medium">"My bill is wrong!"</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: Router Agent */}
          <div className="w-full p-3 border rounded-lg bg-background/70 text-center">
            <p className="text-xs font-bold mb-2">Router Agent</p>
            <div className="flex justify-around items-center">
                <div className="text-center opacity-30">
                    <Wrench size={24} className="text-gray-500 mx-auto" />
                    <p className="text-xs">Tech Support</p>
                </div>
                <div className="text-center">
                    <p className="text-xs font-semibold text-purple-600">Intent: "Billing"</p>
                    <div className="text-xl">→</div>
                    <CreditCard size={24} className="text-purple-500 mx-auto" />
                    <p className="text-xs font-semibold">Billing Agent</p>
                </div>
                 <div className="text-center opacity-30">
                    <Question size={24} className="text-gray-500 mx-auto" />
                    <p className="text-xs">FAQ Agent</p>
                </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Correct Agent Responds */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <Robot size={32} className="text-green-600" />
            <div>
                <p className="text-sm font-semibold">Billing Agent Response</p>
                <p className="text-xs">"I see the error on your invoice. Let me correct that for you."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
