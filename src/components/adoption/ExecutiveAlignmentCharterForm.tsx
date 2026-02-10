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
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
// file-saver is dynamically imported at usage to reduce initial bundle

interface CharterFormData {
  // Document Control
  organizationName: string;
  documentDate: string;
  version: string;
  owner: string;

  // Executive Summary
  ambitionStatement: string;
  
  // Value Narratives
  customerValue: string;
  employeeValue: string;
  businessValue: string;
  regulatoryValue: string;

  // Strategic Priorities
  priority1: string;
  priority2: string;
  priority3: string;

  // Risk Posture
  riskAppetite: string;
  guardrails: string;

  // Governance
  governanceModel: string;
  decisionAuthority: string;

  // Funding
  fundingModel: string;
  stageGates: string;

  // Success Metrics
  northStar: string;
  leadingIndicators: string;
  laggingIndicators: string;

  // Cultural Commitments
  culturalCommitments: string;

  // Communication Plan
  communicationPlan: string;
}

export function ExecutiveAlignmentCharterForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<CharterFormData>({
    organizationName: '',
    documentDate: new Date().toISOString().split('T')[0],
    version: '1.0',
    owner: '',
    ambitionStatement: '',
    customerValue: '',
    employeeValue: '',
    businessValue: '',
    regulatoryValue: '',
    priority1: '',
    priority2: '',
    priority3: '',
    riskAppetite: '',
    guardrails: '',
    governanceModel: '',
    decisionAuthority: '',
    fundingModel: '',
    stageGates: '',
    northStar: '',
    leadingIndicators: '',
    laggingIndicators: '',
    culturalCommitments: '',
    communicationPlan: '',
  });

  const [isAssessing, setIsAssessing] = useState(false);
  const [assessment, setAssessment] = useState<string | null>(null);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  const handleInputChange = (field: keyof CharterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const exportToExcel = () => {
    // Require authentication for business template downloads
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to download this executive alignment charter. It's free!",
      });
      navigate('/auth?return=/adoption/executive-alignment');
      return;
    }

    // Track authenticated download
    if (user?.email) {
      window.dispatchEvent(new CustomEvent('analytics:templateDownload', {
        detail: {
          template: 'Executive Alignment Charter',
          format: 'Excel',
          userEmail: user.email,
          timestamp: new Date().toISOString()
        }
      }));
    }

    const wb = XLSX.utils.book_new();

    // Overview Tab
    const overviewData = [
      ['Open Agent School - Executive Alignment Charter'],
      ['Generated from openagentschool.org'],
      [''],
      ['Organization', formData.organizationName],
      ['Date', formData.documentDate],
      ['Version', formData.version],
      ['Owner', formData.owner],
      [''],
      ['Ambition Statement'],
      [formData.ambitionStatement],
    ];
    const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
    
    // Style the header row
    if (!wsOverview['!rows']) wsOverview['!rows'] = [];
    wsOverview['!rows'][0] = { hpt: 25 }; // Height
    if (wsOverview['A1']) {
      wsOverview['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsOverview['A2']) {
      wsOverview['A2'].s = {
        font: { italic: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsOverview, 'Overview');

    // Value Narratives Tab
    const valueData = [
      ['Open Agent School - Value Narratives'],
      ['Generated from openagentschool.org'],
      [''],
      ['Customer Value'],
      [formData.customerValue],
      [''],
      ['Employee Value'],
      [formData.employeeValue],
      [''],
      ['Business Value'],
      [formData.businessValue],
      [''],
      ['Regulatory Value'],
      [formData.regulatoryValue],
    ];
    const wsValue = XLSX.utils.aoa_to_sheet(valueData);
    
    // Style header
    if (!wsValue['!rows']) wsValue['!rows'] = [];
    wsValue['!rows'][0] = { hpt: 25 };
    if (wsValue['A1']) {
      wsValue['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsValue['A2']) {
      wsValue['A2'].s = {
        font: { italic: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsValue, 'Value Narratives');

    // Strategic Priorities Tab
    const prioritiesData = [
      ['Open Agent School - Strategic Priorities'],
      ['Generated from openagentschool.org'],
      [''],
      ['Priority 1'],
      [formData.priority1],
      [''],
      ['Priority 2'],
      [formData.priority2],
      [''],
      ['Priority 3'],
      [formData.priority3],
    ];
    const wsPriorities = XLSX.utils.aoa_to_sheet(prioritiesData);
    
    // Style header
    if (!wsPriorities['!rows']) wsPriorities['!rows'] = [];
    wsPriorities['!rows'][0] = { hpt: 25 };
    if (wsPriorities['A1']) {
      wsPriorities['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsPriorities['A2']) {
      wsPriorities['A2'].s = {
        font: { italic: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsPriorities, 'Strategic Priorities');

    // Risk & Governance Tab
    const riskData = [
      ['Open Agent School - Risk & Governance'],
      ['Generated from openagentschool.org'],
      [''],
      ['Risk Appetite'],
      [formData.riskAppetite],
      [''],
      ['Guardrails'],
      [formData.guardrails],
      [''],
      ['Governance Model'],
      [formData.governanceModel],
      [''],
      ['Decision Authority'],
      [formData.decisionAuthority],
    ];
    const wsRisk = XLSX.utils.aoa_to_sheet(riskData);
    
    // Style header
    if (!wsRisk['!rows']) wsRisk['!rows'] = [];
    wsRisk['!rows'][0] = { hpt: 25 };
    if (wsRisk['A1']) {
      wsRisk['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsRisk['A2']) {
      wsRisk['A2'].s = {
        font: { italic: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsRisk, 'Risk & Governance');

    // Funding & Metrics Tab
    const fundingData = [
      ['Open Agent School - Funding & Metrics'],
      ['Generated from openagentschool.org'],
      [''],
      ['Funding Model'],
      [formData.fundingModel],
      [''],
      ['Stage Gates'],
      [formData.stageGates],
      [''],
      ['North Star Metric'],
      [formData.northStar],
      [''],
      ['Leading Indicators'],
      [formData.leadingIndicators],
      [''],
      ['Lagging Indicators'],
      [formData.laggingIndicators],
    ];
    const wsFunding = XLSX.utils.aoa_to_sheet(fundingData);
    
    // Style header
    if (!wsFunding['!rows']) wsFunding['!rows'] = [];
    wsFunding['!rows'][0] = { hpt: 25 };
    if (wsFunding['A1']) {
      wsFunding['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsFunding['A2']) {
      wsFunding['A2'].s = {
        font: { italic: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsFunding, 'Funding & Metrics');

    // Culture & Communication Tab
    const cultureData = [
      ['Open Agent School - Culture & Communications'],
      ['Generated from openagentschool.org'],
      [''],
      ['Cultural Commitments'],
      [formData.culturalCommitments],
      [''],
      ['Communication Plan'],
      [formData.communicationPlan],
    ];
    const wsCulture = XLSX.utils.aoa_to_sheet(cultureData);
    
    // Style header
    if (!wsCulture['!rows']) wsCulture['!rows'] = [];
    wsCulture['!rows'][0] = { hpt: 25 };
    if (wsCulture['A1']) {
      wsCulture['A1'].s = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "3B82F6" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    if (wsCulture['A2']) {
      wsCulture['A2'].s = {
        font: { italic: true, sz: 10, color: { rgb: "6B7280" } },
        alignment: { horizontal: "center" }
      };
    }
    
    XLSX.utils.book_append_sheet(wb, wsCulture, 'Culture & Comms');

    XLSX.writeFile(wb, `Executive_Alignment_Charter_${formData.organizationName.replace(/\s/g, '_')}.xlsx`);
  };

  const exportToWord = async () => {
    // Require authentication for business template downloads
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to download this executive alignment charter. It's free!",
      });
      navigate('/auth?return=/adoption/executive-alignment');
      return;
    }

    // Track authenticated download
    if (user?.email) {
      window.dispatchEvent(new CustomEvent('analytics:templateDownload', {
        detail: {
          template: 'Executive Alignment Charter',
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
            text: 'Executive Alignment Charter',
            heading: HeadingLevel.HEADING_1,
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
              new TextRun({ text: 'Date: ', bold: true }),
              new TextRun(formData.documentDate),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Version: ', bold: true }),
              new TextRun(formData.version),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Owner: ', bold: true }),
              new TextRun(formData.owner),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Ambition Statement',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({ text: formData.ambitionStatement }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Value Narratives',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: 'Customer Value',
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({ text: formData.customerValue }),
          new Paragraph({
            text: 'Employee Value',
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({ text: formData.employeeValue }),
          new Paragraph({
            text: 'Business Value',
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({ text: formData.businessValue }),
          new Paragraph({
            text: 'Regulatory Value',
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({ text: formData.regulatoryValue }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Strategic Priorities',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({ text: `1. ${formData.priority1}` }),
          new Paragraph({ text: `2. ${formData.priority2}` }),
          new Paragraph({ text: `3. ${formData.priority3}` }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Risk Posture',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Risk Appetite: ', bold: true }),
              new TextRun(formData.riskAppetite),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Guardrails: ', bold: true }),
              new TextRun(formData.guardrails),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Governance Structure',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Model: ', bold: true }),
              new TextRun(formData.governanceModel),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Decision Authority: ', bold: true }),
              new TextRun(formData.decisionAuthority),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Funding Model',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({ text: formData.fundingModel }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Stage Gates: ', bold: true }),
              new TextRun(formData.stageGates),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Success Metrics',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'North Star: ', bold: true }),
              new TextRun(formData.northStar),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Leading Indicators: ', bold: true }),
              new TextRun(formData.leadingIndicators),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Lagging Indicators: ', bold: true }),
              new TextRun(formData.laggingIndicators),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Cultural Commitments',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({ text: formData.culturalCommitments }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Communication Plan',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({ text: formData.communicationPlan }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const { saveAs } = await import('file-saver');
    saveAs(blob, `Executive_Alignment_Charter_${formData.organizationName.replace(/\s/g, '_')}.docx`);
  };

  const getAIAssessment = async () => {
    setIsAssessing(true);
    setAssessment(null);
    setAssessmentScore(null);

    try {
      const response = await fetch('/api/v1/study/adoption/charter/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          charter: formData,
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
    (Object.values(formData).filter(v => v.trim() !== '').length / Object.keys(formData).length) * 100
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Executive Alignment Charter</h1>
          <p className="text-muted-foreground mt-2">
            Define your organization's agentic AI adoption strategy with AI-powered assessment
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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="value">Value</TabsTrigger>
          <TabsTrigger value="priorities">Priorities</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Document Control & Ambition</CardTitle>
              <CardDescription>Basic information and strategic ambition statement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgName">Organization Name *</Label>
                  <Input
                    id="orgName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    placeholder="Acme Corporation"
                  />
                </div>
                <div>
                  <Label htmlFor="owner">Charter Owner *</Label>
                  <Input
                    id="owner"
                    value={formData.owner}
                    onChange={(e) => handleInputChange('owner', e.target.value)}
                    placeholder="Chief AI Officer"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.documentDate}
                    onChange={(e) => handleInputChange('documentDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => handleInputChange('version', e.target.value)}
                    placeholder="1.0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ambition">Strategic Ambition Statement *</Label>
                <Textarea
                  id="ambition"
                  value={formData.ambitionStatement}
                  onChange={(e) => handleInputChange('ambitionStatement', e.target.value)}
                  placeholder="Our ambition is to... (1-2 sentences that capture why agentic AI matters to our organization)"
                  rows={4}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Example: "Transform customer service from cost center to revenue driver while improving satisfaction by 40%"
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="value">
          <Card>
            <CardHeader>
              <CardTitle>Value Narratives</CardTitle>
              <CardDescription>Define value across four stakeholder perspectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customerValue">Customer Value *</Label>
                <Textarea
                  id="customerValue"
                  value={formData.customerValue}
                  onChange={(e) => handleInputChange('customerValue', e.target.value)}
                  placeholder="How will agentic AI improve customer experience, satisfaction, or outcomes?"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="employeeValue">Employee Value *</Label>
                <Textarea
                  id="employeeValue"
                  value={formData.employeeValue}
                  onChange={(e) => handleInputChange('employeeValue', e.target.value)}
                  placeholder="How will agents augment employee capabilities, reduce toil, or enable growth?"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="businessValue">Business Value *</Label>
                <Textarea
                  id="businessValue"
                  value={formData.businessValue}
                  onChange={(e) => handleInputChange('businessValue', e.target.value)}
                  placeholder="Revenue growth, cost savings, market share, or operational efficiency gains?"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="regulatoryValue">Regulatory/Trust Value *</Label>
                <Textarea
                  id="regulatoryValue"
                  value={formData.regulatoryValue}
                  onChange={(e) => handleInputChange('regulatoryValue', e.target.value)}
                  placeholder="Compliance enablement, risk mitigation, audit transparency, or trust building?"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="priorities">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Priorities</CardTitle>
              <CardDescription>Top 3 strategic priorities for agentic AI adoption</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="priority1">Priority 1 *</Label>
                <Textarea
                  id="priority1"
                  value={formData.priority1}
                  onChange={(e) => handleInputChange('priority1', e.target.value)}
                  placeholder="e.g., Transform customer service with 24/7 intelligent support"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="priority2">Priority 2 *</Label>
                <Textarea
                  id="priority2"
                  value={formData.priority2}
                  onChange={(e) => handleInputChange('priority2', e.target.value)}
                  placeholder="e.g., Accelerate sales cycles through AI-powered insights"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="priority3">Priority 3 *</Label>
                <Textarea
                  id="priority3"
                  value={formData.priority3}
                  onChange={(e) => handleInputChange('priority3', e.target.value)}
                  placeholder="e.g., Automate compliance monitoring and reporting"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Risk Posture & Guardrails</CardTitle>
              <CardDescription>Define acceptable risk levels and safety boundaries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="riskAppetite">Risk Appetite *</Label>
                <Textarea
                  id="riskAppetite"
                  value={formData.riskAppetite}
                  onChange={(e) => handleInputChange('riskAppetite', e.target.value)}
                  placeholder="e.g., Conservative: Pilot on non-revenue-impacting workflows first | Moderate: Balance innovation with controls | Aggressive: Move fast with built-in safety"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="guardrails">Trust Guardrails *</Label>
                <Textarea
                  id="guardrails"
                  value={formData.guardrails}
                  onChange={(e) => handleInputChange('guardrails', e.target.value)}
                  placeholder="e.g., No agents with access to financial systems without dual approval; PII detection mandatory; Human-in-loop for high-risk actions"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance">
          <Card>
            <CardHeader>
              <CardTitle>Governance & Funding</CardTitle>
              <CardDescription>Decision-making structure and investment framework</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="governanceModel">Governance Model *</Label>
                <Textarea
                  id="governanceModel"
                  value={formData.governanceModel}
                  onChange={(e) => handleInputChange('governanceModel', e.target.value)}
                  placeholder="e.g., Adoption Council (CEO, CTO, CFO, Chief Risk Officer) meets bi-weekly; Business unit leads propose initiatives"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="decisionAuthority">Decision Authority Matrix *</Label>
                <Textarea
                  id="decisionAuthority"
                  value={formData.decisionAuthority}
                  onChange={(e) => handleInputChange('decisionAuthority', e.target.value)}
                  placeholder="e.g., <$250K: Adoption Council | $250K-$1M: CEO + CFO | >$1M or high-risk: Board approval"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="fundingModel">Funding Model *</Label>
                <Textarea
                  id="fundingModel"
                  value={formData.fundingModel}
                  onChange={(e) => handleInputChange('fundingModel', e.target.value)}
                  placeholder="e.g., Centralized innovation budget | Business unit co-funding | Stage-gated releases"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="stageGates">Stage Gates *</Label>
                <Textarea
                  id="stageGates"
                  value={formData.stageGates}
                  onChange={(e) => handleInputChange('stageGates', e.target.value)}
                  placeholder="e.g., Gate 1 (Month 3): Release Phase 2 if pilots achieve X% containment | Gate 2 (Month 9): Scale if Y workflows show Z ROI"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Success Metrics Dashboard</CardTitle>
              <CardDescription>North star and supporting indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="northStar">North Star Metric *</Label>
                <Textarea
                  id="northStar"
                  value={formData.northStar}
                  onChange={(e) => handleInputChange('northStar', e.target.value)}
                  placeholder="e.g., Customer lifetime value increase of 25% | Cost per transaction reduction of 40%"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="leadingIndicators">Leading Indicators *</Label>
                <Textarea
                  id="leadingIndicators"
                  value={formData.leadingIndicators}
                  onChange={(e) => handleInputChange('leadingIndicators', e.target.value)}
                  placeholder="e.g., Agent containment rate, time-to-resolution, user adoption rate, feedback scores"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="laggingIndicators">Lagging Indicators *</Label>
                <Textarea
                  id="laggingIndicators"
                  value={formData.laggingIndicators}
                  onChange={(e) => handleInputChange('laggingIndicators', e.target.value)}
                  placeholder="e.g., NPS, revenue impact, cost savings, employee satisfaction, compliance incidents"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture">
          <Card>
            <CardHeader>
              <CardTitle>Cultural Commitments & Communication</CardTitle>
              <CardDescription>Change enablement and stakeholder engagement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="culturalCommitments">Cultural Commitments *</Label>
                <Textarea
                  id="culturalCommitments"
                  value={formData.culturalCommitments}
                  onChange={(e) => handleInputChange('culturalCommitments', e.target.value)}
                  placeholder="e.g., No layoffs from agent adoption; Invest in upskilling; Transparent communication; Human judgment always valued"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="communicationPlan">Communication Plan *</Label>
                <Textarea
                  id="communicationPlan"
                  value={formData.communicationPlan}
                  onChange={(e) => handleInputChange('communicationPlan', e.target.value)}
                  placeholder="e.g., Monthly town halls; Weekly Slack updates; Quarterly board briefings; Feedback loops with frontline teams"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Assessment
          </CardTitle>
          <CardDescription>
            Get AI-powered feedback on your charter's completeness, strategic alignment, and practical viability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={getAIAssessment}
            disabled={isAssessing || completionPercentage < 50}
            className="w-full"
            size="lg"
          >
            {isAssessing ? (
              'Analyzing Charter...'
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Assessment
              </>
            )}
          </Button>

          {completionPercentage < 50 && (
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Complete at least 50% of the charter to receive AI assessment
              </AlertDescription>
            </Alert>
          )}

          {assessment && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold">
                  Assessment Score: {assessmentScore}/100
                </span>
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

export default ExecutiveAlignmentCharterForm;
