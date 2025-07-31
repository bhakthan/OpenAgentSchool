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
  }
];

// Export debug challenges organized by concept
export const debugChallengeLibrary = {
  'multi-agent-systems': debugChallenges.filter(c => c.conceptId === 'multi-agent-systems'),
  'a2a-communication': debugChallenges.filter(c => c.conceptId === 'a2a-communication'),
  'mcp': debugChallenges.filter(c => c.conceptId === 'mcp')
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
