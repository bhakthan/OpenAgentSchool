import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Database,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Eye,
  EyeOff,
  Brain,
  Target,
  Layers,
  RefreshCw,
  Clock,
  FileText,
  TrendingUp,
  XCircle,
  AlertCircle,
  Zap,
  Lock,
  Unlock,
  BarChart3,
  GitBranch,
  Scale
} from 'lucide-react';
import ConceptLayout from './ConceptLayout';
import EnlightenMeButton from '@/components/concepts/EnlightenMeButton';

// Trust erosion stages
interface TrustErosionStage {
  id: string;
  stage: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  symptoms: string[];
  reversibility: 'easy' | 'moderate' | 'hard' | 'very-hard';
}

// Data maturity stages
interface DataMaturityStage {
  id: string;
  stage: number;
  name: string;
  description: string;
  characteristics: string[];
  useCase: string;
  color: string;
}

// Constraint types
interface DataConstraint {
  id: string;
  name: string;
  icon: React.ReactNode;
  rootCauses: string[];
  manifestations: string[];
  aiImpact: string;
}

const trustErosionStages: TrustErosionStage[] = [
  {
    id: 'skepticism',
    stage: 1,
    name: 'Initial Skepticism',
    icon: <Eye className="w-5 h-5" />,
    description: 'First AI recommendation contradicts user\'s domain knowledge.',
    symptoms: [
      'User investigates, discovers data inconsistency',
      'Mental note: "Need to verify AI outputs"',
      'Subtle distrust begins to form'
    ],
    reversibility: 'easy'
  },
  {
    id: 'verification',
    stage: 2,
    name: 'Routine Verification',
    icon: <CheckCircle className="w-5 h-5" />,
    description: 'Multiple errors accumulate; users develop verification rituals.',
    symptoms: [
      'AI becomes "rough draft generator" requiring human cleanup',
      'Time savings evaporate as verification takes as long as doing it manually',
      'Users develop workaround habits'
    ],
    reversibility: 'moderate'
  },
  {
    id: 'resistance',
    stage: 3,
    name: 'Active Resistance',
    icon: <XCircle className="w-5 h-5" />,
    description: 'Users bypass AI system entirely, using it only when mandated.',
    symptoms: [
      'Shadow processes emerge to "work around" the AI',
      'Cultural narrative forms: "AI doesn\'t understand our business"',
      'Reduced adoption despite executive mandate'
    ],
    reversibility: 'hard'
  },
  {
    id: 'institutional',
    stage: 4,
    name: 'Institutional Skepticism',
    icon: <EyeOff className="w-5 h-5" />,
    description: 'Organization-wide resistance to AI initiatives.',
    symptoms: [
      'New projects face "we tried that before" objections',
      'Trust deficit extends beyond AI to data initiatives generally',
      'Cultural reconstruction required—technical fixes insufficient'
    ],
    reversibility: 'very-hard'
  }
];

const dataMaturityStages: DataMaturityStage[] = [
  {
    id: 'raw',
    stage: 0,
    name: 'Raw Data',
    description: 'Data exists but quality unknown.',
    characteristics: [
      'Inconsistent definitions across sources',
      'No formal ownership or SLAs',
      'Quality unknown'
    ],
    useCase: 'Manual analysis only, high verification overhead',
    color: 'bg-red-500'
  },
  {
    id: 'curated',
    stage: 1,
    name: 'Curated Data',
    description: 'Basic cleaning and validation applied.',
    characteristics: [
      'Common definitions documented',
      'Quality issues tracked but not prevented',
      'Basic validation in place'
    ],
    useCase: 'Reporting and dashboards with caveats',
    color: 'bg-orange-500'
  },
  {
    id: 'decision-ready',
    stage: 2,
    name: 'Decision-Ready',
    description: 'Named data owners with accountability.',
    characteristics: [
      'Quality gates prevent bad data from propagating',
      'Humans trust data enough to act on it',
      'Clear ownership and SLAs'
    ],
    useCase: 'Human decision support, analytics that drive action',
    color: 'bg-yellow-500'
  },
  {
    id: 'ai-ready',
    stage: 3,
    name: 'AI-Ready',
    description: 'Machine-readable metadata and lineage.',
    characteristics: [
      'Automated quality monitoring and alerting',
      'Contracts with programmatic enforcement',
      'Full computational lineage'
    ],
    useCase: 'Automated decision-making with human oversight',
    color: 'bg-green-500'
  },
  {
    id: 'autonomous',
    stage: 4,
    name: 'Autonomous Data',
    description: 'Self-healing data pipelines.',
    characteristics: [
      'Adaptive quality standards that evolve with usage',
      'Continuous learning from decision outcomes',
      'Self-correcting systems'
    ],
    useCase: 'Fully automated decision-making at scale',
    color: 'bg-emerald-500'
  }
];

