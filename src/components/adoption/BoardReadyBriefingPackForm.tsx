import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/AuthContext';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, PageBreak, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

interface StakeholderBriefing {
  summary: string;
  keyMetrics: string;
  topRisks: string;
  anticipatedQuestions: string;
}

interface BriefingPackData {
  organizationName: string;
  documentDate: string;
  boardMeetingDate: string;
  ceo: StakeholderBriefing;
  cfo: StakeholderBriefing;
  cto: StakeholderBriefing;
  cro: StakeholderBriefing;
  cpo: StakeholderBriefing;
  clo: StakeholderBriefing;
  board: StakeholderBriefing;
}

const emptyBriefing = (): StakeholderBriefing => ({
  summary: '',
  keyMetrics: '',
  topRisks: '',
  anticipatedQuestions: '',
});

export function BoardReadyBriefingPackForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<BriefingPackData>({
    organizationName: '',
    documentDate: new Date().toISOString().split('T')[0],
    boardMeetingDate: '',
    ceo: emptyBriefing(),
    cfo: emptyBriefing(),
    cto: emptyBriefing(),
    cro: emptyBriefing(),
    cpo: emptyBriefing(),
    clo: emptyBriefing(),
    board: emptyBriefing(),
  });

  const [isAssessing, setIsAssessing] = useState(false);
  const [assessment, setAssessment] = useState<string | null>(null);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  const updateBriefing = (role: keyof Omit<BriefingPackData, 'organizationName' | 'documentDate' | 'boardMeetingDate'>, field: keyof StakeholderBriefing, value: string) => {
    setFormData(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value,
      },
    }));
  };

  const updateMeta = (field: 'organizationName' | 'documentDate' | 'boardMeetingDate', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const exportToExcel = () => {
    // Require authentication for business template downloads
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to download this board briefing pack. It's free!",
      });
      navigate('/auth?return=/adoption/board-briefing');
      return;
    }

    // Track authenticated download
    if (user?.email) {
      window.dispatchEvent(new CustomEvent('analytics:templateDownload', {
        detail: {
          template: 'Board-Ready Briefing Pack',
          format: 'Excel',
          userEmail: user.email,
          timestamp: new Date().toISOString()
        }
      }));
    }

    const wb = XLSX.utils.book_new();

    // Summary tab
    const summaryData = [
      ['Open Agent School - Board-Ready Briefing Pack'],
      ['Generated from openagentschool.org'],
      ['Agentic AI Adoption - Executive Perspectives'],
      [''],
      ['Organization', formData.organizationName],
      ['Document Date', formData.documentDate],
      ['Board Meeting Date', formData.boardMeetingDate],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    
    // Style header
    if (!wsSummary['!rows']) wsSummary['!rows'] = [];
    wsSummary['!rows'][0] = { hpt: 25 };
    if (wsSummary['A1']) {
      wsSummary['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsSummary['A2']) {
      wsSummary['A2'].s = {
        font: { italics: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Each stakeholder tab
    const roles = [
      { key: 'ceo', label: 'CEO', title: 'CEO/President Briefing' },
      { key: 'cfo', label: 'CFO', title: 'CFO Briefing' },
      { key: 'cto', label: 'CTO', title: 'CTO/CIO Briefing' },
      { key: 'cro', label: 'CRO', title: 'Chief Risk Officer Briefing' },
      { key: 'cpo', label: 'CPO', title: 'Chief People Officer Briefing' },
      { key: 'clo', label: 'CLO', title: 'Chief Legal Officer Briefing' },
      { key: 'board', label: 'Board', title: 'Board Member Briefing' },
    ];

    roles.forEach(({ key, label, title }) => {
      const briefing = formData[key as keyof Omit<BriefingPackData, 'organizationName' | 'documentDate' | 'boardMeetingDate'>];
      const roleData = [
        [`Open Agent School - ${title}`],
        ['Generated from openagentschool.org'],
        [''],
        ['Executive Summary'],
        [briefing.summary],
        [''],
        ['Key Metrics'],
        [briefing.keyMetrics],
        [''],
        ['Top 3 Risks & Mitigations'],
        [briefing.topRisks],
        [''],
        ['Anticipated Questions & Answers'],
        [briefing.anticipatedQuestions],
      ];
      const ws = XLSX.utils.aoa_to_sheet(roleData);
      
      // Style header
      if (!ws['!rows']) ws['!rows'] = [];
      ws['!rows'][0] = { hpt: 25 };
      if (ws['A1']) {
        ws['A1'].s = {
          font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "3B82F6" } },
          alignment: { horizontal: "center", vertical: "center" }
        };
      }
      if (ws['A2']) {
        ws['A2'].s = {
          font: { italics: true, sz: 10, color: { rgb: "6B7280" } },
          alignment: { horizontal: "center" }
        };
      }
      
      XLSX.utils.book_append_sheet(wb, ws, label.toUpperCase());
    });

    XLSX.writeFile(wb, `Board_Ready_Briefing_Pack_${formData.organizationName.replace(/\s/g, '_')}.xlsx`);
  };

  const exportToWord = async () => {
    // Require authentication for business template downloads
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to download this board briefing pack. It's free!",
      });
      navigate('/auth?return=/adoption/board-briefing');
      return;
    }

    // Track authenticated download
    if (user?.email) {
      window.dispatchEvent(new CustomEvent('analytics:templateDownload', {
        detail: {
          template: 'Board-Ready Briefing Pack',
          format: 'Word',
          userEmail: user.email,
          timestamp: new Date().toISOString()
        }
      }));
    }

    const roles = [
      { key: 'ceo', title: 'CEO/President Briefing - Strategic Value & Competitive Positioning' },
      { key: 'cfo', title: 'CFO Briefing - Financial Returns & ROI Model' },
      { key: 'cto', title: 'CTO/CIO Briefing - Technical Architecture & Feasibility' },
      { key: 'cro', title: 'Chief Risk Officer Briefing - Compliance & Incident Response' },
      { key: 'cpo', title: 'Chief People Officer Briefing - Workforce Impact & Change Management' },
      { key: 'clo', title: 'Chief Legal Officer Briefing - AI Liability & Regulatory Compliance' },
      { key: 'board', title: 'Board Member Briefing - Governance & Oversight' },
    ];

    const children: any[] = [
      // Branding Header
      new Paragraph({
        children: [
          new TextRun({
            text: 'Open Agent School',
            bold: true,
            size: 32,
            color: '3B82F6',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'openagentschool.org',
            italics: true,
            size: 18,
            color: '6B7280',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
      
      // Document Title
      new Paragraph({
        text: 'Board-Ready Briefing Pack',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: 'Agentic AI Adoption - Executive Perspectives',
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      }),
      new Paragraph({ text: '' }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Organization: ', bold: true }),
          new TextRun(formData.organizationName),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Document Date: ', bold: true }),
          new TextRun(formData.documentDate),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Board Meeting Date: ', bold: true }),
          new TextRun(formData.boardMeetingDate),
        ],
      }),
      new Paragraph({ text: '' }),
    ];

    roles.forEach(({ key, title }, index) => {
      if (index > 0) {
        children.push(new Paragraph({ children: [new PageBreak()] }));
      }

      const briefing = formData[key as keyof Omit<BriefingPackData, 'organizationName' | 'documentDate' | 'boardMeetingDate'>];
      
      children.push(
        new Paragraph({
          text: title,
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'Executive Summary',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({ text: briefing.summary }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'Key Metrics',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({ text: briefing.keyMetrics }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'Top 3 Risks & Mitigations',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({ text: briefing.topRisks }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'Anticipated Questions & Answers',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({ text: briefing.anticipatedQuestions }),
      );
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children,
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Board_Ready_Briefing_Pack_${formData.organizationName.replace(/\s/g, '_')}.docx`);
  };

  const getAIAssessment = async () => {
    setIsAssessing(true);
    setAssessment(null);
    setAssessmentScore(null);

    try {
      const response = await fetch('/api/v1/study/adoption/briefing/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          briefing: formData,
        }),
      });

      const data = await response.json();
      setAssessment(data.feedback);
      setAssessmentScore(data.score);
    } catch (error) {
      console.error('Assessment error:', error);
      setAssessment('Unable to get AI assessment. Please check your backend connection.');
    } finally {
      setIsAssessing(false);
    }
  };

  const completionPercentage = Math.round(
    (Object.values(formData)
      .filter((v): v is StakeholderBriefing => typeof v === 'object' && 'summary' in v)
      .reduce((acc, briefing) => acc + Object.values(briefing).filter(v => v.trim() !== '').length, 0) /
      (7 * 4)) *
      100
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Board-Ready Briefing Pack</h1>
          <p className="text-muted-foreground mt-2">
            Create role-specific briefings for C-suite and board with AI-powered assessment
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToExcel} variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button onClick={exportToWord} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Word
          </Button>
        </div>
      </div>

      <Alert>
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span>Form Completion: {completionPercentage}%</span>
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Document Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="orgName">Organization Name *</Label>
              <Input
                id="orgName"
                value={formData.organizationName}
                onChange={e => updateMeta('organizationName', e.target.value)}
                placeholder="Acme Corporation"
              />
            </div>
            <div>
              <Label htmlFor="docDate">Document Date</Label>
              <Input
                id="docDate"
                type="date"
                value={formData.documentDate}
                onChange={e => updateMeta('documentDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="boardDate">Board Meeting Date</Label>
              <Input
                id="boardDate"
                type="date"
                value={formData.boardMeetingDate}
                onChange={e => updateMeta('boardMeetingDate', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ceo" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="ceo">CEO</TabsTrigger>
          <TabsTrigger value="cfo">CFO</TabsTrigger>
          <TabsTrigger value="cto">CTO</TabsTrigger>
          <TabsTrigger value="cro">CRO</TabsTrigger>
          <TabsTrigger value="cpo">CPO</TabsTrigger>
          <TabsTrigger value="clo">CLO</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
        </TabsList>

        {(['ceo', 'cfo', 'cto', 'cro', 'cpo', 'clo', 'board'] as const).map(role => {
          const titles = {
            ceo: { title: 'CEO/President Briefing', subtitle: 'Strategic value & competitive positioning', readTime: '5-7 min' },
            cfo: { title: 'CFO Briefing', subtitle: 'Financial returns & ROI model', readTime: '6 min' },
            cto: { title: 'CTO/CIO Briefing', subtitle: 'Technical architecture & feasibility', readTime: '6 min' },
            cro: { title: 'Chief Risk Officer Briefing', subtitle: 'Compliance & incident response', readTime: '5 min' },
            cpo: { title: 'Chief People Officer Briefing', subtitle: 'Workforce impact & change management', readTime: '5 min' },
            clo: { title: 'Chief Legal Officer Briefing', subtitle: 'AI liability, regulatory compliance & contracts', readTime: '6 min' },
            board: { title: 'Board Member Briefing', subtitle: 'Governance & oversight', readTime: '5 min' },
          };

          return (
            <TabsContent key={role} value={role}>
              <Card>
                <CardHeader>
                  <CardTitle>{titles[role].title}</CardTitle>
                  <CardDescription>
                    {titles[role].subtitle} • Target read time: {titles[role].readTime}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`${role}-summary`}>Executive Summary *</Label>
                    <Textarea
                      id={`${role}-summary`}
                      value={formData[role].summary}
                      onChange={e => updateBriefing(role, 'summary', e.target.value)}
                      placeholder="1-2 paragraphs: What does this stakeholder need to know about agentic AI adoption? Connect to their priorities."
                      rows={5}
                      className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Example: "Agentic AI enables us to [specific outcome]. For you as {titles[role].title.split(' ')[0]}, this means [impact on their domain]."
                    </p>
                  </div>

                  <div>
                    <Label htmlFor={`${role}-metrics`}>Key Metrics (Role-Specific) *</Label>
                    <Textarea
                      id={`${role}-metrics`}
                      value={formData[role].keyMetrics}
                      onChange={e => updateBriefing(role, 'keyMetrics', e.target.value)}
                      placeholder="3-5 metrics this stakeholder cares about. Use bullet points."
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {role === 'ceo' && 'Customer NPS, Market share, Revenue per employee'}
                      {role === 'cfo' && 'ROI, Payback period, Cost savings, Budget variance'}
                      {role === 'cto' && 'System uptime, API latency, Data quality, Tech debt'}
                      {role === 'cro' && 'Compliance score, Incident count, Audit findings, Risk exposure'}
                      {role === 'cpo' && 'Employee eNPS, Training completion, Retention rate, Skill gaps'}
                      {role === 'clo' && 'Regulatory compliance rate, Contract exposure, Litigation risk, AI liability coverage'}
                      {role === 'board' && 'Strategic alignment, Risk posture, Governance health, Competitive position'}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor={`${role}-risks`}>Top 3 Risks & Mitigations *</Label>
                    <Textarea
                      id={`${role}-risks`}
                      value={formData[role].topRisks}
                      onChange={e => updateBriefing(role, 'topRisks', e.target.value)}
                      placeholder="List 3 risks relevant to this role, each with mitigation strategy."
                      rows={5}
                      className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Format: "Risk: [Description] | Mitigation: [How we address it]"
                    </p>
                  </div>

                  <div>
                    <Label htmlFor={`${role}-questions`}>Anticipated Questions & Answers *</Label>
                    <Textarea
                      id={`${role}-questions`}
                      value={formData[role].anticipatedQuestions}
                      onChange={e => updateBriefing(role, 'anticipatedQuestions', e.target.value)}
                      placeholder="3-5 questions this stakeholder is likely to ask, with suggested answers."
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Format: "Q: [Question]? | A: [Concise answer with data/evidence]"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Assessment
          </CardTitle>
          <CardDescription>
            Get AI-powered feedback on your briefing pack's clarity, completeness, and board readiness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={getAIAssessment}
            disabled={isAssessing || completionPercentage < 40}
            className="w-full"
            size="lg"
          >
            {isAssessing ? (
              'Analyzing Briefing Pack...'
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Assessment
              </>
            )}
          </Button>

          {completionPercentage < 40 && (
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Complete at least 40% of the briefing pack to receive AI assessment
              </AlertDescription>
            </Alert>
          )}

          {assessment && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Assessment Score: {assessmentScore}/100</span>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-background p-4 rounded-lg border whitespace-pre-wrap">
                  {assessment}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BoardReadyBriefingPackForm;
