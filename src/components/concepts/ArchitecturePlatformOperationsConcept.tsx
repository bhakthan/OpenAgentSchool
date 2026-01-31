import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Server,
  Layers,
  Shield,
  Settings,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Clock,
  Database,
  GitBranch,
  Eye,
  Zap,
  Users,
  FileText
} from 'lucide-react';
import ConceptLayout from './ConceptLayout';
import CodeBlock from '@/components/ui/CodeBlock';
import ToolkitDownloadButtons from './ToolkitDownloadButtons';

interface PlatformLayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  components: string[];
  responsibilities: string[];
  antiPatterns: string[];
}

interface PlatformService {
  name: string;
  purpose: string;
  owner: string;
  sla: string;
}

interface OperationalCadence {
  frequency: string;
  activities: string[];
}

const platformLayers: PlatformLayer[] = [
  {
    id: 'infrastructure',
    name: 'Infrastructure Layer',
    icon: <Server className="w-5 h-5" />,
    description: 'Foundational compute, storage, and networking for agent workloads.',
    components: [
      'Kubernetes clusters',
      'GPU pools',
      'Vector databases',
      'Object storage',
      'Load balancers'
    ],
    responsibilities: [
      'Capacity planning and scaling',
      'Cost optimization',
      'Security hardening',
      'Disaster recovery'
    ],
    antiPatterns: [
      'Over-provisioning "just in case"',
      'Ignoring spot/preemptible savings',
      'Single-region deployment',
      'Manual scaling'
    ]
  },
  {
    id: 'platform-services',
    name: 'Platform Services',
    icon: <Layers className="w-5 h-5" />,
    description: 'Shared services that accelerate agent development and deployment.',
    components: [
      'Model registry',
      'Prompt library',
      'Capability catalog',
      'Gateway/router',
      'Secrets management'
    ],
    responsibilities: [
      'Service reliability',
      'API versioning',
      'Self-service enablement',
      'Usage metering'
    ],
    antiPatterns: [
      'Building without demand signal',
      'Forcing adoption top-down',
      'Ignoring developer experience',
      'Inconsistent APIs'
    ]
  },
  {
    id: 'observability',
    name: 'Observability Stack',
    icon: <Eye className="w-5 h-5" />,
    description: 'Comprehensive visibility into agent behavior and system health.',
    components: [
      'Distributed tracing',
      'Log aggregation',
      'Metrics dashboards',
      'Alerting rules',
      'Cost attribution'
    ],
    responsibilities: [
      'Golden signals coverage',
      'Alert quality management',
      'Incident investigation tools',
      'Capacity insights'
    ],
    antiPatterns: [
      'Alert fatigue from noise',
      'Missing trace context',
      'No cost visibility',
      'Dashboard sprawl'
    ]
  },
  {
    id: 'guardrails',
    name: 'Guardrails & Governance',
    icon: <Shield className="w-5 h-5" />,
    description: 'Policy enforcement and safety controls built into the platform.',
    components: [
      'Content safety filters',
      'PII detection',
      'Rate limiters',
      'Approval workflows',
      'Audit logging'
    ],
    responsibilities: [
      'Policy-as-code deployment',
      'Compliance automation',
      'Access control',
      'Evidence collection'
    ],
    antiPatterns: [
      'Bolt-on security after launch',
      'Manual approval bottlenecks',
      'Incomplete audit trails',
      'One-size-fits-all policies'
    ]
  }
];

