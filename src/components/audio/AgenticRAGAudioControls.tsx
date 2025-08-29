import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, 
  Pause, 
  SpeakerHigh,
  BookOpen,
  FlowArrow,
  Code,
  Gear
} from '@phosphor-icons/react';
import { useAudioNarration } from '@/contexts/AudioNarrationContext';
import { useAvailableVoices } from '@/hooks/useAvailableVoices';
import { getDisplayVoices } from '@/lib/voices';

interface AgenticRAGAudioControlsProps {
  componentName: string;
  className?: string;
  activeTab?: string;
}

export default function AgenticRAGAudioControls({ 
  componentName, 
  className = '',
  activeTab = 'flow-diagram'
}: AgenticRAGAudioControlsProps) {
  const { state, playNarration, stopNarration, setVolume, setSpeechRate, toggleTTSMode, setSelectedVoice } = useAudioNarration();
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const availableVoices = useAvailableVoices();
  const displayVoices = getDisplayVoices(availableVoices, state.selectedLanguage);

  const isCurrentComponent = state.currentComponent === componentName;
  const isPlaying = state.isPlaying && isCurrentComponent;

  // Content type configurations
  const contentTypes = {
    BusinessUseCase: {
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Business Use Case',
      description: 'Real-world applications and business scenarios',
      color: 'text-emerald-700 dark:text-emerald-300',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      hoverColor: 'hover:bg-emerald-100 dark:hover:bg-emerald-800'
    },
    FlowDiagram: {
      icon: <FlowArrow className="w-5 h-5" />,
      label: 'Flow Diagram',
      description: 'Process flow and architecture insights',
      color: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800',
      hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-800'
    },
    Implementation: {
      icon: <Code className="w-5 h-5" />,
      label: 'Implementation',
      description: 'Technical implementation and code examples',
      color: 'text-purple-700 dark:text-purple-300',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      borderColor: 'border-purple-200 dark:border-purple-800',
      hoverColor: 'hover:bg-purple-100 dark:hover:bg-purple-800'
    }
  };

  // Difficulty level configurations
  const levelConfig = {
    beginner: {
      icon: '🌱',
      label: 'Beginner',
      color: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    intermediate: {
      icon: '💪',
      label: 'Intermediate',
      color: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    advanced: {
      icon: '🚀',
      label: 'Advanced',
      color: 'text-purple-700 dark:text-purple-300',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      borderColor: 'border-purple-200 dark:border-purple-800'
    }
  };

  // Map tab names to content types
  const tabToContentType: Record<string, string> = {
    'flow-diagram': 'FlowDiagram',
    'details': 'BusinessUseCase', 
    'implementation': 'Implementation'
  };

  // Get the current content type based on active tab
  const currentContentType = tabToContentType[activeTab] || 'FlowDiagram';
  
  // Filter content types to only show the current tab's content
  const filteredContentTypes = { [currentContentType]: contentTypes[currentContentType as keyof typeof contentTypes] };

  const handlePlayAudio = async (contentType: string, level: 'beginner' | 'intermediate' | 'advanced') => {
    try {
      if (isPlaying && state.currentLevel === level && state.currentContentType === contentType) {
        stopNarration();
      } else {
        await playNarration(componentName, level, contentType);
        setSelectedContentType(contentType);
      }
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  };

  const isCurrentlyPlaying = (contentType: string, level: string) => {
    return isPlaying && 
           state.currentLevel === level && 
           state.currentContentType === contentType && 
           isCurrentComponent;
  };

  return (
    <TooltipProvider>
      <div className={`flex items-center gap-3 flex-wrap ${className}`}>
        {/* Inline Header with Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <SpeakerHigh className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Audio:</span>
          <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)] text-xs">
            {filteredContentTypes[currentContentType]?.label || 'RAG Enhanced'}
          </Badge>
        </div>

        {/* Context-Aware Audio Controls - Only show current tab's content */}
  <div className="flex gap-1 flex-wrap">
          {Object.entries(filteredContentTypes).map(([type, config]) => {
            // Safety check to ensure config exists
            if (!config) {
              // console.warn(`No config found for content type: ${type}`);
              return null;
            }
            
            return Object.entries(levelConfig).map(([level, levelConf]) => {
              const isCurrentlyActive = isCurrentlyPlaying(type, level);
              
              return (
                <Tooltip key={`${type}-${level}`}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handlePlayAudio(type, level as 'beginner' | 'intermediate' | 'advanced')}
                      size="sm"
                      variant="outline"
                      className={`
                        relative h-8 px-2 text-xs border transition-all duration-200 flex items-center gap-1 audio-pill
                        ${isCurrentlyActive 
                          ? `${levelConf.bgColor} ${levelConf.color} ${levelConf.borderColor} shadow-md` 
                          : `bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600`
                        }
                      `}
                    >
                      {/* Content Type Icon */}
                      <div className={`w-3 h-3 rounded ${config.bgColor || 'bg-gray-100'} type-icon flex items-center justify-center`}>
                        {React.cloneElement(config.icon as React.ReactElement, { className: 'w-2 h-2' })}
                      </div>
                      
                      {/* Level Icon */}
                      <span className="text-xs">{levelConf.icon}</span>
                      
                      {/* Compact Status Indicator */}
                      {isCurrentlyActive && (
                        <div className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full p-0.5">
                          <Pause className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="text-center">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {config.label} - {levelConf.label}
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                        {config.description}
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-1 font-medium">
                        {isCurrentlyActive ? 'Click to pause' : 'Click to play'}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            });
          })}
        </div>

        {/* Settings Gear Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setShowSettings(!showSettings)}
              size="sm"
              variant="outline"
              className={`
                h-8 px-2 border transition-all duration-200 audio-gear
                ${showSettings 
                  ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' 
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
            >
              <Gear className="w-3 h-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
            <p className="font-medium text-gray-900 dark:text-gray-100">Audio Settings</p>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {showSettings ? 'Hide settings panel' : 'Show volume, speed & voice settings'}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Inline Global Control - Only when playing */}
        {isPlaying && (
          <div className="flex items-center gap-2 p-1 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-800 flex-shrink-0">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-900 dark:text-green-100 whitespace-nowrap">
              Playing: {contentTypes[state.currentContentType as keyof typeof contentTypes]?.label} - {levelConfig[state.currentLevel as keyof typeof levelConfig]?.label}
            </span>
            <Button
              onClick={stopNarration}
              size="sm"
              variant="destructive"
              className="h-6 px-2 text-xs"
            >
              <Pause className="w-3 h-3" />
            </Button>
          </div>
        )}

        {/* Collapsible Settings Panel */}
        {showSettings && (
          <div className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-inner audio-settings-panel">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Audio Settings</h4>
              <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)] text-xs">
                {filteredContentTypes[currentContentType]?.label}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    {displayVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name.length > 25 ? voice.name.substring(0, 25) + '...' : voice.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* TTS Mode Toggle */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <label className="text-xs text-gray-600 dark:text-gray-400">TTS Mode</label>
              <Button
                onClick={toggleTTSMode}
                size="sm"
                variant="outline"
                className="text-xs h-6 px-2"
              >
                {state.useLocalTTS ? 'Local' : 'Web'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
