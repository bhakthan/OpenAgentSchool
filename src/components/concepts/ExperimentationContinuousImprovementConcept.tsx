import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Beaker,
  TrendingUp,
  GitBranch,
  Target,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Clock,
  Users,
  RefreshCw,
  Zap,
  Shield,
  FileText
} from 'lucide-react';
import ConceptLayout from './ConceptLayout';
import CodeBlock from '@/components/ui/CodeBlock';
import ToolkitDownloadButtons from './ToolkitDownloadButtons';

interface ExperimentType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  useWhen: string[];
  considerations: string[];
  duration: string;
}

interface Hypothesis {
  id: string;
  statement: string;
  metric: string;
  expectedLift: string;
  segment: string;
  priority: 'high' | 'medium' | 'low';
  status: 'backlog' | 'in-progress' | 'validated' | 'rejected';
}

interface FeedbackChannel {
  source: string;
  signalType: string;
  frequency: string;
  actionable: string;
}

const experimentTypes: ExperimentType[] = [
  {
    id: 'ab-test',
    name: 'A/B Test',
    icon: <GitBranch className="w-5 h-5" />,
    description: 'Split traffic between control and treatment to measure causal impact.',
    useWhen: [
      'Sufficient traffic volume (>1000 interactions/day)',
      'Clear success metric exists',
      'Change is reversible',
      'Risk is bounded'
    ],
    considerations: [
      'Novelty effects may skew early results',
      'Network effects can contaminate groups',
      'Long-term effects may differ from short-term'
    ],
    duration: '2-4 weeks typical'
  },
  {
    id: 'bandit',
    name: 'Multi-Armed Bandit',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Dynamically allocate traffic to better-performing variants.',
    useWhen: [
      'Opportunity cost of showing worse variant is high',
      'Quick learning is preferred over statistical rigor',
      'Multiple variants to test simultaneously',
      'Non-stationary environment'
    ],
    considerations: [
      'Harder to get clean causal estimates',
      'Requires more sophisticated analysis',
      'May never fully explore all variants'
    ],
    duration: 'Ongoing / adaptive'
  },
  {
    id: 'holdout',
    name: 'Holdout Test',
    icon: <Shield className="w-5 h-5" />,
    description: 'Permanently exclude a group from all changes to measure cumulative impact.',
    useWhen: [
      'Measuring long-term cumulative effects',
      'Understanding system-wide improvements',
      'Baseline comparison over time',
      'Strategic investment justification'
    ],
    considerations: [
      'Holdout group experience degrades over time',
      'Ethical concerns for high-value features',
      'Requires long-term commitment'
    ],
    duration: '3-12 months'
  },
  {
    id: 'offline-eval',
    name: 'Offline Evaluation',
    icon: <Beaker className="w-5 h-5" />,
    description: 'Evaluate changes using logged data before online deployment.',
    useWhen: [
      'High-risk changes requiring pre-validation',
      'Limited traffic for online experiments',
      'Rapid iteration on model/prompt changes',
      'Cost-sensitive testing'
    ],
    considerations: [
      'Distribution shift from logged data',
      'Cannot capture user reaction to changes',
      'Requires robust logging infrastructure'
    ],
    duration: 'Hours to days'
  }
];

const hypothesisBacklog: Hypothesis[] = [
  {
    id: 'H-001',
    statement: 'Adding confidence scores to agent responses will increase user trust ratings',
    metric: 'User trust score (1-5)',
    expectedLift: '+0.3 points',
    segment: 'All users',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'H-002',
    statement: 'Shorter, bulleted responses for FAQ queries will reduce escalation rate',
    metric: 'Escalation rate %',
    expectedLift: '-15%',
    segment: 'FAQ queries',
    priority: 'high',
    status: 'backlog'
  },
  {
    id: 'H-003',
    statement: 'Proactive follow-up questions will increase task completion',
    metric: 'Task completion rate',
    expectedLift: '+8%',
    segment: 'Multi-turn conversations',
    priority: 'medium',
    status: 'validated'
  },
  {
    id: 'H-004',
    statement: 'Personalized greetings based on history will improve CSAT',
    metric: 'CSAT score',
    expectedLift: '+5%',
    segment: 'Returning users',
    priority: 'low',
    status: 'rejected'
  }
];

const feedbackChannels: FeedbackChannel[] = [
  {
    source: 'Thumbs Up/Down',
    signalType: 'Explicit satisfaction',
    frequency: '5-15% of interactions',
    actionable: 'Low signal volume; use for regression detection'
  },
  {
    source: 'Escalation to Human',
    signalType: 'Implicit failure',
    frequency: 'Every escalation event',
    actionable: 'High signal; analyze for systematic gaps'
  },
  {
    source: 'Conversation Abandonment',
    signalType: 'Implicit dissatisfaction',
    frequency: 'Every session',
    actionable: 'Moderate signal; combine with intent analysis'
  },
  {
    source: 'Support Ticket Tags',
    signalType: 'Explicit categorization',
    frequency: 'Post-interaction',
    actionable: 'Rich signal; drives hypothesis generation'
  },
  {
    source: 'Periodic Surveys',
    signalType: 'Deep qualitative feedback',
    frequency: 'Monthly/Quarterly',
    actionable: 'Strategic insights; guide roadmap'
  }
];

