import { SystemDesignPattern } from './types';

export const contextualOnboardingOrchestratorSystemDesign: SystemDesignPattern = {
  id: 'contextual-onboarding-orchestrator',
  name: 'Contextual Onboarding Orchestrator System Design',
  overview: 'Multi-day conversational assistant that maintains employee context across sessions, routes questions to specialist agents, and escalates complex cases to human approvers.',
  problemStatement: 'Employee onboarding spans days with 30+ conversation turns. Context must persist between sessions. Questions require different expertise (HR, DevOps, Compliance). Human escalation needed for exceptions.',
  solution: 'Orchestrator with hybrid memory (profile + summarization + recent turns), 4 specialist agents (HR, DevOps, Compliance, SkillGrowth), context-aware routing, and rule-based escalation triggers.',
  steps: [
    { 
      id: 'profile', 
      title: 'Profile Management', 
      category: 'architecture', 
      description: 'Persistent employee profile storage', 
      details: 'Extract and maintain key employee attributes: role, team, seniority, department. Persist across sessions.', 
      considerations: ['Profile schema', 'Update triggers', 'Privacy compliance'], 
      bestPractices: ['Structured fields', 'Session resumption', 'Audit logging'], 
      patterns: ['contextual-onboarding-orchestrator'], 
      examples: ['profile_store.update(employee_id, {"role": "Senior Engineer", "team": "DevOps"})'] 
    },
    { 
      id: 'memory', 
      title: 'Hybrid Memory Strategy', 
      category: 'architecture', 
      description: 'Balance context preservation with token efficiency', 
      details: 'Maintain 3 memory layers: (1) persistent profile, (2) summarized old turns (trigger after 10), (3) full recent turns (last 5).', 
      considerations: ['Summarization quality', 'Context loss', 'Token budgets'], 
      bestPractices: ['Progressive summarization', 'Semantic retention', 'Turn windowing'], 
      patterns: ['contextual-onboarding-orchestrator'], 
      examples: ['memory_mgr.add_turn(turn); if len(turns) > 10: memory_mgr.summarize_old()'] 
    },
    { 
      id: 'routing', 
      title: 'Context-Aware Routing', 
      category: 'architecture', 
      description: 'Route questions to appropriate specialist agents', 
      details: 'Router combines question embeddings with employee profile (role, team) to select agent. Handles ambiguity through clarification.', 
      considerations: ['Routing accuracy', 'Ambiguous questions', 'Agent availability'], 
      bestPractices: ['Semantic similarity + profile context', 'Confidence thresholds', 'Fallback handling'], 
      patterns: ['contextual-onboarding-orchestrator'], 
      examples: ['router.select_agent(question, employee_profile) → hr_agent | devops_agent | compliance_agent | skill_growth_agent'] 
    },
    { 
      id: 'hr-agent', 
      title: 'HR Specialist Agent', 
      category: 'architecture', 
      description: 'Handles benefits, policies, leave, training', 
      details: 'Context Provider: HR knowledge base, policy documents, benefits info. Answers FAQs, provides forms.', 
      considerations: ['Policy updates', 'Regional variations', 'Sensitive info'], 
      bestPractices: ['Document versioning', 'Privacy filters', 'Escalation triggers'], 
      patterns: ['contextual-onboarding-orchestrator'], 
      examples: ['hr_agent.run("What is parental leave policy?", employee=profile)'] 
    },
    { 
      id: 'devops-agent', 
      title: 'DevOps Specialist Agent', 
      category: 'architecture', 
      description: 'Technical setup, tools, infrastructure access', 
      details: 'Context Provider: DevOps runbooks, CI/CD docs, tool guides. Generates setup instructions, troubleshoots access.', 
      considerations: ['Tool coverage', 'Security clearance', 'Team-specific workflows'], 
      bestPractices: ['Role-based instructions', 'Access validation', 'Runbook updates'], 
      patterns: ['contextual-onboarding-orchestrator'], 
      examples: ['devops_agent.run("How do I deploy to staging?", team=profile.team)'] 
    },
    { 
      id: 'compliance-agent', 
      title: 'Compliance Specialist Agent', 
      category: 'architecture', 
      description: 'Security, data policies, regulatory requirements', 
      details: 'Context Provider: Compliance policies, data handling rules, security protocols. Flags violations, requires acknowledgments.', 
      considerations: ['Regulatory changes', 'Audit trails', 'Exception handling'], 
      bestPractices: ['Policy enforcement', 'Acknowledgment logging', 'Human escalation'], 
      patterns: ['contextual-onboarding-orchestrator'], 
      examples: ['compliance_agent.run("Can I access customer PII?", role=profile.role) → requires_approval=True'] 
    },
    { 
      id: 'skill-growth-agent', 
      title: 'Skill Growth Specialist Agent', 
      category: 'architecture', 
      description: 'Learning paths, mentorship, career development', 
      details: 'Context Provider: Training catalog, career ladders, skill assessments. Recommends courses, connects mentors.', 
      considerations: ['Skill gaps', 'Learning styles', 'Resource availability'], 
      bestPractices: ['Personalized recommendations', 'Progress tracking', 'Mentor matching'], 
      patterns: ['contextual-onboarding-orchestrator'], 
      examples: ['skill_growth_agent.run("What should I learn next?", profile=profile)'] 
    },
    { 
      id: 'escalation', 
      title: 'Human Escalation', 
      category: 'architecture', 
      description: 'Trigger human approval for exceptions', 
      details: 'Escalation rules: policy_exception, high_privilege_request, unknown_policy, ambiguous_compliance. Routes to manager or HR lead.', 
      considerations: ['Escalation criteria', 'Approver routing', 'Response SLAs'], 
      bestPractices: ['Clear triggers', 'Context preservation', 'Notification system'], 
      patterns: ['contextual-onboarding-orchestrator'], 
      examples: ['if triggers_escalation: escalate_to(manager, context=conversation_summary)'] 
    }
  ],
  architecture: {
    components: [
      { name: 'Orchestrator', type: 'processing', description: 'Central coordinator managing conversation flow' },
      { name: 'Profile Store', type: 'storage', description: 'Persistent employee profiles (Redis/PostgreSQL)' },
      { name: 'Memory Manager', type: 'storage', description: 'Hybrid memory (summary + recent turns)' },
      { name: 'Context-Aware Router', type: 'processing', description: 'Routes questions to specialist agents' },
      { name: 'HR Agent', type: 'processing', description: 'Benefits, policies, leave, training (Context Provider)' },
      { name: 'DevOps Agent', type: 'processing', description: 'Technical setup, tools, infrastructure (Context Provider)' },
      { name: 'Compliance Agent', type: 'processing', description: 'Security, data policies, regulations (Context Provider)' },
      { name: 'Skill Growth Agent', type: 'processing', description: 'Learning paths, mentorship, career (Context Provider)' },
      { name: 'Escalation Handler', type: 'processing', description: 'Human approver routing' },
      { name: 'Conversation Logger', type: 'storage', description: 'Audit trail (append-only log)' }
    ],
    flows: [
      { from: 'Orchestrator', to: 'Profile Store', description: 'Load/update employee profile' },
      { from: 'Orchestrator', to: 'Memory Manager', description: 'Retrieve conversation context' },
      { from: 'Orchestrator', to: 'Context-Aware Router', description: 'Question + profile' },
      { from: 'Context-Aware Router', to: 'HR Agent', description: 'HR-related questions' },
      { from: 'Context-Aware Router', to: 'DevOps Agent', description: 'Technical questions' },
      { from: 'Context-Aware Router', to: 'Compliance Agent', description: 'Compliance questions' },
      { from: 'Context-Aware Router', to: 'Skill Growth Agent', description: 'Learning questions' },
      { from: 'HR Agent', to: 'Orchestrator', description: 'Response' },
      { from: 'DevOps Agent', to: 'Orchestrator', description: 'Response' },
      { from: 'Compliance Agent', to: 'Escalation Handler', description: 'Exception detected' },
      { from: 'Skill Growth Agent', to: 'Orchestrator', description: 'Response' },
      { from: 'Escalation Handler', to: 'Orchestrator', description: 'Approval status' },
      { from: 'Orchestrator', to: 'Memory Manager', description: 'Store turn' },
      { from: 'Orchestrator', to: 'Conversation Logger', description: 'Audit log' }
    ]
  }
};
