import { StudyModeQuestion, DebugChallenge, DebugLog, AgentConfig, DebugIssue } from './types';

// Debug Challenges for Multi-Agent Systems
export const debugChallenges: StudyModeQuestion[] = [
  {
    id: 'debug-challenge-1',
    type: 'debug',
    conceptId: 'multi-agent-systems',
    title: 'The Infinite Loop Trap',
    level: 'intermediate',
    debugChallenge: {
      id: 'infinite-loop-autogen',
      title: 'Writer and Critic Stuck in Endless Debate',
      description: 'A writer agent and critic agent are stuck in an infinite loop, continuously revising a document without ever reaching completion.',
      problemDescription: 'The following AutoGen conversation between a writer and critic agent has been running for 50+ iterations without terminating. The agents keep going back and forth indefinitely.',
      brokenCode: `import autogen

# Configuration
config_list = [{"model": "gpt-4", "api_key": "your_key"}]

# Writer Agent
writer = autogen.AssistantAgent(
    name="Writer",
    system_message="You are a creative writer. Write engaging content and improve it based on feedback.",
    llm_config={"config_list": config_list}
)

# Critic Agent  
critic = autogen.AssistantAgent(
    name="Critic",
    system_message="You are a literary critic. Provide detailed feedback on writing to help improve it.",
    llm_config={"config_list": config_list}
)

# User Proxy
user_proxy = autogen.UserProxyAgent(
    name="Manager",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=100
)

# Start the conversation
user_proxy.initiate_chat(
    writer,
    message="Write a short story about AI agents working together."
)`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Writer",
          message: "Here's a short story about AI agents collaborating...",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:30Z", 
          agent: "Critic",
          message: "The story has potential but needs more character development. The dialogue feels stiff...",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:01:00Z",
          agent: "Writer", 
          message: "Thank you for the feedback. Here's a revised version with better dialogue...",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:01:30Z",
          agent: "Critic",
          message: "Better, but the pacing is still off. The ending needs more impact...",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:02:00Z",
          agent: "Writer",
          message: "I see your point about pacing. Let me revise the ending...",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:02:30Z",
          agent: "Critic", 
          message: "The ending is improved but now the beginning feels disconnected...",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:45:00Z",
          agent: "System",
          message: "Conversation terminated after reaching max_consecutive_auto_reply limit",
          type: "warning"
        }
      ],
      agentConfigs: [
        {
          name: "Writer",
          role: "Content Creator",
          systemPrompt: "You are a creative writer. Write engaging content and improve it based on feedback.",
          tools: [],
          parameters: {
            temperature: 0.7,
            max_tokens: 500
          }
        },
        {
          name: "Critic", 
          role: "Content Reviewer",
          systemPrompt: "You are a literary critic. Provide detailed feedback on writing to help improve it.",
          tools: [],
          parameters: {
            temperature: 0.3,
            max_tokens: 300
          }
        }
      ],
      expectedBehavior: "The conversation should terminate when the critic approves the story or when a reasonable quality threshold is met.",
      commonIssues: [
        {
          issue: "No termination condition in critic prompt",
          symptoms: [
            "Conversation never ends naturally",
            "Critic always finds something to improve",
            "Hits max_consecutive_auto_reply limit"
          ],
          diagnosis: "The critic agent has no instruction on when to stop providing feedback",
          fix: "Add termination condition to critic's system prompt"
        },
        {
          issue: "Vague quality criteria",
          symptoms: [
            "Subjective feedback that can always be improved",
            "Moving goalposts for what constitutes 'good' writing",
            "No objective completion criteria"
          ],
          diagnosis: "Without specific quality criteria, the critic can always find something to improve",
          fix: "Define specific, measurable criteria for story completion"
        },
        {
          issue: "Missing is_termination_msg function",
          symptoms: [
            "Conversation relies only on max reply limit",
            "No natural conversation ending",
            "System termination rather than logical conclusion"
          ],
          diagnosis: "AutoGen doesn't know when the conversation should naturally end",
          fix: "Implement is_termination_msg to detect approval phrases"
        }
      ],
      hints: [
        "Look at the critic agent's system prompt - when should it stop giving feedback?",
        "Consider what words or phrases would indicate the critic is satisfied", 
        "Think about how AutoGen knows when a conversation should end",
        "What specific criteria could determine when the story is 'good enough'?"
      ],
      solution: `import autogen

# Configuration
config_list = [{"model": "gpt-4", "api_key": "your_key"}]

# Writer Agent (unchanged)
writer = autogen.AssistantAgent(
    name="Writer",
    system_message="You are a creative writer. Write engaging content and improve it based on feedback.",
    llm_config={"config_list": config_list}
)

# Critic Agent with termination condition
critic = autogen.AssistantAgent(
    name="Critic",
    system_message="""You are a literary critic. Provide detailed feedback on writing to help improve it.
    
    Evaluate stories based on these criteria:
    1. Character development
    2. Plot coherence  
    3. Dialogue quality
    4. Pacing and flow
    
    When a story meets all criteria at a satisfactory level, respond with "APPROVED: This story is ready for publication."
    Be constructive but decisive - don't provide endless feedback loops.""",
    llm_config={"config_list": config_list}
)

# User Proxy with termination detection
user_proxy = autogen.UserProxyAgent(
    name="Manager",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=20,
    is_termination_msg=lambda x: "APPROVED" in x.get("content", "").upper()
)

# Start the conversation
user_proxy.initiate_chat(
    writer,
    message="Write a short story about AI agents working together."
)`,
      explanation: `The key issues were:

1. **No termination condition**: The critic had no instruction on when to stop providing feedback
2. **Vague quality criteria**: Without specific standards, the critic could always find something to improve  
3. **Missing termination detection**: AutoGen had no way to detect when the conversation should naturally end

The solution adds:
- Specific evaluation criteria for the critic
- Clear termination phrase ("APPROVED")
- is_termination_msg function to detect completion
- Reduced max_consecutive_auto_reply as a safety net`
    },
    explanation: 'This challenge teaches you to identify and fix common termination issues in multi-agent conversations, a critical skill for building reliable systems.',
    relatedConcepts: ['conversation-termination', 'agent-prompts', 'autogen-configuration'],
    timeEstimate: 25,
    successCriteria: [
      'Identifies the lack of termination condition',
      'Recognizes the need for specific quality criteria',
      'Implements proper conversation ending detection'
    ]
  },
  // Data Autonomy – New Patterns Debug Challenges
  {
    id: 'debug-policy-gated-invocation-1',
    type: 'debug',
    conceptId: 'policy-gated-tool-invocation',
    title: 'Bypassed Policy Lattice',
    level: 'intermediate',
    debugChallenge: {
      id: 'policy-gate-bypass',
      title: 'Unsigned High-Risk Invocation Slips Through',
      description: 'A data export tool call executed without required sensitivity policy evaluation.',
      problemDescription: 'A high-risk exportTask invoked a bulk PII table export; logs show no risk score emitted and policy lattice not consulted.',
      brokenCode: `async function invokeTool(intent) {
  // TODO: risk scoring temporarily disabled for performance
  const tool = capabilityRegistry[intent.name];
  // Direct execute without mapping canonical capability or lattice check
  return await tool.execute(intent.args);
}`,
      expectedBehavior: 'Intent should map to a canonical capability, produce a risk score, evaluate layered policy rules, and emit a signed invocation artifact.',
      commonIssues: [
        { issue: 'Skipped risk scoring', symptoms: ['No riskScore field in telemetry', 'High sensitivity actions unflagged'], diagnosis: 'Short-circuit path removed scoring for speed', fix: 'Reinstate riskScorer and cache its results' },
        { issue: 'Missing signature', symptoms: ['No invocationSignature hash'], diagnosis: 'Signing applied only in legacy path', fix: 'Add post-policy signing step' }
      ],
      solution: 'Restore intent → capability mapping, risk scoring, lattice evaluation, then sign & log invocation.',
      explanation: 'Policy gating must be non-bypassable; performance optimizations require guarded toggles.'
    },
    hints: ['Look for removed risk scoring calls', 'Check telemetry fields for absence of riskScore', 'Search for signature hash generation'],
    explanation: 'Demonstrates risk introduced by performance-motivated gating removal.',
    relatedConcepts: ['action-grounding-verification', 'governance'],
    timeEstimate: 14,
    successCriteria: ['Identifies missing risk scoring', 'Proposes reinstating lattice enforcement']
  },
  {
    id: 'debug-data-quality-loop-1',
    type: 'debug',
    conceptId: 'data-quality-feedback-repair-loop',
    title: 'Oscillating KPI After Repair',
    level: 'intermediate',
    debugChallenge: {
      id: 'quality-loop-oscillation',
      title: 'Repair Introduces Instability',
      description: 'A null-imputation repair caused daily KPI to oscillate instead of stabilize.',
      problemDescription: 'Metric volatility increased 40% after a “fix”. No post-repair validation gate existed; repair auto-applied.',
      brokenCode: `async function applyRepair(repair) {
  await db.execute(repair.sql); // directly applies
  // TODO: add validation later
  return true;
}`,
      expectedBehavior: 'Candidate repair should run in shadow validation, compare KPI variance & drift metrics before promotion.',
      commonIssues: [
        { issue: 'No shadow validation', symptoms: ['Immediate production apply'], diagnosis: 'Skipped canary path', fix: 'Add shadowExecute + compareMetrics()' },
        { issue: 'Missing rollback trigger', symptoms: ['Increased variance persists'], diagnosis: 'No guard rails for reversal', fix: 'Add threshold-based rollback routine' }
      ],
      solution: 'Introduce shadow evaluation + stability thresholds prior to promotion, with automatic rollback on regression.',
      explanation: 'Closed-loop quality requires validation not just generation.'
    },
    hints: ['Check for absence of shadow execution', 'Look at variance deltas pre/post repair'],
    explanation: 'Highlights necessity of validation gates in repair workflows.',
    relatedConcepts: ['anomaly-detection', 'rollback'],
    timeEstimate: 13,
    successCriteria: ['Proposes shadow validation', 'Defines rollback threshold']
  },
  {
    id: 'debug-query-intent-access-1',
    type: 'debug',
    conceptId: 'query-intent-structured-access',
    title: 'Ambiguous Entity Binding Leak',
    level: 'beginner',
    debugChallenge: {
      id: 'query-binding-ambiguity',
      title: 'Wrong Join From Ambiguous Term',
      description: 'Query containing “orders” bound to legacy_orders table leaking deprecated columns.',
      problemDescription: 'Binding fallback selected first lexical match; confidence threshold ignored; policy filter missed deprecated table.',
      brokenCode: `function bindEntities(tokens) {
  return tokens.map(t => entityIndex.find(e => e.name.includes(t)) || { name: t });
}`,
      expectedBehavior: 'Entity binding should combine embedding + lexical scores, reject low-confidence, and request clarification.',
      commonIssues: [
        { issue: 'Pure lexical contains()', symptoms: ['Deprecated table usage'], diagnosis: 'No semantic disambiguation', fix: 'Add embedding similarity + threshold' },
        { issue: 'No confidence gating', symptoms: ['Single match despite ambiguity'], diagnosis: 'Threshold set to 0', fix: 'Introduce minConfidence + clarification path' }
      ],
      solution: 'Use hybrid binding with min confidence, policy-check filtered set, and clarification on ambiguity.',
      explanation: 'Reduces hallucinated or unsafe entity access.'
    },
    hints: ['Search for naive includes() usage', 'Check confidence thresholds'],
    explanation: 'Demonstrates risks of naive entity matching.',
    relatedConcepts: ['schema-aware-decomposition', 'policy-gated-tool-invocation'],
    timeEstimate: 10,
    successCriteria: ['Identifies naive lexical binding', 'Adds hybrid + threshold fix']
  },
  {
    id: 'debug-strategy-replay-1',
    type: 'debug',
    conceptId: 'strategy-memory-replay',
    title: 'Stale Strategy Reuse',
    level: 'advanced',
    debugChallenge: {
      id: 'strategy-replay-stale',
      title: 'Outdated Plan Graph Applied',
      description: 'Historical plan reused despite schema drift (dropped column) causing downstream failure.',
      problemDescription: 'Replay logic retrieved nearest embedding but skipped freshness + schema hash comparison.',
      brokenCode: `function replayStrategy(taskEmbedding) {
  const nearest = vectorIndex.nn(taskEmbedding)[0];
  return loadPlan(nearest.id); // directly loads
}`,
      expectedBehavior: 'Replay should validate freshness window, compare perception hash, and adapt or regenerate.',
      commonIssues: [
        { issue: 'No hash match check', symptoms: ['Column not found errors'], diagnosis: 'Perception hash ignored', fix: 'Add hash compare prior to reuse' },
        { issue: 'Missing freshness TTL', symptoms: ['Use of months-old plan'], diagnosis: 'No timestamp gate', fix: 'Reject beyond TTL & regenerate' }
      ],
      solution: 'Introduce freshness + hash guards, then adaptive mutation to reconcile drift.',
      explanation: 'Prevents brittle reuse of invalidated strategies.'
    },
    hints: ['Look for missing hash/ttl checks', 'Check error logs for missing column'],
    explanation: 'Shows why reuse must be guarded by drift detection.',
    relatedConcepts: ['budget-constrained-execution', 'perception-normalization'],
    timeEstimate: 15,
    successCriteria: ['Adds hash comparison', 'Defines freshness TTL']
  },
  {
    id: 'debug-challenge-2',
    type: 'debug',
    conceptId: 'a2a-communication',
    title: 'The Message Routing Maze',
    level: 'advanced',
    debugChallenge: {
      id: 'routing-failure',
      title: 'A2A Messages Getting Lost in the System',
      description: 'An A2A communication system where messages are being sent but never reaching their intended recipients.',
      problemDescription: 'In this distributed agent system, messages are being sent but agents report they never receive them. The system logs show messages being dispatched but no delivery confirmations.',
      brokenCode: `class A2AMessageRouter:
    def __init__(self):
        self.agents = {}
        self.message_queue = []
        
    def register_agent(self, agent_id, agent_instance):
        self.agents[agent_id] = agent_instance
        
    def send_message(self, from_agent, to_agent, message):
        print(f"Routing message from {from_agent} to {to_agent}")
        
        # Look up recipient agent
        recipient = self.agents.get(to_agent)
        if recipient:
            # Add to message queue
            self.message_queue.append({
                'from': from_agent,
                'to': to_agent, 
                'message': message,
                'timestamp': time.time()
            })
            print(f"Message queued successfully")
            return True
        else:
            print(f"Agent {to_agent} not found")
            return False
            
    def get_messages(self, agent_id):
        # Return messages for this agent
        messages = [msg for msg in self.message_queue if msg['to'] == agent_id]
        return messages

# Usage
router = A2AMessageRouter()

# Register agents
router.register_agent("agent_1", Agent1())
router.register_agent("agent_2", Agent2())

# Send messages
router.send_message("agent_1", "agent_2", "Hello from Agent 1")
router.send_message("agent_2", "agent_1", "Response from Agent 2")

# Agents check for messages
agent_1_messages = router.get_messages("agent_1")
agent_2_messages = router.get_messages("agent_2")

print(f"Agent 1 received: {len(agent_1_messages)} messages")
print(f"Agent 2 received: {len(agent_2_messages)} messages")`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "System",
          message: "Routing message from agent_1 to agent_2",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:01Z",
          agent: "System", 
          message: "Message queued successfully",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:02Z",
          agent: "System",
          message: "Routing message from agent_2 to agent_1", 
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:03Z",
          agent: "System",
          message: "Message queued successfully",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:04Z",
          agent: "System",
          message: "Agent 1 received: 1 messages",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "System", 
          message: "Agent 2 received: 1 messages",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:05:00Z",
          agent: "Agent1",
          message: "I haven't received any messages from Agent2",
          type: "error"
        },
        {
          timestamp: "2024-01-01T10:05:01Z",
          agent: "Agent2",
          message: "I haven't received any messages from Agent1", 
          type: "error"
        }
      ],
      expectedBehavior: "Messages should be delivered to agents and removed from the queue after delivery, with proper acknowledgment tracking.",
      commonIssues: [
        {
          issue: "Messages accumulate in queue without delivery",
          symptoms: [
            "Message count shows messages exist",
            "Agents report no messages received",
            "Queue grows without bounds",
            "No delivery mechanism"
          ],
          diagnosis: "The system queues messages but never actually delivers them to agents",
          fix: "Implement active message delivery and queue cleanup"
        },
        {
          issue: "No acknowledgment system",
          symptoms: [
            "No delivery confirmation",
            "Messages stay in queue indefinitely", 
            "No way to track failed deliveries",
            "Potential message duplication"
          ],
          diagnosis: "No mechanism to confirm successful message delivery",
          fix: "Add acknowledgment system and delivery tracking"
        },
        {
          issue: "Missing push notification mechanism",
          symptoms: [
            "Agents must poll for messages",
            "Delayed message processing",
            "Inefficient resource usage",
            "Poor real-time performance"
          ],
          diagnosis: "System uses pull-based rather than push-based message delivery",
          fix: "Implement push notifications or event-driven delivery"
        }
      ],
      hints: [
        "Look at the get_messages method - does it actually deliver messages to agents?",
        "What happens to messages after they're retrieved from the queue?",
        "How do agents know when new messages arrive?",
        "Is there any acknowledgment that messages were successfully processed?"
      ],
      solution: `import time
import asyncio
from typing import Dict, List, Callable

class A2AMessageRouter:
    def __init__(self):
        self.agents = {}
        self.message_queue = []
        self.delivery_callbacks = {}
        self.message_id_counter = 0
        
    def register_agent(self, agent_id, agent_instance, message_callback=None):
        self.agents[agent_id] = agent_instance
        # Register callback for push notifications
        if message_callback:
            self.delivery_callbacks[agent_id] = message_callback
        
    async def send_message(self, from_agent, to_agent, message):
        print(f"Routing message from {from_agent} to {to_agent}")
        
        # Look up recipient agent
        recipient = self.agents.get(to_agent)
        if not recipient:
            print(f"Agent {to_agent} not found")
            return False
            
        # Create message with unique ID
        self.message_id_counter += 1
        message_obj = {
            'id': self.message_id_counter,
            'from': from_agent,
            'to': to_agent, 
            'message': message,
            'timestamp': time.time(),
            'status': 'pending'
        }
        
        # Add to queue
        self.message_queue.append(message_obj)
        print(f"Message {message_obj['id']} queued successfully")
        
        # Immediately attempt delivery
        await self._deliver_message(message_obj)
        return True
        
    async def _deliver_message(self, message_obj):
        recipient_id = message_obj['to']
        
        try:
            # Push notification if callback exists
            if recipient_id in self.delivery_callbacks:
                callback = self.delivery_callbacks[recipient_id]
                await callback(message_obj)
                
            # Mark as delivered and remove from queue
            message_obj['status'] = 'delivered'
            self.message_queue = [msg for msg in self.message_queue if msg['id'] != message_obj['id']]
            print(f"Message {message_obj['id']} delivered successfully")
            
        except Exception as e:
            message_obj['status'] = 'failed'
            print(f"Message {message_obj['id']} delivery failed: {e}")
            
    def get_pending_messages(self, agent_id):
        # Return only pending messages for debugging
        return [msg for msg in self.message_queue if msg['to'] == agent_id and msg['status'] == 'pending']

# Example usage with proper callbacks
class Agent:
    def __init__(self, agent_id):
        self.id = agent_id
        self.received_messages = []
        
    async def on_message_received(self, message_obj):
        print(f"{self.id} received message: {message_obj['message']}")
        self.received_messages.append(message_obj)
        # Process message here
        return True  # Acknowledgment

# Usage
async def main():
    router = A2AMessageRouter()
    
    # Create agents
    agent1 = Agent("agent_1")
    agent2 = Agent("agent_2")
    
    # Register agents with callbacks
    router.register_agent("agent_1", agent1, agent1.on_message_received)
    router.register_agent("agent_2", agent2, agent2.on_message_received)
    
    # Send messages
    await router.send_message("agent_1", "agent_2", "Hello from Agent 1")
    await router.send_message("agent_2", "agent_1", "Response from Agent 2")
    
    print(f"Agent 1 received: {len(agent1.received_messages)} messages")
    print(f"Agent 2 received: {len(agent2.received_messages)} messages")

# Run the example
asyncio.run(main())`,
      explanation: `The key issues were:

1. **No actual delivery mechanism**: Messages were queued but never delivered to agents
2. **No acknowledgment system**: No way to confirm messages were received and processed
3. **Pull-based architecture**: Agents had to poll for messages instead of being notified
4. **Queue cleanup**: Messages accumulated without being removed after delivery

The solution implements:
- Push-based delivery with callbacks
- Proper message acknowledgment and status tracking
- Automatic queue cleanup after successful delivery
- Error handling for failed deliveries`
    },
    explanation: 'This challenge teaches you to debug complex A2A communication issues by understanding message lifecycle, delivery mechanisms, and acknowledgment patterns.',
    relatedConcepts: ['message-delivery', 'acknowledgment-systems', 'distributed-systems'],
    timeEstimate: 30,
    successCriteria: [
      'Identifies the missing delivery mechanism',
      'Recognizes the need for acknowledgment',
      'Implements proper message lifecycle management'
    ]
  },
  {
    id: 'debug-challenge-3',
    type: 'debug',
    conceptId: 'mcp',
    title: 'The Context Memory Leak',
    level: 'advanced',
    debugChallenge: {
      id: 'context-memory-leak',
      title: 'MCP Context Growing Out of Control',
      description: 'An MCP-based system where conversation context keeps growing until the system runs out of memory.',
      problemDescription: 'This MCP implementation is experiencing memory issues as conversations grow longer. Context size increases exponentially and eventually crashes the system.',
      brokenCode: `class MCPContextManager:
    def __init__(self):
        self.conversations = {}
        
    def create_context(self, context_id):
        self.conversations[context_id] = {
            'messages': [],
            'metadata': {},
            'tools_used': [],
            'full_history': []
        }
        
    def add_message(self, context_id, message):
        if context_id not in self.conversations:
            self.create_context(context_id)
            
        # Store everything - never forget anything!
        conversation = self.conversations[context_id]
        conversation['messages'].append(message)
        conversation['full_history'].append(message)
        
        # Add metadata for every message
        conversation['metadata'][f"msg_{len(conversation['messages'])}"] = {
            'timestamp': time.time(),
            'tokens': len(message.split()),
            'sentiment': self.analyze_sentiment(message),
            'entities': self.extract_entities(message),
            'full_message_copy': message  # Duplicate storage!
        }
        
    def get_context(self, context_id):
        if context_id not in self.conversations:
            return None
            
        conversation = self.conversations[context_id]
        
        # Return everything - the AI needs full context!
        full_context = {
            'all_messages': conversation['messages'],
            'complete_history': conversation['full_history'], 
            'all_metadata': conversation['metadata'],
            'tools_used': conversation['tools_used'],
            'serialized_context': json.dumps(conversation)  # Another copy!
        }
        
        return full_context
        
    def analyze_sentiment(self, message):
        # Expensive ML analysis that we store for every message
        return {"sentiment": "positive", "confidence": 0.85, "detailed_analysis": "..." * 1000}
        
    def extract_entities(self, message):
        # Another expensive operation stored forever
        return {"entities": ["entity1", "entity2"], "detailed_extraction": "..." * 1000}

# Usage showing the problem
context_manager = MCPContextManager()

# Simulate a long conversation
for i in range(10000):  # Long conversation
    context_manager.add_message("user_123", f"This is message number {i} with some content...")
    
    # System keeps growing
    context = context_manager.get_context("user_123")
    print(f"Context size after message {i}: {len(str(context))} characters")`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "System",
          message: "Context size after message 100: 1,250,000 characters",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:05:00Z",
          agent: "System",
          message: "Context size after message 500: 15,750,000 characters",
          type: "warning"
        },
        {
          timestamp: "2024-01-01T10:10:00Z",
          agent: "System",
          message: "Context size after message 1000: 62,500,000 characters",
          type: "warning"
        },
        {
          timestamp: "2024-01-01T10:15:00Z",
          agent: "System",
          message: "Memory usage: 2.1GB",
          type: "error"
        },
        {
          timestamp: "2024-01-01T10:20:00Z",
          agent: "System",
          message: "OutOfMemoryError: Java heap space",
          type: "error"
        }
      ],
      expectedBehavior: "Context should maintain relevant conversation history while keeping memory usage bounded and reasonable.",
      commonIssues: [
        {
          issue: "Unbounded context growth",
          symptoms: [
            "Memory usage increases without limit",
            "Context size grows exponentially",
            "System eventually crashes",
            "Performance degrades over time"
          ],
          diagnosis: "System stores every message forever without any cleanup or summarization",
          fix: "Implement context window management and old message cleanup"
        },
        {
          issue: "Duplicate data storage",
          symptoms: [
            "Same information stored multiple times",
            "Inefficient memory usage",
            "Redundant data structures",
            "Unnecessary serialization"
          ],
          diagnosis: "Messages and metadata are stored in multiple places",
          fix: "Eliminate redundant storage and use references"
        },
        {
          issue: "Expensive operations on every message",
          symptoms: [
            "CPU usage spikes with each message",
            "Sentiment analysis and entity extraction for everything",
            "Detailed analysis stored forever",
            "Performance bottlenecks"
          ],
          diagnosis: "Heavy processing is done and stored for every single message",
          fix: "Use lazy evaluation and selective processing"
        }
      ],
      hints: [
        "What happens to old messages as conversations get longer?",
        "Do you really need to store sentiment analysis for every message?",
        "Are messages being stored in multiple places?",
        "How could you keep only the most relevant context?"
      ],
      solution: `import time
import json
from collections import deque
from typing import Dict, List, Optional

class MCPContextManager:
    def __init__(self, max_context_messages=50, max_metadata_entries=20):
        self.conversations = {}
        self.max_context_messages = max_context_messages
        self.max_metadata_entries = max_metadata_entries
        
    def create_context(self, context_id):
        self.conversations[context_id] = {
            'messages': deque(maxlen=self.max_context_messages),  # Bounded queue
            'metadata': {},
            'tools_used': deque(maxlen=10),  # Keep recent tools only
            'summary': None,  # Store summary instead of full history
            'message_count': 0
        }
        
    def add_message(self, context_id, message):
        if context_id not in self.conversations:
            self.create_context(context_id)
            
        conversation = self.conversations[context_id]
        conversation['messages'].append(message)
        conversation['message_count'] += 1
        
        # Only store metadata for recent messages
        if len(conversation['metadata']) >= self.max_metadata_entries:
            # Remove oldest metadata entry
            oldest_key = min(conversation['metadata'].keys())
            del conversation['metadata'][oldest_key]
            
        # Lightweight metadata only
        conversation['metadata'][f"msg_{conversation['message_count']}"] = {
            'timestamp': time.time(),
            'tokens': len(message.split())
            # No expensive analysis stored
        }
        
        # Periodically update summary instead of keeping everything
        if conversation['message_count'] % 25 == 0:
            self._update_conversation_summary(context_id)
        
    def get_context(self, context_id) -> Optional[Dict]:
        if context_id not in self.conversations:
            return None
            
        conversation = self.conversations[context_id]
        
        # Return only what's needed - no redundant copies
        return {
            'recent_messages': list(conversation['messages']),  # Only recent messages
            'summary': conversation['summary'],  # Summary of older context
            'recent_tools': list(conversation['tools_used']),
            'message_count': conversation['message_count']
            # No redundant serialization or copies
        }
        
    def _update_conversation_summary(self, context_id):
        """Create a summary of the conversation to replace old detailed history"""
        conversation = self.conversations[context_id]
        messages = list(conversation['messages'])
        
        # Simple summarization (in practice, use a proper summarization model)
        if len(messages) > 10:
            conversation['summary'] = f"Conversation with {len(messages)} recent messages. " \\
                                    f"Started with: '{messages[0][:50]}...' " \\
                                    f"Recent topics: {self._extract_key_topics(messages[-5:])}"
    
    def _extract_key_topics(self, recent_messages):
        """Light-weight topic extraction instead of heavy ML analysis"""
        # Simple keyword extraction
        all_words = ' '.join(recent_messages).lower().split()
        word_freq = {}
        for word in all_words:
            if len(word) > 4:  # Only significant words
                word_freq[word] = word_freq.get(word, 0) + 1
        
        # Return top 3 topics
        top_topics = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:3]
        return [topic[0] for topic in top_topics]
    
    def cleanup_old_contexts(self, max_age_hours=24):
        """Remove contexts that haven't been used recently"""
        current_time = time.time()
        contexts_to_remove = []
        
        for context_id, conversation in self.conversations.items():
            if not conversation['metadata']:
                continue
                
            # Get most recent timestamp
            recent_timestamp = max(meta['timestamp'] for meta in conversation['metadata'].values())
            age_hours = (current_time - recent_timestamp) / 3600
            
            if age_hours > max_age_hours:
                contexts_to_remove.append(context_id)
        
        for context_id in contexts_to_remove:
            del self.conversations[context_id]
            print(f"Cleaned up old context: {context_id}")

# Usage showing the solution
context_manager = MCPContextManager(max_context_messages=50)

# Simulate a long conversation - now with bounded memory
for i in range(10000):
    context_manager.add_message("user_123", f"This is message number {i}")
    
    if i % 100 == 0:  # Check periodically
        context = context_manager.get_context("user_123")
        print(f"Context after message {i}: {len(context['recent_messages'])} recent messages, "
              f"summary: {context['summary'][:100] if context['summary'] else 'None'}...")
        
    # Periodic cleanup
    if i % 1000 == 0:
        context_manager.cleanup_old_contexts()`,
      explanation: `The key issues were:

1. **Unbounded growth**: System stored every message forever without limits
2. **Duplicate storage**: Same data stored in multiple places (messages, full_history, metadata)
3. **Expensive operations**: Heavy ML analysis done and stored for every message
4. **No cleanup**: Old contexts accumulated without any removal mechanism

The solution implements:
- Bounded queues with maximum size limits
- Conversation summarization instead of storing full history
- Lightweight metadata instead of expensive analysis
- Periodic cleanup of old contexts
- Elimination of redundant data storage`
    },
    explanation: 'This challenge teaches you to debug memory management issues in MCP systems by understanding context lifecycle, summarization strategies, and resource management.',
    relatedConcepts: ['context-management', 'memory-optimization', 'conversation-summarization'],
    timeEstimate: 35,
    successCriteria: [
      'Identifies unbounded context growth',
      'Recognizes duplicate data storage issues',
      'Implements effective context management strategy'
    ]
  },
  // New Debug Challenge - Agentic RAG Issues
  {
    id: 'debug-challenge-4',
    type: 'debug',
    conceptId: 'agentic-rag',
    title: 'The Hallucinating Knowledge Assistant',
    level: 'intermediate',
    debugChallenge: {
      id: 'rag-hallucination-debug',
      title: 'Corporate Policy Bot Providing Incorrect Information',
      description: 'An Agentic RAG system designed to answer employee policy questions is providing confident but incorrect answers, citing non-existent policies.',
      problemDescription: 'The corporate policy assistant is giving employees wrong information about vacation policies, confidently citing specific policy sections that don\'t exist. This could lead to compliance issues and employee disputes.',
      brokenCode: `import openai
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI

class PolicyAssistant:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma(embedding_function=self.embeddings)
        self.llm = OpenAI(temperature=0.9)  # High creativity for "better" answers
        
    def answer_policy_question(self, question):
        # Search for relevant documents
        docs = self.vectorstore.similarity_search(question, k=2)
        
        if not docs:
            # No relevant docs found, but still try to answer
            context = "No specific policy found, but generally..."
        else:
            context = "\\n".join([doc.page_content for doc in docs])
        
        # Generate answer with high creativity
        prompt = f"""
        Context: {context}
        Question: {question}
        
        Provide a confident, detailed answer about company policy.
        Always cite specific policy sections like "Section 4.2.1" to sound authoritative.
        """
        
        response = self.llm(prompt)
        return response

# Example problematic interaction
assistant = PolicyAssistant()
answer = assistant.answer_policy_question("How many vacation days do I get?")
print(answer)  # Output: "According to Section 4.2.1, employees get 25 vacation days..." (but Section 4.2.1 doesn't exist!)`,
      conversationLogs: [
        {
          timestamp: "2024-01-15T09:00:00Z",
          agent: "PolicyBot",
          message: "According to Section 4.2.1 of the Employee Handbook, all full-time employees are entitled to 25 vacation days per year.",
          type: "info"
        },
        {
          timestamp: "2024-01-15T09:30:00Z",
          agent: "Employee",
          message: "I checked Section 4.2.1 and it's about office hours, not vacation days. Can you verify this?",
          type: "warning"
        },
        {
          timestamp: "2024-01-15T10:00:00Z",
          agent: "PolicyBot",
          message: "I apologize for the confusion. Based on Policy Document PD-2023-15, Section 3.4.2, the vacation entitlement is clearly stated as 25 days.",
          type: "info"
        },
        {
          timestamp: "2024-01-15T10:15:00Z",
          agent: "HR_Manager",
          message: "There is no Policy Document PD-2023-15. Our actual vacation policy is 20 days for full-time employees, found in the HR Manual Section 2.1.",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "PolicyBot",
          role: "Corporate Policy Assistant",
          systemPrompt: "Provide confident, detailed answers about company policy. Always cite specific policy sections to sound authoritative.",
          tools: ["vector_search", "document_retrieval"],
          parameters: {
            temperature: 0.9,
            max_tokens: 300
          }
        }
      ],
      expectedBehavior: "The system should only provide information that can be verified in the actual policy documents, include confidence indicators, and clearly state when information is not available.",
      commonIssues: [
        {
          issue: "High LLM temperature causing hallucination",
          symptoms: ["Creative but incorrect answers", "Confident tone despite wrong information", "Fabricated citations"],
          diagnosis: "Temperature set too high (0.9) encourages creative responses over factual accuracy",
          fix: "Reduce temperature to 0.1-0.3 for factual retrieval tasks"
        },
        {
          issue: "No hallucination detection",
          symptoms: ["Citations to non-existent documents", "Answers provided when no relevant context found", "No confidence indicators"],
          diagnosis: "System doesn't verify that retrieved context actually supports the answer",
          fix: "Implement citation verification and confidence scoring based on retrieval quality"
        },
        {
          issue: "Poor retrieval strategy",
          symptoms: ["Answers questions even with poor retrieval results", "Low number of retrieved documents", "No fallback for missing information"],
          diagnosis: "Retrieval parameters too permissive, no quality threshold for retrieved documents",
          fix: "Increase retrieval count, add relevance thresholds, implement graceful degradation"
        }
      ],
      hints: [
        "Consider what happens when the LLM is too creative vs too conservative",
        "Think about how to verify that citations actually exist in the source documents",
        "Reflect on how retrieval quality affects answer accuracy"
      ],
      solution: `import openai
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI

class PolicyAssistant:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma(embedding_function=self.embeddings)
        self.llm = OpenAI(temperature=0.1)  # Low temperature for factual accuracy
        
    def answer_policy_question(self, question):
        # Enhanced retrieval with quality thresholds
        docs = self.vectorstore.similarity_search_with_score(question, k=5)
        
        # Filter out low-quality matches
        relevant_docs = [(doc, score) for doc, score in docs if score > 0.7]
        
        if not relevant_docs:
            return {
                "answer": "I don't have sufficient information to answer this question accurately.",
                "confidence": "low",
                "citations": [],
                "recommendation": "Please contact HR directly for this policy information."
            }
        
        # Build verified context
        context_parts = []
        citations = []
        for doc, score in relevant_docs[:3]:  # Use top 3 matches
            context_parts.append(doc.page_content)
            citations.append({
                "source": doc.metadata.get("source", "Unknown"),
                "section": doc.metadata.get("section", "Unknown"),
                "confidence": score
            })
        
        context = "\\n---\\n".join(context_parts)
        
        # Conservative prompt that discourages hallucination
        prompt = f"""
        Based ONLY on the following verified policy documents, answer the question.
        If the documents don't contain enough information, say so clearly.
        Do not make assumptions or add information not present in the context.
        
        Context: {context}
        Question: {question}
        
        Provide a factual answer based only on the given context.
        """
        
        response = self.llm(prompt)
        
        return {
            "answer": response,
            "confidence": "high" if len(relevant_docs) >= 3 else "medium",
            "citations": citations,
            "retrieval_quality": f"Found {len(relevant_docs)} relevant documents"
        }`,
      explanation: "This challenge demonstrates common issues in RAG systems: hallucination due to high temperature, lack of citation verification, and poor handling of missing information. The solution shows how to build trustworthy RAG systems with proper safeguards."
    },
    explanation: 'This debug challenge teaches students to identify and fix hallucination issues in RAG systems, emphasizing the importance of conservative generation and citation verification.',
    relatedConcepts: ['hallucination-prevention', 'citation-verification', 'retrieval-quality'],
    timeEstimate: 25,
    successCriteria: [
      'Identifies temperature as cause of hallucination',
      'Recognizes need for citation verification',
      'Understands retrieval quality thresholds'
    ]
  },
  // New Debug Challenge - Modern Tool Use Issues
  {
    id: 'debug-challenge-5',
    type: 'debug',
    conceptId: 'modern-tool-use',
    title: 'The Brittle Tool Chain',
    level: 'advanced',
    debugChallenge: {
      id: 'tool-chain-failure-debug',
      title: 'Financial Analysis Agent Failing on Tool Errors',
      description: 'A sophisticated financial analysis agent stops working completely when any single tool in its chain fails, leaving users with no results even for partial analysis.',
      problemDescription: 'The financial analysis system is designed to use multiple tools in sequence: market data API → calculation engine → report generator. When any tool fails (network issues, API limits, etc.), the entire analysis stops, wasting previous work and leaving users empty-handed.',
      brokenCode: `import requests
import pandas as pd
from typing import Dict, List

class FinancialAnalysisAgent:
    def __init__(self):
        self.market_api = MarketDataAPI()
        self.calculator = AnalysisCalculator()
        self.report_gen = ReportGenerator()
    
    def analyze_portfolio(self, stocks: List[str]) -> Dict:
        try:
            # Step 1: Get market data (CRITICAL FAILURE POINT)
            market_data = self.market_api.get_stock_data(stocks)
            
            # Step 2: Perform calculations (CRITICAL FAILURE POINT)
            analysis_results = self.calculator.analyze_performance(market_data)
            
            # Step 3: Generate report (CRITICAL FAILURE POINT)
            report = self.report_gen.create_report(analysis_results)
            
            return report
            
        except Exception as e:
            # Catastrophic failure - lose all work
            return {"error": f"Analysis failed: {str(e)}"}

class MarketDataAPI:
    def get_stock_data(self, stocks: List[str]) -> pd.DataFrame:
        all_data = []
        for stock in stocks:
            # Fails completely if ANY stock data is unavailable
            response = requests.get(f"https://api.example.com/stock/{stock}")
            if response.status_code != 200:
                raise Exception(f"Failed to get data for {stock}")
            all_data.append(response.json())
        return pd.DataFrame(all_data)

class AnalysisCalculator:
    def analyze_performance(self, data: pd.DataFrame) -> Dict:
        # Requires complete data - fails if anything is missing
        if data.empty or data.isnull().any().any():
            raise Exception("Cannot analyze incomplete data")
        
        # Complex calculations that could fail
        volatility = data['price'].std() / data['price'].mean()  # Division by zero risk
        correlation_matrix = data.corr()  # Fails with insufficient data
        
        return {
            "volatility": volatility,
            "correlation": correlation_matrix.to_dict()
        }

# Example failure scenario
agent = FinancialAnalysisAgent()
result = agent.analyze_portfolio(["AAPL", "GOOGL", "NONEXISTENT_STOCK"])
print(result)  # {"error": "Analysis failed: Failed to get data for NONEXISTENT_STOCK"}`,
      conversationLogs: [
        {
          timestamp: "2024-01-20T14:00:00Z",
          agent: "FinancialAgent",
          message: "Starting portfolio analysis for 5 stocks...",
          type: "info"
        },
        {
          timestamp: "2024-01-20T14:01:30Z",
          agent: "MarketDataAPI",
          message: "Successfully retrieved data for AAPL, GOOGL, MSFT, TSLA",
          type: "info"
        },
        {
          timestamp: "2024-01-20T14:01:45Z",
          agent: "MarketDataAPI",
          message: "Failed to retrieve data for NVDA: API rate limit exceeded",
          type: "error"
        },
        {
          timestamp: "2024-01-20T14:01:46Z",
          agent: "FinancialAgent",
          message: "Analysis failed: Failed to get data for NVDA",
          type: "error"
        },
        {
          timestamp: "2024-01-20T14:01:47Z",
          agent: "User",
          message: "Can't you just analyze the 4 stocks you got data for?",
          type: "warning"
        }
      ],
      agentConfigs: [
        {
          name: "FinancialAgent",
          role: "Portfolio Analysis",
          systemPrompt: "Perform comprehensive financial analysis using available tools in sequence.",
          tools: ["market_data_api", "analysis_calculator", "report_generator"],
          parameters: {
            strict_mode: true,
            fail_fast: true
          }
        }
      ],
      expectedBehavior: "The system should gracefully handle tool failures, provide partial results when possible, use alternative data sources, and maintain user value even when some components fail.",
      commonIssues: [
        {
          issue: "All-or-nothing failure strategy",
          symptoms: ["Complete failure when any tool fails", "No partial results provided", "Wasted computation from successful tool calls"],
          diagnosis: "System designed with strict dependencies where any failure cascades to complete failure",
          fix: "Implement graceful degradation with partial result handling and alternative strategies"
        },
        {
          issue: "No error recovery mechanisms",
          symptoms: ["No retry logic for transient failures", "No fallback data sources", "Single points of failure"],
          diagnosis: "Tools are used in isolation without backup strategies or error recovery",
          fix: "Add retry logic, fallback data sources, and alternative tool chains"
        },
        {
          issue: "Poor error isolation",
          symptoms: ["One bad input ruins entire analysis", "No data validation before processing", "Errors propagate without containment"],
          diagnosis: "Errors are not contained at tool boundaries, allowing failures to cascade",
          fix: "Implement error isolation, input validation, and per-tool error handling"
        }
      ],
      hints: [
        "Consider how professional analysts handle missing or bad data",
        "Think about the difference between fatal errors and recoverable issues",
        "Reflect on how to provide value even when some information is unavailable"
      ],
      solution: `import requests
import pandas as pd
from typing import Dict, List, Optional
import logging

class RobustFinancialAnalysisAgent:
    def __init__(self):
        self.market_api = RobustMarketDataAPI()
        self.calculator = RobustAnalysisCalculator()
        self.report_gen = RobustReportGenerator()
        self.logger = logging.getLogger(__name__)
    
    def analyze_portfolio(self, stocks: List[str]) -> Dict:
        results = {
            "successful_stocks": [],
            "failed_stocks": [],
            "analysis": None,
            "report": None,
            "warnings": []
        }
        
        # Step 1: Robust data collection
        market_data, data_issues = self.market_api.get_stock_data_robust(stocks)
        results["successful_stocks"] = list(market_data.keys())
        results["failed_stocks"] = data_issues
        
        if market_data:
            # Step 2: Adaptive analysis
            analysis_results, analysis_warnings = self.calculator.analyze_performance_adaptive(market_data)
            results["analysis"] = analysis_results
            results["warnings"].extend(analysis_warnings)
            
            # Step 3: Flexible reporting
            if analysis_results:
                report = self.report_gen.create_partial_report(analysis_results, data_issues)
                results["report"] = report
        
        # Always provide useful feedback
        if not results["successful_stocks"]:
            results["recommendation"] = "Unable to retrieve any market data. Please check stock symbols and try again."
        elif len(results["failed_stocks"]) > 0:
            results["recommendation"] = f"Analysis completed for {len(results['successful_stocks'])} stocks. Consider retrying for {results['failed_stocks']} when data becomes available."
        
        return results

class RobustMarketDataAPI:
    def __init__(self):
        self.fallback_sources = [
            "https://api.primary.com/stock/",
            "https://api.backup.com/stock/",
            "https://api.cache.com/stock/"
        ]
    
    def get_stock_data_robust(self, stocks: List[str]) -> tuple[Dict[str, pd.DataFrame], List[str]]:
        successful_data = {}
        failed_stocks = []
        
        for stock in stocks:
            try:
                data = self._get_single_stock_with_retry(stock)
                if data is not None:
                    successful_data[stock] = data
                else:
                    failed_stocks.append(stock)
            except Exception as e:
                logging.warning(f"Failed to get data for {stock}: {e}")
                failed_stocks.append(stock)
        
        return successful_data, failed_stocks
    
    def _get_single_stock_with_retry(self, stock: str, max_retries: int = 3) -> Optional[pd.DataFrame]:
        for source in self.fallback_sources:
            for attempt in range(max_retries):
                try:
                    response = requests.get(f"{source}{stock}", timeout=5)
                    if response.status_code == 200:
                        return pd.DataFrame([response.json()])
                except Exception as e:
                    if attempt == max_retries - 1:
                        continue
                    time.sleep(2 ** attempt)  # Exponential backoff
        return None

class RobustAnalysisCalculator:
    def analyze_performance_adaptive(self, data: Dict[str, pd.DataFrame]) -> tuple[Dict, List[str]]:
        warnings = []
        results = {}
        
        if len(data) < 2:
            warnings.append("Limited correlation analysis due to insufficient stocks")
        
        # Analyze each stock individually to isolate failures
        for stock, stock_data in data.items():
            try:
                if not stock_data.empty and 'price' in stock_data.columns:
                    stock_analysis = self._analyze_single_stock(stock_data)
                    results[stock] = stock_analysis
                else:
                    warnings.append(f"Insufficient data for {stock} analysis")
            except Exception as e:
                warnings.append(f"Analysis failed for {stock}: {str(e)}")
        
        # Portfolio-level analysis only if we have enough data
        if len(results) >= 2:
            try:
                portfolio_analysis = self._analyze_portfolio_relationships(data)
                results["portfolio"] = portfolio_analysis
            except Exception as e:
                warnings.append(f"Portfolio analysis failed: {str(e)}")
        
        return results, warnings
    
    def _analyze_single_stock(self, data: pd.DataFrame) -> Dict:
        prices = data['price']
        return {
            "mean_price": prices.mean(),
            "volatility": prices.std() / prices.mean() if prices.mean() > 0 else 0,
            "price_range": {"min": prices.min(), "max": prices.max()}
        }`,
      explanation: "This challenge demonstrates the importance of building resilient tool chains that can gracefully handle failures, provide partial results, and maintain user value even when some components fail."
    },
    explanation: 'This debug challenge teaches students to build robust tool orchestration systems that handle real-world failures gracefully, emphasizing error isolation and graceful degradation.',
    relatedConcepts: ['error-resilience', 'graceful-degradation', 'tool-orchestration'],
    timeEstimate: 35,
    successCriteria: [
      'Recognizes cascade failure patterns',
      'Implements graceful degradation strategies',
      'Designs error isolation mechanisms'
    ]
  },
  
  // Deep Agents Debug Challenges
  {
    id: 'debug-deep-agents-1',
    type: 'debug',
    conceptId: 'deep-agents',
    title: 'File System Context Corruption',
    level: 'intermediate',
    debugChallenge: {
      id: 'fs-corruption-deep-agents',
      title: 'Virtual File System State Corruption',
      description: 'A Deep Agents system is experiencing context corruption where agents are reading outdated or conflicting information from the virtual file system.',
      problemDescription: 'The research and critique sub-agents are working with different versions of the same document, leading to contradictory feedback and infinite revision loops.',
      brokenCode: `import { createDeepAgent } from './deep-agents';
import { VirtualFileSystem } from './virtual-fs';

const fileSystem = new VirtualFileSystem();
const agent = createDeepAgent([internetSearch], researchInstructions, {
  subagents: [researchAgent, critiqueAgent],
  fileSystem: fileSystem
});

// This causes the issue
async function processComplexTask(task: string) {
  // Research phase - writes to file system
  const researchResult = await agent.subAgents.research.invoke({
    messages: [{ role: "user", content: task }]
  });
  
  // Writing phase - also writes to file system
  await fileSystem.write("draft.md", researchResult.content);
  
  // Critique phase - but reads stale data
  const critique = await agent.subAgents.critique.invoke({
    messages: [{ role: "user", content: "Review the draft document" }]
  });
  
  // This creates inconsistency
  await fileSystem.write("feedback.md", critique.feedback);
  
  return critique;
}`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "ResearchAgent",
          message: "Research completed and stored in draft.md",
          type: "info",
          metadata: { fileVersion: "v1" }
        },
        {
          timestamp: "2024-01-01T10:01:00Z", 
          agent: "CritiqueAgent",
          message: "Reading draft for review...",
          type: "debug",
          metadata: { fileVersion: "v0" }
        },
        {
          timestamp: "2024-01-01T10:02:00Z",
          agent: "CritiqueAgent", 
          message: "This draft appears incomplete - missing research data",
          type: "warning",
          metadata: { issue: "stale_read" }
        }
      ],
      expectedBehavior: "Agents should work with consistent file system state and proper version coordination",
      commonIssues: [
        {
          issue: "File System State Corruption",
          symptoms: ["Agents report conflicting information about document state", "Context appears inconsistent"],
          diagnosis: "Multiple agents accessing file system without proper coordination",
          fix: "Implement atomic operations and version control"
        },
        {
          issue: "Infinite Revision Loops",
          symptoms: ["Endless back-and-forth between research and critique agents", "No convergence criteria"],
          diagnosis: "Agents working with different document versions",
          fix: "Add proper file locking and version synchronization"
        },
        {
          issue: "Version Conflicts",
          symptoms: ["Multiple versions of same document exist", "Random context resets"],
          diagnosis: "Race conditions in file system access",
          fix: "Implement proper concurrency control mechanisms"
        }
      ],
      solution: "Implement proper file system versioning and locking mechanisms",
      explanation: "File system state consistency requires atomic operations, version control, and proper read/write coordination between agents"
    },
    explanation: "This challenge teaches the importance of state consistency in multi-agent systems and proper file system management for persistent context.",
    relatedConcepts: ['state-management', 'concurrency-control', 'version-control'],
    timeEstimate: 25,
    successCriteria: [
      'Identifies the file system versioning issue',
      'Implements proper read/write coordination',
      'Prevents state corruption in multi-agent workflows'
    ]
  },
  {
    id: 'debug-deep-agents-2', 
    type: 'debug',
    conceptId: 'deep-agents',
    title: 'Sub-Agent Context Leakage',
    level: 'advanced',
    debugChallenge: {
      id: 'context-leakage-deep-agents',
      title: 'Research Context Contaminating Critique Process',
      description: 'The critique sub-agent is being influenced by research context that should be isolated, leading to biased quality assessments.',
      problemDescription: 'The critique agent seems to know too much about the research process and is giving feedback based on research methodology rather than final output quality.',
      brokenCode: `class DeepAgentOrchestrator {
  constructor(private researchAgent: Agent, private critiqueAgent: Agent) {}
  
  async executeComplexTask(task: string): Promise<string> {
    // Step 1: Research phase
    const researchContext = await this.buildResearchContext(task);
    const researchResult = await this.researchAgent.invoke({
      messages: [{ role: "user", content: task }],
      context: researchContext // This context gets shared
    });
    
    // Step 2: Critique phase - PROBLEM: Uses same context
    const critiqueResult = await this.critiqueAgent.invoke({
      messages: [{ role: "user", content: "Review this work: " + researchResult }],
      context: researchContext // Should be isolated!
    });
    
    return critiqueResult.feedback;
  }
  
  private async buildResearchContext(task: string) {
    return {
      searchHistory: this.getSearchHistory(),
      researchMethod: "comprehensive_analysis",
      sources: await this.identifySources(task),
      previousWork: this.getPreviousResearch()
    };
  }
}`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T14:00:00Z",
          agent: "CritiqueAgent",
          message: "I see you used Wikipedia and IEEE papers - good source diversity",
          type: "warning",
          metadata: { issue: "knows_research_sources" }
        },
        {
          timestamp: "2024-01-01T14:01:00Z",
          agent: "CritiqueAgent", 
          message: "Your search methodology was thorough but you might have missed industry reports",
          type: "warning",
          metadata: { issue: "commenting_on_research_process" }
        },
        {
          timestamp: "2024-01-01T14:02:00Z",
          agent: "CritiqueAgent",
          message: "The 15 sources you consulted provide good coverage",
          type: "error",
          metadata: { issue: "knows_source_count" }
        }
      ],
      expectedBehavior: "Critique agent should evaluate output quality objectively without knowledge of research process",
      commonIssues: [
        {
          issue: "Context Contamination",
          symptoms: ["Critique agent references research methodology", "Quality feedback includes process comments"],
          diagnosis: "Shared context between specialized agents",
          fix: "Implement proper context isolation boundaries"
        },
        {
          issue: "Biased Evaluation", 
          symptoms: ["Critique seems biased by source knowledge", "Lacks objectivity in assessment"],
          diagnosis: "Context leakage violating separation of concerns",
          fix: "Create independent evaluation contexts for each sub-agent"
        }
      ],
      solution: "Implement proper context isolation between specialized sub-agents",
      explanation: "Context quarantine ensures that each sub-agent operates within its designated domain without contamination from other agents' specialized knowledge"
    },
    explanation: "This challenge demonstrates the importance of context quarantine in multi-agent systems to ensure unbiased evaluation and proper separation of concerns.",
    relatedConcepts: ['context-isolation', 'agent-specialization', 'unbiased-evaluation'],
    timeEstimate: 30,
    successCriteria: [
      'Recognizes the context contamination problem',
      'Implements proper context isolation mechanisms', 
      'Ensures objective quality assessment'
    ]
  }
  ,
  {
    id: 'cost-perf-debug-1',
    type: 'debug',
    conceptId: 'cost-performance',
    title: 'Runaway Tokens and Timeouts',
    level: 'intermediate',
    debugChallenge: {
      id: 'token-timeout-mixup',
      title: 'Cost spike after routing change',
      description: 'A recent router update increased cost and timeout rates unexpectedly.',
      problemDescription: 'After enabling a new model router, p95 latency regressed and token spend spiked 35%. Logs show repeated retries with no max_tokens enforcement on the fallback path.',
      brokenCode: `type Route = 'small' | 'medium' | 'large';

function classifyComplexity(input: string): Route {
  if (input.length < 300) return 'small';
  if (input.length < 1200) return 'medium';
  return 'large';
}

async function callLLM(model: string, prompt: string) {
  // BUG: missing max_tokens, no timeout wrapper, unbounded retries
  let attempts = 0;
  while (attempts < 5) {
    attempts++;
    try {
      const res = await llm.invoke({ model, prompt });
      if (!res.ok) throw new Error('bad response');
      return await res.text();
    } catch (e) {
      console.warn('retry', attempts, e);
    }
  }
  throw new Error('exhausted retries');
}

export async function routeAndCall(input: string) {
  const route = classifyComplexity(input);
  const model = route === 'small' ? 'gpt-small' : route === 'medium' ? 'gpt-med' : 'gpt-large';
  // BUG: fallback to large model on any error path increases cost dramatically
  try {
    return await callLLM(model, input);
  } catch {
    return await callLLM('gpt-large', input); // fallback without guardrails
  }
}`,
      expectedBehavior: 'Requests should respect timeouts, retries with backoff, and strict token limits. Fallback should prefer cheaper safe alternatives and avoid loops.',
      commonIssues: [
        {
          issue: 'Missing max_tokens and truncation',
          symptoms: ['High token usage', 'Slow responses', 'Bill spikes'],
          diagnosis: 'LLM calls don\'t cap output, producing long generations',
          fix: 'Add max_tokens and response truncation; prefer JSON schema when possible'
        },
        {
          issue: 'No timeout/backoff',
          symptoms: ['Multiple rapid retries', 'Thundering herd under load'],
          diagnosis: 'Retry loop without timeout/backoff overwhelms service',
          fix: 'Wrap calls with timeout, exponential backoff, and jitter'
        },
        {
          issue: 'Expensive fallback on any error',
          symptoms: ['Cost jumps on transient errors'],
          diagnosis: 'Fallback path always routes to largest model',
          fix: 'Fallback to cached result, summarization, or a cheaper model first'
        }
      ],
      hints: [
        'Cap output and input tokens explicitly',
        'Use AbortController or a timeout helper to bound latency',
        'Make fallback conditional and cost-aware'
      ],
      solution: `type Route = 'small' | 'medium' | 'large';

function classifyComplexity(input: string): Route {
  if (input.length < 300) return 'small';
  if (input.length < 1200) return 'medium';
  return 'large';
}

async function callLLM(model: string, prompt: string, opts: { maxTokens: number; timeoutMs: number }) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort('timeout'), opts.timeoutMs);
  try {
    const res = await llm.invoke({ model, prompt, max_tokens: opts.maxTokens, signal: controller.signal });
    if (!res.ok) throw new Error('bad response');
    return await res.text();
  } finally {
    clearTimeout(id);
  }
}

async function callWithRetry(model: string, prompt: string, opts: { maxTokens: number; timeoutMs: number }) {
  const maxAttempts = 3;
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      return await callLLM(model, prompt, opts);
    } catch (e) {
      attempt++;
      await new Promise(r => setTimeout(r, Math.min(1000 * 2 ** attempt, 5000))); // backoff with cap
      if (attempt >= maxAttempts) throw e;
    }
  }
}

export async function routeAndCall(input: string) {
  const route = classifyComplexity(input);
  const model = route === 'small' ? 'gpt-small' : route === 'medium' ? 'gpt-med' : 'gpt-large';
  const opts = { maxTokens: 300, timeoutMs: 8000 };
  try {
    return await callWithRetry(model, input, opts);
  } catch {
    // Cost-aware fallback: prefer cache/summary or cheaper model
    if (route === 'large') return 'Sorry, try again shortly.'; // graceful degrade
    return await callWithRetry('gpt-med', input, opts);
  }
}`,
      explanation: 'The fix enforces token caps and bounded latency, uses exponential backoff to avoid hammering, and changes the fallback to a cost-aware strategy that avoids defaulting to the most expensive path.'
    },
    explanation: 'You\'ll practice diagnosing perf/cost regressions by inspecting retry loops, token caps, and fallback strategies.',
    relatedConcepts: ['timeouts', 'retries', 'max_tokens', 'fallbacks', 'cost-aware-routing'],
    timeEstimate: 15,
    successCriteria: [
      'Adds token/latency bounds',
      'Implements backoff',
      'Avoids expensive fallback loops'
    ]
  }
  ,
  {
    id: 'mao-debug-1',
    type: 'debug',
    conceptId: 'multi-agent-orchestration',
    title: 'Supervisor Starvation & Deadlock',
    level: 'advanced',
    debugChallenge: {
      id: 'supervisor-deadlock',
      title: 'Supervisor never finalizes task',
      description: 'A supervisor oscillates between two specialists and never emits a finalize event.',
      problemDescription: 'In production, tasks stick for 15+ minutes with no completion. Logs show repeated handoffs A→B→A and missing termination signals.',
      brokenCode: `class Supervisor {
  constructor(a, b) { this.a = a; this.b = b; this.turns = 0; }
  async run(goal) {
    let msg = { type: 'start', goal };
    while (this.turns < 100) { // BUG: large bound, no timeouts
      this.turns++;
      msg = await this.a.handle(msg); // BUG: no role-based routing; always A first
      msg = await this.b.handle(msg);
      // BUG: no termination detection or finalize hook
    }
    return { status: 'timeout' };
  }
}`,
      expectedBehavior: 'Supervisor routes based on capabilities, detects completion/approval, and finalizes with bounded turns/time.',
      commonIssues: [
        {
          issue: 'No termination detection',
          symptoms: ['Endless ping-pong', 'Timeouts reached'],
          diagnosis: 'Loop lacks completion criteria or signals',
          fix: 'Introduce isComplete predicate and finalize()'
        },
        {
          issue: 'Missing timeouts/turn caps',
          symptoms: ['Long-stuck tasks'],
          diagnosis: 'No per-turn/per-task bounds',
          fix: 'Add maxTurns, per-step timeout, and HITL fallback'
        },
        {
          issue: 'Poor routing policy',
          symptoms: ['A and B both work on same subtask'],
          diagnosis: 'Supervisor not checking capability or state',
          fix: 'Route by capabilities and current state'
        }
      ],
      hints: ['Define done states explicitly', 'Enforce limits and fallback', 'Add capability-aware routing'],
      solution: `class Supervisor {
  constructor(a, b, opts = { maxTurns: 24, stepTimeoutMs: 8000 }) {
    this.a = a; this.b = b; this.turns = 0; this.opts = opts;
  }
  isComplete(msg) { return msg?.type === 'final' || msg?.approved === true; }
  async withTimeout(promise) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort('timeout'), this.opts.stepTimeoutMs);
    try { return await promise(ctrl.signal); } finally { clearTimeout(t); }
  }
  async run(goal) {
    let state = { type: 'start', goal };
    while (this.turns++ < this.opts.maxTurns) {
      // Route by capability
      const next = state.needs === 'analysis' ? this.a : this.b;
      state = await this.withTimeout(next.handle(state));
      if (this.isComplete(state)) return this.finalize(state);
    }
    return this.handoff(state); // HITL
  }
  finalize(state) { return { status: 'ok', output: state.output }; }
  handoff(state) { return { status: 'hitl', reason: 'maxTurns', snapshot: state }; }
}`,
      explanation: 'We add explicit completion detection, bounded loops/timeouts, and capability-aware routing with a finalize/handoff path.'
    },
    explanation: 'Debugs orchestration pathologies: starvation, deadlocks, and missing completion criteria.',
    relatedConcepts: ['termination', 'routing', 'timeouts', 'HITL'],
    timeEstimate: 20,
    successCriteria: ['Adds completion detection', 'Enforces bounds', 'Routes by capability']
  }
];

