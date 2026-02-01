import React from 'react';
import ConceptLayout from './ConceptLayout';
import { ShieldCheck, FlowArrow, Lock, LinkSimple, Brain, Lightning, Wallet, Globe, Storefront, ArrowsClockwise } from '@phosphor-icons/react';
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
      description: 'UCP + AP2 unified',
      icon: <Globe className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <h5 className="font-semibold mb-2">🆕 2026 Update: Universal Commerce Protocol (UCP)</h5>
            <p className="text-muted-foreground text-xs">Google, Shopify, and 20+ partners launched UCP as the open standard for agentic commerce. UCP standardizes the full commerce journey while integrating with AP2 for secure payments.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h5 className="text-xs font-semibold mb-2 uppercase tracking-wide text-blue-500">UCP — Universal Commerce Protocol</h5>
              <p className="text-xs text-muted-foreground mb-3">Full commerce lifecycle: discovery → checkout → payment → fulfillment</p>
              <ul className="list-disc ml-4 space-y-1 text-[11px]">
                <li>Unified N×1 integration (not N×N)</li>
                <li>Discovery via <code className="text-[10px]">/.well-known/ucp</code></li>
                <li>Supports A2A, MCP, and REST transports</li>
                <li>Extensions: discounts, fulfillment, identity</li>
                <li>Business remains Merchant of Record</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h5 className="text-xs font-semibold mb-2 uppercase tracking-wide text-purple-500">AP2 — Agent Payments Protocol</h5>
              <p className="text-xs text-muted-foreground mb-3">Payment mandate layer: Intent → Cart → Payment credentials</p>
              <ul className="list-disc ml-4 space-y-1 text-[11px]">
                <li>Signed mandate chain (VCs)</li>
                <li>Delegation constraints & expiry</li>
                <li>Presence mode signaling</li>
                <li>Hash-linked audit trail</li>
                <li>Compatible with UCP checkout</li>
              </ul>
            </div>
          </div>

          <div className="p-3 border rounded-md bg-muted/30">
            <p className="text-xs"><strong>Key Insight:</strong> UCP is the commerce protocol; AP2 is the payment authorization layer. UCP's checkout can use AP2 mandates for cryptographic proof of user consent in delegated/autonomous scenarios.</p>
          </div>
        </div>
      )
    },
    {
      id: 'ucp-capabilities',
      title: 'UCP Capabilities',
      description: 'Commerce primitives',
      icon: <Storefront className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <Section title="Core Capabilities">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 border rounded-md">
                <code className="text-xs text-blue-500">dev.ucp.shopping.checkout</code>
                <p className="text-[11px] mt-1">Create/update checkout sessions, manage line items, apply payments</p>
              </div>
              <div className="p-3 border rounded-md">
                <code className="text-xs text-blue-500">dev.ucp.shopping.discount</code>
                <p className="text-[11px] mt-1">Apply promo codes, calculate automatic discounts, member benefits</p>
              </div>
              <div className="p-3 border rounded-md">
                <code className="text-xs text-blue-500">dev.ucp.shopping.fulfillment</code>
                <p className="text-[11px] mt-1">Shipping options, delivery estimates, order tracking</p>
              </div>
              <div className="p-3 border rounded-md">
                <code className="text-xs text-blue-500">dev.ucp.shopping.identity</code>
                <p className="text-[11px] mt-1">Link loyalty accounts, member benefits, stored preferences</p>
              </div>
            </div>
          </Section>
          
          <Section title="Discovery Manifest">
            <CodeBlock language="json">{`// GET /.well-known/ucp
{
  "ucp": {
    "version": "2026-01-11",
    "services": {
      "dev.ucp.shopping": {
        "version": "2026-01-11",
        "rest": { "endpoint": "https://shop.example/ucp/" }
      }
    },
    "capabilities": [
      { "name": "dev.ucp.shopping.checkout", "version": "2026-01-11" },
      { "name": "dev.ucp.shopping.discount", "extends": "checkout" }
    ]
  },
  "payment": {
    "handlers": [
      { "id": "google_pay", "name": "google.pay" },
      { "id": "shop_pay", "name": "com.shopify.shop_pay" }
    ]
  }
}`}</CodeBlock>
          </Section>

          <div className="p-3 border rounded-md bg-green-500/10">
            <h5 className="text-xs font-semibold mb-1">Ecosystem Partners (2026)</h5>
            <p className="text-[11px]">Shopify, Etsy, Wayfair, Target, Walmart, Best Buy, Macy's, Home Depot, Flipkart, Zalando + payment partners: Adyen, Stripe, Visa, Mastercard, American Express</p>
          </div>
        </div>
      )
    },
    {
      id: 'transports',
      title: 'Transports',
      description: 'A2A, MCP, REST',
      icon: <ArrowsClockwise className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <p>UCP supports multiple transport bindings, allowing businesses and agents to choose their preferred integration method:</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-md">
              <h5 className="text-xs font-semibold mb-2 uppercase tracking-wide">REST APIs</h5>
              <ul className="list-disc ml-4 space-y-1 text-[11px]">
                <li>OpenAPI specification</li>
                <li>Standard HTTP methods</li>
                <li>Idempotency keys</li>
                <li>Request signatures</li>
              </ul>
            </div>
            <div className="p-3 border rounded-md">
              <h5 className="text-xs font-semibold mb-2 uppercase tracking-wide">MCP (Model Context Protocol)</h5>
              <ul className="list-disc ml-4 space-y-1 text-[11px]">
                <li>Tool invocation binding</li>
                <li>Product search tools</li>
                <li>Pricing intelligence</li>
                <li>Capability discovery</li>
              </ul>
            </div>
            <div className="p-3 border rounded-md">
              <h5 className="text-xs font-semibold mb-2 uppercase tracking-wide">A2A (Agent-to-Agent)</h5>
              <ul className="list-disc ml-4 space-y-1 text-[11px]">
                <li>Merchant agent sessions</li>
                <li>Negotiation flows</li>
                <li>Task delegation</li>
                <li>Streaming responses</li>
              </ul>
            </div>
          </div>

          <Section title="Protocol Stack">
            <CodeBlock language="text">{`┌─────────────────────────────────────────────────┐
│          Consumer Surfaces (AI Mode, Gemini)    │
├─────────────────────────────────────────────────┤
│      UCP (Discovery, Checkout, Fulfillment)     │
├──────────┬───────────────┬──────────────────────┤
│   A2A    │      MCP      │      REST APIs       │  ← Transports
├──────────┴───────────────┴──────────────────────┤
│     AP2 (Mandate Chain: Intent→Cart→Payment)    │  ← Payment Layer
├─────────────────────────────────────────────────┤
│  Payment Handlers (Google Pay, Shop Pay, Visa)  │
├─────────────────────────────────────────────────┤
│        Settlement Rails (Cards, RTP, Crypto)    │
└─────────────────────────────────────────────────┘`}</CodeBlock>
          </Section>
        </div>
      )
    },
    {
      id: 'flows',
      title: 'Commerce Flows',
      description: 'UCP + AP2 lifecycle',
      icon: <FlowArrow className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <Section title="UCP Checkout Flow">
            <div className="p-3 bg-muted/30 rounded-md">
              <ol className="list-decimal ml-5 space-y-1 text-xs">
                <li><strong>Discovery:</strong> Agent calls <code>/.well-known/ucp</code> to find capabilities</li>
                <li><strong>Product Search:</strong> Browse catalog via MCP tools or A2A sessions</li>
                <li><strong>Create Checkout:</strong> POST to <code>/checkout-sessions</code> with line items</li>
                <li><strong>Apply Discounts:</strong> PUT with discount codes, receive applied totals</li>
                <li><strong>Payment Authorization:</strong> AP2 mandate or direct payment handler</li>
                <li><strong>Complete:</strong> Submit checkout, receive order confirmation</li>
              </ol>
            </div>
          </Section>

          <Section title="AP2 Mandate Chain (within UCP)">
            <AP2MandateChainAnimation />
            <p className="text-xs text-muted-foreground mt-2">AP2 mandates provide cryptographic proof of user consent within UCP checkout.</p>
          </Section>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Section title="Human-Present (UCP)">
              <ol className="list-decimal ml-5 space-y-1 text-xs">
                <li>User initiates via AI Mode / Gemini</li>
                <li>Agent discovers merchant capabilities</li>
                <li>Checkout session created</li>
                <li>User confirms in embedded checkout</li>
                <li>Google Pay / Shop Pay completes</li>
              </ol>
            </Section>
            <Section title="Delegated / Autonomous (AP2)">
              <ol className="list-decimal ml-5 space-y-1 text-xs">
                <li>Rich Intent VC with constraints</li>
                <li>Agent monitors for conditions</li>
                <li>UCP checkout assembled</li>
                <li>Cart VC signed (constraint-compliant)</li>
                <li>Payment VC emitted for rails</li>
              </ol>
            </Section>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Trust & verification',
      icon: <Lock className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <Section title="UCP Security Features">
              <ul className="list-disc ml-5 space-y-1 text-xs">
                <li>Tokenized payments (no raw card data)</li>
                <li>Request signatures for authenticity</li>
                <li>Idempotency keys prevent duplicates</li>
                <li>Agent profile verification</li>
                <li>Selective disclosure by role</li>
              </ul>
            </Section>
            <Section title="AP2 Mandate Security">
              <ul className="list-disc ml-5 space-y-1 text-xs">
                <li>Least authority delegation (scoped Intent)</li>
                <li>Immutable cart snapshot</li>
                <li>Presence signaling (human vs autonomous)</li>
                <li>Hash-linked VC chain for disputes</li>
                <li>Verifiable credentials (W3C VCs)</li>
              </ul>
            </Section>
          </div>
          
          <div className="p-3 border rounded-md bg-amber-500/10">
            <h5 className="text-xs font-semibold mb-1">Key Principle: Provable Payments</h5>
            <p className="text-[11px]">Every authorization in UCP is backed by cryptographic proof of user consent. This enables dispute reconstruction and audit trails for autonomous agent transactions.</p>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Architecture',
      description: 'System placement',
      icon: <LinkSimple className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6 text-sm">
          <div>
            <AP2ArchitectureDiagram />
          </div>
          <div>
            <h5 className="text-xs font-semibold tracking-wide mb-2 uppercase">Layer Responsibilities</h5>
            <ul className="list-disc ml-5 space-y-1 text-xs">
              <li><strong>UCP:</strong> Commerce lifecycle (discovery, checkout, discounts, fulfillment, order management)</li>
              <li><strong>MCP:</strong> Tool invocation for product search, pricing, inventory checks</li>
              <li><strong>A2A:</strong> Merchant/agent negotiation, session semantics, capability discovery</li>
              <li><strong>AP2:</strong> Mandate lifecycle (sign → verify → presence → hash linking)</li>
              <li><strong>Payment Handlers:</strong> Google Pay, Shop Pay, Stripe, Adyen, etc.</li>
              <li><strong>Rails:</strong> Settlement networks (card, RTP, crypto, alt rails)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'code',
      title: 'Implementation',
      description: 'UCP + AP2 code',
      icon: <Brain className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <Section title="UCP Checkout Session (Python SDK)">
            <CodeBlock language="python">{`# UCP Python SDK - Create checkout session
from ucp_sdk import UCPClient

client = UCPClient(base_url="https://shop.example")

# Discover capabilities
manifest = client.discover()  # GET /.well-known/ucp

# Create checkout session
checkout = client.create_checkout_session(
    line_items=[
        {"item": {"id": "bouquet_roses", "title": "Red Roses"}, "quantity": 1}
    ],
    buyer={"full_name": "John Doe", "email": "john@example.com"},
    currency="USD",
    payment={"handlers": ["google_pay", "shop_pay"]}
)

# Apply discount
checkout = client.update_checkout(
    checkout_id=checkout.id,
    discounts={"codes": ["10OFF"]}
)

# Complete with payment
order = client.complete_checkout(
    checkout_id=checkout.id,
    payment_token="gpay_token_xxx"
)`}</CodeBlock>
          </Section>

          <Section title="AP2 Mandate Chain (Delegated Mode)">
            <CodeBlock language="typescript">{`// AP2 mandate chain for autonomous purchasing
const intent = signIntent({
  userId,
  constraints: { maxTotal: 250, currency: 'USD', categories: ['footwear'] },
  mode: 'DELEGATED',
  expiry: '2026-02-15T00:00:00Z'
});

// Agent monitors and assembles cart via UCP
const ucpCheckout = await agent.createCheckout(intent);
if (!withinConstraints(ucpCheckout, intent.constraints)) {
  throw new Error('Checkout exceeds intent constraints');
}

// Sign cart mandate
const cart = signCart({
  intentRef: intent.id,
  items: ucpCheckout.line_items,
  total: ucpCheckout.totals.find(t => t.type === 'total').amount
});

// Payment mandate with presence signaling
const payment = signPayment({
  cartRef: cart.id,
  presence: 'HUMAN_NOT_PRESENT',
  agent: { model: 'gemini-2.0', version: '2026-01' }
});

submit(payment);
persistChain(intent, cart, payment);`}</CodeBlock>
          </Section>
        </div>
      )
    },
    {
      id: 'adoption',
      title: 'Adoption',
      description: 'Get started',
      icon: <Lightning className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <Section title="For Businesses (UCP Integration)">
            <ol className="list-decimal ml-5 space-y-1 text-xs">
              <li>Set up Merchant Center account with eligible products</li>
              <li>Implement UCP manifest at <code>/.well-known/ucp</code></li>
              <li>Expose checkout capability endpoints</li>
              <li>Configure payment handlers (Google Pay, Shop Pay, etc.)</li>
              <li>Test with UCP Python SDK samples</li>
              <li>Submit for Google integration review</li>
            </ol>
          </Section>
          
          <Section title="For Agent Developers">
            <ol className="list-decimal ml-5 space-y-1 text-xs">
              <li>Discover merchant capabilities via UCP manifest</li>
              <li>Use MCP tools for product search</li>
              <li>Create checkout sessions via REST or A2A</li>
              <li>Handle payment authorization (AP2 for delegated)</li>
              <li>Implement order tracking and fulfillment updates</li>
            </ol>
          </Section>

          <div className="p-3 border rounded-md bg-blue-500/10">
            <h5 className="text-xs font-semibold mb-1">Open Source</h5>
            <p className="text-[11px]">UCP is open source: <a className="underline" href="https://github.com/universal-commerce-protocol/ucp" target="_blank" rel="noopener noreferrer">github.com/universal-commerce-protocol/ucp</a></p>
          </div>
        </div>
      )
    },
    {
      id: 'references',
      title: 'References',
      description: 'Official resources',
      icon: <Wallet className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-4 text-sm">
          <Section title="UCP Resources">
            <ul className="list-disc ml-5 space-y-1 text-xs">
              <li><a className="underline text-blue-500" href="https://ucp.dev" target="_blank" rel="noopener noreferrer">UCP Official Site</a></li>
              <li><a className="underline text-blue-500" href="https://github.com/universal-commerce-protocol/ucp" target="_blank" rel="noopener noreferrer">UCP GitHub Repository</a></li>
              <li><a className="underline text-blue-500" href="https://github.com/Universal-Commerce-Protocol/python-sdk" target="_blank" rel="noopener noreferrer">UCP Python SDK</a></li>
              <li><a className="underline text-blue-500" href="https://github.com/Universal-Commerce-Protocol/samples" target="_blank" rel="noopener noreferrer">UCP Samples Repository</a></li>
              <li><a className="underline text-blue-500" href="https://developers.google.com/merchant/ucp" target="_blank" rel="noopener noreferrer">Google UCP Integration Guide</a></li>
              <li><a className="underline text-blue-500" href="https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/" target="_blank" rel="noopener noreferrer">UCP Under the Hood (Blog)</a></li>
            </ul>
          </Section>
          <Section title="AP2 & Related Protocols">
            <ul className="list-disc ml-5 space-y-1 text-xs">
              <li><a className="underline text-purple-500" href="https://ap2-protocol.org" target="_blank" rel="noopener noreferrer">AP2 Protocol Site</a></li>
              <li><a className="underline text-purple-500" href="https://a2a-protocol.org" target="_blank" rel="noopener noreferrer">A2A Protocol (Agent-to-Agent)</a></li>
              <li><a className="underline text-purple-500" href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">MCP (Model Context Protocol)</a></li>
            </ul>
          </Section>
        </div>
      )
    }
  ];

  return (
    <ConceptLayout
      conceptId="agentic-commerce-ap2"
      title="Agentic Commerce: UCP & AP2"
      description="Universal Commerce Protocol + Agent Payments for end-to-end agentic transactions"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  );
}









