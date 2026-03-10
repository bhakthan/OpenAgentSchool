import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics/ga';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, GithubLogo, ArrowUpRight, Flask, Atom, Graph, Lightbulb, CheckCircle, Dna, Planet, Cpu, Brain, SolarPanel, YoutubeLogo, Sparkle, GoogleLogo, Factory, Robot, MagnifyingGlass, Database, TreeStructure, Eye, ShieldCheck, Plugs, Lightning, Gauge } from '@phosphor-icons/react';
import { HypothesisEvolutionDemo } from '@/components/science/HypothesisEvolutionDemo';
import { LiteratureSynthesisDemo } from '@/components/science/LiteratureSynthesisDemo';
import CodeBlock from '@/components/ui/CodeBlock';

export default function AgentsForScience() {
  const scienceSections = [
    { id: 'science-overview', label: 'Overview' },
    { id: 'science-framework', label: 'Framework' },
    { id: 'science-applications', label: 'Applications' },
    { id: 'science-demos', label: 'Demos' },
    { id: 'science-impact', label: 'Impact' },
    { id: 'science-factory', label: 'AI Factory' },
  ] as const;
  const [activeSection, setActiveSection] = useState<(typeof scienceSections)[number]['id']>('science-overview');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileEnergyExpanded, setMobileEnergyExpanded] = useState(false);
  const [mobileRealDataExpanded, setMobileRealDataExpanded] = useState(false);

  useEffect(() => {
    const elements = scienceSections
      .map(section => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id as (typeof scienceSections)[number]['id']);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.35, 0.5],
      }
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 900);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openExternal = (url: string, label: string) => {
    trackEvent({ action: 'outbound_click', category: 'agents_for_science', label });
    window.open(url, '_blank');
  };

  const scrollToSection = (sectionId: (typeof scienceSections)[number]['id']) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    setActiveSection(sectionId);
    trackEvent({ action: 'section_jump_click', category: 'agents_for_science', label: sectionId });
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${sectionId}`);
  };

  const scrollToTop = () => {
    trackEvent({ action: 'back_to_top_click', category: 'agents_for_science', label: activeSection });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSampleCta = (domainId: string) => (
    <Button asChild variant="outline" size="sm" className="w-full">
      <Link to={`/agents-for-science/sample/${domainId}`} className="flex items-center justify-center gap-2">
        Try Starter Sample
        <ArrowRight size={14} />
      </Link>
    </Button>
  );

  return (
    <div className="flat-ui-2-theme agents-for-science-flat-ui container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Flask size={48} weight="duotone" className="text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Agents for Science
          </h1>
        </div>
        <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
          Accelerate scientific discovery through multi-agent AI systems that combine iterative hypothesis exploration, 
          automated literature synthesis, and combinatorial reasoning.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          <div className="agents-for-science-stat rounded-xl border border-blue-200/70 bg-blue-50/80 dark:border-blue-800 dark:bg-blue-950/30 p-4">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">4</div>
            <div className="text-sm font-semibold">Research loops</div>
            <div className="text-xs text-muted-foreground">AlphaEvolve, Deep Research, Workflow, AutoResearch</div>
          </div>
          <div className="agents-for-science-stat rounded-xl border border-purple-200/70 bg-purple-50/80 dark:border-purple-800 dark:bg-purple-950/30 p-4">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">9</div>
            <div className="text-sm font-semibold">Science domains</div>
            <div className="text-xs text-muted-foreground">From materials and medicine to robotics and energy</div>
          </div>
          <div className="agents-for-science-stat rounded-xl border border-emerald-200/70 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/30 p-4">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">2</div>
            <div className="text-sm font-semibold">Interactive demos</div>
            <div className="text-xs text-muted-foreground">See hypothesis evolution and literature synthesis in motion</div>
          </div>
          <div className="agents-for-science-stat rounded-xl border border-amber-200/70 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-950/30 p-4">
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">24/7</div>
            <div className="text-sm font-semibold">Autonomous iteration</div>
            <div className="text-xs text-muted-foreground">Compound progress through always-on research loops</div>
          </div>
        </div>
        <div className="agents-for-science-quicknav sticky top-3 z-20 mb-6 -mx-1 overflow-x-auto px-1 pb-2 pt-1">
          <div className="flex min-w-max gap-2 rounded-2xl border border-border/60 bg-background/80 p-2 shadow-sm backdrop-blur">
            {scienceSections.map(section => (
              <button
                type="button"
                key={section.id}
                aria-current={activeSection === section.id ? 'true' : undefined}
                aria-label={`Jump to ${section.label}`}
                onClick={() => scrollToSection(section.id)}
                className={`agents-for-science-quicklink ${activeSection === section.id ? 'is-active' : ''}`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => openExternal('https://arxiv.org/pdf/2510.06056', 'arxiv_paper')}
            className="flex items-center gap-2"
          >
            <Atom size={20} weight="duotone" />
            Read DeepEvolve Paper
            <ArrowUpRight size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => openExternal('https://github.com/liugangcode/deepevolve', 'deepevolve_github')}
            className="flex items-center gap-2"
          >
            <GithubLogo size={20} />
            View GitHub Repo
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      <Card id="science-overview" className="agents-for-science-section agents-for-science-reveal agents-for-science-reveal-1 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb size={24} weight="duotone" className="text-yellow-500" />
            Why Agents for Science?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Scientific discovery traditionally follows a linear path: hypothesis → experiment → analysis → publication. 
            This process can take years, with researchers manually reviewing thousands of papers, designing experiments, 
            and iterating through trial and error.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Agentic AI systems</strong> transform this workflow by automating hypothesis generation, 
            literature synthesis, and combinatorial exploration. The <strong className="text-foreground">DeepEvolve framework</strong> demonstrates 
            how multi-agent coordination can compress years of research into weeks or days.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle size={20} className="text-blue-600 dark:text-blue-400" weight="fill" />
                10x Faster Discovery
              </h4>
              <p className="text-sm text-muted-foreground">
                Automate literature review and hypothesis generation to accelerate research timelines
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle size={20} className="text-purple-600 dark:text-purple-400" weight="fill" />
                Combinatorial Exploration
              </h4>
              <p className="text-sm text-muted-foreground">
                Explore exponentially more hypothesis combinations than human researchers
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" weight="fill" />
                Evidence-Grounded
              </h4>
              <p className="text-sm text-muted-foreground">
                Every hypothesis backed by synthesized literature and citation networks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DeepEvolve Framework */}
      <div id="science-framework" className="agents-for-science-section agents-for-science-reveal agents-for-science-reveal-2 mb-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Graph size={32} weight="duotone" className="text-primary" />
          The DeepEvolve Framework
        </h2>
        <p className="text-muted-foreground mb-6 text-lg">
          DeepEvolve combines two powerful agentic paradigms to create a self-improving scientific discovery engine:
        </p>

        <Tabs defaultValue="alphaevolve" className="agents-for-science-framework-tabs w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-xl border border-border/70 bg-background/80 p-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="alphaevolve">AlphaEvolve</TabsTrigger>
            <TabsTrigger value="deepresearch">Deep Research</TabsTrigger>
            <TabsTrigger value="workflow">Combined Workflow</TabsTrigger>
            <TabsTrigger value="autoresearch" className="flex items-center gap-1"><Robot size={14} /> AutoResearch</TabsTrigger>
          </TabsList>

          {/* AlphaEvolve Tab */}
          <TabsContent value="alphaevolve" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AlphaEvolve: Iterative Hypothesis Exploration</CardTitle>
                <CardDescription>
                  Inspired by evolutionary algorithms and reinforcement learning, AlphaEvolve generates, 
                  evaluates, and refines scientific hypotheses through multi-round exploration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Core Components</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">LLM-Driven Generation</h5>
                        <p className="text-sm text-muted-foreground">
                          Large language models generate novel hypotheses based on existing knowledge, 
                          patterns in scientific literature, and domain-specific constraints.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Evolutionary Selection</h5>
                        <p className="text-sm text-muted-foreground">
                          Hypotheses are scored based on novelty, feasibility, and predicted impact. 
                          Top candidates are selected for further refinement and exploration.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Iterative Refinement</h5>
                        <p className="text-sm text-muted-foreground">
                          Selected hypotheses spawn variations through mutation and crossover operations, 
                          creating a diverse pool of candidates across multiple generations.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 dark:bg-orange-500 text-white flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Validation Framework</h5>
                        <p className="text-sm text-muted-foreground">
                          Each hypothesis is validated against experimental feasibility, theoretical soundness, 
                          and alignment with known scientific principles before advancement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Insight</h4>
                  <p className="text-sm text-muted-foreground">
                    AlphaEvolve treats hypothesis generation as an optimization problem, using evolutionary 
                    pressure to converge on high-quality, testable predictions that human researchers might 
                    overlook in traditional linear exploration.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deep Research Tab */}
          <TabsContent value="deepresearch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deep Research: Automated Literature Synthesis</CardTitle>
                <CardDescription>
                  A multi-agent system that mimics expert human researchers by retrieving, analyzing, 
                  and synthesizing thousands of scientific papers into coherent knowledge graphs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Agent Roles</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Graph size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold mb-1">Retriever Agent</h5>
                        <p className="text-sm text-muted-foreground">
                          Queries scientific databases (arXiv, PubMed, Semantic Scholar) to find relevant papers 
                          based on semantic similarity, citation networks, and topic clustering.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Flask size={24} className="text-purple-600 dark:text-purple-400" weight="duotone" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold mb-1">Analyzer Agent</h5>
                        <p className="text-sm text-muted-foreground">
                          Extracts key findings, methodologies, and limitations from papers. Identifies 
                          contradictions, gaps, and opportunities for novel contributions.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Atom size={24} className="text-green-600 dark:text-green-400" weight="duotone" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold mb-1">Synthesizer Agent</h5>
                        <p className="text-sm text-muted-foreground">
                          Combines insights from multiple papers into unified knowledge representations, 
                          creating evidence chains that support or refute hypotheses.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <CheckCircle size={24} className="text-orange-600 dark:text-orange-400" weight="duotone" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold mb-1">Critic Agent</h5>
                        <p className="text-sm text-muted-foreground">
                          Evaluates synthesis quality, identifies missing context, and prompts additional 
                          retrieval rounds to ensure comprehensive coverage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Automation Advantage</h4>
                  <p className="text-sm text-muted-foreground">
                    While a human researcher might review 50-100 papers per month, Deep Research agents 
                    can process <strong>thousands of papers per day</strong>, creating comprehensive 
                    literature maps that reveal hidden patterns and cross-domain connections.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Combined Workflow Tab */}
          <TabsContent value="workflow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Combinatorial Discovery Workflow</CardTitle>
                <CardDescription>
                  DeepEvolve orchestrates AlphaEvolve and Deep Research in a feedback loop, 
                  where each component amplifies the other's strengths.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-blue-500">Phase 1:</span> Initial Hypothesis Generation
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      AlphaEvolve generates a diverse population of hypotheses based on research questions 
                      and domain knowledge. Each hypothesis includes predicted outcomes and testable claims.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight size={32} className="text-muted-foreground" weight="bold" />
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-purple-500">Phase 2:</span> Literature Grounding
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Deep Research retrieves and synthesizes relevant papers for each hypothesis, 
                      creating evidence chains that validate, refute, or refine the initial claims.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight size={32} className="text-muted-foreground" weight="bold" />
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-green-500">Phase 3:</span> Evolutionary Selection
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Hypotheses are ranked by evidence strength, novelty score, and feasibility. 
                      Top candidates advance while weak ones are pruned or mutated.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight size={32} className="text-muted-foreground" weight="bold" />
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4 py-2">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-orange-500">Phase 4:</span> Refinement & Iteration
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Selected hypotheses spawn variations through crossover and mutation. The cycle 
                      repeats, with each generation producing more refined, evidence-backed predictions.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight size={32} className="text-muted-foreground" weight="bold" />
                  </div>

                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-red-500">Phase 5:</span> Experimental Validation
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Final hypotheses are formatted as experimental protocols with predicted outcomes, 
                      methodologies, and success criteria—ready for lab testing or computational validation.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold mb-3 text-lg">The Combinatorial Advantage</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    By iterating through multiple generations and exploring exponentially more combinations 
                    than human researchers, DeepEvolve can discover non-obvious connections between domains, 
                    identify overlooked experimental parameters, and propose breakthrough hypotheses that 
                    might never emerge from traditional linear research workflows.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" weight="fill" />
                      <span><strong>Cross-Domain Transfer:</strong> Identifies methods from one field applicable to another</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" weight="fill" />
                      <span><strong>Gap Detection:</strong> Surfaces research questions no one has asked yet</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" weight="fill" />
                      <span><strong>Contradiction Resolution:</strong> Reconciles conflicting findings across papers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" weight="fill" />
                      <span><strong>Parameter Optimization:</strong> Suggests novel experimental configurations</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AutoResearch Tab */}
          <TabsContent value="autoresearch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Robot size={24} weight="duotone" className="text-amber-600 dark:text-amber-400" />
                  AutoResearch: Autonomous Overnight Discovery
                </CardTitle>
                <CardDescription>
                  Based on Andrej Karpathy's <strong>autoresearch</strong> project — turn empirical trial-and-error 
                  into a fully automated software loop orchestrated by an AI agent. AutoResearch increases 
                  research velocity and makes compound research progress a reality.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hero image */}
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src="/images/autonomous_overnight_lab.webp"
                    alt="AutoResearch concept — an AI agent autonomously iterating on code experiments overnight"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>

                {/* Core Idea */}
                <div>
                  <h4 className="font-semibold mb-3 text-lg">The Core Idea</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Traditionally, machine learning research involves a human scientist tweaking code, running an 
                    experiment, evaluating the result, and repeating. <strong className="text-foreground">AutoResearch 
                    automates this entire loop.</strong>
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The human no longer writes the training code. Instead, the human acts as a 
                    <strong className="text-foreground">"director"</strong> by writing a high-level instruction file 
                    (<code className="text-sm bg-muted px-1.5 py-0.5 rounded">program.md</code>). An AI Agent reads 
                    these instructions, modifies the actual Python training script, runs the training loop for a fixed 
                    time constraint (e.g. 5 minutes), evaluates the output against a strict metric (like validation 
                    loss), and decides whether to <em>git commit</em> the change or discard it.
                  </p>
                </div>

                {/* Visual Flow */}
                <div>
                  <h4 className="font-semibold mb-3 text-lg">The Autonomous Loop</h4>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 dark:bg-amber-500 text-white flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h5 className="font-semibold mb-1">Human Writes Instructions</h5>
                        <p className="text-sm text-muted-foreground">
                          The "director" writes plain-text instructions in <code className="text-xs bg-muted px-1 py-0.5 rounded">program.md</code> — 
                          defining the research question, constraints, and evaluation metric.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h5 className="font-semibold mb-1">AI Agent Edits Logic &amp; Code</h5>
                        <p className="text-sm text-muted-foreground">
                          The agent reads current code and instructions, then proposes modifications — 
                          new architectures, hyperparameters, data processing logic, or algorithmic strategies.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h5 className="font-semibold mb-1">Run Simulation / Training</h5>
                        <p className="text-sm text-muted-foreground">
                          Each experiment runs under a fixed time constraint (e.g. 5 minutes). This budget 
                          forces the agent to find efficient strategies rather than brute-force scaling.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h5 className="font-semibold mb-1">Evaluate &amp; Commit or Revert</h5>
                        <p className="text-sm text-muted-foreground">
                          The objective metric (e.g. validation loss) is checked. If it improved, the change 
                          is committed to the baseline. If not, it's discarded. Then the loop repeats.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overnight Shift */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                    <Lightning size={20} className="text-amber-600 dark:text-amber-400" weight="fill" />
                    The "Overnight" Shift
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Karpathy noted that he now "sleeps with his laptop next to his bed" as the terminal logs 
                    hundreds of experiments while he rests. Running 5-minute experiments over 8 hours yields 
                    <strong className="text-foreground">~100 iterations on a single GPU</strong> by morning.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The code organically evolves into something highly complex and optimized — often discovering 
                    tweaks a human wouldn't have the patience to try. The human's job shifts from 
                    <em>doing the research</em> to <strong className="text-foreground">designing the arena</strong>.
                  </p>
                </div>

                {/* Three Requirements */}
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Why This Works Across Domains</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    This framework proves that empirical iteration can be decoupled from human effort 
                    as long as three things exist:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h5 className="font-semibold mb-2 flex items-center gap-2">
                        <Cpu size={18} className="text-blue-600 dark:text-blue-400" />
                        Programmable Environment
                      </h5>
                      <p className="text-xs text-muted-foreground">A simulator or script that can run experiments automatically.</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h5 className="font-semibold mb-2 flex items-center gap-2">
                        <Robot size={18} className="text-purple-600 dark:text-purple-400" />
                        AI That Modifies Inputs
                      </h5>
                      <p className="text-xs text-muted-foreground">An AI capable of modifying parameters, code, or logical inputs.</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <h5 className="font-semibold mb-2 flex items-center gap-2">
                        <Gauge size={18} className="text-green-600 dark:text-green-400" />
                        Objective Metric
                      </h5>
                      <p className="text-xs text-muted-foreground">A mathematically objective evaluation metric to judge success.</p>
                    </div>
                  </div>
                </div>

                {/* ── End-to-End Energy Domain Example ── */}
                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold mb-2 text-xl flex items-center gap-2">
                    <SolarPanel size={24} className="text-green-600 dark:text-green-400" weight="duotone" />
                    End-to-End Example: Algorithmic Energy Dispatch
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Utility-scale battery operators need algorithms to decide exactly when to charge batteries 
                    (when power is cheap or renewable) and when to discharge (when demand and prices are high), 
                    all while minimizing battery degradation. Here is the complete setup to bring the AutoResearch 
                    paradigm to this domain.
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    Place three files in a single directory. The AI agent reads{' '}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">program.md</code>, modifies{' '}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">dispatch_logic.py</code>, and runs{' '}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">simulate_grid.py</code> to evaluate
                    whether its code changes should be kept or discarded.
                  </p>
                  <div className="mb-4 md:hidden">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setMobileEnergyExpanded(prev => !prev)}
                      className="w-full justify-between"
                    >
                      {mobileEnergyExpanded ? 'Hide full setup' : 'Show full setup'}
                      <ArrowRight size={14} className={`${mobileEnergyExpanded ? '-rotate-90' : 'rotate-90'} transition-transform`} />
                    </Button>
                  </div>
                </div>

                <div className={`${mobileEnergyExpanded ? 'block' : 'hidden'} md:block space-y-6`}>

                {/* FILE 1 — simulate_grid.py */}
                <div>
                  <h4 className="font-semibold mb-2 text-lg flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">File 1</Badge>
                    simulate_grid.py — The Immutable Arena
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This is the simulator. The AI is <strong className="text-foreground">not allowed to edit this file</strong>.
                    It mocks one year of grid operation — fetching prices, calling the dispatch logic, and 
                    calculating the final financial score.
                  </p>
                  <CodeBlock language="python" showLineNumbers>{`import math
