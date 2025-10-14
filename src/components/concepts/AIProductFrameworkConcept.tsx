import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as d3 from 'd3'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, ArrowsOutSimple, ArrowsInSimple, Eye, EyeSlash, CheckCircle, ArrowRight } from "@phosphor-icons/react"
import { useTheme } from '@/components/theme/ThemeProvider'

// Data structure for the 8 pillars framework
type Pillar = {
  name: string
  coreRes: string
  actions: string[]
  outcomes: string[]
  businessImpact: string
  caseStudy: {
    context: string
    action: string
    outcome: string
    result: string
  }
}

const PILLARS: Pillar[] = [
  {
    name: "Trust Engineering System",
    coreRes: "Quantify and calibrate user trust through data-driven mechanisms",
    actions: [
      "Implement confidence calibration dashboards tracking if '85% confident' statements are actually correct 85% of the time",
      "Design failure playbooks: 'When confidence <60%, show specific next steps (e.g., 'I can't resolve this – here's who to contact and what info to have ready)'",
      "Build trust decay monitors tracking when users stop using the agent for complex tasks after initial success"
    ],
    outcomes: [
      "Confidence calibration error rate <5%",
      "90% of handoffs to humans include full context (verified by support teams)",
      "<10% user drop-off after first complex interaction"
    ],
    businessImpact: "Turns trust from a vague concept into a KPI that drives retention and reduces support costs by 30-50%",
    caseStudy: {
      context: "Healthcare startup (telemedicine platform)",
      action: "Built confidence calibration dashboards; discovered mental health query accuracy gap (62% vs claimed 90%)",
      outcome: "Retrained with diversified clinical data; '85% confident' now lands 83–87%",
      result: "41% fewer malpractice complaints; 28% higher patient retention; 19% lift in premium conversions"
    }
  },
  {
    name: "Memory Governance Framework",
    coreRes: "Design data retention as ethical and operational choice, not technical convenience",
    actions: [
      "Implement user-controlled memory settings: 'Remember this conversation for 24 hours' toggle with clear expiration",
      "Enforce regulatory-by-design: Automatically purge GDPR/CCPA-sensitive data after 30 days",
      "Build context expiration rules: 'Forget billing issues after payment resolution' rather than indefinite storage"
    ],
    outcomes: [
      "100% compliance with data retention laws",
      "<5% of user queries require repeated context explanation",
      "40% reduction in memory-related infrastructure costs"
    ],
    businessImpact: "Prevents $500k+ GDPR fines while making users feel in control (72% higher satisfaction in tested scenarios)",
    caseStudy: {
      context: "European e-commerce retailer",
      action: "Implemented expirations + memory reset UI",
      outcome: "98% regulated data auto-purged; 73% users used controls",
      result: "Zero GDPR fines; +34% trust score; +12% repeat purchase rate"
    }
  },
  {
    name: "Integration Stewardship",
    coreRes: "Treat integrations as high-risk business decisions, not technical checkboxes",
    actions: [
      "Apply least-privilege access: 'Read-only billing data' vs. full write access by default",
      "Implement cost-to-value scoring: Only integrate systems where ROI > 3x operational cost (e.g., CRM integration costs $20k/month but drives $75k in saved support tickets)",
      "Build failure isolation: 'If CRM is down, agent says 'Billing data unavailable – try again in 1 hour' instead of crashing'"
    ],
    outcomes: [
      "80% of integrations deliver measurable ROI within 90 days",
      "Zero critical failures from integration dependencies",
      "60% reduction in 'API downtime' user complaints"
    ],
    businessImpact: "Prevents $1M+ revenue loss from integration outages while creating defensible user lock-in through calculated depth",
    caseStudy: {
      context: "Fintech neobank",
      action: "Delayed CRM integration until ROI model validated; enforced least privilege",
      outcome: "No payment outage cascades; CRM added only after 140% ROI proof",
      result: "67% fewer downtime complaints; $1.8M engineering debt avoided; +22% CSAT for payment flows"
    }
  },
  {
    name: "Capability Prioritization Matrix",
    coreRes: "Ruthlessly prioritize capabilities that solve end-to-end problems, not feature lists",
    actions: [
      "Map dependency pathways: 'Reset password + update billing' flow must work in single interaction (not two separate skills)",
      "Implement risk-based gating: 'Require human approval for financial transactions' but auto-approve password resets",
      "Enforce feature bloat prevention: Kill any capability where user adoption <5% within 30 days of launch"
    ],
    outcomes: [
      "90% of user queries resolved in ≤2 steps",
      "Zero capabilities with <5% adoption after 60 days",
      "45% higher task completion rate vs. feature-rich competitors"
    ],
    businessImpact: "Turns agents from 'nice-to-have tools' into indispensable workflows (3x higher retention in B2C testing)",
    caseStudy: {
      context: "Enterprise HR SaaS",
      action: "Killed 8 low-adoption features; doubled down on 2 critical flows",
      outcome: "94% queries solved ≤2 steps; no low-adoption residue",
      result: "51% faster resolution; 37% lower support cost; $2.3M new contracts citing workflow depth"
    }
  },
  {
    name: "Human-AI Synergy Design",
    coreRes: "Design how humans and AI complement each other, not just hand off failures",
    actions: [
      "Build context-preserving handoffs: 'Human agent sees: User's flight delayed 4h. AI tried: (1) rebooked to next flight – failed (2) issued $200 voucher – pending approval. Human action needed: Confirm voucher or escalate to supervisor.'",
      "Implement role boundary definitions: 'I can check your account status but cannot approve refunds – here's who can'",
      "Create human feedback loops: 'Support agents tag agent errors → auto-update training data within 4 hours'"
    ],
    outcomes: [
      "85% of human agents report 'sufficient context' for handoffs",
      "30% faster resolution time for escalated issues",
      "50% reduction in 'agent incompetence' complaints"
    ],
    businessImpact: "Turns human support teams from frustrated backup into value-adding partners (20% higher CSAT in financial services case study)",
    caseStudy: {
      context: "Global airline support",
      action: "Structured AI→human escalation packets + feedback loop",
      outcome: "89% agents satisfied with context; 43% fewer repeat questions",
      result: "31% faster complex resolution; $1.1M annual retraining savings"
    }
  },
  {
    name: "Failure Resilience Architecture",
    coreRes: "Design systems where failures are expected, contained, and recoverable",
    actions: [
      "Build silent failure prevention: 'If data source unavailable, say 'Temporary issue – try again in 15 minutes' not 'Error 500''",
      "Implement error recovery patterns: 'Earlier I said X was wrong – here's the correct solution based on new data'",
      "Create edge case taxonomy: Categorize failures into 5 types (ambiguous query, missing data, conflicting instructions, etc.) with predefined responses"
    ],
    outcomes: [
      "95% of failures have clear, actionable next steps",
      "<2% of errors cause permanent user abandonment",
      "40% faster recovery time for system failures"
    ],
    businessImpact: "Prevents viral social media incidents (e.g., 'AI gave wrong medical advice') and reduces crisis response costs by 70%",
    caseStudy: {
      context: "IoT smart home vendor",
      action: "Replaced crashes with recovery narratives + correction pattern",
      outcome: "97% failures guided; 0% abandonment",
      result: "82% fewer 'device broken' tickets; App rating 3.9 → 4.8; +19% renewal"
    }
  },
  {
    name: "Ethical Compliance Layer",
    coreRes: "Bake ethics into every architectural decision, not as an afterthought",
    actions: [
      "Implement bias detection workflows: 'Flag responses where confidence varies by demographic group'",
      "Build regulatory impact assessments: 'This integration requires HIPAA review before launch'",
      "Create audit trail requirements: 'Log every action taken + reason + human approval' for financial/healthcare use cases"
    ],
    outcomes: [
      "Zero compliance violations in regulatory audits",
      "Bias detection rate >90% for high-risk domains",
      "100% of high-risk capabilities have documented ethical review"
    ],
    businessImpact: "Avoids $10M+ fines (e.g., EU AI Act violations) and builds brand trust that drives premium pricing (15-20% higher willingness-to-pay in B2B cases)",
    caseStudy: {
      context: "Recruitment tech platform",
      action: "Implemented demographic variance flags + mandatory legal review",
      outcome: "92% disparity detection before launch; full documentation coverage",
      result: "Zero lawsuits; 33% higher candidate diversity; 27% faster enterprise sales"
    }
  },
  {
    name: "Complexity Governance Model",
    coreRes: "Treat complexity as a cost center, not a feature",
    actions: [
      "Apply technical debt scoring: 'Skill-Based routing adds $12k/month cost – only enable if it reduces ticket resolution time by >30%'",
      "Implement scalability thresholds: 'Single-agent architecture only until >500 concurrent users'",
      "Build cost transparency dashboards: 'This query costs $0.12 – here's why' for internal stakeholders"
    ],
    outcomes: [
      "60% reduction in 'unexplained cost spikes' from architecture changes",
      "Zero complex systems deployed without validated user need",
      "35% lower infrastructure costs vs. 'boiling the ocean' approaches"
    ],
    businessImpact: "Prevents $2M+ in wasted engineering spend on premature complexity (proven in 3 enterprise AI projects)",
    caseStudy: {
      context: "Telecom B2B support",
      action: "Gated multi-agent routing until >30% faster resolution proven",
      outcome: "No unjustified complexity; 28% infra cost reduction",
      result: "$3.7M spend avoided; 51% higher agent adoption among enterprises"
    }
  }
]

