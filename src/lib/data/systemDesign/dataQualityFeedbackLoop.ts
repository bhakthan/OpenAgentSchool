import { SystemDesignPattern } from './types';

export const dataQualityFeedbackLoopSystemDesign: SystemDesignPattern = {
  id: 'data-quality-feedback-repair-loop',
  name: 'Data Quality Feedback & Repair Loop System Design',
  overview: 'Closed-loop anomaly detection, targeted profiling, repair proposal, and validation cycle.',
  problemStatement: 'Manual data incident response is slow and reactive; recurring anomalies degrade trust.',
  solution: 'Automate detection→profiling→repair→validation with bounded safe actions and audit artifacts.',
  steps: [
  { id: 'monitor', title: 'Continuous Monitoring', category: 'context', description: 'Stream KPIs and drift metrics', details: 'Stat windows + sketches', considerations: ['Noise'], bestPractices: ['Adaptive thresholds'], patterns: ['data-quality-feedback-repair-loop'], examples: ['detect(null_ratio)'] },
  { id: 'repair', title: 'Repair Synthesis', category: 'architecture', description: 'Propose candidate fix actions', details: 'Heuristics + LLM ranking', considerations: ['Overfitting'], bestPractices: ['Sandbox first'], patterns: ['data-quality-feedback-repair-loop'], examples: ['proposal.impute()'] }
  ],
  architecture: {
    components: [
      { name: 'Metric Ingestor', type: 'input', description: 'Collects quality metrics' },
      { name: 'Anomaly Detector', type: 'processing', description: 'Flags deviations' },
      { name: 'Profiler', type: 'processing', description: 'Deep profiles impacted scope' },
      { name: 'Repair Generator', type: 'processing', description: 'Creates candidate fixes' },
      { name: 'Grounding Validator', type: 'processing', description: 'Validates repairs' },
      { name: 'KPI Validator', type: 'processing', description: 'Checks post-fix stability' }
    ],
    flows: [
      { from: 'Metric Ingestor', to: 'Anomaly Detector', description: 'Metric stream' },
      { from: 'Anomaly Detector', to: 'Profiler', description: 'Impacted scope' },
      { from: 'Profiler', to: 'Repair Generator', description: 'Deep profile' },
      { from: 'Repair Generator', to: 'Grounding Validator', description: 'Candidate repair' }
    ]
  }
};
