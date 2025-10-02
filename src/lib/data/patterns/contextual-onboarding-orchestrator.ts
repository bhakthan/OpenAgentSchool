import { PatternData } from './types';
import ContextualOnboardingVisual from '@/components/visualization/business-use-cases/ContextualOnboardingVisual';
import ContextualOnboardingLiveRunner from '@/components/live-runners/ContextualOnboardingLiveRunner';

export const contextualOnboardingOrchestratorPattern: PatternData = {
  id: 'contextual-onboarding-orchestrator',
  name: 'Contextual Onboarding Orchestrator with Persistent Memory',
  description: 'Multi-agent workflow using Microsoft Agent Framework with hybrid memory management (context summarization + trimming) to guide enterprise employees through weeks-long onboarding with preserved context, specialized domain agents, and human-in-the-loop checkpointing.',
  category: 'Multi-Agent',
  relatedPatterns: ['session-based-orchestrator', 'task-specialist-swarm', 'human-in-the-loop-verification', 'hierarchical-document-intelligence'],
  
  businessUseCase: {
    industry: 'Enterprise HR & Knowledge Management',
    description: 'A Fortune 500 technology company onboards 500+ knowledge workers annually across engineering, product, and sales. The Contextual Onboarding Orchestrator uses Microsoft Agent Framework with persistent memory to guide new hires through 2-4 week onboarding journeys. (1) **Memory Manager Agent** maintains employee profile summaries (role, department, completed steps, preferences) via context summarization while trimming recent Q&A turns, (2) **Routing Agent** classifies questions and routes to specialized agents, (3) **HR Policy Agent** answers benefits, PTO, compliance questions with policy document RAG, (4) **DevOps Setup Agent** guides tool installations with environment-specific instructions, (5) **Project Context Agent** explains team goals, codebases, and current initiatives, (6) **Culture Agent** shares company values, team dynamics, and unwritten norms. Framework features include: graph-based workflow orchestration, checkpoint/resume for multi-day sessions, human-in-the-loop for manager approvals, time-travel debugging for HR to review problematic onboarding journeys, and OpenTelemetry traces for analytics. **Business impact:** 60% reduction in manager onboarding time, 40% faster time-to-first-commit for engineers, 85% employee satisfaction, and data-driven insights into onboarding bottlenecks.',
    visualization: ContextualOnboardingVisual,
    enlightenMePrompt: 'Explain how hybrid memory management (summarization + trimming) and multi-agent orchestration solve the challenge of long-running, multi-domain onboarding conversations spanning weeks while staying within context limits.'
  },

  nodes: [
    { id: 'input', type: 'input', data: { label: 'Employee Question', nodeType: 'input' }, position: { x: 50, y: 300 } },
    { id: 'memory', type: 'default', data: { label: 'Memory Manager', description: 'Hybrid summarization + trimming', nodeType: 'tool' }, position: { x: 300, y: 100 } },
    { id: 'router', type: 'default', data: { label: 'Routing Agent', description: 'Question classifier', nodeType: 'planner' }, position: { x: 300, y: 300 } },
    { id: 'checkpoint', type: 'default', data: { label: 'Checkpoint Store', description: 'Session persistence', nodeType: 'tool' }, position: { x: 300, y: 500 } },
    { id: 'hr', type: 'default', data: { label: 'HR Policy Agent', description: 'Benefits, PTO, compliance', nodeType: 'llm' }, position: { x: 600, y: 100 } },
    { id: 'devops', type: 'default', data: { label: 'DevOps Agent', description: 'Tool setup, access', nodeType: 'llm' }, position: { x: 600, y: 200 } },
    { id: 'project', type: 'default', data: { label: 'Project Context Agent', description: 'Team goals, codebase', nodeType: 'llm' }, position: { x: 600, y: 300 } },
    { id: 'culture', type: 'default', data: { label: 'Culture Agent', description: 'Norms, values', nodeType: 'llm' }, position: { x: 600, y: 400 } },
    { id: 'human', type: 'default', data: { label: 'Human-in-Loop', description: 'Manager approval', nodeType: 'evaluator' }, position: { x: 900, y: 250 } },
    { id: 'telemetry', type: 'default', data: { label: 'Telemetry', description: 'OpenTelemetry traces', nodeType: 'tool' }, position: { x: 900, y: 400 } },
    { id: 'output', type: 'output', data: { label: 'Contextual Response', nodeType: 'output' }, position: { x: 1150, y: 250 } }
  ],

  edges: [
    { id: 'e1', source: 'input', target: 'router', animated: true },
    { id: 'e2', source: 'router', target: 'memory', label: 'load context', animated: true },
    { id: 'e3', source: 'memory', target: 'hr', label: 'profile + recent Q&A', animated: true },
    { id: 'e4', source: 'memory', target: 'devops', label: 'profile + recent Q&A', animated: true },
    { id: 'e5', source: 'memory', target: 'project', label: 'profile + recent Q&A', animated: true },
    { id: 'e6', source: 'memory', target: 'culture', label: 'profile + recent Q&A', animated: true },
    { id: 'e7', source: 'router', target: 'hr', label: 'HR query', animated: true },
    { id: 'e8', source: 'router', target: 'devops', label: 'tech query', animated: true },
    { id: 'e9', source: 'router', target: 'project', label: 'project query', animated: true },
    { id: 'e10', source: 'router', target: 'culture', label: 'culture query', animated: true },
    { id: 'e11', source: 'hr', target: 'human', label: 'PTO approval', animated: true, style: { strokeDasharray: '5 5' } },
    { id: 'e12', source: 'human', target: 'output', animated: true },
    { id: 'e13', source: 'devops', target: 'output', animated: true },
    { id: 'e14', source: 'project', target: 'output', animated: true },
    { id: 'e15', source: 'culture', target: 'output', animated: true },
    { id: 'e16', source: 'hr', target: 'output', animated: true },
    { id: 'e17', source: 'output', target: 'memory', label: 'update', animated: true, style: { strokeDasharray: '5 5' } },
    { id: 'e18', source: 'output', target: 'checkpoint', label: 'save state', animated: true, style: { strokeDasharray: '5 5' } },
    { id: 'e19', source: 'router', target: 'telemetry', label: 'track', animated: true, style: { strokeDasharray: '5 5' } },
    { id: 'e20', source: 'checkpoint', target: 'router', label: 'resume session', animated: true, style: { strokeDasharray: '5 5' } }
  ],

  useCases: [
    'Enterprise knowledge worker onboarding (engineering, product, sales)',
    'Executive onboarding with strategic context',
    'Customer success rep training with product + CRM knowledge',
    'Healthcare clinician orientation with compliance + EHR systems',
    'Academic faculty onboarding with institutional knowledge',
    'Retail manager training with operations + systems',
    'Manufacturing technician training with safety + equipment'
  ],

  whenToUse: 'Use when onboarding spans multiple days/weeks, requires context from previous sessions, involves multiple knowledge domains (HR, tech, culture, projects), needs human approvals/escalations, and requires analytics on common pain points. Ideal when employee profiles must be preserved long-term but recent troubleshooting can be trimmed.',

  advantages: [
    'Hybrid memory: summarized profiles + trimmed recent Q&A balances context retention and token efficiency',
    'Microsoft Agent Framework provides graph-based orchestration with built-in checkpointing',
    'Multi-agent specialization improves accuracy (HR agent uses policy RAG, DevOps uses runbooks)',
    'Human-in-the-loop for critical approvals (PTO requests, access grants) with preserved context',
    'Time-travel debugging lets HR review entire onboarding journey for process improvements',
    'OpenTelemetry traces provide analytics: common questions, bottlenecks, agent success rates',
    'Checkpoint/resume enables async onboarding (employee asks questions over days/weeks)',
    'Structured memory prevents "forgetting" employee role, department, preferences',
    'Graph workflows enable complex routing logic (escalation paths, conditional branches)',
    'Observable via DevUI for real-time debugging during development'
  ],

  limitations: [
    'Requires Microsoft Agent Framework infrastructure (graph executor, checkpoint stores)',
    'Summarization can lose nuance in edge cases (hallucination control needed)',
    'Initial setup complexity: 4+ specialized agents + routing logic',
    'Human-in-the-loop adds latency for approval-required actions',
    'Context summarization refresh costs tokens periodically',
    'Needs careful prompt engineering for summarizer to preserve critical details',
    'Graph workflow design requires understanding of data flow patterns',
    'OpenTelemetry infrastructure for production observability'
  ],

  implementation: [
    'Step 1: Install Microsoft Agent Framework (`pip install agent-framework --prerelease=allow`) and set up Azure OpenAI endpoint.',
    'Step 2: Design hybrid memory session: use context summarization for employee profile (role, department, completed onboarding steps, preferences) and context trimming for recent Q&A (keep last 3 turns).',
    'Step 3: Create Memory Manager agent with SummarizingSession (keep_last_n_turns=3, context_limit=5) using structured summary prompt (Employee Profile, Completed Steps, Current Blockers, Next Recommended Action).',
    'Step 4: Build Routing Agent with question classification prompt and routing logic to specialized agents (HR, DevOps, Project, Culture).',
    'Step 5: Implement HR Policy Agent with RAG (vector search over HR documents) + generation.',
    'Step 6: Implement DevOps Setup Agent with environment-specific tool installation runbooks.',
    'Step 7: Implement Project Context Agent with team document summaries and current sprint goals.',
    'Step 8: Implement Culture Agent with company values, team norms, and cultural FAQs.',
    'Step 9: Design graph workflow using Agent Framework\'s workflow engine: route → memory load → specialized agent → human approval (if needed) → response → memory update → checkpoint.',
    'Step 10: Add checkpoint stores (Redis or file-based) for session resumption across days.',
    'Step 11: Implement human-in-the-loop nodes for manager approvals (PTO, access requests).',
    'Step 12: Configure OpenTelemetry for distributed tracing (question classification accuracy, agent latency, human approval times).',
    'Step 13: Add time-travel debugging: store all workflow states for HR to review.',
    'Step 14: Test with real onboarding scenarios: multi-day sessions, context preservation, escalation paths.',
    'Step 15: Deploy with DevUI for monitoring and live debugging during rollout.'
  ],

  codeExample: `// Microsoft Agent Framework - Contextual Onboarding Orchestrator
import asyncio
from agent_framework.azure import AzureOpenAIResponsesClient
from agent_framework.workflow import Workflow, Node, Edge
from agent_framework.checkpoints import RedisCheckpointStore
from azure.identity import AzureCliCredential
import logging

# Configure telemetry
logging.basicConfig(level=logging.INFO)

# ============= MEMORY MANAGEMENT =============

class SummarizingSession:
    """
    Hybrid memory: summarize old context (employee profile) + trim recent Q&A.
    Based on OpenAI Agents SDK session memory patterns.
    """
    def __init__(self, keep_last_n_turns=3, context_limit=5, employee_id=None):
        self.keep_last_n_turns = keep_last_n_turns
        self.context_limit = context_limit
        self.employee_id = employee_id
        self._history = []  # Full history
        self._profile_summary = None  # Structured employee profile
        
    async def add_turn(self, user_msg: str, assistant_msg: str):
        """Add a conversation turn and trigger summarization if needed."""
        self._history.append({"role": "user", "content": user_msg})
        self._history.append({"role": "assistant", "content": assistant_msg})
        
        # Count user turns
        user_turns = sum(1 for msg in self._history if msg["role"] == "user")
        
        # Trigger summarization when exceeding context_limit
        if user_turns > self.context_limit:
            await self._summarize_profile()
    
    async def _summarize_profile(self):
        """
        Compress older turns into structured employee profile summary.
        Keep last N turns verbatim.
        """
        user_turns = [i for i, msg in enumerate(self._history) if msg["role"] == "user"]
        
        if len(user_turns) <= self.keep_last_n_turns:
            return  # Nothing to summarize yet
        
        # Find boundary: keep last N turns, summarize everything before
        boundary_idx = user_turns[-self.keep_last_n_turns]
        old_context = self._history[:boundary_idx]
        
        # Summarization prompt (OpenAI cookbook pattern)
        summary_prompt = """
You are an onboarding assistant manager. Compress the employee's onboarding history into a structured profile.

**Employee Profile Summary Format:**
• **Role & Department:** [Title, team, manager name]
• **Completed Onboarding Steps:** [Bullet list of finished tasks with dates]
• **Current Blockers:** [Issues preventing progress]
• **Preferences & Notes:** [Communication style, timezone, special accommodations]
• **Next Recommended Action:** [Single most important next step]

**Conversation History:**
{history}

**Rules:**
- Be concise, use bullets
- Preserve critical details (names, dates, access IDs)
- Note blockers explicitly
- Do not hallucinate; mark uncertain info as "UNVERIFIED"
"""
        
        history_text = "\\n".join([f"{msg['role'].upper()}: {msg['content']}" for msg in old_context])
        
        # Call LLM to summarize (simplified - use actual Azure OpenAI client)
        # self._profile_summary = await llm_call(summary_prompt.format(history=history_text))
        self._profile_summary = "[Summarized profile placeholder]"
        
        # Replace old context with summary
        self._history = [
            {"role": "user", "content": "Summarize my onboarding progress so far."},
            {"role": "assistant", "content": self._profile_summary}
        ] + self._history[boundary_idx:]
    
    async def get_context(self):
        """Return context for LLM: summary + recent turns."""
        return self._history


# ============= SPECIALIZED AGENTS =============

async def create_routing_agent(client):
    """Routing Agent: Classifies questions and routes to specialists."""
    return client.create_agent(
        name="RoutingAgent",
        instructions="""You are an onboarding routing assistant.
        
Classify the employee's question into ONE category:
- HR: Benefits, PTO, compliance, payroll, policies
- DEVOPS: Tool installations, access requests, system setup, credentials
- PROJECT: Team goals, codebase, current work, sprint planning
- CULTURE: Company values, team norms, communication styles, unwritten rules

Respond with ONLY the category name (HR, DEVOPS, PROJECT, or CULTURE).
"""
    )


async def create_hr_agent(client):
    """HR Policy Agent: Answers benefits, PTO, compliance questions."""
    return client.create_agent(
        name="HRPolicyAgent",
        instructions="""You are an HR policy expert with access to company benefits docs.
        
When answering:
1. Cite specific policy sections
2. For PTO requests, calculate available days and check manager approval needed
3. For compliance questions, reference exact regulations
4. Be empathetic and clear
5. Escalate to manager if: PTO >5 days, special accommodations, salary questions

Format responses with:
- Direct answer
- Policy reference (cite section/page)
- Next steps (if action required)
"""
    )


async def create_devops_agent(client):
    """DevOps Setup Agent: Guides tool installations."""
    return client.create_agent(
        name="DevOpsAgent",
        instructions="""You are a DevOps specialist helping with tool setup.
        
When helping with installations:
1. Provide OS-specific steps (Windows/Mac/Linux)
2. Include troubleshooting for common errors
3. Generate temporary access credentials (notify security team)
4. Verify environment prerequisites
5. Link to detailed runbooks for complex setups

Always include:
- Step-by-step instructions
- Expected output at each step
- Links to internal docs
- Who to contact if blocked (with @ mentions)
"""
    )


async def create_project_agent(client):
    """Project Context Agent: Explains team goals, codebase."""
    return client.create_agent(
        name="ProjectContextAgent",
        instructions="""You are a project onboarding guide.
        
Help new team members understand:
1. Team mission and current OKRs
2. Codebase architecture (repos, services, dependencies)
3. Current sprint goals and priorities
4. How their role fits into the bigger picture
5. Key stakeholders and communication channels

For codebase questions:
- Link to architecture docs
- Suggest starter issues (good first issues)
- Explain testing/deployment processes
- Point to code walkthroughs or videos
"""
    )


async def create_culture_agent(client):
    """Culture Agent: Shares company values, unwritten norms."""
    return client.create_agent(
        name="CultureAgent",
        instructions="""You are a culture guide sharing company DNA.
        
Topics you cover:
1. Core values and how they show up daily
2. Communication norms (email vs Slack vs meetings)
3. Work-life balance expectations
4. Team traditions and rituals
5. Unwritten rules (e.g., meeting etiquette, Friday happy hours)
6. Diversity & inclusion practices

Be warm, authentic, and share real examples (anonymized).
"""
    )


# ============= WORKFLOW ORCHESTRATION =============

async def build_onboarding_workflow():
    """Build graph-based workflow with Microsoft Agent Framework."""
    
    # Initialize Azure OpenAI client
    client = AzureOpenAIResponsesClient(
        endpoint="https://your-endpoint.openai.azure.com/",
        deployment_name="gpt-5",
        api_version="2025-03-01-preview",
        credential=AzureCliCredential(),
    )
    
    # Create specialized agents
    router = await create_routing_agent(client)
    hr_agent = await create_hr_agent(client)
    devops_agent = await create_devops_agent(client)
    project_agent = await create_project_agent(client)
    culture_agent = await create_culture_agent(client)
    
    # Memory session (hybrid: summarize profile + trim Q&A)
    memory = SummarizingSession(
        keep_last_n_turns=3,
        context_limit=5,
        employee_id="emp_12345"
    )
    
    # Checkpoint store for session persistence
    checkpoint_store = RedisCheckpointStore(
        redis_url="redis://localhost:6379",
        session_id="onboarding_emp_12345"
    )
    
    # Workflow graph
    workflow = Workflow(name="ContextualOnboarding")
    
    # Nodes
    workflow.add_node("input", type="input")
    workflow.add_node("router", agent=router)
    workflow.add_node("hr", agent=hr_agent)
    workflow.add_node("devops", agent=devops_agent)
    workflow.add_node("project", agent=project_agent)
    workflow.add_node("culture", agent=culture_agent)
    workflow.add_node("human_approval", type="human_in_the_loop")  # For manager approvals
    workflow.add_node("output", type="output")
    
    # Edges (data flow)
    workflow.add_edge("input", "router")
    workflow.add_conditional_edge(
        "router",
        route_by_category,  # Function that routes based on classification
        {
            "HR": "hr",
            "DEVOPS": "devops",
            "PROJECT": "project",
            "CULTURE": "culture"
        }
    )
    workflow.add_edge("hr", "human_approval", condition="requires_manager_approval")
    workflow.add_edge("hr", "output", condition="no_approval_needed")
    workflow.add_edge("devops", "output")
    workflow.add_edge("project", "output")
    workflow.add_edge("culture", "output")
    workflow.add_edge("human_approval", "output")
    
    # Checkpoint edges (save/resume)
    workflow.add_checkpoint("output", checkpoint_store)
    
    return workflow, memory


def route_by_category(state):
    """Route to appropriate specialist based on classification."""
    category = state.get("category", "CULTURE")  # Default to culture if unclear
    return category


# ============= MAIN EXECUTION =============

async def main():
    workflow, memory = await build_onboarding_workflow()
    
    # Employee question (could be resumed from checkpoint)
    employee_question = "I need to take 3 days of PTO next month. How do I request it?"
    
    # Load context from memory
    context = await memory.get_context()
    
    # Execute workflow
    result = await workflow.run({
        "question": employee_question,
        "context": context,
        "employee_id": "emp_12345"
    })
    
    # Update memory with new turn
    await memory.add_turn(employee_question, result["response"])
    
    print(f"Response: {result['response']}")
    print(f"Agent Used: {result['agent_used']}")
    print(f"Requires Manager Approval: {result.get('needs_approval', False)}")
    
    # Telemetry (OpenTelemetry traces auto-collected by Agent Framework)


if __name__ == "__main__":
    asyncio.run(main())`,

  completeCode: `"""
Contextual Onboarding Orchestrator - Complete Implementation
Microsoft Agent Framework with Hybrid Memory Management

Architecture:
- Memory Manager: Hybrid (summarized profile + trimmed recent Q&A)
- 4 Specialist Agents: HR, DevOps, Project, Culture
- Routing Agent: Question classifier
- Human-in-the-Loop: Manager approvals
- Checkpoint/Resume: Multi-day session persistence
- OpenTelemetry: Observability and analytics
"""

import asyncio
from typing import Dict, List, Optional
from azure.ai.agent import (
    AzureOpenAIResponsesClient,
    SummarizingSession,
    Workflow,
    Agent
)
from azure.identity import AzureCliCredential
from redis import Redis


# ============= MEMORY MANAGEMENT =============

class HybridMemoryManager:
    """
    Hybrid memory: Summarized employee profile + trimmed recent Q&A
    
    Profile Layer: Persistent structured summary
    - Role, department, seniority
    - Completed onboarding steps
    - Current blockers
    - Preferences
    
    Conversation Layer: Recent turns only (keep last 3)
    - Full question + answer pairs
    - Context for immediate follow-ups
    - Auto-trim after threshold
    """
    
    def __init__(self, employee_id: str, redis_client: Redis):
        self.employee_id = employee_id
        self.redis = redis_client
        self.profile_key = f"profile:{employee_id}"
        self.turns_key = f"turns:{employee_id}"
        
    async def get_context(self) -> Dict:
        """Load hybrid context: profile + recent turns."""
        profile = self.redis.hgetall(self.profile_key) or {}
        recent_turns = self.redis.lrange(self.turns_key, -3, -1)  # Last 3 turns
        
        return {
            "profile": {
                "role": profile.get("role", "Unknown"),
                "department": profile.get("department", "Unknown"),
                "completed_steps": eval(profile.get("completed_steps", "[]")),
                "current_blocker": profile.get("current_blocker", ""),
                "preferences": eval(profile.get("preferences", "{}"))
            },
            "recent_turns": [eval(turn) for turn in recent_turns]
        }
    
    async def add_turn(self, question: str, answer: str):
        """Add new Q&A turn, trim if needed."""
        turn = {"question": question, "answer": answer, "timestamp": asyncio.get_event_loop().time()}
        self.redis.rpush(self.turns_key, str(turn))
        
        # Trim to last 3 turns
        turn_count = self.redis.llen(self.turns_key)
        if turn_count > 3:
            self.redis.ltrim(self.turns_key, -3, -1)
    
    async def update_profile(self, updates: Dict):
        """Update employee profile summary."""
        for key, value in updates.items():
            self.redis.hset(self.profile_key, key, str(value))


# ============= SPECIALIZED AGENTS =============

async def create_routing_agent(client):
    """Routing Agent: Classifies questions and routes to specialists."""
    return client.create_agent(
        name="RoutingAgent",
        instructions="""You are an onboarding routing assistant.
        
Classify the employee's question into ONE category:
- HR: Benefits, PTO, compliance, payroll, policies
- DEVOPS: Tool installations, access requests, system setup, credentials
- PROJECT: Team goals, codebase, current work, sprint planning
- CULTURE: Company values, team norms, communication styles, unwritten rules

Respond with ONLY the category name (HR, DEVOPS, PROJECT, or CULTURE).
"""
    )


async def create_hr_agent(client):
    """HR Policy Agent: Answers benefits, PTO, compliance questions."""
    return client.create_agent(
        name="HRPolicyAgent",
        instructions="""You are an HR policy expert with access to company benefits docs.
        
When answering:
1. Cite specific policy sections
2. For PTO requests, calculate available days and check manager approval needed
3. For compliance questions, reference exact regulations
4. Be empathetic and clear
5. Escalate to manager if: PTO >5 days, special accommodations, salary questions

Format responses with:
- Direct answer
- Policy reference (cite section/page)
- Next steps (if action required)
"""
    )


async def create_devops_agent(client):
    """DevOps Setup Agent: Guides tool installations."""
    return client.create_agent(
        name="DevOpsAgent",
        instructions="""You are a DevOps specialist helping with tool setup.
        
When helping with installations:
1. Provide OS-specific steps (Windows/Mac/Linux)
2. Include troubleshooting for common errors
3. Generate temporary access credentials (notify security team)
4. Verify environment prerequisites
5. Link to detailed runbooks for complex setups

Always include:
- Step-by-step instructions
- Expected output at each step
- Links to internal docs
- Who to contact if blocked (with @ mentions)
"""
    )


async def create_project_agent(client):
    """Project Context Agent: Explains team goals, codebase."""
    return client.create_agent(
        name="ProjectContextAgent",
        instructions="""You are a project onboarding guide.
        
Help new team members understand:
1. Team mission and current OKRs
2. Codebase architecture (repos, services, dependencies)
3. Current sprint goals and priorities
4. How their role fits into the bigger picture
5. Key stakeholders and communication channels

For codebase questions:
- Link to architecture docs
- Suggest starter issues (good first issues)
- Explain testing/deployment processes
- Point to code walkthroughs or videos
"""
    )


async def create_culture_agent(client):
    """Culture Agent: Shares company values, unwritten norms."""
    return client.create_agent(
        name="CultureAgent",
        instructions="""You are a culture guide sharing company DNA.
        
Topics you cover:
1. Core values and how they show up daily
2. Communication norms (email vs Slack vs meetings)
3. Work-life balance expectations
4. Team traditions and rituals
5. Unwritten rules (e.g., meeting etiquette, Friday happy hours)
6. Diversity & inclusion practices

Be warm, authentic, and share real examples (anonymized).
"""
    )


# ============= WORKFLOW ORCHESTRATION =============

async def build_onboarding_workflow():
    """Build graph-based workflow with Microsoft Agent Framework."""
    
    # Initialize Azure OpenAI client
    client = AzureOpenAIResponsesClient(
        endpoint="https://your-endpoint.openai.azure.com/",
        deployment_name="gpt-5",
        api_version="2025-03-01-preview",
        credential=AzureCliCredential(),
    )
    
    # Create specialized agents
    router = await create_routing_agent(client)
    hr_agent = await create_hr_agent(client)
    devops_agent = await create_devops_agent(client)
    project_agent = await create_project_agent(client)
    culture_agent = await create_culture_agent(client)
    
    # Memory manager (hybrid: profile + recent turns)
    redis_client = Redis(host='localhost', port=6379, decode_responses=True)
    memory = HybridMemoryManager(employee_id="emp_12345", redis_client=redis_client)
    
    # Workflow graph
    workflow = Workflow(name="ContextualOnboarding")
    
    # Nodes
    workflow.add_node("input", type="input")
    workflow.add_node("router", agent=router)
    workflow.add_node("hr", agent=hr_agent)
    workflow.add_node("devops", agent=devops_agent)
    workflow.add_node("project", agent=project_agent)
    workflow.add_node("culture", agent=culture_agent)
    workflow.add_node("human_approval", type="human_in_the_loop")  # For manager approvals
    workflow.add_node("output", type="output")
    
    # Edges (data flow)
    workflow.add_edge("input", "router")
    workflow.add_conditional_edge(
        "router",
        route_by_category,  # Function that routes based on classification
        {
            "HR": "hr",
            "DEVOPS": "devops",
            "PROJECT": "project",
            "CULTURE": "culture"
        }
    )
    workflow.add_edge("hr", "human_approval", condition="requires_manager_approval")
    workflow.add_edge("hr", "output", condition="no_approval_needed")
    workflow.add_edge("devops", "output")
    workflow.add_edge("project", "output")
    workflow.add_edge("culture", "output")
    workflow.add_edge("human_approval", "output")
    
    return workflow, memory


def route_by_category(state):
    """Route to appropriate specialist based on classification."""
    category = state.get("category", "CULTURE")  # Default to culture if unclear
    return category


# ============= MAIN EXECUTION =============

async def main():
    workflow, memory = await build_onboarding_workflow()
    
    # Employee question (could be resumed from checkpoint)
    employee_question = "I need to take 3 days of PTO next month. How do I request it?"
    
    # Load context from memory
    context = await memory.get_context()
    
    print(f"\\n=== Employee Profile ===")
    print(f"Role: {context['profile']['role']}")
    print(f"Department: {context['profile']['department']}")
    print(f"Completed Steps: {', '.join(context['profile']['completed_steps'])}")
    print(f"Recent Turns: {len(context['recent_turns'])}\\n")
    
    # Execute workflow
    result = await workflow.run({
        "question": employee_question,
        "context": context,
        "employee_id": "emp_12345"
    })
    
    # Update memory with new turn
    await memory.add_turn(employee_question, result["response"])
    
    # Update profile if new steps completed
    if "PTO request" in result["response"]:
        await memory.update_profile({
            "completed_steps": context['profile']['completed_steps'] + ["PTO request process"]
        })
    
    print(f"\\n=== Response ===")
    print(f"Agent: {result['agent_used']}")
    print(f"Response: {result['response']}")
    print(f"Requires Manager Approval: {result.get('needs_approval', False)}\\n")
    
    # Telemetry (OpenTelemetry traces auto-collected by Agent Framework)
    print("✅ Telemetry logged to OpenTelemetry collector")


if __name__ == "__main__":
    asyncio.run(main())
`,
  codeVisualizer: ContextualOnboardingLiveRunner
};
