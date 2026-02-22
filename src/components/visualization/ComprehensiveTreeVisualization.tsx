import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Card UI replaced by bespoke modern atlas stat cards styling (see main.css additions)
import D3TreeVisualization from '@/components/visualization/D3TreeVisualization';
const HybridAtlasVisualization = lazy(() => import('@/components/visualization/HybridAtlasVisualization'));
import { 
  Brain, 
  Gear as Cog, 
  CloudArrowUp, 
  Target,
  Tree,
  ChartLineUp,
  Lightbulb,
  CirclesFour,
  TreeStructure
} from '@phosphor-icons/react';
// Lazy load heavy study mode data only when this visualization mounts
import { loadStudyModeData, flattenQuestions } from '@/lib/data/studyMode/lazy';
import { getAllQuestions } from '@/lib/data/quizzes';
import { agentPatterns } from '@/lib/data/patterns';
import { useCountUp, formatNumber } from '@/hooks/useCountUp';

// Types
interface TreeNode {
  id: string;
  name: string;
  type: 'root' | 'category' | 'concept' | 'pattern' | 'service' | 'quiz' | 'tab';
  description?: string;
  icon?: React.ReactNode;
  progress?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number;
  prerequisites?: string[];
  children?: TreeNode[];
  metadata?: {
    totalQuestions?: number;
    completedQuestions?: number;
    tier?: number;
    subCategory?: string;
    businessUseCase?: string;
    securityLevel?: string;
    codeExamples?: number;
  };
}

// Azure services data
const azureServicesData = [
  {
    id: 'azure-openai',
    name: 'Azure OpenAI',
    description: 'GPT-5, GPT-4o, o3 reasoning models, real-time audio, and embeddings',
    estimatedTime: 30
  },
  {
    id: 'microsoft-agent-framework',
    name: 'Agent Framework',
    description: 'Open-source SDK unifying Semantic Kernel & AutoGen for multi-agent orchestration',
    estimatedTime: 35
  },
  {
    id: 'azure-ai-foundry',
    name: 'Microsoft Foundry',
    description: 'Unified platform for building, deploying, and governing AI agents',
    estimatedTime: 25
  },
  {
    id: 'azure-ai-agent-service',
    name: 'Foundry Agent Service',
    description: 'Managed runtime for production-ready agents with built-in tools and safety',
    estimatedTime: 30
  },
  {
    id: 'azure-ai-search',
    name: 'Azure AI Search',
    description: 'Vector, hybrid, and semantic search for RAG and agent grounding',
    estimatedTime: 25
  }
];

import { CORE_CONCEPT_IDS, CORE_CONCEPT_COUNT } from '@/constants/concepts';

// Pre-compute static lengths outside component to avoid repeated heavy work
const TOTAL_QUIZ_QUESTIONS = getAllQuestions().length;

