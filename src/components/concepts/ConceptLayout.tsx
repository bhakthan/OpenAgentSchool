import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Gear, GraduationCap, ArrowRight, ArrowLeft, CheckCircle } from "@phosphor-icons/react"
import EnlightenMeButton from '@/components/enlighten/EnlightenMeButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AudioNarrationControls from '@/components/audio/AudioNarrationControls';

// NOTE: "Ask AI" is an alias for "EnlightenMe Button" - it provides AI-powered insights about concept content
// The EnlightenMeButton component (displayed as "Ask AI") helps users understand complex concepts through AI assistance

interface ConceptTab {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  level: 'fundamentals' | 'architecture' | 'implementation' | 'advanced'
  content: React.ReactNode
  completed?: boolean
}

interface ConceptLayoutProps {
  conceptId: string
  title: string
  description: string
  tabs?: ConceptTab[]
  children?: React.ReactNode
  icon?: React.ReactNode
  concepts?: string[]
  estimatedTime?: string
  nextConcept?: {
    id: string
    title: string
    description: string
  }
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
  enableAudioNarration?: boolean
}

const levelColors = {
  fundamentals: 'text-green-600 dark:text-green-400',
  architecture: 'text-blue-600 dark:text-blue-400',
  implementation: 'text-orange-600 dark:text-orange-400',
  advanced: 'text-purple-600 dark:text-purple-400'
}

const levelIcons = {
  fundamentals: <BookOpen className="w-4 h-4" />,
  architecture: <Gear className="w-4 h-4" />,
  implementation: <Code className="w-4 h-4" />,
  advanced: <GraduationCap className="w-4 h-4" />
}

export default function ConceptLayout({ 
  conceptId, 
  title, 
  description, 
  tabs,
  children,
  icon,
  concepts,
  estimatedTime,
  nextConcept, 
  onMarkComplete, 
  onNavigateToNext,
  enableAudioNarration = true 
}: ConceptLayoutProps) {
  // If using children pattern (no tabs), render simple layout
  if (children && (!tabs || tabs.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
                <CardDescription className="text-base mt-1">{description}</CardDescription>
              </div>
            </div>
            {(concepts || estimatedTime) && (
              <div className="flex flex-wrap items-center gap-4 mt-4">
                {concepts && concepts.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {concepts.map((concept, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                )}
                {estimatedTime && (
                  <Badge variant="outline" className="text-xs">
                    ⏱️ {estimatedTime}
                  </Badge>
                )}
              </div>
            )}
            
            {/* Audio Narration Controls for children-based layout */}
            {enableAudioNarration && (
              <AudioNarrationControls 
                componentName={conceptId}
                position="embedded"
              />
            )}
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Original tabs-based layout
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || '')
  const [completedTabs, setCompletedTabs] = useState<Set<string>>(new Set())
  const [isConceptComplete, setIsConceptComplete] = useState(false)

  const safeTabs = tabs || []
  const currentTabIndex = safeTabs.findIndex(tab => tab.id === activeTab)
  const currentTab = safeTabs[currentTabIndex]
  const progress = safeTabs.length > 0 ? ((completedTabs.size) / safeTabs.length) * 100 : 0

  const handleTabComplete = (tabId: string) => {
    setCompletedTabs(prev => new Set([...prev, tabId]))
    
    // Check if all tabs are completed
    const newCompletedTabs = new Set([...completedTabs, tabId])
    if (newCompletedTabs.size === safeTabs.length && !isConceptComplete) {
      setIsConceptComplete(true)
      onMarkComplete?.()
    }
  }

  const handleNext = () => {
    if (currentTabIndex < safeTabs.length - 1) {
      handleTabComplete(activeTab)
      setActiveTab(safeTabs[currentTabIndex + 1].id)
      
      // Scroll to the tabs area when moving to next tab
      setTimeout(() => {
        const tabsElement = document.querySelector('[role="tablist"]');
        if (tabsElement) {
          tabsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      setActiveTab(safeTabs[currentTabIndex - 1].id)
      
      // Scroll to the tabs area when moving to previous tab
      setTimeout(() => {
        const tabsElement = document.querySelector('[role="tablist"]');
        if (tabsElement) {
          tabsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-base mt-2">{description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-2">Learning Progress</div>
              <Progress value={progress} className="w-32" />
              <div className="text-xs text-muted-foreground mt-1">
                {completedTabs.size} of {safeTabs.length} completed
              </div>
            </div>
          </div>
          
          {/* Audio Narration Controls */}
          {enableAudioNarration && (
            <AudioNarrationControls 
              componentName={conceptId}
              position="embedded"
            />
          )}
        </CardHeader>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          {safeTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center gap-2 h-auto py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex items-center gap-2">
                {levelIcons[tab.level]}
                {completedTabs.has(tab.id) && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{tab.title}</div>
                <span className={`text-sm font-medium mt-1 ${levelColors[tab.level]}`}>
                  {tab.level}
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {safeTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            {/* Tab Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {levelIcons[tab.level]}
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {tab.title}
                        <span className={`text-sm font-medium ${levelColors[tab.level]}`}>
                          {tab.level}
                        </span>
                        {/* Ask AI button inline with title */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <EnlightenMeButton
                                  title={tab.title}
                                  contextDescription={tab.description}
                                  mode="inline"
                                  className="ml-2"
                                  size="xs"
                                  visual="ghost"
                                  iconOnly
                                  hideHotkeyHint
                                />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>Ask AI</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>
                      <CardDescription className="mt-1">{tab.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tab Content */}
            <div className="space-y-6">
              {tab.content}
            </div>

            {/* Navigation */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between relative">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentTabIndex === 0}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2 relative z-20">
                    <Button
                      variant="outline"
                      onClick={() => handleTabComplete(activeTab)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Complete
                    </Button>

                    {currentTabIndex < safeTabs.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        className="flex items-center gap-2"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      nextConcept && (
                        <Button
                          onClick={() => {
                            handleTabComplete(activeTab)
                            onNavigateToNext?.(nextConcept.id)
                          }}
                          className="flex items-center gap-2"
                        >
                          Next: {nextConcept.title}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}



