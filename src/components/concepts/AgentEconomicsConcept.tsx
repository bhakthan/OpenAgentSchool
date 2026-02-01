import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CurrencyDollar, Calculator, ChartLine, Scales, TrendUp, Factory, ShoppingCart, Users, Bank, Lightbulb, CheckCircle, Warning, Target, ArrowRight } from "@phosphor-icons/react";
import CodeBlock from "@/components/ui/CodeBlock";

interface AgentEconomicsConceptProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const COST_COMPONENTS = [
  {
    category: "Inference Costs",
    description: "The per-request cost of running LLM inference",
    items: [
      { name: "Input Tokens", formula: "(prompt_tokens / 1000) × input_price", example: "$0.01-0.06 per 1K tokens" },
      { name: "Output Tokens", formula: "(completion_tokens / 1000) × output_price", example: "$0.03-0.12 per 1K tokens" },
      { name: "Model Tier", formula: "GPT-4 Turbo: ~$10/1M | Claude: ~$15/1M | GPT-4o: ~$5/1M", example: "Model selection drives 10-100x cost variance" },
      { name: "Caching Discount", formula: "cached_tokens × (1 - cache_discount)", example: "50-90% savings with prompt caching" }
    ]
  },
  {
    category: "Tool & Integration Costs",
    description: "External API calls, database queries, and service integrations",
    items: [
      { name: "API Calls", formula: "calls_per_task × avg_api_cost", example: "$0.001-0.10 per external API call" },
      { name: "Embedding Generation", formula: "chunks × embedding_cost", example: "$0.0001 per 1K tokens" },
      { name: "Vector Search", formula: "queries × search_cost", example: "$0.00001-0.001 per query" },
      { name: "Database Operations", formula: "reads + writes × db_cost", example: "Often negligible vs LLM costs" }
    ]
  },
  {
    category: "Infrastructure Costs",
    description: "Compute, storage, and platform overhead",
    items: [
      { name: "Compute", formula: "instance_hours × hourly_rate", example: "$0.10-2.00/hour depending on scale" },
      { name: "Memory/Storage", formula: "GB_stored × storage_rate", example: "$0.02-0.10 per GB/month" },
      { name: "Network Egress", formula: "GB_transferred × egress_rate", example: "$0.05-0.12 per GB" },
      { name: "Monitoring/Logging", formula: "events × logging_cost", example: "$0.50-2.00 per GB ingested" }
    ]
  },
  {
    category: "Human-in-the-Loop Costs",
    description: "Human oversight, review, and escalation",
    items: [
      { name: "Review Time", formula: "reviews × avg_review_minutes × hourly_rate / 60", example: "$0.50-5.00 per reviewed interaction" },
      { name: "Escalation Handling", formula: "escalations × avg_resolution_time × hourly_rate", example: "$20-100 per escalation" },
      { name: "Quality Assurance", formula: "sample_rate × qa_cost", example: "3-10% of interactions sampled" },
      { name: "Training/Feedback", formula: "feedback_items × labeling_cost", example: "$0.10-1.00 per labeled example" }
    ]
  }
];

const ROI_FRAMEWORK = {
  valueDrivers: [
    { driver: "Time Savings", metric: "Hours saved per task × tasks × hourly_cost", typical: "40-80% time reduction" },
    { driver: "Error Reduction", metric: "Error_rate_delta × cost_per_error", typical: "30-60% error reduction" },
    { driver: "Scale Without Headcount", metric: "Tasks_handled × (human_cost - agent_cost)", typical: "10-100x throughput" },
    { driver: "24/7 Availability", metric: "After_hours_value × availability_hours", typical: "2-3x effective capacity" },
    { driver: "Consistency", metric: "Variance_reduction × quality_premium", typical: "Reduced training costs" },
    { driver: "Customer Satisfaction", metric: "NPS_delta × customer_lifetime_value", typical: "+5-15 NPS points" }
  ],
  costDrivers: [
    { driver: "LLM Inference", percentage: "40-70%", notes: "Largest component; model selection critical" },
    { driver: "Development", percentage: "15-30%", notes: "One-time + ongoing iteration" },
    { driver: "Infrastructure", percentage: "5-15%", notes: "Scales with usage" },
    { driver: "Human Oversight", percentage: "10-25%", notes: "Decreases with maturity" },
    { driver: "Maintenance", percentage: "10-20%", notes: "Prompt tuning, evals, monitoring" }
  ]
};

