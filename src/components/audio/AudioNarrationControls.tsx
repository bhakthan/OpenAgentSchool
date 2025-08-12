import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, 
  Pause, 
  Stop, 
  SpeakerHigh, 
  SpeakerX, 
  Gear,
  X
} from '@phosphor-icons/react';
import { useAudioNarration } from '@/contexts/AudioNarrationContext';

interface AudioNarrationControlsProps {
  componentName: string;
  className?: string;
  position?: 'floating' | 'embedded';
}

export default function AudioNarrationControls({ 
  componentName, 
  className = '', 
  position = 'floating' 
}: AudioNarrationControlsProps) {
  const { state, playNarration, stopNarration, setVolume, setSpeechRate, toggleTTSMode, setSelectedVoice, getAvailableVoices } = useAudioNarration();
  const [showSettings, setShowSettings] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: window.innerWidth - 200, y: 100 });
  const dragRef = useRef<HTMLDivElement>(null);

  // Function to constrain position within viewport bounds
  const constrainPosition = (x: number, y: number, width: number, height: number) => {
    const padding = 20; // Minimum distance from viewport edges
    const maxX = window.innerWidth - width - padding;
    const maxY = window.innerHeight - height - padding;
    
    return {
      x: Math.max(padding, Math.min(x, maxX)),
      y: Math.max(padding, Math.min(y, maxY))
    };
  };

  // Adjust position when settings panel opens/closes or component expands
  useEffect(() => {
    if (position === 'floating' && dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      const constrainedPos = constrainPosition(dragPosition.x, dragPosition.y, rect.width, rect.height);
      
      // Only update if position needs to be constrained
      if (constrainedPos.x !== dragPosition.x || constrainedPos.y !== dragPosition.y) {
        setDragPosition(constrainedPos);
      }
    }
  }, [showSettings, isExpanded, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (position === 'floating') {
      setIsDragging(true);
      const rect = dragRef.current?.getBoundingClientRect();
      if (rect) {
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        
        const handleMouseMove = (e: MouseEvent) => {
          const newX = e.clientX - offsetX;
          const newY = e.clientY - offsetY;
          const constrainedPos = constrainPosition(newX, newY, rect.width, rect.height);
          setDragPosition(constrainedPos);
        };

        const handleMouseUp = () => {
          setIsDragging(false);
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    }
  };

  // Load available voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = getAvailableVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    
    // Some browsers load voices asynchronously
    if ('speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [getAvailableVoices]);

  // Handle window resize to keep floating controls in bounds
  useEffect(() => {
    if (position === 'floating') {
      const handleResize = () => {
        if (dragRef.current) {
          const rect = dragRef.current.getBoundingClientRect();
          const constrainedPos = constrainPosition(dragPosition.x, dragPosition.y, rect.width, rect.height);
          setDragPosition(constrainedPos);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [position, dragPosition]);

  // Initialize position more safely for floating controls
  useEffect(() => {
    if (position === 'floating') {
      // Set initial position to top-right with some padding, but ensure it's visible
      const initialX = Math.max(20, window.innerWidth - 320); // Account for expanded width
      const initialY = 20;
      setDragPosition({ x: initialX, y: initialY });
    }
  }, [position]);

  const isCurrentComponent = state.currentComponent === componentName;
  const isPlaying = state.isPlaying && isCurrentComponent;

  const handleLevelPlay = async (level: 'beginner' | 'intermediate' | 'advanced') => {
    if (isPlaying && state.currentLevel === level) {
      stopNarration();
    } else {
      await playNarration(componentName, level);
    }
  };

const levelConfig = {
beginner: {
    icon: '🌱',
    label: 'Beginner',
    color: 'text-emerald-700 dark:text-emerald-300',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    shadowColor: 'shadow-emerald-200 dark:shadow-emerald-900',
    hoverColor: 'hover:bg-emerald-100 dark:hover:bg-emerald-800',
    description: 'Simple, easy-to-understand explanation'
},
intermediate: {
    icon: '💪',
    label: 'Intermediate',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    borderColor: 'border-blue-200 dark:border-blue-800',
    shadowColor: 'shadow-blue-200 dark:shadow-blue-900',
    hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-800',
    description: 'More detailed technical explanation'
},
advanced: {
    icon: '🚀',
    label: 'Advanced',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
    borderColor: 'border-purple-200 dark:border-purple-800',
    shadowColor: 'shadow-purple-200 dark:shadow-purple-900',
    hoverColor: 'hover:bg-purple-100 dark:hover:bg-purple-800',
    description: 'Deep technical implementation details'
}
};

  if (position === 'floating') {
    return (
      <TooltipProvider>
        <div 
          ref={dragRef}
          className={`fixed z-50 ${className} transition-all duration-200 ${isDragging ? 'scale-105' : ''}`}
          style={{
            left: `${dragPosition.x}px`,
            top: `${dragPosition.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-2">
              {!isExpanded ? (
                // Slim collapsed state - just the three difficulty icons
                <div className="flex items-center gap-2">
                  {Object.entries(levelConfig).map(([level, config]) => (
                    <Tooltip key={level}>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleLevelPlay(level as 'beginner' | 'intermediate' | 'advanced')}
                          size="sm"
                          variant="ghost"
                          className="p-1 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                          disabled={state.isPlaying}
                        >
                          <span className="text-lg">{config.icon}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{config.label}</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">{config.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => {
                          setIsExpanded(true);
                          setShowSettings(true); // Auto-show settings when expanding from gear click
                        }}
                        size="sm"
                        variant="ghost"
                        className="p-1 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <Gear className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <p className="font-medium text-gray-900 dark:text-gray-100">Audio Settings</p>
                      <p className="text-xs text-gray-700 dark:text-gray-300">Click to open full controls & settings</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                // Expanded state - full controls
                <div className="space-y-3 min-w-[280px]">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                        Audio Guide
                      </Badge>
                      <div className="flex flex-col gap-0.5 cursor-grab active:cursor-grabbing">
                        <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => setShowSettings(!showSettings)}
                            size="sm"
                            variant="ghost"
                            className="w-6 h-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900"
                          >
                            <Gear className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                          <p className="font-medium text-gray-900 dark:text-gray-100">Audio Settings</p>
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            {showSettings ? 'Hide settings panel' : 'Show settings panel'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => setIsExpanded(false)}
                            size="sm"
                            variant="ghost"
                            className="w-6 h-6 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                          <p className="font-medium text-gray-900 dark:text-gray-100">Collapse</p>
                          <p className="text-xs text-gray-700 dark:text-gray-300">Return to compact view</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Level Controls */}
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(levelConfig) as Array<keyof typeof levelConfig>).map((level) => {
                      const config = levelConfig[level];
                      const isCurrentLevel = state.currentLevel === level && isCurrentComponent;
                      const isActiveAndPlaying = isCurrentLevel && isPlaying;
                      
                      return (
                        <Tooltip key={level}>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => handleLevelPlay(level)}
                              size="sm"
                              variant="outline"
                              className={`
                                flex flex-col items-center gap-1 h-auto py-3 px-2
                                border-2 shadow-lg transition-all duration-300 transform
                                ${isActiveAndPlaying 
                                  ? `${config.bgColor} ${config.color} ${config.borderColor} ${config.shadowColor} scale-105 shadow-xl` 
                                  : `bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${config.hoverColor} border-gray-300 dark:border-gray-600 hover:scale-105 hover:shadow-lg`
                                }
                              `}
                            >
                              <div className="relative flex items-center justify-center">
                                <span className="text-2xl">{config.icon}</span>
                                {isActiveAndPlaying && (
                                  <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg">
                                    <Pause className="w-3 h-3 text-white" />
                                  </div>
                                )}
                                {!isActiveAndPlaying && isCurrentLevel && (
                                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
                                    <Play className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>
                              {isActiveAndPlaying && (
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                  <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{width: '60%'}}></div>
                                </div>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                            <p className="font-medium text-gray-900 dark:text-gray-100">{config.label}</p>
                            <p className="text-xs text-gray-700 dark:text-gray-300">{config.description}</p>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 font-medium">
                              {isActiveAndPlaying ? 'Click to pause' : 'Click to play'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>

                  {/* Global Control Buttons */}
                  {isPlaying && (
                    <div className="flex items-center justify-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <Button
                        onClick={stopNarration}
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-2 shadow-md"
                      >
                        <Stop className="w-4 h-4" />
                        Stop Audio
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <SpeakerHigh className="w-4 h-4" />
                        <span>Playing: {levelConfig[state.currentLevel as keyof typeof levelConfig]?.label}</span>
                      </div>
                    </div>
                  )}

                  {/* Settings Panel */}
                  {showSettings && (
                    <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium">Audio Settings</h4>
                      
                      {/* Volume Control */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs text-gray-600 dark:text-gray-400">Volume</label>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{Math.round(state.volume * 100)}%</span>
                        </div>
                        <Slider
                          value={[state.volume]}
                          onValueChange={([value]) => setVolume(value)}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      {/* Speed Control */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs text-gray-600 dark:text-gray-400">Speed</label>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{state.speechRate}x</span>
                        </div>
                        <Slider
                          value={[state.speechRate]}
                          onValueChange={([value]) => setSpeechRate(value)}
                          max={2}
                          min={0.5}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      {/* TTS Mode Toggle */}
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-600 dark:text-gray-400">TTS Mode</label>
                        <Button
                          onClick={toggleTTSMode}
                          size="sm"
                          variant="outline"
                          className="text-xs h-6"
                        >
                          {state.useLocalTTS ? 'Local' : 'Web'}
                        </Button>
                      </div>

                      {/* Voice Selection */}
                      <div className="space-y-2">
                        <label className="text-xs text-gray-600 dark:text-gray-400">Voice</label>
                        <Select
                          value={state.selectedVoice?.name || 'auto'}
                          onValueChange={(value) => {
                            if (value === 'auto') {
                              setSelectedVoice(null);
                            } else {
                              const voice = availableVoices.find(v => v.name === value);
                              setSelectedVoice(voice || null);
                            }
                          }}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select voice" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto (Best Female)</SelectItem>
                            {availableVoices
                              .filter(voice => 
                                voice.name.toLowerCase().includes('female') ||
                                voice.name.toLowerCase().includes('woman') ||
                                voice.name.toLowerCase().includes('zira') ||
                                voice.name.toLowerCase().includes('eva') ||
                                voice.name.toLowerCase().includes('samantha') ||
                                voice.name.toLowerCase().includes('allison') ||
                                voice.name.toLowerCase().includes('karen') ||
                                voice.name.toLowerCase().includes('susan') ||
                                voice.name.toLowerCase().includes('victoria') ||
                                voice.name.toLowerCase().includes('aria') ||
                                voice.name.toLowerCase().includes('ava')
                              )
                              .slice(0, 8) // Limit to prevent overwhelming UI
                              .map((voice) => (
                                <SelectItem key={voice.name} value={voice.name}>
                                  {voice.name.length > 25 ? voice.name.substring(0, 25) + '...' : voice.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    );
  }

  // Embedded position (for integration into component headers)
  return (
    <TooltipProvider>
      <div className={`space-y-3 ${className}`}>
        {/* Main Controls Row */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Audio Label */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <SpeakerHigh className="w-4 h-4" />
              Audio:
            </span>
            
            {/* Level Buttons */}
            <div className="flex items-center gap-2">
              {(Object.keys(levelConfig) as Array<keyof typeof levelConfig>).map((level) => {
                const config = levelConfig[level];
                const isCurrentLevel = state.currentLevel === level && isCurrentComponent;
                const isActiveAndPlaying = isCurrentLevel && isPlaying;
                
                return (
                  <Tooltip key={level}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleLevelPlay(level)}
                        size="sm"
                        variant="outline"
                        className={`
                          relative flex items-center gap-2 h-10 px-3
                          border-2 shadow-md transition-all duration-300 transform
                          ${isActiveAndPlaying 
                            ? `${config.bgColor} ${config.color} ${config.borderColor} ${config.shadowColor} scale-110 shadow-lg` 
                            : `bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${config.hoverColor} border-gray-300 dark:border-gray-600 hover:scale-105 hover:shadow-md`
                          }
                        `}
                      >
                        <div className="relative flex items-center">
                          <span className="text-xl">{config.icon}</span>
                          {isActiveAndPlaying && (
                            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 shadow-lg">
                              <Pause className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                          {!isActiveAndPlaying && isCurrentLevel && (
                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 shadow-lg">
                              <Play className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                        {isActiveAndPlaying && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{config.label}</p>
                      <p className="text-xs text-gray-700 dark:text-gray-300">{config.description}</p>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 font-medium">
                        {isActiveAndPlaying ? 'Click to pause' : 'Click to play'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          
          {/* Settings Gear Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setShowSettings(!showSettings)}
                size="sm"
                variant="outline"
                className={`
                  h-10 px-3 border-2 shadow-md transition-all duration-300
                  ${showSettings 
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' 
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Gear className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
              <p className="font-medium text-gray-900 dark:text-gray-100">Audio Settings</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {showSettings ? 'Hide settings panel' : 'Show settings panel'}
              </p>
            </TooltipContent>
          </Tooltip>
          
          {/* Stop Button when playing */}
          {isPlaying && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
              <Button
                onClick={stopNarration}
                size="sm"
                variant="destructive"
                className="h-8 px-3 shadow-md"
              >
                <Stop className="w-3 h-3 mr-1" />
                Stop
              </Button>
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <SpeakerHigh className="w-3 h-3" />
                <span>Playing: {levelConfig[state.currentLevel as keyof typeof levelConfig]?.label}</span>
              </div>
            </div>
          )}
        </div>

        {/* Collapsible Settings Panel */}
        {showSettings && (
          <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-inner">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Audio Settings</h4>
              <Badge className="bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                Embedded Mode
              </Badge>
            </div>
            
            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-600 dark:text-gray-400">Volume</label>
                <span className="text-xs text-gray-600 dark:text-gray-400">{Math.round(state.volume * 100)}%</span>
              </div>
              <Slider
                value={[state.volume]}
                onValueChange={([value]) => setVolume(value)}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-600 dark:text-gray-400">Speed</label>
                <span className="text-xs text-gray-600 dark:text-gray-400">{state.speechRate}x</span>
              </div>
              <Slider
                value={[state.speechRate]}
                onValueChange={([value]) => setSpeechRate(value)}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* TTS Mode Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-600 dark:text-gray-400">TTS Mode</label>
              <Button
                onClick={toggleTTSMode}
                size="sm"
                variant="outline"
                className="text-xs h-8 px-3"
              >
                {state.useLocalTTS ? 'Local' : 'Web'}
              </Button>
            </div>

            {/* Voice Selection */}
            <div className="space-y-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Voice</label>
              <Select
                value={state.selectedVoice?.name || 'auto'}
                onValueChange={(value) => {
                  if (value === 'auto') {
                    setSelectedVoice(null);
                  } else {
                    const voice = availableVoices.find(v => v.name === value);
                    setSelectedVoice(voice || null);
                  }
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (Best Female)</SelectItem>
                  {availableVoices
                    .filter(voice => 
                      voice.name.toLowerCase().includes('female') ||
                      voice.name.toLowerCase().includes('woman') ||
                      voice.name.toLowerCase().includes('zira') ||
                      voice.name.toLowerCase().includes('eva') ||
                      voice.name.toLowerCase().includes('samantha') ||
                      voice.name.toLowerCase().includes('allison') ||
                      voice.name.toLowerCase().includes('karen') ||
                      voice.name.toLowerCase().includes('susan') ||
                      voice.name.toLowerCase().includes('victoria') ||
                      voice.name.toLowerCase().includes('aria') ||
                      voice.name.toLowerCase().includes('ava')
                    )
                    .slice(0, 8) // Limit to prevent overwhelming UI
                    .map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name.length > 25 ? voice.name.substring(0, 25) + '...' : voice.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
