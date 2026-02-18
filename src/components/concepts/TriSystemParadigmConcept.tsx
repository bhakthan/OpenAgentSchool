import { useState, useCallback } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Lightning,
  Gear,
  Robot,
  Warning,
  ArrowRight,
  BookOpen,
  Shield,
  ChartBar,
  Users,
  Eye,
  FilePdf,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react"
import { conceptSurface, conceptSurfaceSoft } from "./conceptStyles"

/* ─── Slide Carousel (15 pages from PDF) ─────────────────────────────────── */
const TOTAL_SLIDES = 15
const slideSrc = (n: number) =>
  `/images/Tri_System_Architecture_p${String(n).padStart(2, "0")}.webp`

function SlideCarousel() {
  const [page, setPage] = useState(1)
  const prev = useCallback(() => setPage(p => Math.max(1, p - 1)), [])
  const next = useCallback(() => setPage(p => Math.min(TOTAL_SLIDES, p + 1)), [])

  return (
    <div className="space-y-4">
      <p className="text-lg text-muted-foreground">
        <strong>Beyond the Brain-Bound Mind: Why 'Slow Thinking' is Becoming 'Artificial
        Thinking'</strong> — the full 15-page companion slide deck to the SSRN pre-print.
        Use the arrows or slider to browse.
      </p>

      {/* Slide viewer */}
      <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
        <img
          key={page}
          src={slideSrc(page)}
          alt={`Tri-System Architecture — slide ${page} of ${TOTAL_SLIDES}`}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={page === 1}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <CaretLeft size={16} weight="bold" /> Prev
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium tabular-nums">
            Slide {page} of {TOTAL_SLIDES}
          </span>
          <input
            type="range"
            min={1}
            max={TOTAL_SLIDES}
            value={page}
            onChange={e => setPage(Number(e.target.value))}
            className="w-32 sm:w-48 accent-primary"
            aria-label="Slide slider"
          />
        </div>

        <button
          onClick={next}
          disabled={page === TOTAL_SLIDES}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          Next <CaretRight size={16} weight="bold" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        15-slide visual companion — use the slider or arrows to browse all pages
      </p>
    </div>
  )
}

