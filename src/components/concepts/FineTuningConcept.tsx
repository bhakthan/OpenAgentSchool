import React from 'react';
import ConceptLayout from './ConceptLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, Target, FlowArrow, GearSix, ChartLine, ShieldCheck, Database, Lightning } from '@phosphor-icons/react';
import CodeBlock from '@/components/ui/CodeBlock';
import { FineTuningMetricsChart } from './visuals/FineTuningMetricsChart';
import { FineTuningOverviewVisual } from './visuals/FineTuningOverviewVisual';
import { SFTProcessVisual } from './visuals/SFTProcessVisual';
import { DPOProcessVisual } from './visuals/DPOProcessVisual';
import { RFTProcessVisual } from './visuals/RFTProcessVisual';
import { DataStrategyVisual } from './visuals/DataStrategyVisual';
import FineTuningAudioControls from '@/components/audio/FineTuningAudioControls';

interface FineTuningConceptProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

// Simple visual card data for SFT -> DPO -> RFT progression
const progression = [
  {
    id: 'sft',
    title: 'SFT',
    subtitle: 'Supervised Fine-Tuning',
    tagline: '"Imitation"',
    color: 'bg-blue-50 dark:bg-blue-900/10 border-blue-300/50',
    points: [
      'Pairs: prompt → ideal response',
      'Establish style & format',
      'Reduce prompt length',
      'Baseline alignment'
    ]
  },
  {
    id: 'dpo',
    title: 'DPO',
    subtitle: 'Direct Preference Optimization',
    tagline: '"More like this, less like that"',
    color: 'bg-amber-50 dark:bg-amber-900/10 border-amber-300/50',
    points: [
      'Preference pairs (chosen vs rejected)',
      'No reward model needed',
      'Sharper alignment shifts',
      'Monitor KL to base'
    ]
  },
  {
    id: 'rft',
    title: 'RFT',
    subtitle: 'Reinforcement Fine-Tuning',
    tagline: '"Learn to figure it out"',
    color: 'bg-purple-50 dark:bg-purple-900/10 border-purple-300/50',
    points: [
      'Reward model or programmatic signal',
      'Policy optimization (PPO-like)',
      'Targeted capability boosts',
      'Risk of regression'
    ]
  }
];