/**
 * Experimentation & Continuous Improvement: running evaluation loops post-launch (2026 Edition).
 */
export default function ExperimentationContinuousImprovementConcept() {
  const [selectedExperiment, setSelectedExperiment] = useState(experimentTypes[0]);

  const priorityColors = {
    high: 'bg-red-500/20 text-red-400',
    medium: 'bg-amber-500/20 text-amber-400',
    low: 'bg-blue-500/20 text-blue-400'
  };

  const statusColors = {
    backlog: 'bg-slate-500/20 text-slate-400',
    'in-progress': 'bg-blue-500/20 text-blue-400',
    validated: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400'
  };

  return (
    <ConceptLayout
      conceptId="experimentation-continuous-improvement"
      title="Experimentation & Continuous Improvement"
      description="Close the loop after release. Stand up experimentation infrastructure and translate telemetry into iteration plans."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">Continuous Learning</Badge>
                </div>
                <h3 className="text-2xl font-bold">Experimentation Flywheel</h3>
                <p className="text-muted-foreground">
                  Ship is just the beginning. Build experimentation infrastructure that turns every interaction 
                  into a learning opportunity and every insight into measurable improvement.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-purple-500/10">A/B Testing</Badge>
                  <Badge variant="outline" className="bg-blue-500/10">Hypothesis Backlog</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Feedback Loops</Badge>
                  <Badge variant="outline" className="bg-amber-500/10">Regression Defense</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">4</div>
                  <div className="text-xs text-muted-foreground">Experiment types</div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">95%</div>
                  <div className="text-xs text-muted-foreground">Stat sig threshold</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">2-4w</div>
                  <div className="text-xs text-muted-foreground">Typical experiment</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="experiments" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="experiments">Experiment Types</TabsTrigger>
            <TabsTrigger value="hypotheses">Hypothesis Backlog</TabsTrigger>
            <TabsTrigger value="feedback">Feedback Intake</TabsTrigger>
            <TabsTrigger value="regression">Regression Defense</TabsTrigger>
          </TabsList>

          {/* Experiment Types Tab */}
          <TabsContent value="experiments" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {experimentTypes.map((exp) => (
                <Card
                  key={exp.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedExperiment.id === exp.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedExperiment(exp)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-primary">{exp.icon}</div>
                    <h4 className="font-medium text-xs">{exp.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">{exp.duration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {selectedExperiment.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedExperiment.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedExperiment.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" /> When to Use
                    </h4>
                    <ul className="space-y-2">
                      {selectedExperiment.useWhen.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" /> Considerations
                    </h4>
                    <ul className="space-y-2">
                      {selectedExperiment.considerations.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Experiment Configuration Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# A/B Experiment Configuration
experiment:
  name: "confidence-scores-v1"
  type: "ab_test"
  status: "running"
  
  hypothesis:
    statement: "Adding confidence scores increases user trust"
    primary_metric: "trust_rating"
    expected_lift: 0.3
    minimum_detectable_effect: 0.15

  allocation:
    unit: "user_id"
    control: 0.5
    treatment: 0.5
    holdout: 0.0
    
  targeting:
    segments:
      - "all_users"
    exclusions:
      - "internal_testers"
      - "enterprise_tier"  # Separate experiment planned

  guardrails:
    - metric: "escalation_rate"
      threshold: "+5%"
      action: "alert"
    - metric: "response_time_p95"
      threshold: "+200ms"
      action: "pause"
    - metric: "safety_flags"
      threshold: "+0.1%"
      action: "stop"

  analysis:
    confidence_level: 0.95
    correction: "bonferroni"  # For multiple metrics
    minimum_sample: 10000
    
  timeline:
    start: "2026-01-15"
    planned_end: "2026-02-15"
    decision_date: "2026-02-20"`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hypothesis Backlog Tab */}
          <TabsContent value="hypotheses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" /> Hypothesis Backlog
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Prioritized list of testable hypotheses with expected impact and status.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hypothesisBacklog.map((h) => (
                    <div key={h.id} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{h.id}</span>
                          <Badge className={priorityColors[h.priority]}>{h.priority}</Badge>
                          <Badge className={statusColors[h.status]}>{h.status}</Badge>
                        </div>
                      </div>
                      <p className="text-sm font-medium mb-3">{h.statement}</p>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="text-muted-foreground mb-1">Metric:</p>
                          <p>{h.metric}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Expected Lift:</p>
                          <p className="text-green-400">{h.expectedLift}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Segment:</p>
                          <p>{h.segment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hypothesis Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Hypothesis Template

## Hypothesis Statement
If we [CHANGE], then [OUTCOME] because [RATIONALE].

## Metrics
- **Primary Metric**: [What will you measure?]
- **Expected Lift**: [Quantified improvement]
- **Guardrail Metrics**: [What should NOT regress?]

## Experiment Design
- **Type**: A/B Test / Bandit / Holdout / Offline
- **Target Segment**: [Who will see this?]
- **Sample Size**: [Minimum needed for significance]
- **Duration**: [Estimated runtime]

## Success Criteria
- [ ] Primary metric improves by ≥ [threshold]
- [ ] Guardrails remain within ± [tolerance]
- [ ] Statistical significance at 95% confidence

## Rollout Plan
- **If validated**: [Gradual rollout plan]
- **If rejected**: [What did we learn? Next iteration?]

## Stakeholders
- **Owner**: [Who drives this?]
- **Reviewers**: [Who approves analysis?]
- **Informed**: [Who needs to know?]`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Intake Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" /> Feedback Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Source</th>
                        <th className="text-left py-2 px-3">Signal Type</th>
                        <th className="text-left py-2 px-3">Frequency</th>
                        <th className="text-left py-2 px-3">Actionability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbackChannels.map((ch, i) => (
                        <tr key={i} className="border-b border-muted/50">
                          <td className="py-3 px-3 font-medium">{ch.source}</td>
                          <td className="py-3 px-3 text-muted-foreground">{ch.signalType}</td>
                          <td className="py-3 px-3 text-muted-foreground">{ch.frequency}</td>
                          <td className="py-3 px-3 text-muted-foreground">{ch.actionable}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" /> Feedback-to-Hypothesis Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Feedback Processing Pipeline
pipeline:
  name: "feedback-to-hypothesis"
  schedule: "weekly"

stages:
  - name: "collect"
    sources:
      - thumbs_feedback
      - escalation_logs
      - abandonment_events
      - support_tickets
    output: "raw_feedback_batch"

  - name: "cluster"
    method: "topic_modeling"
    model: "bertopic"
    min_cluster_size: 10
    output: "feedback_clusters"

  - name: "prioritize"
    scoring:
      frequency_weight: 0.3
      impact_weight: 0.4
      effort_weight: 0.3
    output: "prioritized_issues"

  - name: "generate_hypotheses"
    template: |
      Issue: {cluster_summary}
      Affected segment: {user_segment}
      Potential fix: {suggested_intervention}
      Expected impact: {estimated_lift}
    review: "manual"
    output: "hypothesis_candidates"

  - name: "backlog_integration"
    destination: "hypothesis_backlog"
    status: "pending_review"
    notify: ["product_owner", "experimentation_lead"]`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regression Defense Tab */}
          <TabsContent value="regression" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" /> Regression Defense System
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Guard-bands, champion/challenger, and automated rollback to protect production quality.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-400" /> Guard-Bands
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Define acceptable metric ranges</li>
                      <li>• Alert on threshold breach</li>
                      <li>• Escalate persistent violations</li>
                      <li>• Auto-pause experiments at risk</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-green-400" /> Champion/Challenger
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Always compare to baseline</li>
                      <li>• Shadow mode for new models</li>
                      <li>• Gradual traffic migration</li>
                      <li>• Instant rollback capability</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" /> Automated Rollback
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Trigger on safety violations</li>
                      <li>• Trigger on latency spikes</li>
                      <li>• Trigger on error rate increase</li>
                      <li>• Page on-call + auto-revert</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regression Testing Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Continuous Regression Testing
regression_testing:
  name: "agent-regression-suite"
  trigger: "on_deploy"
  
  test_suites:
    - name: "golden_set"
      description: "Curated examples that must always pass"
      tests: 500
      pass_threshold: 0.98
      blocking: true

    - name: "adversarial_probes"
      description: "Edge cases and attack patterns"
      tests: 200
      pass_threshold: 0.95
      blocking: true

    - name: "capability_coverage"
      description: "Representative queries per capability"
      tests: 1000
      pass_threshold: 0.90
      blocking: false

  comparison:
    baseline: "production_champion"
    method: "statistical"
    confidence: 0.95

  actions:
    on_pass:
      - deploy_to_canary
      - notify_team
    on_fail:
      - block_deployment
      - create_incident
      - notify_on_call

  reporting:
    dashboard: "regression-results"
    retention_days: 90
    trend_alerts:
      - metric: "golden_set_pass_rate"
        threshold: "-2%"
        window: "7d"`}</CodeBlock>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-green-500/5 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" /> Good Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Pre-register hypotheses before analysis</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Use holdouts for long-term measurement</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Document learnings from failed experiments</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Automate guardrail monitoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-red-500/5 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" /> Anti-Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Peeking at results before planned end</li>
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Shipping without regression tests</li>
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Ignoring inconclusive results</li>
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Optimizing for one metric at all costs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <ToolkitDownloadButtons
              baseName="continuous-improvement-flywheel"
              markdownLabel="Download Continuous Improvement Flywheel"
              excelLabel="Download Continuous Improvement (Excel)"
            />
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