interface TriSystemParadigmConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function TriSystemParadigmConcept({
  onMarkComplete,
  onNavigateToNext,
}: TriSystemParadigmConceptProps) {
  const tabs = [
    // ─── Tab 1: Overview ─────────────────────────────────────────────────────
    {
      id: "overview",
      title: "Overview",
      description: "From Dual-Process Theory to Triadic Cognitive Ecology",
      icon: <Brain className="w-4 h-4" />,
      level: "fundamentals" as const,
      content: (
        <div className="space-y-6">
          {/* Hero infographic — responsive: portrait on mobile, landscape on desktop */}
          <div className="rounded-xl overflow-hidden border bg-muted/30">
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet="/images/Tri_System_Paradigm_Landscape.webp"
              />
              <img
                src="/images/Tri_System_Paradigm_Portrait.webp"
                alt="The Tri-System Paradigm: Evolution of Human Cognition in the AI Age — full infographic"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </picture>
          </div>

          {/* Core argument callout */}
          <div className="rounded-xl border-l-4 border-violet-500 bg-violet-50 dark:bg-violet-900/20 p-5 space-y-3">
            <p className="text-lg font-semibold text-violet-700 dark:text-violet-300">
              The Central Argument
            </p>
            <p className="text-lg leading-relaxed">
              Kahneman showed that <strong>System 2 — "Reasoning" — is famously lazy</strong>. It
              consumes glucose, requires volition, and fatigues quickly. Humans naturally
              gravitate toward the ease of System 1 (Intuition) whenever possible. That laziness
              was once bounded by the limits of available shortcuts.
            </p>
            <p className="text-lg leading-relaxed">
              The <strong>evolutionary danger of the Tri-System era</strong> is that System 3
              makes laziness <em>more efficient than ever before</em>. It offers a low-friction
              path that short-circuits the need for internal thought entirely. Because AI outputs
              are fluent and authoritative, they bypass the conflict signals that normally wake up
              System 2. The user feels smarter and more confident — even when they have just
              surrendered their judgment to a hallucination.
            </p>
            <p className="text-lg leading-relaxed font-medium">
              The future of human intelligence therefore depends on{" "}
              <strong className="text-violet-700 dark:text-violet-300">beneficial friction</strong>
              : deliberately designing interfaces that force System 2 awake, rather than letting
              it sleep through every AI interaction.
            </p>
          </div>

          {/* Framing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-violet-500" />
                From Dual-Process to Triadic Cognitive Ecology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Daniel Kahneman's Nobel Lecture (2002) established that human judgment is governed
                by two internal systems: <strong>System 1</strong> — fast, automatic, governed by
                accessibility — and <strong>System 2</strong> — slow, serial, the "lazy controller"
                that monitors System 1's output but avoids doing so whenever it can.
              </p>
              <p className="text-lg leading-relaxed">
                The <strong>Tri-System Paradigm</strong> (Bhaktavatsalam, 2025) proposes that
                cognition is no longer brain-bound. A third agent — System 3 — has entered the
                architecture: external, automated, data-driven, and dynamic. Unlike a passive tool
                (a calculator, a spreadsheet), System 3 is a <em>functional cognitive agent</em>
                that generates outputs with System 1's speed and the apparent analytical depth of
                System 2 — without requiring either the glucose or the volition.
              </p>
              <div className={conceptSurfaceSoft("p-4 space-y-2")}>
                <h4 className="font-semibold">Why this matters for every AI practitioner</h4>
                <ul className="text-lg text-muted-foreground space-y-1">
                  <li>• Every agent you ship becomes embedded in a user's cognitive loop</li>
                  <li>• Fluent, confident AI output suppresses the conflict signal that wakes up System 2</li>
                  <li>• Without friction, users adopt AI answers wholesale — including hallucinations</li>
                  <li>• Without friction, we risk a <strong>mass surrender of human agency</strong> to statistical convenience</li>
                  <li>• The goal: AI as a scaffold for thought, not a replacement for it</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                References
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-lg">
              <div className={conceptSurface("p-4 space-y-1")}>
                <p className="font-medium">Primary — SSRN Pre-print</p>
                <p className="text-muted-foreground">
                  Shaw, S.D. &amp; Nave, G. (2025).{" "}
                  <em>
                    The Tri-System Paradigm: Cognitive Surrender, Epistemic Dependence, and the
                    Architect's Imperative in the Age of Generative AI
                  </em>
                  . University of Pennsylvania — The Wharton School.
                </p>
                <a
                  href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all"
                >
                  https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646
                </a>
              </div>
              <div className={conceptSurface("p-4 space-y-1")}>
                <p className="font-medium">Foundation — Nobel Lecture</p>
                <p className="text-muted-foreground">
                  Kahneman, D. (2002).{" "}
                  <em>Maps of Bounded Rationality: A Perspective on Intuitive Judgment and Choice</em>
                  . Nobel Prize Lecture.
                </p>
                <a
                  href="https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/lecture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all"
                >
                  nobelprize.org/prizes/economic-sciences/2002/kahneman/lecture/
                </a>
              </div>
              <div className={conceptSurface("p-4 space-y-1")}>
                <p className="font-medium">Background — Dual-Process Theory</p>
                <p className="text-muted-foreground">
                  Kahneman, D. (2011). <em>Thinking, Fast and Slow</em>. Farrar, Straus and Giroux.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },

    // ─── Tab 2: The Three Systems ─────────────────────────────────────────────
    {
      id: "three-systems",
      title: "The Three Systems",
      description: "Intuitive, Deliberate, and Artificial — the triadic architecture",
      icon: <Gear className="w-4 h-4" />,
      level: "architecture" as const,
      content: (
        <div className="space-y-6">
          {/* Three-column cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* System 1 */}
            <div className="rounded-xl border p-5 space-y-3 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2">
                <Lightning className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-orange-700 dark:text-orange-300">
                  System 1 — The Intuitive Biological
                </h3>
              </div>
              <ul className="text-lg space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  Fast
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  Automatic
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  Effortless
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  Accessibility-driven
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Generates "impressions" via natural assessments. Governed by how easily a thought
                comes to mind. Provides rapid heuristic answers.
              </p>
            </div>

            {/* System 2 */}
            <div className="rounded-xl border p-5 space-y-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-blue-700 dark:text-blue-300">
                  System 2 — The Deliberate Biological
                </h3>
              </div>
              <ul className="text-lg space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  Slow
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  Serial
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  Effortful
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  Energy + Monitoring
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                The "lazy controller." Responsible for explicit judgments and monitoring System 1.
                Easily fatigued; often endorses System 1 impressions without checking.
              </p>
            </div>

            {/* System 3 */}
            <div className="rounded-xl border p-5 space-y-3 bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800">
              <div className="flex items-center gap-2">
                <Robot className="w-5 h-5 text-violet-500" />
                <h3 className="font-bold text-violet-700 dark:text-violet-300">
                  System 3 — The Artificial
                </h3>
              </div>
              <ul className="text-lg space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                  External (in silico)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                  Automated
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                  Data-driven
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                  Dynamic
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                A functional cognitive agent — not a passive tool. Generates outputs with System
                1's speed and apparent System 2 analytical depth. Fluent, authoritative, and
                scalable.
              </p>
            </div>
          </div>

          {/* Paradigm comparison table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="w-5 h-5" />
                Paradigm Comparison Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold">Cognitive Stage</th>
                      <th className="text-left py-2 pr-4 font-semibold text-blue-600 dark:text-blue-400">
                        Kahneman's Dual-Process
                      </th>
                      <th className="text-left py-2 font-semibold text-violet-600 dark:text-violet-400">
                        Tri-System Paradigm
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      ["INPUT", "Perceptual / Conceptual", "Digital / Data-Driven"],
                      [
                        "FAST PROCESSING",
                        "System 1: Associative, emotional, error-prone",
                        "System 3: Statistical, unemotional, fluent",
                      ],
                      [
                        "THE 'MISER' TRAP",
                        "Attribute Substitution (easier question)",
                        "Cognitive Surrender (adopt AI answer)",
                      ],
                      [
                        "SLOW PROCESSING",
                        "System 2: Monitors System 1",
                        "System 2: Monitors BOTH intuition AND AI",
                      ],
                      [
                        "FAILURE MODE",
                        "Bias: Systematic intuition errors",
                        "Epistemic Dependence: Verification atrophy",
                      ],
                    ].map(([stage, dual, tri]) => (
                      <tr key={stage} className="border-b last:border-0">
                        <td className="py-2 pr-4 font-medium text-foreground">{stage}</td>
                        <td className="py-2 pr-4">{dual}</td>
                        <td className="py-2">{tri}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },

    // ─── Tab 3: Cognitive Surrender ───────────────────────────────────────────
    {
      id: "cognitive-traps",
      title: "Cognitive Surrender",
      description:
        "Attribute substitution evolved — the System 3 Trap and confidence inflation",
      icon: <Warning className="w-4 h-4" />,
      level: "implementation" as const,
      content: (
        <div className="space-y-6">
          {/* Attribute substitution evolution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-orange-500" />
                The Evolution of Attribute Substitution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Kahneman showed that heuristics arise via <strong>attribute substitution</strong>:
                when confronted with a difficult question (the <em>target attribute</em>), System 1
                substitutes it with an easier question (the <em>heuristic attribute</em>).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                    Kahneman's Era
                  </h4>
                  <div className="text-lg text-muted-foreground space-y-1">
                    <p>Difficult question: "How risky is this stock?"</p>
                    <p className="flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 shrink-0" />
                      Easier substitute: "Do I like the company name?"
                    </p>
                    <p className="text-sm italic">Driven by internal accessibility bias</p>
                  </div>
                </div>
                <div className={conceptSurface("p-4 space-y-2")}>
                  <h4 className="font-semibold text-violet-600 dark:text-violet-400">
                    Tri-System Era
                  </h4>
                  <div className="text-lg text-muted-foreground space-y-1">
                    <p>Difficult question: "Complex analysis needed"</p>
                    <p className="flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 shrink-0" />
                      Easier substitute: "What does the AI say?"
                    </p>
                    <p className="text-sm italic">Driven by external cognitive offloading</p>
                  </div>
                </div>
              </div>

              <div className={conceptSurfaceSoft("p-4 space-y-2")}>
                <h4 className="font-semibold text-red-600 dark:text-red-400">
                  ⚠️ Cognitive Surrender vs. Cognitive Offloading
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-1">Cognitive Offloading (healthy)</p>
                    <p>
                      Strategically delegating sub-tasks to an external tool while maintaining
                      reasoning oversight and verification capability.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Cognitive Surrender (pathological)
                    </p>
                    <p>
                      Abdicating reasoning entirely — blindly adopting System 3's judgment as
                      one's own, with no verification and inflated confidence.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System 3 Trap loop */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="w-5 h-5 text-red-500" />
                The System 3 Trap — Six-Step Loop
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-lg text-muted-foreground">
                System 2 needs a <em>conflict signal</em> — a moment of surprise or inconsistency
                — to bother engaging. System 3's high linguistic fluency eliminates that signal.
                The output sounds right, reads right, and arrives instantly. The lazy controller
                sees no reason to wake up. Here is how that collapse plays out step by step:
              </p>
              <div className="space-y-2">
                {[
                  {
                    n: "1",
                    label: "User Question",
                    desc: "A complex or ambiguous question is posed",
                    color: "bg-blue-500",
                  },
                  {
                    n: "2",
                    label: "System 3 Query",
                    desc: "The question is routed directly to the AI rather than engaging System 2",
                    color: "bg-violet-500",
                  },
                  {
                    n: "3",
                    label: "Fluent Output",
                    desc: "System 3 returns a confident, coherent, well-formatted response",
                    color: "bg-violet-400",
                  },
                  {
                    n: "4",
                    label: "No Conflict Signal",
                    desc: "High linguistic fluency removes the anomaly that normally triggers System 2's error-detection reflex",
                    color: "bg-orange-400",
                  },
                  {
                    n: "5",
                    label: "System 2 Bypassed",
                    desc: "The lazy controller — which requires volition and burns glucose — sees no reason to engage. Effort: zero.",
                    color: "bg-red-400",
                  },
                  {
                    n: "6",
                    label: "Confidence Inflation",
                    desc: "The user feels smarter and more certain than warranted — even if the adopted answer is a hallucination",
                    color: "bg-red-600",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-3">
                    <span
                      className={`${step.color} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      {step.n}
                    </span>
                    <div>
                      <span className="font-medium">{step.label}: </span>
                      <span className="text-muted-foreground text-lg">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={conceptSurfaceSoft("p-4 mt-4")}>
                <h4 className="font-semibold mb-2">
                  The Law of Least Effort meets high-fidelity AI
                </h4>
                <p className="text-lg text-muted-foreground">
                  Kahneman called humans <em>cognitive misers</em>: we avoid the energetic cost of
                  System 2 whenever a plausible shortcut exists. Historically, that shortcut was
                  fallible intuition — and its obvious errors eventually forced System 2 awake.
                  System 3 removes even that corrective mechanism. Its outputs are too polished,
                  too fast, and too confident for doubt to crystallise.{" "}
                  <strong>
                    The gap between perceived and actual accuracy widens silently — and the user
                    never knows they surrendered.
                  </strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },

    // ─── Tab 4: Evolutionary Paths ────────────────────────────────────────────
    {
      id: "trajectories",
      title: "Evolutionary Paths",
      description:
        "Three divergent trajectories: Epistemic Dependent, Calibrated Collaboration, Automated Loop",
      icon: <ArrowRight className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            How individuals and organizations evolve in their relationship with System 3 falls into
            three distinct trajectories. Only one is sustainable.
          </p>

          {/* Path 1 */}
          <div className="rounded-xl border border-red-200 dark:border-red-800 p-5 space-y-3 bg-red-50 dark:bg-red-900/10">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-red-600 dark:text-red-400">Path 1</span>
              <h3 className="font-bold text-red-700 dark:text-red-300">Epistemic Dependent</h3>
              <span className="ml-auto text-sm text-red-500 font-medium">↘ Declining</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Risks</h4>
                <ul className="text-lg text-muted-foreground space-y-1">
                  <li>• <strong>Deskilling Risk</strong> — core reasoning muscles atrophy from disuse</li>
                  <li>• <strong>Lost Reference Points</strong> — no internal baseline to sanity-check AI output</li>
                  <li>• <strong>Catastrophic Failure When AI Hallucinates</strong> — no fallback cognition</li>
                  <li>• <strong>Verification Capability</strong> erodes to near zero</li>
                </ul>
              </div>
              <div className={conceptSurfaceSoft("p-4")}>
                <h4 className="font-semibold text-sm mb-2">Organizational Symptom</h4>
                <p className="text-lg text-muted-foreground">
                  Teams stop peer-reviewing AI outputs. Onboarding skips domain fundamentals.
                  Decision quality feels high until the first high-stakes hallucination — then the
                  system has no human failsafe.
                </p>
              </div>
            </div>
          </div>

          {/* Path 2 */}
          <div className="rounded-xl border border-green-200 dark:border-green-800 p-5 space-y-3 bg-green-50 dark:bg-green-900/10">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">Path 2</span>
              <h3 className="font-bold text-green-700 dark:text-green-300">
                Calibrated Collaboration — The Centaur Model
              </h3>
              <span className="ml-auto text-sm text-green-500 font-medium">↗ Improving</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Characteristics</h4>
                <ul className="text-lg text-muted-foreground space-y-1">
                  <li>• <strong>Cognitive Offloading (Not Surrender)</strong> — tool use with maintained oversight</li>
                  <li>• <strong>System 3 as Hypothesis Generator</strong> — AI proposes, human adjudicates</li>
                  <li>• <strong>Metacognitive Awareness</strong> — knowing when to trust vs. verify</li>
                  <li>• <strong>Decision Quality improvement</strong> — error detection 2× better than AI alone</li>
                </ul>
              </div>
              <div className={conceptSurfaceSoft("p-4")}>
                <h4 className="font-semibold text-sm mb-2">Design Principle</h4>
                <p className="text-lg text-muted-foreground">
                  The centaur model treats System 3 as a powerful drafting engine and pattern
                  detector, while System 2 retains the judgment seat. The human's role shifts
                  from <em>computation</em> to <em>evaluation and calibration</em>.
                </p>
              </div>
            </div>
          </div>

          {/* Path 3 */}
          <div className="rounded-xl border border-gray-300 dark:border-gray-700 p-5 space-y-3 bg-gray-50 dark:bg-gray-900/20">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-600 dark:text-gray-400">Path 3</span>
              <h3 className="font-bold text-gray-700 dark:text-gray-300">Automated Loop</h3>
              <span className="ml-auto text-sm text-gray-500 font-medium">⟳ Autonomous</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Characteristics</h4>
                <ul className="text-lg text-muted-foreground space-y-1">
                  <li>• <strong>Bypasses Brain Boundary</strong> — System 2 removed from loop entirely</li>
                  <li>• <strong>Agency Dissolution</strong> — no identifiable human decision maker</li>
                  <li>• <strong>Invisible Reasoning Steps</strong> — audit trails become post-hoc rationalizations</li>
                </ul>
              </div>
              <div className={conceptSurfaceSoft("p-4")}>
                <h4 className="font-semibold text-sm mb-2">When this is intentional vs. dangerous</h4>
                <p className="text-lg text-muted-foreground">
                  Fully automated loops are appropriate for low-stakes, high-volume, reversible
                  decisions (e.g., spam filtering). They become dangerous when applied to
                  high-stakes, irreversible, or value-laden judgments where accountability and
                  explainability are required.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // ─── Tab 5: PDF Slides ────────────────────────────────────────────────────
    {
      id: "pdf-slides",
      title: "Artificial Thinking",
      description: "Beyond the Brain-Bound Mind — full slide deck (15 pages)",
      icon: <FilePdf className="w-4 h-4" />,
      level: "fundamentals" as const,
      content: <SlideCarousel />,
    },

    // ─── Tab 6: Beneficial Friction ───────────────────────────────────────────
    {
      id: "beneficial-friction",
      title: "Beneficial Friction",
      description: "System 2 as the guardian — six design patterns to preserve human agency",
      icon: <Shield className="w-4 h-4" />,
      level: "advanced" as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                The Solution: Beneficial Friction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                The antidote to cognitive surrender is not less AI — it is{" "}
                <strong>intentional friction</strong>. We must design interfaces that do not aim
                for seamless automation, but that <em>artificially force System 2 to wake up</em>.
                Uncertainty markers, mandatory verification steps, interactive feedback loops,
                confidence scores — these are not UX failures. They are the mechanism by which
                humans use AI as a <strong>scaffold for thought</strong> rather than a replacement
                for it.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Without this friction, we risk a mass surrender of human agency to the statistical
                convenience of the machine. System 2 does not atrophy gradually — it can be
                switched off one frictionless interaction at a time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: "🖥️",
                    title: "Interface Design",
                    subtitle: "Forced verification checkpoints",
                    desc: "Build mandatory pause-and-confirm steps before AI output is acted upon. Make the verification action explicit, not optional.",
                    color: "border-blue-200 dark:border-blue-800",
                  },
                  {
                    icon: "🔍",
                    title: "Transparency Cues",
                    subtitle: "AI confidence levels displayed",
                    desc: "Surface calibrated uncertainty. Show when the model is guessing vs. confident. Diverge from the 'always confident' default.",
                    color: "border-violet-200 dark:border-violet-800",
                  },
                  {
                    icon: "💬",
                    title: "Cognitive Prompts",
                    subtitle: "Strategic questioning triggers",
                    desc: "Embed prompts that ask the user to generate one counter-argument before finalizing. Activate System 2 deliberately.",
                    color: "border-orange-200 dark:border-orange-800",
                  },
                  {
                    icon: "⚡",
                    title: "Effort Calibration",
                    subtitle: "Adjustable automation levels",
                    desc: "Let users dial automation up or down per task. High-stakes decisions default to higher human involvement.",
                    color: "border-yellow-200 dark:border-yellow-800",
                  },
                  {
                    icon: "🔄",
                    title: "Feedback Loops",
                    subtitle: "Immediate accuracy feedback",
                    desc: "Show outcome data after AI-assisted decisions. Calibrate the user's trust over time based on actual track record.",
                    color: "border-green-200 dark:border-green-800",
                  },
                  {
                    icon: "🧠",
                    title: "Metacognitive Training",
                    subtitle: "Know when to trust AI",
                    desc: "Train users to recognize the System 3 Trap by category: when is AI reliable vs. when must System 2 lead?",
                    color: "border-red-200 dark:border-red-800",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-xl border p-4 space-y-2 ${item.color}`}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {item.subtitle}
                    </p>
                    <p className="text-lg text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Manifesto */}
          <div className={conceptSurfaceSoft("p-6 rounded-xl space-y-4")}>
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-violet-500 shrink-0 mt-1" />
              <div className="space-y-2">
                <h4 className="font-bold text-lg">The Architect's Imperative</h4>
                <blockquote className="text-lg leading-relaxed text-muted-foreground border-l-4 border-violet-400 pl-4">
                  "The future of human intelligence depends on designing systems that prevent
                  cognitive surrender and preserve human agency."
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  — Shaw, S.D. &amp; Nave, G. (2025). <em>The Tri-System Paradigm</em>. SSRN pre-print, University of Pennsylvania — The Wharton School.
                </p>
              </div>
            </div>
          </div>

          {/* Practitioner checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-500" />
                Practitioner Checklist — Before You Ship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Does the UI surface AI confidence or uncertainty, not just the answer?",
                  "Is there at least one mandatory verification step for high-stakes outputs?",
                  "Can the user adjust the level of automation without developer intervention?",
                  "Does the system give outcome feedback so the user calibrates AI trust over time?",
                  "Is there training / onboarding content that explains when NOT to trust the AI?",
                  "Have you identified which decisions belong in the Automated Loop vs. Centaur Model?",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-lg">
                    <span className="w-5 h-5 rounded border border-muted-foreground/40 shrink-0 mt-0.5 flex items-center justify-center text-xs text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <ConceptLayout
      conceptId="tri-system-paradigm"
      title="The Tri-System Paradigm"
      description="Kahneman's dual-process theory extended to AI — understand cognitive surrender, epistemic dependence, and the centaur model of human-AI collaboration."
      tabs={tabs}
      estimatedTime="30–40 min"
      icon={<Brain className="w-6 h-6" />}
      nextConcept={{
        id: "agent-ethics",
        title: "Agent Ethics & Governance",
        description: "Embed guardrails that adapt across contexts without freezing innovation.",
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
