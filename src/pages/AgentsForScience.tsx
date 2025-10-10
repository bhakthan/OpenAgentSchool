import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, GithubLogo, ArrowUpRight, Flask, Atom, Graph, Lightbulb, CheckCircle, Dna, Planet, Cpu, Brain, SolarPanel, YoutubeLogo, Sparkle, GoogleLogo } from '@phosphor-icons/react';
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