const visibleConstraints: DataConstraint[] = [
  {
    id: 'definitions',
    name: 'Inconsistent Definitions',
    icon: <FileText className="w-5 h-5" />,
    rootCauses: [
      'Legacy systems with embedded undocumented business logic',
      'M&A activities merging incompatible data models',
      'Department-specific customizations overriding standards',
      'Regulatory changes altering definitions mid-stream'
    ],
    manifestations: [
      '"Revenue" calculated differently in sales, finance, and operations',
      '"Customer" meaning individual vs. account vs. billing entity',
      'Regional variations in "inventory" counting methods',
      'Time zone inconsistencies creating different "month-end" timestamps'
    ],
    aiImpact: 'When an AI agent encounters "customer churn rate" from three sources showing 8%, 12%, and 15% for the same period, it has no basis to determine truth. AI systems amplify inconsistency into unreliability.'
  },
  {
    id: 'ownership',
    name: 'No Clear Ownership',
    icon: <Users className="w-5 h-5" />,
    rootCauses: [
      'Diffused responsibility across producers, platforms, and consumers',
      'Incentive misalignment—creators not measured on downstream quality',
      'Data treated as byproduct, not deliverable',
      'Organizational silos where data crosses reporting lines'
    ],
    manifestations: [
      '"Not my problem" cascades across teams when issues arise',
      'No single person can answer "who ensures product master data is current?"',
      'Change requests languish without clear approval authority',
      'Documentation becomes outdated as ownership transfers'
    ],
    aiImpact: 'AI agents require authoritative sources. Without named, accountable owners who can certify data provenance and quality, every data point becomes suspect. Governance cannot be crowd-sourced.'
  },
  {
    id: 'transformations',
    name: 'Opaque Transformations',
    icon: <GitBranch className="w-5 h-5" />,
    rootCauses: [
      'Technical debt accumulated over years without refactoring',
      'Point-to-point integrations creating spaghetti data flows',
      'Business logic embedded in tools rather than central repositories',
      'Shadow IT creating parallel transformation pipelines'
    ],
    manifestations: [
      'Lineage tools show flows but not business logic at each step',
      'Only original developer can explain certain filters or adjustments',
      'Production and reporting numbers differ without documented reconciliation',
      '"Special case" handling coded directly into pipelines'
    ],
    aiImpact: 'Black-box transformations are poison to AI trust. If the AI cannot trace a value from source through every transformation step with documented business logic, that value is unreliable for automated decision-making.'
  }
];

