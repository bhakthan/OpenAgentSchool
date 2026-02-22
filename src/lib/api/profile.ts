import { API_CONFIG, withApiV1 } from '@/lib/api/config';
import type { LearningProfile } from '@/lib/userSettings';

interface ProfileSyncResponse {
  ok: boolean;
}

export async function syncLearningProfile(profile: LearningProfile): Promise<ProfileSyncResponse> {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Sign in required before backend profile sync.');
  }

  const response = await fetch(`${withApiV1(API_CONFIG.core)}/users/me/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ learning_profile: profile }),
  });

  if (!response.ok) {
    const message = `Profile sync failed (${response.status})`;
    throw new Error(message);
  }

  return { ok: true };
}
