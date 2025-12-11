import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ShareButton } from '@/components/ui/ShareButton';
import { cn } from '@/lib/utils';
import {
  Buildings,
  ChartLineUp,
  CirclesThreePlus,
  Compass,
  ClipboardText,
  Gear,
  FileArrowDown,
  Lightning,
  Notebook,
  RocketLaunch,
  ShieldCheck,
  UsersThree,
  WaveTriangle,
} from '@phosphor-icons/react';
import FrontierCapabilitiesCallout from './FrontierCapabilitiesCallout';

interface JourneyPhase {
  id: string;
  label: string;
  horizon: string;
  operatingModel: string;
  headline: string;
  businessSignals: string[];
  technicalSignals: string[];
  enablementTracks: string[];
  successMetrics: { label: string; value: string; trend?: 'up' | 'steady' | 'down' }[];
  executiveActions: string[];
}

const JOURNEY_PHASES: JourneyPhase[] = [
  {
    id: 'learn-align',
    label: 'Learn & Align',
    horizon: 'Weeks 0-3',
    operatingModel: 'Define the shared language, ambition, and "why" for agentic adoption.',
    headline: 'Create momentum by linking agentic capabilities to concrete business outcomes.',
    businessSignals: [
      'Executive charter outlining value narratives for customers, employees, and regulators.',
      'Portfolio heatmap that identifies 3-5 high-friction workflows ready for augmentation.',
      'Risk posture brief covering compliance, privacy, and control expectations.',
    ],
    technicalSignals: [
      'Capability baseline across data quality, tool access, and observability.',
      'Architecture primer mapping current systems to agent-friendly surfaces (APIs, events, knowledge).',
      'Pilot assessment showing low-risk datasets and sandbox tooling availability.',
    ],
    enablementTracks: [
      'Immersive leadership workshop: "AI-native vs. legacy operating models"',
      'Hands-on lab: instrumenting an existing workflow with telemetry for agent feedback loops',
      'Playbook download: responsible agent guardrails + policy templates',
    ],
    successMetrics: [
      { label: 'Executive Alignment Index', value: '78%', trend: 'up' },
      { label: 'Use Case Prioritisation Score', value: '4.3 / 5', trend: 'up' },
      { label: 'Risk & Compliance Readiness', value: 'Medium', trend: 'steady' },
    ],
    executiveActions: [
      'Nominate a cross-functional agent adoption council with both business and technical stewards.',
      'Approve time-boxed discovery sprints for top candidate workflows.',
      'Signal success measures (cycle time, satisfaction, margin) that adoption will move.',
    ],
  },
  {
    id: 'design-roadmap',
    label: 'Architect & Roadmap',
    horizon: 'Weeks 3-6',
    operatingModel: 'Blueprint the agentic operating system and investment thesis.',
    headline: 'Translate ambition into a pragmatic adaptive roadmap with funding, controls, and KPIs.',
    businessSignals: [
      'North star metrics tree linking each agentic capability to P&L or mission outcomes.',
      'Sequenced roadmap illustrating crawl → walk → run states with budget envelopes.',
      'Stakeholder readiness matrix covering legal, compliance, comms, and HR change levers.',
    ],
    technicalSignals: [
      'Reference architecture showing orchestration, memory, evaluation, and safety layers.',
      'Integration inventory with MCP/ACP compatibility and required adapters.',
      'Governance operating rhythm (design authority, change board, failure reviews).',
    ],
    enablementTracks: [
      'Co-design session: service blueprints for target journeys with human-in-the-loop points.',
      'Architecture deep dive: orchestrator-worker, evaluation harness, telemetry design.',
      'Risk clinic: simulate failure scenarios and incident playbooks.',
    ],
    successMetrics: [
      { label: 'Roadmap Confidence', value: 'B+', trend: 'up' },
      { label: 'Architecture Coverage', value: '92%', trend: 'up' },
      { label: 'Control Framework Fit', value: 'Strong', trend: 'steady' },
    ],
    executiveActions: [
      'Approve multi-quarter investment envelope with stage gates tied to value proof.',
      'Instantiate executive scorecard & cadence to review adoption velocity.',
      'Align incentives for product, data, and operations teams on shared KPIs.',
    ],
  },
  {
    id: 'pilot-build',
    label: 'Pilot & Build',
    horizon: 'Weeks 6-12',
    operatingModel: 'Deliver lighthouse experiences that prove value while hardening the stack.',
    headline: 'Ship dual-track pilots: customer-facing flow plus internal productivity booster.',
    businessSignals: [
      'Pilot charter with success thresholds, guardrails, and exit criteria approved by sponsors.',
      'Change management narrative, training plans, and communication kits ready.',
      'Insight loops to capture qualitative sentiment and quantitative telemetry in real time.',
    ],
    technicalSignals: [
      'Automated evaluation harness with golden tasks, regression suites, and fallbacks.',
      'Telemetry pipeline feeding operational dashboards (latency, containment, intervention rate).',
      'Secure runtime with secrets, policy gates, and human escalation workflows.',
    ],
    enablementTracks: [
      'Builder guild: hands-on pairing to construct agent flows, memory stores, and evaluation checks.',
      'Operations rehearsal: dry run of escalation playbooks and monitoring dashboards.',
      'Trust lab: red-team exercises validating policy, safety, and hallucination controls.',
    ],
    successMetrics: [
      { label: 'Pilot Value Realised', value: '+18% efficiency', trend: 'up' },
      { label: 'Automation Containment', value: '74%', trend: 'up' },
      { label: 'Trust & Safety Incidents', value: '0', trend: 'steady' },
    ],
    executiveActions: [
      'Green-light scaling only when pilots hit agreed confidence bands.',
      'Capture narrative case studies for board and frontline champions.',
      'Fund platform backlog to eliminate manual toil discovered during pilots.',
    ],
  },
  {
    id: 'scale-operate',
    label: 'Scale & Operate',
    horizon: 'Months 3-9',
    operatingModel: 'Industrialise patterns, platform capabilities, and continuous learning loops.',
    headline: 'Operationalise agentic capability as a managed product with measurable ROI.',
    businessSignals: [
      'Portfolio dashboard showing value, adoption, and risk posture by journey.',
      'Runbook for scaling into new geographies, business units, and regulatory contexts.',
      'Upskilling pathways for business SMEs to co-design and steward agent workflows.',
    ],
    technicalSignals: [
      'Platform SLOs codified (latency, resiliency, accuracy) with automated alerting.',
      'Pattern catalogue + component library published for reuse across teams.',
      'MLOps and model lifecycle alignment for retraining, evaluation, and rollback.',
    ],
    enablementTracks: [
      'Center of excellence rituals: show & tell, scorecards, postmortems.',
      'Federated build kits for teams to adopt guardrails without central bottlenecks.',
      'Line-of-business sandboxes with curated datasets and toolchains.',
    ],
    successMetrics: [
      { label: 'Agent Coverage', value: '12 journeys live', trend: 'up' },
      { label: 'Run-Cost per Interaction', value: '$0.43', trend: 'down' },
      { label: 'Reusable Components', value: '47 assets', trend: 'up' },
    ],
    executiveActions: [
      'Institutionalise CoE with budget, charter, and talent rotation programme.',
      'Embed agentic KPIs into business unit scorecards and incentives.',
      'Mandate continuous evaluation and ethical review cadence.',
    ],
  },
  {
    id: 'govern-evolve',
    label: 'Govern & Evolve',
    horizon: 'Months 9+',
    operatingModel: 'Continuously refine guardrails, portfolio strategy, and value realisation.',
    headline: 'Treat the agentic organisation as a living system with feedback, governance, and innovation loops.',
    businessSignals: [
      'Strategic options backlog for new revenue models, products, or partnerships.',
      'Board-ready narrative demonstrating ROI, trust posture, and societal impact.',
      'Policy update cadence aligning with evolving regulations and organisational ethics.',
    ],
    technicalSignals: [
      'Adaptive risk scoring and automated kill-switch instrumentation.',
      'Knowledge curation workflows to keep memory, retrieval, and tools evergreen.',
      'Innovation cycle linking research spikes to productionised capabilities.',
    ],
    enablementTracks: [
      'Executive foresight councils scanning frontier capabilities and risks.',
      'Responsible AI audit drills with transparency packs and model cards.',
      'Innovation incubator pairing research, product, and operations talent.',
    ],
    successMetrics: [
      { label: 'Portfolio NPV', value: '$48M', trend: 'up' },
      { label: 'Policy Drift Alerts', value: '2 / quarter', trend: 'steady' },
      { label: 'Innovation Throughput', value: '5 launches / quarter', trend: 'up' },
    ],
    executiveActions: [
      'Refresh strategy annually with scenario planning and external benchmarking.',
      'Sustain investment in platform talent, automation, and governance tooling.',
      'Publish transparency reports for customers, regulators, and employees.',
    ],
  },
];

