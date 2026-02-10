import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Clock, Brain, Layers, Search, MessageSquare, Zap, Code, CheckCircle, AlertTriangle, HardDrive, CloudCog } from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";
import MemorySystemsViz from "@/components/visualization/MemorySystemsViz";

interface MemoryType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  persistence: string;
  scope: string;
  accessPattern: string;
  useCases: string[];
  implementation: string;
  codeExample: string;
}

const memoryTypes: MemoryType[] = [
  {
    id: "working-memory",
    name: "Working Memory",
    icon: <Clock className="w-6 h-6" />,
    description: "In-context conversation history and scratchpad. Lives in the prompt, dies with the session.",
    persistence: "Session-only",
    scope: "Current task/conversation",
    accessPattern: "Always available (in context window)",
    useCases: [
      "Conversation continuity",
      "Multi-turn task tracking",
      "Scratchpad for reasoning",
      "Temporary state holding"
    ],
    implementation: "Simple message array with sliding window",
    codeExample: `class WorkingMemory:
    """Session-scoped in-context memory"""
    
    def __init__(self, max_tokens: int = 8000):
        self.messages: List[Dict] = []
        self.max_tokens = max_tokens
        self.scratchpad: Dict[str, Any] = {}
    
    def add_message(self, role: str, content: str):
        self.messages.append({
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
        self._trim_to_fit()
    
    def _trim_to_fit(self):
        """Sliding window: keep most recent messages that fit"""
        total_tokens = sum(count_tokens(m["content"]) for m in self.messages)
        
        while total_tokens > self.max_tokens and len(self.messages) > 1:
            # Always keep system message if present
            if self.messages[0]["role"] == "system":
                removed = self.messages.pop(1)
            else:
                removed = self.messages.pop(0)
            total_tokens -= count_tokens(removed["content"])
    
    def set_scratchpad(self, key: str, value: Any):
        """Temporary storage for current task"""
        self.scratchpad[key] = value
    
    def get_context_for_llm(self) -> List[Dict]:
        """Format for API call"""
        context = self.messages.copy()
        
        if self.scratchpad:
            context.append({
                "role": "system",
                "content": f"Current scratchpad state: {json.dumps(self.scratchpad)}"
            })
        
        return context`
  },
  {
    id: "short-term-memory",
    name: "Short-Term Memory",
    icon: <MessageSquare className="w-6 h-6" />,
    description: "Recent conversation buffer with summarization. Compresses older messages to fit more context.",
    persistence: "Hours to days",
    scope: "Recent interactions",
    accessPattern: "Automatic (injected into prompt)",
    useCases: [
      "Extended conversations",
      "Cross-session continuity",
      "Meeting/call summaries",
      "Task handoff context"
    ],
    implementation: "Sliding window with progressive summarization",
    codeExample: `class ShortTermMemory:
    """Progressive summarization for extended context"""
    
    def __init__(self, llm, window_size: int = 10, summary_threshold: int = 20):
        self.llm = llm
        self.window_size = window_size
        self.summary_threshold = summary_threshold
        self.recent_messages: List[Dict] = []
        self.summary_chain: List[str] = []  # Summarized older content
    
    def add_interaction(self, user_msg: str, assistant_msg: str):
        self.recent_messages.append({
            "user": user_msg,
            "assistant": assistant_msg,
            "timestamp": datetime.now()
        })
        
        # Trigger summarization when threshold reached
        if len(self.recent_messages) > self.summary_threshold:
            self._summarize_oldest()
    
    def _summarize_oldest(self):
        """Compress oldest messages into summary"""
        # Take oldest messages beyond window
        to_summarize = self.recent_messages[:-self.window_size]
        self.recent_messages = self.recent_messages[-self.window_size:]
        
        summary = self.llm.generate(f"""
        Summarize this conversation segment, preserving:
        - Key decisions made
        - Important facts learned
        - Ongoing tasks/commitments
        - User preferences expressed
        
        Conversation:
        {self._format_messages(to_summarize)}
        """)
        
        self.summary_chain.append(summary)
        
        # Recursively summarize if chain too long
        if len(self.summary_chain) > 5:
            self._compress_summary_chain()
    
    def get_context(self) -> str:
        parts = []
        
        if self.summary_chain:
            parts.append(f"Previous context summary:\\n{self.summary_chain[-1]}")
        
        parts.append(f"Recent conversation:\\n{self._format_messages(self.recent_messages)}")
        
        return "\\n\\n".join(parts)`
  },
  {
    id: "long-term-memory",
    name: "Long-Term Memory (Vector)",
    icon: <Database className="w-6 h-6" />,
    description: "Semantic search over all historical interactions. RAG-powered retrieval of relevant past experiences.",
    persistence: "Permanent",
    scope: "All historical data",
    accessPattern: "On-demand semantic search",
    useCases: [
      "Knowledge base Q&A",
      "Personalization at scale",
      "Learning from past tasks",
      "Compliance/audit retrieval"
    ],
    implementation: "Vector database with embeddings",
    codeExample: `class LongTermMemory:
    """Vector-based semantic memory for permanent storage"""
    
    def __init__(self, embedding_model, vector_db):
        self.embedder = embedding_model
        self.db = vector_db  # Chroma, Pinecone, Qdrant, etc.
        self.collection = self.db.get_or_create_collection("agent_memory")
    
    def store(self, content: str, metadata: Dict = None):
        """Store memory with semantic embedding"""
        embedding = self.embedder.embed(content)
        
        memory_id = str(uuid4())
        self.collection.add(
            ids=[memory_id],
            embeddings=[embedding],
            documents=[content],
            metadatas=[{
                "timestamp": datetime.now().isoformat(),
                "type": metadata.get("type", "general"),
                "user_id": metadata.get("user_id"),
                "importance": metadata.get("importance", 0.5),
                **metadata
            }]
        )
        return memory_id
    
    def recall(self, query: str, n_results: int = 5, 
               filters: Dict = None) -> List[Dict]:
        """Retrieve relevant memories"""
        query_embedding = self.embedder.embed(query)
        
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            where=filters  # e.g., {"user_id": "user_123"}
        )
        
        return [
            {
                "content": doc,
                "metadata": meta,
                "relevance": 1 - distance  # Convert distance to similarity
            }
            for doc, meta, distance in zip(
                results["documents"][0],
                results["metadatas"][0],
                results["distances"][0]
            )
        ]
    
    def forget(self, memory_id: str):
        """GDPR-compliant deletion"""
        self.collection.delete(ids=[memory_id])`
  },
  {
    id: "episodic-memory",
    name: "Episodic Memory",
    icon: <Layers className="w-6 h-6" />,
    description: "Structured episodes capturing complete task executions. Enables learning from past successes and failures.",
    persistence: "Permanent (structured)",
    scope: "Task-level episodes",
    accessPattern: "Query by task type or outcome",
    useCases: [
      "Learning from past tasks",
      "Few-shot example selection",
      "Error pattern recognition",
      "Performance optimization"
    ],
    implementation: "Structured storage with outcome tracking",
    codeExample: `@dataclass
class Episode:
    """A complete task execution record"""
    id: str
    task_type: str
    input: Dict[str, Any]
    actions: List[Dict]  # Sequence of agent actions
    outcome: str  # success, failure, partial
    result: Any
    duration_ms: int
    token_cost: int
    feedback: Optional[str] = None
    learned_insight: Optional[str] = None

class EpisodicMemory:
    """Task-level memory for learning from experience"""
    
    def __init__(self, storage, llm):
        self.storage = storage  # SQL or document DB
        self.llm = llm
    
    def record_episode(self, episode: Episode):
        """Store completed episode with extracted learnings"""
        
        # Auto-extract insight if task was notable
        if episode.outcome == "failure" or episode.feedback:
            episode.learned_insight = self.llm.generate(f"""
            Task: {episode.task_type}
            Input: {episode.input}
            Actions taken: {episode.actions}
            Outcome: {episode.outcome}
            Feedback: {episode.feedback}
            
            What should we learn from this for future similar tasks?
            Be specific and actionable.
            """)
        
        self.storage.insert("episodes", episode.to_dict())
    
    def get_similar_episodes(self, task_type: str, 
                             input_context: Dict,
                             n: int = 3) -> List[Episode]:
        """Retrieve relevant past episodes for few-shot learning"""
        
        # Query successful episodes of same type
        episodes = self.storage.query(
            "episodes",
            where={"task_type": task_type, "outcome": "success"},
            order_by="relevance",  # Uses embedding similarity
            limit=n
        )
        
        return [Episode.from_dict(e) for e in episodes]
    
    def get_failure_patterns(self, task_type: str) -> List[str]:
        """Extract patterns from failures to avoid"""
        failures = self.storage.query(
            "episodes",
            where={"task_type": task_type, "outcome": "failure"},
            limit=10
        )
        
        if not failures:
            return []
        
        patterns = self.llm.generate(f"""
        These are failed attempts at "{task_type}" tasks:
        {json.dumps(failures, indent=2)}
        
        What are the common failure patterns to avoid?
        List as bullet points.
        """)
        
        return patterns.split("\\n")`
  },
  {
    id: "semantic-memory",
    name: "Semantic Memory",
    icon: <Brain className="w-6 h-6" />,
    description: "Extracted facts, rules, and knowledge. The agent's structured understanding of the world.",
    persistence: "Permanent (knowledge graph)",
    scope: "Factual knowledge",
    accessPattern: "Entity/relation queries",
    useCases: [
      "Fact verification",
      "Entity relationships",
      "Domain knowledge",
      "User preference tracking"
    ],
    implementation: "Knowledge graph or structured facts DB",
    codeExample: `class SemanticMemory:
    """Knowledge graph for structured facts and relationships"""
    
    def __init__(self, graph_db, llm):
        self.graph = graph_db  # Neo4j, NebulaGraph, etc.
        self.llm = llm
    
    def extract_and_store(self, text: str, source: str = None):
        """Extract entities and relations from text"""
        
        extraction = self.llm.generate(f"""
        Extract structured knowledge from this text:
        "{text}"
        
        Return JSON array of facts:
        [
          {{"subject": "...", "predicate": "...", "object": "...", "confidence": 0.9}},
          ...
        ]
        """)
        
        facts = json.loads(extraction)
        
        for fact in facts:
            self.graph.merge_triple(
                subject=fact["subject"],
                predicate=fact["predicate"],
                object=fact["object"],
                metadata={
                    "source": source,
                    "confidence": fact["confidence"],
                    "extracted_at": datetime.now()
                }
            )
    
    def query(self, question: str) -> List[Dict]:
        """Natural language query over knowledge graph"""
        
        # Convert NL to graph query
        cypher = self.llm.generate(f"""
        Convert this question to a Cypher query:
        "{question}"
        
        Available node types: Person, Company, Product, Concept
        Available relationships: WORKS_AT, KNOWS, USES, RELATES_TO
        """)
        
        return self.graph.execute(cypher)
    
    def get_entity_context(self, entity: str) -> Dict:
        """Get everything known about an entity"""
        
        related = self.graph.query(f"""
        MATCH (e {{name: "{entity}"}})-[r]-(other)
        RETURN type(r) as relation, other.name as related_entity
        LIMIT 20
        """)
        
        return {
            "entity": entity,
            "relations": related,
            "summary": self._summarize_entity(entity, related)
        }`
  }
];