from dispatch_logic import decide_action

# --- SYSTEM CONSTANTS ---
BATTERY_CAPACITY_MWH = 100.0
MAX_RATE_MW = 25.0
CHARGE_EFFICIENCY = 0.90        # 10% energy loss when charging
DEGRADATION_COST_PER_MWH = 15.0 # Battery wear-and-tear cost per MWh discharged
HOURS_IN_YEAR = 8760

def get_mock_environment(hour_of_year):
    """Diurnal cycle: prices lowest at 3 AM (~$20), highest at 3 PM (~$100).
    Solar forecast peaks at noon."""
    hour_of_day = hour_of_year % 24
    price = 60 - 40 * math.cos((hour_of_day - 3) * math.pi / 12)
    solar_forecast = max(0, 100 * math.cos((hour_of_day - 12) * math.pi / 12))
    return price, solar_forecast

def run_simulation():
    state_of_charge = 0.0
    total_revenue = 0.0
    total_cost = 0.0
    total_degradation = 0.0

    for hour in range(HOURS_IN_YEAR):
        hour_of_day = hour % 24
        price, forecast = get_mock_environment(hour)

        # --- THE AI'S LOGIC IS CALLED HERE ---
        action_mw = decide_action(
            hour_of_day, price, forecast,
            state_of_charge, BATTERY_CAPACITY_MWH, MAX_RATE_MW
        )

        # Enforce physical battery constraints
        if action_mw > 0:   # Charging
            actual_charge = min(action_mw, MAX_RATE_MW)
            actual_charge = min(actual_charge, BATTERY_CAPACITY_MWH - state_of_charge)
            state_of_charge += actual_charge * CHARGE_EFFICIENCY
            total_cost += actual_charge * price
        elif action_mw < 0:  # Discharging
            actual_discharge = min(abs(action_mw), MAX_RATE_MW)
            actual_discharge = min(actual_discharge, state_of_charge)
            state_of_charge -= actual_discharge
            total_revenue += actual_discharge * price
            total_degradation += actual_discharge * DEGRADATION_COST_PER_MWH

    net_profit = (total_revenue - total_cost) - total_degradation
    return net_profit

