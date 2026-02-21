import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Gear, GraduationCap, ArrowRight, ArrowLeft, CheckCircle, Question } from "@phosphor-icons/react"
import EnlightenMeButton from '@/components/enlighten/EnlightenMeButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AudioNarrationControls from '@/components/audio/AudioNarrationControls';
import { addUnknown } from '@/lib/data/studyMode/unknownsTracker';
import { useToast } from '@/components/ui/use-toast';

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
  fundamentals: 'text-emerald-700 dark:text-emerald-300',
  architecture: 'text-blue-700 dark:text-blue-300',
  implementation: 'text-amber-700 dark:text-amber-300',
  advanced: 'text-violet-700 dark:text-violet-300'
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
  // All hooks must be called before any early return
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || '')
  const [completedTabs, setCompletedTabs] = useState<Set<string>>(new Set())
  const [isConceptComplete, setIsConceptComplete] = useState(false)
  const [showPredictFirstNudge, setShowPredictFirstNudge] = useState(true)
  const { toast: showToast } = useToast()

  useEffect(() => {
    try {
      const key = 'oas.predictFirstNudgeSeen'
      const alreadySeen = sessionStorage.getItem(key)
      if (alreadySeen) {
        setShowPredictFirstNudge(false)
        return
      }
      sessionStorage.setItem(key, '1')
    } catch {
      // no-op when storage is unavailable
    }
  }, [])

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

  // If using children pattern (no tabs), render simple layout
  if (children && (!tabs || tabs.length === 0)) {
    return (
      <div data-concept-id={conceptId} className="container mx-auto px-4 py-6 max-w-6xl">
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

  // Tabs-based layout
  return (
    <div data-concept-id={conceptId} className="space-y-6">
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
              className="group flex flex-col items-center gap-2 h-auto py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex items-center gap-2">
                {levelIcons[tab.level]}
                {completedTabs.has(tab.id) && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{tab.title}</div>
                <span className={`text-sm font-medium mt-1 ${levelColors[tab.level]} group-data-[state=active]:text-primary-foreground/95`}>
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
                    <div className="flex flex-col items-start gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const tabTitle = currentTab?.title || title;
                          addUnknown(conceptId, `I need to understand: ${tabTitle}`, 3);
                          showToast({
                            title: "Added to your learning edges",
                            description: "Identifying unknowns is the most productive step. Check Study Mode to track your progress.",
                          });
                        }}
                        className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-xs"
                      >
                        <Question className="w-4 h-4" />
                        I don't understand this yet
                      </Button>
                      {showPredictFirstNudge && (
                        <p className="px-2 text-[11px] text-muted-foreground">
                          Predict first: in one sentence, what changes in your agent after this section?
                        </p>
                      )}
                    </div>
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












