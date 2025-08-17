/**
 * Implementation Roadmap Exporter
 * Converts SCL analysis results into actionable implementation roadmaps
 */

import { SCLEffect } from '../components/SuperCriticalLearning/SCLGraph';
import { Solution } from './constraint-solver';

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  effort: 'small' | 'medium' | 'large' | 'extra-large';
  duration: string; // e.g., "2 weeks", "1 month"
  dependencies: string[];
  assignedTo?: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  dueDate?: string;
  tags: string[];
  acceptanceCriteria: string[];
  risks: string[];
  resources: string[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  tasks: string[];
  successMetrics: string[];
  dependencies: string[];
}

export interface ImplementationRoadmap {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  lastUpdated: string;
  timeline: {
    startDate: string;
    endDate: string;
    phases: Array<{
      name: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
  };
  tasks: RoadmapTask[];
  milestones: RoadmapMilestone[];
  risks: Array<{
    id: string;
    description: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
    probability: number;
    mitigation: string;
  }>;
  resources: Array<{
    type: 'human' | 'financial' | 'technical' | 'infrastructure';
    description: string;
    quantity: number;
    unit: string;
    timeline: string;
  }>;
  successMetrics: Array<{
    name: string;
    description: string;
    target: string;
    measurement: string;
  }>;
  stakeholders: Array<{
    name: string;
    role: string;
    responsibilities: string[];
    contactInfo?: string;
  }>;
}

export interface ExportConfig {
  format: 'json' | 'markdown' | 'gantt' | 'jira' | 'asana' | 'excel';
  includeDetails: boolean;
  groupBy: 'priority' | 'phase' | 'assignee' | 'timeline';
  timeframe: {
    start: string;
    end: string;
  };
  filters?: {
    priorities?: RoadmapTask['priority'][];
    statuses?: RoadmapTask['status'][];
    tags?: string[];
  };
}

export class RoadmapExporter {
  private effects: SCLEffect[];
  private constraints?: Solution;

  constructor(effects: SCLEffect[], constraints?: Solution) {
    this.effects = effects;
    this.constraints = constraints;
  }

  // Generate implementation roadmap from SCL analysis
  generateRoadmap(config?: Partial<ExportConfig>): ImplementationRoadmap {
    const roadmapId = `roadmap-${Date.now()}`;
    const createdAt = new Date().toISOString();

    // Extract tasks from effects
    const tasks = this.generateTasksFromEffects();
    
    // Create milestones
    const milestones = this.generateMilestones(tasks);
    
    // Calculate timeline
    const timeline = this.calculateTimeline(tasks, milestones);
    
    // Extract risks and resources
    const risks = this.extractRisks();
    const resources = this.estimateResources(tasks);
    
    // Define success metrics
    const successMetrics = this.defineSuccessMetrics();
    
    // Identify stakeholders
    const stakeholders = this.identifyStakeholders(tasks);

    return {
      id: roadmapId,
      title: `Implementation Roadmap - ${new Date().toLocaleDateString()}`,
      description: 'Actionable implementation plan derived from SuperCriticalLearning analysis',
      createdAt,
      lastUpdated: createdAt,
      timeline,
      tasks,
      milestones,
      risks,
      resources,
      successMetrics,
      stakeholders,
    };
  }

  // Export roadmap in specified format
  exportRoadmap(roadmap: ImplementationRoadmap, config: ExportConfig): string {
    switch (config.format) {
      case 'json':
        return this.exportAsJSON(roadmap, config);
      case 'markdown':
        return this.exportAsMarkdown(roadmap, config);
      case 'gantt':
        return this.exportAsGantt(roadmap, config);
      case 'jira':
        return this.exportAsJira(roadmap, config);
      case 'asana':
        return this.exportAsAsana(roadmap, config);
      case 'excel':
        return this.exportAsExcel(roadmap, config);
      default:
        throw new Error(`Unsupported export format: ${config.format}`);
    }
  }

  // Generate tasks from SCL effects
  private generateTasksFromEffects(): RoadmapTask[] {
    const tasks: RoadmapTask[] = [];

    this.effects.forEach((effect, index) => {
      // Create implementation task for each effect
      const task = this.createTaskFromEffect(effect, index);
      tasks.push(task);

      // Create validation task
      const validationTask = this.createValidationTask(effect, index);
      tasks.push(validationTask);

      // Create monitoring task for higher-order effects
      if (effect.type === 'higher-order' || effect.type === 'synthesis') {
        const monitoringTask = this.createMonitoringTask(effect, index);
        tasks.push(monitoringTask);
      }
    });

    return tasks;
  }

