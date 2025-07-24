import { Separator } from "@/components/ui/separator"
import ConceptsHub from "./ConceptsHub"
import ReferenceSection from "../references/ReferenceSection"
import { SmartPageAnalytics } from "../tutorial/SmartPageAnalytics"
import { FloatingContextualHelp, useFloatingContextualHelp } from "../tutorial/FloatingContextualHelp"
import { PageSynopsis } from "../tutorial/EnhancedTutorialButton"
import { Brain, ArrowsHorizontal, Shield, Stack } from "@phosphor-icons/react"
import { CriticalThinkingModal } from "../common/CriticalThinkingModal"
import { useState } from "react"

// Define the page synopsis for Core Concepts
const coreConceptsSynopsis: PageSynopsis = {
  title: "Core Concepts",
  description: "Master the fundamental concepts of AI agents through interactive learning experiences",
  estimatedTime: "2-3 hours",
  keyFeatures: [
    "Progressive learning path with prerequisites",
    "Interactive demonstrations and examples", 
    "Hands-on exercises and code samples",
    "Real-world implementation guidance"
  ],
  learningCategories: [
    {
      name: "AI Agents",
      description: "Learn about autonomous AI systems",
      difficulty: "beginner",
      icon: <Brain className="w-4 h-4" />
    },
    {
      name: "A2A Communication",
      description: "Agent-to-agent communication patterns",
      difficulty: "intermediate",
      icon: <ArrowsHorizontal className="w-4 h-4" />
    },
    {
      name: "Model Context Protocol",
      description: "Secure tool integration for AI agents",
      difficulty: "intermediate",
      icon: <Shield className="w-4 h-4" />
    },
    {
      name: "Agent Communication Protocol",
      description: "Advanced coordination protocols",
      difficulty: "advanced",
      icon: <Stack className="w-4 h-4" />
    }
  ]
}

export default function ConceptsExplorer() {
  const { isVisible, hideHelp, showHelp, toggleHelp } = useFloatingContextualHelp("core-concepts", 5000)
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null) // Track selected concept

  // Determine the question based on the selected concept
  const getCriticalThinkingQuestion = () => {
    if (!selectedConcept) return "What are the key challenges in understanding core concepts?"

    switch (selectedConcept) {
      case "agent-architecture":
        return "What are the fundamental principles of agent architecture?"
      case "agent-security":
        return "How would you design a secure AI agent system?"
      case "multi-agent-systems":
        return "What are the key challenges in coordinating multi-agent systems?"
      default:
        return "How does this concept apply to real-world AI agent development?"
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Core Concepts</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master the fundamental concepts of AI agents through interactive learning experiences
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          Critical Thinking Challenge
        </button>
      </div>

      <Separator />

      {/* Main Content */}
      <ConceptsHub onSelectConcept={setSelectedConcept} />

      {/* References */}
      <div className="mt-12">
        <ReferenceSection type="concept" itemId="core-concepts" />
      </div>

      {/* SmartPageAnalytics - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50">
        <SmartPageAnalytics
          pageKey="core-concepts"
          pageTitle="Core Concepts"
          onRecommendationClick={(recommendation) => {
            console.log('Recommendation clicked:', recommendation)
          }}
        />
      </div>

      {/* FloatingContextualHelp - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50">
        <FloatingContextualHelp
          pageSynopsis={coreConceptsSynopsis}
          pageKey="core-concepts"
          isVisible={isVisible}
          onClose={hideHelp}
          onToggle={toggleHelp}
          onStartTutorial={() => {
            console.log('Starting tutorial for Core Concepts')
          }}
        />
      </div>

      {/* Critical Thinking Modal */}
      <CriticalThinkingModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        question={getCriticalThinkingQuestion()}
        contextTitle={selectedConcept ? selectedConcept : "Core Concepts"}
      />
    </div>
  )
}