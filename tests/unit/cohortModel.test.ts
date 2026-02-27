/**
 * Unit tests for cohort model CRUD operations.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCohorts,
  getCohortById,
  createCohort,
  joinCohort,
  addChallenge,
  addMessage,
} from '@/lib/cohortModel';

const STORAGE_KEY = 'oas.cohorts.v1';

describe('cohortModel', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('returns empty array when no cohorts exist', () => {
    expect(getCohorts()).toEqual([]);
  });

  it('creates a cohort with mentor as first member', () => {
    const cohort = createCohort('Test Cohort', 'A test', 'mentor-1', 'Alice');
    expect(cohort.name).toBe('Test Cohort');
    expect(cohort.description).toBe('A test');
    expect(cohort.mentorId).toBe('mentor-1');
    expect(cohort.members).toHaveLength(1);
    expect(cohort.members[0].role).toBe('mentor');
    expect(cohort.members[0].displayName).toBe('Alice');
    expect(cohort.isActive).toBe(true);
  });

  it('persists cohorts to localStorage', () => {
    createCohort('Cohort A', 'desc', 'u1', 'Alice');
    createCohort('Cohort B', 'desc', 'u2', 'Bob');
    const all = getCohorts();
    expect(all).toHaveLength(2);
    expect(all[0].name).toBe('Cohort A');
    expect(all[1].name).toBe('Cohort B');
  });

  it('retrieves a cohort by id', () => {
    const created = createCohort('Find Me', 'desc', 'u1', 'Alice');
    const found = getCohortById(created.id);
    expect(found).toBeDefined();
    expect(found!.name).toBe('Find Me');
  });

  it('returns undefined for non-existent cohort id', () => {
    expect(getCohortById('nonexistent')).toBeUndefined();
  });

  it('joins a cohort as a learner', () => {
    const cohort = createCohort('Join Test', 'desc', 'mentor-1', 'Alice');
    const updated = joinCohort(cohort.id, 'learner-1', 'Bob');
    expect(updated).toBeDefined();
    expect(updated!.members).toHaveLength(2);
    expect(updated!.members[1].role).toBe('learner');
    expect(updated!.members[1].displayName).toBe('Bob');
  });

  it('does not duplicate member on re-join', () => {
    const cohort = createCohort('No Dup', 'desc', 'mentor-1', 'Alice');
    joinCohort(cohort.id, 'learner-1', 'Bob');
    const again = joinCohort(cohort.id, 'learner-1', 'Bob');
    expect(again!.members).toHaveLength(2);
  });

  it('returns undefined when joining non-existent cohort', () => {
    expect(joinCohort('fake-id', 'u1', 'Alice')).toBeUndefined();
  });

  it('adds a challenge to a cohort', () => {
    const cohort = createCohort('Challenge Test', 'desc', 'u1', 'Alice');
    const challenge = addChallenge(
      cohort.id,
      'Build a RAG Pipeline',
      'Step-by-step RAG implementation',
      '2025-12-31',
      ['rag', 'embeddings']
    );
    expect(challenge).toBeDefined();
    expect(challenge!.title).toBe('Build a RAG Pipeline');
    expect(challenge!.conceptIds).toEqual(['rag', 'embeddings']);

    const refreshed = getCohortById(cohort.id);
    expect(refreshed!.challenges).toHaveLength(1);
  });

  it('returns undefined when adding challenge to non-existent cohort', () => {
    expect(addChallenge('fake', 'title', 'desc', '2025-01-01', [])).toBeUndefined();
  });

  it('adds a message to a cohort', () => {
    const cohort = createCohort('Chat Test', 'desc', 'u1', 'Alice');
    const msg = addMessage(cohort.id, 'u1', 'Alice', 'Hello everyone!');
    expect(msg).toBeDefined();
    expect(msg!.text).toBe('Hello everyone!');
    expect(msg!.displayName).toBe('Alice');

    const refreshed = getCohortById(cohort.id);
    expect(refreshed!.messages).toHaveLength(1);
  });

  it('returns undefined when adding message to non-existent cohort', () => {
    expect(addMessage('fake', 'u1', 'Alice', 'test')).toBeUndefined();
  });
});
