import { Building2, TrendingUp, Clock, Code, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  teamSize: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  patternsUsed: string[];
  timeline: string;
  quote: string;
  author: string;
  role: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'enterprise-saas',
    company: 'Enterprise SaaS Platform',
    industry: 'B2B Software',
    teamSize: '12 engineers',
    challenge: 'Customer success team drowning in manual ticket triage and response generation. 2-week prototyping cycles made experimentation prohibitively slow.',
    solution: 'Adopted Pattern Fluency and Architecture Templates. Built production-ready routing agent in 2 hours using Microsoft Agent Framework template. Parallelized ticket analysis with batch processing pattern.',
    metrics: [
      {
        label: 'Prototype Time',
        before: '2 weeks',
        after: '2 hours',
        improvement: '168x faster'
      },
      {
        label: 'Code Complexity',
        before: '500 LOC',
        after: '50 LOC',
        improvement: '90% reduction'
      },
      {
        label: 'Time to Production',
        before: '6 weeks',
        after: '1 week',
        improvement: '6x faster'
      }
    ],
    patternsUsed: ['Routing', 'Prompt Chaining', 'Parallelization', 'Agentic RAG'],
    timeline: '3 months from pilot to full rollout',
    quote: 'We went from "can we build this?" to "which variant performs better?" in a single sprint. Pattern Fluency gave us a shared language, and templates eliminated the blank-page problem.',
    author: 'Sarah Chen',
    role: 'VP Engineering'
  },
  {
    id: 'global-bank',
    company: 'Global Investment Bank',
    industry: 'Financial Services',
    teamSize: '8 engineers',
    challenge: 'Regulatory constraints and security requirements made agent development complex. Each project started from scratch with custom security wrappers and audit trails.',
    solution: 'Built reusable Architecture Templates with policy-gated tool invocation and evaluation automation baked in. Created Failure Scenario Libraries for compliance edge cases.',
    metrics: [
      {
        label: 'Agent Velocity',
        before: '1 agent/quarter',
        after: '3 agents/quarter',
        improvement: '3x throughput'
      },
      {
        label: 'Compliance Issues',
        before: '12 / year',
        after: '2 / year',
        improvement: '83% reduction'
      },
      {
        label: 'Template Reuse',
        before: '0%',
        after: '95%',
        improvement: '95% reuse rate'
      }
    ],
    patternsUsed: ['Policy-Gated Invocation', 'Evaluator-Optimizer', 'Budget-Constrained Execution', 'Self-Reflection'],
    timeline: '6 months to establish templates, now standard practice',
    quote: 'Our templates encode years of hard-won compliance knowledge. New agents inherit security, auditability, and cost controls by default. We\'re no longer reinventing the wheel—we\'re shipping faster and safer.',
    author: 'Marcus Johnson',
    role: 'Head of AI Platform'
  },
  {
    id: 'startup-mvp',
    company: 'AI-First Startup',
    industry: 'Legal Tech',
    teamSize: '3 engineers',
    challenge: 'Tiny team needed to ship customer-ready MVP in 72 hours for investor demo. No time for custom infrastructure or extensive testing.',
    solution: 'Went all-in on high-velocity patterns and operational instrumentation. Used Prompt Chaining + Routing + Modern Tool Use. Deployed with Azure Application Insights for instant observability.',
    metrics: [
      {
        label: 'MVP Development',
        before: 'N/A (greenfield)',
        after: '72 hours',
        improvement: 'Beat 2-week estimate'
      },
      {
        label: 'Debugging Time',
        before: 'N/A',
        after: '15 min/issue',
        improvement: 'Instant traces'
      },
      {
        label: 'Customer-Ready',
        before: 'N/A',
        after: '1 week',
        improvement: 'Demo → Production in 7 days'
      }
    ],
    patternsUsed: ['Prompt Chaining', 'Routing', 'Modern Tool Use', 'ReAct Agent'],
    timeline: '72 hours to MVP, 1 week to production',
    quote: 'With 3 people, we couldn\'t afford to waste time on infrastructure. High-velocity patterns and instant observability meant we spent 90% of our time on product, not plumbing.',
    author: 'Alex Kim',
    role: 'Co-Founder & CTO'
  }
];

export default function VelocityCaseStudies() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Agent Velocity Engineering Case Studies
        </h1>
        <p className="text-lg text-gray-600">
          Real-world examples of teams achieving 3-10x velocity improvements through systematic practice adoption
        </p>
      </div>

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <div
          key={study.id}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {study.company}
                </h2>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 bg-white rounded-full text-gray-700 border border-gray-200">
                    {study.industry}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-gray-700 border border-gray-200">
                    {study.teamSize}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-gray-700 border border-gray-200">
                    {study.timeline}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Challenge
                </h3>
                <p className="text-gray-700">{study.challenge}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Solution
                </h3>
                <p className="text-gray-700">{study.solution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Impact Metrics
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {study.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm text-gray-500 line-through">{metric.before}</span>
                      <span className="text-xl font-bold text-gray-900">{metric.after}</span>
                    </div>
                    <div className="text-sm font-medium text-green-600">{metric.improvement}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patterns Used */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Patterns Applied
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.patternsUsed.map((pattern, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <div className="text-4xl text-purple-300 mb-2">"</div>
              <blockquote className="text-gray-800 italic mb-4 text-lg">
                {study.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {study.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{study.author}</div>
                  <div className="text-sm text-gray-600">{study.role}, {study.company}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Achieve Similar Results?</h2>
        <p className="text-purple-100 mb-6 text-lg">
          Start with our Agent Velocity Engineering assessment to identify your biggest opportunities.
          Then explore the 48 patterns with velocity profiles to build your team's practice.
        </p>
        <div className="flex gap-4">
          <a
            href="/ai-skills"
            className="px-6 py-3 bg-white text-purple-900 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Take Velocity Assessment
          </a>
          <a
            href="/patterns"
            className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors border border-purple-500"
          >
            Explore Patterns
          </a>
        </div>
      </div>
    </div>
  );
}
