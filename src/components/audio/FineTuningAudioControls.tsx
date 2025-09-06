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
  Brain,
  Target,
  Lightning,
  ChartLine,
  Database,
  Gear
} from '@phosphor-icons/react';
import { useAudioNarration } from '@/contexts/AudioNarrationContext';
import { useAvailableVoices } from '@/hooks/useAvailableVoices';
import { getDisplayVoices } from '@/lib/voices';

interface FineTuningAudioControlsProps {
  componentName: string;
  className?: string;
  activeTab?: string;
}

export default function FineTuningAudioControls({ 
  componentName, 
  className = '',
  activeTab = 'overview'
}: FineTuningAudioControlsProps) {
  const { state, playNarration, stopNarration, setVolume, setSpeechRate, toggleTTSMode, setSelectedVoice } = useAudioNarration();
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const availableVoices = useAvailableVoices();
  const displayVoices = getDisplayVoices(availableVoices, state.selectedLanguage);

  const isCurrentComponent = state.currentComponent === componentName;
  const isPlaying = state.isPlaying && isCurrentComponent;

  // Content type configurations
  const contentTypes = {
    overview: {
      icon: <Brain className="w-5 h-5" />,
      label: 'Overview',
      description: 'Progressive fine-tuning stages and strategy',
      color: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800',
      hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-800'
    },
    data: {
      icon: <Database className="w-5 h-5" />,
      label: 'Data Strategy',
      description: 'Dataset composition and curation methods',
      color: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800',
      hoverColor: 'hover:bg-green-100 dark:hover:bg-green-800'
    },
    sft: {
      icon: <Brain className="w-5 h-5" />,
      label: 'SFT',
      description: 'Supervised Fine-Tuning implementation',
      color: 'text-purple-700 dark:text-purple-300',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      borderColor: 'border-purple-200 dark:border-purple-800',
      hoverColor: 'hover:bg-purple-100 dark:hover:bg-purple-800'
    },
    dpo: {
      icon: <Target className="w-5 h-5" />,
      label: 'DPO',
      description: 'Direct Preference Optimization techniques',
      color: 'text-orange-700 dark:text-orange-300',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      borderColor: 'border-orange-200 dark:border-orange-800',
      hoverColor: 'hover:bg-orange-100 dark:hover:bg-orange-800'
    },
    rft: {
      icon: <Lightning className="w-5 h-5" />,
      label: 'RFT',
      description: 'Reinforcement Fine-Tuning with rewards',
      color: 'text-amber-700 dark:text-amber-300',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
      borderColor: 'border-amber-200 dark:border-amber-800',
      hoverColor: 'hover:bg-amber-100 dark:hover:bg-amber-800'
    },
    eval: {
      icon: <ChartLine className="w-5 h-5" />,
      label: 'Evaluation',
      description: 'Metrics and performance monitoring',
      color: 'text-teal-700 dark:text-teal-300',
      bgColor: 'bg-teal-50 dark:bg-teal-950',
      borderColor: 'border-teal-200 dark:border-teal-800',
      hoverColor: 'hover:bg-teal-100 dark:hover:bg-teal-800'
    }
  };

  const handlePlayNarration = async (contentType: string, level: 'beginner' | 'intermediate' | 'advanced') => {
    try {
      setSelectedContentType(contentType);
      await playNarration(componentName, level, contentType);
    } catch (error) {
      console.error('Failed to play narration:', error);
    }
  };

  const handleStopNarration = () => {
    stopNarration();
    setSelectedContentType(null);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentContentType = () => {
    return contentTypes[selectedContentType as keyof typeof contentTypes] || null;
  };

  const currentContentType = getCurrentContentType();

  return (
    <TooltipProvider>
      <Card className={`w-full fine-tuning-audio-guide ${className}`}>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <SpeakerHigh className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Fine-Tuning Audio Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Progressive alignment narration
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Multi-level
              </Badge>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Gear className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Audio Settings</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Content Type Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Select Topic</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(contentTypes).map(([key, config]) => {
                const active = selectedContentType === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedContentType(key)}
                    className={`ft-topic-btn p-3 rounded-lg border-2 transition-all text-left relative overflow-hidden ${active ? 'active ' + config.bgColor : ''}`}
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-0 ft-topic-glow"></div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={config.color}>{config.icon}</span>
                    <span className="font-medium text-sm">{config.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Selection and Play Controls */}
          {selectedContentType && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Choose Learning Level</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <div
                    key={level}
                    className={`audio-level p-4 rounded-lg border relative overflow-hidden ${currentContentType ? currentContentType.bgColor : 'bg-muted/20'} ${currentContentType ? currentContentType.borderColor : 'border-muted'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm capitalize">{level}</span>
                      <Badge variant="secondary" className="text-xs">
                        {level === 'beginner' ? '2-3 min' : level === 'intermediate' ? '3-4 min' : '4-5 min'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {level === 'beginner' && 'Basic concepts and overview'}
                      {level === 'intermediate' && 'Practical implementation details'}
                      {level === 'advanced' && 'Expert techniques and best practices'}
                    </p>
                    
                    {isPlaying && state.currentLevel === level && state.currentContentType === selectedContentType ? (
                      <Button
                        onClick={handleStopNarration}
                        variant="destructive"
                        size="sm"
                        className="w-full"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePlayNarration(selectedContentType, level)}
                        variant="default"
                        size="sm"
                        className="w-full"
                        disabled={isPlaying && state.currentLevel !== level}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Play {level}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Playback Status */}
          {isPlaying && (
            <div className={`ft-playback-box p-4 rounded-lg border-2 mb-6 ${currentContentType ? currentContentType.bgColor : 'bg-blue-50 dark:bg-blue-950'} ${currentContentType ? currentContentType.borderColor : 'border-blue-200 dark:border-blue-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Playing</span>
                </div>
                <Button
                  onClick={handleStopNarration}
                  variant="ghost"
                  size="sm"
                >
                  <Pause className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                {currentContentType?.label} • {state.currentLevel} level
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium mb-4">Audio Settings</h4>
              
              <div className="space-y-4">
                {/* Volume Control */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm">Volume</label>
                    <span className="text-xs text-muted-foreground">{Math.round(state.volume * 100)}%</span>
                  </div>
                  <Slider
                    value={[state.volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Speed Control */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm">Speed</label>
                    <span className="text-xs text-muted-foreground">{state.speechRate}x</span>
                  </div>
                  <Slider
                    value={[state.speechRate]}
                    onValueChange={(value) => setSpeechRate(value[0])}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Voice Selection */}
                <div>
                  <label className="text-sm mb-2 block">Voice</label>
                  <Select
                    value={state.selectedVoice?.name || ""}
                    onValueChange={(voiceName) => {
                      const voice = availableVoices.find(v => v.name === voiceName);
                      setSelectedVoice(voice || null);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {displayVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          <div className="flex items-center space-x-2">
                            <span>{voice.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {voice.lang}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
