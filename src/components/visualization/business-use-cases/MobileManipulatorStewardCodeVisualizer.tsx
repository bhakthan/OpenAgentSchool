import EnhancedCodeVisualizer from '@/components/code-playbook/EnhancedCodeVisualizer';
import type { CodeExecutionStep } from '@/components/code-playbook/CodeStepVisualizer';

const codeSample = `import { createEmbodiedAgent } from '@openagentschool/robotics';
import { GeminiGuardPolicy } from '@openagentschool/robotics/safety';
import { createTelemetryChannel } from '@openagentschool/telemetry';

const telemetry = createTelemetryChannel('robotics/steward');

const steward = createEmbodiedAgent({
	id: 'mobile-steward-01',
	perception: {
		sensors: ['rgb_camera', 'depth_camera', 'force_torque'],
		digitalTwin: 'hospitality-tower'
	},
	skillGraph: defineSkillGraph([
		'navigate_to_room',
		'call_elevator',
		'handoff_item',
		'return_to_base'
	]),
	safety: new GeminiGuardPolicy({
		policyId: 'gemini-guard-robotics',
		envelopes: ['human_proximity', 'force_limit', 'geo_fence']
	}),
	telemetry
});

export async function dispatchAmenityMission(request: AmenityRequest) {
	const mission = await steward.plan(buildDeliveryMission(request));

	for (const step of mission.steps) {
		await steward.execute(step, {
			onSafetyHalt: halt =>
				steward.requestHumanReview({ halt, mission, request }),
			onLiveNarration: payload => telemetry.push(payload)
		});
	}

	return steward.collectMissionArtifacts(mission.id);
}

function buildDeliveryMission(request: AmenityRequest) {
	return {
		goal: \`Deliver ${'${'}request.item${'}'} to room ${'${'}request.roomNumber${'}'}\`,
		constraints: {
			priority: request.priority,
			guestPreference: request.preferences?.tone ?? 'warm'
		}
	};
}`;

const executionSteps: CodeExecutionStep[] = [
	{
		lineStart: 1,
		lineEnd: 8,
		description: 'Provision the robotics agent with telemetry piping for mission events.',
		output: 'Telemetry channel ready (robotics/steward)',
		variableState: { telemetry: 'Realtime channel' }
	},
	{
		lineStart: 9,
		lineEnd: 23,
		description: 'Configure perception, skill graph, and guard policy for the steward.',
		output: 'Steward agent instantiated with safety envelopes',
		variableState: { steward: 'EmbodiedAgent' }
	},
	{
		lineStart: 25,
		lineEnd: 40,
		description: 'Plan the mission then iterate through navigation + manipulation steps.',
		output: 'Executing skill graph with live narration + safety review hooks',
		variableState: { mission: 'AmenityDeliveryPlan', step: 'currentSkill' }
	},
	{
		lineStart: 42,
		lineEnd: 51,
		description: 'Assemble mission goal and safety-aware constraints for planning.',
		output: 'Mission spec composed with guest tone + priority',
		variableState: { goal: 'Deliver amenity', constraints: 'policyAware' }
	}
];

export const MobileManipulatorStewardCodeVisualizer = () => (
	<EnhancedCodeVisualizer
		code={codeSample}
		language="typescript"
		title="Mobile Steward Mission Orchestration"
		steps={executionSteps}
	/>
);

export default MobileManipulatorStewardCodeVisualizer;