const platformServices: PlatformService[] = [
  {
    name: 'Model Registry',
    purpose: 'Centralized catalog of approved models with metadata and access controls',
    owner: 'Platform Team',
    sla: '99.9% availability'
  },
  {
    name: 'Gateway/Router',
    purpose: 'Intelligent routing to models with load balancing and fallback',
    owner: 'Platform Team',
    sla: '99.95% availability, <50ms overhead'
  },
  {
    name: 'Prompt Library',
    purpose: 'Versioned, tested prompts with performance baselines',
    owner: 'Platform + Product',
    sla: '99.9% availability'
  },
  {
    name: 'Capability Catalog',
    purpose: 'Discoverable agent capabilities with semantic search',
    owner: 'Platform Team',
    sla: '99.5% availability'
  },
  {
    name: 'Secrets Manager',
    purpose: 'Secure credential storage with rotation and auditing',
    owner: 'Security Team',
    sla: '99.99% availability'
  },
  {
    name: 'Usage & Billing',
    purpose: 'Token tracking, cost attribution, and chargeback',
    owner: 'FinOps + Platform',
    sla: '< 1 hour data freshness'
  }
];

const operationalCadences: Record<string, OperationalCadence> = {
  continuous: {
    frequency: 'Continuous',
    activities: [
      'Automated health checks',
      'Alert monitoring',
      'Capacity autoscaling',
      'Security scanning'
    ]
  },
  daily: {
    frequency: 'Daily',
    activities: [
      'Deployment reviews',
      'Cost anomaly detection',
      'On-call handoff',
      'Incident triage'
    ]
  },
  weekly: {
    frequency: 'Weekly',
    activities: [
      'Platform standup',
      'SLA review',
      'Capacity planning',
      'Backlog grooming'
    ]
  },
  monthly: {
    frequency: 'Monthly',
    activities: [
      'Architecture review',
      'Cost optimization',
      'DR drill',
      'Security audit'
    ]
  },
  quarterly: {
    frequency: 'Quarterly',
    activities: [
      'Platform roadmap update',
      'Stakeholder review',
      'Technology radar refresh',
      'Team retrospective'
    ]
  }
};

/**
 * Architecture & Platform Operations: scaling agent platforms responsibly (2026 Edition).
 */
