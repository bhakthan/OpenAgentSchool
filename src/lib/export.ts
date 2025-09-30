/**
 * Export Utilities
 * Functions to export concepts to PDF and Markdown
 */

import { trackEvent } from '@/lib/analytics/ga';
import { toast } from 'sonner';

// Dynamic import for jsPDF (lazy loaded)
const loadJsPDF = async () => {
  const { default: jsPDF } = await import('jspdf');
  return jsPDF;
};

export interface ExportContent {
  title: string;
  description?: string;
  content: string; // Markdown or HTML
  tags?: string[];
  category?: string;
}

/**
 * Export content to PDF
 */
export async function exportToPDF(data: ExportContent): Promise<void> {
  try {
    const jsPDF = await loadJsPDF();
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    
    let yPosition = margin;
    
    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(data.title, margin, yPosition);
    yPosition += 15;
    
    // Category badge
    if (data.category) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`Category: ${data.category}`, margin, yPosition);
      yPosition += 10;
    }
    
    // Description
    if (data.description) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const descLines = doc.splitTextToSize(data.description, maxWidth);
      doc.text(descLines, margin, yPosition);
      yPosition += descLines.length * 7 + 10;
    }
    
    // Separator
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    
    // Content
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Strip HTML tags and convert to plain text
    const plainText = data.content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
    
    const contentLines = doc.splitTextToSize(plainText, maxWidth);
    
    // Paginate content
    contentLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });
    
    // Tags footer
    if (data.tags && data.tags.length > 0) {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }
      
      yPosition += 10;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Tags: ${data.tags.join(', ')}`, margin, yPosition);
    }
    
    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Open Agent School - Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }
    
    // Save
    const filename = `${data.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    doc.save(filename);
    
    toast.success('PDF downloaded successfully!');
    
    trackEvent({
      action: 'export_pdf',
      category: 'engagement',
      label: data.title,
    });
  } catch (error) {
    console.error('Failed to export PDF:', error);
    toast.error('Failed to export PDF');
  }
}

/**
 * Export content to Markdown
 */
export function exportToMarkdown(data: ExportContent): void {
  try {
    let markdown = `# ${data.title}\n\n`;
    
    if (data.category) {
      markdown += `**Category:** ${data.category}\n\n`;
    }
    
    if (data.description) {
      markdown += `${data.description}\n\n`;
    }
    
    markdown += `---\n\n`;
    markdown += `${data.content}\n\n`;
    
    if (data.tags && data.tags.length > 0) {
      markdown += `\n---\n\n`;
      markdown += `**Tags:** ${data.tags.join(', ')}\n`;
    }
    
    markdown += `\n---\n\n`;
    markdown += `*Exported from [Open Agent School](https://openagentschool.org)*\n`;
    
    // Create blob and download
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Markdown downloaded successfully!');
    
    trackEvent({
      action: 'export_markdown',
      category: 'engagement',
      label: data.title,
    });
  } catch (error) {
    console.error('Failed to export Markdown:', error);
    toast.error('Failed to export Markdown');
  }
}
