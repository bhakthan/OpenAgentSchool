import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
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
import { getAllStudyModeQuestions } from '@/lib/data/studyMode';

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
              AI Agent Learning Tree
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive D3.js visualization of comprehensive AI agent education platform
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
                  <div className="text-2xl font-bold">22</div>
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
                  <div className="text-2xl font-bold">27</div>
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
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Quiz Questions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-indigo-600" />
                <div>
                  <div className="text-2xl font-bold">{getAllStudyModeQuestions().length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Study Questions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="flex-1" style={{ minHeight: '1000px' }}>
        <D3TreeVisualization
          selectedNode={selectedNode}
          onNodeSelect={handleNodeSelect}
          className="h-auto"
        />
      </div>

    </div>
  );
}
