import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, GithubLogo, ArrowUpRight, Flask, Atom, Graph, Lightbulb, CheckCircle, Dna, Planet, Cpu, Brain, SolarPanel, YoutubeLogo, Sparkle, GoogleLogo, Factory, Robot, MagnifyingGlass, Database, TreeStructure, Eye, ShieldCheck, Plugs, Lightning, Gauge } from '@phosphor-icons/react';
import { HypothesisEvolutionDemo } from '@/components/science/HypothesisEvolutionDemo';
import { LiteratureSynthesisDemo } from '@/components/science/LiteratureSynthesisDemo';

export default function AgentsForScience() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
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
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => window.open('https://arxiv.org/pdf/2510.06056', '_blank')}
            className="flex items-center gap-2"
          >
            <Atom size={20} weight="duotone" />
            Read DeepEvolve Paper
            <ArrowUpRight size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open('https://github.com/liugangcode/deepevolve', '_blank')}
            className="flex items-center gap-2"
          >
            <GithubLogo size={20} />
            View GitHub Repo
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      <Card className="mb-8">
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
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Graph size={32} weight="duotone" className="text-primary" />
          The DeepEvolve Framework
        </h2>
        <p className="text-muted-foreground mb-6 text-lg">
          DeepEvolve combines two powerful agentic paradigms to create a self-improving scientific discovery engine:
        </p>

        <Tabs defaultValue="alphaevolve" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="alphaevolve">AlphaEvolve</TabsTrigger>
            <TabsTrigger value="deepresearch">Deep Research</TabsTrigger>
            <TabsTrigger value="workflow">Combined Workflow</TabsTrigger>
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
        </Tabs>
      </div>

      {/* Use Cases */}
      <div className="mb-8">
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive Demos */}
      <div className="space-y-8 mb-8">
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
      <div className="mb-8">
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
      <div className="mb-12 mt-16">
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
                  onClick={() => window.open('https://arxiv.org/pdf/2510.06056', '_blank')}
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
                  onClick={() => window.open('https://github.com/liugangcode/deepevolve', '_blank')}
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
                  onClick={() => window.open('https://youtu.be/oFKLFfxWfmA', '_blank')}
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
                    onClick={() => window.open('https://labs.ai.azure.com/projects/mattersim/', '_blank')}
                  >
                    MatterSim
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://labs.ai.azure.com/projects/skala/', '_blank')}
                  >
                    Skala
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://labs.ai.azure.com/projects/mattergen/', '_blank')}
                  >
                    MatterGen
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://labs.ai.azure.com/projects/aurora/', '_blank')}
                  >
                    Aurora
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://labs.ai.azure.com/projects/bioemu/', '_blank')}
                  >
                    BioEmu-1
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://labs.ai.azure.com/projects/tamgen/', '_blank')}
                  >
                    TamGen
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://labs.ai.azure.com/projects/magentic-one/', '_blank')}
                  >
                    Magentic-One
                  </Button>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => window.open('https://labs.ai.azure.com/', '_blank')}
                >
                  Explore AI Labs <ArrowUpRight size={14} className="ml-1" />
                </Button>
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
                    onClick={() => window.open('https://deepmind.google/science/alphafold/', '_blank')}
                  >
                    AlphaFold
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://deepmind.google/discover/blog/alphagenome-ai-for-better-understanding-the-genome/', '_blank')}
                  >
                    AlphaGenome
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://deepmind.google/research/projects/alphamissense/', '_blank')}
                  >
                    AlphaMissense
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://deepmind.google/discover/blog/alphaproteo-generates-novel-proteins-for-biology-and-health-research/', '_blank')}
                  >
                    AlphaProteo
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/', '_blank')}
                  >
                    AlphaEvolve
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/', '_blank')}
                  >
                    AlphaProof
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/', '_blank')}
                  >
                    AlphaGeometry
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs h-6 px-2"
                    onClick={() => window.open('https://deepmind.google/science/weathernext/', '_blank')}
                  >
                    WeatherNext
                  </Button>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => window.open('https://deepmind.google/science/', '_blank')}
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
    </div>
  );
}