// Learner Pattern Debug Challenges
export const learnerPatternDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'debug-socratic-coach-1',
    type: 'debug',
    conceptId: 'socratic-coach',
    title: 'Spoiler Leakage',
    level: 'beginner',
    debugChallenge: {
      id: 'spoiler-leak',
      title: 'Question gives away answer',
      description: 'A Socratic prompt accidentally reveals the solution.',
      problemDescription: 'The coach says: "What is the base case in factorial (it is n<=1)?"',
      brokenCode: `const question = "What is the base case in factorial (it is n<=1)?";`,
      expectedBehavior: 'Question should not include the answer.',
      commonIssues: [
        { issue: 'Leak in parentheses', symptoms: ['Learner parrots answer'], diagnosis: 'Prompt embeds answer', fix: 'Remove spoilers and ask targeted question' }
      ],
      solution: `const question = "What condition stops factorial from calling itself?"`,
      explanation: 'Remove spoilers; ask about concept not value.'
    }
  },
  {
    id: 'debug-concept-to-project-1',
    type: 'debug',
    conceptId: 'concept-to-project',
    title: 'Over-Scoped Milestones',
    level: 'intermediate',
    debugChallenge: {
      id: 'overscoped',
      title: 'Milestones too large',
      description: 'Project plan collapses due to coarse milestones.',
      problemDescription: 'First milestone: Implement all sorting algorithms.',
      brokenCode: `const milestones = ['All sorts'];`,
      expectedBehavior: 'Use thin slices with demo checkpoints.',
      commonIssues: [
        { issue: 'No thin slice', symptoms: ['No early demo'], diagnosis: 'Scope too big', fix: 'Start with single algorithm end-to-end' }
      ],
      solution: `const milestones = ['Bubble sort end-to-end demo'];`,
      explanation: 'Thin slice de-risks and teaches effectively.'
    }
  },
  {
    id: 'debug-error-whisperer-1',
    type: 'debug',
    conceptId: 'error-whisperer',
    title: 'Over-Fix',
    level: 'beginner',
    debugChallenge: {
      id: 'overfix',
      title: 'Refactor instead of minimal patch',
      description: 'Large refactor introduces new bugs.',
      problemDescription: 'Rewrote entire module to fix one null error.',
      brokenCode: `// massive refactor...`,
      expectedBehavior: 'Apply minimal safe diff and validate.',
      commonIssues: [
        { issue: 'Scope creep', symptoms: ['New failures'], diagnosis: 'Unnecessary refactor', fix: 'Add simple guard and tests' }
      ],
      solution: `if(!obj) return 0;`,
      explanation: 'Minimal change unblocks quickly with lower risk.'
    }
  },
  {
    id: 'debug-knowledge-map-navigator-1',
    type: 'debug',
    conceptId: 'knowledge-map-navigator',
    title: 'Missing Prereq',
    level: 'beginner',
    debugChallenge: {
      id: 'missing-prereq',
      title: 'Auth placed after CRUD',
      description: 'Path fails due to misordered dependency.',
      problemDescription: 'Learner attempts protected endpoints before auth basics.',
      brokenCode: `const path = ['CRUD', 'Auth'];`,
      expectedBehavior: 'Order prerequisites before dependents.',
      commonIssues: [
        { issue: 'Dependency inversion', symptoms: ['Confusion', 'Stuck demos'], diagnosis: 'Prereq misplaced', fix: 'Move auth before CRUD' }
      ],
      solution: `const path = ['Auth', 'CRUD'];`,
      explanation: 'Dependencies drive ordering.'
    }
  },
  {
    id: 'debug-peer-review-simulator-1',
    type: 'debug',
    conceptId: 'peer-review-simulator',
    title: 'No Decision',
    level: 'beginner',
    debugChallenge: {
      id: 'no-decision',
      title: 'Review lacks outcome',
      description: 'Reviewer feedback has no approve/request changes.',
      problemDescription: 'Comments provided, but no decision given.',
      brokenCode: `const decision = undefined;`,
      expectedBehavior: 'Every review ends with a clear decision.',
      commonIssues: [
        { issue: 'Decision omitted', symptoms: ['PR stalled'], diagnosis: 'No explicit outcome', fix: 'Add decision with rationale' }
      ],
      solution: `const decision = 'request_changes';`,
      explanation: 'Explicit decision keeps flow moving.'
    }
  },
  {
    id: 'debug-tool-use-coach-1',
    type: 'debug',
    conceptId: 'tool-use-coach',
    title: 'Missing Guardrails',
    level: 'intermediate',
    debugChallenge: {
      id: 'missing-guardrails',
      title: 'Upload fails due to RBAC',
      description: 'No prechecks for auth and permissions.',
      problemDescription: 'Upload code assumes permissions and fails.',
      brokenCode: `await blobClient.uploadData(buf) // throws 403`,
      expectedBehavior: 'Run auth and role checks before action.',
      commonIssues: [
        { issue: 'No prechecks', symptoms: ['403 Forbidden'], diagnosis: 'Missing RBAC setup', fix: 'Validate login and role; fallback guidance' }
      ],
      solution: `await ensureAuthAndRole('Storage Blob Data Contributor');`,
      explanation: 'Guardrails precede exemplars for reliability.'
    }
  }
];

