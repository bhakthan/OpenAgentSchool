/**
 * Export Button Component
 * Dropdown menu for exporting content to PDF or Markdown
 */

import { Download } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToPDF, exportToMarkdown, ExportContent } from '@/lib/export';

interface ExportButtonProps {
  content: ExportContent;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

export function ExportButton({
  content,
  variant = 'ghost',
  size = 'icon',
  showLabel = false,
  className = '',
}: ExportButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          aria-label="Export"
          title="Export"
        >
          <Download className="w-5 h-5" />
          {showLabel && <span className="ml-2">Export</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => exportToPDF(content)}>
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToMarkdown(content)}>
          Export as Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
