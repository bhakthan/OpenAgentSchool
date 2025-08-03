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

// Export debug challenges organized by concept
export const debugChallengeLibrary = {
  'multi-agent-systems': debugChallenges.filter(c => c.conceptId === 'multi-agent-systems'),
  'a2a-communication': debugChallenges.filter(c => c.conceptId === 'a2a-communication'),
  'mcp': debugChallenges.filter(c => c.conceptId === 'mcp'),
  'agentic-rag': debugChallenges.filter(c => c.conceptId === 'agentic-rag'),
  'modern-tool-use': debugChallenges.filter(c => c.conceptId === 'modern-tool-use'),
  'deep-agents': debugChallenges.filter(c => c.conceptId === 'deep-agents')
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
