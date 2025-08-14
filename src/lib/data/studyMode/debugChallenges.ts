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
  }
];


// Export debug challenges organized by concept
export const debugChallengeLibrary = {
  'multi-agent-systems': debugChallenges.filter(c => c.conceptId === 'multi-agent-systems'),
  'a2a-communication': debugChallenges.filter(c => c.conceptId === 'a2a-communication'),
  'mcp': debugChallenges.filter(c => c.conceptId === 'mcp'),
  'agentic-rag': debugChallenges.filter(c => c.conceptId === 'agentic-rag'),
  'modern-tool-use': debugChallenges.filter(c => c.conceptId === 'modern-tool-use'),
  'deep-agents': debugChallenges.filter(c => c.conceptId === 'deep-agents'),
  // New Core Concepts
  'agentic-prompting-fundamentals': agenticPromptingFundamentalsDebugChallenges,
  'prompt-optimization-patterns': promptOptimizationPatternsDebugChallenges,
  'agent-instruction-design': agentInstructionDesignDebugChallenges,
  'agentic-workflow-control': agenticWorkflowControlDebugChallenges,
  'agent-evaluation-methodologies': agentEvaluationMethodologiesDebugChallenges,
  'swarm-intelligence': swarmIntelligenceDebugChallenges
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