export default function FineTuningConcept({ onMarkComplete, onNavigateToNext }: FineTuningConceptProps) {
  // Build tabs array matching ConceptLayout contract
  const tabs = [
    {
      id: 'overview',
      title: 'Overview',
      description: 'Why staged alignment',
      icon: <Brain className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <FineTuningOverviewVisual />
          
          {/* SFT → DPO → RFT Visual Reference */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <FlowArrow className="w-4 h-4" /> Fine-Tuning Methods Comparison
            </h3>
            <img 
              src="/images/SFT_DPO_RFT.webp" 
              alt="SFT, DPO, and RFT fine-tuning methods comparison showing progressive alignment stages" 
              className="w-full rounded-lg shadow-sm border"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Supervised Fine-Tuning (SFT) → Direct Preference Optimization (DPO) → Reinforcement Fine-Tuning (RFT)
            </p>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><FlowArrow className="w-4 h-4"/> Stage Summary Cards</h3>
            <div className="space-y-6 fine-tuning-concept">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {progression.map(step => (
                  <div key={step.id} className={`stage-card border rounded-lg p-3 relative overflow-hidden ${step.color}`}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl font-bold tracking-tight">{step.title}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">{step.subtitle}</span>
                    </div>
                    <p className="text-[11px] italic mb-2 text-muted-foreground">{step.tagline}</p>
                    <ul className="space-y-1 text-[11px]">{step.points.map(p => <li key={p} className="flex gap-1"><span>•</span><span>{p}</span></li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed">Progressive fine-tuning crystallizes recurring instructions, formatting, tone, safety behaviours, and domain reasoning directly into weights. Start with prompts. Escalate only when marginal alignment gain exceeds added cost + risk.</p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 border rounded-md bg-background/40">
              <h4 className="font-semibold mb-1">Stop at SFT if</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Format / tone consistency is main goal</li>
                <li>Low hallucination drift</li>
                <li>Safety posture acceptable</li>
              </ul>
            </div>
            <div className="p-3 border rounded-md bg-background/40">
              <h4 className="font-semibold mb-1">Add DPO if</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Subtle preference gaps persist</li>
                <li>Reward model infra is overkill</li>
                <li>Curatable chosen vs rejected pairs</li>
              </ul>
            </div>
            <div className="p-3 border rounded-md bg-background/40">
              <h4 className="font-semibold mb-1">Go to RFT if</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Need non-local shaping</li>
                <li>Composite reward (accuracy + safety)</li>
                <li>Strong eval + rollback pipeline</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data',
      title: 'Data Strategy',
      description: 'Dataset composition',
      icon: <Database className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-5 text-sm">
          <DataStrategyVisual />
          <div>
            <h4 className="font-semibold mb-2">Key Practices</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Layer sources: human expert, synthetic augmentation, filtered web, templated generators</li>
              <li>Semantic + exact duplicate filtering (embed + hash)</li>
              <li>Strict partitions: train / val / red-team / regression (no leakage)</li>
              <li>PII scrubbing & policy filters before persistence</li>
              <li>DPO: plausible rejected answers (avoid strawmen)</li>
              <li>RFT: reward component weights + drift alerts</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'sft',
      title: 'SFT',
      description: 'Imitation phase',
      icon: <Brain className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <SFTProcessVisual />
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">SFT teaches the model to imitate good answers directly with clean (prompt → ideal answer) pairs.</p>
            <CodeBlock language="json">{`{"prompt":"Classify: cat vs dog","response":"The image is a cat."}`}</CodeBlock>
            <ul className="list-disc ml-5 space-y-1">
              <li>Balanced task sampling</li>
              <li>Schema stress cases</li>
              <li>Hold-out style regression slice</li>
              <li>Track token efficiency (prompt shortening)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'dpo',
      title: 'DPO',
      description: 'Preference shaping',
      icon: <Target className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <DPOProcessVisual />
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">DPO compares two answers and nudges the model toward the one we pick more often.</p>
            <CodeBlock language="python">{`def dpo_step(policy, ref, batch, beta=0.1):\n    ch = policy.log_prob(batch.prompts, batch.chosen)\n    rj = policy.log_prob(batch.prompts, batch.rejected)\n    ref_ch = ref.log_prob(batch.prompts, batch.chosen).detach()\n    ref_rj = ref.log_prob(batch.prompts, batch.rejected).detach()\n    advantage = (ch - ref_ch) - (rj - ref_rj)\n    loss = -torch.nn.functional.logsigmoid(beta * advantage).mean()\n    return loss`}</CodeBlock>
            <ul className="list-disc ml-5 space-y-1">
              <li>β sweeps for stability</li>
              <li>Win-rate & KL divergence are primary signals</li>
              <li>Quality negatives &gt; quantity</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'rft',
      title: 'RFT',
      description: 'Reinforcement optimization',
      icon: <Lightning className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <RFTProcessVisual />
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">RFT lets the model practice, get small scores, and self‑adjust for higher future scores.</p>
            <CodeBlock language="python">{`for it in range(iters):\n    prompts = sample(pool)\n    gen, logp_old = policy.generate_with_logprobs(prompts)\n    with torch.no_grad():\n        reward = reward_model.score(prompts, gen) - kl_coef * kl_div(policy, ref, prompts, gen)\n    adv = compute_advantage(reward)\n    loss = ppo_objective(policy, prompts, gen, logp_old, adv)\n    loss.backward(); optimizer.step(); optimizer.zero_grad()\n    adjust_kl(target)\n    if it % eval_interval == 0:\n        run_regression_eval(policy)`}</CodeBlock>
            <ul className="list-disc ml-5 space-y-1">
              <li>Adaptive KL prevents collapse</li>
              <li>Reward decomposition dashboards</li>
              <li>Rollback plan if benchmark regression &gt; threshold</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'eval',
      title: 'Evaluation',
      description: 'Metrics & safeguards',
      icon: <ChartLine className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <FineTuningMetricsChart />
          <ul className="list-disc ml-5 space-y-1">
            <li>SFT: validation loss + style conformity</li>
            <li>DPO: preference win-rate, KL drift</li>
            <li>RFT: reward trend, safety refusal accuracy</li>
            <li>Global: hallucination probes, domain benchmarks, latency delta</li>
            <li>Drift alerts: perplexity spikes on control set</li>
          </ul>
        </div>
      )
    },
    {
      id: 'ops',
      title: 'Ops & Risk',
      description: 'Lifecycle & governance',
      icon: <ShieldCheck className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <ul className="list-disc ml-5 space-y-1 text-sm">
          <li>Lineage: base → sft → dpo → rft (hash manifest)</li>
          <li>Red-team batch gating</li>
          <li>Cost accounting vs inference savings</li>
          <li>Shadow deploy & canary shift</li>
          <li>Automatic rollback triggers</li>
        </ul>
      )
    },
    {
      id: 'refs',
      title: 'References',
      description: 'Further reading & sample code',
      icon: <Brain className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">Authoritative resources and sample code for deeper exploration of fine-tuning strategies.</p>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <a href="https://github.com/openai/openai-cookbook/tree/main/examples/fine-tuned_qa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Fine‑Tuned QA Sample Code (OpenAI Cookbook)</a>
              <div className="text-xs text-muted-foreground ml-1">Practical example of preparing data & evaluating a QA fine-tune.</div>
            </li>
            <li>
              <a href="https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/fine-tuning-overview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Microsoft Foundry: Fine-Tuning Overview</a>
              <div className="text-xs text-muted-foreground ml-1">Conceptual foundations, supported models, governance considerations.</div>
            </li>
            <li>
              <a href="https://learn.microsoft.com/en-us/plans/op8ugtzy32mz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Azure Training Plan: Fine-Tuning Techniques</a>
              <div className="text-xs text-muted-foreground ml-1">Structured learning path for operational fine-tuning workflows.</div>
            </li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 fine-tuning-concept-wrapper">
      <FineTuningAudioControls 
        componentName="FineTuningConcept" 
        className="mb-6"
      />
      <ConceptLayout
        conceptId="fine-tuning"
        title="Fine-Tuning Methods (SFT, DPO, RFT)"
        description="Progressive alignment: imitation → preference shaping → reinforcement refinement"
        tabs={tabs}
        onMarkComplete={onMarkComplete}
        onNavigateToNext={onNavigateToNext}
  // Disable default embedded audio controls since we render specialized FineTuningAudioControls above
  enableAudioNarration={false}
      />
    </div>
  );
}