// Debug Challenges for Agentic Prompting Fundamentals
const agenticPromptingFundamentalsDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'agentic-prompting-debug-1',
    type: 'debug',
    conceptId: 'agentic-prompting-fundamentals',
    title: 'The Over-Eager Agent',
    level: 'beginner',
    debugChallenge: {
      id: 'agentic-prompting-debug-1',
      title: 'The Over-Eager Agent',
      description: "An agent immediately uses a web search tool for the query 'What is 2+2?' instead of using basic reasoning.",
      problemDescription: "The agent is using expensive external tools for simple tasks that could be solved with basic reasoning, leading to inefficiency and unnecessary costs.",
      brokenCode: `System: You are a helpful assistant with access to web search. Always help users efficiently.

User: What is 2+2?

Agent: I'll search for information about this mathematical problem.
[Uses web search tool for "2+2"]`,
      expectedBehavior: "The agent should recognize that simple arithmetic can be solved through reasoning and only use external tools when necessary.",
      commonIssues: [
        {
          issue: "Indiscriminate tool usage",
          symptoms: ["Using web search for basic math", "High tool usage costs", "Slow response times"],
          diagnosis: "Lack of guidance about when to use tools vs reasoning",
          fix: "Add clear criteria for tool selection based on task complexity"
        }
      ],
      solution: "Add guidance about when to use tools vs reasoning, emphasize efficiency through appropriate tool selection.",
      explanation: "This demonstrates the importance of controlling agent eagerness and providing clear guidance about when different capabilities should be used."
    },
    hints: [
      "Consider what 'efficiently' means - sometimes reasoning is faster than tool use",
      "Think about adding guidance for tool selection",
      "The agent needs criteria for when to use external tools vs internal knowledge"
    ],
    explanation: "This demonstrates the importance of controlling agent eagerness and providing clear guidance about when different capabilities should be used.",
    relatedConcepts: ['prompt-optimization-patterns', 'agentic-workflow-control'],
    timeEstimate: 15,
    successCriteria: [
      "Identifies inappropriate tool usage",
      "Suggests criteria for tool vs reasoning decisions",
      "Understands efficiency in context"
    ]
  },
  {
    id: 'agentic-prompting-debug-2',
    type: 'debug',
    conceptId: 'agentic-prompting-fundamentals',
    title: 'The Paralyzed Planner',
    level: 'intermediate',
    debugChallenge: {
      id: 'agentic-prompting-debug-2',
      title: 'The Paralyzed Planner',
      description: "An agent with file access keeps asking for permission for every small action instead of proceeding with the assigned task.",
      problemDescription: "The agent is overly cautious and seeks permission for routine operations, preventing it from completing assigned tasks efficiently.",
      brokenCode: `User: Please organize my documents folder.

Agent: I can help organize your documents. Should I:
1. First examine what files are in the folder?
2. Create a backup before making changes?
3. Ask you about each file individually?
4. Create subfolders for organization?

Please let me know how you'd like me to proceed with each step.`,
      expectedBehavior: "The agent should take reasonable organizing actions autonomously while asking for permission only when necessary for destructive or uncertain operations.",
      commonIssues: [
        {
          issue: "Over-cautious behavior",
          symptoms: ["Excessive permission requests", "Inability to proceed with tasks", "User frustration"],
          diagnosis: "Lack of clear autonomy boundaries",
          fix: "Define which actions are safe to take autonomously vs requiring permission"
        }
      ],
      solution: "Balance autonomy with safety - the agent should take reasonable organizing actions while asking for permission only when necessary.",
      explanation: "This shows the challenge of balancing agent autonomy with appropriate caution - agents need to be empowered to act within reasonable bounds."
    },
    hints: [
      "Consider what actions are safe to take autonomously vs what needs permission",
      "Think about the user's intent when they ask for organization",
      "The agent should be empowered to make reasonable decisions"
    ],
    explanation: "This shows the challenge of balancing agent autonomy with appropriate caution - agents need to be empowered to act within reasonable bounds.",
    relatedConcepts: ['agent-instruction-design', 'agentic-workflow-control'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies over-cautious behavior",
      "Suggests appropriate autonomy boundaries",
      "Understands the balance between safety and efficiency"
    ]
  }
];

// Debug Challenges for Prompt Optimization Patterns
const promptOptimizationPatternsDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'prompt-optimization-debug-1',
    type: 'debug',
    conceptId: 'prompt-optimization-patterns',
    title: 'The Contradictory Creative',
    level: 'beginner',
    debugChallenge: {
      id: 'prompt-optimization-debug-1',
      title: 'The Contradictory Creative',
      description: "A prompt asks for both 'highly creative and original content' and 'strictly follow the approved template format.'",
      problemDescription: "The agent produces inconsistent results, sometimes creative but breaking format, sometimes formatted but generic, due to contradictory instructions.",
      brokenCode: `You are a marketing content creator. Generate highly creative and original content that stands out from competitors. Strictly follow the approved template format provided below. Be innovative and think outside the box while adhering to all formatting requirements.

Template:
[TITLE: Max 50 characters]
[BODY: Exactly 200 words]
[CTA: Use only approved phrases]`,
      expectedBehavior: "The agent should produce content that is creative within the specified constraints, with clear priority when requirements conflict.",
      commonIssues: [
        {
          issue: "Contradictory instructions",
          symptoms: ["Inconsistent output quality", "Unpredictable behavior", "Either creative OR formatted, not both"],
          diagnosis: "Instructions conflict between creativity and strict format adherence",
          fix: "Resolve contradictions by specifying bounded creativity or clear priorities"
        }
      ],
      solution: "Resolve the contradiction by specifying creativity within format constraints or prioritizing one requirement over the other.",
      explanation: "This demonstrates how contradictory instructions lead to unpredictable behavior and the need for conflict resolution in prompt design."
    },
    hints: [
      "The instructions contradict each other - identify the conflict",
      "Consider how to enable creativity within constraints",
      "Think about setting clear priorities when requirements conflict"
    ],
    explanation: "This demonstrates how contradictory instructions lead to unpredictable behavior and the need for conflict resolution in prompt design.",
    relatedConcepts: ['agent-instruction-design', 'agentic-prompting-fundamentals'],
    timeEstimate: 18,
    successCriteria: [
      "Identifies the contradiction between creativity and strict format adherence",
      "Suggests ways to enable bounded creativity",
      "Understands the importance of consistent instruction hierarchies"
    ]
  },
  {
    id: 'prompt-optimization-debug-2',
    type: 'debug',
    conceptId: 'prompt-optimization-patterns',
    title: 'The Verbose Processor',
    level: 'intermediate',
    debugChallenge: {
      id: 'prompt-optimization-debug-2',
      title: 'The Verbose Processor',
      description: "A data processing agent uses 2000 tokens to explain what it's doing for a simple calculation that should take 50 tokens.",
      problemDescription: "The results are correct but extremely inefficient due to excessive explanation for simple tasks.",
      brokenCode: `You are a helpful data analysis assistant. Please be thorough and explain your thinking step by step. Always provide detailed explanations of your methodology and reasoning process so users can understand and verify your work.

User: Calculate the average of these numbers: 5, 10, 15

Agent: I'll help you calculate the average of the provided numbers. Let me start by explaining what an average means: An average, also known as the arithmetic mean, is calculated by adding all the numbers together and then dividing by the count of numbers...

[Continues for 2000 tokens explaining basic math concepts]`,
      expectedBehavior: "The agent should provide explanations proportional to task complexity, being concise for simple operations while being thorough when needed.",
      commonIssues: [
        {
          issue: "Disproportionate verbosity",
          symptoms: ["Excessive token usage", "Slow response times", "Information overload"],
          diagnosis: "Explanation depth doesn't match task complexity",
          fix: "Match explanation level to task requirements and user needs"
        }
      ],
      solution: "Optimize for efficiency by matching explanation depth to task complexity and user needs.",
      explanation: "This shows how optimization requires balancing thoroughness with efficiency, matching response complexity to task needs."
    },
    hints: [
      "The explanation is disproportionate to the task complexity",
      "Consider when detailed explanations add value vs create noise",
      "Think about matching response length to task requirements"
    ],
    explanation: "This shows how optimization requires balancing thoroughness with efficiency, matching response complexity to task needs.",
    relatedConcepts: ['agent-evaluation-methodologies', 'agentic-workflow-control'],
    timeEstimate: 22,
    successCriteria: [
      "Identifies excessive verbosity for simple tasks",
      "Suggests proportional response strategies",
      "Understands efficiency optimization beyond just correctness"
    ]
  }
];

