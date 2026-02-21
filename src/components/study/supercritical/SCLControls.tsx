import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { SCLMode } from '@/types/supercritical';

interface SCLControlsProps {
  mode: SCLMode;
  initialSeeds?: any;
  onStartSession: (seeds: any) => void;
  isGenerating?: boolean;
}

export function SCLControls({ mode, onStartSession, isGenerating }: SCLControlsProps) {
  const [concept, setConcept] = useState('');
  const [pattern, setPattern] = useState('');
  const [practice, setPractice] = useState('');

  // Pre-fill real-world defaults per mode
  React.useEffect(() => {
    switch (mode) {
      case 'consolidate':
        setConcept('Customer support chatbot with RAG retrieval and 3 tool integrations (CRM lookup, order status, refund processing)');
        setPattern('Manager agent delegates queries to retrieval, billing, and escalation sub-agents in a hub-and-spoke topology');
        setPractice('Monitor retrieval precision@10 weekly and retrain embeddings when it drops below 0.85\nSet 30-second timeout per tool call with a graceful fallback response\nLog every tool invocation with latency, token count, and outcome for audit trail');
        break;
      case 'extrapolate':
        setConcept('Coding agents authoring 40% of pull requests in a 200-person engineering organization');
        setPattern('Agents auto-generate PRs from Jira tickets, humans review and merge — review load grows non-linearly');
        setPractice('Track code review bottleneck as agent PR volume doubles each quarter\nMeasure test coverage delta between human-authored vs agent-authored PRs\nMonitor senior engineer time shift from coding to reviewing agent output');
        break;
      case 'transfer':
        setConcept('HIPAA-compliant medical triage agent guardrails applied to financial advisory bots handling PCI-DSS data');
        setPattern('Map healthcare data-handling invariants (consent, audit, redaction) to PCI-DSS equivalents in fintech');
        setPractice('Identify which access controls transfer directly vs need domain-specific adaptation\nTest PHI redaction rules against financial PII categories (SSN, account numbers)\nValidate audit logging requirements across both regulatory domains');
        break;
      case 'stress-test':
        setConcept('10 parallel agents hitting the same OpenAI API endpoint with a shared 60 RPM rate limit during peak hours');
        setPattern('Shared token bucket with priority queue and circuit breaker fallback to a smaller local model');
        setPractice('Simulate 5x normal load sustained for 30 minutes and measure degradation curve\nIntroduce 500ms latency spikes every 2 minutes to find cascading timeout effects\nIdentify which agent starves first and whether priority ordering causes starvation');
        break;
      case 'intervene':
        setConcept('Production RAG agent hallucinating on 12% of responses in legal document Q&A for a law firm');
        setPattern('Three-lever intervention: retrieval grounding, confidence gating at 0.7, and human-in-the-loop escalation');
        setPractice('Add source-citation requirement for every factual claim — reject uncited responses\nRoute responses with confidence below 0.7 to a human reviewer before delivery\nA/B test grounded vs ungrounded responses on 500 queries and measure accuracy delta');
        break;
      case 'counterfactual':
        setConcept('AI coding assistant with persistent cross-session memory vs completely stateless — same 50-task benchmark');
        setPattern('Toggle memory on/off, run identical tasks, compare completion quality, token cost, and user satisfaction');
        setPractice('Run same 50 coding tasks with memory enabled, then disabled — compare pass rates\nMeasure token usage increase from memory context injection (expect 15-40% overhead)\nSurvey 20 users on perceived helpfulness difference between stateful and stateless');
        break;
      case 'leap-focus':
        setConcept('Enterprise shifting from 15% to 60% AI-assisted task completion across engineering in 6 months');
        setPattern('Identify the adoption percentage where workflows qualitatively transform from AI-augmented to AI-native');
        setPractice('Track when managers stop reviewing AI outputs individually (trust inflection point)\nMonitor when new hires expect AI tooling by default rather than as an optional add-on\nMeasure when process documentation shifts from human-first to AI-first language');
        break;
      case 'mechanism-audit':
        setConcept('User request → agent reasoning → tool selection → API call → response generation chain in a booking agent');
        setPattern('Trace each causal link in the chain and flag where confidence drops or latency compounds beyond SLO');
        setPractice('Annotate each hop with estimated latency (p50/p99) and failure probability\nIdentify which tool failures cascade to user-visible errors vs are absorbed gracefully\nVerify that the agent\'s stated reasoning actually matches its downstream tool choices');
        break;
      case 'red-team':
        setConcept('Multi-agent customer service system with shared vector memory and file upload capability (PDF, CSV)');
        setPattern('Attacker injects malicious instructions via a crafted PDF that the ingestion agent processes into shared memory');
        setPractice('Map every user-content-to-agent-instruction boundary in the pipeline\nTest privilege escalation: can a support-tier agent trigger admin-only tools via prompt injection?\nMeasure blast radius: how many downstream agents consume poisoned context from shared memory?\nProbe data exfiltration: can tool outputs be redirected to attacker-controlled endpoints?');
        break;
      case 'temporal-sim':
        setConcept('Rolling out an AI triage agent to a 50-person customer support team over 12 weeks');
        setPattern('Week 1-2 shadow mode → Week 3-6 copilot with human approval → Week 7-10 autonomous with escalation → Week 11-12 full production');
        setPractice('Define go/no-go metrics at each phase gate — accuracy >92%, CSAT >4.2, escalation rate <15%\nPlan rollback triggers: what metric drop forces return to previous phase within 24 hours?\nSchedule team readiness surveys at week 4 and week 8 to catch adoption resistance early');
        break;
      case 'compose':
        setConcept('Combining stress-test failure findings with intervention effectiveness data for an e-commerce agent fleet');
        setPattern('Layer Mode A (stress-test) outputs as inputs to Mode B (intervene), then score synergies and contradictions');
        setPractice('Import top 5 stress-test failure modes as intervention targets\nRank each intervention by coverage: which single lever mitigates the most failures?\nFlag contradictions where fixing one failure mode worsens another (e.g., adding retries increases cost)');
        break;
      case 'regulatory-impact':
        setConcept('Customer-facing AI agent for insurance claims processing deployed in the EU market');
        setPattern('Map the system through EU AI Act risk tiers (Annex III) and identify mandatory compliance controls');
        setPractice('Classify as high-risk or limited-risk under Annex III criteria for insurance\nInventory mandatory documentation: risk assessment, data governance plan, human oversight design\nDesign the human-in-the-loop mechanism — what decisions require human confirmation?\nPlan transparency disclosures: how does the end user know they are interacting with AI?');
        break;
      default:
        break;
    }
  }, [mode]);

  const handleStart = () => {
    const seeds = {
      conceptIds: concept ? [concept] : [],
      patternIds: pattern ? [pattern] : [],
      practices: practice ? practice.split('\n').filter(p => p.trim()) : []
    };
    onStartSession(seeds);
  };

  const canStart = concept.trim() || pattern.trim() || practice.trim();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analysis Seeds Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Define the foundational elements for your SCL analysis. At least one field is required.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Core Concept</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Describe the real-world system or scenario you want to analyze (e.g., "Production RAG pipeline serving 10K daily customer support queries")
            </p>
            <Input
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="e.g., Multi-agent customer service system handling 5K tickets/day with CRM and billing tool access"
              className="h-10"
            />
          </div>
          
          <div>
            <Label className="text-base font-medium">Pattern / Architecture</Label>
            <p className="text-sm text-muted-foreground mb-2">
              The structural pattern or workflow being analyzed (e.g., "Manager agent delegates to specialist sub-agents in a hub-and-spoke topology")
            </p>
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g., Hub agent routes queries to retrieval, billing, and escalation sub-agents with shared context"
              className="h-10"
            />
          </div>
          
          <div>
            <Label className="text-base font-medium">Practices &amp; Constraints</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Concrete operational practices, one per line — include metrics, thresholds, and real constraints where possible
            </p>
            <Textarea
              value={practice}
              onChange={(e) => setPractice(e.target.value)}
              placeholder={"e.g., Monitor retrieval precision@10 weekly and alert when it drops below 0.85\nSet 30-second timeout per tool call with fallback to cached response\nLog every tool invocation with latency, token count, and outcome"}
              rows={4}
              className="resize-none"
            />
          </div>
          
          <Button 
            onClick={handleStart} 
            disabled={!canStart || isGenerating}
            className="w-full h-12"
            size="lg"
          >
            {isGenerating ? 'Starting SCL Analysis...' : `Start ${String(mode).replace('-', ' ')} Analysis`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
