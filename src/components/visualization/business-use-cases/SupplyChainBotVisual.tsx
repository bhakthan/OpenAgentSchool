import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Truck, MagnifyingGlass, Compass, Megaphone, Users } from '@phosphor-icons/react';

export const SupplyChainBotVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Supply Chain Disruption Manager</p>
            <p className="text-xs text-muted-foreground">A Multi-Agent System for Logistics</p>
        </div>
        <div className="relative flex flex-col items-center justify-center space-y-4">
          {/* Initial Event */}
          <div className="flex items-center space-x-2">
            <Truck size={28} className="text-red-500 animate-pulse" />
            <p className="text-sm font-medium">"Event: Port congestion detected in Singapore."</p>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* AutoGen Group Chat */}
          <div className="w-full p-4 border-2 border-dashed rounded-lg bg-background/70">
            <p className="text-xs font-bold text-center mb-3 flex items-center justify-center gap-1"><Users size={16} /> AutoGen Group Chat</p>
            <div className="flex justify-around">
              <div className="text-center space-y-1">
                <MagnifyingGlass size={24} className="text-blue-500 mx-auto" />
                <p className="text-xs font-semibold">Monitor Agent</p>
                <p className="text-xs">"I detected the event."</p>
              </div>
              <div className="text-center space-y-1">
                <Compass size={24} className="text-purple-500 mx-auto" />
                <p className="text-xs font-semibold">Planner Agent</p>
                <p className="text-xs">"Rerouting via land."</p>
              </div>
              <div className="text-center space-y-1">
                <Megaphone size={24} className="text-green-500 mx-auto" />
                <p className="text-xs font-semibold">Comms Agent</p>
                <p className="text-xs">"Notifying customers."</p>
              </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Final Output */}
          <div className="p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <p className="text-sm font-semibold text-center">Resolution</p>
            <p className="text-xs text-center">"Shipments rerouted. Customers informed. Delay minimized to 24 hours."</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
