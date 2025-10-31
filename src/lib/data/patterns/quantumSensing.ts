import { PatternData } from './types';

export const quantumSensingPattern: PatternData = {
  id: 'quantum-sensing-agent',
  name: 'Quantum Sensing Agent',
  description: 'Leverages quantum sensors (magnetometers, atomic clocks, gravimeters, diamond NV centers) with AI interpretation to detect anomalies, map underground structures, enable precision navigation, and diagnose medical conditions.',
  category: 'Advanced',
  useCases: [
    'Precision agriculture - detect soil composition, water stress, nutrient deficiencies',
    'Underground mapping - locate pipes, cables, voids, archaeological sites',
    'Medical diagnostics - detect magnetic anomalies (brain activity, cardiac function)',
    'GPS-denied navigation - atomic clock precision timing for inertial navigation',
    'Security and defense - detect concealed objects, subsurface threats'
  ],
  whenToUse: 'Adopt when classical sensors lack sensitivity/precision, need to detect weak signals (magnetic fields, gravity gradients, time drifts), or operate in GPS-denied environments.',
  businessUseCase: {
    industry: 'Infrastructure & Utilities',
    description: 'A utility company uses quantum magnetometer drones to map underground pipes and detect leaks before they cause failures. The quantum sensor detects magnetic field anomalies (corrosion, metal degradation) 10x more sensitively than classical magnetometers. An AI agent interprets sensor data, identifies leak probabilities, and generates maintenance work orders. This prevents 80% of pipe failures, saving $5M annually in emergency repairs.',
    visualization: () => null as any,
    enlightenMePrompt: `
Design a quantum sensing agent for underground infrastructure mapping and leak detection.

Provide:
- Quantum sensor selection: Optically pumped magnetometers (OPM), diamond NV centers, or SQUID for magnetic anomaly detection.
- Sensor fusion: Combine quantum magnetometer with GPS, LiDAR, and classical ground-penetrating radar (GPR).
- AI interpretation pipeline: Signal processing → anomaly detection (Transformer model) → leak probability scoring.
- Agent workflow: Flight planning for drone survey, real-time data ingestion, anomaly classification, maintenance recommendation.
- Calibration and drift correction: Baseline magnetic field maps, temperature compensation, noise filtering.
- Safety and validation: Human-in-loop verification before excavation, false positive handling.
`
  },
  nodes: [
    {
      id: 'quantum-sensor',
      type: 'input',
      data: { label: 'Quantum Sensor', nodeType: 'input', description: 'Magnetometer/gravimeter/atomic clock' },
      position: { x: 100, y: 240 }
    },
    {
      id: 'signal-processor',
      type: 'default',
      data: { label: 'Signal Processor', nodeType: 'planner', description: 'Filter, calibrate, extract features' },
      position: { x: 320, y: 240 }
    },
    {
      id: 'classical-sensor-fusion',
      type: 'default',
      data: { label: 'Classical Sensors', nodeType: 'input', description: 'GPS, LiDAR, GPR, IMU' },
      position: { x: 320, y: 360 }
    },
    {
      id: 'sensor-fusion',
      type: 'default',
      data: { label: 'Sensor Fusion', nodeType: 'planner', description: 'Combine quantum + classical' },
      position: { x: 540, y: 300 }
    },
    {
      id: 'anomaly-detector',
      type: 'default',
      data: { label: 'Anomaly Detector', nodeType: 'llm', description: 'Transformer / Isolation Forest' },
      position: { x: 760, y: 240 }
    },
    {
      id: 'llm-interpreter',
      type: 'default',
      data: { label: 'LLM Interpreter', nodeType: 'llm', description: 'Explain findings, recommend actions' },
      position: { x: 980, y: 180 }
    },
    {
      id: 'human-review',
      type: 'default',
      data: { label: 'Human Review', nodeType: 'evaluator', description: 'Validate before excavation' },
      position: { x: 980, y: 320 }
    },
    {
      id: 'action-executor',
      type: 'output',
      data: { label: 'Work Order', nodeType: 'output', description: 'Maintenance ticket + location' },
      position: { x: 1200, y: 240 }
    }
  ],
  edges: [
    { id: 'edge-sensor-processor', source: 'quantum-sensor', target: 'signal-processor', animated: true },
    { id: 'edge-classical-fusion', source: 'classical-sensor-fusion', target: 'sensor-fusion', animated: true },
    { id: 'edge-processor-fusion', source: 'signal-processor', target: 'sensor-fusion', animated: true },
    { id: 'edge-fusion-anomaly', source: 'sensor-fusion', target: 'anomaly-detector', animated: true },
    { id: 'edge-anomaly-llm', source: 'anomaly-detector', target: 'llm-interpreter', animated: true },
    { id: 'edge-anomaly-human', source: 'anomaly-detector', target: 'human-review', animated: true, label: 'High risk' },
    { id: 'edge-llm-action', source: 'llm-interpreter', target: 'action-executor', animated: true },
    { id: 'edge-human-action', source: 'human-review', target: 'action-executor', animated: true, label: 'Approved' }
  ],
  codeExample: `# Python: Quantum sensing with AI interpretation
import numpy as np
from qiskit import QuantumCircuit
from typing import List, Dict

class QuantumSensingAgent:
    def __init__(self, sensor_type='magnetometer'):
        self.sensor = QuantumSensor(sensor_type)
        self.anomaly_model = TransformerAnomalyDetector()
        self.llm = LLMInterpreter(model='gpt-4')
        
    async def survey_area(self, flight_path: List[tuple]):
        """Execute quantum sensor survey"""
        readings = []
        
        for waypoint in flight_path:
            # Quantum sensor reading
            quantum_data = await self.sensor.measure(waypoint)
            
            # Classical sensor fusion
            gps = await self.get_gps_position()
            lidar = await self.get_lidar_scan()
            
            # Combine
            fused_data = self.fuse_sensors(quantum_data, gps, lidar)
            readings.append(fused_data)
        
        # Detect anomalies
        anomalies = await self.anomaly_model.detect(readings)
        
        # Interpret with LLM
        for anomaly in anomalies:
            interpretation = await self.llm.interpret({
                'sensor_data': anomaly.data,
                'location': anomaly.position,
                'severity': anomaly.score,
                'context': 'underground pipe survey'
            })
            
            # Generate work order
            if interpretation.leak_probability > 0.7:
                await self.create_work_order(anomaly, interpretation)
        
        return anomalies

class QuantumSensor:
    def __init__(self, sensor_type='magnetometer'):
        self.sensor_type = sensor_type
        self.baseline_field = None
        
    async def measure(self, position):
        """Read quantum sensor (magnetometer)"""
        if self.sensor_type == 'magnetometer':
            # Optically pumped magnetometer (OPM)
            raw_signal = await self.read_opm()
            
            # Calibrate
            calibrated = self.calibrate(raw_signal, position)
            
            # Compute anomaly vs baseline
            if self.baseline_field:
                anomaly_field = calibrated - self.baseline_field
            else:
                anomaly_field = calibrated
            
            return {
                'magnetic_field': calibrated,
                'anomaly': anomaly_field,
                'sensitivity': 1e-15,  # Tesla (fT level)
                'timestamp': time.time(),
                'position': position
            }
    
    def calibrate(self, raw, position):
        """Apply temperature compensation, drift correction"""
        # Temperature correction
        temp_corrected = raw / (1 + 0.001 * (self.temperature - 20))
        
        # Heading error (if moving sensor)
        heading_corrected = self.correct_heading_error(temp_corrected)
        
        return heading_corrected

# TypeScript: Agent orchestration for quantum sensing
interface QuantumSensorReading {
  magneticField: number; // Tesla
  anomalyScore: number;
  position: GeoCoordinate;
  timestamp: number;
}

export class QuantumInfrastructureAgent {
  private quantumSensor: QuantumMagnetometer;
  private anomalyDetector: TransformerModel;
  private llmInterpreter: LLM;
  
  async executeSurvey(surveyArea: GeoPolygon): Promise<MaintenanceReport> {
    // Plan flight path
    const flightPath = await this.planOptimalPath(surveyArea);
    
    // Collect quantum sensor data
    const readings: QuantumSensorReading[] = [];
    for (const waypoint of flightPath) {
      const reading = await this.quantumSensor.measure(waypoint);
      readings.push(reading);
    }
    
    // Detect anomalies
    const anomalies = await this.anomalyDetector.predict(readings, {
      threshold: 0.8,
      contextWindow: 50 // readings
    });
    
    // Interpret with LLM
    const findings: Finding[] = [];
    for (const anomaly of anomalies) {
      const interpretation = await this.llmInterpreter.analyze({
        prompt: \`
          Quantum magnetometer detected anomaly:
          - Magnetic field deviation: \${anomaly.anomalyScore.toFixed(3)} nT
          - Location: \${anomaly.position.lat}, \${anomaly.position.lon}
          - Depth estimate: \${anomaly.depthEstimate}m
          
          Explain what this anomaly indicates (pipe corrosion, leak, void, etc.)
          and recommend action (inspect, excavate, monitor, ignore).
        \`,
        schema: FindingSchema
      });
      
      findings.push({
        anomaly,
        interpretation,
        riskLevel: this.assessRisk(anomaly, interpretation)
      });
    }
    
    // Generate report
    return this.generateReport(findings);
  }
}`,
  pythonCodeExample: `# Complete quantum sensing agent with diamond NV center integration
from qudi.core.connector import Connector
from qudi.core.module import Base
import torch
from transformers import AutoModel

class DiamondNVSensingAgent(Base):
    """Quantum sensing with diamond NV centers for medical diagnostics"""
    
    nv_center = Connector(interface='QuantumSensor')
    
    def __init__(self, config):
        super().__init__(config)
        self.anomaly_model = torch.load('models/nv_anomaly_transformer.pt')
        self.baseline_odmr = None
        
    async def measure_brain_activity(self, patient_id: str):
        """Non-invasive brain activity mapping"""
        # Initialize NV center magnetometry
        await self.nv_center().initialize()
        
        # Baseline ODMR (optically detected magnetic resonance)
        if not self.baseline_odmr:
            self.baseline_odmr = await self.nv_center().run_odmr_scan(
                frequency_range=(2.7e9, 3.0e9),  # GHz
                power=-10  # dBm
            )
        
        # Time-series measurement (brain activity)
        readings = []
        for t in range(100):  # 10 seconds at 10Hz
            odmr = await self.nv_center().measure_magnetic_field()
            
            # Extract magnetic field from ODMR splitting
            B_field = self.compute_magnetic_field(odmr)
            readings.append(B_field)
            await asyncio.sleep(0.1)
        
        # Detect anomalies (epileptic activity, stroke, tumor)
        anomalies = self.anomaly_model.detect(torch.tensor(readings))
        
        # Interpret with medical LLM
        findings = await self.medical_llm.analyze({
            'sensor': 'diamond NV magnetometry',
            'readings': readings,
            'anomalies': anomalies,
            'patient_history': await self.fetch_patient_history(patient_id)
        })
        
        # Generate diagnostic report
        await self.create_medical_report(patient_id, findings)
        
    def compute_magnetic_field(self, odmr_spectrum):
        """Extract B-field from ODMR splitting"""
        # Zero-field splitting
        D = 2.87e9  # Hz
        
        # Find resonance peaks
        peaks = self.find_odmr_peaks(odmr_spectrum)
        
        # Magnetic field from splitting: B = (f+ - f-) / (2 * gamma)
        gamma = 28e9  # Hz/T (gyromagnetic ratio)
        B_field = (peaks[1] - peaks[0]) / (2 * gamma)
        
        return B_field`,
  implementation: [
    'Select quantum sensor: Optically pumped magnetometer (QuSpin, Geometrics), diamond NV center (Qnami), atomic clock (Microsemi), or gravimeter based on use case.',
    'Build signal processing pipeline: Calibration, temperature/drift correction, noise filtering (Kalman filter, wavelet denoising).',
    'Implement sensor fusion: Combine quantum sensor with GPS, IMU, LiDAR, classical sensors for robust localization.',
    'Train anomaly detection model: Transformer or Isolation Forest on labeled sensor data (normal vs anomaly).',
    'Integrate LLM interpretation: Explain anomalies, recommend actions, generate natural language reports.',
    'Add human-in-loop validation: High-risk findings (excavation, medical diagnosis) require expert review before acting.'
  ],
  advantages: [
    'Extreme sensitivity: Quantum magnetometers detect 1000x weaker fields than classical Hall sensors (femtotesla vs picotesla).',
    'High spatial resolution: Diamond NV centers enable nanoscale imaging (MRI at atomic scale).',
    'GPS-independent navigation: Atomic clocks enable precise inertial navigation in GPS-denied environments.',
    'Non-invasive diagnostics: Detect medical conditions (epilepsy, cardiac arrhythmias) without surgery.',
    'Early anomaly detection: Find infrastructure failures (pipe corrosion, foundation cracks) before catastrophic events.'
  ],
  limitations: [
    'Quantum sensor costs: $50K-500K per unit (OPM, NV center, atomic clock) vs $100-1K for classical sensors.',
    'Environmental sensitivity: Quantum sensors require temperature stability, vibration isolation, magnetic shielding.',
    'Calibration complexity: Baseline measurements, drift correction, sensor fusion add overhead.',
    'AI interpretation reliability: Anomaly models may have false positives - human validation needed for critical decisions.',
    'Data volume: High-frequency quantum sensor streams (kHz-MHz) require substantial storage and compute.'
  ],
  relatedPatterns: [
    'embodied-perception-action',
    'sensory-reasoning-enhancement',
    'hybrid-quantum-classical-agent',
    'autonomous-workflow'
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '2-4 weeks',
    complexityReduction: 'Medium - Sensor integration straightforward, but calibration and AI interpretation require domain expertise',
    reusabilityScore: 8,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Applicable to infrastructure, agriculture, medical diagnostics, navigation, security',
      'Architecture Templates - Quantum sensor API + signal processing + anomaly detection (Transformer) + LLM interpretation',
      'Incremental Delivery - Start with simulated sensor data, validate anomaly model, deploy to real quantum hardware',
      'Failure Scenario Libraries - Sensor drift, calibration errors, false positives, environmental interference',
      'Operational Instrumentation - Track sensor uptime, calibration frequency, anomaly detection precision/recall, LLM interpretation quality'
    ]
  },

  evaluation: 'Measure anomaly detection accuracy (precision, recall, F1), false positive rate, time to detect (latency), sensor sensitivity vs classical baseline, and business outcome metrics (leak prevention rate, diagnostic accuracy).',
  
  evaluationProfile: {
    scenarioFocus: 'Applications requiring extreme sensor sensitivity or precision beyond classical limits',
    criticalMetrics: [
      'Sensor sensitivity: minimum detectable field/gravity/time drift',
      'Anomaly detection: precision, recall, F1 score',
      'False positive rate: % of flagged anomalies that are not actionable',
      'Latency: time from sensor reading to anomaly alert',
      'Business outcome: leaks prevented, diagnostic accuracy, cost savings'
    ],
    evaluationNotes: [
      'Quantum sensors excel when classical sensors lack sensitivity (weak magnetic fields, small gravity gradients)',
      'Calibration critical - establish baseline measurements in known-good conditions',
      'Human-in-loop validation essential for high-stakes decisions (excavation, medical diagnosis)',
      'Track sensor drift over time - recalibration may be needed daily/weekly'
    ],
    cohort: 'cognitive-sensing',
    readinessSignals: [
      'Need to detect signals 100-1000x weaker than classical sensor limits',
      'Operating in GPS-denied environments requiring atomic clock precision',
      'Medical/security applications where non-invasive sensing critical',
      'Budget for quantum sensor acquisition ($50K-500K) + ongoing calibration'
    ],
    dataNeeds: [
      'Baseline sensor readings in normal/anomaly-free conditions',
      'Labeled training data for anomaly detection model (normal vs anomaly)',
      'Calibration data: temperature, magnetic field maps, sensor drift curves',
      'Business outcome metrics: prevented failures, diagnostic accuracy, ROI'
    ]
  }
};
