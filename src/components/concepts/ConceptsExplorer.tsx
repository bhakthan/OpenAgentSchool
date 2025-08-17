import { Separator } from "@/components/ui/separator"
import { SmartPageAnalytics } from "../tutorial/SmartPageAnalytics"
import { CriticalThinkingModal } from "../common/CriticalThinkingModal"
import { useState, Suspense, lazy, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { LandingHero } from "../landing/LandingHero"

// Lazy load heavy components
const ConceptsHub = lazy(() => import("./ConceptsHub"))
const ReferenceSection = lazy(() => import("../references/ReferenceSection"))

// Loading component
const ConceptsLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default function ConceptsExplorer() {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState<string | null>(conceptId || null) // Track selected concept

  // Update selected concept when URL parameter changes
  useEffect(() => {
    if (conceptId) {
      setSelectedConcept(conceptId);
    } else {
      setSelectedConcept(null);
    }
  }, [conceptId]);

  // Handle concept selection with navigation
  const handleConceptSelection = (conceptId: string | null) => {
    if (conceptId === null) {
      // Navigate back to the main concepts page
      navigate('/');
    } else {
      // Navigate to specific concept
      navigate(`/concepts/${conceptId}`);
    }
    setSelectedConcept(conceptId);
    
    // Scroll to top after navigation to ensure the new concept content is visible
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

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
    <div className="space-y-0">
      {/* Landing Hero Section - Only show when no concept is selected */}
      {!selectedConcept && <LandingHero />}
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto space-y-8 relative px-4 py-8">

      {/* Main Content */}
      <Suspense fallback={<ConceptsLoader />}>
        <ConceptsHub onSelectConcept={handleConceptSelection} initialConcept={selectedConcept} />
      </Suspense>

      {/* References */}
      <div className="mt-12">
        <Suspense fallback={<ConceptsLoader />}>
          <ReferenceSection type="concept" itemId="core-concepts" />
        </Suspense>
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

      {/* Critical Thinking Modal */}
      <CriticalThinkingModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        question={getCriticalThinkingQuestion()}
        contextTitle={selectedConcept ? selectedConcept : "Core Concepts"}
        conceptArea={selectedConcept || "Core Concepts"}
        source="core-concepts"
        context={{
          difficulty: "intermediate",
          evaluationCriteria: [
            "Understanding of fundamental concepts",
            "Application to real-world scenarios",
            "Recognition of potential challenges",
            "Integration with other AI agent concepts"
          ]
        }}
      />
      </div>
    </div>
  )
}


