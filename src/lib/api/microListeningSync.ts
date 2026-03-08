import type { ListeningProfile } from '@/lib/data/microListening/types';

function getApiBaseUrl(): string {
  return import.meta.env.VITE_CORE_API_URL || 'http://localhost:8000';
}

function getAuthToken(): string | null {
  return localStorage.getItem('access_token');
}

async function createAuthClient() {
  const { default: axios } = await import('axios');
  const token = getAuthToken();
  return axios.create({
    baseURL: getApiBaseUrl(),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    timeout: 15_000,
  });
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export async function syncMicroListeningProgress(profile: ListeningProfile): Promise<ListeningProfile> {
  const client = await createAuthClient();
  const { data } = await client.post<ListeningProfile>('/api/v1/micro-listening/sync', profile);
  return data;
}

export async function fetchMicroListeningProgress(): Promise<ListeningProfile> {
  const client = await createAuthClient();
  const { data } = await client.get<ListeningProfile>('/api/v1/micro-listening/progress');
  return data;
}
