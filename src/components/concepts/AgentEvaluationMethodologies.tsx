import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  ChartBar, 
  MagnifyingGlass,
  ClipboardText,
  Target,
  Scales,
  Trophy,
  Warning,
  Info,
  TrendUp
} from "@phosphor-icons/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import ReferenceSection from "@/components/references/ReferenceSection";
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton";

interface AgentEvaluationMethodologiesProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const AgentEvaluationMethodologies: React.FC<AgentEvaluationMethodologiesProps> = ({
  onMarkComplete,
  onNavigateToNext
}) => {
  const [evaluationType, setEvaluationType] = useState<'quantitative' | 'qualitative' | 'hybrid'>('hybrid');
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'robustness' | 'efficiency' | 'quality'>('accuracy');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <ChartBar className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold">Agent Evaluation Methodologies</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn systematic approaches to measuring and improving agent performance through comprehensive evaluation frameworks
        </p>
      </div>

      {/* Evaluation Framework Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scales className="w-6 h-6 text-primary" />
            Comprehensive Evaluation Framework
          </CardTitle>
          <CardDescription>
            Understanding the multi-dimensional nature of agent evaluation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              evaluationType === 'quantitative' ? 'bg-gray-50 dark:bg-gray-800 border-blue-300' : ''
            }`} onClick={() => setEvaluationType('quantitative')}>
              <div className="flex items-center gap-2 mb-2">
                <ChartBar className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold">Quantitative Metrics</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Objective, measurable performance indicators
              </p>
              <ul className="text-sm space-y-1">
                <li>• Accuracy percentages</li>
                <li>• Response time measurements</li>
                <li>• Memory usage tracking</li>
                <li>• Success/failure rates</li>
                <li>• Throughput metrics</li>
              </ul>
            </div>

            <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              evaluationType === 'qualitative' ? 'bg-gray-50 dark:bg-gray-800 border-green-300' : ''
            }`} onClick={() => setEvaluationType('qualitative')}>
              <div className="flex items-center gap-2 mb-2">
                <ClipboardText className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold">Qualitative Assessment</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Subjective quality and usability evaluation
              </p>
              <ul className="text-sm space-y-1">
                <li>• Code quality ratings</li>
                <li>• User experience scores</li>
                <li>• Content coherence</li>
                <li>• Task adherence levels</li>
                <li>• Communication clarity</li>
              </ul>
            </div>

            <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              evaluationType === 'hybrid' ? 'bg-gray-50 dark:bg-gray-800 border-purple-300' : ''
            }`} onClick={() => setEvaluationType('hybrid')}>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold">Hybrid Approach</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Combined quantitative and qualitative evaluation
              </p>
              <ul className="text-sm space-y-1">
                <li>• Multi-dimensional scoring</li>
                <li>• LLM-as-judge evaluation</li>
                <li>• Human-AI collaboration metrics</li>
                <li>• Context-aware assessment</li>
                <li>• Holistic performance view</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Evaluation Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Core Evaluation Metrics
          </CardTitle>
          <CardDescription>
            Essential metrics for comprehensive agent performance assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-2">
              <Button
                variant={selectedMetric === 'accuracy' ? 'default' : 'outline'}
                onClick={() => setSelectedMetric('accuracy')}
                size="sm"
              >
                Accuracy
              </Button>
              <Button
                variant={selectedMetric === 'robustness' ? 'default' : 'outline'}
                onClick={() => setSelectedMetric('robustness')}
                size="sm"
              >
                Robustness
              </Button>
              <Button
                variant={selectedMetric === 'efficiency' ? 'default' : 'outline'}
                onClick={() => setSelectedMetric('efficiency')}
                size="sm"
              >
                Efficiency
              </Button>
              <Button
                variant={selectedMetric === 'quality' ? 'default' : 'outline'}
                onClick={() => setSelectedMetric('quality')}
                size="sm"
              >
                Quality
              </Button>
            </div>

            {selectedMetric === 'accuracy' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">Accuracy Measurement</h4>
                  <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# Accuracy Evaluation Framework
def evaluate_accuracy(responses, ground_truth):
    """
    Multi-faceted accuracy assessment
    """
    metrics = {
        'exact_match': calculate_exact_matches(responses, ground_truth),
        'semantic_similarity': calculate_semantic_sim(responses, ground_truth),
        'factual_accuracy': verify_facts(responses),
        'format_compliance': check_format_adherence(responses)
    }
    
    # Weighted accuracy score
    accuracy_score = (
        0.4 * metrics['exact_match'] +
        0.3 * metrics['semantic_similarity'] +
        0.2 * metrics['factual_accuracy'] +
        0.1 * metrics['format_compliance']
    )
    
    return accuracy_score, metrics`}
                  </code>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Accuracy Dimensions</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Factual Correctness</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20" />
                        <span className="text-sm">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Format Compliance</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20" />
                        <span className="text-sm">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Semantic Relevance</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20" />
                        <span className="text-sm">95%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Completeness</span>
                      <div className="flex items-center gap-2">
                        <Progress value={87} className="w-20" />
                        <span className="text-sm">87%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
                    <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">Overall Accuracy: 91%</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Based on weighted scoring across all dimensions</div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'robustness' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">Robustness Testing</h4>
                  <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# Robustness Evaluation Protocol
def evaluate_robustness(agent, test_scenarios):
    """
    Test agent performance under various stress conditions
    """
    robustness_tests = {
        'noisy_input': test_with_corrupted_data(agent),
        'missing_context': test_incomplete_information(agent),
        'contradictory_instructions': test_conflicting_requirements(agent),
        'edge_cases': test_boundary_conditions(agent),
        'adversarial_prompts': test_prompt_injection_resistance(agent)
    }
    
    # Calculate robustness score
    robustness_score = calculate_weighted_score(robustness_tests)
    
    return robustness_score, robustness_tests`}
                  </code>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Robustness Scenarios</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <Badge variant="secondary" className="mb-1">Noisy Input</Badge>
                      <p className="text-sm">Performance with corrupted or incomplete data</p>
                    </div>
                    <div className="p-3 border rounded">
                      <Badge variant="secondary" className="mb-1">Context Shifts</Badge>
                      <p className="text-sm">Adaptation to changing requirements mid-task</p>
                    </div>
                    <div className="p-3 border rounded">
                      <Badge variant="secondary" className="mb-1">Edge Cases</Badge>
                      <p className="text-sm">Handling of boundary conditions and outliers</p>
                    </div>
                    <div className="p-3 border rounded">
                      <Badge variant="secondary" className="mb-1">Stress Testing</Badge>
                      <p className="text-sm">Performance under resource constraints</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'efficiency' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">Efficiency Metrics</h4>
                  <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# Efficiency Evaluation Suite
def evaluate_efficiency(agent_runs):
    """
    Comprehensive efficiency assessment
    """
    efficiency_metrics = {
        'time_performance': {
            'avg_response_time': calculate_avg_time(agent_runs),
            'p95_response_time': calculate_percentile(agent_runs, 95),
            'timeout_rate': calculate_timeout_rate(agent_runs)
        },
        'resource_usage': {
            'peak_memory': measure_peak_memory(agent_runs),
            'avg_memory': measure_avg_memory(agent_runs),
            'cpu_utilization': measure_cpu_usage(agent_runs)
        },
        'cost_efficiency': {
            'tokens_per_task': calculate_token_efficiency(agent_runs),
            'cost_per_success': calculate_cost_effectiveness(agent_runs)
        }
    }
    
    return efficiency_metrics`}
                  </code>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance Results</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded text-center">
                      <div className="text-2xl font-bold text-green-600">-84%</div>
                      <div className="text-sm text-muted-foreground">Memory Usage</div>
                      <div className="text-xs">3626KB → 577KB</div>
                    </div>
                    <div className="p-3 border rounded text-center">
                      <div className="text-2xl font-bold text-blue-600">-12%</div>
                      <div className="text-sm text-muted-foreground">Response Time</div>
                      <div className="text-xs">7.9s → 7.0s</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
                    <h5 className="font-semibold mb-2">Optimization Impact</h5>
                    <p className="text-sm">
                      Prompt optimization resulted in significant efficiency gains while 
                      maintaining 100% accuracy across all test cases.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'quality' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400">Quality Assessment</h4>
                  <code className="text-sm block bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# LLM-as-Judge Quality Evaluation
def evaluate_quality_with_llm_judge(responses, criteria):
    """
    Use LLM to assess subjective quality dimensions
    """
    judge_prompt = f'''
    Evaluate the following response on these criteria:
    {criteria}
    
    For each criterion, provide:
    1. Score (1-5 scale)
    2. Brief justification
    3. Specific examples from the response
    
    Response to evaluate: {response}
    '''
    
    quality_scores = {
        'clarity': judge_clarity(response),
        'coherence': judge_coherence(response),
        'completeness': judge_completeness(response),
        'usefulness': judge_usefulness(response),
        'task_adherence': judge_adherence(response)
    }
    
    return calculate_overall_quality(quality_scores)`}
                  </code>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Quality Dimensions</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Code Quality</span>
                        <Badge>4.90/5</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Clean, maintainable, well-documented code
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Task Adherence</span>
                        <Badge>4.73/5</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Following instructions and meeting requirements
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Communication Clarity</span>
                        <Badge>4.85/5</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Clear explanations and user-friendly responses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* LLM-as-Judge Methodology */}
      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">LLM Judge Setup</TabsTrigger>
          <TabsTrigger value="criteria">Evaluation Criteria</TabsTrigger>
          <TabsTrigger value="prompts">Judge Prompts</TabsTrigger>
          <TabsTrigger value="validation">Result Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MagnifyingGlass className="w-5 h-5" />
                LLM-as-Judge Configuration
              </CardTitle>
              <CardDescription>
                Setting up effective LLM-based evaluation systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>LLM-as-Judge</strong> leverages powerful language models to assess 
                  subjective qualities that are difficult to measure with traditional metrics.
                </AlertDescription>
              </Alert>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Judge Model Selection</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">GPT-5</span>
                        <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Excellent reasoning and evaluation capabilities
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Claude-3.5</span>
                        <Badge variant="secondary">Alternative</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Strong analytical skills, good for complex evaluations
                      </p>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Specialized Models</span>
                        <Badge variant="outline">Domain-Specific</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Fine-tuned models for specific evaluation tasks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Configuration Parameters</h4>
                  <code className="text-sm block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# LLM Judge Configuration
judge_config = {
    "model": "gpt-5",
    "temperature": 0.1,  # Low for consistency
    "max_tokens": 1000,
    "evaluation_format": "structured",
    "scoring_scale": "1-5",
    "require_justification": True,
    "multiple_evaluators": True,  # For reliability
    "consensus_threshold": 0.8
}

# Evaluation Settings
evaluation_settings = {
    "num_judges": 3,  # Multiple judges for reliability
    "blind_evaluation": True,  # Hide model identity
    "randomize_order": True,  # Prevent position bias
    "include_examples": True  # Provide scoring examples
}`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardText className="w-5 h-5" />
                Evaluation Criteria Design
              </CardTitle>
              <CardDescription>
                Creating clear, measurable criteria for consistent evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Financial QA Criteria</h4>
                  <code className="text-sm block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# FailSafeQA Evaluation Criteria
evaluation_criteria = {
    "robustness": {
        "description": "Handles noisy, incomplete, or corrupted input",
        "scale": "1-6",
        "6": "Perfect handling of all input variations",
        "5": "Handles most variations with minor issues",
        "4": "Handles common variations adequately",
        "3": "Some difficulty with input variations",
        "2": "Struggles with most variations",
        "1": "Fails with any input variation"
    },
    "context_grounding": {
        "description": "Uses only provided context, refuses when insufficient",
        "scale": "1-6", 
        "6": "Perfect grounding, appropriate refusals",
        "5": "Good grounding with minor outside knowledge",
        "4": "Mostly grounded with some speculation",
        "3": "Mixed grounding and external knowledge",
        "2": "Frequent use of outside knowledge",
        "1": "Ignores context, relies on external knowledge"
    }
}`}
                  </code>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Coding Task Criteria</h4>
                  <code className="text-sm block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# Coding Evaluation Criteria