// Build hierarchical data for D3
function buildHierarchicalData(pillars: Pillar[]) {
  return {
    name: "AI Product Framework",
    children: pillars.map(p => ({
      name: p.name,
      coreRes: p.coreRes,
      actions: p.actions,
      outcomes: p.outcomes,
      businessImpact: p.businessImpact,
      caseStudy: p.caseStudy,
      children: [
        { name: "Actions", type: "category", children: p.actions.map(a => ({ name: a, type: 'action', leaf: true })) },
        { name: "Outcomes", type: "category", children: p.outcomes.map(o => ({ name: o, type: 'outcome', leaf: true })) },
        { name: "Business Impact", type: "category", children: [{ name: p.businessImpact, type: 'impact', leaf: true }] }
      ]
    }))
  }
}

interface AIProductFrameworkConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AIProductFrameworkConcept({ onMarkComplete, onNavigateToNext }: AIProductFrameworkConceptProps) {
  const { theme } = useTheme()
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(PILLARS[0])
  const [showDetails, setShowDetails] = useState(true)
  const [layoutMode, setLayoutMode] = useState<'large' | 'compact'>('compact')
  const [renderTrigger, setRenderTrigger] = useState(0)
  const rootDataRef = useRef<any>(null)

  // Debug log
  console.log('Component render:', { showDetails, selectedPillar: selectedPillar?.name })