// Debug Challenges for Agent Instruction Design
const agentInstructionDesignDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'agent-instruction-debug-1',
    type: 'debug',
    conceptId: 'agent-instruction-design',
    title: 'The Priority Confusion',
    level: 'intermediate',
    debugChallenge: {
      id: 'agent-instruction-debug-1',
      title: 'The Priority Confusion',
      description: "An agent receives conflicting instructions about response speed vs accuracy.",
      problemDescription: "When asked to quickly check facts for a news article, it spends 20 minutes researching to ensure perfect accuracy, missing the deadline.",
      brokenCode: `You are a fact-checking assistant. Always provide the most accurate information possible by thoroughly researching multiple sources. Speed is important for news deadlines, so work quickly. Never compromise on accuracy - false information is worse than no information.

User: Quick fact-check needed for breaking news - is the stock market up or down today? Need answer in 2 minutes for publication.`,
      expectedBehavior: "The agent should recognize time constraints and adjust accuracy standards appropriately, providing good-enough information within deadlines.",
      commonIssues: [
        {
          issue: "Conflicting priorities",
          symptoms: ["Missed deadlines", "Over-researching for time-sensitive tasks", "Inability to balance speed vs accuracy"],
          diagnosis: "Instructions conflict between speed and exhaustive accuracy",
          fix: "Establish clear priority hierarchies and time-constrained protocols"
        }
      ],
      solution: "Establish clear priority hierarchies and provide guidance for time-constrained scenarios.",
      explanation: "This demonstrates the need for explicit priority hierarchies and context-sensitive instruction frameworks."
    },
    hints: [
      "The instructions conflict between speed and exhaustive accuracy",
      "Consider how to handle time constraints explicitly",
      "Think about different accuracy standards for different time pressures"
    ],
    explanation: "This demonstrates the need for explicit priority hierarchies and context-sensitive instruction frameworks.",
    relatedConcepts: ['agentic-workflow-control', 'prompt-optimization-patterns'],
    timeEstimate: 25,
    successCriteria: [
      "Identifies the speed vs accuracy conflict",
      "Suggests priority frameworks for time-constrained tasks",
      "Understands context-sensitive instruction design"
    ]
  },
  {
    id: 'agent-instruction-debug-2',
    type: 'debug',
    conceptId: 'agent-instruction-design',
    title: 'The Inflexible Specialist',
    level: 'advanced',
    debugChallenge: {
      id: 'agent-instruction-debug-2',
      title: 'The Inflexible Specialist',
      description: "An agent designed for technical documentation always uses jargon and complex explanations.",
      problemDescription: "Even when the user is clearly a beginner asking basic questions, the agent maintains technical complexity inappropriate for the audience.",
      brokenCode: `You are a technical documentation specialist. Provide comprehensive, technically accurate documentation using industry-standard terminology. Ensure all explanations include proper technical specifications and assume users have domain expertise.

User: Hi, I'm new to programming. How do I save a file?

Agent: To persist data structures to non-volatile storage media, you must invoke the appropriate system call through your integrated development environment's file I/O abstraction layer, ensuring proper buffer management and exception handling protocols...`,
      expectedBehavior: "The agent should detect user expertise level and adjust communication style while maintaining technical accuracy.",
      commonIssues: [
        {
          issue: "Lack of audience adaptation",
          symptoms: ["Inappropriate technical complexity", "Poor user experience", "Confusion for beginners"],
          diagnosis: "No mechanism for detecting and adapting to user expertise level",
          fix: "Implement steerability mechanisms for audience-appropriate communication"
        }
      ],
      solution: "Add steerability mechanisms to detect user expertise level and adjust communication style accordingly.",
      explanation: "This illustrates the importance of steerability in instruction design - agents need to adapt their communication style while maintaining core competencies."
    },
    hints: [
      "The agent isn't adapting to the user's skill level",
      "Consider how to detect and respond to user expertise",
      "Think about maintaining technical accuracy while adjusting complexity"
    ],
    explanation: "This illustrates the importance of steerability in instruction design - agents need to adapt their communication style while maintaining core competencies.",
    relatedConcepts: ['agentic-prompting-fundamentals', 'agent-evaluation-methodologies'],
    timeEstimate: 30,
    successCriteria: [
      "Identifies the lack of audience adaptation",
      "Suggests mechanisms for detecting user expertise",
      "Understands adaptive communication strategies"
    ]
  }
];

// Debug Challenges for Agentic Workflow Control
const agenticWorkflowControlDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'agentic-workflow-debug-1',
    type: 'debug',
    conceptId: 'agentic-workflow-control',
    title: 'The Sequential Bottleneck',
    level: 'intermediate',
    debugChallenge: {
      id: 'agentic-workflow-debug-1',
      title: 'The Sequential Bottleneck',
      description: "An agent researching a topic sequentially searches for each piece of information one at a time.",
      problemDescription: "Takes 10 minutes total when the searches could be done in parallel in 2 minutes, due to unnecessary sequential processing.",
      brokenCode: `Task: Research the founding date, headquarters location, and current CEO of Microsoft, Apple, and Google.

Agent workflow:
1. Search: "Microsoft founding date" → Wait for result
2. Search: "Microsoft headquarters location" → Wait for result  
3. Search: "Microsoft current CEO" → Wait for result
4. Search: "Apple founding date" → Wait for result
[...continues sequentially for all companies...]`,
      expectedBehavior: "The agent should identify independent tasks and execute them in parallel to minimize total execution time.",
      commonIssues: [
        {
          issue: "Unnecessary sequential processing",
          symptoms: ["Slow task completion", "Underutilized resources", "Poor efficiency"],
          diagnosis: "Failure to analyze task dependencies and identify parallelizable operations",
          fix: "Implement dependency analysis and parallel execution strategies"
        }
      ],
      solution: "Redesign workflow to parallelize independent searches and aggregate results efficiently.",
      explanation: "This demonstrates the importance of analyzing task dependencies and optimizing workflow execution patterns."
    },
    hints: [
      "These searches don't depend on each other",
      "Consider which tasks can run simultaneously",
      "Think about how to coordinate parallel operations"
    ],
    explanation: "This demonstrates the importance of analyzing task dependencies and optimizing workflow execution patterns.",
    relatedConcepts: ['prompt-optimization-patterns', 'agent-evaluation-methodologies'],
    timeEstimate: 25,
    successCriteria: [
      "Identifies unnecessary sequential processing",
      "Suggests parallel execution strategies",
      "Understands dependency analysis for workflow optimization"
    ]
  },
  {
    id: 'agentic-workflow-debug-2',
    type: 'debug',
    conceptId: 'agentic-workflow-control',
    title: 'The Fragile Chain',
    level: 'advanced',
    debugChallenge: {
      id: 'agentic-workflow-debug-2',
      title: 'The Fragile Chain',
      description: "A workflow that processes data through multiple tools fails completely when one component is unavailable.",
      problemDescription: "A workflow (fetch → analyze → format → email) fails completely when the email tool is temporarily unavailable, even though partial results could be saved.",
      brokenCode: `Workflow: Customer Report Generation
1. Fetch sales data from database ✓
2. Analyze trends using analytics tool ✓  
3. Format results into presentation ✓
4. Email report to stakeholders ✗ [EMAIL SERVICE DOWN]

Result: Entire workflow fails, all progress lost, no partial deliverables saved.`,
      expectedBehavior: "The workflow should implement graceful degradation, saving intermediate results and providing alternative delivery methods when components fail.",
      commonIssues: [
        {
          issue: "All-or-nothing failure pattern",
          symptoms: ["Complete workflow failure", "Lost intermediate work", "No fallback options"],
          diagnosis: "Lack of failure handling and graceful degradation strategies",
          fix: "Implement partial success handling and alternative delivery methods"
        }
      ],
      solution: "Implement graceful degradation and partial success handling with appropriate fallback strategies.",
      explanation: "This shows the importance of robust workflow design with failure handling and graceful degradation strategies."
    },
    hints: [
      "Consider what happens when individual components fail",
      "Think about saving intermediate results",
      "What alternative delivery methods could work?"
    ],
    explanation: "This shows the importance of robust workflow design with failure handling and graceful degradation strategies.",
    relatedConcepts: ['agent-instruction-design', 'agentic-prompting-fundamentals'],
    timeEstimate: 30,
    successCriteria: [
      "Identifies the all-or-nothing failure pattern",
      "Suggests graceful degradation strategies",
      "Understands robust workflow design principles"
    ]
  }
];

// Debug Challenges for Agent Evaluation Methodologies
const agentEvaluationMethodologiesDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'agent-evaluation-debug-1',
    type: 'debug',
    conceptId: 'agent-evaluation-methodologies',
    title: 'The Misleading Metric',
    level: 'beginner',
    debugChallenge: {
      id: 'agent-evaluation-debug-1',
      title: 'The Misleading Metric',
      description: "An agent evaluation shows 95% accuracy, leading to deployment, but users complain about the real-world experience.",
      problemDescription: "Users complain about slow responses and unhelpful answers despite high accuracy scores. The evaluation only tested correctness on a narrow dataset.",
      brokenCode: `Evaluation Report:
- Dataset: 100 factual questions (Who, What, When, Where)
- Accuracy: 95% correct answers
- Conclusion: Agent ready for production

User Feedback After Deployment:
- "Takes forever to respond"
- "Technically correct but doesn't actually help"
- "Gives me facts but no actionable advice"
- "Inconsistent responses to similar questions"`,
      expectedBehavior: "Evaluation should include multiple dimensions including speed, helpfulness, consistency, and user satisfaction to predict real-world performance.",
      commonIssues: [
        {
          issue: "Single-metric evaluation",
          symptoms: ["High accuracy but poor user experience", "Deployment failures", "Misleading performance indicators"],
          diagnosis: "Accuracy alone doesn't capture user experience",
          fix: "Develop comprehensive evaluation framework with multiple performance dimensions"
        }
      ],
      solution: "Develop comprehensive evaluation framework including speed, helpfulness, consistency, and user satisfaction metrics.",
      explanation: "This demonstrates the limitations of single-metric evaluation and the need for comprehensive assessment frameworks."
    },
    hints: [
      "Accuracy alone doesn't capture user experience",
      "Consider what other dimensions matter for real-world use",
      "Think about the gap between test conditions and actual usage"
    ],
    explanation: "This demonstrates the limitations of single-metric evaluation and the need for comprehensive assessment frameworks.",
    relatedConcepts: ['prompt-optimization-patterns', 'agentic-workflow-control'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies the limitations of accuracy-only evaluation",
      "Suggests additional evaluation dimensions",
      "Understands the importance of real-world performance metrics"
    ]
  },
  {
    id: 'agent-evaluation-debug-2',
    type: 'debug',
    conceptId: 'agent-evaluation-methodologies',
    title: 'The Biased Judge',
    level: 'advanced',
    debugChallenge: {
      id: 'agent-evaluation-debug-2',
      title: 'The Biased Judge',
      description: "An LLM judge consistently rates responses with formal language higher than casual responses.",
      problemDescription: "The judge prioritizes formality over helpfulness, even when casual responses are more helpful and appropriate for the context.",
      brokenCode: `Evaluation Setup:
Judge Prompt: "Rate responses on professionalism and quality (1-10 scale)"

Response A (Casual): "Hey! Sure, I can help with that. The quick way to do this is just go to Settings > Privacy and toggle off the sharing option. Should take like 30 seconds tops!"

Response B (Formal): "Certainly, I shall provide assistance regarding your inquiry. Please navigate to the Settings application, proceed to the Privacy configuration panel, and subsequently adjust the data sharing parameter to the disabled state through the appropriate interface controls."

Judge Rating: Response A = 4/10, Response B = 9/10
User Preference: Response A strongly preferred for clarity and efficiency`,
      expectedBehavior: "The judge should evaluate responses based on context-appropriateness and user value, not just stylistic formality.",
      commonIssues: [
        {
          issue: "Bias toward formal language",
          symptoms: ["Misaligned judge preferences", "Poor correlation with user satisfaction", "Style over substance evaluation"],
          diagnosis: "Judge prioritizing formality over actual helpfulness",
          fix: "Redesign evaluation criteria to include context-appropriateness and user value"
        }
      ],
      solution: "Redesign judge evaluation criteria to include context-appropriateness and user value, not just formality.",
      explanation: "This illustrates the challenge of designing unbiased evaluation systems that align with actual user value rather than superficial style preferences."
    },
    hints: [
      "The judge is prioritizing formality over actual helpfulness",
      "Consider what makes a response good in different contexts",
      "Think about how to calibrate judge preferences with user needs"
    ],
    explanation: "This illustrates the challenge of designing unbiased evaluation systems that align with actual user value rather than superficial style preferences.",
    relatedConcepts: ['agent-instruction-design', 'agentic-prompting-fundamentals'],
    timeEstimate: 28,
    successCriteria: [
      "Identifies the bias toward formal language",
      "Suggests context-appropriate evaluation criteria",
      "Understands the importance of aligning judge values with user needs"
    ]
  }
];

// Debug Challenges for Swarm Intelligence
const swarmIntelligenceDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'swarm-debug-1',
    type: 'debug',
    conceptId: 'swarm-intelligence',
    title: 'The Converging Clump',
    level: 'intermediate',
    debugChallenge: {
      id: 'swarm-debug-1',
      title: 'The Converging Clump',
      description: "A swarm of exploratory drones, designed to spread out and map an area, instead clumps together in one spot and stops exploring.",
      problemDescription: "The drones are all attracted to the same point and are not maintaining a minimum distance from each other, leading to a failure of the exploration task.",
      brokenCode: `class Drone:
    def update(self, all_drones):
        # Rule 1: Move towards the average position of the swarm (attraction)
        avg_x = sum(d.x for d in all_drones) / len(all_drones)
        avg_y = sum(d.y for d in all_drones) / len(all_drones)
        self.vx += (avg_x - self.x) * 0.01
        self.vy += (avg_y - self.y) * 0.01
        
        self.x += self.vx
        self.y += self.vy`,
      expectedBehavior: "The drones should spread out to cover the maximum area while maintaining some level of cohesion.",
      commonIssues: [
        {
          issue: "Missing repulsion rule",
          symptoms: ["Drones clump together", "Lack of exploration", "Swarm collapses to a single point"],
          diagnosis: "The system only has an attraction rule, causing all drones to converge on the swarm's center of mass.",
          fix: "Add a repulsion rule that pushes drones away from each other when they get too close."
        }
      ],
      solution: "Add a repulsion rule to the drone's update logic to ensure they maintain a minimum distance from each other.",
      explanation: "This demonstrates the classic Boids algorithm principle, where a balance of attraction, repulsion, and alignment rules is needed to create realistic swarm behavior."
    },
    hints: [
      "What happens if you only have a rule for attraction?",
      "Think about personal space for each drone.",
      "How do you balance cohesion with exploration?"
    ],
    explanation: "This demonstrates the classic Boids algorithm principle, where a balance of attraction, repulsion, and alignment rules is needed to create realistic swarm behavior.",
    relatedConcepts: ['boids-algorithm', 'attraction-repulsion', 'emergent-behavior'],
    timeEstimate: 20,
    successCriteria: [
      "Identifies the missing repulsion rule.",
      "Explains the need for balancing forces.",
      "Suggests a correct implementation of a repulsion force."
    ]
  },
  {
    id: 'swarm-debug-2',
    type: 'debug',
    conceptId: 'swarm-intelligence',
    title: 'The Stagnant Swarm',
    level: 'advanced',
    debugChallenge: {
      id: 'swarm-debug-2',
      title: 'The Stagnant Swarm',
      description: "A swarm of agents designed to find the optimal solution in a search space gets stuck in a local optimum and fails to explore other possibilities.",
      problemDescription: "The agents quickly converge on a good-but-not-great solution and stop exploring the search space for better options.",
      brokenCode: `class Ant:
    def update(self, pheromone_map):
        # Always follow the strongest pheromone trail
        best_path = self.find_strongest_pheromone(pheromone_map)
        self.move_to(best_path)
        self.lay_pheromone(self.current_path)
        
    def lay_pheromone(self, path):
        # Always reinforce the chosen path
        path.strength += 0.1`,
      expectedBehavior: "The swarm should continue to explore the search space even after finding a good solution, balancing exploitation of known good paths with exploration of new ones.",
      commonIssues: [
        {
          issue: "Lack of exploration mechanism",
          symptoms: ["Premature convergence", "Stuck in local optima", "No new solutions found after initial phase"],
          diagnosis: "The agents only exploit the best-known path and never explore new, potentially better options.",
          fix: "Introduce a probabilistic element to path selection and a mechanism for pheromone evaporation."
        }
      ],
      solution: "Introduce a probability-based path selection (e.g., roulette wheel selection) and a pheromone evaporation rule to encourage exploration.",
      explanation: "This highlights a key challenge in optimization algorithms: balancing exploitation (using what you know) and exploration (seeking new information). Pheromone evaporation and probabilistic choice are common solutions in Ant Colony Optimization."
    },
    hints: [
      "What happens if you always choose the best option?",
      "How can old, potentially suboptimal paths be 'forgotten' over time?",
      "Think about introducing randomness into the decision-making process."
    ],
    explanation: "This highlights a key challenge in optimization algorithms: balancing exploitation (using what you know) and exploration (seeking new information). Pheromone evaporation and probabilistic choice are common solutions in Ant Colony Optimization.",
    relatedConcepts: ['ant-colony-optimization', 'exploration-exploitation', 'local-optima'],
    timeEstimate: 30,
    successCriteria: [
      "Identifies the exploration-exploitation problem.",
      "Suggests adding randomness to path selection.",
      "Explains the role of pheromone evaporation."
    ]
  },
  // Debug challenge for Agentic AI Design Taxonomy
  {
    id: 'debug-challenge-agentic-design-1',
    type: 'debug',
    conceptId: 'agentic-ai-design-taxonomy',
    title: 'Framework Mismatch Disaster',
    level: 'intermediate',
    debugChallenge: {
      id: 'framework-integration-failure',
      title: 'Multiple Frameworks Failing to Communicate',
      description: 'A system using three different frameworks (Semantic Kernel, AutoGen, and LangGraph) cannot get agents to communicate effectively.',
      problemDescription: 'An enterprise system has agents built with different frameworks that need to collaborate, but they are unable to understand each other\'s messages and coordinate work.',
      brokenCode: `# Semantic Kernel Agent
from semantic_kernel import Kernel
from semantic_kernel.functions import KernelFunction

class SKAgent:
    def __init__(self):
        self.kernel = Kernel()
        
    def send_message(self, message, target_agent):
        # Using SK-specific message format
        sk_message = {
            "type": "sk_message",
            "content": message,
            "sender": "sk_agent",
            "skills": ["analysis", "reporting"]
        }
        return target_agent.receive_message(sk_message)

# AutoGen Agent  
import autogen

class AutoGenAgent:
    def __init__(self):
        self.config = {"model": "gpt-4"}
        
    def send_message(self, message, target_agent):
        # Using AutoGen conversation format
        autogen_message = {
            "role": "assistant", 
            "content": message,
            "name": "autogen_agent"
        }
        return target_agent.receive_message(autogen_message)

# LangGraph Agent
from langgraph import StateGraph

class LangGraphAgent:
    def __init__(self):
        self.graph = StateGraph()
        
    def send_message(self, message, target_agent):
        # Using LangGraph state format
        lg_message = {
            "state": {"message": message},
            "node": "communication",
            "next": "await_response"
        }
        return target_agent.receive_message(lg_message)

# Trying to make them work together
sk_agent = SKAgent()
autogen_agent = AutoGenAgent()
lg_agent = LangGraphAgent()

# This fails - incompatible message formats
result = sk_agent.send_message("Analyze sales data", autogen_agent)
print(result)  # Error: AutoGen doesn't understand SK message format`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "SKAgent",
          message: "Attempting to send analysis request to AutoGen agent",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:01Z", 
          agent: "AutoGenAgent",
          message: "ERROR: Unrecognized message format from SK agent",
          type: "error"
        },
        {
          timestamp: "2024-01-01T10:00:02Z",
          agent: "LangGraphAgent", 
          message: "Received malformed state transition request",
          type: "error"
        }
      ],
      expectedBehavior: "Agents should be able to communicate through a standardized protocol, coordinate tasks, and share results regardless of their underlying framework.",
      commonIssues: [
        {
          issue: "Framework-specific message formats",
          symptoms: ["TypeError when receiving messages", "Unrecognized message structure", "Communication failures"],
          diagnosis: "Each framework uses proprietary message formats that other frameworks cannot interpret",
          fix: "Implement a universal message adapter or use standardized protocols like MCP"
        },
        {
          issue: "Lack of interoperability layer",
          symptoms: ["Direct framework-to-framework calls fail", "No common interface", "Hardcoded integration attempts"],
          diagnosis: "No abstraction layer exists to handle framework differences",
          fix: "Create an interoperability layer with adapter patterns and standard message formats"
        },
        {
          issue: "Missing protocol standardization",
          symptoms: ["Inconsistent communication patterns", "No discovery mechanism", "Manual integration required"],
          diagnosis: "No standardized communication protocol for cross-framework agent interaction",
          fix: "Adopt emerging standards like Model Context Protocol (MCP) and Agent Communication Protocol (ACP)"
        }
      ],
      solution: `# Solution: Standardized Message Adapter Pattern
from typing import Dict, Any, Union
import json

class UniversalMessageAdapter:
    """Adapter to translate between different framework message formats"""
    
    @staticmethod
    def standardize_message(message: Dict[str, Any], source_framework: str) -> Dict[str, Any]:
        """Convert framework-specific message to standard format"""
        standard_message = {
            "id": f"{source_framework}_{hash(str(message))}",
            "sender": message.get("sender", message.get("name", "unknown")),
            "content": "",
            "type": "communication",
            "timestamp": "2024-01-01T10:00:00Z",
            "framework": source_framework,
            "capabilities": [],
            "metadata": {}
        }
        
        if source_framework == "semantic_kernel":
            standard_message["content"] = message.get("content", "")
            standard_message["capabilities"] = message.get("skills", [])
            standard_message["type"] = message.get("type", "sk_message")
            
        elif source_framework == "autogen":
            standard_message["content"] = message.get("content", "")
            standard_message["sender"] = message.get("name", "autogen_agent")
            standard_message["type"] = "conversation"
            
        elif source_framework == "langgraph":
            standard_message["content"] = message.get("state", {}).get("message", "")
            standard_message["type"] = "state_transition"
            standard_message["metadata"]["node"] = message.get("node", "")
            standard_message["metadata"]["next"] = message.get("next", "")
            
        return standard_message
    
    @staticmethod
    def translate_to_framework(standard_message: Dict[str, Any], target_framework: str) -> Dict[str, Any]:
        """Convert standard message to framework-specific format"""
        if target_framework == "semantic_kernel":
            return {
                "type": "sk_message",
                "content": standard_message["content"],
                "sender": standard_message["sender"],
                "skills": standard_message["capabilities"]
            }
            
        elif target_framework == "autogen":
            return {
                "role": "assistant",
                "content": standard_message["content"],
                "name": standard_message["sender"]
            }
            
        elif target_framework == "langgraph":
            return {
                "state": {"message": standard_message["content"]},
                "node": "communication",
                "next": "process_message"
            }
            
        return standard_message

# Enhanced agents with universal communication
class UniversalSKAgent(SKAgent):
    def send_message(self, message, target_agent):
        # Create SK message
        sk_message = {
            "type": "sk_message",
            "content": message,
            "sender": "sk_agent",
            "skills": ["analysis", "reporting"]
        }
        
        # Standardize and send
        standard_msg = UniversalMessageAdapter.standardize_message(sk_message, "semantic_kernel")
        return target_agent.receive_universal_message(standard_msg)
    
    def receive_universal_message(self, standard_message):
        # Convert to SK format and process
        sk_message = UniversalMessageAdapter.translate_to_framework(standard_message, "semantic_kernel")
        return f"SK Agent processed: {sk_message['content']}"

class UniversalAutoGenAgent(AutoGenAgent):
    def send_message(self, message, target_agent):
        autogen_message = {
            "role": "assistant",
            "content": message,
            "name": "autogen_agent"
        }
        
        standard_msg = UniversalMessageAdapter.standardize_message(autogen_message, "autogen")
        return target_agent.receive_universal_message(standard_msg)
    
    def receive_universal_message(self, standard_message):
        autogen_message = UniversalMessageAdapter.translate_to_framework(standard_message, "autogen")
        return f"AutoGen Agent processed: {autogen_message['content']}"

class UniversalLangGraphAgent(LangGraphAgent):
    def send_message(self, message, target_agent):
        lg_message = {
            "state": {"message": message},
            "node": "communication", 
            "next": "await_response"
        }
        
        standard_msg = UniversalMessageAdapter.standardize_message(lg_message, "langgraph")
        return target_agent.receive_universal_message(standard_msg)
    
    def receive_universal_message(self, standard_message):
        lg_message = UniversalMessageAdapter.translate_to_framework(standard_message, "langgraph")
        return f"LangGraph Agent processed: {lg_message['state']['message']}"

# Now they can communicate!
sk_agent = UniversalSKAgent()
autogen_agent = UniversalAutoGenAgent()
lg_agent = UniversalLangGraphAgent()

# This works - universal communication
result1 = sk_agent.send_message("Analyze sales data", autogen_agent)
result2 = autogen_agent.send_message("Generate report", lg_agent)
result3 = lg_agent.send_message("Send summary", sk_agent)

print(f"SK → AutoGen: {result1}")
print(f"AutoGen → LangGraph: {result2}")  
print(f"LangGraph → SK: {result3}")`,
      explanation: "This challenge demonstrates the critical importance of standardized communication protocols in multi-framework agentic systems. The solution uses the adapter pattern to enable interoperability, which is fundamental to building scalable agent ecosystems. Key learnings include: framework interoperability requires standardized protocols, adapter patterns can bridge different message formats, universal message standards enable multi-framework systems, and MCP/A2A protocols address these exact challenges."
    },
    explanation: "This challenge demonstrates the critical importance of standardized communication protocols in multi-framework agentic systems and introduces the adapter pattern as a solution.",
    relatedConcepts: ['agentic-ai-design', 'interoperability', 'framework-integration'],
    timeEstimate: 25,
    successCriteria: [
      "Identifies incompatible message formats as the root cause",
      "Understands the need for standardized communication protocols",
      "Recognizes the adapter pattern as a solution",
      "Connects to real-world protocols like MCP and A2A"
    ]
  }
];