const AIReadyDataConcept: React.FC = () => {
  const [selectedErosionStage, setSelectedErosionStage] = useState<string>('skepticism');
  const [selectedMaturityStage, setSelectedMaturityStage] = useState<string>('raw');
  const [selectedConstraint, setSelectedConstraint] = useState<string>('definitions');

  const currentErosionStage = trustErosionStages.find(s => s.id === selectedErosionStage);
  const currentMaturityStage = dataMaturityStages.find(s => s.id === selectedMaturityStage);
  const currentConstraint = visibleConstraints.find(c => c.id === selectedConstraint);

  return (
    <ConceptLayout
      conceptId="ai-ready-data"
      title="AI-Ready Data: From Data to Decisions"
      description="AI agents don't create trust—they consume it. Learn to build decision-grade data foundations that enable reliable automation."
    >
      {/* Hero Card */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                Strategic Foundation
              </Badge>
              <h2 className="text-2xl font-bold mb-2">The Trust Equation</h2>
              <p className="text-emerald-100 max-w-2xl">
                The fundamental challenge isn't whether AI can make decisions, but whether it has
                <span className="font-semibold text-white"> decision-grade data </span>
                to work with.
              </p>
            </div>
            <Database className="w-16 h-16 text-emerald-200/50" />
          </div>
          
          {/* Key Equation */}
          <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="text-center">
              <div className="text-lg font-mono tracking-wide">
                <span className="text-cyan-200">AI Capability</span>
                <span className="mx-2">×</span>
                <span className="text-emerald-200">Data Trust</span>
                <span className="mx-2">=</span>
                <span className="text-yellow-200 font-bold">Business Value</span>
              </div>
              <p className="text-sm text-emerald-100 mt-2">
                When data trust is zero, it doesn't matter how sophisticated your AI is—you get zero value.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-4 text-center text-sm text-emerald-100 italic">
            "Trust compounds. So does its absence."
          </div>
        </div>
      </Card>

      {/* AI-Ready Data Framework Infographic */}
      <div className="mb-8 rounded-xl border bg-slate-100 dark:bg-slate-900/30 p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <Layers className="w-4 h-4" /> The AI-Ready Data Framework
        </h3>
        <img 
          src="/images/AI_ready_data.webp" 
          alt="AI-Ready Data: From Data to Decisions - 8-part framework covering visible cracks, trust trap, shadow forces, decision DNA, trust architecture, the maturity ladder, the flywheel, and the strategic imperative" 
          className="w-full rounded-lg shadow-sm border"
          loading="lazy"
        />
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 text-center">
          The complete journey from siloed, untrusted data to AI-ready decision intelligence
        </p>
      </div>

      <Tabs defaultValue="visible-cracks" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="visible-cracks" className="text-xs sm:text-sm">Visible Cracks</TabsTrigger>
          <TabsTrigger value="trust-trap" className="text-xs sm:text-sm">The Trust Trap</TabsTrigger>
          <TabsTrigger value="shadow-forces" className="text-xs sm:text-sm">Shadow Forces</TabsTrigger>
          <TabsTrigger value="decision-dna" className="text-xs sm:text-sm">Decision DNA</TabsTrigger>
          <TabsTrigger value="trust-architecture" className="text-xs sm:text-sm">Trust Architecture</TabsTrigger>
          <TabsTrigger value="the-ladder" className="text-xs sm:text-sm">The Ladder</TabsTrigger>
          <TabsTrigger value="the-flywheel" className="text-xs sm:text-sm">The Flywheel</TabsTrigger>
          <TabsTrigger value="the-imperative" className="text-xs sm:text-sm">The Imperative</TabsTrigger>
        </TabsList>

        {/* Tab 1: Visible Cracks - Real Constraints */}
        <TabsContent value="visible-cracks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                The Visible Foundation: Real Constraints
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Organizations suffer from three fundamental data constraints that form the visible cracks in their AI readiness.
                These aren't hidden—they're the challenges teams discuss in meetings but struggle to resolve.
              </p>

              {/* Constraint Selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visibleConstraints.map((constraint) => (
                  <Card
                    key={constraint.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedConstraint === constraint.id
                        ? 'ring-2 ring-primary border-primary'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedConstraint(constraint.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          selectedConstraint === constraint.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          {constraint.icon}
                        </div>
                        <span className="font-medium text-sm">{constraint.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Selected Constraint Details */}
              {currentConstraint && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Root Causes
                        </h4>
                        <ul className="space-y-2">
                          {currentConstraint.rootCauses.map((cause, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-amber-500 mt-1">•</span>
                              {cause}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Manifestations
                        </h4>
                        <ul className="space-y-2">
                          {currentConstraint.manifestations.map((m, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-blue-500 mt-1">•</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-sm text-destructive mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        AI Impact
                      </h4>
                      <p className="text-sm bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                        {currentConstraint.aiImpact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <EnlightenMeButton
                title="Visible Constraints"
                conceptId="ai-ready-data"
                description="Understanding the three fundamental data constraints: inconsistent definitions, no clear ownership, and opaque transformations."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: The Trust Trap */}
        <TabsContent value="trust-trap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                The Trust Trap: Where Automation Meets Reality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* What Most Teams Do vs What Works */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                      <XCircle className="w-5 h-5" />
                      What Most Teams Do
                    </CardTitle>
                    <p className="text-sm text-red-600/80 dark:text-red-400/80">Automates Uncertainty</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Add AI on top of existing data infrastructure
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Layer RAG over current databases
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Tune prompts to work around quality issues
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Hope volume compensates for quality
                      </li>
                    </ul>
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <p className="text-xs text-red-700 dark:text-red-300 font-medium">
                        Result: Faster failure at scale. AI accelerates decisions based on bad data.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      What Actually Works
                    </CardTitle>
                    <p className="text-sm text-green-600/80 dark:text-green-400/80">Enables Reliable Automation</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Decision-grade data: information trusted enough for consequential actions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Clear ownership: named individuals responsible for each domain
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Governed contracts: explicit SLAs for accuracy, freshness, completeness
                      </li>
                    </ul>
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                        Result: Multiplier effect comes from reliable inputs, not sophisticated algorithms.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trust Erosion Mechanism */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">The Trust Erosion Mechanism</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Trust doesn't collapse instantly—it erodes through repeated micro-failures that compound over time.
                    Each stage is harder to reverse than the previous.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stage Selector */}
                  <div className="flex flex-wrap gap-2">
                    {trustErosionStages.map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => setSelectedErosionStage(stage.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                          selectedErosionStage === stage.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {stage.icon}
                        Stage {stage.stage}: {stage.name}
                      </button>
                    ))}
                  </div>

                  {/* Stage Details */}
                  {currentErosionStage && (
                    <Card className="border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{currentErosionStage.name}</h4>
                            <p className="text-muted-foreground">{currentErosionStage.description}</p>
                          </div>
                          <Badge variant={
                            currentErosionStage.reversibility === 'easy' ? 'default' :
                            currentErosionStage.reversibility === 'moderate' ? 'secondary' :
                            currentErosionStage.reversibility === 'hard' ? 'destructive' : 'destructive'
                          }>
                            {currentErosionStage.reversibility === 'easy' ? 'Easy to Reverse' :
                             currentErosionStage.reversibility === 'moderate' ? 'Moderate Effort' :
                             currentErosionStage.reversibility === 'hard' ? 'Hard to Reverse' :
                             'Cultural Reconstruction Needed'}
                          </Badge>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Symptoms:</h5>
                          <ul className="space-y-2">
                            {currentErosionStage.symptoms.map((symptom, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <ArrowRight className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      <strong>Critical Insight:</strong> By Stage 4, technical fixes are insufficient—you need cultural reconstruction.
                      Prevention through data quality is exponentially cheaper than trust rehabilitation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <EnlightenMeButton
                title="The Trust Trap"
                conceptId="ai-ready-data"
                description="Understanding the trust erosion mechanism and how automating uncertainty leads to failure vs. enabling reliable automation."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Shadow Forces - Hidden Dynamics */}
        <TabsContent value="shadow-forces" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-purple-500" />
                Shadow Forces: The Invisible Barriers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Beyond visible technical constraints lie deeper organizational dynamics that silently sabotage AI readiness.
                These forces operate in the shadows—acknowledged privately but rarely addressed directly.
              </p>

              {/* Secondary Constraints - Department Level */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Secondary Constraints (Department Level)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-blue-200 dark:border-blue-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Lock className="w-4 h-4 text-blue-500" />
                        Political Data Hoarding
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                      <p className="text-muted-foreground">
                        Data becomes a power currency. Departments protect "their" data as organizational leverage.
                      </p>
                      <ul className="space-y-1 text-xs">
                        <li>• Finance restricts cost data, forcing blind decisions</li>
                        <li>• Sales guards customer interaction data</li>
                        <li>• Operations delays sharing until "cleaned up"</li>
                      </ul>
                      <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded text-xs text-blue-800 dark:text-blue-300">
                        <strong>Root Psychology:</strong> Information asymmetry creates job security.
                        AI threatens this by democratizing data interpretation.
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 dark:border-orange-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-orange-500" />
                        Metrics Gaming
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                      <p className="text-muted-foreground">
                        When performance is measured by specific metrics, people optimize for the metric, not the goal.
                      </p>
                      <ul className="space-y-1 text-xs">
                        <li>• Support closes tickets prematurely for SLA</li>
                        <li>• Sales manipulates deal close dates</li>
                        <li>• Manufacturing adjusts quality inspection rigor</li>
                      </ul>
                      <div className="p-2 bg-orange-50 dark:bg-orange-950/30 rounded text-xs text-orange-800 dark:text-orange-300">
                        <strong>AI Amplification:</strong> AI trained on gamed metrics learns to optimize for wrong things—achieving meaningless targets while outcomes deteriorate.
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 dark:border-red-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-500" />
                        Blame Avoidance Architecture
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                      <p className="text-muted-foreground">
                        Organizations develop elaborate systems to avoid accountability, undermining data quality.
                      </p>
                      <ul className="space-y-1 text-xs">
                        <li>• Deliberate vagueness for plausible deniability</li>
                        <li>• Multiple "versions of truth" for different narratives</li>
                        <li>• Resistance to lineage tools that expose errors</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Tertiary Constraints - Cultural & Psychological */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Tertiary Constraints (Cultural & Psychological)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">"Gut Feel" Defense</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p className="text-muted-foreground">
                        Experienced leaders defend intuition-based decisions, viewing data requirements as bureaucratic overhead.
                      </p>
                      <blockquote className="border-l-2 border-purple-500 pl-3 italic text-xs">
                        "I've been in this industry 20 years; I don't need data to tell me what to do"
                      </blockquote>
                      <p className="text-xs bg-purple-50 dark:bg-purple-950/30 p-2 rounded text-purple-800 dark:text-purple-300">
                        <strong>Reality:</strong> Expert intuition is pattern recognition from experience. AI can handle exponentially more patterns if fed quality data. The goal isn't replacing intuition but scaling it.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Technical Debt as "Risk Management"</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p className="text-muted-foreground">
                        Organizations preserve inefficient systems because "if it's not broken, don't fix it."
                      </p>
                      <ul className="space-y-1 text-xs">
                        <li>• Fear that modernizing will disrupt operations</li>
                        <li>• Loss aversion: uncertain benefits vs. certain costs</li>
                        <li>• Career risk—nobody gets promoted for preventing future problems</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Illusion of Control</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p className="text-muted-foreground">
                        Manual processes feel controllable even when unreliable. Automation feels risky even when more accurate.
                      </p>
                      <ul className="space-y-1 text-xs">
                        <li>• Preference for "hands-on" correction over systemic fixes</li>
                        <li>• Comfort with known problems vs. unknown failure modes</li>
                        <li>• Mistaking activity for effectiveness</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Organizational Trauma</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p className="text-muted-foreground">
                        Previous failed IT initiatives create antibodies against change.
                      </p>
                      <ul className="space-y-1 text-xs">
                        <li>• "We tried data governance before and it didn't work"</li>
                        <li>• Association with expensive consulting that delivered nothing</li>
                        <li>• Cynicism that any new system will just create different problems</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <EnlightenMeButton
                title="Shadow Forces"
                conceptId="ai-ready-data"
                description="Understanding hidden organizational dynamics: political hoarding, metrics gaming, blame avoidance, and cultural psychological barriers."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Decision DNA */}
        <TabsContent value="decision-dna" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-500" />
                Decision DNA: The Missing Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Decision capture is fundamentally different from data logging. It's recording not just what happened,
                but <strong>why</strong> it happened, who decided, what alternatives were considered, and what outcome occurred.
              </p>

              {/* Five Elements */}
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  {
                    num: 1,
                    title: 'Context',
                    items: ['What situation required a decision?', 'What data was available at decision time?', 'What constraints existed?'],
                    color: 'bg-blue-500'
                  },
                  {
                    num: 2,
                    title: 'Options Considered',
                    items: ['What alternatives were evaluated?', 'What were projected outcomes?', 'Why were options rejected?'],
                    color: 'bg-purple-500'
                  },
                  {
                    num: 3,
                    title: 'Decision Rationale',
                    items: ['Which option was selected and why?', 'What weights were given to criteria?', 'Were there overriding factors?'],
                    color: 'bg-indigo-500'
                  },
                  {
                    num: 4,
                    title: 'Actors & Accountability',
                    items: ['Who made the decision?', 'What was their authority basis?', 'Who was consulted or informed?'],
                    color: 'bg-teal-500'
                  },
                  {
                    num: 5,
                    title: 'Outcomes & Learning',
                    items: ['What actually happened?', 'How did outcomes compare to projections?', 'What was learned?'],
                    color: 'bg-green-500'
                  }
                ].map((element) => (
                  <Card key={element.num} className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 ${element.color}`} />
                    <CardContent className="p-4 pt-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-6 h-6 rounded-full ${element.color} text-white text-xs flex items-center justify-center font-bold`}>
                          {element.num}
                        </div>
                        <h4 className="font-semibold text-sm">{element.title}</h4>
                      </div>
                      <ul className="space-y-1">
                        {element.items.map((item, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                            <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Why Organizations Don't Capture */}
              <Card className="border-amber-200 dark:border-amber-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Why Organizations Don't Capture Decisions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded">
                      <strong className="text-amber-700 dark:text-amber-400">Time Pressure</strong>
                      <p className="text-xs mt-1">"We need to decide now; we'll document later" (which never happens)</p>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded">
                      <strong className="text-amber-700 dark:text-amber-400">Fear of Accountability</strong>
                      <p className="text-xs mt-1">Documented decisions create audit trails that could expose poor judgment</p>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded">
                      <strong className="text-amber-700 dark:text-amber-400">Lack of Systems</strong>
                      <p className="text-xs mt-1">No structured way to record beyond email or meeting notes</p>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded">
                      <strong className="text-amber-700 dark:text-amber-400">Cultural Norms</strong>
                      <p className="text-xs mt-1">"Just get it done" mentality prioritizes action over reflection</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Multiplier Effect */}
              <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    The AI Multiplier Effect of Decision Capture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    When decisions are systematically captured, AI can learn not just from outcomes but from the
                    reasoning patterns of your best decision-makers.
                  </p>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800">
                      <strong className="text-green-800 dark:text-green-300">Pattern Recognition</strong>
                      <p className="text-xs mt-1 text-green-700/80 dark:text-green-400/80">Identifies which factors most strongly predict successful decisions</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800">
                      <strong className="text-green-800 dark:text-green-300">Constraint Learning</strong>
                      <p className="text-xs mt-1 text-green-700/80 dark:text-green-400/80">Understands which trade-offs are consistently made</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800">
                      <strong className="text-green-800 dark:text-green-300">Failure Analysis</strong>
                      <p className="text-xs mt-1 text-green-700/80 dark:text-green-400/80">Compares projected vs. actual to reveal biases</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800">
                      <strong className="text-green-800 dark:text-green-300">Organizational Memory</strong>
                      <p className="text-xs mt-1 text-green-700/80 dark:text-green-400/80">Institutional knowledge survives personnel changes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <EnlightenMeButton
                title="Decision DNA"
                conceptId="ai-ready-data"
                description="Understanding the five elements of decision capture and the AI multiplier effect of systematic decision documentation."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Trust Architecture */}
        <TabsContent value="trust-architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-500" />
                Trust Architecture: Six Dimensions of Data Trust
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Trust isn't binary—it's multi-dimensional. AI needs different trust characteristics depending on the decision type.
              </p>

              {/* Six Dimensions Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Accuracy',
                    icon: <Target className="w-5 h-5" />,
                    color: 'text-blue-500',
                    questions: [
                      'Factual correctness: Does data reflect reality?',
                      'Validation: How is accuracy verified?',
                      'Error rate: What\'s the known error distribution?'
                    ]
                  },
                  {
                    name: 'Timeliness',
                    icon: <Clock className="w-5 h-5" />,
                    color: 'text-green-500',
                    questions: [
                      'Freshness: How current is the data?',
                      'Latency: Time from event to availability',
                      'Update frequency: How often is data refreshed?'
                    ]
                  },
                  {
                    name: 'Completeness',
                    icon: <CheckCircle className="w-5 h-5" />,
                    color: 'text-purple-500',
                    questions: [
                      'Coverage: Are all required fields populated?',
                      'Missing patterns: Random vs. systematic gaps',
                      'Null handling: Is absence meaningful or error?'
                    ]
                  },
                  {
                    name: 'Consistency',
                    icon: <RefreshCw className="w-5 h-5" />,
                    color: 'text-orange-500',
                    questions: [
                      'Cross-source alignment: Same entity described identically',
                      'Temporal consistency: No unexplained contradictions',
                      'Rule adherence: Conforms to business constraints'
                    ]
                  },
                  {
                    name: 'Lineage',
                    icon: <GitBranch className="w-5 h-5" />,
                    color: 'text-indigo-500',
                    questions: [
                      'Provenance: Clear origin and transformation history',
                      'Auditability: Can recreate how any value was derived',
                      'Change tracking: When and why definitions changed'
                    ]
                  },
                  {
                    name: 'Accountability',
                    icon: <Users className="w-5 h-5" />,
                    color: 'text-teal-500',
                    questions: [
                      'Ownership: Named steward responsible for quality',
                      'SLAs: Explicit commitments on quality dimensions',
                      'Issue resolution: Clear process for fixing problems'
                    ]
                  }
                ].map((dimension) => (
                  <Card key={dimension.name}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-base flex items-center gap-2 ${dimension.color}`}>
                        {dimension.icon}
                        {dimension.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {dimension.questions.map((q, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            {q}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Data Product Contracts */}
              <Card className="border-cyan-200 dark:border-cyan-800">
                <CardHeader>
                  <CardTitle className="text-lg">Data Product Contracts</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Trust isn't given—it's earned through predictability and verification. Each data source should have a contract specifying:
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: 'Schema', desc: 'Exact structure, types, constraints' },
                      { label: 'Quality SLAs', desc: 'Measurable accuracy, freshness, completeness targets' },
                      { label: 'Update Cadence', desc: 'When data refreshes and timing guarantees' },
                      { label: 'Breaking Change Policy', desc: 'How and when contracts can change' },
                      { label: 'Support Model', desc: 'Who to contact for issues, response expectations' },
                      { label: 'Verification', desc: 'Schema conformance, quality gates, anomaly detection' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-cyan-50 dark:bg-cyan-950/30 rounded border border-cyan-200 dark:border-cyan-800">
                        <strong className="text-cyan-700 dark:text-cyan-400 text-sm">{item.label}</strong>
                        <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trust Feedback Loop */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">The Trust Feedback Loop</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI systems should actively report on their confidence and data quality:
                  </p>
                  <div className="grid md:grid-cols-4 gap-3 text-sm">
                    <div className="p-3 border rounded bg-slate-50 dark:bg-slate-900/30">
                      <strong className="text-slate-800 dark:text-slate-200">Confidence Scores</strong>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">How certain is the AI about recommendations?</p>
                    </div>
                    <div className="p-3 border rounded bg-slate-50 dark:bg-slate-900/30">
                      <strong className="text-slate-800 dark:text-slate-200">Data Quality Flags</strong>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">What input data quality issues exist?</p>
                    </div>
                    <div className="p-3 border rounded bg-slate-50 dark:bg-slate-900/30">
                      <strong className="text-slate-800 dark:text-slate-200">Alternative Scenarios</strong>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">"If this data is wrong, recommendation changes to..."</p>
                    </div>
                    <div className="p-3 border rounded bg-slate-50 dark:bg-slate-900/30">
                      <strong className="text-slate-800 dark:text-slate-200">Override Tracking</strong>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">When humans disagree, capture reasoning to improve</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <EnlightenMeButton
                title="Trust Architecture"
                conceptId="ai-ready-data"
                description="Understanding the six dimensions of data trust and building data product contracts with verification mechanisms."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 6: The Ladder - Maturity Progression */}
        <TabsContent value="the-ladder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-green-500" />
                The Ladder: From Decision-Ready to AI-Ready Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Organizations don't jump from raw data to AI-ready data. There's a maturity progression.
                Understanding where you are helps you plan achievable next steps.
              </p>

              {/* Maturity Stage Selector */}
              <div className="flex flex-wrap gap-2">
                {dataMaturityStages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedMaturityStage(stage.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedMaturityStage === stage.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    Stage {stage.stage}: {stage.name}
                  </button>
                ))}
              </div>

              {/* Visual Ladder */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-yellow-500 to-emerald-500 rounded-full" />
                <div className="space-y-4 pl-12">
                  {dataMaturityStages.map((stage) => (
                    <div
                      key={stage.id}
                      className={`relative p-4 rounded-lg border transition-all ${
                        selectedMaturityStage === stage.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-muted hover:border-primary/30'
                      }`}
                      onClick={() => setSelectedMaturityStage(stage.id)}
                    >
                      <div className={`absolute -left-[26px] w-5 h-5 rounded-full ${stage.color} border-4 border-background`} />
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            Stage {stage.stage}: {stage.name}
                            {selectedMaturityStage === stage.id && (
                              <Badge variant="secondary">Selected</Badge>
                            )}
                          </h4>
                          <p className="text-sm text-muted-foreground">{stage.description}</p>
                        </div>
                      </div>
                      {selectedMaturityStage === stage.id && currentMaturityStage && (
                        <div className="mt-4 space-y-3">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Characteristics:</h5>
                            <ul className="space-y-1">
                              {currentMaturityStage.characteristics.map((c, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded">
                            <strong className="text-sm text-slate-800 dark:text-slate-200">Use Case:</strong>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{currentMaturityStage.useCase}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision-Ready vs AI-Ready Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional AI-Ready Requirements</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    AI-ready data meets all decision-ready criteria PLUS additional requirements for machine interpretation:
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: 'Machine-Readable Context', desc: 'Metadata in structured format, semantic relationships defined, business rules as code' },
                      { label: 'Computational Lineage', desc: 'Every transformation programmatically traceable, version-controlled, reproducible' },
                      { label: 'Quality Metrics', desc: 'Real-time quality scores, confidence intervals, automated validation results' },
                      { label: 'Decision-Action Links', desc: 'Data includes permissible actions, machine-enforceable constraints' },
                      { label: 'Temporal Integrity', desc: 'Point-in-time reconstruction, no future data leakage, event vs. processing time' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
                        <strong className="text-sm text-purple-800 dark:text-purple-300">{item.label}</strong>
                        <p className="text-xs text-purple-700/80 dark:text-purple-400/80 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <EnlightenMeButton
                title="The Ladder"
                conceptId="ai-ready-data"
                description="Understanding the 5-stage data maturity progression from raw data to autonomous data systems."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 7: The Flywheel - Implementation */}
        <TabsContent value="the-flywheel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-500" />
                The Flywheel: Practical Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Minimum Viable Data Contract */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Minimum Viable Data Contract</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start small with high-value, high-volume decision points. Don't boil the ocean.
                </p>
                <div className="grid md:grid-cols-5 gap-4">
                  {[
                    { step: 1, title: 'Identify Critical Decisions', items: ['What decisions happen most frequently?', 'Which have highest consequence if wrong?', 'Where do bottlenecks form?'] },
                    { step: 2, title: 'Map Required Data', items: ['What information do humans need?', 'What\'s the current source?', 'What transformations occur?'] },
                    { step: 3, title: 'Assess Current Trust', items: ['Do decision-makers trust this as-is?', 'What verification steps do they take?', 'What breaks their trust?'] },
                    { step: 4, title: 'Define Contract', items: ['Schema: Exact structure and types', 'Quality thresholds', 'Owner who signs for this data'] },
                    { step: 5, title: 'Implement & Monitor', items: ['Deploy automated validation', 'Track violations and resolution', 'Review and adjust quarterly'] }
                  ].map((step) => (
                    <Card key={step.step} className="relative">
                      <div className="absolute -top-3 left-4 w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <CardContent className="pt-6 pb-4">
                        <h4 className="font-semibold text-sm mb-2">{step.title}</h4>
                        <ul className="space-y-1">
                          {step.items.map((item, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                              <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Data Quality Flywheel */}
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-blue-500" />
                    The Data Quality Flywheel
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Quality improvement creates a virtuous cycle that accelerates over time.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-4">
                    {[
                      { phase: 1, name: 'Establish Baseline', items: ['Measure current quality', 'Document known issues', 'Quantify cost of poor quality'] },
                      { phase: 2, name: 'Quick Wins', items: ['Fix highest-impact issues first', 'Celebrate improvements publicly', 'Build credibility'] },
                      { phase: 3, name: 'Build Trust', items: ['Consistent quality → reduced verification', 'Users rely without double-checking', 'Faster decision cycles'] },
                      { phase: 4, name: 'Expand Scope', items: ['Apply patterns to adjacent domains', 'Standardize practices', 'Quality becomes cultural expectation'] },
                      { phase: 5, name: 'Automation Layer', items: ['Trusted data enables AI deployment', 'Automation frees humans', 'AI feedback improves quality (loop closes)'] }
                    ].map((phase) => (
                      <div key={phase.phase} className="text-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mx-auto mb-2">
                          {phase.phase}
                        </div>
                        <h4 className="font-semibold text-sm mb-2">{phase.name}</h4>
                        <ul className="space-y-1">
                          {phase.items.map((item, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Common Pitfalls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Common Pitfalls and How to Avoid Them
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { pitfall: 'Perfectionism Paralysis', problem: 'Waiting for 100% clean data before starting AI', solution: 'Start with 80% quality on critical decisions, iterate' },
                      { pitfall: 'Technology First', problem: 'Buying tools without defining requirements', solution: 'Define trust contracts first, then select tools' },
                      { pitfall: 'Governance Theater', problem: 'Creating policies that don\'t change behavior', solution: 'Tie data quality to incentives—measure and reward it' },
                      { pitfall: 'Ownership Ambiguity', problem: '"Everyone is responsible" means nobody is', solution: 'Name specific individuals as data product owners' },
                      { pitfall: 'Big Bang Rollout', problem: 'Trying to fix all issues simultaneously', solution: 'Prioritize by decision impact, tackle highest-value first' },
                      { pitfall: 'Ignoring Culture', problem: 'Treating as purely technical problem', solution: 'Address psychological barriers—fear, turf, helplessness' }
                    ].map((item, idx) => (
                      <Card key={idx} className="border-amber-200 dark:border-amber-800/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-400 mb-2">{item.pitfall}</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-start gap-2">
                              <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{item.problem}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item.solution}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <EnlightenMeButton
                title="The Flywheel"
                conceptId="ai-ready-data"
                description="Understanding minimum viable data contracts, the data quality flywheel, and common pitfalls to avoid."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 8: The Imperative - Strategic Case & References */}
        <TabsContent value="the-imperative" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" />
                The Imperative: Why This Matters More Than You Think
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Data quality isn't a technical hygiene issue—it's a competitive moat in the AI era.
              </p>

              {/* AI Readiness Gap */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-green-700 dark:text-green-400">
                      Companies With Decision-Grade Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Can deploy AI agents that actually work
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Achieve true automation and scale
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Make faster, better decisions consistently
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Compound advantages as AI improves from feedback
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-red-700 dark:text-red-400">
                      Companies Without
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Get expensive AI systems nobody trusts
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Waste resources on verification overhead
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Fall further behind as competitors automate
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Develop institutional skepticism blocking innovation
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Cost of Delay */}
              <Card className="border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    The Cost of Delay
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Every quarter you wait to address data quality, the problem gets worse:
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                      <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-400 mb-2">Accumulating Technical Debt</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• More systems integrate on flawed data models</li>
                        <li>• Inconsistencies propagate deeper</li>
                        <li>• Remediation costs grow exponentially</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                      <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-400 mb-2">Deepening Cultural Resistance</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Users develop permanent skepticism</li>
                        <li>• Political battles calcify into stalemates</li>
                        <li>• Shadow processes become entrenched</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                      <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-400 mb-2">Widening Competitive Gaps</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Competitors compounding AI advantages</li>
                        <li>• Industry standards emerge without you</li>
                        <li>• Talent gravitates to modern orgs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">The Path Forward: Transformation Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        period: 'Month 1-3',
                        title: 'Foundation',
                        items: ['Identify top 5 decision points', 'Map current data sources and quality', 'Assign data product owners', 'Define minimal data contracts']
                      },
                      {
                        period: 'Month 4-6',
                        title: 'Quick Wins',
                        items: ['Fix highest-impact quality issues', 'Implement automated validation', 'Deploy first AI agent on trusted data', 'Measure and communicate wins']
                      },
                      {
                        period: 'Month 7-12',
                        title: 'Scale',
                        items: ['Expand to next 10 decision points', 'Standardize quality processes', 'Build center of excellence', 'Create flywheel of trust and automation']
                      },
                      {
                        period: 'Year 2+',
                        title: 'Transformation',
                        items: ['Organization-wide data quality culture', 'AI agents across business processes', 'Self-improving data systems', 'Competitive advantage at scale']
                      }
                    ].map((phase, idx) => (
                      <Card key={idx}>
                        <CardHeader className="pb-2">
                          <Badge variant="outline" className="w-fit mb-1">{phase.period}</Badge>
                          <CardTitle className="text-base">{phase.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1">
                            {phase.items.map((item, i) => (
                              <li key={i} className="text-xs flex items-start gap-1">
                                <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-muted-foreground" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Conclusion */}
              <Card className="border-primary bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
                <CardContent className="p-6">
                  <blockquote className="text-lg font-medium text-center">
                    "The question isn't whether to invest in data quality.<br />
                    <span className="text-primary">The question is whether you can afford not to.</span>"
                  </blockquote>
                  <div className="text-center mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Start small. Start now. Start with decisions that matter.</p>
                    <p className="text-sm font-semibold text-primary">Trust compounds. So does its absence.</p>
                  </div>
                </CardContent>
              </Card>

              {/* References Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">References & Further Reading</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Data Quality Frameworks</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• DAMA-DMBOK Data Management Body of Knowledge</li>
                        <li>• MIT CDOIQ Data Quality Framework</li>
                        <li>• ISO 8000 Data Quality Standards</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Related Concepts</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Data Mesh Architecture</li>
                        <li>• Data Contracts</li>
                        <li>• DataOps Principles</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <EnlightenMeButton
                title="The Imperative"
                conceptId="ai-ready-data"
                description="Understanding the strategic importance of AI-ready data, the cost of delay, and the transformation timeline."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ConceptLayout>
  );
};

export default AIReadyDataConcept;
