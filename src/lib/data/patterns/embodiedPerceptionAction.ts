import { PatternData } from './types';

export const embodiedPerceptionActionPattern: PatternData = {
  id: 'embodied-perception-action',
  name: 'Embodied Perception-Action Loop',
  description: 'Multimodal sensor fusion with Gemini-powered reasoning and grounded actuation. Closes the sense-think-act loop for embodied AI agents with safety guardrails.',
  category: 'Advanced',
  useCases: [
    'Manufacturing quality inspection with robotic arm manipulation',
    'Agricultural robots for precision weeding and harvesting',
    'Household assistance robots for object manipulation',
    'Healthcare robots for patient monitoring and assistance',
    'Retail shelf-stocking and inventory management robots'
  ],
  whenToUse: 'Adopt when you need real-time sensorimotor control where perception directly informs action, safety is critical, and natural language supervision is valuable for operators.',
  businessUseCase: {
    industry: 'Manufacturing & Quality Control',
    description: 'A quality inspection cell uses embodied AI to detect defects on circuit boards, classify anomalies, and decide whether to rework, scrap, or pass each unit. Gemini vision-language models analyze camera feeds and thermal images, reason about defect severity, and generate manipulation commands for a robotic arm to bin parts appropriately. Operators receive natural-language summaries and can override decisions in real-time.',
    visualization: () => null as any,
    enlightenMePrompt: `
Design the technical architecture for an embodied perception-action system in manufacturing QA.

Provide:
- Sensor suite: cameras (RGB, thermal, depth), force/torque sensors, microphones for anomaly sounds.
- Perception pipeline: Gemini multimodal for visual QA, defect classification, and scene understanding.
- Reasoning layer: LLM-based decision engine with tool calling for measurement verification and binning logic.
- Actuation stack: ROS2 MoveIt for arm trajectories, gripper control, and safety zone enforcement.
- Safety guardrails: Gemini Guard policies, torque limits, collision detection, e-stop integration.
- Human-in-the-loop: Operator console for live video feed, LLM reasoning explanations, and override commands.
- Metrics dashboard: Defect detection accuracy, false positive rate, cycle time, operator intervention frequency.
`
  },
  nodes: [
    {
      id: 'sensor-suite',
      type: 'input',
      data: { label: 'Sensor Suite', nodeType: 'input', description: 'RGB, depth, thermal cameras + force sensors' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'perception-fusion',
      type: 'default',
      data: { label: 'Perception Fusion', nodeType: 'llm', description: 'Gemini multimodal processes sensor streams' },
      position: { x: 320, y: 200 }
    },
    {
      id: 'scene-understanding',
      type: 'default',
      data: { label: 'Scene Understanding', nodeType: 'llm', description: 'Object detection, pose estimation, anomaly detection' },
      position: { x: 540, y: 140 }
    },
    {
      id: 'reasoning-engine',
      type: 'default',
      data: { label: 'Reasoning Engine', nodeType: 'planner', description: 'LLM decides action based on perception + policy' },
      position: { x: 540, y: 280 }
    },
    {
      id: 'action-planner',
      type: 'default',
      data: { label: 'Action Planner', nodeType: 'planner', description: 'Generates manipulation waypoints and gripper commands' },
      position: { x: 760, y: 200 }
    },
    {
      id: 'safety-validator',
      type: 'default',
      data: { label: 'Safety Validator', nodeType: 'evaluator', description: 'Checks torque limits, collision zones, policy gates' },
      position: { x: 760, y: 340 }
    },
    {
      id: 'actuator-controller',
      type: 'default',
      data: { label: 'Actuator Controller', nodeType: 'executor', description: 'ROS2 MoveIt + gripper control' },
      position: { x: 980, y: 200 }
    },
    {
      id: 'feedback-loop',
      type: 'default',
      data: { label: 'Feedback Loop', nodeType: 'aggregator', description: 'Telemetry, status updates, operator alerts' },
      position: { x: 980, y: 340 }
    },
    {
      id: 'task-complete',
      type: 'output',
      data: { label: 'Task Complete', nodeType: 'output', description: 'Action executed with proof artifacts' },
      position: { x: 1200, y: 200 }
    }
  ],
  edges: [
    { id: 'edge-sensor-perception', source: 'sensor-suite', target: 'perception-fusion', animated: true },
    { id: 'edge-perception-scene', source: 'perception-fusion', target: 'scene-understanding', animated: true },
    { id: 'edge-perception-reasoning', source: 'perception-fusion', target: 'reasoning-engine', animated: true },
    { id: 'edge-scene-reasoning', source: 'scene-understanding', target: 'reasoning-engine', animated: true, label: 'Grounded context' },
    { id: 'edge-reasoning-action', source: 'reasoning-engine', target: 'action-planner', animated: true },
    { id: 'edge-action-safety', source: 'action-planner', target: 'safety-validator', animated: true },
    { id: 'edge-safety-actuator', source: 'safety-validator', target: 'actuator-controller', animated: true, label: 'Validated plan' },
    { id: 'edge-safety-feedback', source: 'safety-validator', target: 'feedback-loop', animated: true, label: 'Alerts' },
    { id: 'edge-actuator-complete', source: 'actuator-controller', target: 'task-complete', animated: true },
    { id: 'edge-actuator-feedback', source: 'actuator-controller', target: 'feedback-loop', animated: true },
    { id: 'edge-feedback-perception', source: 'feedback-loop', target: 'perception-fusion', animated: true, label: 'Closed loop', style: { strokeDasharray: '5,5' } }
  ],
  codeExample: `# Python: Embodied perception-action with Gemini Robotics
from google.generativeai import GenerativeModel
import cv2
import numpy as np
from ros2_control_interfaces import ManipulatorController

class EmbodiedAgent:
    def __init__(self, gemini_model="gemini-1.5-pro-vision"):
        self.perception = GenerativeModel(gemini_model)
        self.manipulator = ManipulatorController(robot_name="ur5e")
        self.safety_policy = GeminiGuardPolicy(profile="manufacturing")
        
    async def perception_action_loop(self, task: str):
        """Execute sense-think-act cycle"""
        while not self.task_complete:
            # SENSE: Capture multimodal sensor data
            rgb_frame = await self.capture_camera('rgb')
            depth_frame = await self.capture_camera('depth')
            force_reading = await self.get_force_torque()
            
            # THINK: Gemini reasons about scene
            prompt = f"""
            Task: {task}
            
            Analyze this scene:
            - What objects do you see?
            - What is their pose/orientation?
            - Are there any defects or anomalies?
            - What action should the robot take next?
            
            Respond with JSON: {{
              "objects": [...],
              "defects": [...],
              "recommended_action": "pick" | "place" | "inspect" | "bin",
              "target_object": "...",
              "confidence": 0.0-1.0,
              "reasoning": "..."
            }}
            """
            
            response = await self.perception.generate_content([
                prompt,
                {"mime_type": "image/jpeg", "data": rgb_frame},
                {"mime_type": "image/depth", "data": depth_frame}
            ])
            
            decision = parse_json(response.text)
            
            # Validate against safety policy
            if not self.safety_policy.validate(decision):
                await self.alert_operator(decision, "Safety violation")
                continue
            
            # ACT: Execute manipulation
            if decision['recommended_action'] == 'pick':
                grasp_pose = await self.compute_grasp(
                    decision['target_object'],
                    rgb_frame,
                    depth_frame
                )
                await self.manipulator.move_to_grasp(grasp_pose)
                await self.manipulator.close_gripper(force_limit=20)
                
            elif decision['recommended_action'] == 'bin':
                bin_location = self.get_bin_for_defect(decision['defects'])
                await self.manipulator.move_to(bin_location)
                await self.manipulator.open_gripper()
            
            # FEEDBACK: Update telemetry
            await self.log_action({
                'decision': decision,
                'force_reading': force_reading,
                'execution_time': timer.elapsed()
            })

# TypeScript: ROS2 integration with safety validation
interface PerceptionResult {
  objects: DetectedObject[];
  defects: Defect[];
  recommendedAction: 'pick' | 'place' | 'inspect' | 'bin';
  confidence: number;
  reasoning: string;
}

export class EmbodiedPerceptionActionController {
  private gemini: GeminiVisionAPI;
  private ros2: ROS2Bridge;
  private safetyGuard: SafetyValidator;
  
  async executeTask(task: TaskSpecification) {
    const loop = setInterval(async () => {
      // Capture sensors
      const sensorData = await this.ros2.captureMultimodal();
      
      // Gemini perception
      const perception = await this.gemini.analyzeScene({
        images: sensorData.images,
        depth: sensorData.depth,
        task: task.description
      });
      
      // Safety check
      const safetyCheck = await this.safetyGuard.validate({
        perception,
        currentState: await this.ros2.getRobotState(),
        policyGates: ['collision_free', 'torque_limit', 'workspace_bounds']
      });
      
      if (!safetyCheck.passed) {
        await this.notifyOperator({
          level: 'warning',
          message: safetyCheck.reason,
          perception
        });
        return;
      }
      
      // Execute action
      await this.ros2.executeManipulation({
        action: perception.recommendedAction,
        targetPose: perception.targetPose,
        gripperForce: 15,
        trajectoryType: 'smooth'
      });
      
      // Log telemetry
      await this.logExecution({
        perception,
        safetyCheck,
        executionTime: Date.now() - startTime
      });
      
    }, 120); // 120ms loop (8Hz)
  }
}`,
  pythonCodeExample: `# Complete implementation with ROS2 and Gemini Guard
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image, PointCloud2
from geometry_msgs.msg import Pose
from moveit_msgs.msg import MoveGroupAction
import google.generativeai as genai

class EmbodiedPerceptionActionNode(Node):
    def __init__(self):
        super().__init__('embodied_perception_action')
        
        # ROS2 subscribers
        self.rgb_sub = self.create_subscription(
            Image, '/camera/rgb', self.rgb_callback, 10)
        self.depth_sub = self.create_subscription(
            Image, '/camera/depth', self.depth_callback, 10)
        self.force_sub = self.create_subscription(
            WrenchStamped, '/force_torque', self.force_callback, 10)
        
        # ROS2 action clients
        self.move_group_client = ActionClient(self, MoveGroupAction, 'move_group')
        self.gripper_client = ActionClient(self, GripperCommandAction, 'gripper')
        
        # Gemini setup
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        self.gemini = genai.GenerativeModel('gemini-1.5-pro-vision')
        
        # Safety policy
        self.safety_validator = SafetyValidator({
            'max_velocity': 0.5,  # m/s
            'max_torque': 25.0,   # Nm
            'workspace_bounds': {'x': [-0.5, 0.5], 'y': [-0.5, 0.5], 'z': [0.0, 1.0]}
        })
        
        self.perception_timer = self.create_timer(0.12, self.perception_action_loop)
    
    async def perception_action_loop(self):
        """Main 8Hz control loop"""
        # Fuse sensor data
        scene_data = {
            'rgb': self.latest_rgb,
            'depth': self.latest_depth,
            'force': self.latest_force
        }
        
        # Gemini perception + reasoning
        analysis = await self.gemini.generate_content([
            self.create_perception_prompt(),
            {'mime_type': 'image/jpeg', 'data': scene_data['rgb']},
            {'mime_type': 'image/depth', 'data': scene_data['depth']}
        ])
        
        decision = self.parse_gemini_response(analysis.text)
        
        # Safety validation
        safety_result = self.safety_validator.check(
            decision,
            current_state=self.get_robot_state(),
            force_reading=scene_data['force']
        )
        
        if not safety_result.safe:
            self.get_logger().warn(f'Safety check failed: {safety_result.reason}')
            await self.request_operator_override(decision, safety_result)
            return
        
        # Execute action
        if decision['action'] == 'grasp':
            await self.execute_grasp(decision['target_pose'])
        elif decision['action'] == 'place':
            await self.execute_place(decision['bin_location'])
        elif decision['action'] == 'inspect':
            await self.execute_inspection_move(decision['inspection_pose'])
        
        # Publish telemetry
        self.publish_execution_metrics({
            'cycle_time': self.perception_timer.time_since_last_call(),
            'decision_confidence': decision['confidence'],
            'safety_margin': safety_result.margin,
            'force_magnitude': np.linalg.norm(scene_data['force'])
        })`,
  implementation: [
    'Deploy sensor suite: RGB-D cameras (Intel RealSense, Azure Kinect), force/torque sensors (ATI Gamma), optional thermal camera.',
    'Set up Gemini API with vision-language model (gemini-1.5-pro-vision) for multimodal perception.',
    'Integrate ROS2 control stack: ros2_control, MoveIt for motion planning, Nav2 if mobile base included.',
    'Configure safety policies: torque limits per joint, collision zones, workspace boundaries, e-stop integration.',
    'Implement perception-action loop at 5-10Hz: sensor capture → Gemini analysis → safety check → actuation → telemetry.',
    'Build operator console: live video feed, LLM reasoning traces, override buttons, performance metrics.',
    'Set up logging pipeline: rosbag2 for sensor/telemetry data, incident replay, performance profiling.'
  ],
  advantages: [
    'Unifies perception and action with grounded multimodal reasoning - no separate CV models needed.',
    'Natural language explanations make robot decisions interpretable for operators.',
    'Adapts to novel objects and scenarios without retraining specialized models.',
    'Safety guardrails prevent collisions, excessive forces, and out-of-bounds movements.',
    'Telemetry enables continuous improvement through offline analysis and model fine-tuning.'
  ],
  limitations: [
    'Perception latency from Gemini API calls (50-200ms) limits control loop frequency to 5-10Hz.',
    'Requires robust network connectivity for cloud API access - consider edge deployment for mission-critical systems.',
    'LLM reasoning quality depends on prompt engineering and few-shot examples.',
    'Safety validator needs domain-specific tuning - overly conservative policies slow throughput.',
    'Initial calibration required for camera-robot transforms and workspace mapping.'
  ],
  relatedPatterns: [
    'mobile-manipulator-steward',
    'sensory-reasoning-enhancement',
    'action-grounding-verification',
    'perception-normalization'
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '2-3 weeks',
    complexityReduction: 'High - Replaces separate CV pipeline, object detection, and decision logic with unified LLM reasoning. Reduces ~500 lines of perception code to ~100.',
    reusabilityScore: 9,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Core pattern for embodied AI across manufacturing, agriculture, healthcare, retail, household robotics',
      'Architecture Templates - ROS2 + Gemini Vision API + safety validator is reusable across platforms (UR5, Franka, mobile manipulators)',
      'Incremental Delivery - Start with teleoperation, add perception, then close loop with actuation, finally enable full autonomy',
      'Failure Scenario Libraries - Perception failures, safety violations, grasp failures, network latency, operator overrides',
      'Operational Instrumentation - Track loop frequency, Gemini latency, safety stop rate, task success rate, operator intervention frequency'
    ]
  },

  evaluation: 'Measure task success rate, perception-action loop latency, safety stop frequency, operator intervention rate, and compare to baseline systems (traditional CV + hard-coded logic).',
  
  evaluationProfile: {
    scenarioFocus: 'Real-time sensorimotor control with multimodal perception',
    criticalMetrics: [
      'Task completion success rate (%)',
      'Perception-action loop frequency (Hz)',
      'Gemini API latency (p50, p95, p99)',
      'Safety stop frequency (stops/hour)',
      'Operator intervention rate (%)',
      'Defect detection accuracy (precision/recall)',
      'Grasp success rate (%)'
    ],
    evaluationNotes: [
      'Target 8-10Hz loop for responsive control - optimize Gemini calls or use edge deployment',
      'Track false positive safety stops - tune validator thresholds to balance safety and throughput',
      'Log failure modes: perception errors, grasp failures, network timeouts',
      'A/B test prompt variations to improve decision quality'
    ],
    cohort: 'cognitive-sensing',
    readinessSignals: [
      'Need to handle novel objects without retraining custom models',
      'Operator interpretability is important for trust and compliance',
      'Existing CV pipeline is brittle and requires frequent retraining',
      'Budget for Gemini API costs ($50-500/month depending on throughput)'
    ],
    dataNeeds: [
      'Calibrated camera intrinsics and extrinsics (camera-to-robot transform)',
      'Labeled dataset for initial prompt engineering and few-shot examples',
      'Baseline metrics from current system (if replacing existing automation)',
      'Safety policy specifications (torque limits, collision zones, workspace bounds)'
    ]
  }
};