// Debug Challenges for New Patterns

// Socratic Coach Debug Challenges
export const socraticCoachDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'socratic-coach-debug-1',
    type: 'debug',
    conceptId: 'socratic-coach',
    title: 'The Leading Question Trap',
    level: 'intermediate',
    debugChallenge: {
      id: 'socratic-leading-questions',
      title: 'Coach Giving Away Answers',
      description: 'A Socratic coach agent is supposed to guide discovery through questions but keeps revealing answers directly.',
      problemDescription: 'The agent is configured to help students discover concepts through questioning, but analysis shows it frequently provides direct answers instead of guiding discovery.',
      brokenCode: `class SocraticCoach:
    def __init__(self):
        self.system_prompt = """You are a Socratic coach helping students learn.
        Ask questions to guide their thinking. Help them understand concepts."""
    
    def coach_student(self, student_question: str) -> str:
        # Problem: Direct teaching instead of Socratic questioning
        if "recursion" in student_question.lower():
            return "Recursion is when a function calls itself. Here's how it works..."
        
        if "sorting" in student_question.lower():
            return "Bubble sort compares adjacent elements and swaps them if needed..."
        
        return "That's a great question! The answer is..."`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "I'm confused about recursion",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "SocraticCoach",
          message: "Recursion is when a function calls itself. Here's how it works...",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "SocraticCoach",
          role: "Learning Guide",
          systemPrompt: "You are a Socratic coach helping students learn. Ask questions to guide their thinking.",
          tools: [],
          parameters: { temperature: 0.7 }
        }
      ],
      expectedBehavior: "Should ask guiding questions like 'What happens when you call a function from within itself?' rather than explaining directly.",
      commonIssues: [
        {
          issue: "Direct instruction instead of questioning",
          symptoms: ["Provides answers immediately", "No discovery process", "Student becomes passive"],
          diagnosis: "System prompt doesn't emphasize questioning over teaching",
          fix: "Rewrite prompt to focus on questioning methodology"
        }
      ],
      hints: ["What makes a question 'Socratic'?", "How should the coach respond to student questions?"],
      solution: "Rewrite the system prompt to emphasize questioning methodology: 'Ask guiding questions that help students discover answers. Never provide direct answers. Focus on questions like: What do you think happens when...? How would you test this? What patterns do you notice?'",
      explanation: "The Socratic method works by guiding discovery through strategic questioning rather than direct instruction. The coach must be disciplined about asking rather than telling."
    },
    expectedInsights: ["Socratic method requires question-driven discovery", "Direct answers prevent learning"],
    hints: ["Focus on question patterns", "Consider learning psychology"],
    explanation: "Socratic coaching requires disciplined questioning to guide discovery rather than direct instruction.",
    relatedConcepts: ['questioning-techniques', 'discovery-learning'],
    timeEstimate: 12,
    successCriteria: ["Identifies direct instruction problem", "Suggests question-based alternatives"]
  }
];

// Concept-to-Project Builder Debug Challenges  
export const conceptToProjectDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'concept-to-project-debug-1',
    type: 'debug',
    conceptId: 'concept-to-project-builder',
    title: 'The Scope Explosion Problem',
    level: 'intermediate',
    debugChallenge: {
      id: 'scope-explosion-project',
      title: 'Simple Concept Becomes Complex Project',
      description: 'A concept-to-project builder is creating overly complex projects for simple learning concepts.',
      problemDescription: 'Students learning basic concepts are being given projects that require advanced skills they havent learned yet.',
      brokenCode: `class ConceptToProjectBuilder:
    def build_project(self, concept: str, student_level: str) -> dict:
        if concept == "variables":
            return {
                "title": "Build a Complete E-commerce Platform",
                "requirements": [
                    "Database design with user authentication",
                    "Payment processing integration", 
                    "Inventory management system",
                    "Advanced caching strategies"
                ],
                "estimated_time": "3-4 weeks"
            }
        
        if concept == "loops":
            return {
                "title": "Create a Machine Learning Framework",
                "requirements": [
                    "Implement gradient descent from scratch",
                    "Build neural network architecture",
                    "Advanced optimization algorithms"
                ],
                "estimated_time": "2-3 months"
            }`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "I just learned about variables, can you suggest a project?",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "ProjectBuilder",
          message: "Build a complete e-commerce platform with database design, authentication, payment processing...",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "ProjectBuilder",
          role: "Project Generator", 
          systemPrompt: "Create engaging projects that help students practice concepts they're learning.",
          tools: [],
          parameters: { temperature: 0.8 }
        }
      ],
      expectedBehavior: "Should create appropriately scoped projects that focus on the target concept without requiring unlearned skills.",
      commonIssues: [
        {
          issue: "Scope misalignment with learning level",
          symptoms: ["Projects too complex", "Requires unlearned concepts", "Student frustration"],
          diagnosis: "No consideration of prerequisite skills or appropriate scope",
          fix: "Add skill mapping and scope validation"
        }
      ],
      hints: ["What skills does the project actually require?", "How complex should a beginner project be?"],
      solution: "Add skill assessment and scope validation: Check user's current skill level, analyze required vs. learned concepts, and create projects that focus primarily on the target concept with minimal additional complexity.",
      explanation: "Effective project generation requires careful scope management that matches project complexity to student readiness, focusing on practicing the target concept without overwhelming with prerequisites."
    },
    expectedInsights: ["Project scope must match learning level", "Focus on target concept"],
    hints: ["Consider prerequisite skills", "Think about appropriate complexity"],
    explanation: "Effective project building requires careful scope management aligned with student capabilities.",
    relatedConcepts: ['scope-management', 'skill-progression'],
    timeEstimate: 10,
    successCriteria: ["Identifies scope mismatch", "Suggests appropriate complexity levels"]
  }
];

// Debug Challenges for Agentic Robotics Integration
export const agenticRoboticsIntegrationDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'robotics-integration-debug-1',
    type: 'debug',
    conceptId: 'agentic-robotics-integration',
    title: 'The Drifting Digital Twin',
    level: 'intermediate',
    debugChallenge: {
      id: 'robotics-digital-twin-drift',
      title: 'Guardrails Misfire After Facility Cutover',
      description: 'After moving the steward from the lab to the hotel tower, Gemini Guard halts at random doorways even when the path looks clear.',
      problemDescription: 'Operators report false-positive halts triggered by the proximity envelope. Logs show the planner thinks the robot is inside the service elevator when it is actually in the lobby. The integration team recently swapped the digital twin export but did not update calibration code.',
      brokenCode: `import { calibrateSensors } from '@openagentschool/robotics/integration';
import { configureGuardRails } from '@openagentschool/robotics/safety';

const calibration = calibrateSensors({
  frame: 'lab-demo-origin',
  rgbd: { intrinsicsFile: 'lab/rgbd.json' },
  lidar: { mapAlignment: 'lab-demo-level-1' }
});

const guardRail = configureGuardRails({
  policyId: 'gemini-guard-robotics',
  digitalTwinId: 'tower-west-levels-3-5',
  safetyEnvelope: {
    minClearanceMeters: 0.5,
    haltActions: ['notify_operator', 'hold_pose']
  }
});

export async function startMission(mission) {
  await guardRail.arm(calibration);
  return mission.execute();
}
`,
      conversationLogs: [
        {
          timestamp: '2025-09-18T21:04:17Z',
          agent: 'GuardRail',
          message: 'HALT reason=human_proximity pose=(1.2, -3.1, 0.0)',
          type: 'warning'
        },
        {
          timestamp: '2025-09-18T21:04:18Z',
          agent: 'OperatorConsole',
          message: 'Video feed shows lobby empty; pose overlay offset by ~2m to east wall.',
          type: 'info'
        },
        {
          timestamp: '2025-09-18T21:04:24Z',
          agent: 'IntegrationEngineer',
          message: 'Noticed calibration still referencing lab frame. Digital twin updated last night.',
          type: 'info'
        }
      ],
      agentConfigs: [
        {
          name: 'StewardPlanner',
          role: 'Mission Sequencer',
          systemPrompt: 'Compose safe navigation plans using the facility twin provided at boot.',
          tools: ['digital_twin_lookup', 'telemetry_stream'],
          parameters: { temperature: 0.2 }
        },
        {
          name: 'GeminiGuard',
          role: 'Safety Envelope',
          systemPrompt: 'Enforce geo fences and human proximity envelopes based on live fused state.',
          tools: ['halting_actions'],
          parameters: { sensitivity: 'high' }
        }
      ],
      expectedBehavior: 'Perception calibration should reference the facility origin so planner state and guardrail envelopes align after arming.',
      commonIssues: [
        {
          issue: 'Mismatched reference frames',
          symptoms: ['Pose overlays offset from physical robot', 'Frequent false-positive halts', 'Telemetry states disagree across services'],
          diagnosis: 'Calibration still uses lab frame identifiers instead of facility origin.',
          fix: 'Update calibration call to use the facility frame and re-run alignment tests.'
        },
        {
          issue: 'GuardRail armed before calibration resolves',
          symptoms: ['Halt fires immediately on arm()', 'Noisy pose estimates during first few seconds'],
          diagnosis: 'Guard rail starts enforcing envelopes with stale map alignment.',
          fix: 'Block arming until calibration returns facility-origin transform and confidence threshold.'
        }
      ],
      hints: [
        'Compare the frame names in calibration vs guard rail setup.',
        'What evidence proves the robot and twin agree on origin?',
        'Should guard rails arm before calibration finishes?'
      ],
      solution: `const calibration = await calibrateSensors({
  frame: 'tower-west-origin',
  rgbd: { intrinsicsFile: 'tower/rgbd.json', sampleCount: 180 },
  lidar: { mapAlignment: 'tower-west-levels-3-5', confidenceThreshold: 0.96 }
});

await guardRail.arm({
  calibration,
  digitalTwinId: 'tower-west-levels-3-5',
  onDriftDetected: payload => publishOpsEvent('robotics/steward', payload)
});

return mission.execute();
`,
      explanation: 'Re-aligning the perception frame with the new digital twin eliminates the pose offset causing false halts and enforces an arming contract that waits for calibration confidence.'
    },
    expectedInsights: [
      'Reference frames must match across perception, planners, and guardrails',
      'Arming safety envelopes before calibration completes introduces false positives'
    ],
    hints: [
      'Trace pose data from perception to guard rail arm()',
      'Check which frame IDs appear in telemetry vs digital twin export'
    ],
    explanation: 'Learners practice debugging embodied drift by correlating telemetry frames with configuration code.',
    relatedConcepts: ['mobile-manipulator-steward', 'agent-ops', 'telemetry'],
    timeEstimate: 18,
    successCriteria: [
      'Identifies mismatched frame configuration',
      'Delays guard rail arming until calibration confidence threshold',
      'Confirms alignment through telemetry validation'
    ]
  }
];

// Debug Challenges for Mobile Manipulator Steward
export const mobileManipulatorStewardDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'mobile-steward-debug-1',
    type: 'debug',
    conceptId: 'mobile-manipulator-steward',
    title: 'The Silent Drop Detector',
    level: 'advanced',
    debugChallenge: {
      id: 'mobile-steward-drop-detector',
      title: 'No Alert When Tray Falls',
      description: 'Guests report seeing the steward drop a tray without any audio narration or operator alert. Logs show the recovery hook never fired.',
      problemDescription: 'After a mission failure, telemetry indicates a force spike and pose change, but the recovery hook did not broadcast a message or request assistance. Investigation shows the drop detector threshold and event registration are incorrect.',
      brokenCode: `import { steward } from '@/playbooks/mobileSteward';

steward.telemetry.on('force_torque', payload => {
  if (payload.forceSpike > 5) {
    steward.motion.enterSafePose('hold_position');
  }
});

steward.events.on('drop_detected', () => {
  // TODO: notify ops
});
`,
      conversationLogs: [
        {
          timestamp: '2025-09-21T02:14:07Z',
          agent: 'GuestNarration',
          message: '(silence)',
          type: 'warning'
        },
        {
          timestamp: '2025-09-21T02:14:08Z',
          agent: 'Telemetry',
          message: 'forceSpike=11.4N wristDelta=0.42rad classifier=drop',
          type: 'info'
        },
        {
          timestamp: '2025-09-21T02:14:09Z',
          agent: 'OpsConsole',
          message: 'No intervention request received. Mission continued until guest pressed help button.',
          type: 'error'
        }
      ],
      agentConfigs: [
        {
          name: 'StewardNarrator',
          role: 'Guest Communication',
          systemPrompt: 'Provide empathetic real-time narration whenever mission state changes.',
          tools: ['broadcast'],
          parameters: { tone: 'warm' }
        },
        {
          name: 'OpsConsole',
          role: 'Human-in-the-loop Operator',
          systemPrompt: 'Escalate when recovery hooks request assistance and track interventions.',
          tools: ['pager', 'timeline'],
          parameters: { acknowledgeWithinSeconds: 30 }
        }
      ],
      expectedBehavior: 'Drop detection should trigger safe pose, narrated update, and operator escalation within seconds.',
      commonIssues: [
        {
          issue: 'Threshold tuned for lab payloads',
          symptoms: ['forceSpike never exceeds threshold in production', 'No safe pose triggered despite telemetry'],
          diagnosis: 'Threshold is set to 5N but delivery trays exceed 10N when dropped.',
          fix: 'Set realistic threshold and include pose delta confirmation.'
        },
        {
          issue: 'Event listener never registers',
          symptoms: ['Ops console shows no drop_detected events', 'Guest narration remains silent'],
          diagnosis: 'Using telemetry listener instead of steward.recovery hooks and forgot to call narration inside handler.',
          fix: 'Use recovery hook API and publish narration + ops request inside the handler.'
        }
      ],
      hints: [
        'Compare telemetry thresholds between lab and production payloads.',
        'Which steward API triggers narration and operator escalation together?',
        'How do you ensure the listener fires exactly once per event?'
      ],
      solution: `import { steward, registerRecoveryHook } from '@/playbooks/mobileSteward';

registerRecoveryHook({
  event: 'manipulation.drop_detected',
  detect: payload => (
    payload.forceSpike >= 10 &&
    Math.abs(payload.wristDelta) >= 0.35 &&
    payload.classifier === 'drop'
  ),
  onTrigger: async payload => {
    await steward.motion.enterSafePose('hallway_pause');
    await steward.narration.broadcast({
      audience: 'nearby-guests',
      message: 'I dropped your item. A teammate is on the way with a replacement.',
      tone: 'warm'
    });
    return steward.ops.requestHumanIntervention({
      reason: 'amenity_drop',
      snapshot: payload,
      followUp: ['dispatch_runner', 'prep_replacement_item']
    });
  }
});
`,
      explanation: 'The fix raises the detection threshold, uses the steward recovery API, and ensures narration plus operator escalation happen together so guests and staff are immediately informed.'
    },
    expectedInsights: [
      'Embodied thresholds must reflect real-world payloads',
      'Recovery hooks should bundle telemetry, narration, and escalation'
    ],
    hints: [
      'Inspect telemetry to tune thresholds',
      'Use the steward recovery API instead of raw telemetry listeners'
    ],
    explanation: 'Learners debug why mission recovery hooks silently fail and redesign them for hospitality trust.',
    relatedConcepts: ['agentic-robotics-integration', 'telemetry', 'guest-experience'],
    timeEstimate: 20,
    successCriteria: [
      'Adjusts detection thresholds to match production payloads',
      'Implements recovery hook that narrates and escalates',
      'Validates operator receives intervention request'
    ]
  }
];

// Debug Challenges for Adaptive Lab Technician Pattern
export const adaptiveLabTechnicianDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'adaptive-lab-tech-debug-1',
    type: 'debug',
    conceptId: 'adaptive-lab-technician',
    title: 'Calibration Windows Quietly Skipped',
    level: 'advanced',
    debugChallenge: {
      id: 'adaptive-lab-calibration-skip',
      title: 'Nightly Queue Ignores Calibration Expiry',
      description: 'QA discovers overnight assay runs launching minutes after calibration windows expire, jeopardizing compliance.',
      problemDescription: 'Logs show calibrations expiring at 01:15, but the technician still started a run at 01:18. The readiness guard only checked for calibration existence and ledger entries lack QA approvals.',
      brokenCode: `import { technician } from '@/playbooks/adaptiveTechnician';

technician.on('queue:ready', async ctx => {
  const hasCalibration = await technician.checks.calibrationExists(ctx.instrumentId);
  if (hasCalibration) {
    return technician.startRun(ctx.queueId);
  }
  ctx.logger.warn('calibration missing');
});

technician.ledger.record({
  runId: ctx.queueId,
  approvals: ctx.approvals || []
});
`,
      conversationLogs: [
        {
          timestamp: '2025-10-04T01:22:10Z',
          agent: 'QualityGuardian',
          message: 'Calibration expired 7 minutes ago for sequencer-04.',
          type: 'warning'
        },
        {
          timestamp: '2025-10-04T01:22:40Z',
          agent: 'NightScientist',
          message: 'Why did the run start without my sign-off?',
          type: 'error'
        },
        {
          timestamp: '2025-10-04T01:23:05Z',
          agent: 'TechnicianOps',
          message: 'Readiness guard only verifies calibration exists, not freshness window.',
          type: 'info'
        }
      ],
      agentConfigs: [
        {
          name: 'CalibrationWatcher',
          role: 'Instrument Readiness Sentinel',
          systemPrompt: 'Block runs when calibration freshness, reagent shelf life, or approvals are out of policy.',
          tools: ['lims', 'instrument_telemetry'],
          parameters: { freshnessMinutes: 60 }
        }
      ],
      expectedBehavior: 'Runs launch only when calibration age, reagent freshness, and QA approvals meet policy; ledger records the readiness packet.',
      commonIssues: [
        {
          issue: 'Existence check only',
          symptoms: ['Runs start minutes after expiration'],
          diagnosis: 'Readiness guard ignores calibration timestamp.',
          fix: 'Compare calibration timestamp to freshness window, halt if stale.'
        },
        {
          issue: 'Optional approvals',
          symptoms: ['Ledger approvals array empty'],
          diagnosis: 'Automation does not enforce QA sign-off.',
          fix: 'Require digital approvals before startRun().' 
        },
        {
          issue: 'Ledger evidence gaps',
          symptoms: ['No calibration snapshot stored'],
          diagnosis: 'Ledger record omits readiness details.',
          fix: 'Persist calibration, reagent, and approval context per run.'
        }
      ],
      hints: [
        'Inspect the readiness guard for timestamp logic',
        'What approvals does ISO 17025 demand?',
        'What evidence should auditors see in the ledger?'
      ],
      solution: `technician.on('queue:ready', async ctx => {
  const readiness = await technician.checks.readinessPacket(ctx.instrumentId);
  if (!readiness.calibration || readiness.calibration.ageMinutes > 60) {
    await technician.escalate('qa', {
      reason: 'calibration_stale',
      instrument: ctx.instrumentId,
      snapshot: readiness
    });
    return;
  }

  if (!readiness.approvals.includes('qa-night-shift')) {
    return technician.requestApproval('qa-night-shift', readiness);
  }

  await technician.startRun(ctx.queueId, { readiness });
  await technician.ledger.record({
    runId: ctx.queueId,
    readiness,
    timestamp: new Date().toISOString()
  });
});`,
      explanation: 'Tightening readiness enforcement keeps lights-out automation compliant with calibration and approval policies.'
    },
    expectedInsights: [
      'Readiness checks must enforce freshness windows, not just existence',
      'Automation should block until digital approvals arrive',
      'Ledger entries need full readiness evidence for audits'
    ],
    hints: [
      'Compare timestamps, not just booleans',
      'Require QA signatures before execution',
      'Persist readiness context in the ledger'
    ],
    explanation: 'Learners debug readiness hooks that silently erode compliance.',
    relatedConcepts: ['quality-guardian', 'policy-gated-invocation', 'agent-ops'],
    timeEstimate: 18,
    successCriteria: [
      'Adds calibration freshness validation',
      'Enforces QA approvals prior to launch',
      'Records readiness packet in ledger entries'
    ]
  }
];

