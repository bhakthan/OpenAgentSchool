// Python execution steps for Agent Evaluation pattern (line mapping pending refinement)
export const agentEvaluationPythonExecutionSteps = [
  { id: 'py-imports-enums', title: 'Imports & Enums', description: 'Import std libs, dataclasses, and declare MetricType / RiskLevel enums.' },
  { id: 'py-dataclasses', title: 'Core Dataclasses', description: 'Define EvaluationMetric, TestCase, AgentProfile, RiskAssessment, EvaluationResult.' },
  { id: 'py-framework-init', title: 'Framework Init', description: 'AgentEvaluationFramework constructor with test suite & history stores.' },
  { id: 'py-evaluate-agent', title: 'Evaluate Agent Orchestration', description: 'High-level evaluate_agent method organizing profiling, suite load, run, aggregation.' },
  { id: 'py-profile', title: 'Agent Profiling', description: 'profile_agent builds LLM prompt and parses JSON profile.' },
  { id: 'py-test-suite-load', title: 'Test Suite Load/Gen', description: 'load_test_suite with caching and generate_test_cases fallback.' },
  { id: 'py-generate-tests', title: 'Generate Test Categories', description: 'generate_*_tests functions produce capability, performance, behavior, safety cases.' },
  { id: 'py-aggregate-metrics', title: 'Aggregate Metrics', description: 'aggregate_metrics computes per-category and overall pass rates.' },
  { id: 'py-report', title: 'Evaluation Report', description: 'generate_evaluation_report compiles scores, metrics, recommendations, risk.' },
  { id: 'py-recommendations', title: 'Recommendations', description: 'generate_recommendations analyzes failures & low metrics.' },
  { id: 'py-risk', title: 'Risk Assessment', description: 'assess_risk determines risk level from safety & behavior signals.' },
  { id: 'py-llm-call', title: 'LLM Call Abstraction', description: 'call_llm placeholder for provider integration.' },
  { id: 'py-test-coordinator', title: 'Test Coordinator', description: 'TestCoordinator orchestrates running each category test.' },
  { id: 'py-run-tests', title: 'Run Test Cases', description: 'Per-category run_* helpers evaluate agent outputs and measure durations.' },
  { id: 'py-eval-helpers', title: 'Evaluation Helpers', description: 'Helper methods for capability, consistency, and safety evaluation.' },
  { id: 'py-usage', title: 'Usage Example', description: 'async main constructs framework, mock agent, runs evaluation.' }
] as const;

export type AgentEvaluationPythonExecutionStep = typeof agentEvaluationPythonExecutionSteps[number];
