import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Database,
  GitBranch,
  Search,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  FileText,
  Layers,
  RefreshCw,
  BarChart3,
  Tag,
  Users
} from 'lucide-react';
import ConceptLayout from './ConceptLayout';
import CodeBlock from '@/components/ui/CodeBlock';
import ToolkitDownloadButtons from './ToolkitDownloadButtons';

interface DataPipelineStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  activities: string[];
  outputs: string[];
  risks: string[];
}

interface KnowledgeAsset {
  type: string;
  description: string;
  freshness: string;
  owner: string;
  sla: string;
}

interface QualityDimension {
  name: string;
  metric: string;
  target: string;
  measurement: string;
}

const pipelineStages: DataPipelineStage[] = [
  {
    id: 'source',
    name: 'Source & Acquire',
    icon: <Database className="w-5 h-5" />,
    description: 'Identify and connect to authoritative data sources.',
    activities: [
      'Map internal knowledge repositories',
      'Negotiate external data licenses',
      'Set up ingestion connectors',
      'Define extraction schedules'
    ],
    outputs: ['Raw data lake', 'Source registry', 'Access credentials vault'],
    risks: ['Stale sources', 'License violations', 'PII leakage at ingestion']
  },
  {
    id: 'curate',
    name: 'Curate & Transform',
    icon: <Layers className="w-5 h-5" />,
    description: 'Clean, structure, and enrich raw data for agent consumption.',
    activities: [
      'Deduplicate and normalize records',
      'Apply entity extraction (NER)',
      'Generate embeddings for semantic search',
      'Add metadata tags and provenance'
    ],
    outputs: ['Curated knowledge base', 'Embedding vectors', 'Taxonomy mappings'],
    risks: ['Embedding drift', 'Taxonomy inconsistency', 'Quality degradation']
  },
  {
    id: 'validate',
    name: 'Validate & Test',
    icon: <CheckCircle className="w-5 h-5" />,
    description: 'Ensure data quality meets agent requirements.',
    activities: [
      'Run golden dataset comparisons',
      'Execute adversarial probes',
      'Check coverage against query logs',
      'Validate freshness SLAs'
    ],
    outputs: ['Quality scorecard', 'Test results', 'Coverage reports'],
    risks: ['Silent failures', 'Regression blind spots', 'Metric gaming']
  },
  {
    id: 'serve',
    name: 'Serve & Govern',
    icon: <Shield className="w-5 h-5" />,
    description: 'Expose knowledge to agents with access controls and versioning.',
    activities: [
      'Deploy vector indexes',
      'Configure access policies',
      'Set up versioning and rollback',
      'Monitor query patterns'
    ],
    outputs: ['Production indexes', 'Access logs', 'Version history'],
    risks: ['Latency spikes', 'Unauthorized access', 'Version conflicts']
  }
];

const knowledgeAssets: KnowledgeAsset[] = [
  {
    type: 'Product Documentation',
    description: 'Technical specs, user guides, API references',
    freshness: 'Weekly sync',
    owner: 'Docs Team',
    sla: '< 24h from source update'
  },
  {
    type: 'Policy & Compliance',
    description: 'Legal policies, compliance rules, governance docs',
    freshness: 'On-change + quarterly review',
    owner: 'Legal/Compliance',
    sla: '< 4h for critical updates'
  },
  {
    type: 'Customer Context',
    description: 'Account data, interaction history, preferences',
    freshness: 'Real-time / near-real-time',
    owner: 'Data Platform',
    sla: '< 5 min latency'
  },
  {
    type: 'Domain Expertise',
    description: 'SME knowledge, best practices, tribal knowledge',
    freshness: 'Monthly curation cycles',
    owner: 'Knowledge Stewards',
    sla: 'Quarterly accuracy review'
  },
  {
    type: 'External Sources',
    description: 'Market data, news, third-party APIs',
    freshness: 'Per-source cadence',
    owner: 'Data Partnerships',
    sla: 'Per contract SLA'
  }
];

const qualityDimensions: QualityDimension[] = [
  {
    name: 'Accuracy',
    metric: 'Factual correctness rate',
    target: '> 98%',
    measurement: 'Human spot-checks + automated fact verification'
  },
  {
    name: 'Freshness',
    metric: 'Time since source update',
    target: 'Within SLA per asset type',
    measurement: 'Ingestion timestamp monitoring'
  },
  {
    name: 'Coverage',
    metric: 'Query hit rate',
    target: '> 85% for known topics',
    measurement: 'Retrieval logs + fallback tracking'
  },
  {
    name: 'Consistency',
    metric: 'Cross-source agreement',
    target: '> 95% for overlapping facts',
    measurement: 'Contradiction detection pipeline'
  },
  {
    name: 'Accessibility',
    metric: 'P95 retrieval latency',
    target: '< 200ms',
    measurement: 'APM dashboards'
  }
];