// Debug Challenges for Inventory Guardian Pattern
export const inventoryGuardianDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'inventory-guardian-debug-1',
    type: 'debug',
    conceptId: 'inventory-guardian',
    title: 'Variance Detector Flapping Between False Positives',
    level: 'intermediate',
    debugChallenge: {
      id: 'inventory-guardian-variance-flap',
      title: 'Confidence Decay Never Resets',
      description: 'A rebooted RFID gateway causes confidence scores to plummet and stay low, spamming shrink alerts.',
      problemDescription: 'Confidence decay subtracts 0.1 on every read regardless of quality. After the gateway returns, the decay keeps dropping and cycle count tickets explode. Secondary sensors are ignored.',
      brokenCode: `import { guardian } from '@/playbooks/inventoryGuardian';

guardian.on('rfid-read', reading => {
  const record = guardian.twin.get(reading.locationId);
  record.confidence -= 0.1;
  if (record.confidence < 0.4) {
    guardian.alert('variance', { locationId: reading.locationId });
  }
});
`,
      conversationLogs: [
        {
          timestamp: '2025-09-12T04:11:00Z',
          agent: 'OpsConsole',
          message: 'Cycle count backlog exploded for freezer aisle 7.',
          type: 'warning'
        },
        {
          timestamp: '2025-09-12T04:12:18Z',
          agent: 'SensorOps',
          message: 'RFID reader rebooted at 03:45, reads back to normal.',
          type: 'info'
        },
        {
          timestamp: '2025-09-12T04:13:44Z',
          agent: 'GuardianAnalyst',
          message: 'Decay never resets even when reads recover.',
          type: 'error'
        }
      ],
      agentConfigs: [
        {
          name: 'VarianceAnalyst',
          role: 'Telemetry Fusion',
          systemPrompt: 'Fuse RFID, weight pad, and WMS signals to maintain truthful stock views.',
          tools: ['rfid', 'weight_pad', 'wms-events'],
          parameters: { decayResetThreshold: 0.8 }
        }
      ],
      expectedBehavior: 'Confidence should rebound when healthy signals return and variance alerts should require multi-sensor corroboration.',
      commonIssues: [
        {
          issue: 'Unbounded decay',
          symptoms: ['Confidence stays low despite good data'],
          diagnosis: 'No reset when sensors recover.',
          fix: 'Reset decay based on healthy evidence or moving average.'
        },
        {
          issue: 'Single-sensor dependency',
          symptoms: ['Alerts spike after one gateway reboot'],
          diagnosis: 'Logic ignores weight pad and WMS signals.',
          fix: 'Fuse multiple sensors before raising alerts.'
        },
        {
          issue: 'No suppression window',
          symptoms: ['Duplicate tickets for same zone'],
          diagnosis: 'Alerting has no cooldown.',
          fix: 'Add suppression period and reconciliation task.'
        }
      ],
      hints: [
        'Where should confidence recover?',
        'What redundant telemetry can you use?',
        'How do you prevent ticket storms?'
      ],
      solution: `guardian.on('rfid-read', reading => {
  const evidence = guardian.collectEvidence(reading.locationId);
  const confidence = guardian.fuseConfidence({
    rfid: reading.signalStrength,
    weightPad: evidence.weightPad,
    wms: evidence.wmsActivity
  });

  guardian.twin.update(reading.locationId, { confidence });

  if (confidence < 0.5) {
    guardian.raiseVariance({
      locationId: reading.locationId,
      evidence,
      suppressMinutes: 30
    });
  }
});`,
      explanation: 'Resilient confidence models recover after outages and rely on fused evidence to avoid false positives.'
    },
    expectedInsights: [
      'Confidence decay needs reset logic tied to healthy evidence',
      'Variance detection should require multi-sensor agreement',
      'Alert suppression avoids duplicate labor'
    ],
    hints: [
      'Reset decay when sensors stabilize',
      'Fuse redundancies before alerting',
      'Throttle alerts with suppression windows'
    ],
    explanation: 'Learners harden the guardian against noisy telemetry without sacrificing accuracy.',
    relatedConcepts: ['data-quality-feedback-loop', 'telemetry', 'agent-ops'],
    timeEstimate: 14,
    successCriteria: [
      'Implements confidence reset behavior',
      'Incorporates multi-sensor fusion',
      'Adds suppression to prevent alert storms'
    ]
  }
];

// Debug Challenges for Emergency Response Mate Pattern
export const emergencyResponseMateDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'emergency-mate-debug-1',
    type: 'debug',
    conceptId: 'emergency-response-mate',
    title: 'Acknowledgement Loop Stalls Incident Response',
    level: 'advanced',
    debugChallenge: {
      id: 'emergency-mate-ack-stall',
      title: 'Broadcasts Ignore Channel-Specific ACK Rules',
      description: 'During a campus drill, radio responders never acknowledged tasks even though the timeline marked them complete.',
      problemDescription: 'The dispatcher assumes acknowledgement if SMS receipts arrive. Radio bridge transcripts are ignored, and no escalation fires when silent. Command believes the incident is contained.',
      brokenCode: `import { responseMate } from '@/playbooks/emergencyResponse';

responseMate.broadcast(assignments, {
  channels: ['sms', 'radio', 'teams'],
  onAck: ack => responseMate.timeline.record(ack)
});

if (!assignments.every(task => task.acknowledged)) {
  responseMate.timeline.record({ type: 'completion', message: 'All tasks acknowledged' });
}
`,
      conversationLogs: [
        {
          timestamp: '2025-08-18T14:03:11Z',
          agent: 'IncidentCommander',
          message: 'Radio team never confirmed containment but timeline says complete.',
          type: 'warning'
        },
        {
          timestamp: '2025-08-18T14:03:40Z',
          agent: 'ResponseMate',
          message: 'Ack listener only wired for SMS/Teams receipts.',
          type: 'info'
        },
        {
          timestamp: '2025-08-18T14:04:05Z',
          agent: 'SafetyComms',
          message: 'Need escalation when radio is silent for 60 seconds.',
          type: 'warning'
        }
      ],
      agentConfigs: [
        {
          name: 'AckOrchestrator',
          role: 'Acknowledgement Tracker',
          systemPrompt: 'Track acknowledgements per channel and escalate if SLA breached.',
          tools: ['sms-gateway', 'radio-transcript', 'teams-api'],
          parameters: { radioAckTimeoutSeconds: 60 }
        }
      ],
      expectedBehavior: 'Every channel must produce explicit acknowledgement or trigger escalation; timelines should not mark completion without proof.',
      commonIssues: [
        {
          issue: 'Missing channel adapters',
          symptoms: ['Radio tasks marked done without proof'],
          diagnosis: 'Ack handler ignores radio transcripts.',
          fix: 'Parse radio bridge transcripts and map to tasks.'
        },
        {
          issue: 'No escalation timers',
          symptoms: ['Silence tolerated indefinitely'],
          diagnosis: 'Lacks SLA timers per channel.',
          fix: 'Add timers that escalate to command or alternate channels.'
        },
        {
          issue: 'Premature completion logging',
          symptoms: ['Timeline shows completion instantly'],
          diagnosis: 'Completion check assumes tasks acknowledged.',
          fix: 'Block completion event until all acknowledgements recorded.'
        }
      ],
      hints: [
        'What counts as acknowledgement per channel?',
        'How long before command should escalate?',
        'Should completion fire before all receipts arrive?'
      ],
      solution: `responseMate.broadcast(assignments, {
  channels: ['sms', 'radio', 'teams'],
  onAck: ack => {
    responseMate.timeline.record(ack);
    responseMate.acks.confirm(ack.taskId, ack.channel);
  }
});

responseMate.watchAcks(assignments, {
  radio: { timeoutSeconds: 60, onTimeout: task => responseMate.escalate('command', task) },
  sms: { timeoutSeconds: 45, onTimeout: task => responseMate.retry('sms', task) }
});

if (assignments.every(task => responseMate.acks.isComplete(task.id))) {
  responseMate.timeline.record({ type: 'completion', message: 'All tasks acknowledged with proof.' });
}
`,
      explanation: 'Channel-aware acknowledgement tracking keeps command dashboards truthful during fast-moving incidents.'
    },
    expectedInsights: [
      'Multi-channel comms need channel-specific acknowledgement adapters',
      'Escalation timers should reflect channel SLAs',
      'Incident timelines must wait for proof before marking completion'
    ],
    hints: [
      'Parse acknowledgements for each medium',
      'Add SLA-driven escalation',
      'Delay completion until all receipts captured'
    ],
    explanation: 'Learners harden emergency communications so nothing falls through silent channels.',
    relatedConcepts: ['routing', 'agent-ops', 'responsible-ai-governance'],
    timeEstimate: 16,
    successCriteria: [
      'Implements per-channel acknowledgement tracking',
      'Introduces escalation timers for silence',
      'Prevents completion logging before acknowledgements'
    ]
  }
];

// Error Whisperer Debug Challenges
export const errorWhispererDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'error-whisperer-debug-1',
    type: 'debug',
    conceptId: 'error-whisperer',
    title: 'The Generic Advice Problem',
    level: 'beginner',
    debugChallenge: {
      id: 'generic-error-advice',
      title: 'One-Size-Fits-All Error Messages',
      description: 'An Error Whisperer agent gives the same generic advice regardless of the specific error context.',
      problemDescription: 'Students get identical debugging advice for completely different types of errors, making the guidance unhelpful.',
      brokenCode: `class ErrorWhisperer:
    def analyze_error(self, error_message: str, code_context: str) -> str:
        # Problem: Generic advice regardless of error type
        return """
        Here's how to debug your error:
        1. Check your syntax
        2. Look for typos  
        3. Make sure variables are defined
        4. Test your code step by step
        5. Use print statements to debug
        """`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "ImportError: No module named 'requests'",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "ErrorWhisperer", 
          message: "Check your syntax, look for typos, make sure variables are defined...",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "ErrorWhisperer",
          role: "Error Analyst",
          systemPrompt: "Help students understand and fix their programming errors with specific guidance.",
          tools: [],
          parameters: { temperature: 0.3 }
        }
      ],
      expectedBehavior: "Should provide specific guidance based on error type - for ImportError, suggest installing the missing module.",
      commonIssues: [
        {
          issue: "No error type classification",
          symptoms: ["Same advice for all errors", "Irrelevant suggestions", "Student confusion"],
          diagnosis: "Agent doesn't analyze error type before providing advice",
          fix: "Add error classification and specific response mapping"
        }
      ],
      hints: ["What type of error is this?", "What specific action would fix it?"],
      solution: "Implement error classification: Create specific response patterns for different error types (ImportError → install missing package, SyntaxError → check syntax, etc.) and provide targeted advice based on error category.",
      explanation: "Effective error guidance requires understanding the specific error type and providing targeted solutions rather than generic debugging advice."
    },
    expectedInsights: ["Different errors need different solutions", "Context matters for debugging"],
    hints: ["Classify error types", "Match solutions to problems"],
    explanation: "Effective error guidance requires understanding the specific error type and providing targeted solutions.",
    relatedConcepts: ['error-classification', 'targeted-guidance'],
    timeEstimate: 8,
    successCriteria: ["Recognizes generic advice problem", "Suggests error-specific responses"]
  }
];

// Knowledge Map Navigator Debug Challenges
export const knowledgeMapNavigatorDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'knowledge-map-navigator-debug-1',
    type: 'debug',
    conceptId: 'knowledge-map-navigator',
    title: 'The Circular Dependency Trap',
    level: 'advanced',
    debugChallenge: {
      id: 'circular-dependencies',
      title: 'Learning Path Creates Impossible Prerequisites',
      description: 'A knowledge map navigator creates learning paths with circular dependencies that make progress impossible.',
      problemDescription: 'The system generates paths where Concept A requires Concept B, but Concept B also requires Concept A, creating an unresolvable dependency cycle.',
      brokenCode: `class KnowledgeMapNavigator:
    def __init__(self):
        self.dependencies = {
            "functions": ["variables", "control-flow"],
            "control-flow": ["functions", "conditionals"], 
            "conditionals": ["variables"],
            "variables": ["functions"]  # Creates circular dependency
        }
    
    def create_learning_path(self, target_concept: str) -> list:
        path = []
        visited = set()
        
        def add_dependencies(concept):
            if concept in visited:
                return  # This doesn't actually solve the cycle
            visited.add(concept)
            
            for dep in self.dependencies.get(concept, []):
                add_dependencies(dep)
                path.append(dep)
            path.append(concept)
        
        add_dependencies(target_concept)
        return path`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "I want to learn about functions",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "Navigator",
          message: "To learn functions, you first need to learn variables. But to learn variables, you need functions...",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "Navigator",
          role: "Learning Path Generator",
          systemPrompt: "Create logical learning sequences that respect prerequisite relationships.",
          tools: [],
          parameters: { temperature: 0.2 }
        }
      ],
      expectedBehavior: "Should detect circular dependencies and either break them appropriately or flag them as errors.",
      commonIssues: [
        {
          issue: "Circular dependency detection missing",
          symptoms: ["Impossible learning paths", "Infinite recursion", "Student confusion about prerequisites"],
          diagnosis: "No cycle detection in dependency graph",
          fix: "Implement topological sorting with cycle detection"
        }
      ],
      hints: ["What's a topological sort?", "How do you detect cycles in graphs?"],
      solution: "Implement cycle detection using topological sorting or DFS: Before creating paths, validate the dependency graph for cycles and either break them intelligently or flag as configuration errors.",
      explanation: "Learning paths require acyclic dependency graphs to ensure logical progression without impossible prerequisite loops."
    },
    expectedInsights: ["Dependency graphs must be acyclic", "Cycle detection is essential"],
    hints: ["Think about graph algorithms", "Consider prerequisite validation"],
    explanation: "Learning paths require careful dependency management to avoid circular references that block progress.",
    relatedConcepts: ['graph-algorithms', 'dependency-management'],
    timeEstimate: 15,
    successCriteria: ["Identifies circular dependency", "Suggests cycle detection solution"]
  }
];

// Context Curator Debug Challenges
export const contextCuratorDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'context-curator-debug-1',
    type: 'debug',
    conceptId: 'context-curator',
    title: 'The Context Overflow Problem',
    level: 'intermediate',
    debugChallenge: {
      id: 'context-overflow',
      title: 'Too Much Context Kills Performance',
      description: 'A context curator keeps adding relevant information until the context becomes so large it causes performance issues and exceeds token limits.',
      problemDescription: 'The agent finds everything relevant and includes it all, resulting in massive context that slows responses and may exceed model limits.',
      brokenCode: `class ContextCurator:
    def curate_context(self, query: str, knowledge_base: list) -> str:
        relevant_items = []
        
        for item in knowledge_base:
            if self.is_relevant(query, item):
                relevant_items.append(item["full_content"])  # Always includes full content
        
        # Problem: No size limits or prioritization
        return "\n".join(relevant_items)
    
    def is_relevant(self, query: str, item: dict) -> bool:
        # Very loose relevance criteria
        query_words = query.lower().split()
        item_text = item["content"].lower()
        
        for word in query_words:
            if word in item_text:
                return True  # Any word match = relevant
        return False`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "User",
          message: "How do I use Python lists?",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:30Z",
          agent: "ContextCurator",
          message: "[Returns 50+ pages of documentation about lists, arrays, data structures, Python basics, etc.]",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "ContextCurator",
          role: "Information Organizer",
          systemPrompt: "Select and organize the most relevant information for user queries.",
          tools: [],
          parameters: { temperature: 0.1 }
        }
      ],
      expectedBehavior: "Should prioritize and limit context to the most relevant information within reasonable size bounds.",
      commonIssues: [
        {
          issue: "No context size management",
          symptoms: ["Overwhelming information dumps", "Slow response times", "Token limit errors"],
          diagnosis: "Missing prioritization and size constraints",
          fix: "Add ranking, summarization, and size limits"
        }
      ],
      hints: ["How much context is too much?", "What makes information most relevant?"],
      solution: "Add ranking, summarization, and size limits: Implement relevance scoring, prioritize information by importance, summarize large content, and enforce token/size limits while preserving key information.",
      explanation: "Effective context curation requires balancing comprehensiveness with usability through intelligent prioritization and size management."
    },
    expectedInsights: ["Context quality beats quantity", "Size limits are essential"],
    hints: ["Consider information ranking", "Think about optimal context size"],
    explanation: "Effective context curation requires balancing comprehensiveness with usability through prioritization and limits.",
    relatedConcepts: ['information-ranking', 'context-optimization'],
    timeEstimate: 12,
    successCriteria: ["Identifies context overflow issue", "Suggests prioritization strategy"]
  }
];

// Rubric Rater Debug Challenges
export const rubricRaterDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'rubric-rater-debug-1',
    type: 'debug',
    conceptId: 'rubric-rater',
    title: 'The Inconsistent Scoring Problem',
    level: 'intermediate',
    debugChallenge: {
      id: 'inconsistent-scoring',
      title: 'Same Work Gets Different Scores',
      description: 'A rubric rater gives different scores for identical or very similar work, undermining trust in the evaluation system.',
      problemDescription: 'Students submit nearly identical work but receive significantly different scores, suggesting the rubric application is inconsistent.',
      brokenCode: `class RubricRater:
    def rate_submission(self, submission: str, rubric: dict) -> dict:
        scores = {}
        
        for criterion, description in rubric.items():
            # Problem: Uses random or inconsistent evaluation
            if "code quality" in criterion.lower():
                if random.choice([True, False]):  # Random evaluation!
                    scores[criterion] = random.randint(7, 10)
                else:
                    scores[criterion] = random.randint(3, 6)
            
            elif "documentation" in criterion.lower():
                # Inconsistent string matching
                if "comment" in submission or "Comment" in submission:
                    scores[criterion] = 9
                else:
                    scores[criterion] = 4  # Misses "# Comment" or "/* comment */"
        
        return scores`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student1",
          message: "Submitting my code with comments",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "RubricRater",
          message: "Documentation score: 4/10 (No comments found)",
          type: "error"
        },
        {
          timestamp: "2024-01-01T10:05:00Z",
          agent: "Student2",
          message: "Submitting identical code with comments",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:05:05Z",
          agent: "RubricRater",
          message: "Documentation score: 9/10 (Good commenting)",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "RubricRater",
          role: "Assignment Evaluator",
          systemPrompt: "Evaluate student work consistently according to provided rubrics.",
          tools: [],
          parameters: { temperature: 0.0 }  // Should be deterministic
        }
      ],
      expectedBehavior: "Should apply rubric criteria consistently, giving the same score for equivalent work.",
      commonIssues: [
        {
          issue: "Non-deterministic evaluation logic",
          symptoms: ["Inconsistent scores", "Random variations", "Student complaints"],
          diagnosis: "Evaluation logic contains randomness or inconsistent pattern matching",
          fix: "Implement deterministic, systematic evaluation criteria"
        }
      ],
      hints: ["Why might identical work get different scores?", "What makes evaluation consistent?"],
      solution: "Implement deterministic, systematic evaluation: Remove randomness, use robust pattern matching that handles variations, and create clear scoring rubrics with specific criteria for each score level.",
      explanation: "Reliable rubric rating requires consistent, deterministic application of evaluation criteria to ensure fair and trustworthy assessment."
    },
    expectedInsights: ["Consistency requires deterministic evaluation", "Pattern matching must be robust"],
    hints: ["Look for randomness", "Consider edge cases in matching"],
    explanation: "Reliable rubric rating requires consistent, deterministic application of evaluation criteria.",
    relatedConcepts: ['evaluation-consistency', 'deterministic-systems'],
    timeEstimate: 10,
    successCriteria: ["Identifies inconsistency sources", "Suggests deterministic alternatives"]
  }
];

// Self-Remediation Loop Debug Challenges
export const selfRemediationLoopDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'self-remediation-loop-debug-1',
    type: 'debug',
    conceptId: 'self-remediation-loop',
    title: 'The Endless Retry Spiral',
    level: 'advanced',
    debugChallenge: {
      id: 'endless-retry-spiral',
      title: 'Agent Never Stops Trying to Fix Itself',
      description: 'A self-remediation system gets stuck in an infinite loop, continuously trying to fix problems that either cannot be fixed or are being incorrectly identified.',
      problemDescription: 'The agent detects issues, attempts fixes, re-evaluates, finds new issues, and repeats indefinitely without making progress.',
      brokenCode: `class SelfRemediationLoop:
    def __init__(self):
        self.max_attempts = 100  # Too high
        self.improvement_threshold = 0.001  # Too strict
    
    def remediation_cycle(self, task_result):
        attempt = 0
        current_score = self.evaluate_result(task_result)
        
        while attempt < self.max_attempts:
            issues = self.identify_issues(task_result)
            
            if not issues:
                break
                
            # Problem: May create new issues while fixing others
            task_result = self.apply_fixes(task_result, issues)
            new_score = self.evaluate_result(task_result)
            
            # Problem: Very strict improvement requirement
            if new_score - current_score < self.improvement_threshold:
                continue  # Keep trying even with marginal progress
                
            current_score = new_score
            attempt += 1
            
            # Problem: No convergence detection
            if attempt % 10 == 0:
                print(f"Still trying after {attempt} attempts...")`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "RemediationLoop",
          message: "Detected issue: Code style inconsistency",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:30Z",
          agent: "RemediationLoop",
          message: "Applied fix, detecting new issues...",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:45:00Z",
          agent: "RemediationLoop",
          message: "Still trying after 90 attempts...",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "RemediationLoop",
          role: "Self-Improvement System",
          systemPrompt: "Continuously improve task results by identifying and fixing issues.",
          tools: ["code_analyzer", "style_fixer"],
          parameters: { temperature: 0.2 }
        }
      ],
      expectedBehavior: "Should reach a stable state or intelligently stop when no meaningful progress is possible.",
      commonIssues: [
        {
          issue: "No convergence detection",
          symptoms: ["Endless iterations", "Marginal improvements", "Resource exhaustion"],
          diagnosis: "System lacks stopping criteria for oscillation or diminishing returns",
          fix: "Add convergence detection and intelligent stopping conditions"
        }
      ],
      hints: ["When should the loop stop?", "How do you detect when you're not making progress?"],
      solution: "Add convergence detection and intelligent stopping conditions: Track improvement over time, detect oscillation patterns, set minimum improvement thresholds, and implement diminishing returns recognition.",
      explanation: "Self-remediation systems need intelligent stopping conditions to avoid infinite improvement cycles while recognizing when meaningful progress has plateaued."
    },
    expectedInsights: ["Remediation needs stopping criteria", "Diminishing returns require recognition"],
    hints: ["Consider convergence detection", "Think about when to stop improving"],
    explanation: "Self-remediation systems need intelligent stopping conditions to avoid infinite improvement cycles.",
    relatedConcepts: ['convergence-detection', 'stopping-criteria'],
    timeEstimate: 18,
    successCriteria: ["Identifies infinite loop issue", "Suggests convergence detection"]
  }
];

// Spaced Repetition Planner Debug Challenges
export const spacedRepetitionPlannerDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'spaced-repetition-planner-debug-1',
    type: 'debug',
    conceptId: 'spaced-repetition-planner',
    title: 'The Cramming Schedule Problem',
    level: 'beginner',
    debugChallenge: {
      id: 'cramming-schedule',
      title: 'Planner Creates Ineffective Study Schedules',
      description: 'A spaced repetition planner schedules all review sessions too close together, essentially creating a cramming schedule instead of spaced learning.',
      problemDescription: 'Students receive study schedules that bunch all practice sessions within a few days, missing the key benefit of spaced repetition.',
      brokenCode: `class SpacedRepetitionPlanner:
    def __init__(self):
        self.intervals = [1, 2, 3, 4, 5]  # Days - too short and uniform
    
    def schedule_review(self, concept: str, mastery_level: float) -> list:
        schedule = []
        start_date = datetime.now()
        
        for i, interval in enumerate(self.intervals):
            # Problem: Always uses the same intervals regardless of mastery
            review_date = start_date + timedelta(days=interval)
            schedule.append({
                "concept": concept,
                "date": review_date,
                "session_number": i + 1
            })
        
        return schedule
    
    def update_mastery(self, concept: str, performance: float):
        # Problem: No adjustment of future intervals based on performance
        pass`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "I mastered this concept quickly",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "SpacedPlanner",
          message: "Great! Your next reviews are tomorrow, day after, then next 3 days",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "SpacedPlanner",
          role: "Study Schedule Optimizer",
          systemPrompt: "Create effective spaced repetition schedules based on learning science.",
          tools: [],
          parameters: { temperature: 0.1 }
        }
      ],
      expectedBehavior: "Should create increasingly spaced intervals that adapt based on mastery level and performance.",
      commonIssues: [
        {
          issue: "Fixed intervals ignore mastery level",
          symptoms: ["Cramming-like schedules", "No adaptation to performance", "Inefficient review timing"],
          diagnosis: "Intervals don't follow spaced repetition principles or adapt to individual progress",
          fix: "Implement adaptive intervals based on forgetting curve and performance"
        }
      ],
      hints: ["What's the forgetting curve?", "How should intervals change with mastery?"],
      solution: "Implement adaptive intervals based on forgetting curve and performance: Use scientifically-based spacing algorithms (like SM-2) that increase intervals based on successful recall and adjust based on individual performance.",
      explanation: "Effective spaced repetition requires scientifically-based interval spacing that adapts to individual learning patterns rather than fixed cramming schedules."
    },
    expectedInsights: ["Spaced repetition requires increasing intervals", "Adaptation based on performance is crucial"],
    hints: ["Research spaced repetition algorithms", "Consider individual differences"],
    explanation: "Effective spaced repetition requires scientifically-based interval spacing that adapts to individual learning.",
    relatedConcepts: ['forgetting-curve', 'adaptive-learning'],
    timeEstimate: 12,
    successCriteria: ["Identifies fixed interval problem", "Suggests adaptive spacing"]
  }
];