const memoryArchitectures = [
  {
    name: "Mem0 Architecture",
    description: "Unified memory layer with automatic type classification",
    diagram: `
┌─────────────────────────────────────────┐
│              Mem0 Memory Layer          │
├─────────────┬─────────────┬─────────────┤
│   Working   │  Episodic   │  Semantic   │
│   Memory    │   Memory    │   Memory    │
└──────┬──────┴──────┬──────┴──────┬──────┘
       │             │             │
       ▼             ▼             ▼
   In-Context    Vector DB    Knowledge
    Window        (Chroma)      Graph
    `,
    pros: ["Simple API", "Auto-classification", "Good defaults"],
    cons: ["Less control", "Opinionated architecture"]
  },
  {
    name: "RAG + Memory Hybrid",
    description: "Combine retrieval with conversational memory",
    diagram: `
┌────────────────────────────────────────────┐
│                Agent Context               │
├────────────────────────────────────────────┤
│  1. System Prompt                          │
│  2. Retrieved Docs (RAG)     ← Query       │
│  3. Relevant Memories        ← Semantic    │
│  4. Recent Conversation      ← Sliding     │
│  5. Current User Message                   │
└────────────────────────────────────────────┘
    `,
    pros: ["Flexible", "Proven at scale", "Clear separation"],
    cons: ["More complex", "Need to tune retrieval"]
  },
  {
    name: "LangGraph Memory",
    description: "State-based memory integrated with workflow graphs",
    diagram: `
┌────────────────────────────────────────────┐
│            LangGraph State                 │
│  ┌──────────────────────────────────────┐  │
│  │ messages: []      # Conversation     │  │
│  │ memory: {}        # Persistent KV    │  │
│  │ context: []       # Retrieved docs   │  │
│  │ episode: {}       # Current task     │  │
│  └──────────────────────────────────────┘  │
│                    │                       │
│     ┌──────────────┼──────────────┐        │
│     ▼              ▼              ▼        │
│  Checkpointer   Vector Store   SQL/KV     │
└────────────────────────────────────────────┘
    `,
    pros: ["Built-in checkpointing", "Graph integration", "Type-safe"],
    cons: ["LangGraph-specific", "Learning curve"]
  }
];