const TREND_STYLES: Record<'up' | 'steady' | 'down', string> = {
  up: 'text-emerald-600 dark:text-emerald-400',
  steady: 'text-muted-foreground',
  down: 'text-rose-600 dark:text-rose-400',
};

const iconsForPhase: Record<string, React.ReactNode> = {
  'learn-align': <Compass size={20} className="text-primary" />,
  'design-roadmap': <ChartLineUp size={20} className="text-primary" />,
  'pilot-build': <RocketLaunch size={20} className="text-primary" />,
  'scale-operate': <CirclesThreePlus size={20} className="text-primary" />,
  'govern-evolve': <ShieldCheck size={20} className="text-primary" />,
};

interface TopNavSection {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface LeadershipLens {
  title: string;
  summary: string;
  points: string[];
  icon: React.ReactNode;
}

interface LegacyShift {
  dimension: string;
  legacy: string;
  agentic: string;
}

interface OperatingPillar {
  title: string;
  description: string;
  anchors: string[];
  icon: React.ReactNode;
}

interface OperatingCapability {
  label: string;
  description: string;
  components: string[];
}

interface ActivationStage {
  id: string;
  window: string;
  focus: string;
  moves: string[];
}

interface StrategyTemplate {
  title: string;
  description: string;
  outcome: string;
  ctaLabel: string;
  ctaHref?: string;
  icon: React.ReactNode;
}

interface ReferenceLink {
  name: string;
  description: string;
  href: string;
  provider: string;
}

const TOP_NAV_SECTIONS: TopNavSection[] = [
  {
    id: 'mission-brief',
    label: 'Mission Brief',
    description: 'Align ambition & value narrative',
    icon: <Compass size={18} className="text-primary" />,
  },
  {
    id: 'transformation-journey',
    label: 'Transformation Journey',
    description: 'Learn → Plan → Implement → Execute',
    icon: <RocketLaunch size={18} className="text-primary" />,
  },
  {
    id: 'operating-system',
    label: 'Operating System',
    description: 'Platform, governance, and rituals',
    icon: <Gear size={18} className="text-primary" />,
  },
  {
    id: 'activation',
    label: 'Activation Plan',
    description: 'First 90 days & support assets',
    icon: <Lightning size={18} className="text-primary" />,
  },
];

const TRANSFORMATION_LENSES: LeadershipLens[] = [
  {
    title: 'Business Leadership Lens',
    summary: 'Frame the journey as value creation with trust-by-design.',
    points: [
      'Codify ROI narratives that connect agentic capabilities to growth, resilience, and customer trust.',
      'Sequence portfolio bets with funding guardrails tied to measurable value checkpoints.',
      'Mobilise a coalition of business champions who can steer adoption rituals and storytelling.',
    ],
    icon: <UsersThree size={18} className="text-primary" />,
  },
  {
    title: 'Technical Platform Lens',
    summary: 'Stand up an opinionated runway for experimentation and scale.',
    points: [
      'Design the orchestrator, knowledge, and evaluation layers using Open Agent School blueprints.',
      'Instrument telemetry, observability, and automated guardrails before broad rollout.',
      'Enable federated builders with reusable components, golden tasks, and docs-as-code.',
    ],
    icon: <Lightning size={18} className="text-primary" />,
  },
  {
    title: 'Change & Culture Lens',
    summary: 'Shift mindsets and rituals from legacy handoffs to co-creative loops.',
    points: [
      'Craft a storytelling cadence that celebrates co-pilot wins and transparent lessons learned.',
      'Equip people leaders with training, playbooks, and psychological safety guardrails.',
      'Embed responsible AI policies into everyday decision forums and success metrics.',
    ],
    icon: <ShieldCheck size={18} className="text-primary" />,
  },
];

const LEGACY_AGENTIC_DELTA: LegacyShift[] = [
  {
    dimension: 'Decision Velocity',
    legacy: 'Quarterly steering, manual approvals, and inconsistent telemetry.',
    agentic: 'Live scorecards with automated evaluation loops and executive guardrails.',
  },
  {
    dimension: 'Workflow Design',
    legacy: 'Rigid processes with single-threaded handoffs and opaque data.',
    agentic: 'Composable journeys with human-in-the-loop checkpoints and rich context windows.',
  },
  {
    dimension: 'Risk & Trust',
    legacy: 'Policy binders updated annually, reactive incident response.',
    agentic: 'Always-on policy monitors, simulated failure drills, and transparent escalation kits.',
  },
  {
    dimension: 'Learning Loops',
    legacy: 'Training as one-off events; insights lost in slide decks.',
    agentic: 'Telemetry-fed retros, playbook refreshes, and community guilds sharing evidence.',
  },
];

const GUIDING_QUESTIONS: string[] = [
  'What business outcomes will prove to the board that agentic operations are indispensable?',
  'Which legacy workflows create the most friction for customers or frontline employees today?',
  'How will we evidence trust, compliance, and safety to regulators and partners?',
  'What capabilities must every squad master to operate within the agentic operating system?',
];

const STATUS_QUO_DISCOVERY: string[] = [
  'What problem is the right problem? What business value use case deserves attention?',
  'What products and services do customers want today in your industry?',
  'How are you passing back the value created to customers?',
  'Can it offer more cost-efficient services?',
  'What measures of productivity can be improved?',
  'What experiences can be redefined for customers, tailored to personalized engagement?',
  'What should you automate in existing or new processes to accelerate value generation?',
  'How can you enhance your value proposition?',
  'Where are the opportunities to accelerate time to deliver?',
  'What are the drivers of complexity in solving customer problem domains?',
  'What are some things marked as "hard before" that are now accessible with agentic AI?',
  'Is there value alignment—are customer intents met with your business value offering?',
  'Does your business today have the ability to turn insights into actionable intelligence?',
  'What new services can you add to your competitive advantage?',
  'How can you offer more for less with GenAI?',
  'How can you infuse and surface GenAI capabilities into legacy and existing applications?',
  'What value drivers differentiate your organization from others?',
  'What organizational knowledge and decision-making processes can agents augment to create compound learning effects over time?',
];

const OPERATING_PILLARS: OperatingPillar[] = [
  {
    title: 'Value Governance',
    description: 'Keep adoption tied to the mission, portfolio economics, and customer outcomes.',
    anchors: [
      'Executive scorecards with lead indicators (containment, satisfaction, margin).',
      'Quarterly value reviews that graduate pilots based on evidence, not intuition.',
      'Narrative library translating telemetry into board-ready insight stories.',
    ],
    icon: <ChartLineUp size={18} className="text-primary" />,
  },
  {
    title: 'Platform Excellence',
    description: 'Deliver resilient orchestration, observability, and evaluation as a managed product.',
    anchors: [
      'Golden tasks, regression suites, and fallbacks shipped with every new agent release.',
      'Realtime dashboards exposing SLOs, cost-to-serve, and intervention trends.',
      'Component marketplace with opinionated scaffolds for tool calling and knowledge.',
    ],
    icon: <Gear size={18} className="text-primary" />,
  },
  {
    title: 'Trust & Safety',
    description: 'Operationalise responsible AI policies as living guardrails.',
    anchors: [
      'Embedded policy checks pre-flight, in-flight, and post-flight for every workflow.',
      'Incident drills pairing legal, security, and product to rehearse escalations.',
      'Transparent audit packs with lineage, evaluations, and decision explanations.',
    ],
    icon: <ShieldCheck size={18} className="text-primary" />,
  },
  {
    title: 'People & Culture',
    description: 'Grow adaptive talent who can design, steward, and evolve agents.',
    anchors: [
      'Guild rituals for sharing playbooks, metrics, and rapid experimentation wins.',
      'Role-based learning paths aligned to Open Agent School curricula and labs.',
      'Talent rotation across product, operations, and platform squads.',
    ],
    icon: <UsersThree size={18} className="text-primary" />,
  },
];

const OPERATING_CAPABILITIES: OperatingCapability[] = [
  {
    label: 'Business System',
    description: 'Portfolio stewardship & change design',
    components: [
      'Outcome trees for each journey with value hypotheses and KPIs.',
      'Change story kits for customers, frontline teams, and regulators.',
      'Funding guardrails tied to telemetry and qualitative insight loops.',
    ],
  },
  {
    label: 'Platform System',
    description: 'Tooling, data, and runtime',
    components: [
      'Agent orchestrator with memory, evaluation, and fallback primitives.',
      'Knowledge governance pipeline keeping retrieval sources evergreen.',
      'Secure environments with policy-as-code and automated testing.',
    ],
  },
  {
    label: 'Operating Rhythm',
    description: 'Governance & feedback loops',
    components: [
      'Weekly adoption stand-ups synthesising value, risk, and learnings.',
      'Monthly portfolio reviews to rebalance investment and capacity.',
      'Bi-annual foresight summits exploring frontier capabilities and threats.',
    ],
  },
];

const ACTIVATION_TIMELINE: ActivationStage[] = [
  {
    id: 'stage-orient',
    window: 'Weeks 0-2',
    focus: 'Orientation & Alignment',
    moves: [
      'Run the executive literacy workshop using Open Agent School artefacts.',
      'Select 2 mission-critical workflows and capture baseline metrics.',
      'Draft a joint charter outlining value hypotheses, risks, and success criteria.',
    ],
  },
  {
    id: 'stage-design',
    window: 'Weeks 2-5',
    focus: 'Design & Roadmap',
    moves: [
      'Co-create service blueprints with human-in-the-loop checkpoints.',
      'Stand up the telemetry + evaluation harness on a sandbox dataset.',
      'Map governance cadence and escalation playbooks with legal and risk.',
    ],
  },
  {
    id: 'stage-build',
    window: 'Weeks 5-9',
    focus: 'Pilot & Build',
    moves: [
      'Pair builders with Open Agent School runners to ship dual-track pilots.',
      'Instrument dashboards covering containment, satisfaction, and run-cost.',
      'Conduct trust labs and red-team exercises to validate guardrails.',
    ],
  },
  {
    id: 'stage-scale',
    window: 'Weeks 9-12',
    focus: 'Scale & Operate',
    moves: [
      'Launch the center-of-excellence rituals and knowledge base.',
      'Publish reusable patterns and enable federated teams through enablement kits.',
      'Run executive review to green-light broader rollout with evidence packs.',
    ],
  },
];

const READINESS_CHECKLIST: string[] = [
  'Executive sponsor owns a success metric tied to the agentic journey.',
  'Telemetry and evaluation harness integrated with at least one pilot workflow.',
  'Responsible AI policy translated into actionable, enforceable controls.',
  'Cross-functional adoption squad established with defined operating cadence.',
  'Knowledge sources curated and tagged for retrieval, with freshness SLAs.',
  'Change and communications plan drafted for customers and employees.',
];

const MISSION_TEMPLATES: StrategyTemplate[] = [
  {
    title: 'Executive Alignment Charter',
    description: 'Clarify ambition, value narratives, and risk posture for the adoption council.',
    outcome: 'Shared north star with funding principles and trust guardrails.',
    ctaLabel: 'Use Charter Template',
    ctaHref: '/adoption/charter',
    icon: <ClipboardText size={18} className="text-primary" />,
  },
  {
    title: 'Portfolio Heatmap Canvas',
    description: 'Map candidate workflows against value, risk, and feasibility dimensions.',
    outcome: 'Prioritised shortlist for discovery sprints and telemetry pilots.',
    ctaLabel: 'Download Canvas',
    ctaHref: '/adoption/canvas',
    icon: <ChartLineUp size={18} className="text-primary" />,
  },
  {
    title: 'Trust & Governance Briefing Pack',
    description: 'Summarise compliance expectations, policy levers, and risk mitigation patterns.',
    outcome: 'Board-ready perspective on how agents meet regulatory and ethical requirements.',
    ctaLabel: 'Preview Briefing Pack',
    ctaHref: '/adoption/briefing',
    icon: <ShieldCheck size={18} className="text-primary" />,
  },
];

const JOURNEY_BLUEPRINTS: StrategyTemplate[] = [
  {
    title: 'Discovery Sprint Playbook',
    description: 'Step-by-step guide for week-long learn-and-align sprints with cross-functional squads.',
    outcome: 'Validated user stories, telemetry instrumentation plan, and decision log.',
    ctaLabel: 'Open Playbook',
    ctaHref: '/adoption/charter',
    icon: <Compass size={18} className="text-primary" />,
  },
  {
    title: 'Pilot Readiness Checklist',
    description: 'Checklist covering evaluation harness, safety approvals, and change enablement.',
    outcome: 'Pilots only launch with protective guardrails and success metrics in place.',
    ctaLabel: 'View Checklist',
    ctaHref: '/adoption/canvas',
    icon: <Lightning size={18} className="text-primary" />,
  },
  {
    title: 'Scaling Business Case Model',
    description: 'Financial model template connecting pilot evidence to rollout funding.',
    outcome: 'Stage-gated investment plan rooted in telemetry and ROI scenarios.',
    ctaLabel: 'Download Model',
    ctaHref: '/adoption/briefing',
    icon: <ChartLineUp size={18} className="text-primary" />,
  },
];

const OPERATING_TOOLKIT: StrategyTemplate[] = [
  {
    title: 'Operating Rhythm Blueprint',
    description: 'Define cadences for value reviews, incident drills, and innovation spikes.',
    outcome: 'Predictable governance motions across business, platform, and risk teams.',
    ctaLabel: 'Customize Blueprint',
    ctaHref: '#',
    icon: <Notebook size={18} className="text-primary" />,
  },
  {
    title: 'Platform SLO Contract',
    description: 'Template for codifying latency, containment, and escalation expectations.',
    outcome: 'Clear accountability for platform teams and consuming business units.',
    ctaLabel: 'Review Contract',
    ctaHref: '#',
    icon: <Gear size={18} className="text-primary" />,
  },
  {
    title: 'Responsible AI Policy Pack',
    description: 'Policy-as-code examples, escalation trees, and audit evidence checklists.',
    outcome: 'Operational guardrails embedded across the agent lifecycle.',
    ctaLabel: 'Download Policy Pack',
    ctaHref: '#',
    icon: <ShieldCheck size={18} className="text-primary" />,
  },
];

const ACTIVATION_KITS: StrategyTemplate[] = [
  {
    title: '90-Day Transformation Planner',
    description: 'Interactive planner linking weekly objectives, owners, and dependencies.',
    outcome: 'Transparent execution rhythm visible to sponsors and squads.',
    ctaLabel: 'Launch Planner',
    ctaHref: '#',
    icon: <Lightning size={18} className="text-primary" />,
  },
  {
    title: 'Change Narrative Toolkit',
    description: 'Messaging matrix, FAQs, and training cadence for frontline teams.',
    outcome: 'Consistent storytelling that builds confidence and adoption momentum.',
    ctaLabel: 'Use Toolkit',
    ctaHref: '#',
    icon: <UsersThree size={18} className="text-primary" />,
  },
  {
    title: 'Value Evidence Dashboard Starter',
    description: 'Telemetry dashboard schema with KPIs for value, trust, and efficiency.',
    outcome: 'Single pane for executive updates and scaling decisions.',
    ctaLabel: 'View Schema',
    ctaHref: '#',
    icon: <ChartLineUp size={18} className="text-primary" />,
  },
];

const REFERENCE_LIBRARY: ReferenceLink[] = [
  {
    name: 'Agentic AI Adoption (Microsoft)',
    description: 'Explore Microsoft’s adoption guidance with maturity models and governance insights.',
    href: 'https://adoption.microsoft.com/en-us/ai-agents',
    provider: 'Microsoft',
  },
  {
    name: 'Azure AI Strategy (CAF)',
    description: 'Frame your cloud adoption strategy for AI using the Cloud Adoption Framework playbooks.',
    href: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/strategy',
    provider: 'Microsoft Learn',
  },
  {
    name: 'AI Agent Handbook',
    description: 'Google Cloud’s guide to building AI agents with technical architectures and success metrics.',
    href: 'https://cloud.google.com/resources/content/ai-agent-handbook?hl=en',
    provider: 'Google Cloud',
  },
  {
    name: 'Practical Guide to Building Agents',
    description: 'OpenAI’s end-to-end manual covering design principles, orchestration, and evaluation patterns.',
    href: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
    provider: 'OpenAI',
  },
];

const AgenticAdoptionPlaybook: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState<string>(TOP_NAV_SECTIONS[0].id);
  const [isEfficiencyVideoOpen, setIsEfficiencyVideoOpen] = useState(false);
  const efficiencyVideoRef = useRef<HTMLVideoElement>(null);

