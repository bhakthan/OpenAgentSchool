import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, AlertCircle, CheckCircle, ArrowUpRight, MessageSquare, Code, Layers, Shield, Clock, Settings } from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";
import HITLViz from "@/components/visualization/HITLViz";

interface HITLPattern {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  whenToUse: string[];
  implementation: string;
  codeExample: string;
}

const hitlPatterns: HITLPattern[] = [
  {
    id: "approval-workflow",
    name: "Approval Workflow",
    icon: <CheckCircle className="w-6 h-6" />,
    description: "Agent proposes actions, human approves or rejects before execution. Essential for high-stakes operations.",
    whenToUse: [
      "Financial transactions",
      "Data deletion",
      "External communications",
      "System configuration changes"
    ],
    implementation: "Queue-based with async approval, timeout handling, and escalation paths",
    codeExample: `from enum import Enum
from dataclasses import dataclass
from datetime import datetime, timedelta
import asyncio

class ApprovalStatus(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    ESCALATED = "escalated"
    EXPIRED = "expired"

@dataclass
class ApprovalRequest:
    id: str
    agent_id: str
    action_type: str
    action_details: dict
    risk_level: str  # low, medium, high, critical
    requestor: str
    created_at: datetime
    expires_at: datetime
    status: ApprovalStatus = ApprovalStatus.PENDING
    reviewer: str = None
    review_notes: str = None

class ApprovalWorkflow:
    """Human-in-the-loop approval for agent actions"""
    
    def __init__(self, queue, notifier):
        self.queue = queue  # Redis, SQS, etc.
        self.notifier = notifier  # Slack, email, etc.
        self.timeout_hours = {
            "low": 24,
            "medium": 4,
            "high": 1,
            "critical": 0.25  # 15 minutes
        }
    
    async def request_approval(self, 
                               agent_id: str,
                               action_type: str,
                               action_details: dict,
                               risk_level: str = "medium") -> ApprovalRequest:
        """Submit action for human approval"""
        
        timeout = self.timeout_hours.get(risk_level, 4)
        request = ApprovalRequest(
            id=generate_uuid(),
            agent_id=agent_id,
            action_type=action_type,
            action_details=action_details,
            risk_level=risk_level,
            requestor=agent_id,
            created_at=datetime.now(),
            expires_at=datetime.now() + timedelta(hours=timeout)
        )
        
        # Store in queue
        await self.queue.push(f"approvals:{request.id}", request.to_dict())
        
        # Notify appropriate reviewers
        await self.notifier.send(
            channel=self._get_channel(risk_level),
            message=self._format_approval_request(request)
        )
        
        return request
    
    async def wait_for_approval(self, 
                                request_id: str,
                                poll_interval: int = 5) -> ApprovalStatus:
        """Wait for human decision with timeout"""
        
        request = await self.queue.get(f"approvals:{request_id}")
        
        while request.status == ApprovalStatus.PENDING:
            # Check expiration
            if datetime.now() > request.expires_at:
                request.status = ApprovalStatus.EXPIRED
                await self._handle_expiration(request)
                break
            
            await asyncio.sleep(poll_interval)
            request = await self.queue.get(f"approvals:{request_id}")
        
        return request.status
    
    async def approve(self, 
                      request_id: str,
                      reviewer: str,
                      notes: str = None):
        """Human approves the action"""
        request = await self.queue.get(f"approvals:{request_id}")
        request.status = ApprovalStatus.APPROVED
        request.reviewer = reviewer
        request.review_notes = notes
        await self.queue.update(f"approvals:{request_id}", request.to_dict())
        
        # Log for audit
        await self.log_decision(request)
    
    async def reject(self,
                     request_id: str,
                     reviewer: str,
                     reason: str):
        """Human rejects the action"""
        request = await self.queue.get(f"approvals:{request_id}")
        request.status = ApprovalStatus.REJECTED
        request.reviewer = reviewer
        request.review_notes = reason
        await self.queue.update(f"approvals:{request_id}", request.to_dict())

# Usage in agent
class ApprovalRequiredAgent:
    def __init__(self, agent, approval_workflow):
        self.agent = agent
        self.approval = approval_workflow
    
    async def execute_with_approval(self, action):
        # High-risk actions need approval
        if action.risk_level in ["high", "critical"]:
            request = await self.approval.request_approval(
                agent_id=self.agent.id,
                action_type=action.type,
                action_details=action.to_dict(),
                risk_level=action.risk_level
            )
            
            status = await self.approval.wait_for_approval(request.id)
            
            if status != ApprovalStatus.APPROVED:
                return {"status": "blocked", "reason": f"Action {status.value}"}
        
        # Execute the action
        return await self.agent.execute(action)`
  },
  {
    id: "escalation",
    name: "Escalation Paths",
    icon: <ArrowUpRight className="w-6 h-6" />,
    description: "Agent recognizes when it's uncertain or out of scope and routes to human experts.",
    whenToUse: [
      "Low confidence responses",
      "Out-of-scope requests",
      "Sensitive topics",
      "Complex edge cases"
    ],
    implementation: "Confidence thresholds, topic classification, and tiered expert routing",
    codeExample: `from typing import Optional, List
from dataclasses import dataclass

@dataclass
class EscalationTicket:
    id: str
    conversation_id: str
    reason: str
    confidence_score: float
    context: dict
    assigned_to: Optional[str] = None
    priority: str = "normal"

class EscalationManager:
    """Route complex cases to human experts"""
    
    def __init__(self, ticketing_system, expert_router):
        self.tickets = ticketing_system
        self.router = expert_router
        
        # Escalation triggers
        self.confidence_threshold = 0.7
        self.escalation_topics = [
            "legal advice",
            "medical diagnosis",
            "financial planning",
            "security incident",
            "harassment report"
        ]
    
    def should_escalate(self, 
                        response: str,
                        confidence: float,
                        detected_topics: List[str]) -> dict:
        """Determine if human escalation is needed"""
        
        reasons = []
        
        # Low confidence
        if confidence < self.confidence_threshold:
            reasons.append(f"Low confidence: {confidence:.2f}")
        
        # Sensitive topics
        sensitive_matches = [
            t for t in detected_topics 
            if any(et in t.lower() for et in self.escalation_topics)
        ]
        if sensitive_matches:
            reasons.append(f"Sensitive topics: {sensitive_matches}")
        
        # Explicit uncertainty phrases
        uncertainty_phrases = [
            "I'm not sure",
            "I don't know",
            "you should consult",
            "I cannot provide",
            "seek professional"
        ]
        if any(phrase in response.lower() for phrase in uncertainty_phrases):
            reasons.append("Agent expressed uncertainty")
        
        return {
            "should_escalate": len(reasons) > 0,
            "reasons": reasons,
            "priority": "high" if sensitive_matches else "normal"
        }
    
    async def escalate(self,
                       conversation_id: str,
                       reason: str,
                       context: dict,
                       priority: str = "normal") -> EscalationTicket:
        """Create escalation ticket and route to expert"""
        
        # Determine which expert team
        expert_team = self.router.get_team(context.get("topics", []))
        
        ticket = EscalationTicket(
            id=generate_uuid(),
            conversation_id=conversation_id,
            reason=reason,
            confidence_score=context.get("confidence", 0),
            context=context,
            priority=priority
        )
        
        # Create ticket in system
        await self.tickets.create(ticket, team=expert_team)
        
        # Notify user
        return ticket
    
    def get_escalation_response(self, ticket: EscalationTicket) -> str:
        """Response to show user during escalation"""
        return f"""
I want to make sure you get the best help with this. I'm connecting you 
with a human expert who can assist you directly.

Your case reference: {ticket.id}
Expected response time: {self._get_sla(ticket.priority)}

Is there anything else I can help with in the meantime?
"""

class EscalationAwareAgent:
    """Agent that knows when to hand off to humans"""
    
    def __init__(self, agent, escalation_manager):
        self.agent = agent
        self.escalation = escalation_manager
    
    async def respond(self, user_message: str, context: dict) -> str:
        # Get agent response with confidence
        result = await self.agent.generate_with_confidence(user_message)
        
        # Check if escalation needed
        escalation_check = self.escalation.should_escalate(
            response=result.response,
            confidence=result.confidence,
            detected_topics=result.topics
        )
        
        if escalation_check["should_escalate"]:
            ticket = await self.escalation.escalate(
                conversation_id=context["conversation_id"],
                reason="; ".join(escalation_check["reasons"]),
                context={
                    "user_message": user_message,
                    "agent_response": result.response,
                    "confidence": result.confidence,
                    "topics": result.topics
                },
                priority=escalation_check["priority"]
            )
            
            return self.escalation.get_escalation_response(ticket)
        
        return result.response`
  },
  {
    id: "feedback-loop",
    name: "Feedback Collection",
    icon: <MessageSquare className="w-6 h-6" />,
    description: "Collect human feedback on agent responses to enable continuous improvement.",
    whenToUse: [
      "Quality monitoring",
      "Training data collection",
      "User satisfaction tracking",
      "Error pattern discovery"
    ],
    implementation: "Inline feedback widgets, follow-up surveys, and implicit signals",
    codeExample: `from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime

@dataclass
class FeedbackRecord:
    id: str
    conversation_id: str
    message_id: str
    user_id: str
    feedback_type: str  # thumbs, rating, text, correction
    value: any  # True/False, 1-5, text, etc.
    timestamp: datetime
    agent_response: str
    user_input: str
    context: dict

class FeedbackCollector:
    """Collect and analyze human feedback on agent responses"""
    
    def __init__(self, storage, analytics):
        self.storage = storage
        self.analytics = analytics
    
    async def record_thumbs(self,
                            conversation_id: str,
                            message_id: str,
                            user_id: str,
                            is_positive: bool,
                            context: dict):
        """Simple thumbs up/down feedback"""
        
        record = FeedbackRecord(
            id=generate_uuid(),
            conversation_id=conversation_id,
            message_id=message_id,
            user_id=user_id,
            feedback_type="thumbs",
            value=is_positive,
            timestamp=datetime.now(),
            agent_response=context.get("agent_response", ""),
            user_input=context.get("user_input", ""),
            context=context
        )
        
        await self.storage.save("feedback", record.to_dict())
        
        # Track metrics
        self.analytics.track("feedback_thumbs", {
            "is_positive": is_positive,
            "agent_type": context.get("agent_type")
        })
    
    async def record_correction(self,
                                conversation_id: str,
                                message_id: str,
                                user_id: str,
                                original_response: str,
                                corrected_response: str,
                                context: dict):
        """User provides corrected response"""
        
        record = FeedbackRecord(
            id=generate_uuid(),
            conversation_id=conversation_id,
            message_id=message_id,
            user_id=user_id,
            feedback_type="correction",
            value={
                "original": original_response,
                "corrected": corrected_response
            },
            timestamp=datetime.now(),
            agent_response=original_response,
            user_input=context.get("user_input", ""),
            context=context
        )
        
        await self.storage.save("feedback", record.to_dict())
        
        # Corrections are gold for fine-tuning
        await self.storage.save("training_candidates", {
            "input": context.get("user_input"),
            "output": corrected_response,
            "source": "user_correction"
        })
    
    async def get_feedback_summary(self,
                                   agent_type: str = None,
                                   days: int = 7) -> dict:
        """Summarize feedback for analysis"""
        
        records = await self.storage.query("feedback", {
            "timestamp": {"$gte": days_ago(days)},
            **({"context.agent_type": agent_type} if agent_type else {})
        })
        
        thumbs = [r for r in records if r["feedback_type"] == "thumbs"]
        positive = sum(1 for r in thumbs if r["value"])
        
        return {
            "total_feedback": len(records),
            "thumbs_up": positive,
            "thumbs_down": len(thumbs) - positive,
            "satisfaction_rate": positive / len(thumbs) if thumbs else 0,
            "corrections_count": sum(1 for r in records if r["feedback_type"] == "correction"),
            "by_day": self._group_by_day(records)
        }
    
    async def identify_problem_patterns(self, min_negative: int = 5) -> List[dict]:
        """Find patterns in negative feedback"""
        
        negative = await self.storage.query("feedback", {
            "feedback_type": "thumbs",
            "value": False
        })
        
        # Cluster by user input similarity
        clusters = self._cluster_by_similarity([r["user_input"] for r in negative])
        
        problems = []
        for cluster in clusters:
            if len(cluster["items"]) >= min_negative:
                problems.append({
                    "pattern": cluster["representative"],
                    "count": len(cluster["items"]),
                    "examples": cluster["items"][:3]
                })
        
        return sorted(problems, key=lambda x: x["count"], reverse=True)`
  },
  {
    id: "oversight-dashboard",
    name: "Oversight Dashboard",
    icon: <Settings className="w-6 h-6" />,
    description: "Real-time visibility into agent operations with intervention capabilities.",
    whenToUse: [
      "Production monitoring",
      "Compliance auditing",
      "Incident investigation",
      "Capacity planning"
    ],
    implementation: "Real-time metrics, conversation review, and emergency controls",
    codeExample: `class OversightDashboard:
    """Human oversight interface for agent operations"""
    
    def __init__(self, metrics, conversations, controls):
        self.metrics = metrics
        self.conversations = conversations
        self.controls = controls
    
    async def get_live_stats(self) -> dict:
        """Real-time operational metrics"""
        return {
            "active_conversations": await self.metrics.count("active_conversations"),
            "requests_per_minute": await self.metrics.rate("requests", "1m"),
            "avg_response_time_ms": await self.metrics.avg("response_time", "5m"),
            "error_rate_pct": await self.metrics.rate("errors", "5m") * 100,
            "satisfaction_rate": await self.metrics.avg("satisfaction", "1h"),
            "pending_approvals": await self.metrics.count("pending_approvals"),
            "active_escalations": await self.metrics.count("active_escalations")
        }
    
    async def get_conversation_stream(self, 
                                       filter_type: str = None,
                                       limit: int = 50) -> List[dict]:
        """Stream of recent conversations for review"""
        
        query = {}
        if filter_type == "escalated":
            query["status"] = "escalated"
        elif filter_type == "negative_feedback":
            query["feedback.value"] = False
        elif filter_type == "high_risk":
            query["risk_level"] = {"$in": ["high", "critical"]}
        
        convos = await self.conversations.query(query, limit=limit)
        
        return [{
            "id": c["id"],
            "user_id": c["user_id"][:8] + "...",  # Anonymize
            "started_at": c["created_at"],
            "message_count": len(c["messages"]),
            "status": c["status"],
            "has_feedback": "feedback" in c,
            "risk_level": c.get("risk_level", "normal")
        } for c in convos]
    
    async def review_conversation(self, conversation_id: str) -> dict:
        """Full conversation detail for review"""
        convo = await self.conversations.get(conversation_id)
        
        return {
            "id": convo["id"],
            "messages": convo["messages"],
            "metadata": {
                "agent_type": convo.get("agent_type"),
                "model_used": convo.get("model"),
                "total_tokens": convo.get("total_tokens"),
                "total_cost_usd": convo.get("total_cost")
            },
            "feedback": convo.get("feedback"),
            "audit_log": await self._get_audit_log(conversation_id)
        }
    
    # Emergency controls
    async def pause_agent(self, agent_id: str, reason: str):
        """Immediately pause an agent"""
        await self.controls.set(f"agent:{agent_id}:paused", True)
        await self.log_action("pause_agent", agent_id, reason)
    
    async def resume_agent(self, agent_id: str):
        """Resume a paused agent"""
        await self.controls.set(f"agent:{agent_id}:paused", False)
        await self.log_action("resume_agent", agent_id, "Manual resume")
    
    async def block_user(self, user_id: str, reason: str, duration_hours: int = None):
        """Block a user from using agents"""
        await self.controls.set(f"user:{user_id}:blocked", True, ttl=duration_hours * 3600 if duration_hours else None)
        await self.log_action("block_user", user_id, reason)
    
    async def force_escalate(self, conversation_id: str, reason: str):
        """Force escalation of a conversation"""
        await self.conversations.update(conversation_id, {"status": "escalated"})
        await self.log_action("force_escalate", conversation_id, reason)
    
    async def inject_message(self, conversation_id: str, message: str):
        """Inject human message into conversation"""
        await self.conversations.add_message(conversation_id, {
            "role": "human_override",
            "content": message,
            "timestamp": datetime.now()
        })
        await self.log_action("inject_message", conversation_id, message[:100])`
  }
];