  private createTaskFromEffect(effect: SCLEffect, index: number): RoadmapTask {
    const priority = this.getPriorityFromConfidence(effect.confidence);
    const effort = this.getEffortFromComplexity(effect);
    const duration = this.getDurationFromEffort(effort);

    return {
      id: `task-implement-${effect.id}`,
      title: `Implement: ${effect.text.substring(0, 50)}...`,
      description: `Implementation of effect: ${effect.text}`,
      priority,
      effort,
      duration,
      dependencies: this.calculateDependencies(effect, index),
      status: 'not-started',
      tags: [effect.type, effect.category || 'general'],
      acceptanceCriteria: this.generateAcceptanceCriteria(effect),
      risks: this.identifyTaskRisks(effect),
      resources: this.identifyTaskResources(effect),
    };
  }

  private createValidationTask(effect: SCLEffect, index: number): RoadmapTask {
    return {
      id: `task-validate-${effect.id}`,
      title: `Validate: ${effect.text.substring(0, 50)}...`,
      description: `Validation and testing of implemented effect: ${effect.text}`,
      priority: this.getPriorityFromConfidence(effect.confidence),
      effort: 'small',
      duration: '1 week',
      dependencies: [`task-implement-${effect.id}`],
      status: 'not-started',
      tags: ['validation', effect.type],
      acceptanceCriteria: [
        'Effect implementation verified',
        'Success metrics defined and measured',
        'Stakeholder acceptance confirmed',
      ],
      risks: ['Implementation may not achieve expected effect'],
      resources: ['QA team', 'Test environment'],
    };
  }

  private createMonitoringTask(effect: SCLEffect, index: number): RoadmapTask {
    return {
      id: `task-monitor-${effect.id}`,
      title: `Monitor: ${effect.text.substring(0, 50)}...`,
      description: `Ongoing monitoring of effect: ${effect.text}`,
      priority: 'medium',
      effort: 'small',
      duration: 'ongoing',
      dependencies: [`task-validate-${effect.id}`],
      status: 'not-started',
      tags: ['monitoring', effect.type],
      acceptanceCriteria: [
        'Monitoring system in place',
        'Regular reports generated',
        'Thresholds and alerts configured',
      ],
      risks: ['Effects may diminish over time', 'Unexpected side effects'],
      resources: ['Monitoring tools', 'Analytics team'],
    };
  }

  // Generate milestones
  private generateMilestones(tasks: RoadmapTask[]): RoadmapMilestone[] {
    const milestones: RoadmapMilestone[] = [];

    // Phase 1: Foundation
    milestones.push({
      id: 'milestone-foundation',
      title: 'Foundation Phase Complete',
      description: 'All first-order effects implemented and validated',
      targetDate: this.calculateMilestoneDate(tasks.filter(t => t.tags.includes('first-order'))),
      tasks: tasks.filter(t => t.tags.includes('first-order')).map(t => t.id),
      successMetrics: [
        'All first-order effects operational',
        'Initial metrics baseline established',
        'Team trained and processes documented',
      ],
      dependencies: [],
    });

    // Phase 2: Expansion
    milestones.push({
      id: 'milestone-expansion',
      title: 'Expansion Phase Complete',
      description: 'Higher-order effects implemented with monitoring',
      targetDate: this.calculateMilestoneDate(tasks.filter(t => t.tags.includes('higher-order'))),
      tasks: tasks.filter(t => t.tags.includes('higher-order')).map(t => t.id),
      successMetrics: [
        'Higher-order effects measurable',
        'Compound benefits realized',
        'Risk mitigation strategies effective',
      ],
      dependencies: ['milestone-foundation'],
    });

    // Phase 3: Optimization
    milestones.push({
      id: 'milestone-optimization',
      title: 'Optimization Phase Complete',
      description: 'Synthesis effects achieved and system optimized',
      targetDate: this.calculateMilestoneDate(tasks.filter(t => t.tags.includes('synthesis'))),
      tasks: tasks.filter(t => t.tags.includes('synthesis')).map(t => t.id),
      successMetrics: [
        'Synthesis effects fully realized',
        'System performance optimized',
        'Long-term sustainability achieved',
      ],
      dependencies: ['milestone-expansion'],
    });

    return milestones;
  }