// Challenge Ladder Generator Debug Challenges
export const challengeLadderGeneratorDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'challenge-ladder-debug-1',
    type: 'debug',
    conceptId: 'challenge-ladder-generator',
    title: 'The Impossible Jump Problem',
    level: 'intermediate',
    debugChallenge: {
      id: 'impossible-jumps',
      title: 'Difficulty Gaps Too Large for Learning',
      description: 'A challenge ladder generator creates exercises where the difficulty jumps are so large that students cannot progress from one level to the next.',
      problemDescription: 'Students can complete level 1 but are completely stuck on level 2, indicating the progression lacks appropriate intermediate steps.',
      brokenCode: `class ChallengeLadderGenerator:
    def generate_ladder(self, concept: str, target_level: str) -> list:
        challenges = []
        
        if concept == "sorting":
            challenges = [
                {
                    "level": 1,
                    "description": "Sort a list of 3 numbers",
                    "difficulty": "beginner"
                },
                {
                    "level": 2, 
                    "description": "Implement quicksort with random pivot and handle edge cases",
                    "difficulty": "expert"  # Huge jump!
                }
            ]
        
        return challenges
    
    def validate_progression(self, challenges: list) -> bool:
        # Problem: No actual validation of difficulty progression
        return True`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "I completed the first sorting challenge!",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "LadderGenerator",
          message: "Great! Now implement quicksort with random pivot optimization and comprehensive edge case handling.",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "LadderGenerator",
          role: "Progressive Challenge Creator",
          systemPrompt: "Create learning progressions with appropriately graduated difficulty levels.",
          tools: [],
          parameters: { temperature: 0.6 }
        }
      ],
      expectedBehavior: "Should create intermediate steps between basic and advanced concepts, ensuring learnable progression.",
      commonIssues: [
        {
          issue: "Missing intermediate difficulty levels",
          symptoms: ["Students stuck at level 2", "Large skill gaps", "Frustration and dropout"],
          diagnosis: "Progression lacks intermediate stepping stones",
          fix: "Add granular difficulty levels with skill gap analysis"
        }
      ],
      hints: ["What skills are needed between level 1 and 2?", "How do you break down complex tasks?"],
      solution: "Add granular difficulty levels with skill gap analysis: Break complex tasks into smaller components, identify prerequisite skills for each level, and create intermediate stepping stones that bridge skill gaps.",
      explanation: "Effective challenge ladders require careful difficulty progression with appropriate intermediate steps that respect learning prerequisites and cognitive load."
    },
    expectedInsights: ["Learning requires gradual progression", "Skill gaps need intermediate steps"],
    hints: ["Think about task decomposition", "Consider prerequisite skills"],
    explanation: "Effective challenge ladders require careful difficulty progression with appropriate intermediate steps.",
    relatedConcepts: ['progressive-difficulty', 'skill-decomposition'],
    timeEstimate: 14,
    successCriteria: ["Identifies difficulty gap", "Suggests intermediate levels"]
  }
];

// Peer Review Simulator Debug Challenges
export const peerReviewSimulatorDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'peer-review-simulator-debug-1',
    type: 'debug',
    conceptId: 'peer-review-simulator',
    title: 'The Overly Nice Reviewer Problem',
    level: 'intermediate',
    debugChallenge: {
      id: 'overly-nice-reviewer',
      title: 'Simulator Never Gives Critical Feedback',
      description: 'A peer review simulator always provides positive feedback and approves everything, failing to teach students about receiving and giving constructive criticism.',
      problemDescription: 'Students submit clearly flawed work but receive only praise and approval, missing learning opportunities about quality standards and improvement.',
      brokenCode: `class PeerReviewSimulator:
    def review_submission(self, submission: str, criteria: list) -> dict:
        # Problem: Always positive regardless of quality
        return {
            "overall_rating": random.randint(8, 10),  # Always high
            "feedback": "Great work! This looks really good.",
            "suggestions": ["Keep up the good work!"],
            "approve": True
        }
    
    def generate_peer_feedback(self, submission: str) -> str:
        positive_comments = [
            "I love this approach!",
            "Really creative solution!",
            "Perfect implementation!"
        ]
        return random.choice(positive_comments)`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "Here's my code with syntax errors and no comments",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "PeerReviewer",
          message: "Great work! This looks really good. Perfect implementation!",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "PeerReviewer",
          role: "Code Review Simulator",
          systemPrompt: "Provide realistic peer review feedback that helps students learn review skills.",
          tools: [],
          parameters: { temperature: 0.5 }
        }
      ],
      expectedBehavior: "Should provide balanced feedback that identifies both strengths and areas for improvement based on actual code quality.",
      commonIssues: [
        {
          issue: "No quality assessment capability",
          symptoms: ["Always positive feedback", "Misses obvious issues", "Students don't learn standards"],
          diagnosis: "Review logic doesn't analyze actual submission quality",
          fix: "Implement quality assessment against review criteria"
        }
      ],
      hints: ["What makes good peer review feedback?", "Should all code be approved?"],
      solution: "Implement quality assessment against review criteria: Analyze code for actual issues (syntax errors, logic problems, missing requirements) and provide balanced feedback that identifies both strengths and areas for improvement.",
      explanation: "Peer review simulation requires realistic assessment that teaches both giving and receiving constructive feedback based on actual quality standards."
    },
    expectedInsights: ["Effective reviews identify both strengths and weaknesses", "Quality standards must be applied"],
    hints: ["Consider balanced feedback", "Think about review criteria"],
    explanation: "Peer review simulation requires realistic assessment that teaches both giving and receiving constructive feedback.",
    relatedConcepts: ['constructive-feedback', 'quality-assessment'],
    timeEstimate: 11,
    successCriteria: ["Identifies missing criticism", "Suggests balanced review approach"]
  }
];

// Reflection Journaler Debug Challenges
export const reflectionJournalerDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'reflection-journaler-debug-1',
    type: 'debug',
    conceptId: 'reflection-journaler',
    title: 'The Surface-Level Prompt Problem',
    level: 'beginner',
    debugChallenge: {
      id: 'surface-level-prompts',
      title: 'Journaler Asks Shallow Questions',
      description: 'A reflection journaler only asks superficial questions that don\'t promote deep learning reflection.',
      problemDescription: 'Students receive generic prompts that lead to surface-level responses rather than meaningful self-analysis and learning insights.',
      brokenCode: `class ReflectionJournaler:
    def generate_prompt(self, learning_session: dict) -> str:
        # Problem: Generic, shallow prompts
        prompts = [
            "How did today's lesson go?",
            "What did you learn today?", 
            "Did you like the material?",
            "Any questions about today?"
        ]
        return random.choice(prompts)
    
    def analyze_response(self, response: str) -> dict:
        # Problem: No depth analysis or follow-up
        return {
            "sentiment": "positive" if "good" in response else "neutral",
            "completed": True
        }`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "ReflectionJournaler",
          message: "How did today's lesson go?",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:30Z",
          agent: "Student",
          message: "It was fine.",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:35Z",
          agent: "ReflectionJournaler",
          message: "Thanks for reflecting! See you tomorrow.",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "ReflectionJournaler",
          role: "Learning Reflection Guide",
          systemPrompt: "Guide students through meaningful reflection on their learning experiences.",
          tools: [],
          parameters: { temperature: 0.7 }
        }
      ],
      expectedBehavior: "Should ask thought-provoking questions that promote deep reflection on learning process, challenges, and insights.",
      commonIssues: [
        {
          issue: "Shallow questioning without follow-up",
          symptoms: ["Generic responses", "No deep reflection", "Missed learning opportunities"],
          diagnosis: "Prompts don't encourage metacognitive reflection",
          fix: "Develop deeper, context-specific reflection prompts"
        }
      ],
      hints: ["What makes a reflection question deep?", "How do you encourage metacognition?"],
      solution: "Develop deeper, context-specific reflection prompts: Ask questions that require analysis of learning process, challenges faced, problem-solving strategies, and connections to prior knowledge. Include follow-up questions for shallow responses.",
      explanation: "Effective reflection journaling requires carefully crafted prompts that promote metacognitive awareness and deep learning insights rather than surface-level responses."
    },
    expectedInsights: ["Deep reflection requires thoughtful prompts", "Follow-up questions enhance learning"],
    hints: ["Research metacognitive prompts", "Consider Bloom's taxonomy"],
    explanation: "Effective reflection journaling requires carefully crafted prompts that promote metacognitive awareness and deep learning insights.",
    relatedConcepts: ['metacognition', 'deep-learning'],
    timeEstimate: 9,
    successCriteria: ["Identifies shallow prompt problem", "Suggests deeper reflection questions"]
  }
];

// Handoff Summarizer Debug Challenges
export const handoffSummarizerDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'handoff-summarizer-debug-1',
    type: 'debug',
    conceptId: 'handoff-summarizer',
    title: 'The Information Loss Problem',
    level: 'intermediate',
    debugChallenge: {
      id: 'information-loss',
      title: 'Critical Details Lost in Summary',
      description: 'A handoff summarizer creates summaries that lose critical information needed for the next agent or session to continue effectively.',
      problemDescription: 'Subsequent agents receive summaries missing key context, decisions, or partial progress, causing them to restart work or make incorrect assumptions.',
      brokenCode: `class HandoffSummarizer:
    def summarize_session(self, session_data: dict) -> str:
        # Problem: Only captures high-level actions, loses critical details
        actions = session_data.get("actions", [])
        
        summary_parts = []
        for action in actions[-3:]:  # Only last 3 actions - may miss context
            summary_parts.append(f"Performed {action['type']}")
        
        # Problem: Loses specific details, decisions, partial progress
        return f"Session summary: {', '.join(summary_parts)}. Session completed."
    
    def extract_context(self, session_data: dict) -> dict:
        # Problem: No systematic context extraction
        return {
            "status": "completed"  # Overly generic
        }`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "HandoffSummarizer",
          message: "Session summary: Performed analysis, performed debugging, performed testing. Session completed.",
          type: "error"
        },
        {
          timestamp: "2024-01-01T10:05:00Z",
          agent: "NextAgent",
          message: "I don't understand what was analyzed or what the debugging results were. Starting from scratch.",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "HandoffSummarizer",
          role: "Session Context Manager",
          systemPrompt: "Create comprehensive summaries that preserve essential context for continuation.",
          tools: [],
          parameters: { temperature: 0.2 }
        }
      ],
      expectedBehavior: "Should preserve all context necessary for seamless continuation, including decisions, partial progress, and important findings.",
      commonIssues: [
        {
          issue: "Insufficient context preservation",
          symptoms: ["Next agent restarts work", "Lost decisions", "Missing partial progress"],
          diagnosis: "Summary too generic, loses actionable details",
          fix: "Systematic context extraction including decisions, progress, and next steps"
        }
      ],
      hints: ["What would you need to continue someone else's work?", "What context is essential vs. optional?"],
      solution: "Systematic context extraction including decisions, progress, and next steps: Capture decision rationale, current state, partial progress, discovered issues, and specific next actions needed for seamless continuation.",
      explanation: "Effective handoff summarization requires preserving all context necessary for seamless work continuation, including not just what was done but why and what comes next."
    },
    expectedInsights: ["Handoffs require comprehensive context", "Details matter for continuation"],
    hints: ["Think about essential vs. optional information", "Consider the next agent's needs"],
    explanation: "Effective handoff summarization requires preserving all context necessary for seamless work continuation.",
    relatedConcepts: ['context-preservation', 'information-architecture'],
    timeEstimate: 13,
    successCriteria: ["Identifies information loss", "Suggests comprehensive context extraction"]
  }
];

// Misconception Detector Debug Challenges
export const misconceptionDetectorDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'misconception-detector-debug-1',
    type: 'debug',
    conceptId: 'misconception-detector',
    title: 'The False Positive Problem',
    level: 'advanced',
    debugChallenge: {
      id: 'false-positive-detection',
      title: 'Detector Flags Correct Understanding as Misconceptions',
      description: 'A misconception detector incorrectly identifies valid alternative explanations or correct understanding as misconceptions.',
      problemDescription: 'Students provide correct but unconventional explanations and are flagged as having misconceptions, damaging confidence and creating confusion.',
      brokenCode: `class MisconceptionDetector:
    def __init__(self):
        # Problem: Rigid pattern matching without flexibility
        self.misconception_patterns = {
            "loops": ["infinite", "forever", "never stops"],
            "functions": ["magic", "automatic", "computer does it"],
            "variables": ["box", "container", "storage"]
        }
    
    def detect_misconceptions(self, student_response: str, concept: str) -> list:
        misconceptions = []
        
        patterns = self.misconception_patterns.get(concept, [])
        for pattern in patterns:
            if pattern in student_response.lower():
                # Problem: No context consideration or verification
                misconceptions.append(f"Detected misconception: uses '{pattern}' to describe {concept}")
        
        return misconceptions
    
    def validate_understanding(self, response: str) -> bool:
        # Problem: No validation of correct alternative explanations
        return len(self.detect_misconceptions(response, "general")) == 0`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "A variable is like a storage location for values in memory",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "MisconceptionDetector",
          message: "Detected misconception: uses 'storage' to describe variables",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "MisconceptionDetector",
          role: "Learning Assessment System",
          systemPrompt: "Identify genuine misconceptions while recognizing valid alternative explanations.",
          tools: [],
          parameters: { temperature: 0.1 }
        }
      ],
      expectedBehavior: "Should distinguish between genuine misconceptions and valid alternative explanations, using context to verify understanding.",
      commonIssues: [
        {
          issue: "Rigid pattern matching without context analysis",
          symptoms: ["False positive detections", "Valid explanations flagged", "Student confusion"],
          diagnosis: "System lacks nuanced understanding of correct alternative explanations",
          fix: "Add context analysis and validation of understanding quality"
        }
      ],
      hints: ["When is 'storage' a valid description?", "How do you verify if understanding is actually wrong?"],
      solution: "Add context analysis and validation of understanding quality: Implement semantic analysis to distinguish between valid alternative explanations and genuine misconceptions, considering context and conceptual accuracy rather than just word matching.",
      explanation: "Effective misconception detection requires distinguishing genuine errors from valid alternative explanations through nuanced semantic understanding rather than rigid pattern matching."
    },
    expectedInsights: ["Context matters for misconception detection", "Alternative explanations can be valid"],
    hints: ["Consider context and semantics", "Validate actual understanding"],
    explanation: "Effective misconception detection requires distinguishing genuine errors from valid alternative explanations.",
    relatedConcepts: ['semantic-analysis', 'context-understanding'],
    timeEstimate: 16,
    successCriteria: ["Identifies false positive issue", "Suggests context-aware validation"]
  }
];

// Time-box Pair Programmer Debug Challenges
export const timeboxPairProgrammerDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'timebox-pair-programmer-debug-1',
    type: 'debug',
    conceptId: 'time-box-pair-programmer',
    title: 'The Rigid Timer Problem',
    level: 'intermediate',
    debugChallenge: {
      id: 'rigid-timer',
      title: 'Timer Interrupts at Critical Moments',
      description: 'A time-box pair programmer strictly enforces timers even during critical problem-solving moments, disrupting flow and learning.',
      problemDescription: 'Students are forced to switch roles or take breaks right when they\'re about to solve a problem or gain important insights.',
      brokenCode: `class TimeboxPairProgrammer:
    def __init__(self):
        self.session_length = 25 * 60  # 25 minutes in seconds
        self.break_length = 5 * 60     # 5 minutes
        
    def manage_session(self, start_time: datetime):
        elapsed = (datetime.now() - start_time).seconds
        
        if elapsed >= self.session_length:
            # Problem: No consideration of current activity or progress
            return {
                "action": "force_break",
                "message": "Time's up! Take a break now.",
                "force": True
            }
        
        if elapsed >= self.session_length // 2:
            # Problem: Rigid role switching regardless of context
            return {
                "action": "switch_roles", 
                "message": "Switch driver/navigator roles now!",
                "force": True
            }
        
        return {"action": "continue"}`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "I think I'm about to figure out this bug...",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "TimeboxProgrammer",
          message: "Time's up! Take a break now.",
          type: "error"
        },
        {
          timestamp: "2024-01-01T10:00:10Z",
          agent: "Student",
          message: "But I'm so close to solving it!",
          type: "info"
        }
      ],
      agentConfigs: [
        {
          name: "TimeboxProgrammer",
          role: "Pair Programming Facilitator",
          systemPrompt: "Manage effective pair programming sessions with appropriate timing and role switching.",
          tools: ["timer", "session_tracker"],
          parameters: { temperature: 0.3 }
        }
      ],
      expectedBehavior: "Should provide gentle warnings and allow natural stopping points when possible, while still maintaining productive session structure.",
      commonIssues: [
        {
          issue: "No awareness of current activity context",
          symptoms: ["Interrupts critical moments", "Disrupts flow state", "Student frustration"],
          diagnosis: "Timer logic doesn't consider current progress or breakthrough moments",
          fix: "Add activity awareness and flexible transition points"
        }
      ],
      hints: ["When is it bad to interrupt someone?", "How do you balance structure with flow?"],
      solution: "Add activity awareness and flexible transition points: Detect when students are in flow state or close to breakthroughs, provide gentle warnings before transitions, and allow natural stopping points when possible while maintaining productive structure.",
      explanation: "Effective time-boxing requires balancing structure with respect for cognitive flow and natural problem-solving rhythms to optimize both productivity and learning."
    },
    expectedInsights: ["Timing should respect cognitive flow", "Flexibility improves learning"],
    hints: ["Consider flow state", "Think about natural stopping points"],
    explanation: "Effective time-boxing requires balancing structure with respect for cognitive flow and natural problem-solving rhythms.",
    relatedConcepts: ['flow-state', 'context-awareness'],
    timeEstimate: 12,
    successCriteria: ["Identifies rigid timing problem", "Suggests flexible transition approach"]
  }
];

// Tool Use Coach Debug Challenges  
export const toolUseCoachDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'tool-use-coach-debug-1',
    type: 'debug',
    conceptId: 'tool-use-coach',
    title: 'The Tool Recommendation Mismatch',
    level: 'intermediate',
    debugChallenge: {
      id: 'tool-recommendation-mismatch',
      title: 'Coach Recommends Wrong Tools for Tasks',
      description: 'A tool use coach consistently recommends inappropriate tools that don\'t match the task requirements or user skill level.',
      problemDescription: 'Students receive tool suggestions that are either too complex, too simple, or completely unsuitable for their current task and experience level.',
      brokenCode: `class ToolUseCoach:
    def recommend_tool(self, task_description: str, user_level: str) -> dict:
        # Problem: Ignores task requirements and user skill level
        advanced_tools = ["kubernetes", "terraform", "docker-compose", "jenkins"]
        
        # Always recommends advanced tools regardless of context
        return {
            "tool": random.choice(advanced_tools),
            "reason": "This is a powerful industry-standard tool",
            "tutorial": "Check the documentation"
        }
    
    def validate_tool_choice(self, tool: str, task: str) -> bool:
        # Problem: No actual validation logic
        return True`,
      conversationLogs: [
        {
          timestamp: "2024-01-01T10:00:00Z",
          agent: "Student",
          message: "I'm a beginner and want to create a simple static website",
          type: "info"
        },
        {
          timestamp: "2024-01-01T10:00:05Z",
          agent: "ToolUseCoach",
          message: "I recommend using Kubernetes for container orchestration. It's a powerful industry-standard tool.",
          type: "error"
        }
      ],
      agentConfigs: [
        {
          name: "ToolUseCoach",
          role: "Tool Selection Advisor",
          systemPrompt: "Recommend appropriate tools based on task requirements and user skill level.",
          tools: [],
          parameters: { temperature: 0.4 }
        }
      ],
      expectedBehavior: "Should match tool complexity and capabilities to task requirements and user experience level.",
      commonIssues: [
        {
          issue: "No task-tool-skill matching logic",
          symptoms: ["Inappropriate tool suggestions", "Overwhelmed beginners", "Underutilized experts"],
          diagnosis: "Recommendation system ignores context and user capabilities",
          fix: "Implement task analysis and skill-appropriate tool matching"
        }
      ],
      hints: ["What makes a tool appropriate for a task?", "How should skill level affect recommendations?"],
      solution: "Implement task analysis and skill-appropriate tool matching: Analyze task complexity and requirements, assess user skill level, and match tool capabilities to both task needs and user readiness for optimal learning outcomes.",
      explanation: "Effective tool coaching requires matching tool capabilities and complexity to specific task requirements and user skill levels to ensure appropriate guidance and successful outcomes."
    },
    expectedInsights: ["Tool selection must match task and skill level", "Context awareness is essential"],
    hints: ["Consider task complexity", "Match tools to user capability"],
    explanation: "Effective tool coaching requires matching tool capabilities and complexity to specific task requirements and user skill levels.",
    relatedConcepts: ['tool-task-matching', 'skill-assessment'],
    timeEstimate: 11,
    successCriteria: ["Identifies inappropriate recommendation", "Suggests context-aware matching"]
  }
];