export default function ComprehensiveTreeVisualization() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [showStudyDetails, setShowStudyDetails] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [viewMode, setViewMode] = useState<'hybrid' | 'tree'>('hybrid'); // Default to hybrid sunburst

  const [socraticCount, setSocraticCount] = useState(0);
  const [scenarioCount, setScenarioCount] = useState(0);
  const [debugCount, setDebugCount] = useState(0);
  const [sclScenariosCount] = useState(8); // static placeholder
  const studyCount = socraticCount + scenarioCount + debugCount + sclScenariosCount;

  // Animated counters (respect reduced motion)
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animationOpts = prefersReducedMotion ? { durationMs: 0 } : undefined;
  const conceptsAnimated = useCountUp(CORE_CONCEPT_COUNT, animationOpts);
  const patternsAnimated = useCountUp(agentPatterns.length, animationOpts);
  const azureAnimated = useCountUp(12, animationOpts);
  const questionsAnimated = useCountUp(TOTAL_QUIZ_QUESTIONS, animationOpts);
  const studyAnimated = useCountUp(studyCount, animationOpts);

  useEffect(() => {
    (async () => {
      try {
        const bundle = await loadStudyModeData();
        const all = flattenQuestions(bundle);
        setSocraticCount(all.filter(q => q.type === 'socratic').length);
        setScenarioCount(all.filter(q => q.type === 'scenario').length);
        setDebugCount(all.filter(q => q.type === 'debug').length);
      } catch (e) {
        console.warn('Failed to load study mode counts lazily', e);
      }
    })();
  }, []);

  // Handle navigation for leaf nodes
  const handleNodeSelect = (node: TreeNode) => {
    // For leaf nodes (concept, pattern, service, quiz), navigate to appropriate page
    if (['concept', 'pattern', 'service', 'quiz'].includes(node.type)) {
      switch (node.type) {
        case 'concept':
          navigate(`/concepts/${node.id}`); // Navigate to specific concept
          break;
        case 'pattern':
          navigate(`/patterns/${node.id}`); // Navigate to specific pattern
          break;
        case 'service':
          navigate(`/azure-services/${node.id}`); // Navigate to specific service
          break;
        case 'quiz':
          // Check if it's a study mode question
          if (node.id.startsWith('study-')) {
            navigate('/study-mode'); // Study Mode page
          } else {
            navigate(`/quiz/${node.id}`); // Navigate to specific quiz
          }
          break;
      }
    } else {
      // For non-leaf nodes, just select them (expand/collapse behavior)
      setSelectedNode(node);
    }
  };

 // D3TreeVisualization uses its own internal tree data; no need to generate here

  return (
    <div className={`w-full min-h-screen bg-white dark:bg-gray-900 ${highContrast ? 'atlas-high-contrast' : ''}`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Tree className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Agent School Learning Atlas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
              Your panoramic map of the agentic mastery journey — explore every concept, pattern, skill, service and assessment path in one living, exportable knowledge space.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
              <button
                type="button"
                onClick={() => setViewMode('hybrid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'hybrid'
                    ? 'bg-indigo-600 !text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-pressed={viewMode === 'hybrid'}
              >
                <CirclesFour className="w-4 h-4" />
                <span className="hidden sm:inline">Sunburst</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('tree')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'tree'
                    ? 'bg-indigo-600 !text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-pressed={viewMode === 'tree'}
              >
                <TreeStructure className="w-4 h-4" />
                <span className="hidden sm:inline">Tree</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast(v => !v)}
              aria-pressed={highContrast}
              className="detail-toggle !text-[10px] md:!text-[11px]"
            >
              {highContrast ? 'Normal Contrast' : 'High Contrast'}
            </button>
          </div>
        </div>

        {/* Modern Statistics Cards */}
        <div className="atlas-stats-grid">
          <div className="atlas-stat-card group" aria-label={`${CORE_CONCEPT_COUNT} core concepts total`} data-atlas-item="0">
            <div className="flex items-start gap-3">
              <div className="icon-wrap from-sky-500/20 to-cyan-400/10 ring-sky-400/30">
                <Brain className="w-5 h-5 text-sky-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="stat-number gradient-text-blue" aria-live="polite">{formatNumber(conceptsAnimated)}</span>
                  <span className="stat-label">Core Concepts</span>
                </div>
                <p className="subtext">Foundational learning primitives.</p>
              </div>
            </div>
            <span className="accent-bar" />
          </div>

          <div className="atlas-stat-card group" aria-label={`${agentPatterns.length} agent patterns`} data-atlas-item="1">
            <div className="flex items-start gap-3">
              <div className="icon-wrap from-amber-500/25 to-yellow-400/10 ring-amber-400/30">
                <Cog className="w-5 h-5 text-amber-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="stat-number gradient-text-amber" aria-live="polite">{formatNumber(patternsAnimated)}</span>
                  <span className="stat-label">Agent Patterns</span>
                </div>
                <p className="subtext">Composable orchestration blueprints.</p>
              </div>
            </div>
            <span className="accent-bar" />
          </div>

            <div className="atlas-stat-card group" aria-label="12+ Azure AI services" data-atlas-item="2">
              <div className="flex items-start gap-3">
                <div className="icon-wrap from-emerald-500/25 to-green-400/10 ring-emerald-400/30">
                  <CloudArrowUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="stat-number gradient-text-emerald" aria-live="polite">{formatNumber(azureAnimated)}+</span>
                    <span className="stat-label">Azure Services</span>
                  </div>
                  <p className="subtext">Integration & capability surface.</p>
                </div>
              </div>
              <span className="accent-bar" />
            </div>

            <div className="atlas-stat-card group" aria-label={`${TOTAL_QUIZ_QUESTIONS} quiz questions`} data-atlas-item="3">
              <div className="flex items-start gap-3">
                <div className="icon-wrap from-violet-500/25 to-fuchsia-500/10 ring-violet-400/30">
                  <Target className="w-5 h-5 text-violet-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="stat-number gradient-text-violet" aria-live="polite">{formatNumber(questionsAnimated)}</span>
                    <span className="stat-label">Quiz Questions</span>
                  </div>
                  <p className="subtext">Assessment pathways.</p>
                </div>
              </div>
              <span className="accent-bar" />
            </div>

            <div className="atlas-stat-card group" aria-label={`${studyCount} study activities total`} data-atlas-item="4">
              <div className="flex items-start gap-3">
                <div className="icon-wrap from-indigo-500/25 to-sky-500/10 ring-indigo-400/30">
                  <Lightbulb className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="stat-number gradient-text-indigo" aria-live="polite">{formatNumber(studyAnimated)}</span>
                    <span className="stat-label">Study Activities</span>
                    <button
                      type="button"
                      onClick={() => setShowStudyDetails(v => !v)}
                      className="detail-toggle"
                      aria-expanded={showStudyDetails}
                      aria-controls="study-activities-detail-grid"
                    >
                      {showStudyDetails ? 'Hide' : 'Breakdown'}
                    </button>
                  </div>
                  <div className="hidden sm:flex gap-2 flex-wrap text-[11px] text-muted-foreground">
                    <span className="pill">Soc {socraticCount}</span>
                    <span className="pill">Int {scenarioCount}</span>
                    <span className="pill">Dbg {debugCount}</span>
                    <span className="pill">SCL {sclScenariosCount}</span>
                  </div>
                  <div className="sm:hidden text-[10px] text-gray-600 dark:text-gray-400 leading-snug">
                    Soc {socraticCount} • Int {scenarioCount} • Dbg {debugCount} • SCL {sclScenariosCount}
                  </div>
                  <div
                    id="study-activities-detail-grid"
                    className={`grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-[11px] leading-tight ${showStudyDetails ? 'grid' : 'hidden'}`}
                  >
                    <button type="button" onClick={() => navigate('/study-mode#socratic')} className="detail-link">Socratic Discovery<span>{socraticCount}</span></button>
                    <button type="button" onClick={() => navigate('/study-mode#scenario')} className="detail-link">Interactive Scenarios<span>{scenarioCount}</span></button>
                    <button type="button" onClick={() => navigate('/study-mode#debug')} className="detail-link">Debug Challenges<span>{debugCount}</span></button>
                    <button type="button" onClick={() => navigate('/study-mode#scl')} className="detail-link">SCL<span>{sclScenariosCount}</span></button>
                  </div>
                </div>
              </div>
              <span className="accent-bar" />
            </div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="tree-center-wrapper">
        {viewMode === 'hybrid' ? (
          <div className="flex-1 w-full max-w-5xl mx-auto p-6">
            <Suspense fallback={
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
              </div>
            }>
              <HybridAtlasVisualization 
                onNodeSelect={(node) => {
                  // Handle node selection if needed
                }}
              />
            </Suspense>
          </div>
        ) : (
          <div className="flex-1 tree-container" style={{ minHeight: '1000px', maxWidth: '1400px' }}>
            <D3TreeVisualization
              selectedNode={selectedNode}
              onNodeSelect={handleNodeSelect}
              className="h-auto"
            />
          </div>
        )}
      </div>

    </div>
  );
}
