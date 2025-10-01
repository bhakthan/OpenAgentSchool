import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, MagnifyingGlass, Compass, Megaphone, Users, Database } from '@phosphor-icons/react';

export const SupplyChainBotVisual = () => {
  const [withMemory, setWithMemory] = useState(false);

  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold text-primary">Supply Chain Disruption Manager</p>
          <p className="text-xs text-muted-foreground">A Multi-Agent System for Logistics</p>
          
          {/* Interactive Toggle - with visual cues */}
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-700">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-xs font-bold text-purple-900 dark:text-purple-100">
                Interactive Demo - Click to Compare!
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <span className="text-xl animate-pulse">👉</span>
              <Button
                variant={!withMemory ? "default" : "outline"}
                size="sm"
                onClick={() => setWithMemory(false)}
                className="text-xs transition-all hover:scale-105 shadow-md"
              >
                ❌ Without Memory
              </Button>
              <Button
                variant={withMemory ? "default" : "outline"}
                size="sm"
                onClick={() => setWithMemory(true)}
                className="text-xs transition-all hover:scale-105 shadow-md"
              >
                🧠 With Mem0
              </Button>
            </div>
            <p className="text-xs text-purple-800 dark:text-purple-200 mt-2">
              See how memory changes agent behavior ↓
            </p>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center space-y-4">
          {/* Initial Event */}
          <div className="flex items-center space-x-2">
            <Truck size={28} className="text-red-500 animate-pulse" />
            <p className="text-sm font-medium">"Event: Port congestion detected in Singapore."</p>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Memory Storage - Only show with Mem0 */}
          {withMemory && (
            <>
              <div className="w-full p-3 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-950">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Database size={20} className="text-blue-600 dark:text-blue-400" />
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-100">Mem0 Memory Store</p>
                </div>
                <div className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                  <p>✓ Preference: Air freight for urgent orders</p>
                  <p>✓ Notification: Warehouse team immediately</p>
                  <p>✓ User: logistics_team_001</p>
                </div>
              </div>
              <div className="text-2xl">⬇️</div>
            </>
          )}

          {/* Agent Group Chat */}
          <div className="w-full p-4 border-2 border-dashed rounded-lg bg-background/70">
            <p className="text-xs font-bold text-center mb-3 flex items-center justify-center gap-1">
              <Users size={16} /> Multi-Agent Collaboration
            </p>
            <div className="flex justify-around">
              <div className="text-center space-y-1">
                <MagnifyingGlass size={24} className="text-blue-500 mx-auto" />
                <p className="text-xs font-semibold">Monitor Agent</p>
                {!withMemory ? (
                  <p className="text-xs text-muted-foreground">"What are your shipping preferences?"</p>
                ) : (
                  <p className="text-xs text-green-700 dark:text-green-400">
                    "Retrieved: Air freight preference"
                  </p>
                )}
              </div>
              <div className="text-center space-y-1">
                <Compass size={24} className="text-purple-500 mx-auto" />
                <p className="text-xs font-semibold">Planner Agent</p>
                {!withMemory ? (
                  <p className="text-xs text-muted-foreground">"Need shipping method..."</p>
                ) : (
                  <p className="text-xs text-green-700 dark:text-green-400">
                    "Using saved: Air freight"
                  </p>
                )}
              </div>
              <div className="text-center space-y-1">
                <Megaphone size={24} className="text-green-500 mx-auto" />
                <p className="text-xs font-semibold">Comms Agent</p>
                {!withMemory ? (
                  <p className="text-xs text-muted-foreground">"Who should I notify?"</p>
                ) : (
                  <p className="text-xs text-green-700 dark:text-green-400">
                    "Notifying warehouse team"
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Final Output */}
          <div className={`p-3 border-2 rounded-lg ${
            withMemory 
              ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100' 
              : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100'
          }`}>
            <p className="text-sm font-semibold text-center">
              {withMemory ? '✅ Fast Resolution' : '⏱️ Delayed Resolution'}
            </p>
            {!withMemory ? (
              <p className="text-xs text-center">
                "Need clarification on shipping preferences and notification requirements. Waiting for user input..."
              </p>
            ) : (
              <p className="text-xs text-center">
                "Air freight booked automatically. Warehouse team notified. Delay minimized to 8 hours. No questions needed!"
              </p>
            )}
          </div>

          {/* Comparison Summary */}
          <div className={`mt-4 p-3 rounded-lg border-2 transition-all ${
            withMemory 
              ? 'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-300 dark:border-green-700'
              : 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-300 dark:border-yellow-700 animate-pulse'
          }`}>
            <p className="text-xs font-semibold text-center mb-2">
              {withMemory ? '🧠 With Mem0: Instant Context' : '❌ Without Memory: Repetitive Questions'}
            </p>
            <p className="text-xs text-center text-muted-foreground">
              {withMemory 
                ? 'Agents remember preferences across threads. No repeated questions. Faster response times.'
                : 'Agents must ask preferences every time. Slower resolution. Manual input required for each disruption.'}
            </p>
            {!withMemory && (
              <p className="text-xs text-center mt-2 font-semibold text-purple-700 dark:text-purple-300">
                💡 Try clicking "🧠 With Mem0" above to see the difference!
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
