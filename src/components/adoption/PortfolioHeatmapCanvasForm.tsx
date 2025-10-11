import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Sparkles, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Slider } from '../ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/AuthContext';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

interface Workflow {
  id: string;
  name: string;
  description: string;
  valueScore: number;
  feasibilityScore: number;
  riskScore: number;
  rationale: string;
  estimatedImpact: string;
  timeToValue: string;
}

type Quadrant = 'Quick Wins' | 'Strategic Bets' | 'Fill-Ins' | 'Avoid';

function classifyQuadrant(workflow: Workflow): Quadrant {
  const { valueScore, feasibilityScore, riskScore } = workflow;
  
  // Quick Wins: High value (4+), High feasibility (4+), Low risk (1-2)
  if (valueScore >= 4 && feasibilityScore >= 4 && riskScore <= 2) {
    return 'Quick Wins';
  }
  
  // Strategic Bets: High value (4+), but lower feasibility or higher risk
  if (valueScore >= 4) {
    return 'Strategic Bets';
  }
  
  // Fill-Ins: Lower value but easy (high feasibility, low risk)
  if (feasibilityScore >= 4 && riskScore <= 2) {
    return 'Fill-Ins';
  }
  
  // Avoid: Low value or high risk
  return 'Avoid';
}

function getQuadrantColor(quadrant: Quadrant): string {
  const colors = {
    'Quick Wins': 'text-green-600 bg-green-50 border-green-200',
    'Strategic Bets': 'text-blue-600 bg-blue-50 border-blue-200',
    'Fill-Ins': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'Avoid': 'text-red-600 bg-red-50 border-red-200',
  };
  return colors[quadrant];
}

export function PortfolioHeatmapCanvasForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: crypto.randomUUID(),
      name: 'Customer Support Tier-1',
      description: 'Automate FAQ resolution and ticket routing',
      valueScore: 4,
      feasibilityScore: 5,
      riskScore: 2,
      rationale: 'High volume, repetitive queries with clear success metrics',
      estimatedImpact: '$500K annual cost savings',
      timeToValue: '3 months',
    },
  ]);

  const [isAssessing, setIsAssessing] = useState(false);
  const [assessment, setAssessment] = useState<string | null>(null);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  const addWorkflow = () => {
    setWorkflows([
      ...workflows,
      {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        valueScore: 3,
        feasibilityScore: 3,
        riskScore: 3,
        rationale: '',
        estimatedImpact: '',
        timeToValue: '',
      },
    ]);
  };

  const removeWorkflow = (id: string) => {
    setWorkflows(workflows.filter(w => w.id !== id));
  };

  const updateWorkflow = (id: string, field: keyof Workflow, value: string | number) => {
    setWorkflows(workflows.map(w => (w.id === id ? { ...w, [field]: value } : w)));
  };

  const exportToExcel = () => {
    // Require authentication for business template downloads
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to download this business planning template. It's free!",
      });
      navigate('/auth?return=/adoption/portfolio');
      return;
    }

    // Track authenticated download
    if (user?.email) {
      window.dispatchEvent(new CustomEvent('analytics:templateDownload', {
        detail: {
          template: 'Portfolio Heatmap Canvas',
          format: 'Excel',
          userEmail: user.email,
          timestamp: new Date().toISOString()
        }
      }));
    }

    const wb = XLSX.utils.book_new();

    // Portfolio Summary Tab
    const portfolioData = [
      ['Open Agent School - Portfolio Heatmap Canvas'],
      ['Generated from openagentschool.org'],
      [''],
      ['Workflow', 'Value', 'Feasibility', 'Risk', 'Quadrant', 'Impact', 'Time to Value', 'Rationale'],
      ...workflows.map(w => [
        w.name,
        w.valueScore,
        w.feasibilityScore,
        w.riskScore,
        classifyQuadrant(w),
        w.estimatedImpact,
        w.timeToValue,
        w.rationale,
      ]),
    ];
    const wsPortfolio = XLSX.utils.aoa_to_sheet(portfolioData);
    
    // Style header
    if (!wsPortfolio['!rows']) wsPortfolio['!rows'] = [];
    wsPortfolio['!rows'][0] = { hpt: 25 };
    if (wsPortfolio['A1']) {
      wsPortfolio['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsPortfolio['A2']) {
      wsPortfolio['A2'].s = {
        font: { italics: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsPortfolio, 'Portfolio Summary');

    // Quick Wins Tab
    const quickWins = workflows.filter(w => classifyQuadrant(w) === 'Quick Wins');
    const quickWinsData = [
      ['Open Agent School - Quick Wins'],
      ['Generated from openagentschool.org'],
      ['High Value, High Feasibility, Low Risk - Priority: Execute First (0-3 months)'],
      [''],
      ['Workflow', 'Value', 'Feasibility', 'Risk', 'Impact', 'Rationale'],
      ...quickWins.map(w => [w.name, w.valueScore, w.feasibilityScore, w.riskScore, w.estimatedImpact, w.rationale]),
    ];
    const wsQuickWins = XLSX.utils.aoa_to_sheet(quickWinsData);
    
    // Style header
    if (!wsQuickWins['!rows']) wsQuickWins['!rows'] = [];
    wsQuickWins['!rows'][0] = { hpt: 25 };
    if (wsQuickWins['A1']) {
      wsQuickWins['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "10B981" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsQuickWins['A2']) {
      wsQuickWins['A2'].s = {
        font: { italics: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsQuickWins, 'Quick Wins');

    // Strategic Bets Tab
    const strategicBets = workflows.filter(w => classifyQuadrant(w) === 'Strategic Bets');
    const strategicBetsData = [
      ['Open Agent School - Strategic Bets'],
      ['Generated from openagentschool.org'],
      ['High Value, Requires Platform Investment - Priority: Scale After Quick Wins (3-9 months)'],
      [''],
      ['Workflow', 'Value', 'Feasibility', 'Risk', 'Impact', 'Rationale'],
      ...strategicBets.map(w => [w.name, w.valueScore, w.feasibilityScore, w.riskScore, w.estimatedImpact, w.rationale]),
    ];
    const wsStrategicBets = XLSX.utils.aoa_to_sheet(strategicBetsData);
    
    // Style header
    if (!wsStrategicBets['!rows']) wsStrategicBets['!rows'] = [];
    wsStrategicBets['!rows'][0] = { hpt: 25 };
    if (wsStrategicBets['A1']) {
      wsStrategicBets['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsStrategicBets['A2']) {
      wsStrategicBets['A2'].s = {
        font: { italics: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsStrategicBets, 'Strategic Bets');

    // Fill-Ins Tab
    const fillIns = workflows.filter(w => classifyQuadrant(w) === 'Fill-Ins');
    const fillInsData = [
      ['Open Agent School - Fill-Ins'],
      ['Generated from openagentschool.org'],
      ['Easy Wins, Lower Value - Priority: Backlog / Optional'],
      [''],
      ['Workflow', 'Value', 'Feasibility', 'Risk', 'Impact'],
      ...fillIns.map(w => [w.name, w.valueScore, w.feasibilityScore, w.riskScore, w.estimatedImpact]),
    ];
    const wsFillIns = XLSX.utils.aoa_to_sheet(fillInsData);
    
    // Style header
    if (!wsFillIns['!rows']) wsFillIns['!rows'] = [];
    wsFillIns['!rows'][0] = { hpt: 25 };
    if (wsFillIns['A1']) {
      wsFillIns['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "F59E0B" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsFillIns['A2']) {
      wsFillIns['A2'].s = {
        font: { italics: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsFillIns, 'Fill-Ins');

    // Sequencing Plan Tab
    const sequencingData = [
      ['Open Agent School - Recommended Sequencing Plan'],
      ['Generated from openagentschool.org'],
      [''],
      ['Phase', 'Timeline', 'Focus', 'Workflows'],
      ['Phase 1', '0-3 months', 'Prove Value', quickWins.map(w => w.name).join('; ')],
      ['Phase 2', '3-9 months', 'Scale Platform', strategicBets.map(w => w.name).join('; ')],
      ['Phase 3', '9-18 months', 'Transform Operating Model', 'Expand to enterprise workflows'],
      [''],
      ['Investment Envelope'],
      ['Phase 1', '$[X]', 'Pilot + Evaluation Harness'],
      ['Phase 2', '$[Y]', 'Platform + Multi-agent Orchestration'],
      ['Phase 3', '$[Z]', 'Enterprise Scale + Governance'],
    ];
    const wsSequencing = XLSX.utils.aoa_to_sheet(sequencingData);
    
    // Style header
    if (!wsSequencing['!rows']) wsSequencing['!rows'] = [];
    wsSequencing['!rows'][0] = { hpt: 25 };
    if (wsSequencing['A1']) {
      wsSequencing['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsSequencing['A2']) {
      wsSequencing['A2'].s = {
        font: { italics: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsSequencing, 'Sequencing Plan');

    // Scoring Rubrics Tab
    const rubricsData = [
      ['Open Agent School - Scoring Rubrics Reference'],
      ['Generated from openagentschool.org'],
      [''],
      ['Value Score (Business Impact)'],
      ['5', 'Transformational - Revenue growth or major cost reduction'],
      ['4', 'High - Clear ROI within 6 months'],
      ['3', 'Medium - Incremental improvement'],
      ['2', 'Low - Nice to have'],
      ['1', 'Minimal - Unclear value'],
      [''],
      ['Feasibility Score (Technical + Organizational)'],
      ['5', 'Ready - Data + APIs available, team skilled'],
      ['4', 'High - Minor gaps, quick to close'],
      ['3', 'Medium - Some data/skill gaps'],
      ['2', 'Low - Significant technical debt'],
      ['1', 'Blocked - Missing critical dependencies'],
      [''],
      ['Risk Score (Governance + Operational)'],
      ['5', 'Critical - Regulatory/safety concerns'],
      ['4', 'High - Reputational risk'],
      ['3', 'Medium - Manageable with controls'],
      ['2', 'Low - Standard risk profile'],
      ['1', 'Minimal - Safe pilot candidate'],
    ];
    const wsRubrics = XLSX.utils.aoa_to_sheet(rubricsData);
    
    // Style header
    if (!wsRubrics['!rows']) wsRubrics['!rows'] = [];
    wsRubrics['!rows'][0] = { hpt: 25 };
    if (wsRubrics['A1']) {
      wsRubrics['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "6366F1" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsRubrics['A2']) {
      wsRubrics['A2'].s = {
        font: { italics: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsRubrics, 'Scoring Rubrics');

    XLSX.writeFile(wb, 'Portfolio_Heatmap_Canvas.xlsx');
  };

  const exportToWord = async () => {
    // Require authentication for business template downloads
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to download this business planning template. It's free!",
      });
      navigate('/auth?return=/adoption/portfolio');
      return;
    }

    // Track authenticated download
    if (user?.email) {
      window.dispatchEvent(new CustomEvent('analytics:templateDownload', {
        detail: {
          template: 'Portfolio Heatmap Canvas',
          format: 'Word',
          userEmail: user.email,
          timestamp: new Date().toISOString()
        }
      }));
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
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
            text: 'Portfolio Heatmap Canvas',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: `Total Workflows: ${workflows.length}`,
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Workflow Evaluation Matrix',
            heading: HeadingLevel.HEADING_2,
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Workflow', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Value', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Feasibility', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Risk', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Quadrant', bold: true })] })] }),
                ],
              }),
              ...workflows.map(w => new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(w.name)] }),
                  new TableCell({ children: [new Paragraph(w.valueScore.toString())] }),
                  new TableCell({ children: [new Paragraph(w.feasibilityScore.toString())] }),
                  new TableCell({ children: [new Paragraph(w.riskScore.toString())] }),
                  new TableCell({ children: [new Paragraph(classifyQuadrant(w))] }),
                ],
              })),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Quick Wins (Priority 1)',
            heading: HeadingLevel.HEADING_2,
          }),
          ...workflows
            .filter(w => classifyQuadrant(w) === 'Quick Wins')
            .flatMap(w => [
              new Paragraph({ text: w.name, heading: HeadingLevel.HEADING_3 }),
              new Paragraph({ text: w.description }),
              new Paragraph({ text: `Impact: ${w.estimatedImpact}` }),
              new Paragraph({ text: `Time to Value: ${w.timeToValue}` }),
              new Paragraph({ text: '' }),
            ]),
          new Paragraph({
            text: 'Strategic Bets (Priority 2)',
            heading: HeadingLevel.HEADING_2,
          }),
          ...workflows
            .filter(w => classifyQuadrant(w) === 'Strategic Bets')
            .flatMap(w => [
              new Paragraph({ text: w.name, heading: HeadingLevel.HEADING_3 }),
              new Paragraph({ text: w.description }),
              new Paragraph({ text: `Rationale: ${w.rationale}` }),
              new Paragraph({ text: '' }),
            ]),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'Portfolio_Heatmap_Canvas.docx');
  };

  const getAIAssessment = async () => {
    setIsAssessing(true);
    setAssessment(null);
    setAssessmentScore(null);

    try {
      const response = await fetch('/api/v1/study/adoption/canvas/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          canvas: { workflows },
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
    (workflows.filter(w => w.name && w.description && w.rationale).length / Math.max(workflows.length, 3)) * 100
  );

  const quadrantCounts = {
    'Quick Wins': workflows.filter(w => classifyQuadrant(w) === 'Quick Wins').length,
    'Strategic Bets': workflows.filter(w => classifyQuadrant(w) === 'Strategic Bets').length,
    'Fill-Ins': workflows.filter(w => classifyQuadrant(w) === 'Fill-Ins').length,
    'Avoid': workflows.filter(w => classifyQuadrant(w) === 'Avoid').length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Heatmap Canvas</h1>
          <p className="text-muted-foreground mt-2">
            Map workflows against value, feasibility, and risk for strategic prioritization
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

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(quadrantCounts).map(([quadrant, count]) => (
          <Card key={quadrant} className={getQuadrantColor(quadrant as Quadrant)}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{quadrant}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workflow Evaluation Matrix</CardTitle>
              <CardDescription>Score each workflow on 3 dimensions (1-5 scale)</CardDescription>
            </div>
            <Button onClick={addWorkflow} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {workflows.map((workflow, index) => (
            <Card key={workflow.id} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Workflow Name *</Label>
                        <Input
                          value={workflow.name}
                          onChange={e => updateWorkflow(workflow.id, 'name', e.target.value)}
                          placeholder="e.g., Customer Support Tier-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getQuadrantColor(classifyQuadrant(workflow))}`}>
                          {classifyQuadrant(workflow)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Description *</Label>
                      <Textarea
                        value={workflow.description}
                        onChange={e => updateWorkflow(workflow.id, 'description', e.target.value)}
                        placeholder="Brief description of the workflow and what agents would do"
                        rows={2}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWorkflow(workflow.id)}
                    className="ml-2"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Business Value</Label>
                      <span className="text-sm font-semibold">{workflow.valueScore}/5</span>
                    </div>
                    <Slider
                      value={[workflow.valueScore]}
                      onValueChange={([val]) => updateWorkflow(workflow.id, 'valueScore', val)}
                      min={1}
                      max={5}
                      step={1}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      1=Minimal, 3=Medium, 5=Transformational
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Feasibility</Label>
                      <span className="text-sm font-semibold">{workflow.feasibilityScore}/5</span>
                    </div>
                    <Slider
                      value={[workflow.feasibilityScore]}
                      onValueChange={([val]) => updateWorkflow(workflow.id, 'feasibilityScore', val)}
                      min={1}
                      max={5}
                      step={1}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      1=Blocked, 3=Medium effort, 5=Ready now
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Risk Level</Label>
                      <span className="text-sm font-semibold">{workflow.riskScore}/5</span>
                    </div>
                    <Slider
                      value={[workflow.riskScore]}
                      onValueChange={([val]) => updateWorkflow(workflow.id, 'riskScore', val)}
                      min={1}
                      max={5}
                      step={1}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      1=Safe pilot, 3=Manageable, 5=Critical risk
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Estimated Impact</Label>
                    <Input
                      value={workflow.estimatedImpact}
                      onChange={e => updateWorkflow(workflow.id, 'estimatedImpact', e.target.value)}
                      placeholder="e.g., $500K annual savings"
                    />
                  </div>
                  <div>
                    <Label>Time to Value</Label>
                    <Input
                      value={workflow.timeToValue}
                      onChange={e => updateWorkflow(workflow.id, 'timeToValue', e.target.value)}
                      placeholder="e.g., 3 months"
                    />
                  </div>
                  <div></div>
                </div>

                <div>
                  <Label>Rationale *</Label>
                  <Textarea
                    value={workflow.rationale}
                    onChange={e => updateWorkflow(workflow.id, 'rationale', e.target.value)}
                    placeholder="Why this workflow? What makes it strategic? What are the success criteria?"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {workflows.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No workflows yet. Click "Add Workflow" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Assessment
          </CardTitle>
          <CardDescription>
            Get AI-powered feedback on your portfolio's prioritization rigor and strategic balance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={getAIAssessment}
            disabled={isAssessing || workflows.length < 3}
            className="w-full"
            size="lg"
          >
            {isAssessing ? (
              'Analyzing Portfolio...'
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Assessment
              </>
            )}
          </Button>

          {workflows.length < 3 && (
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Add at least 3 workflows to receive AI assessment
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

export default PortfolioHeatmapCanvasForm;
