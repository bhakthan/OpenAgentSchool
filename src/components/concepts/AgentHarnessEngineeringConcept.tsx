import ConceptLayout from './ConceptLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/ui/CodeBlock';
import { markNodeComplete } from '@/lib/utils/markComplete';
import { Link } from 'react-router-dom';
import ReferenceSection from '../references/ReferenceSection';
import {
  Brain,
  Lightning,
  ShieldCheck,
  Globe,
  Robot,
  ArrowsClockwise,
  Wrench,
  Database,
  ArrowSquareOut,
  Cpu,
  Heart,
  Scales,
  FirstAid,
} from '@phosphor-icons/react';
import AgentHarnessEngineeringInfographic from './AgentHarnessEngineeringInfographic';

interface AgentHarnessEngineeringConceptProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const PillarCard = ({
  title,
  subtitle,
  bullets,
  accent,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
  accent: string;
}) => (
  <Card className="h-full border-l-4" style={{ borderLeftColor: accent }}>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{subtitle}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function AgentHarnessEngineeringConcept({ onMarkComplete, onNavigateToNext }: AgentHarnessEngineeringConceptProps) {
  const handleMarkComplete = () => {
    markNodeComplete('agent-harness-engineering');
    onMarkComplete?.();
  };

  const tabs = [
    {
      id: 'reframe',
      title: 'Reframe',
      description: 'Why harness engineering needs a bigger equation than model + wrapper.',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Agent Harness Engineering
              </CardTitle>
              <CardDescription>
                A harness is not a wrapper around a model. It is the domain-specific operationalization of situatedness, stakes, and sovereignty.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                The common framing <strong>Agent = Model + Harness</strong> works well inside coding sandboxes, where environments are digital, actions are reversible, and feedback behaves like a compiler. It breaks down once agents move into medicine, negotiation, robotics, finance, law, or any other world where actions have delayed, hidden, social, or irreversible consequences.
              </p>
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-800 dark:bg-amber-950/20">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Open Agent School reframe:</strong> Agent = Intelligence × (Situatedness + Stakes + Sovereignty). This is multiplicative, not additive. Zero situatedness means zero agent value regardless of raw model intelligence.
                </p>
              </div>
            </CardContent>
          </Card>

          <AgentHarnessEngineeringInfographic />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                The Core Shift
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-muted/40 p-4 dark:border-slate-700">
                <h4 className="mb-2 font-semibold">Coding-Agent Assumption</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Environment is digital</li>
                  <li>Actions are observable and reversible</li>
                  <li>Ground truth is rapidly computable</li>
                  <li>Knowledge is mainly documents</li>
                  <li>More looping often means better outcomes</li>
                </ul>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-800 dark:bg-blue-950/20">
                <h4 className="mb-2 font-semibold">Real-World Agent Reality</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Environment is physical, social, economic, or political</li>
                  <li>Actions have hidden, delayed, and diffuse effects</li>
                  <li>Ground truth is contested, probabilistic, or unknowable</li>
                  <li>Situational intelligence is a living world model</li>
                  <li>Persistence without stopping theory can create harm</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'critique',
      title: 'Five Lifelines',
      description: 'Why the default coding-agent harness assumptions do not generalize.',
      icon: <ShieldCheck className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>The Five Lifelines Under a Microscope</CardTitle>
              <CardDescription>
                The common harness primitives are useful in code. They become partial truths or outright liabilities in high-stakes domains.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <PillarCard
                title="Persist → Filesystem Fallacy"
                subtitle="Persistence is continuity-of-self, not just storage."
                accent="#9a6800"
                bullets={[
                  'Therapeutic agents must persist trust, rupture, and relationship arc, not just notes.',
                  'Surgical agents must persist anatomy surprises and operator micro-preferences, not file diffs.',
                  'Git-like revert logic assumes reversibility that many domains simply do not have.',
                ]}
              />
              <PillarCard
                title="Action → Bash Shell Delusion"
                subtitle="Not all meaningful action is an API call."
                accent="#1a7c4a"
                bullets={[
                  'Embodied agents act physically and continuously, not through neat synchronous commands.',
                  'Social agents act through tone, silence, framing, escalation, and timing.',
                  'General-purpose shells are empowerment in code and attack surface in regulated domains.',
                ]}
              />
              <PillarCard
                title="Observe & Verify → Unit-Test Assumption"
                subtitle="The world does not behave like a compiler."
                accent="#6d28d9"
                bullets={[
                  'Medical outcomes may surface weeks later and only probabilistically.',
                  'Legal, policy, or negotiation outcomes can be subjective and non-local.',
                  'Absence of a failure signal is not evidence of success in real-world systems.',
                ]}
              />
              <PillarCard
                title="Control → Ralph Loop Trap"
                subtitle="Persistence is not universally good."
                accent="#c0392b"
                bullets={[
                  'A diagnostic agent that keeps looping may increase harm through delay and iatrogenic risk.',
                  'A negotiation agent that refuses impasse can reveal desperation and damage trust.',
                  'High-stakes systems need stopping theory, escalation logic, and deferral rules.',
                ]}
              />
              <PillarCard
                title="Context Injection → Retrieval Illusion"
                subtitle="Knowledgeable is not the same as situated."
                accent="#1d6bc4"
                bullets={[
                  'Real context means stakeholder modeling, temporality, norms, hidden motives, and uncertainty.',
                  'Documents can provide scripts; they do not automatically provide perspective.',
                  'A situated agent reasons about this patient, this meeting, this system, in this moment.',
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Domain Examples</CardTitle>
              <CardDescription>
                The same model intelligence requires radically different harness engineering depending on the domain.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-pink-200 bg-pink-50/60 p-4 dark:border-pink-800 dark:bg-pink-950/20">
                <div className="mb-2 flex items-center gap-2 font-semibold"><Heart size={18} /> Therapeutic agent</div>
                <p className="text-sm text-muted-foreground">Needs relational state, repair cycles, and uncertainty-aware grounding in self-report and behavior. A git metaphor is almost useless here.</p>
              </div>
              <div className="rounded-lg border border-cyan-200 bg-cyan-50/60 p-4 dark:border-cyan-800 dark:bg-cyan-950/20">
                <div className="mb-2 flex items-center gap-2 font-semibold"><FirstAid size={18} /> Surgical assistant</div>
                <p className="text-sm text-muted-foreground">Needs anatomy-specific continuity, real-time telemetry, and strict stopping/circuit-breaker logic. Physical errors cannot be reverted.</p>
              </div>
              <div className="rounded-lg border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-800 dark:bg-violet-950/20">
                <div className="mb-2 flex items-center gap-2 font-semibold"><Scales size={18} /> Negotiation or legal agent</div>
                <p className="text-sm text-muted-foreground">Must model red lines, power posture, revealed preferences, and irreversible social disclosures. Winning is often delayed and partially observable.</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
                <div className="mb-2 flex items-center gap-2 font-semibold"><Robot size={18} /> Coding agent</div>
                <p className="text-sm text-muted-foreground">The default harness works best here because the environment is inspectable, toolable, and feedback is unusually crisp.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'redefined-lifelines',
      title: 'Redefined Harness',
      description: 'The five actual lifelines: State, Affect, Ground, Govern, Situate.',
      icon: <Globe className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>The Five Actual Lifelines</CardTitle>
              <CardDescription>
                A proper harness is a domain-specific executive system, not a generic tool wrapper.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-2">
              <PillarCard
                title="State"
                subtitle="Domain-appropriate continuity architecture"
                accent="#9a6800"
                bullets={[
                  'Episodic state: what happened, in sequence.',
                  'Relational state: posture of stakeholders and trust state.',
                  'World state: evolving model of the true external condition.',
                ]}
              />
              <PillarCard
                title="Affect"
                subtitle="Full-spectrum world-change primitives"
                accent="#1a7c4a"
                bullets={[
                  'Classify actions by reversibility, blast radius, and latency to observe.',
                  'Digital, economic, social, and physical affects cannot share the same authorization path.',
                  'Execution pipelines must be tier-aware, not tool-shaped.',
                ]}
              />
              <PillarCard
                title="Ground"
                subtitle="Domain-epistemology-appropriate reality anchoring"
                accent="#6d28d9"
                bullets={[
                  'Code grounds in tests and runtime behavior.',
                  'Medicine grounds in biomarkers, imaging, and outcomes weighted by reliability.',
                  'Social and financial agents require evidence quality modeling, not just feedback pipes.',
                ]}
              />
              <PillarCard
                title="Govern"
                subtitle="Authority-bounded execution with principled stopping"
                accent="#c0392b"
                bullets={[
                  'Scope gates separate autonomous decisions from mandatory escalation.',
                  'Stopping criteria define when halting is success, not failure.',
                  'Ethical circuit breakers and HITL triggers must be explicit and testable.',
                ]}
              />
              <PillarCard
                title="Situate"
                subtitle="Living world-model construction"
                accent="#1d6bc4"
                bullets={[
                  'Model who has power, what is unsaid, what changed, and what remains unknown.',
                  'Temporal awareness matters: crisis, chronic drift, and strategic delay are different worlds.',
                  'Situate transforms retrieval into perspective.',
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Architecture Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="typescript">{`Agent = Intelligence * (Situatedness + Stakes + Sovereignty)

Harness = {
  State:    'episodic + relational + world continuity',
  Affect:   'action primitives classified by reversibility, blast radius, latency',
  Ground:   'domain evidence model + uncertainty handling',
  Govern:   'authority boundaries, escalation paths, stopping theory, circuit breakers',
  Situate:  'living world model of stakeholders, temporality, the unsaid, the unknown',
}`}</CodeBlock>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  <div className="mb-2 flex items-center gap-2 font-semibold"><Cpu size={18} /> Intelligence</div>
                  <p className="text-sm text-muted-foreground">Reasoning capability of the model.</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  <div className="mb-2 flex items-center gap-2 font-semibold"><Database size={18} /> Situatedness</div>
                  <p className="text-sm text-muted-foreground">How accurately the agent is grounded in the texture of domain reality.</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  <div className="mb-2 flex items-center gap-2 font-semibold"><ShieldCheck size={18} /> Sovereignty + Stakes</div>
                  <p className="text-sm text-muted-foreground">Authority boundaries plus the reversibility and consequence profile of actions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'frontier',
      title: 'Frontier',
      description: 'Where harness engineering evolves next: agent hypervisors, cyber-physical, metamorphic harnesses.',
      icon: <ArrowsClockwise className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Where Harness Engineering Is Headed</CardTitle>
              <CardDescription>
                Smarter models reduce some scaffolding needs, but they increase the need for stronger domain governance, safety layers, and shared memory infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-800 dark:bg-indigo-950/20">
                <h4 className="mb-2 font-semibold">Agent Hypervisors</h4>
                <p className="text-sm text-muted-foreground">Standardized cognitive containers that handle secure memory virtualization, tool sandboxing, and inter-agent networking like an Agent OS.</p>
              </div>
              <div className="rounded-lg border border-fuchsia-200 bg-fuchsia-50/60 p-4 dark:border-fuchsia-800 dark:bg-fuchsia-950/20">
                <h4 className="mb-2 font-semibold">Swarm-Native Shared Memory</h4>
                <p className="text-sm text-muted-foreground">Real-time shared latent-memory architectures replace text file handoffs when hundreds of agents need collective situational state.</p>
              </div>
              <div className="rounded-lg border border-cyan-200 bg-cyan-50/60 p-4 dark:border-cyan-800 dark:bg-cyan-950/20">
                <h4 className="mb-2 font-semibold">Cyber-Physical Harnesses</h4>
                <p className="text-sm text-muted-foreground">Sensor fusion, kinematic translation, and deterministic physics sandboxes bridge semantic intent into safe physical action.</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-800 dark:bg-amber-950/20">
                <h4 className="mb-2 font-semibold">Metamorphic Harnesses</h4>
                <p className="text-sm text-muted-foreground">Agents dynamically compile new tools, rewrite parts of their own operating environment, and grow bespoke harness layers around novel problems.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two Concrete Frontier Examples</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-cyan-200 p-5 dark:border-cyan-800">
                <div className="mb-3 flex items-center gap-2 font-semibold"><Robot size={18} /> Cyber-Physical Harness</div>
                <p className="mb-3 text-sm text-muted-foreground">A disaster triage drone sees heat, LiDAR, and geometry through sensor fusion. The model asks to deploy aid. The harness blocks unsafe downwash after a deterministic physics check and forces a safer plan.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Sensor Fusion → semantic token space</li>
                  <li>Kinematic Translation → motor commands and control surfaces</li>
                  <li>Physics Sandbox → non-AI safety governor</li>
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200 p-5 dark:border-amber-800">
                <div className="mb-3 flex items-center gap-2 font-semibold"><ArrowsClockwise size={18} /> Metamorphic Harness</div>
                <p className="mb-3 text-sm text-muted-foreground">A zero-day incident response agent encounters a proprietary SCADA environment. Instead of failing, it reflects, writes a custom interface layer, compiles it, mounts it, and continues inside the newly created tool world.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Self-reflection identifies tool inadequacy</li>
                  <li>JIT compiler builds a new bridge</li>
                  <li>Mutable state injects the new capability back into the harness</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Concepts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              <Link to="/concepts/agent-architecture" className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-primary dark:border-slate-700">
                <div className="font-semibold">Agent Architecture</div>
                <p className="mt-1 text-sm text-muted-foreground">Start with the canonical coding-agent skeleton before you reframe its harness limits.</p>
              </Link>
              <Link to="/concepts/context-engineering" className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-primary dark:border-slate-700">
                <div className="font-semibold">Context Engineering</div>
                <p className="mt-1 text-sm text-muted-foreground">Compare retrieval and context pipeline thinking to full situatedness modeling.</p>
              </Link>
              <Link to="/concepts/agent-skills" className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-primary dark:border-slate-700">
                <div className="font-semibold">Agent Skills</div>
                <p className="mt-1 text-sm text-muted-foreground">See how reusable skills solve modular expertise, but not the entire harness problem.</p>
              </Link>
              <Link to="/concepts/human-in-the-loop-patterns" className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-primary dark:border-slate-700">
                <div className="font-semibold">Human-in-the-Loop Patterns</div>
                <p className="mt-1 text-sm text-muted-foreground">Dive deeper into escalation design, sovereignty, and stopping theory.</p>
              </Link>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href="https://blog.langchain.com/the-anatomy-of-an-agent-harness/" target="_blank" rel="noreferrer">
                Read the Harness Article
                <ArrowSquareOut className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'references',
      title: 'References',
      description: 'Papers, essays, and architecture resources for deeper study.',
      icon: <ArrowSquareOut className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How To Read This Topic</CardTitle>
              <CardDescription>
                Start with the harness critique, then compare it against context engineering, embodied agents, and human-in-the-loop governance patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                <div className="mb-2 font-semibold">1. Challenge the default</div>
                <p className="text-sm text-muted-foreground">Ask where coding-agent assumptions break under irreversibility, delayed feedback, and social consequence.</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                <div className="mb-2 font-semibold">2. Compare neighboring concepts</div>
                <p className="text-sm text-muted-foreground">Map harness engineering against context engineering, memory systems, and HITL patterns to see what each actually covers.</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                <div className="mb-2 font-semibold">3. Look for stopping theory</div>
                <p className="text-sm text-muted-foreground">The frontier move is not just more autonomy. It is better escalation, better deferral, and safer authority boundaries.</p>
              </div>
            </CardContent>
          </Card>

          <ReferenceSection type="concept" itemId="agent-harness-engineering" />
        </div>
      ),
    },
  ];

  return (
    <ConceptLayout
      conceptId="agent-harness-engineering"
      title="Agent Harness Engineering"
      description="Redefine the harness: from a coding-agent wrapper to the domain-specific operationalization of situatedness, stakes, and sovereignty."
      tabs={tabs}
      nextConcept={{
        id: 'context-engineering',
        title: 'Context Engineering',
        description: 'Move from static prompts to context pipelines that reduce entropy between intent and action.',
      }}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
      enableAudioNarration={true}
    />
  );
}