  const closeEfficiencyVideo = () => {
    setIsEfficiencyVideoOpen(false);
    if (efficiencyVideoRef.current) {
      efficiencyVideoRef.current.pause();
      efficiencyVideoRef.current.currentTime = 0;
    }
  };

  // Escape key handler for video modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEfficiencyVideoOpen) closeEfficiencyVideo();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isEfficiencyVideoOpen]);

  const handleViewJourney = React.useCallback(() => {
    setActiveSection('transformation-journey');
    window.requestAnimationFrame(() => {
      document.getElementById('transformation-journey')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [setActiveSection]);

  return (
    <div className="space-y-10">
      {/* Marketing Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-violet-500/5 to-fuchsia-500/5 p-10 md:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-violet-600/20 border border-primary/30 mb-2">
            <Buildings size={20} className="text-primary" />
            <span className="text-sm font-bold text-primary">Executive Playbook</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              From Pilot Chaos
            </span>
            <br />
            <span className="text-foreground">
              to Production Velocity
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
            Most AI initiatives stall in <strong className="text-foreground">pilot purgatory</strong>—endless demos, unclear ROI, fragmented ownership. 
            This playbook embeds <strong className="text-foreground">evaluation harnesses, governance guardrails, and velocity metrics</strong> from day one 
            so expansion doesn't amplify fragility.
          </p>

          <div className="grid md:grid-cols-3 gap-4 pt-4">
            {[
              { icon: <ChartLineUp size={24} />, label: 'Stakeholder Alignment', value: 'Weeks, not quarters' },
              { icon: <ShieldCheck size={24} />, label: 'Risk Mitigation', value: 'Governance-ready' },
              { icon: <RocketLaunch size={24} />, label: 'Value Proof', value: 'Measurable ROI' }
            ].map(item => (
              <div key={item.label} className="p-4 rounded-xl border bg-card/60 backdrop-blur-sm flex flex-col items-center gap-2">
                <div className="text-primary">{item.icon}</div>
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="group shadow-lg"
              onClick={handleViewJourney}
            >
              <Compass className="mr-2" size={20} />
              Start Adoption Journey
              <Lightning className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                const element = document.getElementById('journey-blueprints');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <FileArrowDown className="mr-2" size={20} />
              Download Templates
            </Button>
          </div>

          <p className="text-xs text-muted-foreground uppercase tracking-wide pt-2">
            Interactive Charter Builder • Portfolio Heatmap • Board Briefing Pack • AI-Powered Scoring
          </p>
        </div>
      </section>

      <header className="grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-lg shadow-primary/5 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">New Transformation Track</Badge>
            <ShareButton
              url={`${window.location.origin}/adoption-playbook`}
              title="Agentic Adoption Playbook - Open Agent School"
              description="A guided adoption journey that moves your enterprise from legacy workflows to trusted agentic operations—balancing velocity with governance."
              variant="outline"
              size="sm"
              analyticsCategory="Adoption Playbook Share"
            />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Agentify Your Organisation
            </h1>
            <p className="text-lg text-muted-foreground">
              A guided adoption journey that moves your enterprise from legacy workflows to trusted agentic operations—balancing velocity with governance for both business and technical leaders.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border border-border bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UsersThree size={18} className="text-primary" /> Business Leadership Wins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Craft a strategic narrative tied to measurable ROI, customer trust, and cultural adoption.</p>
                <p>Unlock a prioritised portfolio, funding model, and governance cadence purpose-built for agents.</p>
              </CardContent>
            </Card>
            <Card className="border border-border bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lightning size={18} className="text-primary" /> Technical Leadership Wins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Stand up an opinionated platform with orchestration, evaluation, and safety baked in.</p>
                <p>Enable federated teams with reusable patterns, observability, and automated guardrails.</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5">
              <WaveTriangle size={16} className="text-primary" />
              Dual-track focus: value acceleration + responsible operations
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5">
              <Gear size={16} className="text-primary" />
              Co-created with Open Agent School playbooks & toolkits
            </div>
          </div>
        </div>
        <Card className="border border-border bg-background/60">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Buildings size={18} className="text-primary" /> Adoption Flight Deck
            </CardTitle>
            <CardDescription className="text-xs uppercase text-muted-foreground tracking-wide">
              Snapshot of where you are & what great looks like
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-muted-foreground">
                <span>Foundational Literacy</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-muted-foreground">
                <span>Platform Readiness</span>
                <span>40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-muted-foreground">
                <span>Trust & Governance</span>
                <span>54%</span>
              </div>
              <Progress value={54} className="h-2" />
            </div>
            <Separator />
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">North Star</p>
              <p className="text-sm text-foreground">"Every mission-critical workflow has an agentic co-pilot with measurable ROI and auditable guardrails."</p>
            </div>
            <Button size="sm" className="w-full" onClick={handleViewJourney}>
              View Journey Roadmap
            </Button>
          </CardContent>
        </Card>
      </header>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
        <TabsList className="grid w-full gap-3 bg-transparent p-0 sm:grid-cols-2 lg:grid-cols-4">
          {TOP_NAV_SECTIONS.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="group flex min-h-[120px] flex-col items-start justify-start gap-3 rounded-lg border border-border/50 bg-card/80 px-4 py-4 text-left shadow-sm backdrop-blur-sm transition-all hover:border-border/70 hover:bg-card hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=active]:border-primary/70 data-[state=active]:bg-primary/5 data-[state=active]:shadow-md dark:border-border dark:bg-card/60 dark:hover:border-border dark:hover:bg-card/70 dark:data-[state=active]:border-primary/50 dark:data-[state=active]:bg-primary/10"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-data-[state=active]:bg-primary/20 dark:bg-primary/20 dark:group-data-[state=active]:bg-primary/30">
                {section.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold leading-tight text-foreground">{section.label}</span>
                <span className="text-xs font-normal leading-snug text-muted-foreground">{section.description}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="mission-brief" className="mt-16 space-y-10">
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Mission Brief: Adopt an Organisation</h2>
              <p className="text-sm text-muted-foreground">
                Ground your leadership team in a shared ambition. Use this brief to translate Open Agent School learning into the narrative, outcomes, and cultural commitments that power adoption.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {TRANSFORMATION_LENSES.map((lens) => (
                <Card key={lens.title} className="border border-border bg-background/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-foreground">
                      {lens.icon}
                      {lens.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{lens.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {lens.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Status Quo Discovery Questions</h3>
              <p className="text-sm text-muted-foreground">Before jumping to solutions, critically assess your current state. Use these prompts to surface the right opportunities and validate business value fit.</p>
            </div>
            <Card className="border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                  <CirclesThreePlus size={18} className="text-primary" /> Discovery Framework for Agentic Opportunities
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Frame workshops, executive offsites, or portfolio reviews with these value-oriented questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 text-sm text-foreground sm:grid-cols-2">
                  {STATUS_QUO_DISCOVERY.map((question) => (
                    <li key={question} className="flex items-start gap-2 rounded-lg border border-border/60 bg-background/80 p-3 backdrop-blur-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Legacy → Agentic Shift</h3>
              <p className="text-sm text-muted-foreground">Contrast how your organisation operates today with the behaviours of an agentic enterprise.</p>
            </div>
            <div className="grid gap-4">
              {LEGACY_AGENTIC_DELTA.map((item) => (
                <Card key={item.dimension} className="border border-border/70 bg-background/70">
                  <CardHeader className="gap-2">
                    <Badge variant="outline" className="w-max border-primary/40 bg-primary/5 text-primary">{item.dimension}</Badge>
                    <CardTitle className="text-base text-foreground">Reimagine the operating posture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 rounded-2xl border border-border/60 bg-background/80 p-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legacy Pattern</p>
                        <p className="text-sm text-muted-foreground">{item.legacy}</p>
                      </div>
                      <div className="space-y-2 rounded-xl border border-primary/30 bg-primary/5 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Agentic Pattern</p>
                        <p className="text-sm text-foreground">{item.agentic}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <Card className="border border-border bg-muted/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                  <Compass size={18} className="text-primary" /> Guiding Questions for the Adoption Council
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Use these prompts to shape workshops or executive offsites.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {GUIDING_QUESTIONS.map((question) => (
                    <li key={question} className="rounded-xl border border-border/60 bg-background/70 p-3">
                      {question}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Strategy Templates</h3>
                <p className="text-sm text-muted-foreground">Kick off with facilitation-ready artefacts tailored to executive and portfolio conversations.</p>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {MISSION_TEMPLATES.map((template) => (
                <Card key={template.title} className="border border-border bg-background/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-foreground">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {template.icon}
                      </span>
                      {template.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Outcome</p>
                      <p className="text-sm text-foreground">{template.outcome}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={template.ctaHref}>
                          <FileArrowDown size={16} className="mr-2" />
                          {template.ctaLabel}
                        </Link>
                      </Button>
                      <ShareButton
                        url={`${window.location.origin}${template.ctaHref}`}
                        title={template.title}
                        description={template.description}
                        variant="outline"
                        size="sm"
                        analyticsCategory="Strategy Template Share"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent id="transformation-journey" value="transformation-journey" className="mt-16 space-y-10">
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Transformation Journey</h2>
              <p className="text-sm text-muted-foreground">Progress from literacy to industrialised execution. Each phase integrates business stewardship and technical excellence.</p>
            </div>
            <Tabs defaultValue={JOURNEY_PHASES[0].id} className="w-full">
              <div className="rounded-xl border border-border/60 bg-card/50 p-4 shadow-sm backdrop-blur-sm dark:border-border dark:bg-card/40">
                <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                  {JOURNEY_PHASES.map((phase) => (
                    <TabsTrigger
                      key={phase.id}
                      value={phase.id}
                      className="flex min-w-[13rem] flex-1 items-center justify-center gap-2 rounded-lg border border-border/0 bg-background/80 px-4 py-3 text-sm font-medium leading-snug text-muted-foreground transition-all hover:border-border/40 hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm dark:bg-muted/40 dark:hover:bg-muted/60 dark:data-[state=active]:border-primary/50 dark:data-[state=active]:bg-primary/15"
                    >
                      {iconsForPhase[phase.id]}
                      <span className="whitespace-nowrap">{phase.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {JOURNEY_PHASES.map((phase) => (
                <TabsContent key={phase.id} value={phase.id} className="mt-8 space-y-6">
                  <Card className="border border-border/80 bg-card shadow-sm dark:border-border dark:bg-card/80">
                    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl leading-snug text-foreground">{phase.headline}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed text-muted-foreground">{phase.operatingModel}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="whitespace-nowrap border-border bg-background dark:border-border dark:bg-background/80">
                          Horizon: {phase.horizon}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="border border-border bg-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base text-foreground">
                          <UsersThree size={18} className="text-primary" /> Business Leadership Focus
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">Signals you are shaping the right narrative and behavioural change.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          {phase.businessSignals.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-border bg-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base text-foreground">
                          <Lightning size={18} className="text-primary" /> Technical Platform Focus
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">Outcomes your platform, data, and engineering teams should showcase.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          {phase.technicalSignals.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-border bg-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base text-foreground">
                          <Gear size={18} className="text-primary" /> Enablement & Culture
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">Design the rituals, skills, and tooling to keep momentum.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          {phase.enablementTracks.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Show Frontier Capabilities in Scale & Operate phase */}
                  {phase.id === 'scale-operate' && (
                    <>
                      <FrontierCapabilitiesCallout />
                      
                      {/* Drive Verifiable Efficiency Video */}
                      <div className="mt-6 mb-4">
                        <button
                          onClick={() => setIsEfficiencyVideoOpen(true)}
                          className="group relative w-full max-w-lg mx-auto rounded-xl overflow-hidden border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 block"
                        >
                          <div className="aspect-video bg-gradient-to-br from-emerald-500/20 via-primary/10 to-teal-500/20 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            <div className="relative z-10 flex flex-col items-center gap-3">
                              <div className="w-16 h-16 rounded-full bg-emerald-500/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-foreground bg-background/80 px-3 py-1 rounded-full">Drive Verifiable Efficiency</span>
                            </div>
                          </div>
                        </button>
                        <p className="text-center text-xs text-muted-foreground mt-2">See how teams achieve measurable ROI with agentic workflows</p>
                      </div>
                    </>
                  )}

                  <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
                    <Card className="border border-border bg-background/70">
                      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="text-base text-foreground">Executive Moves</CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">Decisions that unlock momentum and reduce friction.</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          {phase.executiveActions.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-border bg-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base text-foreground">
                          <ChartLineUp size={18} className="text-primary" /> Success Scoreboard
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">Monitor leading indicators before lagging KPIs catch up.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {phase.successMetrics.map((metric) => (
                          <div key={metric.label} className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
                            <div className="flex items-center justify-between text-sm text-foreground">
                              <span className="font-medium">{metric.label}</span>
                              <span className={cn('font-semibold', metric.trend && TREND_STYLES[metric.trend])}>{metric.value}</span>
                            </div>
                            {metric.trend && (
                              <p className="text-xs text-muted-foreground">
                                Trend: {metric.trend === 'up' ? 'Accelerating' : metric.trend === 'down' ? 'Needs attention' : 'Holding steady'}
                              </p>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <section id="journey-blueprints" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Journey Blueprint Library</h3>
                <p className="text-sm text-muted-foreground">Blend learning, planning, implementing, and executing with templates ready for each horizon.</p>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {JOURNEY_BLUEPRINTS.map((blueprint) => (
                <Card key={blueprint.title} className="border border-border bg-background/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-foreground">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {blueprint.icon}
                      </span>
                      {blueprint.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{blueprint.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Outcome</p>
                      <p className="text-sm text-foreground">{blueprint.outcome}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={blueprint.ctaHref} target="_blank" rel="noreferrer">
                          <FileArrowDown size={16} className="mr-2" />
                          {blueprint.ctaLabel}
                        </a>
                      </Button>
                      <ShareButton
                        url={blueprint.ctaHref === '#' ? `${window.location.origin}/adoption-playbook` : blueprint.ctaHref}
                        title={blueprint.title}
                        description={blueprint.description}
                        variant="outline"
                        size="sm"
                        analyticsCategory="Journey Blueprint Share"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="operating-system" className="mt-16 space-y-10">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Agentic Operating System</h2>
            <p className="text-sm text-muted-foreground">Design the connective tissue—governance, platform, and culture—that keeps the organisation responsive as adoption scales.</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            {OPERATING_PILLARS.map((pillar) => (
              <Card key={pillar.title} className="border border-border bg-background/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base text-foreground">
                    {pillar.icon}
                    {pillar.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{pillar.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {pillar.anchors.map((anchor) => (
                      <li key={anchor} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                        <span>{anchor}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Capabilities You Must Operationalise</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {OPERATING_CAPABILITIES.map((capability) => (
                <Card key={capability.label} className="border border-border/60 bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-base text-foreground">{capability.label}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{capability.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {capability.components.map((component) => (
                        <li key={component} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                          <span>{component}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Operating System Templates</h3>
              <p className="text-sm text-muted-foreground">Codify how value, governance, and platform operations show up day to day.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {OPERATING_TOOLKIT.map((template) => (
                <Card key={template.title} className="border border-border bg-background/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-foreground">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {template.icon}
                      </span>
                      {template.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Outcome</p>
                      <p className="text-sm text-foreground">{template.outcome}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={template.ctaHref} target="_blank" rel="noreferrer">
                          <FileArrowDown size={16} className="mr-2" />
                          {template.ctaLabel}
                        </a>
                      </Button>
                      <ShareButton
                        url={template.ctaHref === '#' ? `${window.location.origin}/adoption-playbook` : template.ctaHref}
                        title={template.title}
                        description={template.description}
                        variant="outline"
                        size="sm"
                        analyticsCategory="Operating Toolkit Share"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="activation" className="mt-16 space-y-10">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Activation Plan: First 90 Days</h2>
            <p className="text-sm text-muted-foreground">Sequence your adoption moves with a clear drumbeat that blends learning, planning, implementing, and executing.</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            {ACTIVATION_TIMELINE.map((stage, index) => (
              <Card key={stage.id} className="border border-border bg-background/70">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-primary/40 bg-primary/5 text-primary">Stage {index + 1}</Badge>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{stage.window}</span>
                  </div>
                  <CardTitle className="text-base text-foreground">{stage.focus}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Focus the squad on the moves that unlock the next horizon.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {stage.moves.map((move) => (
                      <li key={move} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                        <span>{move}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
            <Card className="border border-border bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Readiness Checklist</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Confirm these foundations before scaling beyond the first workflow.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {READINESS_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-start gap-2 rounded-xl border border-border/50 bg-background/70 p-3">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border bg-background/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                  <WaveTriangle size={18} className="text-primary" /> Momentum Signals
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Keep these indicators visible in every exec check-in.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <p className="font-semibold text-foreground">Adoption Velocity</p>
                  <p>Percentage of priority workflows with active pilots and telemetry.</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <p className="font-semibold text-foreground">Trust Confidence</p>
                  <p>Containment rate, escalation volume, and policy drift alerts per quarter.</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <p className="font-semibold text-foreground">Value Realisation</p>
                  <p>Evidence of efficiency, revenue lift, or risk reduction tied to agentic flows.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 rounded-3xl border border-primary/40 bg-primary/5 p-6 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary">How Open Agent School Supports Your Transformation</h3>
              <p className="text-sm text-muted-foreground">
                Use the curriculum, playbooks, and live runners you mastered to fuel each adoption phase. We supply the metrics, templates, and evaluation harnesses so your teams spend more time instrumenting value and less time stitching the basics.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Card className="border border-border/60 bg-background/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-foreground">
                      <Compass size={18} className="text-primary" /> Strategy Sprint Toolkit
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="space-y-2">
                      <li>Frontier Firm assessment to baseline maturity.</li>
                      <li>Portfolio prioritisation canvas with value, risk, and effort scoring.</li>
                      <li>Executive briefing packs drawn from Concepts Hub &amp; AI-native practices.</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-border/60 bg-background/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-foreground">
                      <RocketLaunch size={18} className="text-primary" /> Builder Enablement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="space-y-2">
                      <li>Pattern library + live runners for orchestrator-worker, evaluation, MCP.</li>
                      <li>Study Mode drills for tool adoption, safety scenarios, and incident response.</li>
                      <li>Velocity playbooks to measure cycle time, rework, and automation coverage.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-background/60 p-5">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-foreground">Ready to activate?</h4>
                <p className="text-sm text-muted-foreground">
                  Assemble a joint squad of product, operations, data, and platform leads. Bring a single workflow you want to transform—we will pair it with the right playbooks and code assets.
                </p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> Responsible AI guardrails embedded from day one.</p>
                <p className="flex items-center gap-2"><Gear size={16} className="text-primary" /> Deployment blueprints ready for Azure, MCP, or custom stacks.</p>
                <p className="flex items-center gap-2"><Compass size={16} className="text-primary" /> Continuous learning loop powered by Open Agent School.</p>
              </div>
              <Button asChild size="lg" className="w-full">
                <a href="mailto:hello@openagentschool.org?subject=Agentic%20Adoption%20Workshop">Book a discovery session</a>
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Activation Kits & Dashboards</h3>
              <p className="text-sm text-muted-foreground">Equip your squads with templated planners, communication packs, and evidence dashboards.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {ACTIVATION_KITS.map((kit) => (
                <Card key={kit.title} className="border border-border bg-background/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-foreground">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {kit.icon}
                      </span>
                      {kit.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{kit.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Outcome</p>
                      <p className="text-sm text-foreground">{kit.outcome}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={kit.ctaHref} target="_blank" rel="noreferrer">
                          <FileArrowDown size={16} className="mr-2" />
                          {kit.ctaLabel}
                        </a>
                      </Button>
                      <ShareButton
                        url={kit.ctaHref === '#' ? `${window.location.origin}/adoption-playbook` : kit.ctaHref}
                        title={kit.title}
                        description={kit.description}
                        variant="outline"
                        size="sm"
                        analyticsCategory="Activation Kit Share"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Reference Library</h3>
              <p className="text-sm text-muted-foreground">Lean on industry-grade guidance to complement Open Agent School templates.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {REFERENCE_LIBRARY.map((resource) => (
                <Card key={resource.href} className="border border-border bg-background/70">
                  <CardHeader>
                    <Badge variant="outline" className="w-max border-primary/40 bg-primary/10 text-primary">{resource.provider}</Badge>
                    <CardTitle className="text-base text-foreground">{resource.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="px-0 text-primary" asChild>
                      <a href={resource.href} target="_blank" rel="noreferrer">
                        Explore Resource
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Efficiency Video Modal */}
      {isEfficiencyVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeEfficiencyVideo}
        >
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeEfficiencyVideo}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video
              ref={efficiencyVideoRef}
              className="w-full rounded-xl shadow-2xl"
              controls
              autoPlay
              src="/video/Drive_Verifiable_Efficiency_version_1.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenticAdoptionPlaybook;