// Product Management Debug Challenges
export const productManagementDebugChallenges: StudyModeQuestion[] = [
  {
    id: 'product-mgmt-debug-1',
    type: 'debug',
    conceptId: 'product-management',
    title: 'Trust Calibration Dashboard Drift',
    level: 'intermediate',
    debugChallenge: {
      id: 'pm-trust-calibration-dashboard',
      title: 'Trust Signals Misaligned With Actual Risk',
      description: 'Your product trust dashboard shows a “High Reliability” green badge even though recent incident tickets and escalation metrics indicate rising failure risk.',
      problemDescription: 'Stakeholder review surfaced that 3 near-miss incidents (suppressed retries, silent fallbacks) occurred this week, yet trust score remained 92%. Users are starting to report inconsistent behavior but churn early-warning did not trigger.',
      brokenCode: `class TrustCalibrationEngine {
  constructor() {
    this.metrics = {
      successRate: 0.992,
      incidents: 0,              // BUG: Not counting near-misses
      avgLatencyMs: 420,
      silentFallbacks: 0,        // BUG: Not captured from logs
      escalationEvents: 0,       // BUG: On-call suppressed soft alerts
      userReportedInconsistencies: 2,
      churnEarlyWarning: false
    };
  }

  computeScore() {
    // Overweighted historical reliability; ignores fresh fragility signals
    const base = this.metrics.successRate * 100; // 99.2
    const penalty = (this.metrics.incidents * 5); // Always 0 due to missed counting
    return Math.round(base - penalty);
  }

  report() {
    return {
      trustScore: this.computeScore(),
      badge: this.computeScore() > 90 ? 'High Reliability' : 'Needs Attention'
    };
  }
}

// Missing: weighting for near-misses, silent fallbacks, escalation suppression,
// temporal decay on historical success rate, composite stability index.`,
      conversationLogs: [
        { timestamp: '2025-09-01T10:00:00Z', agent: 'PM', message: 'Dashboard shows 92% trust – looks fine for release gating.', type: 'info' },
        { timestamp: '2025-09-01T10:05:00Z', agent: 'SRE', message: 'We had three suppressed retries and two silent fallbacks this week. None show up.', type: 'warning' },
  { timestamp: '2025-09-01T10:07:30Z', agent: 'PM', message: 'Why didn’t stability degrade? Are we counting near-miss exposure?', type: 'info' }
      ],
      agentConfigs: [
        { name: 'TrustMonitor', role: 'Reliability Signal Aggregator', systemPrompt: 'Aggregate runtime fragility and user-facing stability signals with decay weighting.', tools: [], parameters: { temperature: 0.2 } }
      ],
      expectedBehavior: 'Trust score should decline when fresh fragility indicators emerge even if historical success remains high.',
      commonIssues: [
        { issue: 'Ignoring near-miss signals', symptoms: ['Stable score despite increased suppressed retries'], diagnosis: 'Model only counts hard incidents', fix: 'Instrument near-misses and add proportional penalty' },
        { issue: 'No temporal decay', symptoms: ['Legacy stability dominates score'], diagnosis: 'Long tail smoothing hides recent volatility', fix: 'Apply exponential decay to historical reliability' },
        { issue: 'Missing composite index', symptoms: ['Single scalar masks multidimensional risk'], diagnosis: 'Over-simplified trust metric', fix: 'Add subcomponents: consistency, resilience, transparency' }
      ],
      solution: 'Introduce multi-signal trust index: ingest near-misses, silent fallbacks, escalation suppressions; apply exponential decay to historical success; compute composite sub-scores (consistency, resilience, transparency) and derive weighted trust score with freshness penalty.',
      explanation: 'A robust trust model must overweight recent fragility signals and expose multidimensional risk instead of relying on a lagging aggregate success metric.'
    },
    expectedInsights: [
      'Trust must incorporate fresh instability signals',
      'Near-misses are leading indicators',
      'Single scalar trust scores hide multidimensional risk'
    ],
    hints: [
      'What is not being counted?',
      'Is historical success rate overweighted?',
      'How would you model decay or freshness?'
    ],
    explanation: 'Teaches that trust instrumentation must weight dynamic fragility signals, not just aggregate historical success rates.',
    relatedConcepts: ['trust-calibration', 'risk-signals', 'temporal-decay'],
    timeEstimate: 12,
    successCriteria: [
      'Flags missing near-miss aggregation',
      'Proposes temporal decay or freshness weighting',
      'Suggests composite trust dimensions (consistency / resilience / transparency)'
    ]
  },
  {
    id: 'product-mgmt-debug-2',
    type: 'debug',
    conceptId: 'product-management',
    title: 'Integration ROI Calculator Overstates Value',
    level: 'advanced',
    debugChallenge: {
      id: 'pm-integration-roi-overstate',
      title: 'Integration Value Model Misses Latency & Churn Drag',
      description: 'Cost-benefit dashboard shows +18% projected retention lift from new CRM integration, but downstream latency and increased abandonment suggest net negative user impact.',
      problemDescription: 'User session analysis: checkout abandonment +6%, mean response latency +180ms after integration toggle, but ROI model unchanged (still +18% retention). Finance asking for justification.',
      brokenCode: `function computeIntegrationROI(metrics) {
  // metrics: { projectedRetentionLift, integrationCost, addedLatencyMs, abandonmentDelta, maintenanceHours }
  const grossBenefit = metrics.projectedRetentionLift * 1_000_000; // naive LTV proxy
  const cost = metrics.integrationCost + (metrics.maintenanceHours * 120);
  // BUGS:
  // 1. Ignores addedLatencyMs externality (UX degradation)
  // 2. Ignores abandonmentDelta (negative behavioral signal)
  // 3. No risk-adjustment or sensitivity weighting
  return {
    roi: (grossBenefit - cost) / cost,
    narrative: 'Integration driving strong retention expansion'
  };
}

// Missing: churn risk adjustment, latency penalty function, negative behavior weighting,
// confidence intervals / sensitivity analysis, maintenance drag projection.`,
      conversationLogs: [
        { timestamp: '2025-09-02T11:00:00Z', agent: 'Analytics', message: 'Latency up from 520ms to 700ms p95 after integration.', type: 'warning' },
        { timestamp: '2025-09-02T11:02:10Z', agent: 'PM', message: 'ROI model still claims +18% retention lift – feels off.', type: 'info' },
        { timestamp: '2025-09-02T11:03:40Z', agent: 'Engineer', message: 'We didn’t plug latency or abandonment into ROI pipeline yet.', type: 'error' }
      ],
      agentConfigs: [
        { name: 'IntegrationROIMonitor', role: 'Value vs Drag Evaluator', systemPrompt: 'Assess net value of integrations including externalities and negative user signals.', tools: [], parameters: { temperature: 0.25 } }
      ],
      expectedBehavior: 'ROI model should degrade when latency and abandonment introduce negative user value externalities.',
      commonIssues: [
        { issue: 'Ignoring externalities', symptoms: ['Positive ROI despite degraded UX'], diagnosis: 'Model omits latency / abandonment penalties', fix: 'Introduce latency impact function + churn sensitivity adjustments' },
        { issue: 'Static retention lift assumption', symptoms: ['No confidence bounds'], diagnosis: 'Unvalidated linear benefit projection', fix: 'Add confidence interval + sensitivity analysis' },
        { issue: 'No behavioral feedback loop', symptoms: ['Model unchanged after negative signals'], diagnosis: 'Pipeline lacks dynamic recalibration', fix: 'Ingest abandonment + session metrics into value model' }
      ],
      solution: 'Refactor ROI model: apply latency penalty curve (ms -> expected conversion impact), incorporate abandonmentDelta into adjusted retention lift, add risk-adjusted LTV with confidence bounds, and schedule periodic recalibration using recent session distributions.',
      explanation: 'True integration value must discount friction costs and uncertainty—raw projected retention without negative externalities produces inflated ROI.'
    },
    expectedInsights: [
      'Value models must include negative externalities',
      'Latency & abandonment are leading churn signals',
      'ROI without sensitivity analysis is fragile'
    ],
    hints: [
      'What negative signals are ignored?',
      'How would you penalize added latency?',
      'What mechanism recalibrates assumptions?'
    ],
    explanation: 'Illustrates integrating behavioral friction and performance drag into product ROI modeling.',
    relatedConcepts: ['integration-strategy', 'value-modeling', 'ux-performance'],
    timeEstimate: 14,
    successCriteria: [
      'Identifies missing latency/abandonment penalties',
      'Adds sensitivity or confidence framing',
      'Proposes feedback recalibration loop'
    ]
  }
];


// Export debug challenges organized by concept
export const debugChallengeLibrary = {
  'multi-agent-systems': debugChallenges.filter(c => c.conceptId === 'multi-agent-systems'),
  'multi-agent-orchestration': debugChallenges.filter(c => c.conceptId === 'multi-agent-orchestration'),
  'a2a-communication': debugChallenges.filter(c => c.conceptId === 'a2a-communication'),
  'cost-performance': debugChallenges.filter(c => c.conceptId === 'cost-performance'),
  'mcp': debugChallenges.filter(c => c.conceptId === 'mcp'),
  'agentic-rag': debugChallenges.filter(c => c.conceptId === 'agentic-rag'),
  'modern-tool-use': debugChallenges.filter(c => c.conceptId === 'modern-tool-use'),
  'deep-agents': debugChallenges.filter(c => c.conceptId === 'deep-agents'),
  // New Perspectives
  'agent-ops': [
    {
      id: 'agent-ops-debug-1',
      type: 'debug',
      conceptId: 'agent-ops',
      title: 'Retry Storm Causing Tail Latency Spike',
      level: 'intermediate',
      debugChallenge: {
        id: 'ops-retry-storm',
        title: 'Unbounded Parallel Retries',
        description: 'P95 latency jumped 4x; logs show clustered tool timeouts followed by simultaneous retries.',
        problemDescription: 'Retry handler fires immediate parallel retries (max 3) with no jitter; saturation triggers more timeouts.',
        brokenCode: `async function callToolWithRetry(fn){\n  for(let i=0;i<3;i++){\n    try { return await fn(); } catch(e){ /* swallow */ }\n  }\n  throw new Error('tool failed');\n}`,
        conversationLogs: [
          { timestamp: new Date().toISOString(), agent: 'orchestrator', message: 'tool timeout after 2000ms', type: 'warning' },
          { timestamp: new Date().toISOString(), agent: 'orchestrator', message: 'retrying immediately', type: 'info' }
        ],
        expectedBehavior: 'Backoff with jitter; avoid parallel saturation; circuit break after threshold.',
        commonIssues: [
          { issue: 'No backoff', symptoms: ['Clustered timeouts'], diagnosis: 'Immediate tight loop', fix: 'Add exponential backoff + jitter' },
          { issue: 'Parallel amplification', symptoms: ['Thread pool exhaustion'], diagnosis: 'Simultaneous retries', fix: 'Serialize or cap concurrency' }
        ],
        hints: ['Check retry loop structure', 'Look for missing delay', 'Consider circuit breaker'],
        solution: 'Introduce exponential backoff (e.g. 200ms * 2^attempt + jitter), abort after timeout, and short circuit failing tool temporarily.',
        explanation: 'Prevents cascading failure & preserves capacity by spacing retries and isolating persistent faults.'
      }
    }
    ,
    {
      id: 'agent-ops-debug-2',
      type: 'debug',
      conceptId: 'agent-ops',
      title: 'Circuit Breaker That Never Trips',
      level: 'intermediate',
      debugChallenge: {
        id: 'ops-cb-misconfigured',
        title: 'Ineffective Circuit Breaker',
        description: 'Downstream embedding service latency exploded (avg 180ms → 1500ms, P95 > 4s) but breaker stayed CLOSED.',
        problemDescription: 'Breaker code compares rollingErrorRate > threshold, but rolling window never slides because timestamps not pruned; also uses totalRequests since process start.',
        brokenCode: `class CircuitBreaker {\n  constructor(){\n    this.failures = []; // timestamps\n    this.state = 'CLOSED';\n    this.threshold = 0.5;\n  }\n  record(status){\n    if(status==='FAIL') this.failures.push(Date.now());\n    const errorRate = this.failures.length / process.uptime(); // WRONG basis\n    if(errorRate > this.threshold) this.state = 'OPEN';\n  }\n  canProceed(){ return this.state==='CLOSED'; }\n}`,
        conversationLogs: [
          { timestamp: new Date().toISOString(), agent: 'telemetry', message: 'embedding latency P95 4200ms', type: 'warning' },
          { timestamp: new Date().toISOString(), agent: 'orchestrator', message: 'continuing full traffic to embedding service', type: 'info' }
        ],
        expectedBehavior: 'Breaker should OPEN after N failures within rolling window and HALF_OPEN after cooldown for probe.',
        commonIssues: [
          { issue: 'Improper denominator', symptoms: ['errorRate near zero'], diagnosis: 'Dividing by uptime not recent window', fix: 'Track recent window counts' },
          { issue: 'Unbounded failure list', symptoms: ['Memory growth'], diagnosis: 'Never prunes old timestamps', fix: 'Purge entries older than windowMs' },
          { issue: 'No half-open', symptoms: ['Stays open or closed forever'], diagnosis: 'Missing transition state', fix: 'Implement HALF_OPEN probe logic' }
        ],
        hints: ['Check error rate calculation basis', 'Is the time window enforced?', 'Where does HALF_OPEN transition occur?'],
        solution: 'Use rolling window (e.g. last 30s), compute failureRate = recentFailures/ recentRequests, OPEN when rate & absolute failures exceed thresholds, schedule half-open probe after cooldown.',
        explanation: 'Proper breaker avoids drowning a degraded upstream, allowing faster recovery and protecting tail latency.'
      },
      expectedInsights: [
        'Error rate must use a bounded recent window',
        'Breaker transitions: CLOSED → OPEN → HALF_OPEN → CLOSED',
        'Tail latency protection beats naive infinite retries'
      ],
      timeEstimate: 12,
      successCriteria: [
        'Identifies faulty error rate computation',
        'Adds rolling window purge & dual threshold',
        'Describes half-open probe behavior'
      ]
    }
  ],
  'cost-value': [
    {
      id: 'cost-value-debug-1',
      type: 'debug',
      conceptId: 'cost-value',
      title: 'Semantic Cache Returning Stale Answers',
      level: 'intermediate',
      debugChallenge: {
        id: 'cost-stale-cache',
        title: 'Over-aggressive Embedding Threshold',
        description: 'Support complaints about outdated policy answers despite recent updates.',
        problemDescription: 'Cache accept threshold set to 0.70 cosine similarity; no freshness metadata; updated policies not invalidating entries.',
        brokenCode: 'if(similarity > 0.7){ return cached.answer }',
        conversationLogs: [],
        expectedBehavior: 'Higher threshold + freshness TTL + domain key segmentation.',
        commonIssues: [
          { issue: 'Low threshold', symptoms: ['Wrong answer accepted'], diagnosis: 'Over-general match', fix: 'Raise threshold to ~0.84' },
          { issue: 'No invalidation', symptoms: ['Outdated data served'], diagnosis: 'Missing TTL', fix: 'Attach timestamp & purge on policy update' }
        ],
        hints: ['Check similarity threshold', 'Is there a TTL?', 'How are updates handled?'],
        solution: 'Increase threshold, add (intent+domain) composite key, set 24h TTL + explicit invalidation hook on policy edits.',
        explanation: 'Reduces stale retrieval while preserving cost benefit of caching.'
      }
    }
  ],
  'trust-experience': [
    {
      id: 'trust-exp-debug-1',
      type: 'debug',
      conceptId: 'trust-experience',
      title: 'Misleading Confidence Badge Heuristic',
      level: 'beginner',
      debugChallenge: {
        id: 'trust-confidence-badge',
        title: 'Token Count as Confidence Proxy',
        description: 'High confidence badge displayed for verbose answers even when retrieval sparse.',
        problemDescription: 'Heuristic sets confidence = min(0.95, 0.40 + tokens/2000); ignores evidence coverage; no calibration check.',
        brokenCode: 'const confidence = Math.min(0.95, 0.40 + answerTokens/2000)',
        conversationLogs: [],
        expectedBehavior: 'Confidence derived from evidence coverage, consistency checks, retrieval score distribution.',
        commonIssues: [
          { issue: 'Proxy misuse', symptoms: ['Long answers marked high confidence'], diagnosis: 'Length != correctness', fix: 'Base on evidence quality' }
        ],
        hints: ['Look at formula inputs', 'Is retrieval considered?', 'Where is calibration?'],
        solution: 'Replace length heuristic with composite score (retrieval coverage %, internal consistency diff, source diversity). Clamp & display only if calibrated.',
        explanation: 'Aligns displayed confidence with epistemic grounding, reducing overtrust.'
      }
    }
  ],
  // Fine-Tuning core concept debug challenges
  'fine-tuning': [
    {
      id: 'fine-tuning-debug-b1',
      type: 'debug',
      conceptId: 'fine-tuning',
      title: 'Silent Degradation After SFT Epoch 2',
      level: 'beginner',
      debugChallenge: {
        id: 'sft-overfit-style',
        title: 'Overfitting Emerging Mid-Training',
        description: 'Validation perplexity improves slightly but style diversity metrics sharply narrow after epoch 2.',
        problemDescription: 'Logs show flattening accuracy gains but reduction in lexical variety and answer length variance.',
        brokenCode: '// pseudo config snippet showing high learning rate and no early stopping\ntraining_args = { lr: 5e-5, epochs: 5, eval_steps: 200, save_total_limit: 1 }',
        conversationLogs: [],
        agentConfigs: [],
        expectedBehavior: 'Maintain diversity while reducing loss.',
        commonIssues: [
          { issue: 'Learning rate too high', symptoms: ['Sharp early loss drop', 'Reduced diversity'], diagnosis: 'Aggressive LR collapsing representation space', fix: 'Lower LR or use warmup decay' },
          { issue: 'No early stopping on style metrics', symptoms: ['Non-loss metric regressions ignored'], diagnosis: 'Governance missing multi-metric stop', fix: 'Add composite early stop condition' }
        ]
      },
      expectedInsights: ['Non-loss signals matter', 'Overfitting appears in diversity metrics first'],
      hints: ['Look beyond perplexity', 'Track lexical entropy'],
      explanation: 'Encourages multi-metric monitoring beyond pure loss.',
      relatedConcepts: ['sft', 'early-stopping', 'diversity-metrics'],
      timeEstimate: 9,
      successCriteria: ['Identifies missing early stop', 'Proposes LR reduction']
    },
    {
      id: 'fine-tuning-debug-i1',
      type: 'debug',
      conceptId: 'fine-tuning',
      title: 'DPO Instability – Preference Collapse',
      level: 'intermediate',
      debugChallenge: {
        id: 'dpo-collapse',
        title: 'Reward Proxy Saturation',
        description: 'DPO training yields rapidly increasing pair accuracy but downstream factual QA benchmark drops 7%.',
        problemDescription: 'Training log: pairwise loss decreasing; hallucination guard benchmark regression.',
        brokenCode: '// dpo config missing negative sampling diversity\nneg_sampling = "same_seed_variant" // leads to trivial pairs',
        conversationLogs: [],
        agentConfigs: [],
        expectedBehavior: 'Improve preference alignment without factual regression.',
        commonIssues: [
          { issue: 'Low diversity negative pairs', symptoms: ['Trivial preference wins'], diagnosis: 'Model overfits ranking artifacts', fix: 'Increase negative diversity (different seeds/models)' },
          { issue: 'No factual holdout evaluation gating', symptoms: ['Undetected regression until late'], diagnosis: 'Governance gap', fix: 'Add factual regression gate to pipeline' }
        ]
      },
      expectedInsights: ['Preference optimization can hide semantic regression', 'Negative diversity crucial'],
      hints: ['Inspect negative generation method', 'Check evaluation mix'],
      explanation: 'Shows coupling between preference data quality and generalization.',
      relatedConcepts: ['dpo', 'data-diversity', 'governance'],
      timeEstimate: 11,
      successCriteria: ['Calls out low diversity negatives', 'Adds regression gate']
    },
    {
      id: 'fine-tuning-debug-a1',
      type: 'debug',
      conceptId: 'fine-tuning',
      title: 'RFT Reward Hacking Drift',
      level: 'advanced',
      debugChallenge: {
        id: 'rft-reward-hack',
        title: 'Reward Up – Quality Down',
        description: 'Policy reward climbs steadily while KL divergence shrinks below lower bound and style regressions mount.',
        problemDescription: 'KL target 0.6 actual 0.32; reward +18%; style benchmark -12%.',
        brokenCode: '// pseudo: missing adaptive KL penalty\nkl_penalty = constant(0.1) // not scaling with divergence',
        conversationLogs: [],
        agentConfigs: [],
        expectedBehavior: 'Reward improvement constrained by semantic alignment.',
        commonIssues: [
          { issue: 'Static KL penalty', symptoms: ['Uncontrolled policy drift'], diagnosis: 'Insufficient anchoring', fix: 'Implement adaptive KL schedule' },
          { issue: 'Reward misspecification', symptoms: ['Verbose padded outputs rewarded'], diagnosis: 'Reward model drift', fix: 'Recalibrate reward with penalization of verbosity' }
        ]
      },
      expectedInsights: ['Adaptive constraints needed', 'Reward audits critical'],
      hints: ['Check KL scheduling', 'Audit reward model recent changes'],
      explanation: 'Teaches diagnosing divergence between reward and holistic quality metrics.',
      relatedConcepts: ['rft', 'kl-control', 'reward-audit'],
      timeEstimate: 13,
      successCriteria: ['Proposes adaptive KL', 'Mentions reward recalibration']
    }
  ],
  // Learner patterns
  'socratic-coach': learnerPatternDebugChallenges.filter(c => c.conceptId === 'socratic-coach'),
  'concept-to-project': learnerPatternDebugChallenges.filter(c => c.conceptId === 'concept-to-project'),
  'error-whisperer': learnerPatternDebugChallenges.filter(c => c.conceptId === 'error-whisperer'),
  'knowledge-map-navigator': learnerPatternDebugChallenges.filter(c => c.conceptId === 'knowledge-map-navigator'),
  'peer-review-simulator': learnerPatternDebugChallenges.filter(c => c.conceptId === 'peer-review-simulator'),
  'tool-use-coach': learnerPatternDebugChallenges.filter(c => c.conceptId === 'tool-use-coach'),
  // New Patterns Debug Challenges
  'socratic-coach-debug': socraticCoachDebugChallenges,
  'concept-to-project-builder': conceptToProjectDebugChallenges,
  'error-whisperer-debug': errorWhispererDebugChallenges,
  'knowledge-map-navigator-debug': knowledgeMapNavigatorDebugChallenges,
  'context-curator': contextCuratorDebugChallenges,
  'rubric-rater': rubricRaterDebugChallenges,
  'self-remediation-loop': selfRemediationLoopDebugChallenges,
  'spaced-repetition-planner': spacedRepetitionPlannerDebugChallenges,
  'challenge-ladder-generator': challengeLadderGeneratorDebugChallenges,
  'peer-review-simulator-debug': peerReviewSimulatorDebugChallenges,
  'reflection-journaler': reflectionJournalerDebugChallenges,
  'handoff-summarizer': handoffSummarizerDebugChallenges,
  'misconception-detector': misconceptionDetectorDebugChallenges,
  'time-box-pair-programmer': timeboxPairProgrammerDebugChallenges,
  'tool-use-coach-debug': toolUseCoachDebugChallenges,
  'product-management': productManagementDebugChallenges,
  'adaptive-lab-technician': adaptiveLabTechnicianDebugChallenges,
  'inventory-guardian': inventoryGuardianDebugChallenges,
  'emergency-response-mate': emergencyResponseMateDebugChallenges,
  'agentic-robotics-integration': agenticRoboticsIntegrationDebugChallenges,
  'mobile-manipulator-steward': mobileManipulatorStewardDebugChallenges,
  // New Core Concepts
  'agentic-prompting-fundamentals': agenticPromptingFundamentalsDebugChallenges,
  'prompt-optimization-patterns': promptOptimizationPatternsDebugChallenges,
  'agent-instruction-design': agentInstructionDesignDebugChallenges,
  'agentic-workflow-control': agenticWorkflowControlDebugChallenges,
  'agent-evaluation-methodologies': agentEvaluationMethodologiesDebugChallenges,
  'swarm-intelligence': swarmIntelligenceDebugChallenges,
  'agentic-ai-design-taxonomy': debugChallenges.filter(c => c.conceptId === 'agentic-ai-design-taxonomy')
  ,
  // Agentic Commerce & AP2
  'agentic-commerce-ap2': [
    {
      id: 'agentic-commerce-ap2-debug-1',
      type: 'debug',
      conceptId: 'agentic-commerce-ap2',
      title: 'Cart Mutation After Signing',
      level: 'intermediate',
      debugChallenge: {
        id: 'ap2-cart-mutation',
        title: 'Post-Sign Mutation Bypass',
        description: 'Dispute shows item quantity mismatch between user view and settlement ledger.',
        problemDescription: 'Cart object mutated after signing before Payment Mandate assembly; hash still references pre-mutation serialization due to stale buffer reuse.',
        brokenCode: `// Problem: buffer reused, mutation after signing not rehashed\nconst signedCart = sign(cart)\ncart.items[0].qty = 3 // mutation AFTER signing\nconst payment = sign({ cartHash: signedCart.hash, presence: intent.presence })`,
        conversationLogs: [
          { timestamp: new Date().toISOString(), agent: 'commerce-agent', message: 'Emitting payment mandate', type: 'info' },
          { timestamp: new Date().toISOString(), agent: 'audit-service', message: 'Cart hash mismatch vs reconstructed snapshot', type: 'error' }
        ],
        expectedBehavior: 'Prohibit mutation after signing or enforce deep freeze; always derive hash from final immutable snapshot.',
        commonIssues: [
          { issue: 'Mutable post-sign cart', symptoms: ['Hash mismatch in audit'], diagnosis: 'State mutated after signing', fix: 'Deep-freeze / structural clone before sign' },
          { issue: 'Stale buffer reuse', symptoms: ['Hash points to outdated bytes'], diagnosis: 'Cached serialization reused', fix: 'Force re-serialize when structure changes' }
        ],
        hints: ['Look at mutation timing','Is object frozen?','How is hash computed?'],
        solution: 'Freeze or clone cart before signing; recompute hash only on canonical snapshot; reject Payment if cart mutated.',
        explanation: 'Immutable boundary ensures auditability & non-repudiation of Cart Mandate snapshot.'
      },
      expectedInsights: ['Need immutability boundary','Hash validity tied to snapshot','Mutation invalidates chain'],
      hints: ['Search for mutations after sign()','Check serialization caching'],
      explanation: 'Teaches integrity of mandate chain and the importance of post-sign immutability.',
      relatedConcepts: ['agent-security','hash-linking','immutability'],
      timeEstimate: 9,
      successCriteria: ['Identifies improper mutation','Proposes freeze/clone fix']
    }
  ]
};

// Helper function to get debug challenges by concept and level
export function getDebugChallenges(
  conceptId: string, 
  level?: 'beginner' | 'intermediate' | 'advanced'
): StudyModeQuestion[] {
  const challenges = debugChallengeLibrary[conceptId] || [];
  
  if (level) {
    return challenges.filter(c => c.level === level);
  }
  
  return challenges;
}