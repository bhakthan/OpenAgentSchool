import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import D3TreeVisualization from '@/components/visualization/D3TreeVisualization';
import { 
  Brain, 
  Gear as Cog, 
  CloudArrowUp, 
  Target,
  Tree,
  ChartLineUp,
  Lightbulb
} from '@phosphor-icons/react';
// Lazy load heavy study mode data only when this visualization mounts
import { loadStudyModeData, flattenQuestions } from '@/lib/data/studyMode/lazy';
import { getAllQuestions } from '@/lib/data/quizzes';
import { agentPatterns } from '@/lib/data/patterns';

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
    description: 'Large language model integration and deployment',
    estimatedTime: 30
  },
  {
    id: 'azure-ai-search',
    name: 'Azure AI Search',
    description: 'Intelligent search capabilities for AI agents',
    estimatedTime: 25
  },
  {
    id: 'document-intelligence',
    name: 'Document Intelligence',
    description: 'Document processing and understanding services',
    estimatedTime: 35
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    description: 'Image and video analysis capabilities',
    estimatedTime: 40
  }
];

export default function ComprehensiveTreeVisualization() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [showStudyDetails, setShowStudyDetails] = useState(false);

  const [socraticCount, setSocraticCount] = useState(0);
  const [scenarioCount, setScenarioCount] = useState(0);
  const [debugCount, setDebugCount] = useState(0);
  const [sclScenariosCount] = useState(8); // static placeholder
  const studyCount = socraticCount + scenarioCount + debugCount + sclScenariosCount;

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
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
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
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Core Concepts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Cog className="w-8 h-8 text-amber-600" />
                <div>
                  <div className="text-2xl font-bold">{agentPatterns.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Agent Patterns</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CloudArrowUp className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">12+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Azure Services</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{getAllQuestions().length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Quiz Questions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-8 h-8 text-indigo-600 mt-1" />
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">{studyCount}</div>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border border-indigo-300/40">Total</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Study Activities</div>
                  {/* Compact summary for small screens */}
                  <div className="sm:hidden mt-2 text-[10px] text-gray-600 dark:text-gray-400 leading-snug">
                    <span className="font-medium">Breakdown:</span>{' '}
                    <abbr title="Socratic Questions" className="cursor-help underline decoration-dotted underline-offset-2">Soc</abbr> {socraticCount} •{' '}
                    <abbr title="Interactive Scenarios" className="cursor-help underline decoration-dotted underline-offset-2">Scn</abbr> {scenarioCount} •{' '}
                    <abbr title="Debug Challenges" className="cursor-help underline decoration-dotted underline-offset-2">Dbg</abbr> {debugCount} •{' '}
                    <abbr title="Super Critical Learning Sessions" className="cursor-help underline decoration-dotted underline-offset-2">SCL</abbr> {sclScenariosCount}
                    <button
                      type="button"
                      onClick={() => setShowStudyDetails(v => !v)}
                      className="ml-2 text-indigo-600 dark:text-indigo-300 hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded px-1"
                      aria-expanded={showStudyDetails}
                      aria-controls="study-activities-detail-grid"
                    >
                      {showStudyDetails ? 'Hide' : 'Details'}
                    </button>
                  </div>
                  <div
                    id="study-activities-detail-grid"
                    className={`grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-[11px] leading-tight ${showStudyDetails ? 'grid' : 'hidden'} sm:grid`}
                    aria-hidden={!showStudyDetails && typeof window !== 'undefined' && window.innerWidth < 640}
                  >
                    <button
                      type="button"
                      onClick={() => navigate('/study-mode#socratic')}
                      className="flex justify-between rounded px-1 py-0.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      aria-label="View Socratic Study Mode"
                    >
                      <span>Socratic</span><span className="font-medium">{socraticCount}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/study-mode#scenario')}
                      className="flex justify-between rounded px-1 py-0.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      aria-label="View Scenario Study Mode"
                    >
                      <span>Scenarios</span><span className="font-medium">{scenarioCount}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/study-mode#debug')}
                      className="flex justify-between rounded px-1 py-0.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      aria-label="View Debug Study Mode"
                    >
                      <span>Debug</span><span className="font-medium">{debugCount}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/study-mode#scl')}
                      className="flex justify-between rounded px-1 py-0.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      aria-label="View Super Critical Learning Mode"
                    >
                      <span>SCL</span><span className="font-medium">{sclScenariosCount}</span>
                    </button>
                  </div>
                  {/* Removed separate SCL scenarios badge & link (redundant with breakdown) */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="tree-center-wrapper">
        <div className="flex-1 tree-container" style={{ minHeight: '1000px', maxWidth: '1400px' }}>
          <D3TreeVisualization
            selectedNode={selectedNode}
            onNodeSelect={handleNodeSelect}
            className="h-auto"
          />
        </div>
      </div>

    </div>
  );
}