const productionConsiderations = [
  {
    title: "Memory Isolation",
    description: "Multi-tenant systems need strict memory boundaries. Never leak one user's memories to another.",
    icon: <CloudCog className="w-5 h-5 text-red-500" />,
    code: `# Always scope queries by user
memories = memory.recall(
    query=user_message,
    filters={"user_id": current_user.id}  # CRITICAL
)`
  },
  {
    title: "Cost-Aware Retrieval",
    description: "Embedding costs add up. Cache embeddings and batch queries when possible.",
    icon: <Zap className="w-5 h-5 text-yellow-500" />,
    code: `# Cache embeddings
@lru_cache(maxsize=10000)
def get_embedding(text: str) -> List[float]:
    return embedder.embed(text)`
  },
  {
    title: "Memory Hygiene",
    description: "Implement TTL, importance scoring, and garbage collection to prevent memory bloat.",
    icon: <HardDrive className="w-5 h-5 text-blue-500" />,
    code: `# Periodic cleanup
def cleanup_old_memories(days: int = 90):
    cutoff = datetime.now() - timedelta(days=days)
    collection.delete(
        where={"timestamp": {"$lt": cutoff.isoformat()}}
    )`
  },
  {
    title: "Graceful Degradation",
    description: "Memory systems fail. Design agents to work (with reduced capability) when memory is unavailable.",
    icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
    code: `try:
    memories = memory.recall(query)
except MemoryServiceError:
    memories = []  # Continue without memories
    logger.warning("Memory unavailable, degraded mode")`
  }
];

