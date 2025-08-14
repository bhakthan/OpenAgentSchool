import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Drone, 
  Truck, 
  MapPin, 
  Package, 
  Lightning, 
  ArrowRight,
  CheckCircle 
} from '@phosphor-icons/react';

export const SwarmLogisticsVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold text-primary">Swarm Intelligence Delivery Network</p>
          <p className="text-xs text-muted-foreground">Autonomous Drone Fleet Coordination</p>
        </div>
        
        <div className="relative space-y-4">
          {/* Input: Multiple Delivery Requests */}
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 p-2 bg-blue-100 dark:bg-blue-900 rounded">
              <Package size={16} className="text-blue-600" />
              <span className="text-xs">Order A</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-blue-100 dark:bg-blue-900 rounded">
              <Package size={16} className="text-blue-600" />
              <span className="text-xs">Order B</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-blue-100 dark:bg-blue-900 rounded">
              <Package size={16} className="text-blue-600" />
              <span className="text-xs">Order C</span>
            </div>
          </div>

          <div className="text-center">
            <ArrowRight size={20} className="mx-auto text-gray-500" />
          </div>

          {/* Swarm Coordination Layer */}
          <div className="p-4 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <p className="text-xs font-bold text-center mb-3 text-purple-700 dark:text-purple-300">
              🧠 Swarm Intelligence Layer
            </p>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                <Lightning size={20} className="text-yellow-500 mx-auto" />
                <p className="text-xs font-semibold">Local Rules</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  "Avoid collisions"<br/>
                  "Optimize fuel"<br/>
                  "Share routes"
                </p>
              </div>
              
              <div className="space-y-1">
                <MapPin size={20} className="text-red-500 mx-auto animate-pulse" />
                <p className="text-xs font-semibold">Stigmergy</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  "Traffic signals"<br/>
                  "Weather data"<br/>
                  "Route traces"
                </p>
              </div>
              
              <div className="space-y-1">
                <CheckCircle size={20} className="text-green-500 mx-auto" />
                <p className="text-xs font-semibold">Emergence</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  "Optimal paths"<br/>
                  "Load balancing"<br/>
                  "Self-healing"
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <ArrowRight size={20} className="mx-auto text-gray-500" />
          </div>

          {/* Autonomous Drone Agents */}
          <div className="p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50 dark:bg-green-900/20">
            <p className="text-xs font-bold text-center mb-3 text-green-700 dark:text-green-300">
              🚁 Autonomous Drone Fleet
            </p>
            
            <div className="flex justify-around">
              <div className="text-center space-y-1">
                <Drone size={24} className="text-blue-500 mx-auto animate-bounce" style={{animationDelay: '0s'}} />
                <p className="text-xs font-semibold">Drone 1</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Route A→C</p>
              </div>
              
              <div className="text-center space-y-1">
                <Drone size={24} className="text-purple-500 mx-auto animate-bounce" style={{animationDelay: '0.2s'}} />
                <p className="text-xs font-semibold">Drone 2</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Route B→D</p>
              </div>
              
              <div className="text-center space-y-1">
                <Drone size={24} className="text-orange-500 mx-auto animate-bounce" style={{animationDelay: '0.4s'}} />
                <p className="text-xs font-semibold">Drone 3</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Route E→F</p>
              </div>
              
              <div className="text-center space-y-1">
                <Truck size={24} className="text-green-600 mx-auto" />
                <p className="text-xs font-semibold">Hub Truck</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Resupply</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <ArrowRight size={20} className="mx-auto text-gray-500" />
          </div>

          {/* Emergent Outcomes */}
          <div className="p-3 border-2 border-green-500 rounded-lg bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100">
            <p className="text-sm font-semibold text-center mb-2">✨ Emergent Outcomes</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-center">
              <div>📈 30% faster delivery</div>
              <div>⚡ 25% less energy used</div>
              <div>🛡️ Auto-collision avoidance</div>
              <div>🔄 Self-healing network</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