const PRICING_MODELS = [
  {
    model: "Per-Interaction",
    description: "Charge per conversation, query, or task completion",
    pros: ["Simple to understand", "Aligns with customer value", "Easy to meter"],
    cons: ["Revenue unpredictable", "Discourages usage", "Complex pricing tiers"],
    bestFor: "Customer support, Q&A bots, simple automations",
    example: "$0.10-2.00 per conversation"
  },
  {
    model: "Per-Seat / Subscription",
    description: "Flat monthly fee per user or team",
    pros: ["Predictable revenue", "Encourages adoption", "Simple billing"],
    cons: ["Over/under-usage risk", "Harder to tier", "May need usage caps"],
    bestFor: "Productivity copilots, internal tools, enterprise licenses",
    example: "$20-200/user/month"
  },
  {
    model: "Outcome-Based",
    description: "Charge based on measurable business outcomes",
    pros: ["Highest value alignment", "Premium pricing", "Strong ROI story"],
    cons: ["Hard to measure", "Longer sales cycles", "Attribution challenges"],
    bestFor: "Sales agents, lead gen, revenue-generating automations",
    example: "% of deals closed, $ per qualified lead"
  },
  {
    model: "Usage-Based (Tokens/Credits)",
    description: "Charge for actual compute consumption",
    pros: ["Fair pricing", "Scales with usage", "Transparent"],
    cons: ["Unpredictable bills", "Requires education", "Churn risk"],
    bestFor: "Developer APIs, platform providers, B2B infrastructure",
    example: "$X per 1M tokens or credits"
  },
  {
    model: "Hybrid",
    description: "Base subscription + usage overages",
    pros: ["Predictable base", "Captures power users", "Flexible"],
    cons: ["Complex pricing page", "Requires usage monitoring"],
    bestFor: "Enterprise products, mixed use cases",
    example: "$500/mo includes 10K tasks, $0.05 per additional"
  }
];

const MAKE_VS_BUY = [
  {
    dimension: "Time to Value",
    build: "6-18 months to production quality",
    buy: "Days to weeks for integration",
    recommendation: "Buy if time-to-market is critical"
  },
  {
    dimension: "Customization",
    build: "Full control over behavior and UX",
    buy: "Limited to vendor's configuration options",
    recommendation: "Build if core differentiation; Buy for commodity features"
  },
  {
    dimension: "Total Cost (3-year)",
    build: "High upfront, lower marginal (if successful)",
    buy: "Lower upfront, predictable ongoing",
    recommendation: "Build at scale; Buy for small-medium volume"
  },
  {
    dimension: "Talent Requirements",
    build: "ML engineers, prompt engineers, ops",
    buy: "Integration developers, product managers",
    recommendation: "Buy if AI talent is scarce or expensive"
  },
  {
    dimension: "Risk Profile",
    build: "High execution risk, full IP ownership",
    buy: "Vendor risk, faster de-risking",
    recommendation: "Buy to validate market, Build after product-market fit"
  },
  {
    dimension: "Data Sensitivity",
    build: "Full control over data handling",
    buy: "Depends on vendor's data policies",
    recommendation: "Build for sensitive/regulated data"
  }
];