/**
 * Data & Knowledge Operations: building durable supply chains for agent intelligence (2026 Edition).
 */
export default function DataKnowledgeOperationsConcept() {
  const [selectedStage, setSelectedStage] = useState(pipelineStages[0]);

  return (
    <ConceptLayout
      conceptId="data-knowledge-operations"
      title="Data & Knowledge Operations"
      description="Engineer the pipelines that feed agents trustworthy context. Build durable supply chains for agent intelligence in 2026."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">DataOps for AI</Badge>
                </div>
                <h3 className="text-2xl font-bold">Knowledge Supply Chain</h3>
                <p className="text-muted-foreground">
                  Agents are only as good as their context. Build production-grade data pipelines that deliver 
                  accurate, fresh, and governed knowledge to every agent interaction.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-blue-500/10">Data Pipelines</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Knowledge Governance</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Quality Assurance</Badge>
                  <Badge variant="outline" className="bg-amber-500/10">Operational Telemetry</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">4</div>
                  <div className="text-xs text-muted-foreground">Pipeline stages</div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">98%</div>
                  <div className="text-xs text-muted-foreground">Accuracy target</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">&lt;200ms</div>
                  <div className="text-xs text-muted-foreground">Retrieval latency</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="pipeline" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pipeline">Data Pipeline</TabsTrigger>
            <TabsTrigger value="assets">Knowledge Assets</TabsTrigger>
            <TabsTrigger value="quality">Quality Framework</TabsTrigger>
            <TabsTrigger value="operations">Operations Runbook</TabsTrigger>
          </TabsList>

          {/* Data Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {pipelineStages.map((stage) => (
                <Card
                  key={stage.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedStage.id === stage.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedStage(stage)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-primary">{stage.icon}</div>
                    <h4 className="font-medium text-xs">{stage.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {selectedStage.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedStage.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedStage.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-blue-400" /> Activities
                    </h4>
                    <ul className="space-y-2">
                      {selectedStage.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-400" /> Outputs
                    </h4>
                    <ul className="space-y-2">
                      {selectedStage.outputs.map((output, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" /> Risks
                    </h4>
                    <ul className="space-y-2">
                      {selectedStage.risks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pipeline Configuration Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Knowledge Pipeline Configuration
pipeline:
  name: "product-docs-pipeline"
  version: "2.1.0"
  schedule: "0 */6 * * *"  # Every 6 hours

sources:
  - name: "confluence"
    type: "api"
    endpoint: "\${CONFLUENCE_API_URL}"
    auth: "oauth2"
    filters:
      spaces: ["PROD", "ENG", "SUPPORT"]
      updated_after: "\${LAST_RUN_TIMESTAMP}"

  - name: "github-docs"
    type: "git"
    repo: "company/documentation"
    branch: "main"
    paths: ["docs/**/*.md"]

transforms:
  - stage: "extract"
    processor: "markdown_parser"
    config:
      extract_code_blocks: true
      preserve_headers: true

  - stage: "enrich"
    processor: "entity_extractor"
    model: "azure-openai/gpt-4o"
    config:
      entities: ["product", "feature", "api", "version"]

  - stage: "embed"
    processor: "embedding_generator"
    model: "text-embedding-3-large"
    config:
      chunk_size: 512
      chunk_overlap: 50

validation:
  golden_dataset: "s3://knowledge-qa/golden/product-docs.json"
  min_accuracy: 0.95
  freshness_sla_hours: 24

destination:
  type: "azure-ai-search"
  index: "product-knowledge"
  versioning: true
  rollback_on_failure: true`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Knowledge Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" /> Knowledge Asset Registry
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Catalog all knowledge sources with ownership, freshness SLAs, and governance policies.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Asset Type</th>
                        <th className="text-left py-2 px-3">Description</th>
                        <th className="text-left py-2 px-3">Freshness</th>
                        <th className="text-left py-2 px-3">Owner</th>
                        <th className="text-left py-2 px-3">SLA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {knowledgeAssets.map((asset, i) => (
                        <tr key={i} className="border-b border-muted/50">
                          <td className="py-3 px-3 font-medium">{asset.type}</td>
                          <td className="py-3 px-3 text-muted-foreground">{asset.description}</td>
                          <td className="py-3 px-3">
                            <Badge variant="outline" className="text-xs">{asset.freshness}</Badge>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">{asset.owner}</td>
                          <td className="py-3 px-3 text-muted-foreground">{asset.sla}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="w-5 h-5" /> Taxonomy & Ontology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Knowledge Taxonomy Definition
taxonomy:
  name: "enterprise-knowledge-taxonomy"
  version: "3.0.0"
  
  domains:
    - name: "Products"
      children:
        - name: "Features"
          attributes: [description, release_version, status]
        - name: "Pricing"
          attributes: [tier, price, billing_cycle]
        - name: "APIs"
          attributes: [endpoint, method, auth_type, version]
    
    - name: "Policies"
      children:
        - name: "Security"
          attributes: [policy_id, effective_date, compliance_reqs]
        - name: "Privacy"
          attributes: [data_type, retention_period, consent_required]
        - name: "Compliance"
          attributes: [regulation, jurisdiction, requirements]
    
    - name: "Operations"
      children:
        - name: "Procedures"
          attributes: [step_count, approval_required, automation_level]
        - name: "Escalation"
          attributes: [severity, sla_hours, responder_role]

  relationships:
    - from: "Products/Features"
      to: "Products/APIs"
      type: "implemented_by"
    - from: "Policies/Security"
      to: "Products/Features"
      type: "governs"

  governance:
    taxonomy_owner: "Knowledge Architecture Team"
    review_cadence: "quarterly"
    change_process: "RFC with stakeholder approval"`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quality Framework Tab */}
          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-400" /> Quality Dimensions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityDimensions.map((dim, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{dim.name}</h4>
                        <Badge className="bg-green-500/20 text-green-400">{dim.target}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Metric:</p>
                          <p className="text-muted-foreground">{dim.metric}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Measurement:</p>
                          <p className="text-muted-foreground">{dim.measurement}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quality Monitoring Dashboard Query</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="sql">{`-- Knowledge Quality Dashboard Metrics
WITH retrieval_stats AS (
  SELECT
    DATE_TRUNC('hour', query_timestamp) AS hour,
    COUNT(*) AS total_queries,
    SUM(CASE WHEN hit_count > 0 THEN 1 ELSE 0 END) AS hits,
    AVG(latency_ms) AS avg_latency,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_latency
  FROM agent_retrievals
  WHERE query_timestamp > NOW() - INTERVAL '24 hours'
  GROUP BY 1
),
freshness_stats AS (
  SELECT
    asset_type,
    AVG(EXTRACT(EPOCH FROM NOW() - last_updated_at) / 3600) AS avg_staleness_hours,
    MAX(EXTRACT(EPOCH FROM NOW() - last_updated_at) / 3600) AS max_staleness_hours
  FROM knowledge_assets
  GROUP BY 1
),
accuracy_stats AS (
  SELECT
    DATE_TRUNC('day', reviewed_at) AS day,
    AVG(accuracy_score) AS avg_accuracy,
    COUNT(*) AS samples_reviewed
  FROM human_reviews
  WHERE reviewed_at > NOW() - INTERVAL '7 days'
  GROUP BY 1
)
SELECT
  r.hour,
  r.total_queries,
  ROUND(100.0 * r.hits / r.total_queries, 2) AS hit_rate_pct,
  ROUND(r.avg_latency, 0) AS avg_latency_ms,
  ROUND(r.p95_latency, 0) AS p95_latency_ms
FROM retrieval_stats r
ORDER BY r.hour DESC
LIMIT 24;`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Runbook Tab */}
          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" /> Operational Cadences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Daily</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Pipeline health check</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Freshness SLA monitoring</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Query failure review</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Weekly</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Coverage gap analysis</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Human review sampling</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Embedding drift check</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Monthly</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Taxonomy review</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Source license audit</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Capacity planning</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Quarterly</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Full accuracy audit</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Embedding model evaluation</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Stakeholder review</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" /> RACI Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Knowledge Operations RACI

| Activity                    | Data Eng | Knowledge Steward | Platform | Product |
|-----------------------------|----------|-------------------|----------|---------|
| Pipeline development        | R/A      | C                 | C        | I       |
| Source onboarding           | R        | A                 | C        | C       |
| Quality monitoring          | R        | A                 | C        | I       |
| Taxonomy updates            | C        | R/A               | I        | C       |
| Incident response           | R        | C                 | A        | I       |
| Capacity planning           | R        | I                 | A        | C       |
| Stakeholder reporting       | C        | R                 | C        | A       |

Legend: R=Responsible, A=Accountable, C=Consulted, I=Informed`}</CodeBlock>
              </CardContent>
            </Card>

            <ToolkitDownloadButtons
              baseName="knowledge-ops-runbook"
              markdownLabel="Download Knowledge Ops Runbook"
              excelLabel="Download Knowledge Ops Runbook (Excel)"
            />
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
