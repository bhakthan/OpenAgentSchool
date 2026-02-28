import { useState, useMemo } from 'react';
import { PROJECT_TRACKS } from '@/lib/data/projectTracks';
import { getTrackProgress } from '@/lib/trackProgress';
import { trackEvent } from '@/lib/analytics/ga';
import { buildLearnerSnapshot } from '@/lib/phase1/phase1Lab';
import { generateCertificatePDF, generateCertificateId } from '@/lib/certificateGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Stamp, Certificate, Download, Star } from '@phosphor-icons/react';

interface SkillEntry {
  id: string;
  name: string;
  source: string;
  earned: boolean;
}

function gatherSkills(): SkillEntry[] {
  const snapshot = buildLearnerSnapshot();
  const skills: SkillEntry[] = [];

  // Skills from quiz categories
  for (const cat of snapshot.quiz.categoriesCompleted) {
    skills.push({ id: `quiz-${cat}`, name: `${cat} Mastery`, source: 'Quiz', earned: true });
  }

  // Skills from completed project tracks
  for (const track of PROJECT_TRACKS) {
    const completed = getTrackProgress(track.id);
    const done = completed.length >= track.milestones.length;
    skills.push({ id: `track-${track.id}`, name: track.title, source: 'Project Track', earned: done });
  }

  // Study mode completion skill
  if (snapshot.studyCompleted >= 5) {
    skills.push({ id: 'study-5', name: 'Study Mode Veteran', source: 'Study Mode', earned: true });
  }
  if (snapshot.streak >= 7) {
    skills.push({ id: 'streak-7', name: '7-Day Streak', source: 'Streak', earned: true });
  }

  return skills;
}

function SkillStamp({ skill }: { skill: SkillEntry }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed transition-all ${
        skill.earned
          ? 'border-blue-500/60 bg-blue-50/40 dark:bg-blue-950/20'
          : 'border-muted-foreground/20 opacity-40'
      }`}
    >
      {skill.earned ? (
        <Stamp size={32} weight="duotone" className="text-blue-500" />
      ) : (
        <Star size={32} className="text-muted-foreground" />
      )}
      <span className="text-sm font-medium text-center">{skill.name}</span>
      <Badge variant="outline" className="text-xs">{skill.source}</Badge>
    </div>
  );
}

export default function SkillPassportPage() {
  const skills = useMemo(() => gatherSkills(), []);
  const earnedSkills = skills.filter(s => s.earned);
  const [certName, setCertName] = useState('');

  const handleGenerateCert = (skillName: string) => {
    trackEvent({ action: 'generate_certificate', category: 'skill_passport', label: skillName });
    const name = certName.trim() || 'Learner';
    const id = generateCertificateId();
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    generateCertificatePDF(name, skillName, date, id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Skill Passport</h1>
      <p className="text-muted-foreground mb-6">
        Your passport of earned skills and certifications. Generate verifiable certificates for skills you've mastered.
      </p>

      {/* Name input for certificates */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <label className="block text-sm font-medium mb-2">Your Name (for certificates)</label>
          <input
            type="text"
            value={certName}
            onChange={e => setCertName(e.target.value)}
            placeholder="Enter your name"
            className="w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </CardContent>
      </Card>

      {/* Passport stamp grid */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Certificate size={22} weight="duotone" />
            Skill Stamps ({earnedSkills.length}/{skills.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skills.map(skill => (
              <SkillStamp key={skill.id} skill={skill} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificate generation for earned skills */}
      {earnedSkills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download size={22} weight="duotone" />
              Generate Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {earnedSkills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 rounded-md border">
                  <div>
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="outline" className="ml-2 text-xs">{skill.source}</Badge>
                  </div>
                  <Button size="sm" onClick={() => handleGenerateCert(skill.name)}>
                    <Download size={14} className="mr-1" /> PDF
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