const UNIT_ECONOMICS = `# Agent Unit Economics Calculator

def calculate_unit_economics(
    # Revenue side
    price_per_task: float,        # What you charge
    tasks_per_month: int,         # Volume
    
    # Cost side
    avg_input_tokens: int = 2000,
    avg_output_tokens: int = 500,
    input_price_per_1k: float = 0.01,
    output_price_per_1k: float = 0.03,
    tool_calls_per_task: int = 2,
    tool_cost_per_call: float = 0.01,
    human_review_rate: float = 0.05,
    review_cost: float = 2.00,
    infra_cost_per_task: float = 0.001
):
    # Per-task costs
    llm_cost = (
        (avg_input_tokens / 1000 * input_price_per_1k) +
        (avg_output_tokens / 1000 * output_price_per_1k)
    )
    tool_cost = tool_calls_per_task * tool_cost_per_call
    human_cost = human_review_rate * review_cost
    total_cost_per_task = llm_cost + tool_cost + human_cost + infra_cost_per_task
    
    # Unit economics
    gross_margin_per_task = price_per_task - total_cost_per_task
    gross_margin_pct = (gross_margin_per_task / price_per_task) * 100
    
    # Monthly projections
    monthly_revenue = price_per_task * tasks_per_month
    monthly_cogs = total_cost_per_task * tasks_per_month
    monthly_gross_profit = monthly_revenue - monthly_cogs
    
    return {
        "cost_breakdown": {
            "llm": llm_cost,
            "tools": tool_cost,
            "human": human_cost,
            "infra": infra_cost_per_task,
            "total": total_cost_per_task
        },
        "unit_economics": {
            "revenue_per_task": price_per_task,
            "cost_per_task": total_cost_per_task,
            "margin_per_task": gross_margin_per_task,
            "margin_percentage": gross_margin_pct
        },
        "monthly": {
            "revenue": monthly_revenue,
            "cogs": monthly_cogs,
            "gross_profit": monthly_gross_profit
        }
    }

# Example: Customer support agent
result = calculate_unit_economics(
    price_per_task=0.50,      # Charge $0.50 per resolved ticket
    tasks_per_month=10000,    # 10K tickets/month
)
print(f"Gross Margin: {result['unit_economics']['margin_percentage']:.1f}%")
print(f"Monthly Profit: \${result['monthly']['gross_profit']:.2f}")`;

const TCO_FRAMEWORK = [
  {
    phase: "Year 0: Development",
    buildCost: "$150-500K",
    buyCost: "$10-50K",
    notes: "Initial development, PoC, integration"
  },
  {
    phase: "Year 1: Launch & Scale",
    buildCost: "$200-400K",
    buyCost: "$50-200K",
    notes: "Ops team, iteration, scaling costs"
  },
  {
    phase: "Year 2-3: Maturity",
    buildCost: "$100-250K/year",
    buyCost: "$100-300K/year",
    notes: "Ongoing maintenance, usage costs"
  },
  {
    phase: "3-Year TCO",
    buildCost: "$550K-1.4M",
    buyCost: "$260K-750K",
    notes: "Build wins at high scale; Buy wins at low-medium"
  }
];

