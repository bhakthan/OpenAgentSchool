import { API_CONFIG, withApiV1 } from '@/lib/api/config';
import type { LearningProfile } from '@/lib/userSettings';
import type { PolicyEvaluationResponse } from '@/lib/policyContract';

function getRequiredToken(): string {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Sign in required before policy evaluation.');
  }
  return token;
}

export async function fetchEffectivePolicy(): Promise<PolicyEvaluationResponse> {
  const token = getRequiredToken();
  const response = await fetch(`${withApiV1(API_CONFIG.core)}/policy/evaluate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Policy evaluation failed (${response.status})`);
  }
  return response.json();
}

export async function simulatePolicy(profile: LearningProfile): Promise<PolicyEvaluationResponse> {
  const token = getRequiredToken();
  const response = await fetch(`${withApiV1(API_CONFIG.core)}/policy/simulate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ learning_profile: profile }),
  });
  if (!response.ok) {
    throw new Error(`Policy simulation failed (${response.status})`);
  }
  return response.json();
}