coding_criteria = {
    "correctness": {
        "description": "Code runs correctly and produces expected output",
        "weight": 0.4,
        "measurements": ["compilation", "execution", "output_match"]
    },
    "efficiency": {
        "description": "Optimal time and space complexity",
        "weight": 0.25,
        "measurements": ["runtime", "memory_usage", "algorithm_choice"]
    },
    "code_quality": {
        "description": "Clean, readable, maintainable code",
        "weight": 0.25,
        "measurements": ["style", "documentation", "structure"]
    },
    "task_adherence": {
        "description": "Follows all specified requirements",
        "weight": 0.1,
        "measurements": ["constraint_compliance", "format_adherence"]
    }
}`}
                  </code>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                  Criteria Design Best Practices
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Define clear, measurable dimensions</li>
                  <li>• Provide specific examples for each score level</li>
                  <li>• Weight criteria based on task importance</li>
                  <li>• Ensure criteria are independent and non-overlapping</li>
                  <li>• Test criteria with multiple evaluators for consistency</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardText className="w-5 h-5" />
                Judge Prompt Engineering
              </CardTitle>
              <CardDescription>
                Crafting effective prompts for consistent and reliable evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Comprehensive Judge Prompt Template</h4>
                <code className="text-sm block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# LLM Judge Prompt Template
system_prompt = '''
You are an expert evaluator assessing AI agent responses for quality and adherence to requirements.

## Your Role
- Evaluate responses objectively using the provided criteria
- Provide specific scores with detailed justifications
- Focus on measurable aspects of quality
- Maintain consistency across all evaluations

## Evaluation Process
1. Read the original task and requirements carefully
2. Analyze the response against each criterion
3. Assign scores based on the provided rubric
4. Provide specific examples to support your scores
5. Identify both strengths and areas for improvement

## Scoring Guidelines
- Be consistent with the scoring rubric
- Use the full range of the scale when appropriate
- Provide concrete evidence for your scores
- Focus on the quality of the response, not just correctness

## Output Format
For each criterion, provide:
- Score: [1-5]
- Justification: [Specific reasoning with examples]
- Evidence: [Direct quotes or specific observations]

Overall Assessment: [Summary of key findings]
'''

user_prompt = f'''
## Task Description
{task_description}

## Response to Evaluate
{agent_response}

## Evaluation Criteria
{evaluation_criteria}

Please evaluate this response according to the criteria above.
'''`}
                </code>
              </div>

              <Alert>
                <Warning className="h-4 w-4" />
                <AlertDescription>
                  <strong>Prompt Optimization:</strong> Judge prompts should be tested and refined 
                  iteratively to ensure consistent and reliable evaluation results across different tasks.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp className="w-5 h-5" />
                Evaluation Result Validation
              </CardTitle>
              <CardDescription>
                Ensuring reliability and validity of evaluation results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Reliability Measures</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <Badge variant="secondary" className="mb-1">Inter-Judge Agreement</Badge>
                      <p className="text-sm text-muted-foreground">
                        Measure consistency between multiple judges
                      </p>
                      <code className="text-xs block mt-1 p-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
                        Cohen's κ = 0.84 (substantial agreement)
                      </code>
                    </div>
                    <div className="p-3 border rounded">
                      <Badge variant="secondary" className="mb-1">Test-Retest Reliability</Badge>
                      <p className="text-sm text-muted-foreground">
                        Consistency of same judge over time
                      </p>
                      <code className="text-xs block mt-1 p-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
                        Correlation = 0.91 (excellent reliability)
                      </code>
                    </div>
                    <div className="p-3 border rounded">
                      <Badge variant="secondary" className="mb-1">Internal Consistency</Badge>
                      <p className="text-sm text-muted-foreground">
                        Agreement across different criteria
                      </p>
                      <code className="text-xs block mt-1 p-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
                        Cronbach's α = 0.87 (good consistency)
                      </code>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Validation Strategies</h4>
                  <code className="text-sm block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded whitespace-pre-wrap">
{`# Evaluation Validation Pipeline
def validate_evaluation_results(evaluation_data):
    """
    Multi-stage validation of evaluation results
    """
    validation_results = {}
    
    # 1. Statistical validation
    validation_results['inter_rater_reliability'] = (
        calculate_inter_rater_agreement(evaluation_data)
    )
    
    # 2. Outlier detection
    validation_results['outliers'] = (
        detect_scoring_outliers(evaluation_data)
    )
    
    # 3. Bias analysis
    validation_results['bias_analysis'] = (
        analyze_systematic_bias(evaluation_data)
    )
    
    # 4. Human validation sample
    validation_results['human_validation'] = (
        validate_with_human_experts(
            sample_subset(evaluation_data, 0.1)
        )
    )
    
    return validation_results`}
                  </code>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  Validation Results Summary
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Reliability</div>
                    <div className="text-green-600">κ = 0.84 (Substantial)</div>
                  </div>
                  <div>
                    <div className="font-medium">Human Agreement</div>
                    <div className="text-green-600">r = 0.89 (Strong)</div>
                  </div>
                  <div>
                    <div className="font-medium">Bias Detection</div>
                    <div className="text-green-600">Minimal bias found</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Best Practices Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600 dark:text-green-400">✓ Recommended Practices</h4>
              <ul className="space-y-2 text-sm">
                <li>• Use multiple evaluation dimensions (accuracy, efficiency, quality)</li>
                <li>• Combine quantitative metrics with qualitative assessment</li>
                <li>• Implement multiple judge systems for reliability</li>
                <li>• Design task-specific evaluation criteria</li>
                <li>• Validate evaluation systems with human experts</li>
                <li>• Document evaluation methodologies thoroughly</li>
                <li>• Test evaluation consistency across different scenarios</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600 dark:text-red-400">✗ Common Pitfalls</h4>
              <ul className="space-y-2 text-sm">
                <li>• Relying on single-dimensional metrics</li>
                <li>• Using inconsistent evaluation criteria</li>
                <li>• Ignoring edge cases and failure modes</li>
                <li>• Failing to validate evaluation reliability</li>
                <li>• Over-optimizing for specific benchmarks</li>
                <li>• Neglecting user experience factors</li>
                <li>• Insufficient sample sizes for evaluation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <ReferenceSection type="concept" itemId="agent-evaluation-methodologies" />

      {/* EnlightenMe Integration */}
      <EnlightenMeButton 
        title="Agent Evaluation Methodologies"
        contextDescription="Get insights on comprehensive evaluation frameworks, metrics design, and assessment strategies for measuring agent performance and capabilities"
      />

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button
          onClick={onMarkComplete}
          className="flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Mark Complete
        </Button>
        <Button
          onClick={() => onNavigateToNext?.('agentic-prompting-fundamentals')}
          variant="outline"
          className="flex items-center gap-2"
        >
          Return to Beginning
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AgentEvaluationMethodologies;










