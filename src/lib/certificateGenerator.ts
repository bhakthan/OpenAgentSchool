/**
 * Certificate Generator — Uses jsPDF to create downloadable skill certificates
 */
import jsPDF from 'jspdf';

export function generateCertificateId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = [4, 4, 4];
  return segments
    .map(len =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    )
    .join('-');
}

export function generateCertificatePDF(
  learnerName: string,
  skillName: string,
  dateEarned: string,
  certificateId: string
): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Border
  doc.setDrawColor(59, 130, 246); // blue-500
  doc.setLineWidth(2);
  doc.rect(10, 10, w - 20, h - 20);
  doc.setLineWidth(0.5);
  doc.rect(14, 14, w - 28, h - 28);

  // Header
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('OPEN AGENT SCHOOL', w / 2, 35, { align: 'center' });

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(30, 30, 30);
  doc.text('Certificate of Achievement', w / 2, 55, { align: 'center' });

  // Decorative line
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(1);
  doc.line(w / 2 - 60, 62, w / 2 + 60, 62);

  // Body text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text('This is to certify that', w / 2, 80, { align: 'center' });

  // Learner name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(30, 30, 30);
  doc.text(learnerName, w / 2, 95, { align: 'center' });

  // Skill
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text('has successfully demonstrated proficiency in', w / 2, 110, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(59, 130, 246);
  doc.text(skillName, w / 2, 125, { align: 'center' });

  // Date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Awarded on ${dateEarned}`, w / 2, 145, { align: 'center' });

  // Certificate ID
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Certificate ID: ${certificateId}`, w / 2, 175, { align: 'center' });

  // Footer
  doc.setFontSize(9);
  doc.text('openagentschool.org', w / 2, 185, { align: 'center' });

  doc.save(`OAS-Certificate-${skillName.replace(/\s+/g, '-')}.pdf`);
}
