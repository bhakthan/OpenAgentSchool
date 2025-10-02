import { PatternData } from './types';
import { LegalResearchVisual } from '@/components/visualization/business-use-cases/LegalResearchVisual';

export const modelContextProtocolPattern: PatternData = {
  id: 'model-context-protocol',
  name: 'Model Context Protocol (MCP)',
  description: 'Standardized framework for structured communication between AI agents with context management, message formatting, and state tracking.',
  category: 'Communication',
  useCases: ['Enterprise Multi-Agent Systems', 'Cross-Platform Integration', 'Long-Running Conversations', 'Agent Handoffs'],
  whenToUse: 'Use Model Context Protocol when you need reliable communication between different AI agents, maintaining conversation context across agent transitions, or building systems that require auditability and interoperability. This pattern is ideal for enterprise systems with multiple specialized agents.',
  
  businessUseCase: {
    industry: 'Legal Services',
    description: 'A law firm uses MCP to coordinate specialized legal agents: a case research agent analyzes precedents, a document drafting agent creates contracts, and a compliance agent reviews regulations. MCP ensures context is preserved as cases move between agents, maintaining conversation history and ensuring all agents have access to relevant case information.',
    enlightenMePrompt: 'Explain how to implement Model Context Protocol for coordinating specialized legal AI agents with context preservation.',
    visualization: LegalResearchVisual
  },

  nodes: [
    {
      id: 'client-request',
      type: 'input',
      data: { label: 'Client Request', nodeType: 'input' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'mcp-router',
      type: 'default',
      data: { label: 'MCP Message Router', nodeType: 'router' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'context-manager',
      type: 'default',
      data: { label: 'Context Manager', nodeType: 'aggregator' },
      position: { x: 500, y: 120 }
    },
    {
      id: 'research-agent',
      type: 'default',
      data: { label: 'Legal Research Agent', nodeType: 'llm' },
      position: { x: 700, y: 100 }
    },
    {
      id: 'drafting-agent',
      type: 'default',
      data: { label: 'Document Drafting Agent', nodeType: 'llm' },
      position: { x: 700, y: 200 }
    },
    {
      id: 'compliance-agent',
      type: 'default',
      data: { label: 'Compliance Agent', nodeType: 'llm' },
      position: { x: 700, y: 300 }
    },
    {
      id: 'mcp-aggregator',
      type: 'default',
      data: { label: 'MCP Response Aggregator', nodeType: 'aggregator' },
      position: { x: 900, y: 200 }
    },
    {
      id: 'final-output',
      type: 'output',
      data: { label: 'Coordinated Legal Response', nodeType: 'output' },
      position: { x: 1100, y: 200 }
    }
  ],

  edges: [
    { id: 'e1', source: 'client-request', target: 'mcp-router' },
    { id: 'e2', source: 'mcp-router', target: 'context-manager' },
    { id: 'e3', source: 'context-manager', target: 'research-agent' },
    { id: 'e4', source: 'context-manager', target: 'drafting-agent' },
    { id: 'e5', source: 'context-manager', target: 'compliance-agent' },
    { id: 'e6', source: 'research-agent', target: 'mcp-aggregator' },
    { id: 'e7', source: 'drafting-agent', target: 'mcp-aggregator' },
    { id: 'e8', source: 'compliance-agent', target: 'mcp-aggregator' },
    { id: 'e9', source: 'mcp-aggregator', target: 'final-output' }
  ],

  codeExample: `// Model Context Protocol implementation
import { McpMessage, McpContextManager } from '@/lib/mcp';

class ModelContextProtocolSystem {
  private contextManager: McpContextManager;
  private agents: Map<string, LegalAgent>;
  
  constructor() {
    this.contextManager = new McpContextManager();
    this.agents = new Map([
      ['research', new LegalResearchAgent()],
      ['drafting', new DocumentDraftingAgent()],
      ['compliance', new ComplianceAgent()]
    ]);
  }
  
  async processLegalRequest(request: string): Promise<string> {
    // Create conversation context
    const conversationId = this.generateConversationId();
    
    // Initialize MCP message
    const initialMessage: McpMessage = {
      protocol: "mcp-0.1",
      message_id: this.generateMessageId(),
      trace_id: this.generateTraceId(),
      role: "user",
      content: request,
      context: {
        current: {
          conversation_id: conversationId,
          turn: 1
        }
      },
      properties: {
        created_at: new Date().toISOString(),
        intent: "legal_analysis"
      }
    };
    
    // Store initial context
    this.contextManager.storeContext(conversationId, {
      case_type: this.identifyCaseType(request),
      client_info: this.extractClientInfo(request),
      priority: this.assessPriority(request)
    });
    
    // Route to appropriate agents with context
    const responses = await this.routeToAgents(initialMessage);
    
    // Aggregate responses maintaining context
    return this.aggregateResponses(responses, conversationId);
  }
  
  private async routeToAgents(message: McpMessage): Promise<McpMessage[]> {
    const responses: McpMessage[] = [];
    
    // Determine which agents to involve
    const requiredAgents = this.determineRequiredAgents(message.content);
    
    for (const agentType of requiredAgents) {
      const agent = this.agents.get(agentType);
      if (!agent) continue;
      
      // Create agent-specific message with preserved context
      const agentMessage: McpMessage = {
        ...message,
        message_id: this.generateMessageId(),
        parent_id: message.message_id,
        role: "assistant",
        properties: {
          ...message.properties,
          target_agent: agentType,
          specialized_context: this.getAgentContext(agentType, message.context.current.conversation_id)
        }
      };
      
      // Process with agent and get response
      const response = await agent.process(agentMessage);
      
      // Update context with agent response
      this.contextManager.addMessage(
        message.context.current.conversation_id,
        response
      );
      
      responses.push(response);
    }
    
    return responses;
  }
  
  private async aggregateResponses(responses: McpMessage[], conversationId: string): Promise<string> {
    // Get full conversation context
    const context = this.contextManager.getContext(conversationId);
    
    // Create comprehensive legal response
    const legalAnalysis = responses.find(r => r.properties.target_agent === 'research')?.content || '';
    const documentDraft = responses.find(r => r.properties.target_agent === 'drafting')?.content || '';
    const complianceReview = responses.find(r => r.properties.target_agent === 'compliance')?.content || '';
    
    return \`
## Legal Analysis and Recommendation

### Research Findings
\${legalAnalysis}

### Document Draft
\${documentDraft}

### Compliance Review
\${complianceReview}

### Recommended Actions
Based on the coordinated analysis from our specialized legal agents, we recommend proceeding with the outlined approach while ensuring compliance with all identified regulations.
    \`.trim();
  }
  
  private determineRequiredAgents(content: string): string[] {
    const agents: string[] = [];
    
    if (content.includes('precedent') || content.includes('case law')) {
      agents.push('research');
    }
    
    if (content.includes('contract') || content.includes('document')) {
      agents.push('drafting');
    }
    
    if (content.includes('compliance') || content.includes('regulation')) {
      agents.push('compliance');
    }
    
    // Always include research for legal context
    if (!agents.includes('research')) {
      agents.push('research');
    }
    
    return agents;
  }
  
  private getAgentContext(agentType: string, conversationId: string): any {
    const baseContext = this.contextManager.getContext(conversationId);
    
    switch (agentType) {
      case 'research':
        return {
          databases: ['westlaw', 'lexis', 'case_law_db'],
          search_scope: 'federal_and_state',
          time_range: 'last_10_years'
        };
      case 'drafting':
        return {
          document_templates: baseContext.metadata?.case_type || 'general',
          style_guide: 'firm_standard',
          review_level: 'senior_associate'
        };
      case 'compliance':
        return {
          regulations: ['sec', 'sox', 'gdpr', 'ccpa'],
          jurisdiction: baseContext.metadata?.jurisdiction || 'federal',
          risk_tolerance: 'conservative'
        };
      default:
        return baseContext;
    }
  }
  
  private generateConversationId(): string {
    return \`conv_\${Date.now()}_\${Math.random().toString(36).slice(2)}\`;
  }
  
  private generateMessageId(): string {
    return \`msg_\${Date.now()}_\${Math.random().toString(36).slice(2)}\`;
  }
  
  private generateTraceId(): string {
    return \`trace_\${Date.now()}_\${Math.random().toString(36).slice(2)}\`;
  }
}

// MCP Context Manager for conversation tracking
class McpContextManager {
  private contexts = new Map<string, any>();
  
  storeContext(conversationId: string, contextData: any): void {
    const existingContext = this.contexts.get(conversationId) || {
      messages: [],
      turn: 0,
      metadata: {}
    };
    
    this.contexts.set(conversationId, {
      ...existingContext,
      metadata: { ...existingContext.metadata, ...contextData },
      lastUpdated: Date.now()
    });
  }
  
  addMessage(conversationId: string, message: McpMessage): void {
    const context = this.contexts.get(conversationId) || {
      messages: [],
      turn: 0,
      metadata: {}
    };
    
    const updatedContext = {
      ...context,
      messages: [...context.messages, message],
      turn: context.turn + 1,
      lastUpdated: Date.now()
    };
    
    this.contexts.set(conversationId, updatedContext);
  }
  
  getContext(conversationId: string): any {
    return this.contexts.get(conversationId) || null;
  }
}

// Usage example
const mcpSystem = new ModelContextProtocolSystem();
const result = await mcpSystem.processLegalRequest(
  "I need help reviewing a software licensing agreement for compliance with EU data protection laws"
);`,

  pythonCodeExample: `# Model Context Protocol implementation in Python
from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional
from datetime import datetime
import uuid
import json

@dataclass
class McpMessage:
    """MCP message structure following the specification"""
    protocol: str = "mcp-0.1"
    message_id: str = field(default_factory=lambda: f"msg_{uuid.uuid4().hex[:12]}")
    parent_id: Optional[str] = None
    trace_id: str = field(default_factory=lambda: f"trace_{uuid.uuid4().hex[:8]}")
    role: str = "assistant"
    content: str = ""
    context: Dict[str, Any] = field(default_factory=dict)
    properties: Dict[str, Any] = field(default_factory=dict)
    
    def __post_init__(self):
        if not self.properties.get('created_at'):
            self.properties['created_at'] = datetime.now().isoformat()

class McpContextManager:
    """Context manager for MCP conversations"""
    
    def __init__(self):
        self.contexts = {}
    
    def store_context(self, conversation_id: str, context_data: Dict[str, Any]):
        """Store context for a conversation"""
        existing_context = self.contexts.get(conversation_id, {
            'messages': [],
            'turn': 0,
            'metadata': {}
        })
        
        self.contexts[conversation_id] = {
            **existing_context,
            'metadata': {**existing_context.get('metadata', {}), **context_data},
            'last_updated': datetime.now().timestamp()
        }
    
    def add_message(self, conversation_id: str, message: McpMessage):
        """Add message to context history"""
        context = self.contexts.get(conversation_id, {
            'messages': [],
            'turn': 0,
            'metadata': {}
        })
        
        updated_context = {
            **context,
            'messages': context['messages'] + [message],
            'turn': context['turn'] + 1,
            'last_updated': datetime.now().timestamp()
        }
        
        self.contexts[conversation_id] = updated_context
    
    def get_context(self, conversation_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve context for a conversation"""
        return self.contexts.get(conversation_id)

class LegalAgent:
    """Base class for specialized legal agents"""
    
    def __init__(self, agent_type: str):
        self.agent_type = agent_type
    
    async def process(self, message: McpMessage) -> McpMessage:
        """Process MCP message and return response"""
        response_content = await self._generate_response(message.content, message.context)
        
        return McpMessage(
            message_id=f"msg_{uuid.uuid4().hex[:12]}",
            parent_id=message.message_id,
            trace_id=message.trace_id,
            role="assistant",
            content=response_content,
            context=message.context,
            properties={
                **message.properties,
                'agent_type': self.agent_type,
                'processed_at': datetime.now().isoformat()
            }
        )
    
    async def _generate_response(self, content: str, context: Dict[str, Any]) -> str:
        """Override in subclasses for specialized processing"""
        return f"Processed by {self.agent_type}: {content}"

class LegalResearchAgent(LegalAgent):
    """Agent specialized in legal research and precedent analysis"""
    
    def __init__(self):
        super().__init__("legal_research")
    
    async def _generate_response(self, content: str, context: Dict[str, Any]) -> str:
        # Simulate legal research
        research_findings = f"""
## Legal Research Findings

Based on analysis of relevant case law and statutes for: "{content}"

### Key Precedents:
- Case A v. B (2023): Established framework for software licensing compliance
- Regulation C § 123: Defines requirements for data protection in licensing

### Applicable Laws:
- EU GDPR Articles 6, 28, 44 regarding data processing and transfers
- Software Licensing Compliance Framework 2024

### Risk Assessment:
- Medium risk: Potential data transfer issues
- Mitigation: Include GDPR-compliant data processing clauses
        """
        
        return research_findings.strip()

class DocumentDraftingAgent(LegalAgent):
    """Agent specialized in legal document drafting"""
    
    def __init__(self):
        super().__init__("document_drafting")
    
    async def _generate_response(self, content: str, context: Dict[str, Any]) -> str:
        # Simulate document drafting
        document_draft = f"""
## Document Draft

### Proposed Contract Clauses for: "{content}"

**Data Protection Clause 12.1:**
"Licensee shall ensure that any processing of personal data under this Agreement 
complies with applicable data protection laws, including but not limited to GDPR."

**Cross-Border Transfer Clause 12.2:**
"Any transfer of personal data outside the EU shall be subject to appropriate 
safeguards as defined in GDPR Article 46."

**Liability Limitation:**
"Licensor's liability for data protection violations shall not exceed..."
        """
        
        return document_draft.strip()

class ComplianceAgent(LegalAgent):
    """Agent specialized in regulatory compliance review"""
    
    def __init__(self):
        super().__init__("compliance")
    
    async def _generate_response(self, content: str, context: Dict[str, Any]) -> str:
        # Simulate compliance review
        compliance_review = f"""
## Compliance Review

### Regulatory Analysis for: "{content}"

**GDPR Compliance Checklist:**
✓ Lawful basis for processing defined
✓ Data subject rights addressed
⚠ International transfer safeguards need review
✓ Data retention periods specified

**Recommendations:**
1. Include Standard Contractual Clauses for EU data transfers
2. Define clear data processing purposes
3. Establish data breach notification procedures

**Risk Level:** Medium - Manageable with proposed safeguards
        """
        
        return compliance_review.strip()

class ModelContextProtocolSystem:
    """Main MCP system coordinating legal agents"""
    
    def __init__(self):
        self.context_manager = McpContextManager()
        self.agents = {
            'research': LegalResearchAgent(),
            'drafting': DocumentDraftingAgent(),
            'compliance': ComplianceAgent()
        }
    
    async def process_legal_request(self, request: str) -> str:
        """Process legal request using MCP coordination"""
        # Create conversation context
        conversation_id = f"conv_{uuid.uuid4().hex[:12]}"
        
        # Initialize MCP message
        initial_message = McpMessage(
            trace_id=f"trace_{uuid.uuid4().hex[:8]}",
            role="user",
            content=request,
            context={
                'current': {
                    'conversation_id': conversation_id,
                    'turn': 1
                }
            },
            properties={
                'intent': 'legal_analysis',
                'priority': 'high'
            }
        )
        
        # Store initial context
        self.context_manager.store_context(conversation_id, {
            'case_type': self._identify_case_type(request),
            'jurisdiction': 'EU',
            'complexity': 'medium'
        })
        
        # Route to appropriate agents
        responses = await self._route_to_agents(initial_message)
        
        # Aggregate responses
        return self._aggregate_responses(responses, conversation_id)
    
    async def _route_to_agents(self, message: McpMessage) -> List[McpMessage]:
        """Route message to appropriate agents with context preservation"""
        responses = []
        required_agents = self._determine_required_agents(message.content)
        
        for agent_type in required_agents:
            if agent_type not in self.agents:
                continue
            
            agent = self.agents[agent_type]
            
            # Create agent-specific message with preserved context
            agent_message = McpMessage(
                message_id=f"msg_{uuid.uuid4().hex[:12]}",
                parent_id=message.message_id,
                trace_id=message.trace_id,
                role="assistant",
                content=message.content,
                context=message.context,
                properties={
                    **message.properties,
                    'target_agent': agent_type,
                    'specialized_context': self._get_agent_context(
                        agent_type, 
                        message.context['current']['conversation_id']
                    )
                }
            )
            
            # Process with agent
            response = await agent.process(agent_message)
            
            # Update context
            self.context_manager.add_message(
                message.context['current']['conversation_id'],
                response
            )
            
            responses.append(response)
        
        return responses
    
    def _aggregate_responses(self, responses: List[McpMessage], conversation_id: str) -> str:
        """Aggregate responses from multiple agents"""
        context = self.context_manager.get_context(conversation_id)
        
        # Extract responses by agent type
        research_response = next(
            (r.content for r in responses if r.properties.get('agent_type') == 'legal_research'), 
            ''
        )
        drafting_response = next(
            (r.content for r in responses if r.properties.get('agent_type') == 'document_drafting'), 
            ''
        )
        compliance_response = next(
            (r.content for r in responses if r.properties.get('agent_type') == 'compliance'), 
            ''
        )
        
        return f"""
# Coordinated Legal Analysis

{research_response}

{drafting_response}

{compliance_response}

## Summary
Based on coordinated analysis from our specialized legal agents using Model Context Protocol, 
we recommend proceeding with the drafted clauses while implementing the compliance recommendations.

**Context preserved across {len(responses)} agent interactions**
**Conversation ID: {conversation_id}**
        """.strip()
    
    def _determine_required_agents(self, content: str) -> List[str]:
        """Determine which agents should handle the request"""
        agents = []
        
        if any(term in content.lower() for term in ['precedent', 'case law', 'research']):
            agents.append('research')
        
        if any(term in content.lower() for term in ['contract', 'document', 'clause']):
            agents.append('drafting')
        
        if any(term in content.lower() for term in ['compliance', 'regulation', 'gdpr']):
            agents.append('compliance')
        
        # Always include research for legal context
        if 'research' not in agents:
            agents.append('research')
        
        return agents
    
    def _get_agent_context(self, agent_type: str, conversation_id: str) -> Dict[str, Any]:
        """Get specialized context for each agent type"""
        base_context = self.context_manager.get_context(conversation_id)
        
        agent_contexts = {
            'research': {
                'databases': ['westlaw', 'lexis', 'eur_lex'],
                'search_scope': 'eu_and_member_states',
                'time_range': 'last_5_years'
            },
            'drafting': {
                'document_type': 'software_license',
                'style_guide': 'firm_standard',
                'review_level': 'senior_partner'
            },
            'compliance': {
                'regulations': ['gdpr', 'digital_services_act', 'ai_act'],
                'jurisdiction': 'eu',
                'risk_tolerance': 'conservative'
            }
        }
        
        return agent_contexts.get(agent_type, base_context)
    
    def _identify_case_type(self, content: str) -> str:
        """Identify the type of legal case"""
        if 'licensing' in content.lower():
            return 'software_licensing'
        elif 'data protection' in content.lower():
            return 'privacy_law'
        else:
            return 'general_commercial'

# Usage example
async def main():
    mcp_system = ModelContextProtocolSystem()
    
    result = await mcp_system.process_legal_request(
        "I need help reviewing a software licensing agreement for compliance with EU data protection laws"
    )
    
    print(result)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())`,

  implementation: [
    'Design MCP message structure with metadata and context fields',
    'Implement context manager for conversation state tracking',
    'Create message routing system for agent coordination',
    'Build specialized agents with MCP message handling',
    'Add message validation and error handling',
    'Implement conversation history management',
    'Create response aggregation with context preservation',
    'Add monitoring and logging for agent interactions'
  ],

  advantages: [
    'Standardizes communication between diverse AI agents',
    'Preserves context across complex multi-agent conversations',
    'Enables reliable handoffs between specialized agents',
    'Provides auditability and traceability of agent interactions',
    'Supports interoperability across different agent implementations',
    'Facilitates debugging and monitoring of agent workflows'
  ],

  limitations: [
    'Requires adherence to protocol specifications for compatibility',
    'May introduce communication overhead in simple scenarios',
    'Context storage requirements can grow large over time',
    'Version compatibility challenges as protocol evolves',
    'Complexity in implementing full context management features'
  ],

  relatedPatterns: [
    'Agent-to-Agent Communication',
    'Orchestrator-Worker',
    'Modern Tool Use',
    'Routing'
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '1-3 days',
    complexityReduction: 'Very High - MCP SDK and Microsoft Agent Framework integration eliminate custom context serialization and state management',
    reusabilityScore: 10,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Emerging standard protocol for agent interoperability across Claude Desktop, IDEs, and custom agents',
      'Architecture Templates - MCP SDK provides TypeScript/Python servers with built-in resource/prompt/tool patterns',
      'Operational Instrumentation - Protocol-level logging and inspector tools for debugging context exchanges',
      'Evaluation Automation - Context relevance scoring and retrieval accuracy metrics built into protocol'
    ]
  }
};