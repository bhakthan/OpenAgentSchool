// Cohort data model and localStorage-backed store

export interface CohortMember {
  userId: string;
  displayName: string;
  role: 'mentor' | 'learner';
  joinedAt: string;
}

export interface CohortChallenge {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  conceptIds: string[];
}

export interface CohortMessage {
  id: string;
  cohortId: string;
  userId: string;
  displayName: string;
  text: string;
  createdAt: string;
}

export interface Cohort {
  id: string;
  name: string;
  description: string;
  mentorId: string;
  members: CohortMember[];
  challenges: CohortChallenge[];
  messages: CohortMessage[];
  createdAt: string;
  isActive: boolean;
}

const STORAGE_KEY = 'oas.cohorts.v1';

function loadStore(): Cohort[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Cohort[]) : [];
  } catch {
    return [];
  }
}

function saveStore(cohorts: Cohort[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cohorts));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getCohorts(): Cohort[] {
  return loadStore();
}

export function getCohortById(id: string): Cohort | undefined {
  return loadStore().find((c) => c.id === id);
}

export function createCohort(
  name: string,
  description: string,
  mentorId: string,
  mentorName: string
): Cohort {
  const cohorts = loadStore();
  const cohort: Cohort = {
    id: generateId(),
    name,
    description,
    mentorId,
    members: [
      {
        userId: mentorId,
        displayName: mentorName,
        role: 'mentor',
        joinedAt: new Date().toISOString(),
      },
    ],
    challenges: [],
    messages: [],
    createdAt: new Date().toISOString(),
    isActive: true,
  };
  cohorts.push(cohort);
  saveStore(cohorts);
  return cohort;
}

export function joinCohort(
  cohortId: string,
  userId: string,
  displayName: string
): Cohort | undefined {
  const cohorts = loadStore();
  const cohort = cohorts.find((c) => c.id === cohortId);
  if (!cohort) return undefined;
  if (cohort.members.some((m) => m.userId === userId)) return cohort;
  cohort.members.push({
    userId,
    displayName,
    role: 'learner',
    joinedAt: new Date().toISOString(),
  });
  saveStore(cohorts);
  return cohort;
}

export function addChallenge(
  cohortId: string,
  title: string,
  description: string,
  dueDate: string,
  conceptIds: string[]
): CohortChallenge | undefined {
  const cohorts = loadStore();
  const cohort = cohorts.find((c) => c.id === cohortId);
  if (!cohort) return undefined;
  const challenge: CohortChallenge = {
    id: generateId(),
    title,
    description,
    dueDate,
    conceptIds,
  };
  cohort.challenges.push(challenge);
  saveStore(cohorts);
  return challenge;
}

export function addMessage(
  cohortId: string,
  userId: string,
  displayName: string,
  text: string
): CohortMessage | undefined {
  const cohorts = loadStore();
  const cohort = cohorts.find((c) => c.id === cohortId);
  if (!cohort) return undefined;
  const message: CohortMessage = {
    id: generateId(),
    cohortId,
    userId,
    displayName,
    text,
    createdAt: new Date().toISOString(),
  };
  cohort.messages.push(message);
  saveStore(cohorts);
  return message;
}