const maturityLevels = [
  {
    level: 1,
    name: "Basic",
    description: "Simple feedback collection",
    capabilities: ["Thumbs up/down", "Basic metrics", "Manual review"],
    effort: "1-2 days"
  },
  {
    level: 2,
    name: "Standard",
    description: "Approval workflows + escalation",
    capabilities: ["Approval queues", "Escalation routing", "Feedback analysis"],
    effort: "1-2 weeks"
  },
  {
    level: 3,
    name: "Advanced",
    description: "Full oversight + automation",
    capabilities: ["Real-time dashboard", "Auto-escalation", "Pattern detection", "Emergency controls"],
    effort: "1-2 months"
  }
];

export default function HumanInTheLoopPatternsConcept() {
  const [selectedPattern, setSelectedPattern] = useState<HITLPattern>(hitlPatterns[0]);

  return (
    <ConceptLayout
      conceptId="human-in-the-loop-patterns"
      title="Human-in-the-Loop Patterns"
      description="Keep humans in control: approval workflows, escalation paths, feedback loops, and oversight dashboards"
      icon={<Users className="w-8 h-8" />}
      concepts={["Approval Workflows", "Escalation Paths", "Feedback Collection", "Oversight Dashboards"]}
      estimatedTime="45-55 min"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-indigo-500/20">
                <Users className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why Human Oversight Matters</h3>
                <p className="text-muted-foreground">
                  Even the best agents make mistakes. Human-in-the-loop patterns ensure that critical 
                  decisions have human oversight, uncertain situations get expert help, and continuous 
                  feedback improves agent quality over time. The goal isn't to replace humans—it's to 
                  augment them.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-indigo-500/10">Approval Workflows</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Escalation</Badge>
                  <Badge variant="outline" className="bg-blue-500/10">Feedback Loops</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Oversight</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Visualization */}
        <HITLViz autoPlay={true} />

        {/* Human-in-the-Loop Patterns Infographic */}
        <div className="rounded-xl border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" /> Human-in-the-Loop Patterns Overview
          </h3>
          <img 
            src="/images/Human_in_the_loop_Patterns.png" 
            alt="Human-in-the-Loop Patterns: Approval gates, confidence thresholds, feedback loops, and graceful handoff" 
            className="w-full rounded-lg shadow-sm border"
            loading="lazy"
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            From full manual control to supervised autonomy: Building trust through oversight
          </p>
        </div>

        <Tabs defaultValue="patterns" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patterns">HITL Patterns</TabsTrigger>
            <TabsTrigger value="maturity">Maturity Levels</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          </TabsList>

          <TabsContent value="patterns" className="space-y-6">
            {/* Pattern Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {hitlPatterns.map((pattern) => (
                <Card
                  key={pattern.id}
                  className={`cursor-pointer transition-all hover:border-indigo-500/50 ${
                    selectedPattern.id === pattern.id ? 'border-indigo-500 bg-indigo-500/5' : ''
                  }`}
                  onClick={() => setSelectedPattern(pattern)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-indigo-400">
                      {pattern.icon}
                    </div>
                    <h4 className="font-medium text-sm">{pattern.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pattern Detail */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    {selectedPattern.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedPattern.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedPattern.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-green-400" /> When to Use
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedPattern.whenToUse.map((use, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" /> Implementation
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedPattern.implementation}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" /> Code Example
                  </h4>
                  <CodeBlock language="python">
                    {selectedPattern.codeExample}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maturity">
            <Card>
              <CardHeader>
                <CardTitle>HITL Maturity Levels</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Start simple, evolve as your agent operations grow
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maturityLevels.map((level) => (
                    <div key={level.level} className={`p-4 rounded-lg border ${
                      level.level === 1 ? 'bg-green-500/5 border-green-500/20' :
                      level.level === 2 ? 'bg-blue-500/5 border-blue-500/20' :
                      'bg-purple-500/5 border-purple-500/20'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Level {level.level}</Badge>
                          <h4 className="font-medium">{level.name}</h4>
                        </div>
                        <Badge variant="secondary">{level.effort}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{level.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {level.capabilities.map((cap, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{cap}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quickstart">
            <Card>
              <CardHeader>
                <CardTitle>🚀 Add HITL in 10 Minutes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">Step 1: Add Thumbs Feedback</h4>
                  <CodeBlock language="python">
{`# After each response, collect feedback
feedback = get_user_feedback()  # UI returns True/False

await feedback_collector.record_thumbs(
    conversation_id=conv.id,
    message_id=msg.id,
    user_id=user.id,
    is_positive=feedback
)`}
                  </CodeBlock>
                </div>

                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">Step 2: Add Confidence-Based Escalation</h4>
                  <CodeBlock language="python">
{`# Check confidence before responding
if response.confidence < 0.7:
    await escalation.create_ticket(
        conversation_id=conv.id,
        reason="Low confidence response",
        context={"response": response.text}
    )
    return "Let me connect you with a human expert..."`}
                  </CodeBlock>
                </div>

                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">Step 3: Gate High-Risk Actions</h4>
                  <CodeBlock language="python">
{`# Require approval for critical actions
HIGH_RISK_ACTIONS = ["delete", "transfer", "send_email"]

if action.type in HIGH_RISK_ACTIONS:
    approval = await approval_workflow.request(action)
    if not approval.is_approved:
        return "This action requires approval from a manager."`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