  // Initialize hierarchy once
  useEffect(() => {
    const data = buildHierarchicalData(PILLARS)
    const root = d3.hierarchy(data) as any
    
    // Collapse all pillar children by default
    root.children?.forEach((p: any) => {
      p._children = p.children
      p.children = null
    })
    
    rootDataRef.current = root
    setRenderTrigger(prev => prev + 1)
  }, [])

  // Render D3 tree
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !rootDataRef.current) return

    const svgElement = svgRef.current
    const containerWidth = svgElement.parentElement?.clientWidth || 1200
    const width = containerWidth
    const height = 600
    const margin = { top: 20, right: 90, bottom: 30, left: 90 }

    const svg = d3.select(svgElement)
    svg.selectAll('*').remove()

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    if (!rootDataRef.current) return

    const isDark = theme === 'dark'

    // Compute tree layout
    const verticalSpacing = layoutMode === 'large' ? 100 : 70
    const horizontalSpacing = layoutMode === 'large' ? 280 : 220

    const tree = d3.tree()
      .nodeSize([verticalSpacing, horizontalSpacing])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.3))

    const root = tree(rootDataRef.current)

    // Compute extent for centering
    let xMin = Infinity, xMax = -Infinity
    root.each((n: any) => {
      if (n.x < xMin) xMin = n.x
      if (n.x > xMax) xMax = n.x
    })

    // Draw links
    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        return `M${d.source.y},${d.source.x - xMin + 50}
                C${(d.source.y + d.target.y) / 2},${d.source.x - xMin + 50}
                 ${(d.source.y + d.target.y) / 2},${d.target.x - xMin + 50}
                 ${d.target.y},${d.target.x - xMin + 50}`
      })
      .style('fill', 'none')
      .style('stroke', isDark ? '#555' : '#888')
      .style('stroke-width', '2px')
      .style('stroke-opacity', '0.65')

    // Draw nodes
    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x - xMin + 50})`)
      .style('cursor', 'pointer')
      .on('click', function(event: any, d: any) {
        event.stopPropagation()
        
        console.log('Node clicked:', { depth: d.depth, name: d.data.name, hasCaseStudy: !!d.data.caseStudy })
        
        // If clicking a pillar node, update details panel FIRST
        if (d.depth === 1) {
          const pillarData = PILLARS.find(p => p.name === d.data.name)
          if (pillarData) {
            console.log('Setting selected pillar:', pillarData.name)
            setSelectedPillar(pillarData)
            setShowDetails(true)
          }
        }
        
        // Then toggle expand/collapse
        if (d.children) {
          d._children = d.children
          d.children = null
        } else if (d._children) {
          d.children = d._children
          d._children = null
        }
        
        // Trigger re-render
        setRenderTrigger(prev => prev + 1)
      })

    // Node circles
    node.append('circle')
      .attr('r', (d: any) => {
        if (d.depth === 0) return 14
        if (d.depth === 1) return 11
        if (d.depth === 2) return 8
        return 6
      })
      .style('fill', (d: any) => {
        if (d.depth === 0) return '#e74c3c'
        if (d.depth === 1) return isDark ? '#2471a3' : '#3498db'
        if (d.data.leaf) return isDark ? '#239b56' : '#2ecc71'
        return isDark ? '#2471a3' : '#3498db'
      })
      .style('stroke', (d: any) => {
        if (d.depth === 0) return isDark ? '#992e22' : '#c0392b'
        if (d.depth === 1) return isDark ? '#1b4f72' : '#2980b9'
        if (d.data.leaf) return isDark ? '#1d6f42' : '#27ae60'
        return isDark ? '#1b4f72' : '#2980b9'
      })
      .style('stroke-width', '2px')

    // Node labels
    node.append('text')
      .attr('dy', '.35em')
      .attr('x', (d: any) => (d.children || d._children) ? -16 : 16)
      .style('text-anchor', (d: any) => (d.children || d._children) ? 'end' : 'start')
      .style('font-size', (d: any) => {
        if (d.depth === 0) return '13px'
        if (d.depth === 1) return '11px'
        if (d.depth === 2) return '10px'
        return '9px'
      })
      .style('font-weight', (d: any) => d.depth <= 1 ? 'bold' : 'normal')
      .style('fill', (d: any) => {
        if (d.depth === 0) return '#fff'
        if (d.depth === 1) return isDark ? '#fff' : '#1f2d3a'
        if (d.data.leaf) return isDark ? '#8de6b0' : '#1d5a33'
        return isDark ? '#e3eef4' : '#1f2d3a'
      })
      .text((d: any) => {
        const maxLen = d.depth === 0 ? 30 : (d.depth === 1 ? 22 : 35)
        return d.data.name.length > maxLen ? d.data.name.substring(0, maxLen) + '...' : d.data.name
      })

  }, [theme, layoutMode, renderTrigger])

  const handleExpandAll = useCallback(() => {
    if (!rootDataRef.current) return
    
    function expand(d: any): void {
      if (d._children) {
        d.children = d._children
        d._children = null
      }
      if (d.children) {
        d.children.forEach(expand)
      }
    }
    
    expand(rootDataRef.current)
    setRenderTrigger(prev => prev + 1)
  }, [])

  const handleCollapseAll = useCallback(() => {
    if (!rootDataRef.current) return
    
    // Collapse all children except root
    rootDataRef.current.children?.forEach((p: any) => {
      function collapse(d: any): void {
        if (d.children) {
          d._children = d.children
          d.children = null
        }
        if (d._children) {
          d._children.forEach(collapse)
        }
      }
      collapse(p)
    })
    
    setRenderTrigger(prev => prev + 1)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>AI Product Framework: 8 Pillars for Trust-Centric Design</CardTitle>
              <CardDescription className="mt-2">
                A practical, actionable framework for building trustworthy AI products that drive adoption and reduce risk—from a Product Manager's lens
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Interactive Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Framework Visualization</CardTitle>
          <CardDescription>
            Click nodes to expand/collapse. Click pillar names to view detailed case studies.
          </CardDescription>
          
          {/* Controls */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExpandAll}
            >
              <ArrowsOutSimple className="w-4 h-4 mr-2" />
              Expand All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCollapseAll}
            >
              <ArrowsInSimple className="w-4 h-4 mr-2" />
              Collapse All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLayoutMode(prev => prev === 'large' ? 'compact' : 'large')}
            >
              {layoutMode === 'compact' ? '🔎 Large Mode' : '🧩 Compact Mode'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <EyeSlash className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-6 ${showDetails ? 'grid-cols-1 xl:grid-cols-[1.5fr,1fr]' : 'grid-cols-1'}`}>
            {/* Tree Visualization */}
            <div className="space-y-4">
              <div ref={containerRef} className="w-full overflow-x-auto bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-muted p-6 shadow-inner">
                <svg ref={svgRef}></svg>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 text-sm bg-card rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#e74c3c] ring-2 ring-[#c0392b]"></div>
                  <span className="font-medium">Framework Root</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#3498db] ring-2 ring-[#2980b9]"></div>
                  <span className="font-medium">Core Pillar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#2ecc71] ring-2 ring-[#27ae60]"></div>
                  <span className="font-medium">Leaf Node</span>
                </div>
              </div>
            </div>

            {/* Details Panel - Side by side on large screens */}
            {showDetails && selectedPillar ? (
              <div className="xl:sticky xl:top-20 xl:self-start">
                <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12"></div>
                  
                  <CardHeader className="relative bg-gradient-to-r from-primary/10 to-primary/5 border-b-2 border-primary/20">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center font-bold text-2xl shadow-lg ring-4 ring-primary/20 text-primary-foreground">
                          {PILLARS.indexOf(selectedPillar) + 1}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 ring-2 ring-background flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" weight="fill" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold mb-2">{selectedPillar.name}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">{selectedPillar.coreRes}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                <CardContent className="relative space-y-5 max-h-[600px] overflow-y-auto p-5">
                  {/* Concrete Actions */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/10 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/30">
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <span className="text-lg">⚡</span>
                      Concrete Actions
                    </h3>
                    <ul className="space-y-2 text-xs">
                      {selectedPillar.actions.map((action, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span className="flex-1 leading-relaxed">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Measurable Outcomes */}
                  <div className="bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/30 dark:to-green-950/10 rounded-lg p-4 border border-green-200/50 dark:border-green-800/30">
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-green-700 dark:text-green-300">
                      <span className="text-lg">📊</span>
                      Measurable Outcomes
                    </h3>
                    <ul className="space-y-2 text-xs">
                      {selectedPillar.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-green-500 font-bold mt-0.5">✓</span>
                          <span className="flex-1 leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Impact */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-50/50 dark:from-amber-950/30 dark:to-amber-950/10 rounded-lg p-4 border-2 border-amber-300/50 dark:border-amber-700/30 shadow-sm">
                    <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-300">
                      <span className="text-lg">💼</span>
                      Business Impact
                    </h3>
                    <p className="text-xs leading-relaxed font-medium">{selectedPillar.businessImpact}</p>
                  </div>

                  {/* Case Study */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 dark:from-purple-950/30 dark:to-purple-950/10 rounded-lg p-4 border-2 border-purple-300/50 dark:border-purple-700/30 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs font-bold">📖 Case Study</Badge>
                    </div>
                    <p className="text-xs uppercase tracking-wide font-bold text-purple-700 dark:text-purple-300 mb-3">
                      {selectedPillar.caseStudy.context}
                    </p>
                    <div className="space-y-3 text-xs">
                      <div className="bg-background/50 rounded p-3">
                        <div className="font-bold mb-1 text-purple-600 dark:text-purple-400">Action</div>
                        <p className="leading-relaxed">{selectedPillar.caseStudy.action}</p>
                      </div>
                      <div className="bg-background/50 rounded p-3">
                        <div className="font-bold mb-1 text-purple-600 dark:text-purple-400">Outcome</div>
                        <p className="leading-relaxed">{selectedPillar.caseStudy.outcome}</p>
                      </div>
                      <div className="bg-background/50 rounded p-3">
                        <div className="font-bold mb-1 text-purple-600 dark:text-purple-400">Result</div>
                        <p className="leading-relaxed font-medium">{selectedPillar.caseStudy.result}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            ) : showDetails ? (
              <div className="xl:sticky xl:top-20 xl:self-start">
                <Card className="h-fit border-2 border-dashed border-primary/30 bg-gradient-to-br from-muted/50 to-muted/20">
                  <CardContent className="p-12 text-center">
                    <div className="text-6xl mb-4">👈</div>
                    <p className="text-muted-foreground font-medium text-sm">Click a pillar node in the tree to view detailed case studies and metrics</p>
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* All Pillars Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Framework Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {PILLARS.map((pillar, idx) => (
            <Card 
              key={idx} 
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => { setSelectedPillar(pillar); setShowDetails(true); }}
            >
              <CardHeader className="py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{pillar.name}</CardTitle>
                    <CardDescription className="text-xs">{pillar.coreRes}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button
          onClick={onMarkComplete}
          className="flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Mark Complete
        </Button>
        <Button
          onClick={() => onNavigateToNext?.('a2a-communication')}
          variant="outline"
          className="flex items-center gap-2"
        >
          Next: A2A Communication
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