export default function AgentMemorySystemsConcept() {
  const [selectedMemory, setSelectedMemory] = useState<MemoryType>(memoryTypes[0]);

  return (
    <ConceptLayout
      conceptId="agent-memory-systems"
      title="Agent Memory Systems"
      description="Build agents that remember: working memory, short-term, long-term, episodic, and semantic memory architectures"
      icon={<Database className="w-8 h-8" />}
      concepts={["Working Memory", "Short-Term Memory", "Long-Term Memory", "Episodic Memory", "Semantic Memory"]}
      estimatedTime="50-60 min"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Database className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why Memory Matters</h3>
                <p className="text-muted-foreground">
                  Without memory, every interaction starts from zero. Production agents need layered memory 
                  systems—from session-scoped working memory to permanent semantic knowledge—to deliver 
                  personalized, contextual, and improving experiences over time.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-blue-500/10">Mem0</Badge>
                  <Badge variant="outline" className="bg-green-500/10">LangGraph Memory</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Chroma/Pinecone</Badge>
                  <Badge variant="outline" className="bg-orange-500/10">Neo4j</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Visualization */}
        <MemorySystemsViz autoPlay={true} />

        {/* 5-Layer Memory Architecture Infographic */}
        <div className="rounded-xl border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" /> The 5-Layer Memory Hierarchy
          </h3>
          <img 
            src="/images/Agent_Memory_Systems_5_Layers.webp" 
            alt="Agent Memory Systems: 5-layer hierarchy from working memory to semantic memory" 
            className="w-full rounded-lg shadow-sm border"
            loading="lazy"
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Working → Short-Term → Long-Term → Episodic → Semantic: Trade-offs between speed, capacity, and persistence
          </p>
        </div>

        <Tabs defaultValue="types" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="types">Memory Types</TabsTrigger>
            <TabsTrigger value="architectures">Architectures</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="types" className="space-y-6">
            {/* Memory Type Selector */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {memoryTypes.map((mem) => (
                <Card
                  key={mem.id}
                  className={`cursor-pointer transition-all hover:border-blue-500/50 ${
                    selectedMemory.id === mem.id ? 'border-blue-500 bg-blue-500/5' : ''
                  }`}
                  onClick={() => setSelectedMemory(mem)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-blue-400">
                      {mem.icon}
                    </div>
                    <h4 className="font-medium text-xs">{mem.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Memory Detail */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    {selectedMemory.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedMemory.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedMemory.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Properties Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Persistence</h4>
                    <Badge variant="secondary">{selectedMemory.persistence}</Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Scope</h4>
                    <Badge variant="secondary">{selectedMemory.scope}</Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Access Pattern</h4>
                    <Badge variant="secondary">{selectedMemory.accessPattern}</Badge>
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" /> Use Cases
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMemory.useCases.map((use, i) => (
                      <Badge key={i} variant="outline">{use}</Badge>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" /> Implementation
                  </h4>
                  <CodeBlock language="python">
                    {selectedMemory.codeExample}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architectures" className="space-y-6">
            {memoryArchitectures.map((arch, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{arch.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{arch.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <pre className="text-xs bg-black/50 p-4 rounded-lg overflow-x-auto font-mono text-green-400">
                    {arch.diagram}
                  </pre>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-green-400">✓ Pros</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {arch.pros.map((pro, j) => (
                          <li key={j}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-yellow-400">⚠ Cons</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {arch.cons.map((con, j) => (
                          <li key={j}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="implementation">
            <Card>
              <CardHeader>
                <CardTitle>Memory Stack Decision Tree</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">🤔 Simple Chatbot (no persistence needed)</h4>
                  <p className="text-sm text-muted-foreground">
                    → <strong>Working Memory only</strong>: Just keep last N messages in the prompt.
                  </p>
                </div>
                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">📝 Personal Assistant (user remembers context)</h4>
                  <p className="text-sm text-muted-foreground">
                    → <strong>Working + Short-Term</strong>: Summarize conversations, persist across sessions.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">📚 Knowledge Worker (RAG + personalization)</h4>
                  <p className="text-sm text-muted-foreground">
                    → <strong>Working + Long-Term (Vector)</strong>: Semantic search over docs and past interactions.
                  </p>
                </div>
                <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">🤖 Production Agent (learns from experience)</h4>
                  <p className="text-sm text-muted-foreground">
                    → <strong>Full Stack</strong>: Working + Short-Term + Long-Term + Episodic + Semantic.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            {productionConsiderations.map((item, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-background border">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <CodeBlock language="python">
                        {item.code}
                      </CodeBlock>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Memory in the Age of AI Agents
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Understanding the evolving landscape of agent memory systems and their role in persistent, context-aware AI.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <img 
                  src="/images/Memory_in_the_Age_Of_AI_Agents.webp" 
                  alt="Memory in the Age of AI Agents - comprehensive visual guide to agent memory architectures" 
                  className="w-full rounded-lg shadow-md border"
                  loading="lazy"
                />
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4 text-purple-400" /> Why Memory Matters
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Enables long-term context retention across sessions</li>
                      <li>• Supports learning from past interactions and errors</li>
                      <li>• Enables personalization without re-prompting</li>
                      <li>• Critical for multi-agent coordination and handoffs</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" /> The Memory Stack
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Working:</strong> In-context window (ephemeral)</li>
                      <li>• <strong>Short-term:</strong> Session buffer with summarization</li>
                      <li>• <strong>Long-term:</strong> Vector-indexed persistent storage</li>
                      <li>• <strong>Episodic:</strong> Complete interaction replay</li>
                      <li>• <strong>Semantic:</strong> Structured knowledge graphs</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Key Considerations
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                    <div>
                      <strong className="block text-foreground">Retrieval Quality</strong>
                      Poor recall = agent forgets important context. Over-retrieval = context pollution.
                    </div>
                    <div>
                      <strong className="block text-foreground">Memory Hygiene</strong>
                      Stale memories degrade performance. Implement decay, deduplication, and relevance scoring.
                    </div>
                    <div>
                      <strong className="block text-foreground">Privacy & Compliance</strong>
                      Long-term memory requires PII handling, retention policies, and user consent mechanisms.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}