  // Helper methods for task generation
  private getPriorityFromConfidence(confidence: number): RoadmapTask['priority'] {
    if (confidence >= 0.8) return 'critical';
    if (confidence >= 0.6) return 'high';
    if (confidence >= 0.4) return 'medium';
    return 'low';
  }

  private getEffortFromComplexity(effect: SCLEffect): RoadmapTask['effort'] {
    const textLength = effect.text.length;
    const hasConstraints = effect.constraints && effect.constraints.length > 0;
    const isHighOrder = effect.type === 'higher-order' || effect.type === 'synthesis';

    if (isHighOrder || hasConstraints || textLength > 200) return 'extra-large';
    if (textLength > 150) return 'large';
    if (textLength > 100) return 'medium';
    return 'small';
  }

  private getDurationFromEffort(effort: RoadmapTask['effort']): string {
    const durations: Record<RoadmapTask['effort'], string> = {
      'small': '1-2 weeks',
      'medium': '3-4 weeks',
      'large': '2-3 months',
      'extra-large': '3-6 months',
    };
    return durations[effort];
  }

  private calculateDependencies(effect: SCLEffect, index: number): string[] {
    const dependencies: string[] = [];
    
    // First-order effects have no dependencies
    if (effect.type === 'first-order') return dependencies;
    
    // Higher-order effects depend on first-order
    if (effect.type === 'higher-order') {
      const firstOrderTasks = this.effects
        .filter(e => e.type === 'first-order')
        .map(e => `task-implement-${e.id}`);
      dependencies.push(...firstOrderTasks.slice(0, Math.min(2, firstOrderTasks.length)));
    }
    
    // Synthesis effects depend on higher-order
    if (effect.type === 'synthesis') {
      const higherOrderTasks = this.effects
        .filter(e => e.type === 'higher-order')
        .map(e => `task-implement-${e.id}`);
      dependencies.push(...higherOrderTasks);
    }
    
    return dependencies;
  }

  private generateAcceptanceCriteria(effect: SCLEffect): string[] {
    const criteria = [
      `Effect "${effect.text}" is measurably implemented`,
      `Implementation meets or exceeds ${Math.round(effect.confidence * 100)}% confidence threshold`,
    ];

    if (effect.category) {
      criteria.push(`${effect.category} domain metrics show positive impact`);
    }

    if (effect.constraints && effect.constraints.length > 0) {
      criteria.push('All specified constraints are satisfied');
    }

    return criteria;
  }

  private identifyTaskRisks(effect: SCLEffect): string[] {
    const risks = ['Implementation complexity higher than estimated'];
    
    if (effect.confidence < 0.5) {
      risks.push('Low confidence may indicate uncertain outcomes');
    }
    
    if (effect.type === 'higher-order') {
      risks.push('Dependent on successful first-order implementations');
    }
    
    if (effect.type === 'synthesis') {
      risks.push('Complex interactions may produce unexpected results');
    }
    
    return risks;
  }

  private identifyTaskResources(effect: SCLEffect): string[] {
    const resources = ['Development team', 'Project management'];
    
    if (effect.category) {
      resources.push(`${effect.category} domain expertise`);
    }
    
    if (effect.type === 'synthesis') {
      resources.push('Cross-functional coordination');
    }
    
    return resources;
  }

  // Export format implementations
  private exportAsJSON(roadmap: ImplementationRoadmap, config: ExportConfig): string {
    return JSON.stringify(roadmap, null, 2);
  }