if __name__ == "__main__":
    net_profit = run_simulation()
    # AutoResearch agent uses regex to find this string to log the score
    print(f"EVAL_SCORE: {net_profit:.2f}")`}</CodeBlock>
                </div>

                {/* FILE 2 — dispatch_logic.py */}
                <div>
                  <h4 className="font-semibold mb-2 text-lg flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">File 2</Badge>
                    dispatch_logic.py — The Baseline (Experiment 1)
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This is the file the AI rewrites over and over. The baseline is a "dumb" strategy: 
                    blindly buy energy between midnight and 4 AM, blindly sell between noon and 4 PM.
                  </p>
                  <CodeBlock language="python" showLineNumbers>{`def decide_action(hour, price, solar_forecast,
                  state_of_charge, max_capacity, max_rate):
    """Returns MW to charge (+), discharge (-), or idle (0)."""

    # BASELINE LOGIC:
    # Charge at night (hours 0-4) when prices are generally low.
    if 0 <= hour <= 4:
        available_space = max_capacity - state_of_charge
        return min(max_rate, available_space)

    # Discharge in the afternoon (hours 12-16) when prices are generally high.
    elif 12 <= hour <= 16:
        return -min(max_rate, state_of_charge)

    # Do nothing otherwise
    else:
        return 0`}</CodeBlock>
                </div>

                {/* FILE 3 — program.md */}
                <div>
                  <h4 className="font-semibold mb-2 text-lg flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">File 3</Badge>
                    program.md — The Prompt / Instructions
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This file is passed into the AutoResearch system to give the agent its bounds and goals.
                  </p>
                  <CodeBlock language="markdown">{`# Role
You are an expert quantitative researcher in energy markets and battery storage.

