import { useState } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Lightning,
  ShieldCheck,
  ArrowsOut,
  Users,
  ChartLineUp,
  Brain,
  Warning,
  Gear,
  ArrowRight,
  Buildings,
} from "@phosphor-icons/react"
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton"
import { conceptSurface, conceptCodeBlock } from "./conceptStyles"

interface ProactiveAgentDesignConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

/* ─── helpers ─── */
const SectionHeading = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <h3 className="flex items-center gap-2 text-xl font-bold mt-8 mb-4">
    {icon}
    {children}
  </h3>
)

const ComparisonRow = ({ dimension, reactive, proactive }: { dimension: string; reactive: string; proactive: string }) => (
  <tr className="border-b border-border/40">
    <td className="py-2 px-3 font-semibold text-sm">{dimension}</td>
    <td className="py-2 px-3 text-sm text-muted-foreground">{reactive}</td>
    <td className="py-2 px-3 text-sm text-foreground">{proactive}</td>
  </tr>
)

export default function ProactiveAgentDesignConcept({
  onMarkComplete,
  onNavigateToNext,
}: ProactiveAgentDesignConceptProps) {

  const [scenarioTab, setScenarioTab] = useState("procurement")

  const tabs = [
    /* ────────────── TAB 1: The Paradigm Shift ────────────── */
    {
      id: "paradigm-shift",
      title: "The Paradigm Shift",
      description: "From reactive copilots to proactive sentinels",
      icon: <Lightning className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                The Attention Crisis in Modern Organizations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                How many hours per week does your team spend monitoring dashboards, triaging tickets, checking for updates, and responding to predictable situations?
              </p>
              <p className="text-lg leading-relaxed">
                Every modern organization faces the same paradox: we deploy increasingly sophisticated AI systems, yet our people remain trapped in <strong>reactive loops</strong>. Highly trained professionals spend 60–70% of their cognitive bandwidth on <em>vigilance</em>—not problem-solving, not strategy, not innovation. They're human sensors in a world drowning in signals.
              </p>
              <div className={conceptSurface("p-4 border-l-4 border-amber-500")}>
                <p className="text-lg font-medium">
                  The uncomfortable truth: most AI deployed today <em>amplifies</em> this attention burden rather than relieving it. Every chatbot requires a prompter. Every copilot needs a pilot. Every assistant awaits instructions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reactive vs Proactive comparison table */}
          <Card>
            <CardHeader>
              <CardTitle>Reactive AI vs. Proactive AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-3 text-sm">Dimension</th>
                      <th className="py-2 px-3 text-sm text-muted-foreground">Reactive AI</th>
                      <th className="py-2 px-3 text-sm">Proactive AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ComparisonRow dimension="Initiation" reactive="Human triggers interaction" proactive="Agent monitors and initiates" />
                    <ComparisonRow dimension="Temporal Model" reactive="Session-based, ephemeral" proactive="Continuous, persistent" />
                    <ComparisonRow dimension="Human Role" reactive="Instructor, operator" proactive="Delegator, governor" />
                    <ComparisonRow dimension="Context" reactive="Provided each time" proactive="Accumulated, maintained" />
                    <ComparisonRow dimension="Output" reactive="Responses" proactive="Outcomes" />
                    <ComparisonRow dimension="Failure Mode" reactive="Wrong answer" proactive="Wrong action (higher stakes)" />
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Convergence factors */}
          <Card>
            <CardHeader>
              <CardTitle>Why Now? Three Converging Forces</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-bold mb-2 flex items-center gap-1"><Gear className="w-4 h-4" /> Technical Maturity</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Reliable reasoning</li>
                    <li>• Tool-use capability</li>
                    <li>• Long-term memory</li>
                    <li>• Structured outputs</li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-bold mb-2 flex items-center gap-1"><ChartLineUp className="w-4 h-4" /> Economic Pressure</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Labor costs rising 8%+ annually</li>
                    <li>• 24/7 operations expected</li>
                    <li>• Speed as competitive advantage</li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-bold mb-2 flex items-center gap-1"><Brain className="w-4 h-4" /> Cognitive Limits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Signal overload epidemic</li>
                    <li>• Expertise scarcity</li>
                    <li>• Burnout crisis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="The Paradigm Shift"
            customPrompt="Explain the fundamental shift from reactive to proactive AI agents and how it changes human-AI partnership in enterprise operations."
          />
        </div>
      ),
    },

    /* ────────────── TAB 2: From Instructions to Intent ────────────── */
    {
      id: "instructions-to-intent",
      title: "Instructions → Intent",
      description: "The evolution of human-AI communication",
      icon: <ArrowRight className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolution of Human-AI Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Level 1 */}
              <div className={conceptSurface("p-4")}>
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-muted-foreground">Level 1 — Commands (2020–2022)</h4>
                <pre className={conceptCodeBlock("p-3 text-sm")}>{`Human: "Summarize this document"
AI:    [Summary]
Human: "Make it shorter"
AI:    [Shorter summary]`}</pre>
                <p className="text-sm text-muted-foreground mt-2">Single-turn, explicit literals. Human maintains all context. AI has no persistent state.</p>
              </div>

              {/* Level 2 */}
              <div className={conceptSurface("p-4")}>
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-muted-foreground">Level 2 — Conversations (2022–2024)</h4>
                <pre className={conceptCodeBlock("p-3 text-sm")}>{`Human: "I'm preparing for a board meeting on supply chain
        risks. Help me analyze our single-source exposure."
AI:    [Analysis, follow-up questions, recommendations]
Human: "Good. Now let's look at mitigation options..."
AI:    [Extended dialogue with maintained context]`}</pre>
                <p className="text-sm text-muted-foreground mt-2">Multi-turn with context retention. Session-bounded memory. AI as thought partner.</p>
              </div>

              {/* Level 3 */}
              <div className={conceptSurface("p-4 border-l-4 border-blue-500")}>
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Level 3 — Delegation (2024+)</h4>
                <pre className={conceptCodeBlock("p-3 text-sm")}>{`Human: "Monitor our supplier portfolio for concentration risk.
        When any supplier exceeds 30% of category spend, or
        when news signals financial instability, alert me with
        analysis and pre-drafted mitigation options.
        For critical categories, also pre-qualify backups.
        Run this continuously."

Agent: [Operates autonomously, reports periodically]`}</pre>
                <p className="text-sm mt-2">Persistent, continuous operation. Goal-driven, not instruction-driven. Human as governor, not operator.</p>
              </div>

              {/* Level 4 */}
              <div className={conceptSurface("p-4 border-l-4 border-violet-500")}>
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Level 4 — Objectives (2025+)</h4>
                <pre className={conceptCodeBlock("p-3 text-sm")}>{`Human: "Minimize supply chain disruption risk while maintaining
        cost efficiency within 5% of current levels.
        Authority: evaluate suppliers, request quotes, flag risks,
        recommend reallocations, draft communications.
        Escalate: supplier changes >$1M, new relationships,
        contract modifications."

Agent: [Interprets objective, develops strategy, executes]`}</pre>
                <p className="text-sm mt-2">Outcome-oriented authorization. Agent determines methods. Explicit authority boundaries. Human as strategic director.</p>
              </div>

              <div className={conceptSurface("p-4 border-l-4 border-amber-500")}>
                <p className="text-sm font-medium">
                  <strong>Key insight:</strong> Each level reduces cognitive load on humans while increasing the stakes of AI operation. This requires fundamentally different architectures, governance models, and organizational capabilities.
                </p>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="From Instructions to Intent"
            customPrompt="Explain the four levels of human-AI communication evolution from commands to objectives, and what architectural changes each level requires."
          />
        </div>
      ),
    },

    /* ────────────── TAB 3: Enterprise Scenarios ────────────── */
    {
      id: "enterprise-scenarios",
      title: "Enterprise Scenarios",
      description: "Five real-world process transformations",
      icon: <Buildings className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-World Process Transformations</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={scenarioTab} onValueChange={setScenarioTab}>
                <TabsList className="flex flex-wrap h-auto gap-1 mb-4">
                  <TabsTrigger value="procurement" className="text-xs">Procurement</TabsTrigger>
                  <TabsTrigger value="security" className="text-xs">Security Ops</TabsTrigger>
                  <TabsTrigger value="clinical" className="text-xs">Clinical Trials</TabsTrigger>
                  <TabsTrigger value="supply-chain" className="text-xs">Supply Chain</TabsTrigger>
                  <TabsTrigger value="customer-success" className="text-xs">Customer Success</TabsTrigger>
                  <TabsTrigger value="compliance" className="text-xs">Compliance</TabsTrigger>
                </TabsList>

                {/* Procurement */}
                <TabsContent value="procurement" className="space-y-4">
                  <SectionHeading icon={<Lightning className="w-5 h-5 text-red-500" />}>Before: Reactive Procurement</SectionHeading>
                  <div className={conceptSurface("p-4")}>
                    <p className="font-semibold mb-2">Monday 9:00 AM — Sarah (Procurement Manager) opens laptop</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>📧 47 emails about contract renewals</li>
                      <li>📊 3 dashboards showing supplier metrics</li>
                      <li>⚠️ Alert: Supplier X delivery delays (sent 14 hours ago)</li>
                      <li>📋 5 pending approvals in workflow system</li>
                      <li>💬 Slack: "Did you see the pricing change from Vendor Y?"</li>
                    </ul>
                    <div className="mt-3 text-sm">
                      <p><strong>Morning timeline:</strong></p>
                      <ul className="text-muted-foreground space-y-0.5 mt-1">
                        <li>9:00–9:45 → Triage emails, flag urgent ones</li>
                        <li>9:45–10:15 → Check dashboards, note anomalies</li>
                        <li>10:15–10:30 → Research Supplier X issue (too late to act)</li>
                        <li>10:30–11:00 → Find pricing change buried in email</li>
                        <li>11:00–11:30 → Process approvals with minimal context</li>
                        <li>11:30–12:00 → Finally begins strategic work</li>
                      </ul>
                      <p className="mt-2">⏱️ <strong>2.5 hours</strong> of cognitive overhead — 🎯 strategic value delivered: minimal</p>
                    </div>
                  </div>

                  <SectionHeading icon={<Lightning className="w-5 h-5 text-green-500" />}>After: Proactive Procurement Agent</SectionHeading>
                  <div className={conceptSurface("p-4 border-l-4 border-green-500")}>
                    <p className="font-semibold mb-2">Procurement Agent overnight actions completed:</p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium">• Supplier X delay detected at 7:14 PM yesterday</p>
                        <ul className="text-muted-foreground ml-4 space-y-0.5">
                          <li>→ Notified affected production teams</li>
                          <li>→ Identified 2 alternative suppliers with capacity</li>
                          <li>→ Drafted contingency PO (awaiting approval)</li>
                          <li>→ Escalated to Supplier X account manager</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium">• Vendor Y pricing change analyzed:</p>
                        <ul className="text-muted-foreground ml-4 space-y-0.5">
                          <li>→ 7% increase on Category A (above 5% threshold)</li>
                          <li>→ Contract clause 4.2 allows challenge</li>
                          <li>→ Drafted response letter (awaiting review)</li>
                          <li>→ Benchmarked against 3 alternatives</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium">• 5 approvals processed:</p>
                        <ul className="text-muted-foreground ml-4 space-y-0.5">
                          <li>→ 3 auto-approved (within policy, low-risk)</li>
                          <li>→ 2 require review (context + recommendation attached)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium">• 12 contracts expiring in 60 days:</p>
                        <ul className="text-muted-foreground ml-4 space-y-0.5">
                          <li>→ Renewal strategy drafted for top 4 by spend</li>
                          <li>→ Calendar holds created for negotiation windows</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-4 text-sm font-medium">
                      <span>📍 Decisions needed: 3</span>
                      <span>📍 Reviews needed: 2</span>
                      <span>📍 FYI updates: 7</span>
                    </div>
                    <p className="mt-3 text-sm">⏱️ <strong>20 minutes</strong> of oversight — 🎯 strategic value delivered: substantial</p>
                  </div>
                </TabsContent>

                {/* Security Operations */}
                <TabsContent value="security" className="space-y-4">
                  <SectionHeading icon={<ShieldCheck className="w-5 h-5" />}>Security Operations Center Transformation</SectionHeading>
                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-bold mb-2">Current State Pain Points</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 10,000+ alerts/day, 95%+ false positives</li>
                      <li>• 4-hour average response time for real threats</li>
                      <li>• Analyst burnout from alert fatigue</li>
                      <li>• Context switching between 12+ security tools</li>
                      <li>• Threat correlation requires manual investigation</li>
                    </ul>
                  </div>
                  <div className={conceptSurface("p-4 border-l-4 border-green-500")}>
                    <h4 className="font-bold mb-2">Proactive Agent Mesh Architecture</h4>
                    <p className="text-sm mb-3">Three specialized agents (Endpoint, Network, Identity) feed a <strong>Correlation Agent</strong> for cross-domain analysis, attack chain detection, and historical comparison.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-medium">Automated Response</p>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          <li>• Isolate compromised host</li>
                          <li>• Block malicious IP</li>
                          <li>• Revoke suspicious token</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Human Escalation</p>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          <li>• Full attack narrative</li>
                          <li>• Evidence chain</li>
                          <li>• Impact analysis + response options</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 text-sm">
                      <p className="font-medium">Proactive Hunt Mode — continuously:</p>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        <li>• Scans for dormant threats based on new indicators</li>
                        <li>• Tests detection rules against emerging TTPs</li>
                        <li>• Identifies coverage gaps in security posture</li>
                        <li>• Simulates attack scenarios on crown jewels</li>
                      </ul>
                    </div>
                  </div>
                  <div className={conceptSurface("p-3")}>
                    <p className="text-sm font-medium">Outcomes: 8-minute mean response (vs 4 hours) · 95% reduction in analyst alert triage · 24/7 coverage with 70% reduced staffing needs</p>
                  </div>
                </TabsContent>

                {/* Clinical Trials*/}
                <TabsContent value="clinical" className="space-y-4">
                  <SectionHeading icon={<Eye className="w-5 h-5" />}>Clinical Trial Monitoring</SectionHeading>
                  <p className="text-sm text-muted-foreground">A single clinical trial generates millions of data points across hundreds of sites globally. Proactive agents provide continuous vigilance that was previously resource-prohibitive.</p>

                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-bold mb-2">Medical Monitor Agent — Authority Boundaries</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="font-medium text-green-600 dark:text-green-400">✓ Authorized</p>
                        <ul className="text-muted-foreground space-y-0.5">
                          <li>• Query any data system</li>
                          <li>• Generate alerts and reports</li>
                          <li>• Recommend actions to site coordinators</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-red-600 dark:text-red-400">✗ Restricted</p>
                        <ul className="text-muted-foreground space-y-0.5">
                          <li>• Modify trial protocol</li>
                          <li>• Unblind treatment assignments</li>
                          <li>• Communicate with regulatory bodies</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={conceptSurface("p-4 border-l-4 border-blue-500")}>
                    <h4 className="font-bold mb-2">Safety Signal Detection — 6 hours vs 14 days</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Hour 0:</strong> Abnormal lab result uploaded (ALT 7.2× upper limit normal)</p>
                      <p><strong>Hour 0.1:</strong> Safety Agent detects signal, checks drug class history</p>
                      <p><strong>Hour 0.3:</strong> Cross-reference: concomitant meds, baseline, other patients on similar combo</p>
                      <p><strong>Hour 0.5:</strong> Auto-actions: site coordinator alerted, PI notified, hepatic panel ordered, SAE draft pre-populated, similar patients flagged</p>
                      <p><strong>Hour 4:</strong> Medical Monitor reviews agent workup, approves additional monitoring</p>
                    </div>
                    <p className="text-sm mt-3 font-medium">Traditional: 14 days to Medical Monitor awareness. Proactive: 4 hours to informed decision.</p>
                  </div>
                </TabsContent>

                {/* Supply Chain */}
                <TabsContent value="supply-chain" className="space-y-4">
                  <SectionHeading icon={<ArrowsOut className="w-5 h-5" />}>Supply Chain Disruption Management</SectionHeading>

                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-bold mb-2">Three-Agent Supply Chain Mesh</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Demand Sensing Agent</p>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          <li>• POS data from retail partners</li>
                          <li>• Social sentiment for demand signals</li>
                          <li>• Weather patterns</li>
                          <li>• Competitive pricing activity</li>
                        </ul>
                      </div>
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Supply Risk Agent</p>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          <li>• Supplier financial health</li>
                          <li>• Geopolitical risk</li>
                          <li>• Transport disruptions</li>
                          <li>• Regulatory changes</li>
                        </ul>
                      </div>
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Logistics Orchestration Agent</p>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          <li>• Carrier capacity & pricing</li>
                          <li>• Port congestion</li>
                          <li>• Customs clearance</li>
                          <li>• Last-mile performance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={conceptSurface("p-4 border-l-4 border-amber-500")}>
                    <h4 className="font-bold mb-2">Scenario: Typhoon — 5 days to landfall</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Day −5:</strong> Supply Risk Agent detects trajectory, assesses 3 tier-1 suppliers affected, 12 shipments in transit, estimates 15–20% volume disruption</p>
                      <p><strong>Day −4:</strong> Logistics Agent re-routes 8 shipments through Taipei, pre-books air freight for critical components</p>
                      <p><strong>Day −3:</strong> Operations Director receives summary: "Impact reduced from 20% to 3%. Mitigation cost: $180K. Avoided disruption: $2.4M." [APPROVE ALL] [REVIEW] [MODIFY]</p>
                    </div>
                    <p className="text-sm mt-3 font-medium">Reactive: disruption discovered when shipments stop, 2–3 week recovery, $2M+ impact.<br />Proactive: anticipated, mitigated pre-event, 3% impact, controlled $180K cost.</p>
                  </div>
                </TabsContent>

                {/* Customer Success */}
                <TabsContent value="customer-success" className="space-y-4">
                  <SectionHeading icon={<Users className="w-5 h-5" />}>Customer Success & Revenue Protection</SectionHeading>
                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-bold mb-2">Traditional CSM: The Coverage Gap</h4>
                    <p className="text-sm text-muted-foreground">CSM manages 50+ accounts. Reality: deep engagement with ~10, surface with rest. Churn surprises and missed expansion are the norm.</p>
                  </div>

                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-bold mb-2">Proactive Customer Health Orchestrator</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Health Monitor Agent</p>
                        <p className="text-xs text-muted-foreground">Login frequency, feature adoption, usage depth, error rates, API call patterns</p>
                      </div>
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Expansion Scout Agent</p>
                        <p className="text-xs text-muted-foreground">Upsell signals, usage ceiling patterns, team growth indicators</p>
                      </div>
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Rescue Squad Agent</p>
                        <p className="text-xs text-muted-foreground">Churn risk detection, intervention planning, re-engagement strategies</p>
                      </div>
                    </div>
                  </div>

                  <div className={conceptSurface("p-4 border-l-4 border-red-500")}>
                    <h4 className="font-bold mb-2">Example: Acme Corp ($450K ARR) — Health score decline</h4>
                    <div className="space-y-1 text-sm">
                      <p>▼ Champion left 45 days ago (LinkedIn detected) — Impact: −15 points</p>
                      <p>▼ Support tickets up 340% — Impact: −8 points (frustration with API perf)</p>
                      <p>▼ Executive sponsor sentiment declining — Impact: −5 points</p>
                      <p>▼ Feature adoption stalled — Impact: −3 points</p>
                    </div>
                    <p className="text-sm mt-3 font-medium">Agent: packages root cause analysis, intervention plan, draft emails, ROI recalculation, and competitive risk analysis for the CSM. Time from alert to first customer contact: 2 days (vs discovery at next QBR, 4 months later).</p>
                  </div>
                </TabsContent>

                {/* Compliance */}
                <TabsContent value="compliance" className="space-y-4">
                  <SectionHeading icon={<ShieldCheck className="w-5 h-5" />}>Regulatory Compliance Monitoring</SectionHeading>
                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-bold mb-2">The Compliance Challenge</h4>
                    <p className="text-sm text-muted-foreground">Global financial firms: 200+ regulatory bodies, 10,000+ requirements, 500+ updates per month. Current 40-person teams can't keep pace.</p>
                  </div>

                  <div className={conceptSurface("p-4")}>
                    <h4 className="font-bold mb-2">Agent Architecture</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Horizon Scanning Agent</p>
                        <p className="text-xs text-muted-foreground">Regulatory feeds, draft regulations, enforcement actions, peer filings</p>
                      </div>
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Impact Analysis Agent</p>
                        <p className="text-xs text-muted-foreground">Systems affected, remediation effort, cost estimates, timeline risk</p>
                      </div>
                      <div className={conceptSurface("p-3")}>
                        <p className="font-semibold mb-1">Policy Gap Agent</p>
                        <p className="text-xs text-muted-foreground">Policies requiring update, draft amendments, approval chains</p>
                      </div>
                    </div>
                  </div>

                  <div className={conceptSurface("p-4 border-l-4 border-blue-500")}>
                    <h4 className="font-bold mb-2">Scenario: New EU AI Decision-Making Regulation</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Day 0:</strong> Horizon Scanning Agent detects draft regulation — relevance score: 94% (HIGH)</p>
                      <p><strong>Same day:</strong> Impact Analysis: credit engine needs 6–9 month remediation, $1.2–1.8M cost</p>
                      <p><strong>Same day:</strong> Policy Gap Agent: 3 policies need update + 2 new policies required — all drafts attached</p>
                      <p><strong>Same day:</strong> CCO receives full package: regulation analysis, impact assessment, draft consultation response, policy updates, board briefing deck, project charter</p>
                    </div>
                    <p className="text-sm mt-3 font-medium">Traditional: regulation discovered 6+ months later, scrambled compliance effort. Proactive: same-day detection, pre-assessed, materials ready — compliance team <em>leads</em> instead of chases.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Enterprise Scenarios"
            customPrompt="Describe five enterprise scenarios where proactive AI agents transform operations: security, clinical trials, supply chain, customer success, and regulatory compliance."
          />
        </div>
      ),
    },

    /* ────────────── TAB 4: Organizational Transformation ────────────── */
    {
      id: "organizational-transformation",
      title: "Org Transformation",
      description: "New roles, operating models, and the attention dividend",
      icon: <Users className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Operating Model Shift */}
          <Card>
            <CardHeader>
              <CardTitle>The Operating Model Shift</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4")}>
                  <h4 className="font-bold mb-2">From: Human-Centric Execution</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Executives → Middle Mgmt → Specialists</li>
                    <li>• Bottom-up reporting, top-down direction</li>
                    <li>• Hierarchical decision rights</li>
                    <li>• Task-based, reactive to inputs</li>
                    <li>• AI role: tool for individual productivity</li>
                  </ul>
                </div>
                <div className={conceptSurface("p-4 border-l-4 border-green-500")}>
                  <h4 className="font-bold mb-2">To: Human-AI Partnership</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Humans define objectives & constraints</li>
                    <li>• Humans set boundaries & monitor health</li>
                    <li>• Agent mesh executes & adapts</li>
                    <li>• Continuous, multi-directional information</li>
                    <li>• AI role: operational partner with delegated authority</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Roles */}
          <Card>
            <CardHeader>
              <CardTitle>Emerging Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    role: "Agent Designer",
                    from: "Business Analyst, Process Engineer",
                    desc: "Translates business objectives to agent specifications, defines authority boundaries and escalation triggers.",
                  },
                  {
                    role: "Agent Operator",
                    from: "Operations Analyst, Team Lead",
                    desc: "Manages a portfolio of 20+ agents, reviews daily outputs, adjusts thresholds, handles edge cases.",
                  },
                  {
                    role: "AI Governance Specialist",
                    from: "Risk Manager, Compliance Officer",
                    desc: "Defines guardrails, audits agent decisions, manages authority delegation frameworks.",
                  },
                  {
                    role: "Strategic Orchestrator",
                    from: "Senior Manager, Director",
                    desc: "Sets objectives for agent portfolios, allocates attention to highest-value decisions, resolves cross-agent conflicts.",
                  },
                ].map((r) => (
                  <div key={r.role} className={conceptSurface("p-4")}>
                    <h4 className="font-bold">{r.role}</h4>
                    <p className="text-xs text-muted-foreground mb-1">Evolution from: {r.from}</p>
                    <p className="text-sm">{r.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attention Dividend */}
          <Card>
            <CardHeader>
              <CardTitle>The Attention Dividend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">When agents absorb vigilance work, where does the recovered attention go?</p>
              <div className="space-y-3">
                {[
                  { from: "Monitoring dashboards (−40%)", to: "Deep customer relationships, strategic account work" },
                  { from: "Triaging alerts (−60%)", to: "Proactive risk mitigation, system resilience" },
                  { from: "Routine report generation (−30%)", to: "Strategic analysis, forward-looking planning" },
                  { from: "Data gathering/synthesis (−50%)", to: "Creative problem solving, innovation" },
                  { from: "Repetitive communications (−25%)", to: "High-stakes negotiations, relationship building" },
                ].map((item) => (
                  <div key={item.from} className="flex flex-col sm:flex-row gap-2 text-sm">
                    <span className="text-muted-foreground line-through flex-1">{item.from}</span>
                    <span className="hidden sm:inline">→</span>
                    <span className="flex-1 font-medium">{item.to}</span>
                  </div>
                ))}
              </div>
              <div className={conceptSurface("p-3 mt-4 border-l-4 border-violet-500")}>
                <p className="text-sm font-medium">Net effect: human work shifts from <strong>VIGILANCE</strong> → <strong>VALUE CREATION</strong></p>
              </div>
            </CardContent>
          </Card>

          {/* Competitive Dynamics */}
          <Card>
            <CardHeader>
              <CardTitle>The Compounding Advantage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    year: "Year 1",
                    proactive: "Deploying first agents, learning governance, building capabilities",
                    reactive: "Still optimizing chatbots, productivity gains plateauing",
                    gap: "Minimal — perceived as experimenting"
                  },
                  {
                    year: "Year 2",
                    proactive: "30% of routine ops on agents, staff redirected to strategy",
                    reactive: "Beginning agent pilots, struggling with governance",
                    gap: "Emerging — A responds faster, catches issues earlier"
                  },
                  {
                    year: "Year 3",
                    proactive: "60% ops with agent involvement, NPS up 20pts, cost advantage",
                    reactive: "15% automation, high failure rate, talent leaving",
                    gap: "Significant — A can do things B structurally cannot"
                  },
                  {
                    year: "Year 4+",
                    proactive: "Industry leadership, talent destination, new markets",
                    reactive: "Considering acquisition, reactive mode permanent",
                    gap: "Structural — capabilities B cannot buy"
                  },
                ].map((row) => (
                  <div key={row.year} className={conceptSurface("p-3")}>
                    <p className="font-bold text-sm mb-1">{row.year}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-green-600 dark:text-green-400 font-medium">Proactive: </span>
                        <span className="text-muted-foreground">{row.proactive}</span>
                      </div>
                      <div>
                        <span className="text-red-600 dark:text-red-400 font-medium">Reactive: </span>
                        <span className="text-muted-foreground">{row.reactive}</span>
                      </div>
                    </div>
                    <p className="text-xs mt-1 font-medium">{row.gap}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Organizational Transformation"
            customPrompt="Explain how proactive AI agents transform organizational operating models, create new roles, and generate a compounding competitive advantage over multiple years."
          />
        </div>
      ),
    },

    /* ────────────── TAB 5: Risk & Governance ────────────── */
    {
      id: "risk-governance",
      title: "Risks & Guardrails",
      description: "Failure modes, mitigations, and governance frameworks",
      icon: <Warning className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Proactive AI Risk Landscape</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  risk: "Cascade Failures",
                  desc: "Agent action triggers other agents → rapid propagation of error. Example: supply chain agent re-routes shipment → inventory agent reorders → finance agent adjusts forecasts — all based on initial mistake.",
                  mitigations: [
                    "Action rate limiting (max N actions/hr)",
                    "Cascade detection (monitor unusual action chains)",
                    "Mandatory cooling periods for high-impact actions",
                    "Cross-agent impact assessment before execution",
                  ],
                },
                {
                  risk: "Authority Creep",
                  desc: "Agents gradually exceed intended authority through edge cases. Example: customer service agent authorized for 10% discount finds edge cases allowing 15%, 20%. No single violation, but cumulative drift.",
                  mitigations: [
                    "Hard authority limits (not soft guidelines)",
                    "Periodic authority audits with drift detection",
                    "Exception tracking with human review thresholds",
                    "Regular re-authorization cycles",
                  ],
                },
                {
                  risk: "Automation Complacency",
                  desc: "Humans stop scrutinizing agent actions. Example: compliance agent flags 5 of 1,000 transactions. Humans approve reflexively. Agent develops blind spot.",
                  mitigations: [
                    "Inject synthetic 'test' cases humans must evaluate",
                    "Rotate review responsibilities",
                    "Randomized deep audits of auto-approved decisions",
                    "Consequence tracking: what happened to approved items?",
                  ],
                },
                {
                  risk: "Context Decay",
                  desc: "Agent's persistent context becomes stale. Example: customer health agent has outdated relationship map—champion left 6 months ago, agent still optimizing for wrong stakeholder.",
                  mitigations: [
                    "Context freshness monitoring",
                    "Periodic context refresh cycles",
                    "Confidence decay for aged information",
                    "Contradiction detection across data sources",
                  ],
                },
                {
                  risk: "Objective Misalignment",
                  desc: "Agent optimizes for measurable proxy, not true intent. Example: success agent optimizes health score—learns quick fixes boost score temporarily while real health declines.",
                  mitigations: [
                    "Multiple objective metrics (not single score)",
                    "Lagging indicator tracking (long-term outcomes)",
                    "Periodic objective recalibration",
                    "Human review of optimization strategies, not just outcomes",
                  ],
                },
              ].map((item) => (
                <div key={item.risk} className={conceptSurface("p-4")}>
                  <h4 className="font-bold flex items-center gap-2">
                    <Warning className="w-4 h-4 text-amber-500" />
                    {item.risk}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  <div className="mt-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mitigations</p>
                    <ul className="text-sm mt-1 space-y-0.5">
                      {item.mitigations.map((m) => (
                        <li key={m}>• {m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Risks & Guardrails"
            customPrompt="Analyze the five critical risk categories for proactive AI agents: cascade failures, authority creep, automation complacency, context decay, and objective misalignment. Include mitigation strategies for each."
          />
        </div>
      ),
    },

    /* ────────────── TAB 6: Implementation Roadmap ────────────── */
    {
      id: "implementation-roadmap",
      title: "Roadmap & TRD",
      description: "Phased implementation and technical requirements",
      icon: <ChartLineUp className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          {/* Phased Journey */}
          <Card>
            <CardHeader>
              <CardTitle>The Transition Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  phase: "Phase 1: Foundation",
                  timeline: "Months 1–6",
                  color: "border-emerald-500",
                  technical: [
                    "Platform selection & setup",
                    "Integration architecture",
                    "Security/compliance baseline",
                  ],
                  org: [
                    "Executive alignment",
                    "Governance framework design",
                    "Role/skill gap assessment",
                    "Change management planning",
                  ],
                  agents: "Low-risk, high-visibility use cases with heavy human oversight. Focus on learning, not efficiency.",
                },
                {
                  phase: "Phase 2: Expansion",
                  timeline: "Months 6–18",
                  color: "border-blue-500",
                  technical: [
                    "Multi-agent orchestration",
                    "Observability maturation",
                    "Authority framework implementation",
                  ],
                  org: [
                    "Operating model adaptation",
                    "New role development",
                    "Training program deployment",
                    "Cultural shift programs",
                  ],
                  agents: "Medium-risk operational processes. Graduated authority expansion. Cross-functional agent coordination.",
                },
                {
                  phase: "Phase 3: Transformation",
                  timeline: "Months 18–36",
                  color: "border-violet-500",
                  technical: [
                    "Full agent mesh deployment",
                    "Advanced governance tools",
                    "Cross-enterprise integration",
                    "Continuous improvement loops",
                  ],
                  org: [
                    "New operating model live",
                    "Agent-native workforce",
                    "Industry leadership",
                    "New business models",
                  ],
                  agents: "Mission-critical processes. Strategic decision support. Customer-facing agent interactions.",
                },
              ].map((p) => (
                <div key={p.phase} className={conceptSurface(`p-4 border-l-4 ${p.color}`)}>
                  <h4 className="font-bold">{p.phase} <span className="font-normal text-sm text-muted-foreground">({p.timeline})</span></h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-sm">
                    <div>
                      <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">Technical</p>
                      <ul className="text-muted-foreground space-y-0.5">
                        {p.technical.map((t) => <li key={t}>• {t}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">Organizational</p>
                      <ul className="text-muted-foreground space-y-0.5">
                        {p.org.map((o) => <li key={o}>• {o}</li>)}
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm mt-2"><strong>Agents:</strong> {p.agents}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Platform TRD Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Requirements — Platform Architecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className={conceptCodeBlock("p-4 text-xs")}>{`PROACTIVE AI AGENT PLATFORM — LAYERED ARCHITECTURE

┌────────────────────────────────────────────────┐
│            PRESENTATION LAYER                  │
│  Operator Console · Business Dashboard         │
│  Governance Portal · API Gateway · Mobile      │
├────────────────────────────────────────────────┤
│            ORCHESTRATION LAYER                 │
│  Workflow Engine · Event Router                 │
│  Priority Queue · Agent Registry               │
├────────────────────────────────────────────────┤
│              AGENT RUNTIME                     │
│  Agent Containers · Tool Integration           │
│  Memory Management · Authority Enforcement     │
├────────────────────────────────────────────────┤
│            GOVERNANCE LAYER                    │
│  Authority Framework · Audit Trail             │
│  Policy Engine · Compliance Reporting          │
├────────────────────────────────────────────────┤
│           OBSERVABILITY LAYER                  │
│  Metrics · Traces · Logs · Alerts              │
│  Decision Replay · Drift Detection             │
├────────────────────────────────────────────────┤
│           INTEGRATION LAYER                    │
│  Enterprise APIs · Event Streams               │
│  Data Connectors · External Services           │
└────────────────────────────────────────────────┘`}</pre>
            </CardContent>
          </Card>

          {/* Self Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Self-Assessment: Where Are You?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  q: "Current State",
                  options: [
                    "No AI agents in operation",
                    "Pilots / experiments with limited scope",
                    "Production agents with narrow authority",
                    "Agents operating across multiple functions",
                    "Agents are core to our operating model",
                  ],
                },
                {
                  q: "Organizational Readiness",
                  options: [
                    "Leadership views AI as productivity tool",
                    "Leadership understands reactive/proactive distinction",
                    "We have governance frameworks for AI authority",
                    "We have roles focused on agent operations",
                    "Our culture embraces human-AI partnership",
                  ],
                },
                {
                  q: "Technical Capability",
                  options: [
                    "Basic LLM integration",
                    "Tool-use and API connectivity",
                    "Persistent agent infrastructure",
                    "Multi-agent orchestration",
                    "Mature observability and governance",
                  ],
                },
              ].map((section) => (
                <div key={section.q} className={conceptSurface("p-4")}>
                  <h4 className="font-bold text-sm mb-2">{section.q}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {section.options.map((o) => (
                      <li key={o}>☐ {o}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className={conceptSurface("p-3 border-l-4 border-violet-500")}>
                <p className="text-sm">
                  <strong>Early Stage:</strong> Build foundation, start with observation agents · <strong>Mid Stage:</strong> Expand authority gradually, develop governance · <strong>Advanced:</strong> Transform operating model, pursue strategic advantage
                </p>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton
            title="Implementation Roadmap"
            customPrompt="Outline a three-phase implementation roadmap for transitioning an enterprise from reactive to proactive AI agents, including technical requirements and organizational changes needed at each phase."
          />
        </div>
      ),
    },
  ]

  return (
    <ConceptLayout
      conceptId="proactive-agent-design"
      title="Proactive Agent Design"
      description="From reactive copilots to autonomous sentinels—design agents that act before you ask. Covers the paradigm shift, five enterprise transformation scenarios, organizational operating models, risk governance, and a phased implementation roadmap."
      icon={<Eye className="w-6 h-6" />}
      tabs={tabs}
      estimatedTime="45-60 min"
      nextConcept={{
        id: "agent-ops",
        title: "Agent Operations",
        description: "Run, monitor, and triage production agent fleets at scale.",
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
