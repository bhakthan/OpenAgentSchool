/**
 * Team Cohorts & Mentor Rooms Page
 * List, create, join cohorts with chat and challenges.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics/ga';
import {
  getCohorts,
  getCohortById,
  createCohort,
  joinCohort,
  addChallenge,
  addMessage,
  type Cohort,
} from '@/lib/cohortModel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Plus, ArrowLeft, ChatText, Trophy } from '@phosphor-icons/react';

// ── Create Cohort Form ───────────────────────────────────────────────────

function CreateCohortForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    trackEvent({ action: 'create_cohort', category: 'cohorts', label: name.trim() });
    const mentorId = `user-${Date.now()}`;
    createCohort(name.trim(), description.trim(), mentorId, 'You');
    setName('');
    setDescription('');
    onCreated();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="w-5 h-5" /> Create a New Cohort
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="cohort-name" className="text-sm font-medium">Name</label>
            <input
              id="cohort-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. RAG Study Group"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="cohort-desc" className="text-sm font-medium">Description</label>
            <textarea
              id="cohort-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will this cohort focus on?"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm h-20 resize-none"
            />
          </div>
          <Button type="submit" size="sm">Create Cohort</Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ── Cohort Detail View ───────────────────────────────────────────────────

function CohortDetail({
  cohortId,
  onBack,
}: {
  cohortId: string;
  onBack: () => void;
}) {
  const [cohort, setCohort] = useState<Cohort | undefined>(() => getCohortById(cohortId));
  const [msgText, setMsgText] = useState('');
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDesc, setChallengeDesc] = useState('');
  const [showChallengeForm, setShowChallengeForm] = useState(false);

  const refresh = useCallback(() => setCohort(getCohortById(cohortId)), [cohortId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    addMessage(cohortId, 'current-user', 'You', msgText.trim());
    setMsgText('');
    refresh();
  };

  const submitChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeTitle.trim()) return;
    addChallenge(
      cohortId,
      challengeTitle.trim(),
      challengeDesc.trim(),
      new Date(Date.now() + 7 * 86400000).toISOString(),
      []
    );
    setChallengeTitle('');
    setChallengeDesc('');
    setShowChallengeForm(false);
    refresh();
  };

  if (!cohort) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Cohort not found. <Button variant="link" onClick={onBack}>Go back</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Cohorts
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{cohort.name}</CardTitle>
          <CardDescription>{cohort.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {cohort.members.length} member{cohort.members.length !== 1 ? 's' : ''}
            <Badge variant={cohort.isActive ? 'default' : 'secondary'}>
              {cohort.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4" /> Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {cohort.members.map((m) => (
              <li key={m.userId} className="flex items-center gap-2 text-sm">
                <span className="font-medium">{m.displayName}</span>
                <Badge variant={m.role === 'mentor' ? 'default' : 'secondary'} className="text-xs">
                  {m.role}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Challenges */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Challenges
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowChallengeForm(!showChallengeForm)}>
              <Plus className="w-3 h-3 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {showChallengeForm && (
            <form onSubmit={submitChallenge} className="space-y-2 p-3 border rounded-md">
              <input
                type="text"
                value={challengeTitle}
                onChange={(e) => setChallengeTitle(e.target.value)}
                placeholder="Challenge title"
                className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                required
              />
              <textarea
                value={challengeDesc}
                onChange={(e) => setChallengeDesc(e.target.value)}
                placeholder="Description"
                className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm h-16 resize-none"
              />
              <Button type="submit" size="sm">Create Challenge</Button>
            </form>
          )}
          {cohort.challenges.length === 0 && !showChallengeForm && (
            <p className="text-sm text-muted-foreground">No challenges yet.</p>
          )}
          {cohort.challenges.map((ch) => (
            <div key={ch.id} className="p-3 border rounded-md space-y-1">
              <p className="font-medium text-sm">{ch.title}</p>
              <p className="text-xs text-muted-foreground">{ch.description}</p>
              <p className="text-xs text-muted-foreground">
                Due: {new Date(ch.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Message Board */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ChatText className="w-4 h-4" /> Message Board
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="max-h-64 overflow-y-auto space-y-2">
            {cohort.messages.length === 0 && (
              <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
            )}
            {cohort.messages.map((msg) => (
              <div key={msg.id} className="p-2 border rounded-md">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{msg.displayName}</span>
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm mt-1">{msg.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
            <Button type="submit" size="sm">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Cohorts Page ────────────────────────────────────────────────────

const CohortsPage: React.FC = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const refresh = useCallback(() => setCohorts(getCohorts()), []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (selectedId) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <CohortDetail cohortId={selectedId} onBack={() => { setSelectedId(null); refresh(); }} />
      </div>
    );
  }

  const handleJoin = (cohortId: string) => {
    trackEvent({ action: 'join_cohort', category: 'cohorts', label: cohortId });
    joinCohort(cohortId, `user-${Date.now()}`, 'New Learner');
    refresh();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-500" weight="duotone" />
            Team Cohorts
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Join a learning cohort, collaborate with peers, and tackle challenges together.
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} className="gap-1">
          <Plus className="w-4 h-4" /> New Cohort
        </Button>
      </div>

      {showCreate && <CreateCohortForm onCreated={() => { setShowCreate(false); refresh(); }} />}

      {cohorts.length === 0 && !showCreate && (
        <Card>
          <CardContent className="py-12 text-center space-y-3">
            <Users size={48} className="mx-auto text-muted-foreground" weight="duotone" />
            <h3 className="text-lg font-semibold">No Cohorts Yet</h3>
            <p className="text-sm text-muted-foreground">Create a new cohort to get started!</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {cohorts.map((c) => {
          const mentor = c.members.find((m) => m.role === 'mentor');
          const activeChallenge = c.challenges[c.challenges.length - 1];
          return (
            <Card key={c.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedId(c.id)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <Badge variant={c.isActive ? 'default' : 'secondary'}>
                    {c.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{c.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {c.members.length} members
                  </span>
                  {mentor && <span>Mentor: {mentor.displayName}</span>}
                </div>
                {activeChallenge && (
                  <div className="text-xs bg-muted/50 rounded px-2 py-1">
                    <span className="font-medium">Challenge:</span> {activeChallenge.title}
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoin(c.id);
                  }}
                >
                  Join
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CohortsPage;