# Goal
Maximize the \`EVAL_SCORE\` output by the simulator. The score represents
Net Annual Profit (Total Revenue - Grid Cost - Battery Degradation Costs).
We want this number to be as high as possible.

# Instructions
1. You may ONLY modify the \`dispatch_logic.py\` file.
2. You can use advanced mathematical heuristics, moving averages, or complex
   conditional thresholds based on the \`price\` and \`solar_forecast\` parameters.
3. Keep in mind the physical constraints: the battery degrades at $15 per MWh
   discharged, and charging only has a 90% efficiency rate. Do not trade if
   the price spread doesn't cover the degradation and efficiency losses!
4. Do not attempt to read or write to local files; all logic must be contained
   within the \`decide_action\` function.
5. To run the test, execute \`python simulate_grid.py\`. If the EVAL_SCORE
   improves, commit your changes.`}</CodeBlock>
                </div>

                {/* Baseline Evaluation */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                    <Gauge size={20} className="text-green-600 dark:text-green-400" />
                    Baseline Evaluation: The Starting Number
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Running the baseline <code className="text-xs bg-muted px-1 py-0.5 rounded">dispatch_logic.py</code> produces:
                  </p>
                  <div className="bg-background/80 rounded-lg p-4 mb-4 font-mono text-center text-lg font-bold">
                    EVAL_SCORE: 1,926,798.50
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="p-3 bg-background/60 rounded-lg">
                      <p className="font-semibold text-red-600 dark:text-red-400 mb-1">Grid Costs</p>
                      <p className="text-xs text-muted-foreground">
                        ~100 MWh bought nightly at avg ~$26.74/MWh
                      </p>
                      <p className="font-semibold mt-1">−$2,674/day</p>
                    </div>
                    <div className="p-3 bg-background/60 rounded-lg">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Revenue</p>
                      <p className="text-xs text-muted-foreground">
                        ~99 MWh sold (90% efficiency) at avg ~$95.33/MWh
                      </p>
                      <p className="font-semibold mt-1">+$9,438/day</p>
                    </div>
                    <div className="p-3 bg-background/60 rounded-lg">
                      <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Degradation</p>
                      <p className="text-xs text-muted-foreground">
                        99 MWh discharged × $15 wear penalty
                      </p>
                      <p className="font-semibold mt-1">−$1,485/day</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Daily net = $9,438 − $2,674 − $1,485 = <strong className="text-foreground">$5,279/day</strong>{' '}
                    × 365 = <strong className="text-foreground">$1,926,798/year</strong>
                  </p>
                </div>

                {/* Overnight Evolution */}
                <div>
                  <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                    <Lightning size={20} className="text-amber-600 dark:text-amber-400" weight="fill" />
                    What Happens Overnight
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    When the AutoResearch loop takes over and runs for 8 hours, the dispatch code 
                    evolves through dozens of iterations:
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-amber-500 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">Attempt 1</Badge>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">$1.93M → $2.10M</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        The AI realizes buying at exactly 3:00 AM (cosine wave minimum at $20/MWh) beats 
                        buying at midnight ($31/MWh). It writes logic to only charge if price &lt; $22. Score jumps.
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">Attempt 15</Badge>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">$2.10M → $2.45M</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        The AI discovers that selling at noon is a mistake — the price doesn't actually peak 
                        until 3:00 PM (hour 15). It refines the discharge window.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">Attempt 80</Badge>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">$2.45M → $2.85M</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        By morning, the AI has written a precise algorithmic formula that calculates the exact 
                        margin spread required between price and degradation cost before acting — yielding a 
                        theoretically optimal profit of <strong>$2,850,000</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg mt-4">
                    <p className="text-sm text-muted-foreground">
                      You wake up, and without having written a single line of algorithmic trading code 
                      yourself, you have a highly optimized energy dispatch script ready for production.
                    </p>
                  </div>
                </div>
                </div>

                {/* ── Real Data Upgrade ── */}
                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold mb-2 text-xl flex items-center gap-2">
                    <Database size={24} className="text-blue-600 dark:text-blue-400" />
                    Level Up: From Mock Data to Real-World Chaos
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    The cosine-wave simulator above is perfect for a tutorial, but if you leave AutoResearch 
                    running on it overnight the AI will fall into the <strong className="text-foreground">"Overfitting Trap"</strong> — 
                    it will just memorize the mathematical formula rather than learn a genuine trading strategy.
                    To stem this problem and build something production-ready, you must feed the simulator 
                    real-world, chaotic historical data instead of mock data.
                  </p>
                  <div className="md:hidden">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setMobileRealDataExpanded(prev => !prev)}
                      className="w-full justify-between"
                    >
                      {mobileRealDataExpanded ? 'Hide real-data details' : 'Show real-data details'}
                      <ArrowRight size={14} className={`${mobileRealDataExpanded ? '-rotate-90' : 'rotate-90'} transition-transform`} />
                    </Button>
                  </div>
                </div>

                <div className={`${mobileRealDataExpanded ? 'block' : 'hidden'} md:block space-y-6`}>

                {/* Why Real Data */}
                <div>
                  <h5 className="font-semibold mb-3 text-base">Why Real Data Is Mandatory</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Real energy markets are messy. Wholesale LMPs (ERCOT, CAISO) feature:
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h6 className="font-semibold text-sm mb-1 flex items-center gap-1">
                        <SolarPanel size={16} className="text-orange-600 dark:text-orange-400" />
                        The Duck Curve
                      </h6>
                      <p className="text-xs text-muted-foreground">
                        Solar drops off at 6 PM, causing massive, sudden price spikes that a cosine can't model.
                      </p>
                    </div>
                    <div className="p-3 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800">
                      <h6 className="font-semibold text-sm mb-1 flex items-center gap-1">
                        <Lightning size={16} className="text-cyan-600 dark:text-cyan-400" weight="fill" />
                        Negative Pricing
                      </h6>
                      <p className="text-xs text-muted-foreground">
                        Excess wind can push prices below zero — the grid will <em>pay</em> your battery to charge.
                      </p>
                    </div>
                    <div className="p-3 bg-violet-50 dark:bg-violet-950/30 rounded-lg border border-violet-200 dark:border-violet-800">
                      <h6 className="font-semibold text-sm mb-1 flex items-center gap-1">
                        <Sparkle size={16} className="text-violet-600 dark:text-violet-400" />
                        Weather Anomalies
                      </h6>
                      <p className="text-xs text-muted-foreground">
                        A random Tuesday with heavy cloud cover can destroy solar and spike midday prices.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Train/Test Split */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 p-5 rounded-lg border border-red-200 dark:border-red-800">
                  <h5 className="font-semibold mb-2 text-base flex items-center gap-2">
                    <ShieldCheck size={18} className="text-red-600 dark:text-red-400" />
                    The Golden Rule: Train / Holdout Split
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    If you give the AI 2023 data to test itself on, it might cheat:{' '}
                    <em className="text-muted-foreground">"If date == Aug 12 2023, buy exactly 100 MW."</em>{' '}
                    It memorizes the past instead of learning a strategy.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    <div className="p-3 bg-background/60 rounded-lg">
                      <p className="font-semibold text-sm mb-1">Training Set (2021–2023)</p>
                      <p className="text-xs text-muted-foreground">
                        The AI evaluates its runs against this data during the overnight loop.
                      </p>
                    </div>
                    <div className="p-3 bg-background/60 rounded-lg">
                      <p className="font-semibold text-sm mb-1">Holdout Validation (2024)</p>
                      <p className="text-xs text-muted-foreground">
                        The AI never sees this. You run it the next morning to prove the strategy generalizes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Real-data simulator */}
                <div>
                  <h5 className="font-semibold mb-2 text-base">How the Simulator Changes for Real Data</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Instead of generating math, the simulator loads a massive CSV and streams real rows 
                    to the AI. Here is how the top of your real-data simulator looks:
                  </p>
                  <CodeBlock language="python" showLineNumbers>{`import pandas as pd
from dispatch_logic import decide_action

# Load real ERCOT or CAISO wholesale node data + local weather forecasts
# Columns: ['timestamp','lmp_price','solar_forecast_mw','wind_forecast_mw','temp']
historical_data = pd.read_csv("caiso_node_2023_actuals.csv")
historical_data['timestamp'] = pd.to_datetime(historical_data['timestamp'])

def run_simulation():
    state_of_charge = 0.0
    total_revenue = 0.0
    total_cost = 0.0
    total_degradation = 0.0

    # Iterate through real historical hours instead of a math loop
    for _, row in historical_data.iterrows():
        hour_of_day = row['timestamp'].hour
        real_price  = row['lmp_price']
        real_solar  = row['solar_forecast_mw']

        # --- The AI decides based on REAL chaos ---
        action_mw = decide_action(
            hour_of_day, real_price, real_solar,
            state_of_charge, BATTERY_CAPACITY_MWH, MAX_RATE_MW
        )

        # ... (Battery physics constraints remain exactly the same) ...`}</CodeBlock>
                </div>

                {/* Updated program.md */}
                <div>
                  <h5 className="font-semibold mb-2 text-base">How the Instructions Change</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Because you're using real data, update <code className="text-xs bg-muted px-1 py-0.5 rounded">program.md</code> to 
                    handle real-world volatility:
                  </p>
                  <CodeBlock language="markdown">{`You are an expert quantitative energy researcher designing a battery
dispatch algorithm for the CAISO grid. The simulator will feed you
historical LMP prices and day-ahead solar forecasts.

Beware of negative pricing events and the evening "duck curve" ramp.
Implement logic that calculates a rolling average of the past 24 hours
of prices to determine if the current price is a "spike" worth
discharging for, or just normal volatility.

Maximize the EVAL_SCORE (Net Annual Profit).`}</CodeBlock>
                </div>

                {/* Key Insight */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold mb-2">Key Insight</h4>
                  <p className="text-sm text-muted-foreground">
                    By downloading a few years of wholesale pricing data from a grid operator (usually public 
                    and free via their API), formatting it into a CSV, and hooking it into the AutoResearch 
                    loop, you are essentially mimicking the core R&amp;D pipeline of a multi-million dollar 
                    energy storage company — on your laptop, overnight.
                  </p>
                </div>
                </div>

                {/* GitHub Link */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => openExternal('https://github.com/karpathy/autoresearch', 'autoresearch_github')}
                    className="flex items-center gap-2"
                  >
                    <GithubLogo size={18} />
                    karpathy/autoresearch
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Use Cases */}
      <div id="science-applications" className="agents-for-science-section agents-for-science-reveal agents-for-science-reveal-3 mb-8">
        <h2 className="text-3xl font-bold mb-6">Real-World Applications Across Scientific Domains</h2>
        <p className="text-muted-foreground mb-6">
          From materials science to neuroscience, AI agents are accelerating discovery by synthesizing 
          knowledge, generating hypotheses, and uncovering patterns across millions of research papers.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom size={24} weight="duotone" className="text-blue-600 dark:text-blue-400" />
                Materials Discovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                DeepEvolve accelerates the search for novel materials with specific properties 
                (superconductors, catalysts, battery materials) by exploring chemical composition 
                spaces that would take decades to test manually.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Generating hypotheses for high-temperature superconductors by combining insights 
                  from crystallography, quantum physics, and recent experimental results across 50,000+ papers.
                </p>
              </div>
              {renderSampleCta('materials-discovery')}
            </CardContent>
          </Card>

          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flask size={24} weight="duotone" className="text-purple-600 dark:text-purple-400" />
                Drug Discovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                Multi-agent systems identify drug candidates by analyzing molecular structures, 
                protein interactions, and clinical trial data—proposing novel compounds or repurposing 
                existing drugs for new indications.
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Discovering drug combinations for rare diseases by synthesizing pharmacokinetic data, 
                  genetic markers, and mechanism-of-action studies from fragmented literature.
                </p>
              </div>
              {renderSampleCta('drug-discovery')}
            </CardContent>
          </Card>

          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Graph size={24} weight="duotone" className="text-green-600 dark:text-green-400" />
                Climate Science
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                Agents explore climate intervention strategies by modeling complex interactions between 
                atmospheric chemistry, ocean currents, and ecosystem responses—identifying leverage points 
                for mitigation.
              </p>
              <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Proposing carbon capture methods by synthesizing bioengineering, materials science, 
                  and geochemistry research to identify scalable, cost-effective solutions.
                </p>
              </div>
              {renderSampleCta('climate-science')}
            </CardContent>
          </Card>

          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb size={24} weight="duotone" className="text-orange-600 dark:text-orange-400" />
                Protein Engineering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                Evolutionary algorithms generate novel protein sequences optimized for stability, function, 
                or industrial applications—guided by deep literature synthesis of structural biology and 
                biochemistry.
              </p>
              <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Designing enzymes for plastic degradation by exploring sequence-function relationships 
                  across microbiology, structural biology, and environmental science papers.
                </p>
              </div>
              {renderSampleCta('protein-engineering')}
            </CardContent>
          </Card>

          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna size={24} weight="duotone" className="text-pink-600 dark:text-pink-400" />
                Genomics & Gene Editing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                AI agents analyze genomic sequences, identify therapeutic targets, and optimize CRISPR editing 
                strategies by synthesizing genetic data, clinical outcomes, and molecular biology research.
              </p>
              <div className="bg-pink-50 dark:bg-pink-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Predicting off-target effects in gene therapy by analyzing 100,000+ sequencing studies, 
                  CRISPR efficiency data, and cellular pathway interactions.
                </p>
              </div>
              {renderSampleCta('genomics-gene-editing')}
            </CardContent>
          </Card>

          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Planet size={24} weight="duotone" className="text-indigo-600 dark:text-indigo-400" />
                Astronomy & Cosmology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                Multi-agent systems process telescope data, generate cosmological models, and discover 
                exoplanets by combining observations, simulations, and theoretical physics literature.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Identifying biosignature candidates on exoplanets by synthesizing atmospheric chemistry, 
                  spectroscopy data, and astrobiology research from 20,000+ publications.
                </p>
              </div>
              {renderSampleCta('astronomy-cosmology')}
            </CardContent>
          </Card>

          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu size={24} weight="duotone" className="text-cyan-600 dark:text-cyan-400" />
                Quantum Computing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                Agents accelerate quantum algorithm development, error correction strategies, and hardware 
                optimization by exploring quantum information theory and experimental physics literature.
              </p>
              <div className="bg-cyan-50 dark:bg-cyan-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Developing novel quantum error correction codes by combining insights from topological 
                  quantum computing, surface codes, and recent experimental implementations.
                </p>
              </div>
              {renderSampleCta('quantum-computing')}
            </CardContent>
          </Card>

          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain size={24} weight="duotone" className="text-violet-600 dark:text-violet-400" />
                Neuroscience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                AI systems map neural circuits, model brain function, and identify disease biomarkers by 
                synthesizing neuroimaging data, electrophysiology studies, and cognitive science research.
              </p>
              <div className="bg-violet-50 dark:bg-violet-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Discovering Alzheimer's biomarker combinations by analyzing fMRI, PET scans, genetic data, 
                  and cognitive assessments across longitudinal studies.
                </p>
              </div>
              {renderSampleCta('neuroscience')}
            </CardContent>
          </Card>

          <Card className="agents-for-science-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SolarPanel size={24} weight="duotone" className="text-yellow-600 dark:text-yellow-400" />
                Renewable Energy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm use-case-description">
                Agents optimize solar cell materials, battery chemistry, and energy grid management by 
                combining materials science, electrical engineering, and sustainability research.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg text-sm">
                <strong className="example-box-label">Example:</strong>
                <p className="example-box-text mt-1">
                  Designing perovskite solar cells with 30%+ efficiency by exploring dopant combinations, 
                  stability enhancements, and manufacturing scalability across 15,000+ materials papers.
                </p>
              </div>
              {renderSampleCta('renewable-energy')}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive Demos */}
      <div id="science-demos" className="agents-for-science-section space-y-8 mb-8">
        {/* Hypothesis Evolution Demo */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Graph size={28} weight="duotone" className="text-blue-600 dark:text-blue-400" />
              Interactive Demo: Hypothesis Evolution
            </h2>
            <p className="text-muted-foreground">
              Watch how evolutionary algorithms generate and refine scientific hypotheses across generations, 
              selecting the most promising candidates based on experimental predictions and literature support.
            </p>
          </div>
          <HypothesisEvolutionDemo />
        </div>

        {/* Literature Synthesis Demo */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Graph size={28} weight="duotone" className="text-purple-600 dark:text-purple-400" />
              Interactive Demo: Multi-Agent Literature Synthesis
            </h2>
            <p className="text-muted-foreground">
              Experience a multi-agent system working together to retrieve, analyze, synthesize, and validate 
              research findings from thousands of scientific papers in seconds.
            </p>
          </div>
          <LiteratureSynthesisDemo />
        </div>
      </div>

      {/* Impact Metrics */}
      <div id="science-impact" className="agents-for-science-section mb-8">
        <h2 className="text-3xl font-bold mb-6">Measurable Impact on Scientific Discovery</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10x</div>
              <div className="text-sm font-semibold mb-1">Faster Discovery</div>
              <div className="text-xs text-muted-foreground">
                Materials discovery cycles reduced from 18 months to 3 weeks
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">100K+</div>
              <div className="text-sm font-semibold mb-1">Papers Analyzed</div>
              <div className="text-xs text-muted-foreground">
                Literature synthesis in 3 days vs 6 months manual review
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1,200+</div>
              <div className="text-sm font-semibold mb-1">Hypotheses Generated</div>
              <div className="text-xs text-muted-foreground">
                Evolutionary algorithms explore 8+ generations autonomously
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200 dark:border-orange-800">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">3+</div>
              <div className="text-sm font-semibold mb-1">Novel Drug Candidates</div>
              <div className="text-xs text-muted-foreground">
                AI-discovered compounds now in clinical trials
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          2026: THE RISE OF SCIENCE AI FACTORIES
          ═══════════════════════════════════════════════════════════ */}
      <div id="science-factory" className="agents-for-science-section mb-12 mt-16">
        <div className="flex items-center gap-3 mb-2">
          <Factory size={40} weight="duotone" className="text-amber-600 dark:text-amber-400" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-red-600 dark:from-amber-400 dark:to-red-400 bg-clip-text text-transparent">
            2026: The Rise of Science AI Factories
          </h2>
        </div>
        <p className="text-lg text-muted-foreground mb-8 max-w-4xl">
          We are witnessing a paradigm shift: research labs are transforming into <strong>AI factories</strong> — 
          multi-agent systems that mine, synthesize, and generate scientific data at scales no human team could match. 
          These factories don't just analyze existing data; they <em>create data that otherwise would not exist</em> — 
          revealing latent patterns hidden across physics, chemistry, biology, medicine, and robotics.
        </p>

        {/* What Is a Science AI Factory? */}
        <Card className="mb-8 border-2 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Factory size={22} weight="duotone" className="text-amber-600 dark:text-amber-400" />
              What Is a Science AI Factory?
            </CardTitle>
            <CardDescription>
              A continuously running, self-improving multi-agent pipeline that ingests raw experimental data, 
              cross-links domain knowledge, and produces novel hypotheses, simulations, and candidate materials 
              faster than any traditional research group.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 text-center">
                <Database size={32} weight="duotone" className="text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                <div className="font-bold text-sm mb-1">Ingest</div>
                <div className="text-xs text-muted-foreground">
                  Papers, patents, lab notebooks, sensor streams, simulation outputs
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                <MagnifyingGlass size={32} weight="duotone" className="text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="font-bold text-sm mb-1">Mine</div>
                <div className="text-xs text-muted-foreground">
                  Cross-domain pattern detection reveals hidden correlations across disciplines
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 text-center">
                <TreeStructure size={32} weight="duotone" className="text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <div className="font-bold text-sm mb-1">Synthesize</div>
                <div className="text-xs text-muted-foreground">
                  Multi-agent reasoning chains combine insights into testable hypotheses
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800 text-center">
                <Lightning size={32} weight="duotone" className="text-green-600 dark:text-green-400 mx-auto mb-2" />
                <div className="font-bold text-sm mb-1">Generate</div>
                <div className="text-xs text-muted-foreground">
                  Produce novel data — simulations, molecular designs, experiment plans — that never existed before
                </div>
              </div>
            </div>

            {/* Agent Architecture Callout */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Plugs size={18} className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-sm">Core Agent Patterns Powering These Factories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to="/concepts/multi-agent-systems">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40">Multi-Agent Systems</Badge>
                </Link>
                <Link to="/concepts/a2a-communication">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40">A2A Communication</Badge>
                </Link>
                <Link to="/concepts/agent-architecture">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40">Agent Architecture</Badge>
                </Link>
                <Link to="/concepts/agentic-workflow-control">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40">Workflow Orchestration</Badge>
                </Link>
                <Link to="/concepts/mcp">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40">MCP (Tool Calling)</Badge>
                </Link>
                <Link to="/concepts/agent-memory-systems">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40">Agent Memory</Badge>
                </Link>
              </div>
            </div>
            <div className="mt-4 max-w-xs">
              {renderSampleCta('science-ai-factory')}
            </div>
          </CardContent>
        </Card>

        {/* Cross-Domain Data Mining — The Invisible Becomes Visible */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Eye size={28} weight="duotone" className="text-cyan-600 dark:text-cyan-400" />
            Cross-Domain Data Mining: The Invisible Becomes Visible
          </h3>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            The breakthrough isn't speed alone — it's that AI factories detect <strong>cross-domain signals</strong> no 
            single-discipline team would ever look for. A protein folding anomaly might unlock a new catalyst; 
            a robotics control theorem might describe neural plasticity. These bridges create data that never existed.
          </p>

          <Tabs defaultValue="physics" className="mb-8">
            <TabsList className="flex flex-wrap h-auto gap-1">
              <TabsTrigger value="physics" className="flex items-center gap-1 text-xs"><Atom size={14} /> Physics</TabsTrigger>
              <TabsTrigger value="chemistry" className="flex items-center gap-1 text-xs"><Flask size={14} /> Chemistry</TabsTrigger>
              <TabsTrigger value="biology" className="flex items-center gap-1 text-xs"><Dna size={14} /> Biology</TabsTrigger>
              <TabsTrigger value="medicine" className="flex items-center gap-1 text-xs"><Sparkle size={14} /> Medicine</TabsTrigger>
              <TabsTrigger value="robotics" className="flex items-center gap-1 text-xs"><Robot size={14} /> Robotics</TabsTrigger>
            </TabsList>

            {/* --- PHYSICS --- */}
            <TabsContent value="physics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Atom size={22} weight="duotone" className="text-indigo-600 dark:text-indigo-400" />
                    Physics: Simulating the Unobservable
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    AI factories in physics don't just crunch numbers from accelerators — they generate 
                    <strong> synthetic collision data</strong>, hypothetical field configurations, and lattice QCD predictions 
                    that could never be produced with today's experimental budgets.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <h5 className="font-bold text-sm mb-2">What Agents Do</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• <strong>Surrogate Simulator Agent</strong> — trains on sparse CERN data, generates millions of synthetic collision events</li>
                        <li>• <strong>Anomaly Spotter Agent</strong> — flags deviations from Standard Model predictions</li>
                        <li>• <strong>Hypothesis Evolver</strong> — applies AlphaEvolve-style evolutionary search to theoretical parameter space</li>
                        <li>• <strong>Cross-Domain Linker</strong> — maps topological phase-transition patterns to condensed matter, creating new material candidates</li>
                      </ul>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <h5 className="font-bold text-sm mb-2">Data That Didn't Exist Before</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Synthetic dark matter interaction maps for detector calibration</li>
                        <li>• AI-predicted topological insulator band structures (validated 73% experimentally)</li>
                        <li>• Cross-linked quantum gravity hints from cosmological survey + particle physics data</li>
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Link to="/concepts/agent-reasoning-patterns"><Badge variant="outline" className="text-[10px] cursor-pointer">Reasoning Patterns</Badge></Link>
                        <Link to="/concepts/agent-evaluation"><Badge variant="outline" className="text-[10px] cursor-pointer">Evaluation</Badge></Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- CHEMISTRY --- */}
            <TabsContent value="chemistry">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flask size={22} weight="duotone" className="text-emerald-600 dark:text-emerald-400" />
                    Chemistry: Designing Molecules No One Imagined
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Chemistry AI factories go beyond retrosynthesis planning. They <strong>invent entirely new chemical spaces</strong> — 
                    exploring molecular topologies that no chemist has drawn, then validating stability, toxicity, and 
                    synthesizability in multi-agent debate loops before a single flask is touched.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <h5 className="font-bold text-sm mb-2">Factory Pipeline</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• <strong>Generative Molecular Agent</strong> — proposes novel scaffolds via graph neural nets</li>
                        <li>• <strong>Thermodynamic Validator</strong> — runs DFT approximations in seconds, not hours</li>
                        <li>• <strong>Synthesis Planner</strong> — maps retrosynthetic routes to commercially available reagents</li>
                        <li>• <strong>Safety Critic</strong> — screens for toxicity, environmental impact, and IP conflicts</li>
                      </ul>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <h5 className="font-bold text-sm mb-2">Generated Knowledge (2025–2026)</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• MatterGen (Microsoft) produced 500+ stable crystal structures verified by DFT</li>
                        <li>• TamGen designed de novo drug leads with 8x higher hit rates vs HTS</li>
                        <li>• DeepEvolve discovered ternary superconductor candidates in under 3 weeks</li>
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Link to="/concepts/data-knowledge-operations"><Badge variant="outline" className="text-[10px] cursor-pointer">DataKnowledgeOps</Badge></Link>
                        <Link to="/concepts/fine-tuning"><Badge variant="outline" className="text-[10px] cursor-pointer">Fine-Tuning</Badge></Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- BIOLOGY --- */}
            <TabsContent value="biology">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dna size={22} weight="duotone" className="text-rose-600 dark:text-rose-400" />
                    Biology: Decoding Life's Hidden Operating System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Biology AI factories are building the first <strong>computational organisms</strong> — multi-scale models 
                    that link genome → proteome → metabolome → phenotype in a single reasoning chain. AlphaFold was 
                    the opening act; 2026 factories predict function, not just structure.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-lg border border-rose-200 dark:border-rose-800">
                      <h5 className="font-bold text-sm mb-2">Agent Ensemble</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• <strong>Genomic Scanner</strong> — AlphaGenome-class agent reads non-coding DNA regions for regulatory signals</li>
                        <li>• <strong>Protein Dynamics Agent</strong> — BioEmu-1 simulates microsecond-scale protein motion, revealing cryptic binding sites</li>
                        <li>• <strong>Pathway Mapper</strong> — reconstructs metabolic networks from multi-omics + single-cell RNA-seq</li>
                        <li>• <strong>Evolutionary Tracer</strong> — links SNP patterns across 10M+ genomes to phenotypic outcomes</li>
                      </ul>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-lg border border-rose-200 dark:border-rose-800">
                      <h5 className="font-bold text-sm mb-2">Invisible Data Now Visible</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Cryptic allosteric sites found in 340+ proteins (validated by cryo-EM)</li>
                        <li>• 1.2M novel protein-protein interaction predictions from multi-scale graph reasoning</li>
                        <li>• Gene regulatory networks for 900+ rare diseases, previously unstudied</li>
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Link to="/concepts/multi-agent-systems"><Badge variant="outline" className="text-[10px] cursor-pointer">Multi-Agent Systems</Badge></Link>
                        <Link to="/concepts/agent-observability"><Badge variant="outline" className="text-[10px] cursor-pointer">Observability</Badge></Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- MEDICINE --- */}
            <TabsContent value="medicine">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkle size={22} weight="duotone" className="text-pink-600 dark:text-pink-400" />
                    Medicine: From Diagnosis → Drug → Trial in Weeks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Medical AI factories compress what once took a decade — from target identification through 
                    lead optimization to IND filing — into <strong>iterative agent cycles measured in weeks</strong>. They are 
                    the first systems that can simultaneously mine clinical records, molecular libraries, and genomic 
                    biobanks as a unified knowledge graph.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                      <h5 className="font-bold text-sm mb-2">Factory Agents</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• <strong>Clinical Miner</strong> — NLP over 50M+ EHR records to find unrecognized drug-response phenotypes</li>
                        <li>• <strong>Target Discoverer</strong> — integrates GWAS, proteomics, CRISPR screen data for novel target nomination</li>
                        <li>• <strong>Molecular Designer</strong> — TamGen-class generative models produce de novo lead compounds</li>
                        <li>• <strong>Trial Simulator</strong> — predicts Phase II endpoints from synthetic clinical cohorts</li>
                        <li>• <strong>Safety Sentinel</strong> — continuous monitoring agent for adverse-event signal detection</li>
                      </ul>
                    </div>
                    <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                      <h5 className="font-bold text-sm mb-2">Data Created, Not Collected</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Synthetic patient cohorts for rare-disease trial feasibility (n → 10,000 virtual patients)</li>
                        <li>• 200+ repurposed drug candidates discovered by mining multi-modal side-effect networks</li>
                        <li>• 40% reduction in Phase I failure rate at 2 pharma partners using agent-optimized toxicity screening</li>
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Link to="/concepts/agent-evaluation-methodologies"><Badge variant="outline" className="text-[10px] cursor-pointer">Evaluation Methods</Badge></Link>
                        <Link to="/concepts/human-in-the-loop-patterns"><Badge variant="outline" className="text-[10px] cursor-pointer">Human-in-the-Loop</Badge></Link>
                        <Link to="/concepts/agent-security"><Badge variant="outline" className="text-[10px] cursor-pointer">Agent Security</Badge></Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- ROBOTICS --- */}
            <TabsContent value="robotics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Robot size={22} weight="duotone" className="text-teal-600 dark:text-teal-400" />
                    Robotics: Self-Driving Labs & Physical AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Robotic AI factories close the loop between <strong>digital hypothesis and physical experiment</strong>. 
                    They autonomously design, execute, and interpret lab experiments — then feed findings back into the 
                    agent planner. In 2026, "self-driving labs" run 24/7 in materials science and synthetic biology 
                    facilities worldwide.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                      <h5 className="font-bold text-sm mb-2">Robotic Agent Layers</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• <strong>Experiment Planner</strong> — schedules robotic workcell operations, reagent ordering, instrument calibration</li>
                        <li>• <strong>Execution Controller</strong> — translates abstract protocols to robotic arm trajectories (MCP tool calls)</li>
                        <li>• <strong>Characterization Agent</strong> — processes spectroscopy, microscopy, and diffraction data in real time</li>
                        <li>• <strong>Active-Learning Loop</strong> — decides next experiment based on Bayesian optimization + agent reasoning</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                      <h5 className="font-bold text-sm mb-2">Physical–Digital Fusion</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• A-Lab (LBNL) autonomously synthesized 41 of 58 targeted materials without human intervention</li>
                        <li>• Cloud labs run 1,000+ experiments/day, generating training data for next-gen foundation models</li>
                        <li>• Robot-generated reaction databases bridge the "reproducibility gap" in chemical synthesis</li>
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Link to="/concepts/agentic-robotics-integration"><Badge variant="outline" className="text-[10px] cursor-pointer">Robotics Integration</Badge></Link>
                        <Link to="/concepts/mcp"><Badge variant="outline" className="text-[10px] cursor-pointer">MCP Protocol</Badge></Link>
                        <Link to="/concepts/edge-agent"><Badge variant="outline" className="text-[10px] cursor-pointer">Edge Agents</Badge></Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* The Factory Architecture — Agent Patterns for Scientists */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <TreeStructure size={28} weight="duotone" className="text-violet-600 dark:text-violet-400" />
            The Factory Architecture: Agent Patterns for Scientists
          </h3>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Every AI factory is built from composable agent patterns. Understanding these patterns lets you 
            design, audit, and scale your own scientific AI pipeline. Each pattern links to the deep-dive 
            concept page in Open Agent School.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Pattern 1 */}
            <Link to="/concepts/agent-reasoning-patterns" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain size={20} weight="duotone" className="text-violet-600 dark:text-violet-400" />
                    <h4 className="font-bold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Reasoning Patterns</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Chain-of-thought, tree-of-thought, and self-reflection loops enable agents to evaluate 
                    competing hypotheses and pick the experiment that maximises expected information gain.
                  </p>
                  <div className="text-xs text-violet-600 dark:text-violet-400 mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Deep dive <ArrowRight size={12} />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pattern 2 */}
            <Link to="/concepts/agent-memory-systems" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Database size={20} weight="duotone" className="text-violet-600 dark:text-violet-400" />
                    <h4 className="font-bold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Memory Systems</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Episodic memory stores past experimental results; semantic memory holds domain knowledge graphs; 
                    procedural memory encodes lab protocols. Together they prevent redundant experiments.
                  </p>
                  <div className="text-xs text-violet-600 dark:text-violet-400 mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Deep dive <ArrowRight size={12} />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pattern 3 */}
            <Link to="/concepts/multi-agent-systems" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Graph size={20} weight="duotone" className="text-violet-600 dark:text-violet-400" />
                    <h4 className="font-bold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Multi-Agent Orchestration</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Retriever → Analyzer → Synthesizer → Critic → Evolver. Science factories 
                    use 5–12 specialised agents coordinated by a planner that decides which sub-pipeline 
                    to activate based on uncertainty estimates.
                  </p>
                  <div className="text-xs text-violet-600 dark:text-violet-400 mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Deep dive <ArrowRight size={12} />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pattern 4 */}
            <Link to="/concepts/agent-observability" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye size={20} weight="duotone" className="text-violet-600 dark:text-violet-400" />
                    <h4 className="font-bold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Observability & Tracing</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    When an AI factory produces a novel hypothesis, you must trace <em>why</em>. Distributed tracing, 
                    provenance graphs, and confidence calibration let scientist reviewers audit every reasoning step.
                  </p>
                  <div className="text-xs text-violet-600 dark:text-violet-400 mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Deep dive <ArrowRight size={12} />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pattern 5 */}
            <Link to="/concepts/agent-evaluation-methodologies" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge size={20} weight="duotone" className="text-violet-600 dark:text-violet-400" />
                    <h4 className="font-bold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Evaluation Methodologies</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Scientific AI demands rigorous validation: reproducibility scores, ablation benchmarks, 
                    statistical significance thresholds. These evaluation frameworks prevent 
                    an AI factory from generating plausible-sounding but false discoveries.
                  </p>
                  <div className="text-xs text-violet-600 dark:text-violet-400 mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Deep dive <ArrowRight size={12} />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pattern 6 */}
            <Link to="/concepts/human-in-the-loop-patterns" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={20} weight="duotone" className="text-violet-600 dark:text-violet-400" />
                    <h4 className="font-bold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Human-in-the-Loop</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI factories accelerate discovery but don't replace scientific judgment. 
                    Gate-review patterns let domain experts approve/reject hypotheses at defined 
                    milestones, ensuring reproducibility and ethical compliance.
                  </p>
                  <div className="text-xs text-violet-600 dark:text-violet-400 mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Deep dive <ArrowRight size={12} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Additional Interlinks Bar */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/30 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-3 text-sm">More Concepts for Science AI Architects</h4>
            <div className="flex flex-wrap gap-2">
              <Link to="/concepts/ai-ready-data"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">AI-Ready Data</Badge></Link>
              <Link to="/concepts/data-knowledge-operations"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">DataKnowledgeOps</Badge></Link>
              <Link to="/concepts/agent-skills"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Agent Skills</Badge></Link>
              <Link to="/concepts/mcp-a2a-integration"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">MCP + A2A Integration</Badge></Link>
              <Link to="/concepts/fine-tuning"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Fine-Tuning (SFT/DPO/RFT)</Badge></Link>
              <Link to="/concepts/agent-testing-benchmarks"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Testing & Benchmarks</Badge></Link>
              <Link to="/concepts/agent-ops"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">AgentOps</Badge></Link>
              <Link to="/concepts/responsible-ai-governance"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Responsible AI</Badge></Link>
              <Link to="/concepts/agent-cost-optimization"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Cost Optimization</Badge></Link>
              <Link to="/concepts/quantum-ai-robotics"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Quantum AI + Robotics</Badge></Link>
              <Link to="/concepts/experimentation-continuous-improvement"><Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Experimentation & CI</Badge></Link>
            </div>
          </div>
        </div>

        {/* 2026 Inflection Points */}
        <Card className="mb-8 border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50/50 to-amber-50/50 dark:from-red-950/20 dark:to-amber-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightning size={24} weight="duotone" className="text-red-600 dark:text-red-400" />
              2026 Inflection Points: Why Now?
            </CardTitle>
            <CardDescription>
              Three converging trends are turning science AI from "interesting demos" into production factories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 font-bold text-sm">1</div>
                  <h5 className="font-bold text-sm">Foundation Models for Science</h5>
                </div>
                <p className="text-xs text-muted-foreground">
                  Models pre-trained on scientific corpora (AlphaFold 3, BioEmu-1, MatterSim, Aurora) give 
                  agents domain-native reasoning. Fine-tuning costs dropped 90% since 2024, enabling 
                  lab-specific customization.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">2</div>
                  <h5 className="font-bold text-sm">Tool-Use Protocols (MCP / A2A)</h5>
                </div>
                <p className="text-xs text-muted-foreground">
                  Standardised protocols like <Link to="/concepts/mcp" className="text-primary hover:underline">MCP</Link> and <Link to="/concepts/a2a-communication" className="text-primary hover:underline">A2A</Link> let 
                  agents call instruments, databases, and simulation engines as first-class tools — no bespoke 
                  integration for each lab.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm">3</div>
                  <h5 className="font-bold text-sm">Self-Driving Lab Hardware</h5>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automated liquid handlers, robotic arms, and cloud-connected characterisation instruments 
                  close the hypothesis → experiment → data loop. Agents plan, robots execute, 24/7.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Think-Through Box for Advanced Scientists */}
        <Card className="mb-8 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border-2 border-violet-300 dark:border-violet-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain size={22} weight="duotone" className="text-violet-600 dark:text-violet-400" />
              Think-Through: Design Your Own Science AI Factory
            </CardTitle>
            <CardDescription>
              Use these questions to architect a multi-agent factory for your domain. Each question 
              maps to a core concept in Open Agent School.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold mb-1">1. What data sources does my factory ingest?</p>
                  <p className="text-xs text-muted-foreground">
                    Papers, instrument logs, EHR records, simulation outputs? 
                    → <Link to="/concepts/ai-ready-data" className="text-primary hover:underline">AI-Ready Data</Link>, <Link to="/concepts/data-knowledge-operations" className="text-primary hover:underline">DataKnowledgeOps</Link>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold mb-1">2. How many specialised agents do I need?</p>
                  <p className="text-xs text-muted-foreground">
                    Retriever, Analyzer, Evolver, Critic, Validator? 
                    → <Link to="/concepts/multi-agent-systems" className="text-primary hover:underline">Multi-Agent Systems</Link>, <Link to="/concepts/agent-architecture" className="text-primary hover:underline">Architecture</Link>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold mb-1">3. How do agents communicate?</p>
                  <p className="text-xs text-muted-foreground">
                    Shared memory, message passing, tool-call protocol? 
                    → <Link to="/concepts/a2a-communication" className="text-primary hover:underline">A2A</Link>, <Link to="/concepts/mcp" className="text-primary hover:underline">MCP</Link>, <Link to="/concepts/mcp-a2a-integration" className="text-primary hover:underline">MCP+A2A Integration</Link>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold mb-1">4. How do I evaluate factory output?</p>
                  <p className="text-xs text-muted-foreground">
                    Statistical significance, reproducibility checks, ablation benchmarks? 
                    → <Link to="/concepts/agent-evaluation-methodologies" className="text-primary hover:underline">Evaluation Methodologies</Link>, <Link to="/concepts/agent-testing-benchmarks" className="text-primary hover:underline">Testing & Benchmarks</Link>
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold mb-1">5. Where do humans stay in the loop?</p>
                  <p className="text-xs text-muted-foreground">
                    Gate reviews, hypothesis approval, ethical sign-off? 
                    → <Link to="/concepts/human-in-the-loop-patterns" className="text-primary hover:underline">Human-in-the-Loop</Link>, <Link to="/concepts/responsible-ai-governance" className="text-primary hover:underline">Responsible AI Governance</Link>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold mb-1">6. How do I observe and debug?</p>
                  <p className="text-xs text-muted-foreground">
                    Distributed tracing, confidence calibration, provenance graphs? 
                    → <Link to="/concepts/agent-observability" className="text-primary hover:underline">Observability</Link>, <Link to="/concepts/agent-ops" className="text-primary hover:underline">AgentOps</Link>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold mb-1">7. How do I improve over time?</p>
                  <p className="text-xs text-muted-foreground">
                    Fine-tune on lab data, reward shaping, active learning? 
                    → <Link to="/concepts/fine-tuning" className="text-primary hover:underline">Fine-Tuning</Link>, <Link to="/concepts/experimentation-continuous-improvement" className="text-primary hover:underline">Experimentation & CI</Link>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold mb-1">8. What's the security posture?</p>
                  <p className="text-xs text-muted-foreground">
                    IP protection, prompt injection defense, data isolation? 
                    → <Link to="/concepts/agent-security" className="text-primary hover:underline">Agent Security</Link>, <Link to="/concepts/prompt-injection-defense" className="text-primary hover:underline">Prompt Injection Defense</Link>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Original Case Study - now in context after the Factory section */}
      <div className="mb-8">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-2 border-yellow-300 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb size={24} weight="duotone" className="text-yellow-600 dark:text-yellow-400" />
              Case Study: Superconductor Discovery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              <strong>Challenge:</strong> Find room-temperature superconductor materials in the Li-H chemical space
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Input</div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  • Initial hypothesis: Li-H binary compounds<br/>
                  • 50,000+ crystallography papers<br/>
                  • Quantum physics literature
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Process</div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  • 4 evolutionary generations<br/>
                  • 14 hypothesis refinements<br/>
                  • Multi-objective optimization
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-green-200 dark:border-green-800">
                <div className="font-semibold text-green-600 dark:text-green-400 mb-1">Outcome</div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  • Discovered Y-La-H₁₀ ternary system<br/>
                  • 95% confidence score<br/>
                  • 3 weeks vs 18-month traditional timeline
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle>References & Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <Atom size={24} className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" weight="duotone" />
              <div className="flex-1">
                <h5 className="font-semibold mb-1">DeepEvolve: Deep Physical Models for Multi-Objective Material Design</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Liu, G., et al. (2024). arXiv preprint arXiv:2510.06056
                </p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => openExternal('https://arxiv.org/pdf/2510.06056', 'arxiv_paper')}
                >
                  Read Paper <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <GithubLogo size={24} className="flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h5 className="font-semibold mb-1">DeepEvolve GitHub Repository</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Implementation code, datasets, and reproducibility instructions
                </p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => openExternal('https://github.com/liugangcode/deepevolve', 'deepevolve_github')}
                >
                  View Repository <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <YoutubeLogo size={24} className="flex-shrink-0 text-red-600 dark:text-red-400 mt-1" weight="duotone" />
              <div className="flex-1">
                <h5 className="font-semibold mb-1">Deep Evolve - Scientific Algorithm Discovery</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Video explanation of how DeepEvolve combines AlphaEvolve's evolutionary algorithms with Deep Research's multi-agent literature synthesis for augmenting scientific discovery
                </p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => openExternal('https://youtu.be/oFKLFfxWfmA', 'youtube_video')}
                >
                  Watch Video <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <Sparkle size={24} className="flex-shrink-0 text-cyan-600 dark:text-cyan-400 mt-1" weight="duotone" />
              <div className="flex-1">
                <h5 className="font-semibold mb-1">Azure AI Labs - AI for Science Models</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Microsoft's AI for Science initiative featuring cutting-edge foundation models for materials discovery, molecular simulation, climate forecasting, and multi-agent systems
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://labs.ai.azure.com/projects/mattersim/', 'azure_lab_mattersim')}
                  >
                    MatterSim
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://labs.ai.azure.com/projects/skala/', 'azure_lab_skala')}
                  >
                    Skala
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://labs.ai.azure.com/projects/mattergen/', 'azure_lab_mattergen')}
                  >
                    MatterGen
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://labs.ai.azure.com/projects/aurora/', 'azure_lab_aurora')}
                  >
                    Aurora
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://labs.ai.azure.com/projects/bioemu/', 'azure_lab_bioemu')}
                  >
                    BioEmu-1
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://labs.ai.azure.com/projects/tamgen/', 'azure_lab_tamgen')}
                  >
                    TamGen
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://labs.ai.azure.com/projects/magentic-one/', 'azure_lab_magentic-one')}
                  >
                    Magentic-One
                  </Button>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => openExternal('https://labs.ai.azure.com/', 'azure_labs_home')}
                >
                  Explore AI Labs <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg border border-cyan-200 dark:border-cyan-800">
              <GithubLogo size={24} className="flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h5 className="font-semibold mb-1">Claude Scientific Skills (K-Dense AI)</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  140+ ready-to-use scientific skills for Claude covering bioinformatics, cheminformatics, drug discovery, 
                  clinical research, proteomics, materials science, lab automation, and more. Installable as a Claude Code plugin 
                  or MCP server for any MCP-compatible client.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['Bioinformatics', 'Drug Discovery', 'Clinical Research', 'ML & AI', 'Lab Automation', 'Multi-Omics', 'Scientific Communication'].map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto"
                    onClick={() => openExternal('https://github.com/K-Dense-AI/claude-scientific-skills', 'claude_scientific_skills')}
                  >
                    View Repository <ArrowUpRight size={14} className="ml-1" />
                  </Button>
                  <span className="text-muted-foreground text-xs">•</span>
                  <Link to="/concepts/agent-skills" className="text-sm text-primary hover:underline flex items-center gap-1">
                    Learn about Agent Skills <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <GoogleLogo size={24} className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" weight="duotone" />
              <div className="flex-1">
                <h5 className="font-semibold mb-1">Google DeepMind Science - AI for Scientific Discovery</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Google DeepMind's groundbreaking AI systems advancing biology, mathematics, climate science, and fundamental physics research
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://deepmind.google/science/alphafold/', 'alphafold')}
                  >
                    AlphaFold
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://deepmind.google/discover/blog/alphagenome-ai-for-better-understanding-the-genome/', 'alphagenome')}
                  >
                    AlphaGenome
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://deepmind.google/research/projects/alphamissense/', 'alphamissense')}
                  >
                    AlphaMissense
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://deepmind.google/discover/blog/alphaproteo-generates-novel-proteins-for-biology-and-health-research/', 'alphaproteo')}
                  >
                    AlphaProteo
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/', 'alphaevolve')}
                  >
                    AlphaEvolve
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/', 'alphaproof')}
                  >
                    AlphaProof
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/', 'alphageometry')}
                  >
                    AlphaGeometry
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => openExternal('https://deepmind.google/science/weathernext/', 'weathernext')}
                  >
                    WeatherNext
                  </Button>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => openExternal('https://deepmind.google/science/', 'deepmind_science')}
                >
                  Explore DeepMind Science <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <Flask size={24} className="flex-shrink-0 text-purple-600 dark:text-purple-400 mt-1" weight="duotone" />
              <div className="flex-1">
                <h5 className="font-semibold mb-1">Related Work: Multi-Agent Systems in Scientific Discovery</h5>
                <p className="text-sm text-muted-foreground">
                  Explore additional research on agentic AI for materials science, drug discovery, 
                  and automated hypothesis generation in the <a href="/references" className="text-primary hover:underline">References</a> section.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <Plugs size={24} className="flex-shrink-0 text-cyan-600 dark:text-cyan-400 mt-1" weight="duotone" />
              <div className="flex-1">
                <h5 className="font-semibold mb-1">Core Concept: Agent Skills for Scientific Workflows</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Scientific skills like those above are built on the <strong>Agent Skills</strong> specification—a 
                  modular SKILL.md format that lets agents load domain expertise on demand. Learn how to evaluate, 
                  compose, and create your own skills for research workflows.
                </p>
                <Link to="/concepts/agent-skills" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
                  Go to Agent Skills Concept <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 p-8 rounded-xl text-white">
        <h3 className="text-2xl font-bold mb-3">Ready to Apply Agentic AI to Your Research?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Explore the Adoption Playbook for step-by-step guidance on implementing multi-agent systems 
          in your scientific workflows.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => window.location.href = '/adoption-playbook'}
            className="flex items-center gap-2"
          >
            View Adoption Playbook
            <ArrowRight size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.href = '/patterns'}
            className="flex items-center gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            Explore Agent Patterns
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>

      <div className={`agents-for-science-backtotop ${showBackToTop ? 'is-visible' : ''}`}>
        <Button
          type="button"
          size="sm"
          onClick={scrollToTop}
          className="rounded-full px-4 shadow-lg"
        >
          <ArrowRight size={14} className="-rotate-90" />
          Top
        </Button>
      </div>
    </div>
  );
}