  private exportAsMarkdown(roadmap: ImplementationRoadmap, config: ExportConfig): string {
    let markdown = `# ${roadmap.title}\n\n`;
    markdown += `${roadmap.description}\n\n`;
    markdown += `**Created:** ${new Date(roadmap.createdAt).toLocaleDateString()}\n\n`;

    // Timeline
    markdown += `## Timeline\n\n`;
    markdown += `**Start Date:** ${roadmap.timeline.startDate}\n`;
    markdown += `**End Date:** ${roadmap.timeline.endDate}\n\n`;

    // Phases
    markdown += `### Phases\n\n`;
    roadmap.timeline.phases.forEach(phase => {
      markdown += `- **${phase.name}** (${phase.startDate} - ${phase.endDate}): ${phase.description}\n`;
    });
    markdown += '\n';

    // Milestones
    markdown += `## Milestones\n\n`;
    roadmap.milestones.forEach(milestone => {
      markdown += `### ${milestone.title}\n`;
      markdown += `**Target Date:** ${milestone.targetDate}\n`;
      markdown += `${milestone.description}\n\n`;
      
      markdown += `**Success Metrics:**\n`;
      milestone.successMetrics.forEach(metric => {
        markdown += `- ${metric}\n`;
      });
      markdown += '\n';
    });

    // Tasks
    markdown += `## Tasks\n\n`;
    
    // Group tasks by priority if specified
    if (config.groupBy === 'priority') {
      const priorities: RoadmapTask['priority'][] = ['critical', 'high', 'medium', 'low'];
      priorities.forEach(priority => {
        const priorityTasks = roadmap.tasks.filter(t => t.priority === priority);
        if (priorityTasks.length > 0) {
          markdown += `### ${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority\n\n`;
          priorityTasks.forEach(task => {
            markdown += this.formatTaskMarkdown(task);
          });
        }
      });
    } else {
      roadmap.tasks.forEach(task => {
        markdown += this.formatTaskMarkdown(task);
      });
    }

    // Risks
    markdown += `## Risks\n\n`;
    roadmap.risks.forEach(risk => {
      markdown += `- **${risk.description}** (${risk.impact} impact, ${Math.round(risk.probability * 100)}% probability)\n`;
      markdown += `  - *Mitigation:* ${risk.mitigation}\n`;
    });

    return markdown;
  }

  private formatTaskMarkdown(task: RoadmapTask): string {
    let taskMd = `#### ${task.title}\n`;
    taskMd += `${task.description}\n\n`;
    taskMd += `**Priority:** ${task.priority} | **Effort:** ${task.effort} | **Duration:** ${task.duration}\n`;
    
    if (task.dependencies.length > 0) {
      taskMd += `**Dependencies:** ${task.dependencies.join(', ')}\n`;
    }
    
    taskMd += `**Acceptance Criteria:**\n`;
    task.acceptanceCriteria.forEach(criteria => {
      taskMd += `- ${criteria}\n`;
    });
    
    taskMd += '\n';
    return taskMd;
  }

  private exportAsGantt(roadmap: ImplementationRoadmap, config: ExportConfig): string {
    // Generate Gantt chart data in CSV format
    let gantt = 'Task,Start Date,End Date,Duration,Dependencies,Priority\n';
    
    roadmap.tasks.forEach(task => {
      const startDate = this.calculateTaskStartDate(task, roadmap);
      const endDate = this.calculateTaskEndDate(task, startDate);
      
      gantt += `"${task.title}","${startDate}","${endDate}","${task.duration}","${task.dependencies.join(';')}","${task.priority}"\n`;
    });
    
    return gantt;
  }