export default function ArchitecturePlatformOperationsConcept() {
  const [selectedLayer, setSelectedLayer] = useState(platformLayers[0]);

  return (
    <ConceptLayout
      conceptId="architecture-platform-operations"
      title="Architecture & Platform Operations"
      description="Build a platform backbone that keeps advanced agent workloads reliable, secure, and cost-effective."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">Platform Engineering</Badge>
                </div>
                <h3 className="text-2xl font-bold">Agent Platform Operations</h3>
                <p className="text-muted-foreground">
                  Define reference architectures, shared services, and operating rhythms that accelerate 
                  delivery without sacrificing control. Make the right thing the easy thing.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-blue-500/10">Infrastructure</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Platform Services</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Observability</Badge>
                  <Badge variant="outline" className="bg-amber-500/10">Guardrails</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">4</div>
                  <div className="text-xs text-muted-foreground">Platform layers</div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-xs text-muted-foreground">Availability target</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">6</div>
                  <div className="text-xs text-muted-foreground">Core services</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="architecture">Reference Architecture</TabsTrigger>
            <TabsTrigger value="services">Platform Services</TabsTrigger>
            <TabsTrigger value="operations">Operations Runbook</TabsTrigger>
            <TabsTrigger value="automation">Guardrail Automation</TabsTrigger>
          </TabsList>

          {/* Reference Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {platformLayers.map((layer) => (
                <Card
                  key={layer.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedLayer.id === layer.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedLayer(layer)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-primary">{layer.icon}</div>
                    <h4 className="font-medium text-xs">{layer.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {selectedLayer.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedLayer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedLayer.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-400" /> Components
                    </h4>
                    <ul className="space-y-2">
                      {selectedLayer.components.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" /> Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {selectedLayer.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" /> Anti-Patterns
                    </h4>
                    <ul className="space-y-2">
                      {selectedLayer.antiPatterns.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reference Architecture Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Agent Platform Reference Architecture
architecture:
  name: "Enterprise Agent Platform"
  version: "2.0.0"
  tier: "production"

infrastructure:
  compute:
    kubernetes:
      clusters:
        - name: "agent-prod-east"
          region: "eastus"
          node_pools:
            - name: "cpu-general"
              sku: "Standard_D8s_v5"
              min: 3
              max: 20
            - name: "gpu-inference"
              sku: "Standard_NC24ads_A100_v4"
              min: 2
              max: 10
              spot: true
        - name: "agent-prod-west"
          region: "westus2"
          # DR cluster config...

  storage:
    vector_db:
      type: "Azure AI Search"
      sku: "S3"
      replicas: 3
    blob:
      type: "Azure Blob Storage"
      tier: "Hot"
      replication: "GRS"

  networking:
    ingress: "Azure Application Gateway"
    service_mesh: "Istio"
    private_endpoints: true

platform_services:
  model_registry:
    endpoint: "https://models.internal.company.com"
    auth: "managed_identity"
  gateway:
    endpoint: "https://gateway.internal.company.com"
    rate_limits:
      default: 1000  # RPM
      burst: 2000

observability:
  traces: "Azure Application Insights"
  logs: "Azure Log Analytics"
  metrics: "Prometheus + Grafana"
  alerts: "PagerDuty"

guardrails:
  content_safety: "Azure AI Content Safety"
  pii_detection: "Presidio"
  policy_engine: "OPA Gatekeeper"`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platform Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-green-400" /> Core Platform Services
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Shared services that accelerate agent development and ensure consistency.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Service</th>
                        <th className="text-left py-2 px-3">Purpose</th>
                        <th className="text-left py-2 px-3">Owner</th>
                        <th className="text-left py-2 px-3">SLA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {platformServices.map((svc, i) => (
                        <tr key={i} className="border-b border-muted/50">
                          <td className="py-3 px-3 font-medium">{svc.name}</td>
                          <td className="py-3 px-3 text-muted-foreground">{svc.purpose}</td>
                          <td className="py-3 px-3 text-muted-foreground">{svc.owner}</td>
                          <td className="py-3 px-3">
                            <Badge variant="outline" className="text-xs">{svc.sla}</Badge>
                          </td>
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
                  <GitBranch className="w-5 h-5" /> Model Registry Schema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Model Registry Entry
model:
  id: "gpt-4o-2024-08-06"
  provider: "azure-openai"
  
  metadata:
    display_name: "GPT-4o (August 2024)"
    description: "Multimodal model with vision and code capabilities"
    capabilities: ["text", "vision", "function_calling", "json_mode"]
    context_window: 128000
    max_output_tokens: 16384
    
  deployment:
    endpoint: "\${AZURE_OPENAI_ENDPOINT}"
    deployment_name: "gpt-4o-0806"
    api_version: "2024-08-01-preview"
    
  governance:
    status: "approved"
    approval_date: "2024-09-15"
    approved_by: "Security Review Board"
    use_cases: ["general", "code_generation", "analysis"]
    restrictions: ["no_pii", "no_medical_advice"]
    
  performance:
    latency_p50_ms: 450
    latency_p95_ms: 1200
    cost_per_1k_input: 0.005
    cost_per_1k_output: 0.015
    
  monitoring:
    dashboard: "https://grafana.internal/d/models/gpt-4o"
    alerts:
      - name: "high_latency"
        threshold: "p95 > 2000ms"
      - name: "error_rate"
        threshold: "> 1%"`}</CodeBlock>
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(operationalCadences).map(([key, cadence]) => (
                    <div key={key} className="p-4 rounded-lg border bg-background/50">
                      <h4 className="font-semibold mb-2">{cadence.frequency}</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {cadence.activities.map((activity, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" /> {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Incident Response Playbook</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Platform Incident Response

## Severity Levels
| Level | Impact | Response Time | Examples |
|-------|--------|---------------|----------|
| P1 | Total outage | 15 min | Platform down, data breach |
| P2 | Major degradation | 30 min | 50% capacity, key service down |
| P3 | Partial impact | 2 hours | Single agent affected, slow perf |
| P4 | Minor issue | 1 day | Non-critical bug, cosmetic issue |

## P1/P2 Incident Flow
1. [ ] Page on-call (automatic or manual)
2. [ ] Establish incident channel (#incident-YYYYMMDD-HH)
3. [ ] Assign roles: IC, Scribe, Comms
4. [ ] Initial assessment (5 min)
5. [ ] Stakeholder notification (if P1)
6. [ ] Mitigation (rollback, failover, scale)
7. [ ] Status updates every 15 min
8. [ ] Resolution and verification
9. [ ] User communication (if external impact)
10. [ ] Incident report within 48h

## Runbooks by Component
- Model Gateway: /runbooks/gateway.md
- Vector DB: /runbooks/vector-db.md
- Kubernetes: /runbooks/k8s.md
- Observability: /runbooks/observability.md`}</CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" /> Team RACI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Platform Operations RACI

| Activity                    | Platform | SRE | Security | Product | DevOps |
|-----------------------------|----------|-----|----------|---------|--------|
| Infrastructure provisioning | A        | R   | C        | I       | C      |
| Model registry management   | R/A      | C   | C        | C       | I      |
| Gateway operations          | R        | A   | C        | I       | C      |
| Observability stack         | C        | R/A | I        | I       | C      |
| Security controls           | C        | C   | R/A      | I       | C      |
| Incident response           | C        | R/A | C        | I       | C      |
| Capacity planning           | R        | A   | I        | C       | C      |
| Cost optimization           | R        | C   | I        | A       | C      |
| DR testing                  | C        | R/A | C        | I       | C      |

Legend: R=Responsible, A=Accountable, C=Consulted, I=Informed`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guardrail Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" /> Policy-as-Code Framework
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Embed governance directly into the platform through automated policy enforcement.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" /> Pre-Deployment
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Model approval checks</li>
                      <li>• Prompt security scanning</li>
                      <li>• Cost estimation gates</li>
                      <li>• Integration testing</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-400" /> Runtime
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Content safety filtering</li>
                      <li>• PII detection/redaction</li>
                      <li>• Rate limiting</li>
                      <li>• Anomaly detection</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-400" /> Post-Hoc
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Audit log analysis</li>
                      <li>• Usage reporting</li>
                      <li>• Compliance evidence</li>
                      <li>• Cost attribution</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">OPA Policy Example</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="rego">{`# OPA Policy: Agent Deployment Guardrails
package agent.deployment

# Deny deployments without approved model
deny[msg] {
    input.spec.model_id != ""
    not model_approved(input.spec.model_id)
    msg := sprintf("Model '%v' is not in the approved registry", [input.spec.model_id])
}

model_approved(model_id) {
    data.approved_models[_].id == model_id
}

# Deny deployments without cost estimate
deny[msg] {
    not input.spec.cost_estimate
    msg := "Deployment must include cost_estimate"
}

# Deny if estimated cost exceeds budget
deny[msg] {
    input.spec.cost_estimate.monthly > input.spec.budget.monthly_limit
    msg := sprintf(
        "Estimated monthly cost $%v exceeds budget $%v",
        [input.spec.cost_estimate.monthly, input.spec.budget.monthly_limit]
    )
}

# Warn if no rate limits configured
warn[msg] {
    not input.spec.rate_limits
    msg := "Consider adding rate_limits for production deployments"
}

# Warn if no fallback model configured
warn[msg] {
    input.metadata.tier == "production"
    not input.spec.fallback_model
    msg := "Production deployments should have a fallback_model configured"
}`}</CodeBlock>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-green-500/5 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" /> Platform Team Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Make the right thing the easy thing</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Self-service over ticket queues</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Sensible defaults, escape hatches</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Measure adoption and satisfaction</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-red-500/5 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" /> Common Pitfalls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Building platform without customers</li>
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Over-engineering early</li>
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Ignoring developer experience</li>
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Guardrails that only block, never guide</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <ToolkitDownloadButtons
              baseName="platform-operating-model"
              markdownLabel="Download Platform Operating Model Canvas"
              excelLabel="Download Platform Operating Model (Excel)"
            />
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
