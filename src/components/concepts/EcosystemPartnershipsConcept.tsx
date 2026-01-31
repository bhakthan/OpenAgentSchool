import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Handshake,
  Building2,
  Globe,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Star,
  Users,
  FileText,
  Link,
  GitBranch,
  Heart
} from 'lucide-react';
import ConceptLayout from './ConceptLayout';
import CodeBlock from '@/components/ui/CodeBlock';
import ToolkitDownloadButtons from './ToolkitDownloadButtons';

interface PartnerCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  examples: string[];
  evaluationCriteria: string[];
  riskFactors: string[];
}

interface PartnerScore {
  dimension: string;
  weight: number;
  questions: string[];
}

interface IntegrationPattern {
  name: string;
  description: string;
  bestFor: string;
  complexity: 'low' | 'medium' | 'high';
}

const partnerCategories: PartnerCategory[] = [
  {
    id: 'platform',
    name: 'Platform Vendors',
    icon: <Building2 className="w-5 h-5" />,
    description: 'Major cloud and AI platform providers offering foundational infrastructure.',
    examples: ['Azure OpenAI', 'AWS Bedrock', 'Google Vertex AI', 'Anthropic API'],
    evaluationCriteria: [
      'Model quality and diversity',
      'Enterprise security and compliance',
      'Geographic availability',
      'Pricing predictability'
    ],
    riskFactors: [
      'Vendor lock-in potential',
      'Deprecation of models/features',
      'Rate limits at scale',
      'Data residency constraints'
    ]
  },
  {
    id: 'tooling',
    name: 'Tooling & Frameworks',
    icon: <GitBranch className="w-5 h-5" />,
    description: 'Open-source and commercial tools for agent development and orchestration.',
    examples: ['LangChain', 'Semantic Kernel', 'AutoGen', 'CrewAI', 'LlamaIndex'],
    evaluationCriteria: [
      'Community health and velocity',
      'Documentation quality',
      'Production readiness',
      'Extensibility'
    ],
    riskFactors: [
      'Maintainer burnout',
      'Breaking API changes',
      'Security vulnerabilities',
      'Licensing changes'
    ]
  },
  {
    id: 'data',
    name: 'Data & Knowledge',
    icon: <Globe className="w-5 h-5" />,
    description: 'Providers of specialized data, knowledge bases, and content APIs.',
    examples: ['Wolfram Alpha', 'News APIs', 'Domain-specific datasets', 'Knowledge graphs'],
    evaluationCriteria: [
      'Data quality and accuracy',
      'Update frequency',
      'Coverage depth',
      'API reliability'
    ],
    riskFactors: [
      'Content licensing issues',
      'Bias in source data',
      'Service discontinuation',
      'Cost escalation'
    ]
  },
  {
    id: 'integration',
    name: 'Integration Partners',
    icon: <Link className="w-5 h-5" />,
    description: 'Systems and services agents need to connect with for real-world actions.',
    examples: ['CRM systems', 'ERP platforms', 'Communication tools', 'Payment gateways'],
    evaluationCriteria: [
      'API maturity and stability',
      'Authentication options',
      'Webhook/event support',
      'Sandbox availability'
    ],
    riskFactors: [
      'API version deprecation',
      'Rate limiting policies',
      'Data sync reliability',
      'Support responsiveness'
    ]
  },
  {
    id: 'community',
    name: 'Community & Research',
    icon: <Heart className="w-5 h-5" />,
    description: 'Open-source communities, research labs, and industry consortia.',
    examples: ['Hugging Face', 'AI research labs', 'Industry working groups', 'Standards bodies'],
    evaluationCriteria: [
      'Alignment with mission',
      'Contribution opportunities',
      'Knowledge sharing value',
      'Network effects'
    ],
    riskFactors: [
      'Governance changes',
      'Competitive dynamics',
      'IP contamination',
      'Resource drain'
    ]
  }
];

const partnerScorecard: PartnerScore[] = [
  {
    dimension: 'Reliability',
    weight: 25,
    questions: [
      'What is their uptime SLA?',
      'How do they handle incidents?',
      'What is their track record?'
    ]
  },
  {
    dimension: 'Security & Compliance',
    weight: 25,
    questions: [
      'What certifications do they hold?',
      'How do they handle data?',
      'What audit capabilities exist?'
    ]
  },
  {
    dimension: 'Strategic Alignment',
    weight: 20,
    questions: [
      'Does their roadmap align with ours?',
      'Are they committed to the space?',
      'Do they share our values?'
    ]
  },
  {
    dimension: 'Technical Fit',
    weight: 15,
    questions: [
      'How well do they integrate?',
      'Is the API well-designed?',
      'Do they support our stack?'
    ]
  },
  {
    dimension: 'Commercial Terms',
    weight: 15,
    questions: [
      'Is pricing predictable?',
      'What are exit costs?',
      'Are SLAs enforceable?'
    ]
  }
];

