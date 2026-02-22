export interface ScienceDomainSample {
  id: string;
  title: string;
  cardDescription: string;
  scientificGoal: string;
  agentApproach: string[];
  starterSteps: string[];
  datasets: string[];
  typescriptStarter: string;
  pythonStarter: string;
}

const buildTsStarter = (entity: string, sample: string, researchQuestion: string, constraints: string[]) => {
  const constraintBlock = constraints.map(c => `  - ${c}`).join('\n');
  return `type ${entity} = { id: string; scoreA: number; scoreB: number; risk: number; evidence: string[] };
type AgentDecision<T> = { item: T; score: number; rationale: string[] };

const RESEARCH_QUESTION = "${researchQuestion}";
const CONSTRAINTS = \`${constraintBlock}\`;

class ScienceAgentPipeline {
  constructor(private readonly runId: string) {}

  async execute(items: ${entity}[]): Promise<AgentDecision<${entity}>[]> {
    const evidenceMap = await this.retrieveEvidence(items);
    const scored = items.map((item) => this.evaluateCandidate(item, evidenceMap[item.id] ?? []));
    return this.rankAndTrim(scored, 10);
  }

  private async retrieveEvidence(items: ${entity}[]) {
    // Replace with RAG, vector search, or API connectors
    return Object.fromEntries(items.map(i => [i.id, i.evidence ?? []])) as Record<string, string[]>;
  }

  private evaluateCandidate(item: ${entity}, evidence: string[]): AgentDecision<${entity}> {
    const baseScore = item.scoreA * 0.55 + item.scoreB * 0.30 - item.risk * 0.40;
    const evidenceBoost = Math.min(0.15, evidence.length * 0.02);
    return {
      item,
      score: baseScore + evidenceBoost,
      rationale: [
        \`Question: \${RESEARCH_QUESTION}\`,
        \`Constraints:\\n\${CONSTRAINTS}\`,
        \`Evidence hits: \${evidence.length}\`,
      ],
    };
  }

  private rankAndTrim(decisions: AgentDecision<${entity}>[], topK: number) {
    return decisions.sort((a, b) => b.score - a.score).slice(0, topK);
  }
}

async function runDemo() {
  const pipeline = new ScienceAgentPipeline("demo-run-001");
  const results = await pipeline.execute([${sample}]);
  console.table(results.map(r => ({ id: r.item.id, score: r.score.toFixed(3), why: r.rationale[2] })));
}

runDemo();`;
};

const buildPyStarter = (sample: string, researchQuestion: string, constraints: string[]) => {
  const constraintBlock = constraints.map(c => `- ${c}`).join('\\n');
  return `from dataclasses import dataclass
from typing import List, Dict

RESEARCH_QUESTION = "${researchQuestion}"
CONSTRAINTS = """${constraintBlock}"""

@dataclass
class Candidate:
    id: str
    score_a: float
    score_b: float
    risk: float
    evidence: List[str]

@dataclass
class AgentDecision:
    candidate: Candidate
    score: float
    rationale: List[str]

class ScienceAgentPipeline:
    def __init__(self, run_id: str) -> None:
        self.run_id = run_id

    def execute(self, items: List[Candidate]) -> List[AgentDecision]:
        evidence_map = self.retrieve_evidence(items)
        decisions = [self.evaluate_candidate(item, evidence_map.get(item.id, [])) for item in items]
        return sorted(decisions, key=lambda d: d.score, reverse=True)[:10]

    def retrieve_evidence(self, items: List[Candidate]) -> Dict[str, List[str]]:
        # Replace with RAG/vector retrieval and structured data connectors
        return {item.id: item.evidence for item in items}

    def evaluate_candidate(self, item: Candidate, evidence: List[str]) -> AgentDecision:
        base_score = item.score_a * 0.55 + item.score_b * 0.30 - item.risk * 0.40
        evidence_boost = min(0.15, len(evidence) * 0.02)
        return AgentDecision(
            candidate=item,
            score=base_score + evidence_boost,
            rationale=[
                f"Question: {RESEARCH_QUESTION}",
                f"Constraints:\\n{CONSTRAINTS}",
                f"Evidence hits: {len(evidence)}",
            ],
        )

pipeline = ScienceAgentPipeline("demo-run-001")
results = pipeline.execute([${sample}])
for r in results:
    print({"id": r.candidate.id, "score": round(r.score, 3), "why": r.rationale[2]})`;
};

