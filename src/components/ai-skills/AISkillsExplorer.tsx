import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Code, Users, Lightbulb, Rocket, ChartBar, Target, Calculator } from "@phosphor-icons/react"
import AISkillsFundamentals from "./AISkillsFundamentals"
import InteractiveVisualizations from "./InteractiveVisualizations"
import SystemsThinkingTree from "./SystemsThinkingTree"
import FrontierFirmAssessment from "./FrontierFirmAssessment"
import HumanAgentRatioCalculator from "./HumanAgentRatioCalculator"
import CodeUnderstandingSkills from "./CodeUnderstandingSkills"
import DevelopmentVelocitySkills from "./DevelopmentVelocitySkills"
import CrossTeamCollaborationSkills from "./CrossTeamCollaborationSkills"
import NovelOrganizationalPatterns from "./NovelOrganizationalPatterns"

export default function AISkillsExplorer() {
  const [activeTab, setActiveTab] = useState("fundamentals")

  // Navigation function to move to next tab
  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId)
    // Scroll to top when changing tabs
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tabs = [
    {
      id: "fundamentals",
      title: "Fundamentals",
      description: "What are AI-Native Practices?",
      icon: <Brain className="w-4 h-4" />,
      level: "Beginner",
      component: <AISkillsFundamentals onNavigate={() => navigateToTab("interactive-visualizations")} navigateToTab={navigateToTab} />
    },
    {
      id: "thinking-modes",
      title: "Thinking Modes",
      description: "Design vs Breakthrough vs Systems Thinking",
      icon: <Brain className="w-4 h-4" />,
      level: "Beginner",
      component: <SystemsThinkingTree />
    },
    {
      id: "interactive-visualizations",
      title: "Interactive Visualizations",
      description: "Explore AI-native practices in detail",
      icon: <ChartBar className="w-4 h-4" />,
      level: "Beginner",
      component: <InteractiveVisualizations onNavigate={() => navigateToTab("assessment")} />
    },
    {
      id: "assessment",
      title: "Frontier Assessment",
      description: "Evaluate your organization's AI readiness",
      icon: <Target className="w-4 h-4" />,
      level: "Intermediate",
      component: <FrontierFirmAssessment onNavigate={() => navigateToTab("calculator")} />
    },
    {
      id: "calculator",
      title: "Ratio Calculator",
      description: "Optimize human-agent ratios",
      icon: <Calculator className="w-4 h-4" />,
      level: "Intermediate",
      component: <HumanAgentRatioCalculator onNavigate={() => navigateToTab("code-understanding")} />
    },
    {
      id: "code-understanding",
      title: "Code Understanding",
      description: "Navigation, debugging & tracing",
      icon: <Code className="w-4 h-4" />,
      level: "Intermediate",
      component: <CodeUnderstandingSkills onNavigate={() => navigateToTab("development-velocity")} />
    },
    {
      id: "development-velocity",
      title: "Development Velocity",
      description: "Rapid scaffolding & async workflows",
      icon: <Rocket className="w-4 h-4" />,
      level: "Advanced",
      component: <DevelopmentVelocitySkills onNavigate={() => navigateToTab("cross-team")} />
    },
    {
      id: "cross-team",
      title: "Cross-Team Collaboration",
      description: "Non-technical teams using AI",
      icon: <Users className="w-4 h-4" />,
      level: "Advanced",
      component: <CrossTeamCollaborationSkills onNavigate={() => navigateToTab("novel-patterns")} />
    },
    {
      id: "novel-patterns",
      title: "Novel Patterns",
      description: "Revolutionary organizational practices",
      icon: <Lightbulb className="w-4 h-4" />,
      level: "Expert",
      component: <NovelOrganizationalPatterns onNavigate={() => {}} />
    }
  ]

  // Accessible AI-native skills badge styles via CSS variables
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "ring-1 bg-[var(--badge-beginner-bg)] ring-[var(--badge-beginner-ring)] text-[var(--badge-beginner-text)] dark:text-[var(--badge-beginner-text)]"
      case "Intermediate":
        return "ring-1 bg-[var(--badge-intermediate-bg)] ring-[var(--badge-intermediate-ring)] text-[var(--badge-intermediate-text)] dark:text-[var(--badge-intermediate-text)]"
      case "Advanced":
        return "ring-1 bg-[var(--badge-advanced-skill-bg)] ring-[var(--badge-advanced-skill-ring)] text-[var(--badge-advanced-skill-text)] dark:text-[var(--badge-advanced-skill-text)]"
      case "Expert":
        return "ring-1 bg-[var(--badge-expert-bg)] ring-[var(--badge-expert-ring)] text-[var(--badge-expert-text)] dark:text-[var(--badge-expert-text)]"
      default:
        return "ring-1 bg-muted ring-border text-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">71%</div>
              <div className="text-sm text-muted-foreground">of employees are bringing their own AI to work</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">2.9x</div>
              <div className="text-sm text-muted-foreground">productivity increase for Frontier Firms</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">74%</div>
              <div className="text-sm text-muted-foreground">believe AI will make them more creative</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">132%</div>
              <div className="text-sm text-muted-foreground">increase in strategic thinking time</div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Learning Path Overview</CardTitle>
            <CardDescription>
              Progressive skill development from understanding AI-native mindset to implementing revolutionary organizational patterns. Now enhanced with Microsoft's 2025 Work Trend Index insights and interactive assessment tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {tabs.map((tab, index) => (
                <div key={tab.id} className="relative">
                  {index < tabs.length - 1 && (
                    <div className="hidden md:block absolute top-6 right-0 w-full h-0.5 bg-border z-0" />
                  )}
                  <div className="relative z-10 bg-background p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      {tab.icon}
                      <Badge className={getLevelColor(tab.level)} variant="secondary">
                        {tab.level}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-base mb-1">{tab.title}</h3>
                    <p className="text-sm text-muted-foreground">{tab.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 h-auto p-1">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
        className="flex items-center gap-1 px-2 py-1.5 text-sm md:text-sm lg:text-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                {tab.icon}
        <span className="hidden sm:inline text-sm md:text-sm lg:text-sm xl:text-base truncate" title={tab.title}>{tab.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{tab.title}</h2>
                  <Badge className={getLevelColor(tab.level)} variant="secondary">
                    {tab.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{tab.description}</p>
              </div>
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