const integrationPatterns: IntegrationPattern[] = [
  {
    name: 'API Gateway',
    description: 'Centralized integration layer that abstracts partner APIs.',
    bestFor: 'Multiple integrations with consistent patterns',
    complexity: 'medium'
  },
  {
    name: 'Event-Driven',
    description: 'Webhooks and message queues for async communication.',
    bestFor: 'Real-time updates and loose coupling',
    complexity: 'medium'
  },
  {
    name: 'SDK Wrapper',
    description: 'Thin abstraction over partner SDKs for portability.',
    bestFor: 'Single vendor with potential swap-out',
    complexity: 'low'
  },
  {
    name: 'Federated',
    description: 'Partner services remain autonomous, coordinated via protocols.',
    bestFor: 'Multi-party ecosystems with shared standards',
    complexity: 'high'
  }
];

/**
 * Ecosystem & Partnerships: evaluating vendors and collaborating with the community (2026 Edition).
 */
export default function EcosystemPartnershipsConcept() {
  const [selectedCategory, setSelectedCategory] = useState(partnerCategories[0]);

  const complexityColors = {
    low: 'bg-green-500/20 text-green-400',
    medium: 'bg-amber-500/20 text-amber-400',
    high: 'bg-red-500/20 text-red-400'
  };

  return (
    <ConceptLayout
      conceptId="ecosystem-partnerships"
      title="Ecosystem & Partnerships"
      description="Scale faster by partnering wisely. Assess third-party tools, communities, and alliances for 2026."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">Partner Intelligence</Badge>
                </div>
                <h3 className="text-2xl font-bold">Strategic Ecosystem Management</h3>
                <p className="text-muted-foreground">
                  No agent succeeds alone. Build a partner ecosystem that accelerates delivery, shares risk, 
                  and creates moats through network effects—while maintaining strategic optionality.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-blue-500/10">Platform Vendors</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Tooling & Frameworks</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Data Partners</Badge>
                  <Badge variant="outline" className="bg-amber-500/10">Community</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">5</div>
                  <div className="text-xs text-muted-foreground">Partner categories</div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">5</div>
                  <div className="text-xs text-muted-foreground">Evaluation dimensions</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">4</div>
                  <div className="text-xs text-muted-foreground">Integration patterns</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="categories">Partner Categories</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation Framework</TabsTrigger>
            <TabsTrigger value="integration">Integration Patterns</TabsTrigger>
            <TabsTrigger value="community">Community Strategy</TabsTrigger>
          </TabsList>

          {/* Partner Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {partnerCategories.map((cat) => (
                <Card
                  key={cat.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedCategory.id === cat.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-primary">{cat.icon}</div>
                    <h4 className="font-medium text-xs">{cat.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {selectedCategory.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedCategory.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedCategory.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-xs text-muted-foreground uppercase">Examples</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory.examples.map((ex, i) => (
                      <Badge key={i} variant="outline">{ex}</Badge>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" /> Evaluation Criteria
                    </h4>
                    <ul className="space-y-2">
                      {selectedCategory.evaluationCriteria.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" /> Risk Factors
                    </h4>
                    <ul className="space-y-2">
                      {selectedCategory.riskFactors.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evaluation Framework Tab */}
          <TabsContent value="evaluation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" /> Partner Scorecard
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Weighted evaluation framework for consistent partner assessment.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partnerScorecard.map((dim, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{dim.dimension}</h4>
                        <Badge className="bg-primary/20 text-primary">{dim.weight}%</Badge>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {dim.questions.map((q, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <BarChart3 className="w-3 h-3 text-muted-foreground" /> {q}
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
                <CardTitle className="text-lg">Partner Evaluation Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Partner Evaluation Assessment
partner:
  name: "Example AI Platform"
  category: "platform_vendor"
  evaluated_by: "Platform Team"
  evaluation_date: "2026-01-15"

scoring:
  reliability:
    weight: 25
    score: 4  # 1-5 scale
    notes: "99.9% SLA, good incident communication"
    evidence: ["sla_document.pdf", "incident_history.xlsx"]

  security_compliance:
    weight: 25
    score: 5
    notes: "SOC2 Type II, HIPAA BAA available, GDPR compliant"
    evidence: ["soc2_report.pdf", "baa_template.pdf"]

  strategic_alignment:
    weight: 20
    score: 4
    notes: "Roadmap aligns well, strong enterprise focus"
    evidence: ["roadmap_briefing.pptx"]

  technical_fit:
    weight: 15
    score: 4
    notes: "Good SDK, REST API, some gaps in streaming"
    evidence: ["integration_poc.md"]

  commercial_terms:
    weight: 15
    score: 3
    notes: "Pricing reasonable, 2-year commitment required"
    evidence: ["pricing_proposal.pdf", "contract_draft.pdf"]

overall:
  weighted_score: 4.1  # Out of 5
  recommendation: "approve"
  conditions:
    - "Negotiate shorter commitment term"
    - "Require streaming API roadmap commitment"
  review_date: "2026-07-15"`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Patterns Tab */}
          <TabsContent value="integration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="w-5 h-5 text-blue-400" /> Integration Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {integrationPatterns.map((pattern, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{pattern.name}</h4>
                        <Badge className={complexityColors[pattern.complexity]}>
                          {pattern.complexity} complexity
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                      <p className="text-xs"><span className="font-medium">Best for:</span> {pattern.bestFor}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Integration Contract Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Partner Integration Contract
contract:
  partner: "CRM System"
  integration_type: "api_gateway"
  version: "1.0.0"
  effective_date: "2026-02-01"

sla:
  availability: "99.5%"
  response_time_p95: "500ms"
  support_hours: "24x7"
  escalation_path:
    - level: 1
      contact: "support@partner.com"
      response: "4h"
    - level: 2
      contact: "account-manager@partner.com"
      response: "1h"

data_handling:
  pii_allowed: false
  data_residency: "US, EU"
  retention: "90 days"
  encryption: "TLS 1.3, AES-256 at rest"
  audit_logging: true

rate_limits:
  requests_per_second: 100
  burst: 200
  quota_per_month: 10_000_000
  overage_policy: "throttle"

change_management:
  notice_period: "90 days"
  breaking_changes: "12 months support for deprecated APIs"
  testing_environment: "sandbox.partner.com"

exit_strategy:
  data_export: "JSON bulk export within 30 days"
  contract_termination: "90 days notice"
  transition_support: "Included for 60 days"`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Strategy Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" /> Community Engagement Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Handshake className="w-4 h-4 text-green-400" /> Contribution Strategy
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Bug fixes to dependencies</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Documentation improvements</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Feature contributions (with IP review)</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Sample code and tutorials</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-400" /> Knowledge Sharing
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-blue-400" /> Blog posts and case studies</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-blue-400" /> Conference talks</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-blue-400" /> Open datasets (where appropriate)</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-blue-400" /> Research collaborations</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-400" /> IP Protection
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><AlertTriangle className="w-3 h-3 text-amber-400" /> CLA for all contributions</li>
                      <li className="flex items-center gap-2"><AlertTriangle className="w-3 h-3 text-amber-400" /> Legal review for sensitive areas</li>
                      <li className="flex items-center gap-2"><AlertTriangle className="w-3 h-3 text-amber-400" /> Competitive intelligence monitoring</li>
                      <li className="flex items-center gap-2"><AlertTriangle className="w-3 h-3 text-amber-400" /> Trade secret training</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" /> Standards Participation
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-purple-400" /> W3C Web Agent CG</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-purple-400" /> MCP/ACP working groups</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-purple-400" /> Industry consortia</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-purple-400" /> Regulatory advisory boards</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ecosystem Health Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Ecosystem Health Metrics

## Partner Health (Monthly Review)
| Partner Category | Active | At Risk | Churned | Net Score |
|-----------------|--------|---------|---------|-----------|
| Platform Vendors | 3 | 0 | 0 | +1 |
| Tooling/Frameworks | 5 | 1 | 1 | +3 |
| Data Partners | 4 | 0 | 0 | +2 |
| Integrations | 8 | 2 | 0 | +6 |

## Community Engagement (Quarterly)
- Contributions Made: 45 PRs, 12 issues filed
- Contributions Received: 23 PRs from community
- Conference Talks: 3
- Blog Posts Published: 8
- Downloads/Forks of Our OSS: 15,000

## Standards Participation
- Working Groups Active: 3
- Proposals Submitted: 2
- Proposals Adopted: 1

## Risk Register
| Risk | Mitigation | Status |
|------|------------|--------|
| LangChain 1.0 breaking changes | Abstraction layer in place | Mitigated |
| Azure OpenAI quota limits | Multi-provider fallback | In Progress |
| Data partner cost increase | Negotiation started | Monitoring |`}</CodeBlock>
              </CardContent>
            </Card>

            <ToolkitDownloadButtons
              baseName="partnership-evaluation-canvas"
              markdownLabel="Download Partnership Evaluation Canvas"
              excelLabel="Download Partnership Evaluation (Excel)"
            />
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
