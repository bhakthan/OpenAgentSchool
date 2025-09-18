import React from 'react';
import ConceptLayout from './ConceptLayout';
import { ShieldCheck, FlowArrow, Lock, LinkSimple, Brain, Lightning, Wallet } from '@phosphor-icons/react';
import CodeBlock from '@/components/ui/CodeBlock';
import AP2MandateChainAnimation from './AP2MandateChainAnimation';
import AP2ArchitectureDiagram from './AP2ArchitectureDiagram';

interface Props {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <h4 className="text-sm font-semibold tracking-tight">{title}</h4>
    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
  </div>
);

export default function AgenticCommerceAP2Concept({ onMarkComplete, onNavigateToNext }: Props) {
  const tabs = [
    {
      id: 'overview',
      title: 'Overview',
      description: 'Why AP2 exists',
      icon: <ShieldCheck className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <p>Agentic Commerce & AP2 provides a shared trust fabric so agents can initiate purchases safely. It chains three signed mandate credentials (Intent → Cart → Payment) producing verifiable evidence of delegation, cart integrity, and execution context (presence mode + agent metadata).</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-md bg-background/40">
              <h5 className="text-xs font-semibold mb-1 uppercase tracking-wide">Intent Mandate</h5>
              <ul className="list-disc ml-4 space-y-1 text-[11px]">
                <li>Delegation scope</li>
                <li>Constraints (price, categories, expiry)</li>
                <li>Presence mode</li>
              </ul>
            </div>
            <div className="p-3 border rounded-md bg-background/40">
              <h5 className="text-xs font-semibold mb-1 uppercase tracking-wide">Cart Mandate</h5>
              <ul className="list-disc ml-4 space-y-1 text-[11px]">
                <li>Immutable items + total</li>
                <li>Linked to Intent</li>
                <li>Human confirmed or auto‑assembled</li>
              </ul>
            </div>
            <div className="p-3 border rounded-md bg-background/40">
              <h5 className="text-xs font-semibold mb-1 uppercase tracking-wide">Payment Mandate</h5>
              <ul className="list-disc ml-4 space-y-1 text-[11px]">
                <li>Presence signaling</li>
                <li>Agent metadata</li>
                <li>Submission to rails</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground">Outcome: interoperability + non‑repudiation + safer delegation.</p>
        </div>
      )
    },
    {
      id: 'flows',
      title: 'Flows',
      description: 'Human vs delegated',
      icon: <FlowArrow className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <Section title="Mandate Chain Sequence">
            <AP2MandateChainAnimation />
            <p className="text-xs text-muted-foreground">Animated view of credential flow. Delegated mode defers Cart VC signing until constraints auto‑satisfied.</p>
          </Section>
          <div className="grid md:grid-cols-2 gap-4">
            <Section title="Human-Present Flow">
              <ol className="list-decimal ml-5 space-y-1">
                <li>Need expressed; lightweight Intent VC</li>
                <li>Offer exploration (MCP tools + A2A sessions)</li>
                <li>Proposed cart surfaced to user</li>
                <li>Cart VC signed (immutability begins)</li>
                <li>Payment VC sent to rails</li>
              </ol>
            </Section>
            <Section title="Delegated / Scheduled Flow">
              <ol className="list-decimal ml-5 space-y-1">
                <li>Rich Intent VC (constraints + expiry)</li>
                <li>Agent monitors triggers / conditions</li>
                <li>Compliant cart assembled & signed</li>
                <li>Payment VC emitted (presence: not present)</li>
                <li>Hash chain stored for audit</li>
              </ol>
            </Section>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Risk controls',
      icon: <Lock className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <ul className="list-disc ml-5 space-y-1">
            <li>Least authority delegation (scoped Intent)</li>
            <li>Immutable cart snapshot → no post approval drift</li>
            <li>Presence signaling: human vs autonomous posture</li>
            <li>Selective disclosure by role (merchant / network / issuer)</li>
            <li>Hash‑linked VC chain enables dispute reconstruction</li>
          </ul>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Architecture',
      description: 'Protocol placement',
      icon: <LinkSimple className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <div>
            <AP2ArchitectureDiagram />
          </div>
          <div>
            <h5 className="text-xs font-semibold tracking-wide mb-2 uppercase">Layer Responsibilities</h5>
            <ul className="list-disc ml-5 space-y-1">
              <li><strong>MCP</strong>: tool invocation for product / pricing intelligence & capability surfacing</li>
              <li><strong>A2A</strong>: merchant / agent negotiation, shared session semantics, capability discovery</li>
              <li><strong>AP2</strong>: mandate lifecycle (sign → verify → presence attribution → hash linking)</li>
              <li><strong>Rails</strong>: settlement + authorization networks (card, RTP, crypto, alt rails)</li>
              <li><strong>Integration Note</strong>: A2A & MCP supply structured context to AP2 mandates (e.g. product metadata hash)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'code',
      title: 'Pseudocode',
      description: 'Lifecycle sketch',
      icon: <Brain className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <CodeBlock language="typescript">{`// Intent -> Cart -> Payment (simplified)
const intent = signIntent({ userId, constraints: { maxTotal: 250, currency: 'USD', categories:['footwear'] }, mode: 'DELEGATED' });
const offers = await agent.exploreOffers(intent);
const candidate = selectBest(offers);
if(!withinConstraints(candidate, intent.constraints)) throw new Error('Out of bounds');
const cart = signCart({ intentRef: intent.id, items: candidate.items, total: candidate.total });
const payment = signPayment({ cartRef: cart.id, presence: 'HUMAN_NOT_PRESENT', agent: { model: 'gpt-x', version: '2025-09' }});
submit(payment);
persistChain(intent, cart, payment);`}</CodeBlock>
        </div>
      )
    },
    {
      id: 'adoption',
      title: 'Adoption',
      description: 'Rollout steps',
      icon: <Lightning className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <ol className="list-decimal ml-5 space-y-1">
            <li>Capture explicit delegation constraints early</li>
            <li>Issue signed Intent VC</li>
            <li>Automate constraint validation pre cart signing</li>
            <li>Emit Payment VC with presence + agent metadata</li>
            <li>Persist hash-linked chain (intent→cart→payment)</li>
            <li>Telemetry: latency + violation reasons</li>
            <li>Dispute simulation: reconstruct from hashes</li>
          </ol>
        </div>
      )
    },
    {
      id: 'references',
      title: 'References',
      description: 'Further reading',
      icon: <Wallet className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-2 text-sm">
          <ul className="list-disc ml-5 space-y-1">
            <li><a className="underline" href="https://ap2-protocol.org" target="_blank" rel="noopener noreferrer">AP2 Protocol Site</a></li>
            <li><a className="underline" href="https://github.com/google-agentic-commerce/AP2" target="_blank" rel="noopener noreferrer">AP2 GitHub Repository</a></li>
            <li><a className="underline" href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol" target="_blank" rel="noopener noreferrer">AP2 Announcement Blog</a></li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <ConceptLayout
      conceptId="agentic-commerce-ap2"
      title="Agentic Commerce & AP2"
      description="Trust architecture for agent‑initiated payments using chained mandates"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  );
}