export const scienceDomainSamples: ScienceDomainSample[] = [
  {
    id: 'science-ai-factory',
    title: 'Science AI Factory',
    cardDescription: 'Continuously ingest, mine, synthesize, and generate novel scientific hypotheses using coordinated agents.',
    scientificGoal: 'Build a continuously running multi-agent loop that produces validated hypothesis candidates from mixed scientific sources.',
    agentApproach: ['Ingestion agent normalizes papers, simulations, and lab telemetry', 'Mining agent discovers cross-domain patterns and contradictions', 'Synthesis agent composes testable hypotheses with evidence links', 'Generation agent creates experiment plans and simulation-ready artifacts'],
    starterSteps: ['Ingest multi-source scientific records into a normalized queue', 'Run mining and synthesis agents with shared memory', 'Score generated hypotheses with governance checks and confidence bands', 'Publish top candidates to an experiment-planning backlog'],
    datasets: ['Paper abstracts + embeddings', 'Simulation output logs', 'Lab notebook events', 'Domain ontology graph'],
    typescriptStarter: buildTsStarter('FactoryHypothesis', `{ id: "hyp-001", scoreA: 0.91, scoreB: 0.76, risk: 0.18, evidence: ["cross-domain pattern cluster", "simulation corroboration", "recent literature support", "lab trend alignment"] }`, 'Which generated hypotheses should be promoted to the next experimental cycle?', ['Require >= 3 independent evidence signals', 'Penalize safety/compliance violations', 'Prioritize hypotheses with clear experiment plan and measurable outcome']),
    pythonStarter: buildPyStarter(`{"id": "hyp-001", "score_a": 0.91, "score_b": 0.76, "risk": 0.18, "evidence": ["cross-domain pattern cluster", "simulation corroboration", "recent literature support", "lab trend alignment"]}`, 'Which generated hypotheses should be promoted to the next experimental cycle?', ['Require >= 3 independent evidence signals', 'Penalize safety/compliance violations', 'Prioritize hypotheses with clear experiment plan and measurable outcome'])
  },
  {
    id: 'materials-discovery',
    title: 'Materials Discovery',
    cardDescription: 'Find candidate materials with target properties using retrieval, ranking, and experiment-planning agents.',
    scientificGoal: 'Rank high-temperature superconductor candidates for follow-up validation.',
    agentApproach: ['Retriever agent gathers candidate compounds and studies', 'Reasoning agent scores candidates against constraints', 'Planner agent proposes next simulation and lab actions'],
    starterSteps: ['Load candidate compounds and constraints', 'Compute ranking score with evidence features', 'Review top candidates and generate experiment queue'],
    datasets: ['Materials Project CSV exports', 'OpenAlex metadata', 'Internal experiment logs'],
    typescriptStarter: buildTsStarter('MaterialCandidate', `{ id: "m1", scoreA: 0.92, scoreB: 0.73, risk: 0.12, evidence: ["phase-map match", "density-functional study", "stability benchmark"] }`, 'Which candidates can reach higher critical temperature with acceptable stability?', ['Prioritize candidates with >= 3 evidence signals', 'Penalize high synthesis risk', 'Keep shortlist explainable for lab review']),
    pythonStarter: buildPyStarter(`{"id": "m1", "score_a": 0.92, "score_b": 0.73, "risk": 0.12, "evidence": ["phase-map match", "density-functional study", "stability benchmark"]}`, 'Which candidates can reach higher critical temperature with acceptable stability?', ['Prioritize candidates with >= 3 evidence signals', 'Penalize high synthesis risk', 'Keep shortlist explainable for lab review'])
  },
  {
    id: 'drug-discovery',
    title: 'Drug Discovery',
    cardDescription: 'Prioritize compounds by combining target biology, efficacy signals, and safety constraints.',
    scientificGoal: 'Shortlist candidate compounds for rare disease mechanism exploration.',
    agentApproach: ['Target agent extracts pathway-relevant evidence', 'Compound agent scores efficacy proxies', 'Safety agent penalizes toxicity and interaction risk'],
    starterSteps: ['Assemble candidate compounds and target context', 'Score efficacy and safety factors', 'Export ranked shortlist with traceable rationale'],
    datasets: ['ChEMBL subset', 'PubMed abstracts', 'ClinicalTrials summaries'],
    typescriptStarter: buildTsStarter('Compound', `{ id: "cmp-01", scoreA: 0.88, scoreB: 0.66, risk: 0.18, evidence: ["target pathway overlap", "assay potency report", "tox screen"] }`, 'Which compounds should advance to mechanistic validation for this rare disease?', ['Favor strong target-evidence links', 'Penalize toxicity signals early', 'Return rationale per candidate']),
    pythonStarter: buildPyStarter(`{"id": "cmp-01", "score_a": 0.88, "score_b": 0.66, "risk": 0.18, "evidence": ["target pathway overlap", "assay potency report", "tox screen"]}`, 'Which compounds should advance to mechanistic validation for this rare disease?', ['Favor strong target-evidence links', 'Penalize toxicity signals early', 'Return rationale per candidate'])
  },
  {
    id: 'climate-science',
    title: 'Climate Science',
    cardDescription: 'Evaluate intervention strategies across impact, feasibility, and uncertainty.',
    scientificGoal: 'Prioritize mitigation interventions for highest expected CO2 reduction.',
    agentApproach: ['Model agent estimates impact trajectories', 'Policy agent scores deployment feasibility', 'Uncertainty agent stress-tests assumptions'],
    starterSteps: ['Load intervention options and baseline assumptions', 'Score impact and feasibility with risk penalty', 'Output ranked interventions and caveats'],
    datasets: ['IPCC scenarios', 'Regional emissions data', 'Technology cost curves'],
    typescriptStarter: buildTsStarter('Intervention', `{ id: "int-1", scoreA: 0.84, scoreB: 0.61, risk: 0.24, evidence: ["regional emissions data", "cost model scenario", "policy feasibility note"] }`, 'Which interventions maximize CO2 reduction under deployment constraints?', ['Require evidence from both technical and policy sources', 'Penalize high implementation risk', 'Keep output auditable']),
    pythonStarter: buildPyStarter(`{"id": "int-1", "score_a": 0.84, "score_b": 0.61, "risk": 0.24, "evidence": ["regional emissions data", "cost model scenario", "policy feasibility note"]}`, 'Which interventions maximize CO2 reduction under deployment constraints?', ['Require evidence from both technical and policy sources', 'Penalize high implementation risk', 'Keep output auditable'])
  },
  {
    id: 'protein-engineering',
    title: 'Protein Engineering',
    cardDescription: 'Generate and filter protein variants with sequence and structure-aware heuristics.',
    scientificGoal: 'Select enzyme variants likely to improve stability without function loss.',
    agentApproach: ['Sequence agent generates mutation candidates', 'Structure agent estimates stability proxies', 'Knowledge agent validates motif and literature consistency'],
    starterSteps: ['Generate candidate variants from baseline sequence', 'Score stability and motif constraints', 'Return top variants for assay planning'],
    datasets: ['UniProt sequence sets', 'Motif references', 'Assay benchmark tables'],
    typescriptStarter: buildTsStarter('SequenceVariant', `{ id: "v-21", scoreA: 0.86, scoreB: 0.58, risk: 0.15, evidence: ["motif retention", "stability predictor", "activity assay"] }`, 'Which sequence variants best improve stability while preserving activity?', ['Keep catalytic motif integrity', 'Penalize variants with high expression risk', 'Return evidence traces for review']),
    pythonStarter: buildPyStarter(`{"id": "v-21", "score_a": 0.86, "score_b": 0.58, "risk": 0.15, "evidence": ["motif retention", "stability predictor", "activity assay"]}`, 'Which sequence variants best improve stability while preserving activity?', ['Keep catalytic motif integrity', 'Penalize variants with high expression risk', 'Return evidence traces for review'])
  },
  {
    id: 'genomics-gene-editing',
    title: 'Genomics & Gene Editing',
    cardDescription: 'Rank editing guides by efficacy and off-target risk using multi-agent evaluation.',
    scientificGoal: 'Prioritize guide candidates for high efficacy with lower off-target probability.',
    agentApproach: ['Target agent identifies viable loci', 'Guide agent proposes candidate edits', 'Risk agent estimates off-target confidence bounds'],
    starterSteps: ['Load loci and guide candidates', 'Compute efficacy-risk ranking score', 'Produce shortlist for experimental validation'],
    datasets: ['Reference genome windows', 'Guide efficacy benchmarks', 'Off-target datasets'],
    typescriptStarter: buildTsStarter('GuideCandidate', `{ id: "g-7", scoreA: 0.9, scoreB: 0.62, risk: 0.14, evidence: ["on-target efficiency model", "off-target scan", "cell-line validation"] }`, 'Which guide candidates maximize efficacy while reducing off-target risk?', ['Must include off-target evidence', 'Favor reproducible assay outcomes', 'Support handoff to wet-lab team']),
    pythonStarter: buildPyStarter(`{"id": "g-7", "score_a": 0.9, "score_b": 0.62, "risk": 0.14, "evidence": ["on-target efficiency model", "off-target scan", "cell-line validation"]}`, 'Which guide candidates maximize efficacy while reducing off-target risk?', ['Must include off-target evidence', 'Favor reproducible assay outcomes', 'Support handoff to wet-lab team'])
  },
  {
    id: 'astronomy-cosmology',
    title: 'Astronomy & Cosmology',
    cardDescription: 'Triage observation events and rank follow-up opportunities with agent orchestration.',
    scientificGoal: 'Prioritize exoplanet observations for spectroscopy follow-up.',
    agentApproach: ['Signal agent detects candidate events', 'Model agent scores biosignature likelihood', 'Planning agent schedules high-value observations'],
    starterSteps: ['Load observation events with quality metrics', 'Rank events by scientific signal and risk', 'Publish follow-up target list'],
    datasets: ['Exoplanet catalogs', 'Spectroscopy summaries', 'Observation quality logs'],
    typescriptStarter: buildTsStarter('ObservationEvent', `{ id: "exo-42", scoreA: 0.81, scoreB: 0.69, risk: 0.19, evidence: ["spectral confidence", "signal-to-noise check", "catalog novelty"] }`, 'Which observation events should receive immediate follow-up telescope time?', ['Require strong signal quality evidence', 'Penalize high observational uncertainty', 'Surface rationale for scheduling board']),
    pythonStarter: buildPyStarter(`{"id": "exo-42", "score_a": 0.81, "score_b": 0.69, "risk": 0.19, "evidence": ["spectral confidence", "signal-to-noise check", "catalog novelty"]}`, 'Which observation events should receive immediate follow-up telescope time?', ['Require strong signal quality evidence', 'Penalize high observational uncertainty', 'Surface rationale for scheduling board'])
  },
  {
    id: 'quantum-computing',
    title: 'Quantum Computing',
    cardDescription: 'Optimize candidate circuits under noise constraints with planning and evaluation agents.',
    scientificGoal: 'Rank candidate circuits for best expected fidelity.',
    agentApproach: ['Circuit agent generates variants', 'Noise agent estimates degradation', 'Optimizer agent proposes mitigation strategy'],
    starterSteps: ['Load candidate circuits and calibration data', 'Score fidelity versus risk', 'Select top circuits for next test cycle'],
    datasets: ['Circuit templates', 'Noise calibration logs', 'Benchmark experiment runs'],
    typescriptStarter: buildTsStarter('CircuitCandidate', `{ id: "qc-2", scoreA: 0.78, scoreB: 0.74, risk: 0.21, evidence: ["noise calibration", "simulator fidelity", "mitigation benchmark"] }`, 'Which circuit variants should move to hardware execution first?', ['Reward expected fidelity after mitigation', 'Penalize depth-related instability', 'Preserve transparent evaluation trail']),
    pythonStarter: buildPyStarter(`{"id": "qc-2", "score_a": 0.78, "score_b": 0.74, "risk": 0.21, "evidence": ["noise calibration", "simulator fidelity", "mitigation benchmark"]}`, 'Which circuit variants should move to hardware execution first?', ['Reward expected fidelity after mitigation', 'Penalize depth-related instability', 'Preserve transparent evaluation trail'])
  },
  {
    id: 'neuroscience',
    title: 'Neuroscience',
    cardDescription: 'Fuse imaging and clinical signals to propose biomarker combinations.',
    scientificGoal: 'Prioritize biomarker combinations for early neurodegenerative detection.',
    agentApproach: ['Imaging agent extracts candidate biomarkers', 'Clinical agent maps outcome relevance', 'Hypothesis agent proposes ranked combinations'],
    starterSteps: ['Load biomarker and cohort outcome features', 'Score combinations with risk-adjusted ranking', 'Output top biomarker hypotheses'],
    datasets: ['fMRI feature tables', 'Longitudinal cohort outcomes', 'Cognitive assessments'],
    typescriptStarter: buildTsStarter('BiomarkerCombo', `{ id: "bio-a", scoreA: 0.83, scoreB: 0.67, risk: 0.17, evidence: ["imaging association", "cohort reproducibility", "clinical endpoint link"] }`, 'Which biomarker combinations are strongest for early detection?', ['Require multi-modal evidence', 'Penalize low cohort reproducibility', 'Output rationale for clinical review board']),
    pythonStarter: buildPyStarter(`{"id": "bio-a", "score_a": 0.83, "score_b": 0.67, "risk": 0.17, "evidence": ["imaging association", "cohort reproducibility", "clinical endpoint link"]}`, 'Which biomarker combinations are strongest for early detection?', ['Require multi-modal evidence', 'Penalize low cohort reproducibility', 'Output rationale for clinical review board'])
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy',
    cardDescription: 'Evaluate design options across efficiency, cost, and reliability objectives.',
    scientificGoal: 'Rank solar-plus-storage design candidates for pilot deployment.',
    agentApproach: ['Design agent proposes candidate configurations', 'Economics agent scores cost-performance', 'Reliability agent stress-tests degradation assumptions'],
    starterSteps: ['Load design candidates and operating assumptions', 'Compute utility score with risk controls', 'Publish top candidates for pilot plan'],
    datasets: ['Solar benchmark datasets', 'Battery degradation curves', 'Grid demand profiles'],
    typescriptStarter: buildTsStarter('EnergyDesign', `{ id: "en-1", scoreA: 0.8, scoreB: 0.72, risk: 0.16, evidence: ["efficiency benchmark", "LCOE analysis", "reliability stress test"] }`, 'Which renewable design candidates should be piloted next quarter?', ['Balance efficiency, economics, and reliability', 'Penalize operational risk', 'Provide explainable ranking for stakeholders']),
    pythonStarter: buildPyStarter(`{"id": "en-1", "score_a": 0.8, "score_b": 0.72, "risk": 0.16, "evidence": ["efficiency benchmark", "LCOE analysis", "reliability stress test"]}`, 'Which renewable design candidates should be piloted next quarter?', ['Balance efficiency, economics, and reliability', 'Penalize operational risk', 'Provide explainable ranking for stakeholders'])
  }
];

export const scienceDomainSampleMap: Record<string, ScienceDomainSample> = Object.fromEntries(
  scienceDomainSamples.map(sample => [sample.id, sample])
);

export const getScienceDomainSample = (domainId: string) => scienceDomainSampleMap[domainId];
