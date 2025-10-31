import { PatternData } from './types';

export const humanRobotCollaborationPattern: PatternData = {
  id: 'human-robot-collaboration',
  name: 'Human-Robot Collaboration Orchestrator',
  description: 'Mixed-initiative control system enabling seamless handoff between autonomous robot operation and human teleoperation with natural language supervision.',
  category: 'Advanced',
  useCases: [
    'Surgical assistance robots with surgeon override controls',
    'Elder care robots for activities of daily living support',
    'Collaborative assembly in manufacturing (human-robot teams)',
    'Search and rescue robots with remote operator guidance',
    'Precision agriculture with human-in-the-loop decision points'
  ],
  whenToUse: 'Adopt when tasks require both robot precision/endurance and human judgment/dexterity, safety demands human oversight, or regulatory compliance requires human-in-the-loop controls.',
  businessUseCase: {
    industry: 'Healthcare & Elder Care',
    description: 'An assisted living facility deploys care robots that help residents with mobility, medication reminders, and social engagement. The robot autonomously navigates, fetches items, and monitors vital signs, but hands off to human caregivers for medication administration, fall response, and emotional support conversations. Natural language allows residents and staff to command the robot, query its status, and override autonomy when needed.',
    visualization: () => null as any,
    enlightenMePrompt: `
Design a human-robot collaboration system for elder care assistance.

Provide:
- Autonomy levels: fully autonomous navigation, semi-autonomous object fetching, human-supervised medication handoff.
- Handoff triggers: when robot encounters uncertainty (ambiguous object, blocked path), detects anomaly (vital signs), or receives override command.
- Natural language interface: residents give voice commands, caregivers query robot status, admins set behavioral policies.
- Safety architecture: proximity sensors pause motion near humans, force-limited actuators, emergency stop integration.
- Teleoperation console: caregiver dashboard with live video, robot state, take-over controls, incident logs.
- Privacy & compliance: HIPAA-compliant logging, data retention policies, resident consent management.
- Success metrics: resident satisfaction, caregiver workload reduction, autonomy ratio (autonomous vs teleoperated time).
`
  },
  nodes: [
    {
      id: 'task-request',
      type: 'input',
      data: { label: 'Task Request', nodeType: 'input', description: 'Voice/text from resident or caregiver' },
      position: { x: 100, y: 240 }
    },
    {
      id: 'intent-classifier',
      type: 'default',
      data: { label: 'Intent Classifier', nodeType: 'llm', description: 'LLM parses request & determines autonomy level' },
      position: { x: 320, y: 240 }
    },
    {
      id: 'autonomous-planner',
      type: 'default',
      data: { label: 'Autonomous Planner', nodeType: 'planner', description: 'Full autonomy: navigation, object fetch, monitoring' },
      position: { x: 540, y: 140 }
    },
    {
      id: 'shared-autonomy',
      type: 'default',
      data: { label: 'Shared Autonomy', nodeType: 'planner', description: 'Mixed initiative: robot suggests, human confirms' },
      position: { x: 540, y: 280 }
    },
    {
      id: 'teleoperation',
      type: 'default',
      data: { label: 'Teleoperation Mode', nodeType: 'executor', description: 'Human direct control via console' },
      position: { x: 540, y: 420 }
    },
    {
      id: 'handoff-detector',
      type: 'default',
      data: { label: 'Handoff Detector', nodeType: 'evaluator', description: 'Monitors uncertainty, anomalies, overrides' },
      position: { x: 760, y: 280 }
    },
    {
      id: 'safety-monitor',
      type: 'default',
      data: { label: 'Safety Monitor', nodeType: 'evaluator', description: 'Proximity sensors, force limits, e-stop' },
      position: { x: 760, y: 420 }
    },
    {
      id: 'execution-controller',
      type: 'default',
      data: { label: 'Execution Controller', nodeType: 'executor', description: 'Actuates robot based on current mode' },
      position: { x: 980, y: 280 }
    },
    {
      id: 'status-narrator',
      type: 'default',
      data: { label: 'Status Narrator', nodeType: 'aggregator', description: 'Natural language updates to user & logs' },
      position: { x: 1200, y: 280 }
    },
    {
      id: 'task-outcome',
      type: 'output',
      data: { label: 'Task Complete', nodeType: 'output', description: 'Success confirmation + telemetry' },
      position: { x: 1400, y: 280 }
    }
  ],
  edges: [
    { id: 'edge-request-intent', source: 'task-request', target: 'intent-classifier', animated: true },
    { id: 'edge-intent-autonomous', source: 'intent-classifier', target: 'autonomous-planner', animated: true, label: 'Full autonomy' },
    { id: 'edge-intent-shared', source: 'intent-classifier', target: 'shared-autonomy', animated: true, label: 'Shared' },
    { id: 'edge-intent-teleop', source: 'intent-classifier', target: 'teleoperation', animated: true, label: 'Override' },
    { id: 'edge-autonomous-handoff', source: 'autonomous-planner', target: 'handoff-detector', animated: true },
    { id: 'edge-shared-handoff', source: 'shared-autonomy', target: 'handoff-detector', animated: true },
    { id: 'edge-teleop-handoff', source: 'teleoperation', target: 'handoff-detector', animated: true },
    { id: 'edge-handoff-autonomous', source: 'handoff-detector', target: 'autonomous-planner', animated: true, label: 'Resume auto', style: { strokeDasharray: '5,5' } },
    { id: 'edge-handoff-shared', source: 'handoff-detector', target: 'shared-autonomy', animated: true, label: 'Escalate', style: { strokeDasharray: '5,5' } },
    { id: 'edge-handoff-exec', source: 'handoff-detector', target: 'execution-controller', animated: true },
    { id: 'edge-safety-exec', source: 'safety-monitor', target: 'execution-controller', animated: true, label: 'Halt if unsafe' },
    { id: 'edge-exec-status', source: 'execution-controller', target: 'status-narrator', animated: true },
    { id: 'edge-status-outcome', source: 'status-narrator', target: 'task-outcome', animated: true },
    { id: 'edge-exec-safety', source: 'execution-controller', target: 'safety-monitor', animated: true, label: 'Telemetry' }
  ],
  codeExample: `# Python: Human-robot collaboration with mixed initiative
from enum import Enum
from dataclasses import dataclass

class AutonomyLevel(Enum):
    FULL_AUTONOMOUS = "full"      # Robot acts independently
    SHARED_AUTONOMY = "shared"    # Robot suggests, human confirms
    TELEOPERATION = "teleop"      # Human direct control

@dataclass
class HandoffTrigger:
    reason: str
    confidence: float
    suggested_mode: AutonomyLevel
    human_required: bool

class HumanRobotCollaborator:
    def __init__(self):
        self.current_mode = AutonomyLevel.FULL_AUTONOMOUS
        self.llm = GeminiModel("gemini-1.5-pro")
        self.robot = RobotController()
        self.caregiver_console = TeleoperationConsole()
        
    async def execute_task(self, request: VoiceCommand):
        # Parse natural language intent
        intent = await self.llm.classify_intent(request.text)
        
        # Determine initial autonomy level
        if intent.requires_human_judgment:
            self.current_mode = AutonomyLevel.SHARED_AUTONOMY
        elif intent.is_safety_critical:
            self.current_mode = AutonomyLevel.TELEOPERATION
            await self.notify_caregiver("Manual intervention required")
        else:
            self.current_mode = AutonomyLevel.FULL_AUTONOMOUS
        
        # Execute with continuous handoff monitoring
        while not task_complete:
            if self.current_mode == AutonomyLevel.FULL_AUTONOMOUS:
                action = await self.autonomous_planner.next_action()
                
                # Check if handoff needed
                handoff = await self.detect_handoff_need(action)
                if handoff.human_required:
                    await self.transition_to_mode(handoff.suggested_mode)
                    continue
                    
                await self.robot.execute(action)
                
            elif self.current_mode == AutonomyLevel.SHARED_AUTONOMY:
                suggestion = await self.autonomous_planner.suggest_action()
                
                # Request human confirmation
                approval = await self.request_human_approval(
                    suggestion,
                    explanation=await self.llm.explain_rationale(suggestion)
                )
                
                if approval.confirmed:
                    await self.robot.execute(suggestion)
                else:
                    # Fall back to teleoperation
                    await self.transition_to_mode(AutonomyLevel.TELEOPERATION)
                    
            elif self.current_mode == AutonomyLevel.TELEOPERATION:
                # Human drives robot via console
                teleop_cmd = await self.caregiver_console.get_command()
                await self.robot.execute(teleop_cmd)
                
                # Check if human released control
                if teleop_cmd.release_control:
                    await self.transition_to_mode(AutonomyLevel.FULL_AUTONOMOUS)
            
            # Safety monitor always active
            if not await self.safety_check():
                await self.robot.emergency_stop()
                await self.notify_caregiver("Safety violation - robot halted")
                
            # Natural language status update
            await self.narrate_status(
                f"Currently in {self.current_mode.value} mode. "
                f"Task progress: {self.calculate_progress()}"
            )
    
    async def detect_handoff_need(self, action) -> HandoffTrigger:
        """Detect if human intervention needed"""
        # Check uncertainty
        if action.confidence < 0.7:
            return HandoffTrigger(
                reason="Low confidence prediction",
                confidence=action.confidence,
                suggested_mode=AutonomyLevel.SHARED_AUTONOMY,
                human_required=True
            )
        
        # Check for anomalies
        vital_signs = await self.robot.sensors.get_vital_signs()
        if self.is_anomaly(vital_signs):
            return HandoffTrigger(
                reason="Abnormal vital signs detected",
                confidence=1.0,
                suggested_mode=AutonomyLevel.TELEOPERATION,
                human_required=True
            )
        
        # Check for obstacles
        if self.robot.sensors.detect_blocked_path():
            return HandoffTrigger(
                reason="Path blocked - need reroute decision",
                confidence=0.9,
                suggested_mode=AutonomyLevel.SHARED_AUTONOMY,
                human_required=False
            )
        
        return HandoffTrigger(
            reason="No handoff needed",
            confidence=1.0,
            suggested_mode=self.current_mode,
            human_required=False
        )

# TypeScript: Teleoperation console UI
interface TeleopCommand {
  type: 'move' | 'grasp' | 'release_control' | 'emergency_stop';
  params: Record<string, any>;
  releaseControl: boolean;
}

export class CaregiverConsole {
  private ws: WebSocket;
  private videoStream: MediaStream;
  
  async initialize() {
    // Connect to robot telemetry stream
    this.ws = new WebSocket('wss://robot.care-facility.com/teleop');
    this.videoStream = await this.connectCameraFeed();
    
    // UI event handlers
    document.getElementById('take-control')?.addEventListener('click', () => {
      this.requestTeleoperationMode();
    });
    
    document.getElementById('approve-suggestion')?.addEventListener('click', () => {
      this.approveSharedAutonomyAction();
    });
    
    document.getElementById('e-stop')?.addEventListener('click', () => {
      this.sendEmergencyStop();
    });
  }
  
  async requestTeleoperationMode() {
    await this.ws.send(JSON.stringify({
      command: 'set_autonomy_level',
      level: 'teleoperation',
      operator_id: this.getCurrentUserId()
    }));
    
    // Enable joystick controls
    this.enableManualControl();
  }
  
  private enableManualControl() {
    // Gamepad API for joystick control
    const gamepad = navigator.getGamepads()[0];
    setInterval(() => {
      if (gamepad) {
        this.ws.send(JSON.stringify({
          command: 'teleop_velocity',
          linear: { x: gamepad.axes[0], y: gamepad.axes[1] },
          angular: gamepad.axes[2]
        }));
      }
    }, 50); // 20Hz control
  }
}`,
  pythonCodeExample: `# Complete implementation with ROS2 and natural language interface
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import String
import google.generativeai as genai

class HumanRobotCollaborationNode(Node):
    def __init__(self):
        super().__init__('human_robot_collaboration')
        
        # Publishers
        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.status_pub = self.create_publisher(String, '/robot_status', 10)
        
        # Subscribers
        self.voice_sub = self.create_subscription(
            String, '/voice_command', self.voice_callback, 10)
        self.teleop_sub = self.create_subscription(
            Twist, '/teleop_cmd', self.teleop_callback, 10)
        self.vital_signs_sub = self.create_subscription(
            VitalSigns, '/vital_signs', self.vital_signs_callback, 10)
        
        # Gemini LLM
        self.llm = genai.GenerativeModel('gemini-1.5-pro')
        
        # State
        self.autonomy_level = AutonomyLevel.FULL_AUTONOMOUS
        self.current_task = None
        self.handoff_history = []
        
    async def voice_callback(self, msg: String):
        """Process natural language command"""
        # LLM intent classification
        prompt = f"""
        Parse this care robot command: "{msg.data}"
        
        Respond with JSON:
        {{
          "intent": "fetch_item" | "monitor_vitals" | "call_caregiver" | "emergency",
          "parameters": {{}},
          "autonomy_required": "full" | "shared" | "teleop",
          "reasoning": "..."
        }}
        """
        
        response = await self.llm.generate_content(prompt)
        intent = parse_json(response.text)
        
        # Set autonomy level
        if intent['autonomy_required'] == 'full':
            self.autonomy_level = AutonomyLevel.FULL_AUTONOMOUS
            await self.execute_autonomous(intent)
        elif intent['autonomy_required'] == 'shared':
            self.autonomy_level = AutonomyLevel.SHARED_AUTONOMY
            await self.execute_shared_autonomy(intent)
        else:
            await self.request_caregiver_takeover(intent)
    
    async def execute_autonomous(self, intent):
        """Full autonomy - robot decides and acts"""
        while not self.task_complete():
            action = await self.plan_next_action()
            
            # Check handoff triggers
            if action.confidence < 0.7 or self.detect_anomaly():
                await self.escalate_to_shared_autonomy()
                return
            
            await self.execute_action(action)
            await self.narrate_status(f"Executing: {action.description}")
    
    async def execute_shared_autonomy(self, intent):
        """Shared control - robot suggests, human confirms"""
        suggestion = await self.plan_next_action()
        
        # Generate natural language explanation
        explanation = await self.llm.generate_content(
            f"Explain why I recommend this action: {suggestion}"
        )
        
        # Request approval
        approval = await self.request_approval_from_caregiver({
            'suggestion': suggestion.description,
            'explanation': explanation.text,
            'confidence': suggestion.confidence
        })
        
        if approval:
            await self.execute_action(suggestion)
        else:
            await self.escalate_to_teleoperation()
    
    async def narrate_status(self, message: str):
        """Natural language status broadcast"""
        self.status_pub.publish(String(data=message))
        
        # Also synthesize speech for resident
        await self.text_to_speech(message)`,
  implementation: [
    'Define autonomy levels: full autonomous, shared autonomy (robot suggests/human confirms), teleoperation (human direct control).',
    'Implement handoff triggers: confidence thresholds (<0.7), anomaly detection (vital signs, obstacles), explicit override commands.',
    'Build natural language interface: voice recognition (Google Speech-to-Text), LLM intent parsing (Gemini), TTS status narration.',
    'Create teleoperation console: live video feed, robot state dashboard, gamepad/joystick controls, approval/override buttons.',
    'Add safety monitoring: proximity sensors pause near humans, force-limited actuators, emergency stop integration, workspace geofencing.',
    'Log handoff events: autonomy transitions, operator interventions, failure modes for continuous improvement.',
    'Ensure privacy/compliance: HIPAA-compliant logging, data retention policies, resident consent management.'
  ],
  advantages: [
    'Blends robot precision/endurance with human judgment/empathy for complex care tasks.',
    'Natural language interface accessible to non-technical residents and caregivers.',
    'Graceful degradation: robot escalates to human when uncertain rather than failing silently.',
    'Builds trust through transparency - robot explains reasoning before acting.',
    'Reduces caregiver workload while maintaining human oversight for safety-critical decisions.'
  ],
  limitations: [
    'Requires robust voice recognition in noisy environments - may need close-talk mic or noise cancellation.',
    'LLM latency (100-300ms) for intent parsing and explanation generation.',
    'Caregiver availability needed for shared autonomy and teleoperation escalation.',
    'Handoff logic tuning required - overly conservative triggers reduce autonomy ratio.',
    'Regulatory compliance complexity - medical device classification may apply depending on use case.'
  ],
  relatedPatterns: [
    'embodied-perception-action',
    'mobile-manipulator-steward',
    'voice-agent',
    'agent-ops'
  ],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '3-5 weeks',
    complexityReduction: 'Medium - Requires integration of autonomous control, teleoperation, and mode transition logic, but uses established ROS2 patterns',
    reusabilityScore: 8,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Core pattern for healthcare, surgery, elder care, collaborative manufacturing, search & rescue',
      'Architecture Templates - ROS2 + Gemini + WebRTC teleoperation console is reusable across care robot platforms',
      'Incremental Delivery - Start teleoperation-only, add shared autonomy, finally enable full autonomy with handoff',
      'Failure Scenario Libraries - Voice recognition errors, LLM misclassification, network latency, handoff false positives',
      'Operational Instrumentation - Track autonomy ratio (% time in each mode), handoff frequency, caregiver response time'
    ]
  },

  evaluation: 'Measure autonomy ratio (autonomous vs shared vs teleop time), handoff trigger accuracy, caregiver response time, resident satisfaction, and safety incident rate.',
  
  evaluationProfile: {
    scenarioFocus: 'Mixed-initiative control with seamless human-robot handoff',
    criticalMetrics: [
      'Autonomy ratio: % time in full autonomous mode',
      'Handoff accuracy: false positive/negative rates',
      'Caregiver response time to escalation requests',
      'Resident satisfaction (survey scores)',
      'Safety incident rate (collisions, falls, medication errors)',
      'Task completion time vs fully manual baseline',
      'Voice command recognition accuracy'
    ],
    evaluationNotes: [
      'Target >70% autonomy ratio for efficiency while maintaining human oversight',
      'Track handoff false positives (unnecessary escalation) - tune confidence thresholds',
      'Log handoff triggers to identify patterns - some tasks may always require shared autonomy',
      'Monitor caregiver workload - ensure system reduces burden rather than adding alerts'
    ],
    cohort: 'communication-interface',
    readinessSignals: [
      'Tasks require both robot precision and human judgment (e.g., medication handoff)',
      'Safety/compliance demands human-in-the-loop controls',
      'Users need to understand and trust robot decisions (transparency critical)',
      'Caregiver availability for escalation within 1-2 minutes'
    ],
    dataNeeds: [
      'Baseline metrics: caregiver time per task, resident wait times, manual error rates',
      'Voice command dataset for intent classification training',
      'Handoff trigger thresholds from pilot testing',
      'Regulatory requirements (medical device classification, HIPAA, resident consent forms)'
    ]
  }
};