export default function AgentEconomicsConcept({ onMarkComplete, onNavigateToNext }: AgentEconomicsConceptProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <CurrencyDollar className="w-4 h-4" /> },
    { id: "cost-breakdown", label: "Cost Breakdown", icon: <Calculator className="w-4 h-4" /> },
    { id: "roi-framework", label: "ROI Framework", icon: <TrendUp className="w-4 h-4" /> },
    { id: "pricing-models", label: "Pricing Models", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "make-vs-buy", label: "Make vs Buy", icon: <Scales className="w-4 h-4" /> },
    { id: "unit-economics", label: "Unit Economics", icon: <ChartLine className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <CurrencyDollar className="w-6 h-6" />
            Agent Economics
          </CardTitle>
          <CardDescription>
            Cost models, pricing strategies, and ROI frameworks for agent investments—what enterprises need before approving budgets.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-background"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CurrencyDollar className="w-5 h-5 text-green-500" />
                The Business Case for Agents
              </CardTitle>
              <CardDescription>
                Understanding agent economics is the difference between a successful deployment and a budget black hole.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Real-World Analogy */}
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Think: Hiring a New Employee vs Contractor
                </h4>
                <p className="text-sm text-foreground">
                  Agents have similar economics to workforce decisions. Upfront investment (training/development), 
                  ongoing costs (salary/inference), productivity multipliers (output/hour), and total cost of ownership 
                  over time. The key question is the same: "At what scale does this investment pay off?"
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Cost per Task", value: "$0.01-10", icon: <Calculator className="w-4 h-4" />, color: "text-blue-500" },
                  { label: "Target Margin", value: "60-80%", icon: <TrendUp className="w-4 h-4" />, color: "text-green-500" },
                  { label: "Payback Period", value: "3-12 mo", icon: <ChartLine className="w-4 h-4" />, color: "text-purple-500" },
                  { label: "ROI Range", value: "200-1000%", icon: <Target className="w-4 h-4" />, color: "text-orange-500" }
                ].map((metric) => (
                  <div key={metric.label} className="p-4 border rounded-lg text-center">
                    <div className={`flex justify-center mb-2 ${metric.color}`}>{metric.icon}</div>
                    <div className="text-xl font-bold">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* The Economics Equation */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-3">The Agent Economics Equation</h4>
                <div className="font-mono text-sm space-y-2">
                  <div className="p-2 bg-background rounded">
                    <span className="text-green-600 dark:text-green-400">Agent ROI</span> = 
                    (<span className="text-blue-600 dark:text-blue-400">Value Created</span> - 
                    <span className="text-red-600 dark:text-red-400">Total Cost</span>) / 
                    <span className="text-red-600 dark:text-red-400">Total Cost</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Where Value = (Time Saved × Hourly Rate) + (Errors Avoided × Error Cost) + (Scale × Opportunity Cost)
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Warning className="w-4 h-4 text-yellow-500" />
                  Common Economic Mistakes
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { mistake: "Ignoring token costs at scale", fix: "Model cost projections at 10x, 100x volume" },
                    { mistake: "Underestimating human oversight", fix: "Budget 10-25% for review/escalation" },
                    { mistake: "Not accounting for iteration cycles", fix: "Include 3-6 months of prompt tuning costs" },
                    { mistake: "Comparing to human costs only", fix: "Factor in quality, consistency, and availability" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">❌ {item.mistake}</div>
                      <div className="text-sm text-green-600 dark:text-green-400">✓ {item.fix}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Breakdown Tab */}
        <TabsContent value="cost-breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Agent Cost Components
              </CardTitle>
              <CardDescription>
                Every dollar that goes into running an agent system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {COST_COMPONENTS.map((category, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50">
                    <h4 className="font-semibold">{category.category}</h4>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Component</th>
                          <th className="text-left p-2">Formula</th>
                          <th className="text-left p-2">Typical Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, i) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="p-2 font-medium">{item.name}</td>
                            <td className="p-2 font-mono text-xs text-muted-foreground">{item.formula}</td>
                            <td className="p-2">{item.example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI Framework Tab */}
        <TabsContent value="roi-framework" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp className="w-5 h-5" />
                ROI Framework
              </CardTitle>
              <CardDescription>
                Value drivers and cost drivers to build your business case
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">Value Drivers</h4>
                  <div className="space-y-2">
                    {ROI_FRAMEWORK.valueDrivers.map((item, idx) => (
                      <div key={idx} className="p-3 border border-green-200 dark:border-green-800 rounded-lg bg-green-50/50 dark:bg-green-950/20">
                        <div className="font-medium text-sm">{item.driver}</div>
                        <div className="text-xs font-mono text-muted-foreground mt-1">{item.metric}</div>
                        <Badge variant="secondary" className="mt-2 text-xs">{item.typical}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400">Cost Drivers</h4>
                  <div className="space-y-2">
                    {ROI_FRAMEWORK.costDrivers.map((item, idx) => (
                      <div key={idx} className="p-3 border border-red-200 dark:border-red-800 rounded-lg bg-red-50/50 dark:bg-red-950/20">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{item.driver}</span>
                          <Badge variant="outline">{item.percentage}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{item.notes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3-Year TCO Comparison */}
              <div>
                <h4 className="font-semibold mb-3">3-Year Total Cost of Ownership</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Phase</th>
                        <th className="text-left p-2">Build In-House</th>
                        <th className="text-left p-2">Buy/Integrate</th>
                        <th className="text-left p-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TCO_FRAMEWORK.map((row, idx) => (
                        <tr key={idx} className={idx === TCO_FRAMEWORK.length - 1 ? "bg-muted/50 font-semibold" : "border-b"}>
                          <td className="p-2">{row.phase}</td>
                          <td className="p-2 text-orange-600 dark:text-orange-400">{row.buildCost}</td>
                          <td className="p-2 text-blue-600 dark:text-blue-400">{row.buyCost}</td>
                          <td className="p-2 text-muted-foreground text-xs">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Models Tab */}
        <TabsContent value="pricing-models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Agent Pricing Models
              </CardTitle>
              <CardDescription>
                How to price your agent products and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {PRICING_MODELS.map((model, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{model.model}</h4>
                      <Badge variant="outline">{model.example}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                  </div>
                  <div className="p-4 grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Pros</h5>
                      <ul className="text-sm space-y-1">
                        {model.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 mt-1 text-green-500" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Cons</h5>
                      <ul className="text-sm space-y-1">
                        {model.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Warning className="w-3 h-3 mt-1 text-red-500" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Best For</h5>
                      <p className="text-sm text-muted-foreground">{model.bestFor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Make vs Buy Tab */}
        <TabsContent value="make-vs-buy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scales className="w-5 h-5" />
                Make vs Buy Decision Framework
              </CardTitle>
              <CardDescription>
                When to build custom agents vs integrate existing solutions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {MAKE_VS_BUY.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">{item.dimension}</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                      <div className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">BUILD</div>
                      <div className="text-sm">{item.build}</div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">BUY</div>
                      <div className="text-sm">{item.buy}</div>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">RECOMMENDATION</div>
                      <div className="text-sm">{item.recommendation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Unit Economics Tab */}
        <TabsContent value="unit-economics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="w-5 h-5" />
                Unit Economics Calculator
              </CardTitle>
              <CardDescription>
                Calculate the profitability of your agent deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CodeBlock language="python" showLineNumbers>{UNIT_ECONOMICS}</CodeBlock>
              
              {/* Example Scenarios */}
              <div>
                <h4 className="font-semibold mb-3">Example Scenarios</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      name: "Customer Support Agent", 
                      price: "$0.50/ticket", 
                      cost: "$0.08/ticket",
                      margin: "84%",
                      volume: "10K/month",
                      profit: "$4,200/month"
                    },
                    { 
                      name: "Sales Research Agent", 
                      price: "$5.00/lead", 
                      cost: "$0.75/lead",
                      margin: "85%",
                      volume: "2K/month",
                      profit: "$8,500/month"
                    },
                    { 
                      name: "Document Processing Agent", 
                      price: "$2.00/doc", 
                      cost: "$0.35/doc",
                      margin: "82.5%",
                      volume: "5K/month",
                      profit: "$8,250/month"
                    }
                  ].map((scenario, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-2">{scenario.name}</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium text-green-600">{scenario.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost:</span>
                          <span className="font-medium text-red-600">{scenario.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Margin:</span>
                          <span className="font-medium">{scenario.margin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Volume:</span>
                          <span>{scenario.volume}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-medium">Monthly Profit:</span>
                          <span className="font-bold text-green-600">{scenario.profit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}