  private exportAsJira(roadmap: ImplementationRoadmap, config: ExportConfig): string {
    // Generate Jira import format (CSV)
    let jira = 'Summary,Issue Type,Priority,Description,Assignee,Components,Due Date\n';
    
    roadmap.tasks.forEach(task => {
      const issueType = task.effort === 'small' ? 'Task' : 'Story';
      const priority = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
      const description = task.description.replace(/"/g, '""');
      
      jira += `"${task.title}","${issueType}","${priority}","${description}","","Implementation",""\n`;
    });
    
    return jira;
  }

  private exportAsAsana(roadmap: ImplementationRoadmap, config: ExportConfig): string {
    // Generate Asana CSV import format
    let asana = 'Name,Notes,Assignee,Due Date,Priority,Tags\n';
    
    roadmap.tasks.forEach(task => {
      const notes = task.description.replace(/"/g, '""');
      const tags = task.tags.join(';');
      
      asana += `"${task.title}","${notes}","","","${task.priority}","${tags}"\n`;
    });
    
    return asana;
  }

  private exportAsExcel(roadmap: ImplementationRoadmap, config: ExportConfig): string {
    // Generate Excel-compatible CSV
    let excel = 'ID,Title,Description,Priority,Effort,Duration,Status,Dependencies,Tags\n';
    
    roadmap.tasks.forEach(task => {
      const description = task.description.replace(/"/g, '""');
      const dependencies = task.dependencies.join(';');
      const tags = task.tags.join(';');
      
      excel += `"${task.id}","${task.title}","${description}","${task.priority}","${task.effort}","${task.duration}","${task.status}","${dependencies}","${tags}"\n`;
    });
    
    return excel;
  }

  // Helper methods for timeline calculation
  private calculateTimeline(tasks: RoadmapTask[], milestones: RoadmapMilestone[]) {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 year from now
    
    return {
      startDate,
      endDate,
      phases: [
        {
          name: 'Foundation',
          startDate,
          endDate: milestones[0]?.targetDate || startDate,
          description: 'Implement and validate first-order effects',
        },
        {
          name: 'Expansion',
          startDate: milestones[0]?.targetDate || startDate,
          endDate: milestones[1]?.targetDate || endDate,
          description: 'Deploy higher-order effects and monitoring',
        },
        {
          name: 'Optimization',
          startDate: milestones[1]?.targetDate || endDate,
          endDate: milestones[2]?.targetDate || endDate,
          description: 'Achieve synthesis effects and optimize',
        },
      ],
    };
  }

  private calculateMilestoneDate(tasks: RoadmapTask[]): string {
    // Simplified calculation - in practice would consider dependencies and duration
    const baseDate = new Date();
    const daysToAdd = tasks.length * 30; // Assume 30 days per task on average
    baseDate.setDate(baseDate.getDate() + daysToAdd);
    return baseDate.toISOString().split('T')[0];
  }

  private calculateTaskStartDate(task: RoadmapTask, roadmap: ImplementationRoadmap): string {
    // Simplified - would calculate based on dependencies
    return roadmap.timeline.startDate;
  }

  private calculateTaskEndDate(task: RoadmapTask, startDate: string): string {
    const start = new Date(startDate);
    const durationMap: Record<string, number> = {
      '1 week': 7,
      '1-2 weeks': 14,
      '2 weeks': 14,
      '3-4 weeks': 28,
      '1 month': 30,
      '2-3 months': 75,
      '3-6 months': 135,
      'ongoing': 365,
    };
    
    const days = durationMap[task.duration] || 30;
    start.setDate(start.getDate() + days);
    return start.toISOString().split('T')[0];
  }

  private extractRisks() {
    return [
      {
        id: 'complexity-risk',
        description: 'Implementation complexity exceeds estimates',
        impact: 'high' as const,
        probability: 0.3,
        mitigation: 'Break down complex tasks, add buffer time, regular reviews',
      },
      {
        id: 'dependency-risk',
        description: 'External dependencies cause delays',
        impact: 'medium' as const,
        probability: 0.4,
        mitigation: 'Identify dependencies early, establish SLAs, have backup plans',
      },
    ];
  }

  private estimateResources(tasks: RoadmapTask[]) {
    return [
      {
        type: 'human' as const,
        description: 'Development team',
        quantity: Math.ceil(tasks.length / 10),
        unit: 'developers',
        timeline: '6-12 months',
      },
      {
        type: 'financial' as const,
        description: 'Implementation budget',
        quantity: tasks.length * 50000,
        unit: 'USD',
        timeline: 'Project duration',
      },
    ];
  }

  private defineSuccessMetrics() {
    return [
      {
        name: 'Effect Implementation Rate',
        description: 'Percentage of effects successfully implemented',
        target: '95%',
        measurement: 'Weekly progress reports',
      },
      {
        name: 'Timeline Adherence',
        description: 'Percentage of tasks completed on schedule',
        target: '85%',
        measurement: 'Project management dashboard',
      },
    ];
  }

  private identifyStakeholders(tasks: RoadmapTask[]) {
    return [
      {
        name: 'Project Manager',
        role: 'Project Lead',
        responsibilities: ['Overall coordination', 'Timeline management', 'Stakeholder communication'],
      },
      {
        name: 'Development Team Lead',
        role: 'Technical Lead',
        responsibilities: ['Technical oversight', 'Code review', 'Architecture decisions'],
      },
    ];
  }
}

export default RoadmapExporter;
