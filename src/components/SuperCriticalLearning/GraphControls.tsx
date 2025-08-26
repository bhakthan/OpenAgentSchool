import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Settings,
  Eye,
  EyeOff,
  Filter,
  Maximize2
} from 'lucide-react';
import { SCLEffect } from './SCLGraph';

interface GraphControlsProps {
  effects: SCLEffect[];
  onEffectsChange: (effects: SCLEffect[]) => void;
  enableForceLayout: boolean;
  onForceLayoutChange: (enabled: boolean) => void;
  showMinimap: boolean;
  onMinimapToggle: (show: boolean) => void;
  onExportGraph: () => void;
  onResetLayout: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  className?: string;
}

interface FilterState {
  showFirstOrder: boolean;
  showHigherOrder: boolean;
  showSynthesis: boolean;
  showConstraints: boolean;
  minConfidence: number;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  effects,
  onEffectsChange,
  enableForceLayout,
  onForceLayoutChange,
  showMinimap,
  onMinimapToggle,
  onExportGraph,
  onResetLayout,
  onZoomIn,
  onZoomOut,
  onFitView,
  className = '',
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    showFirstOrder: true,
    showHigherOrder: true,
    showSynthesis: true,
    showConstraints: true,
    minConfidence: 0,
  });

  // Apply filters to effects
  const applyFilters = (newFilters: FilterState) => {
    const filteredEffects = effects.filter(effect => {
      // Type filters
      if (effect.type === 'first-order' && !newFilters.showFirstOrder) return false;
      if (effect.type === 'higher-order' && !newFilters.showHigherOrder) return false;
      if (effect.type === 'synthesis' && !newFilters.showSynthesis) return false;
      if (effect.type === 'constraint' && !newFilters.showConstraints) return false;
      
      // Confidence filter
      if (effect.confidence < newFilters.minConfidence) return false;
      
      return true;
    });

    onEffectsChange(filteredEffects);
  };

  const handleFilterChange = (key: keyof FilterState, value: boolean | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      showFirstOrder: true,
      showHigherOrder: true,
      showSynthesis: true,
      showConstraints: true,
      minConfidence: 0,
    };
    setFilters(defaultFilters);
    applyFilters(defaultFilters);
  };

  // Get effect counts by type
  const effectCounts = {
    firstOrder: effects.filter(e => e.type === 'first-order').length,
    higherOrder: effects.filter(e => e.type === 'higher-order').length,
    synthesis: effects.filter(e => e.type === 'synthesis').length,
    constraints: effects.filter(e => e.type === 'constraint').length,
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Main Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Network className="w-5 h-5" />
            Graph Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* View Controls */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={onZoomIn} size="sm" variant="outline">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button onClick={onZoomOut} size="sm" variant="outline">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button onClick={onFitView} size="sm" variant="outline">
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button onClick={onResetLayout} size="sm" variant="outline">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button onClick={onExportGraph} size="sm" variant="outline">
              <Download className="w-4 h-4" />
            </Button>
          </div>

          {/* Layout Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Force Layout</label>
              <Switch
                checked={enableForceLayout}
                onCheckedChange={onForceLayoutChange}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Minimap</label>
              <Switch
                checked={showMinimap}
                onCheckedChange={onMinimapToggle}
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </CardContent>
      </Card>

      {/* Effect Statistics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Effect Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">First-Order</span>
              <Badge variant="outline" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">
                {effectCounts.firstOrder}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Higher-Order</span>
              <Badge variant="outline" className="ring-1 bg-[var(--badge-orange-bg)] ring-[var(--badge-orange-ring)] text-[var(--badge-orange-text)] dark:text-[var(--badge-orange-text)]">
                {effectCounts.higherOrder}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Synthesis</span>
              <Badge variant="outline" className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">
                {effectCounts.synthesis}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Constraints</span>
              <Badge variant="outline" className="ring-1 bg-[var(--badge-red-bg)] ring-[var(--badge-red-ring)] text-[var(--badge-red-text)] dark:text-[var(--badge-red-text)]">
                {effectCounts.constraints}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <span>Filters</span>
              <Button onClick={resetFilters} size="sm" variant="ghost">
                Reset
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Type Filters */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Effect Types</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm">First-Order Effects</label>
                  <Switch
                    checked={filters.showFirstOrder}
                    onCheckedChange={(checked) => handleFilterChange('showFirstOrder', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Higher-Order Effects</label>
                  <Switch
                    checked={filters.showHigherOrder}
                    onCheckedChange={(checked) => handleFilterChange('showHigherOrder', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Synthesis Effects</label>
                  <Switch
                    checked={filters.showSynthesis}
                    onCheckedChange={(checked) => handleFilterChange('showSynthesis', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Constraint Effects</label>
                  <Switch
                    checked={filters.showConstraints}
                    onCheckedChange={(checked) => handleFilterChange('showConstraints', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Confidence Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Min Confidence</label>
                <span className="text-sm text-gray-500">
                  {(filters.minConfidence * 100).toFixed(0)}%
                </span>
              </div>
              <Slider
                value={[filters.minConfidence]}
                onValueChange={([value]) => handleFilterChange('minConfidence', value)}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GraphControls;
