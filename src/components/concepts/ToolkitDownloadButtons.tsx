import React from 'react';
import { Button } from '@/components/ui/button';
import { DownloadSimple, Table } from '@phosphor-icons/react';

interface ToolkitDownloadButtonsProps {
  baseName: string;
  markdownLabel: string;
  excelLabel?: string;
}

export const ToolkitDownloadButtons: React.FC<ToolkitDownloadButtonsProps> = ({
  baseName,
  markdownLabel,
  excelLabel = 'Download Excel Template',
}) => {
  const markdownHref = `/toolkits/${baseName}.md`;
  const excelHref = `/toolkits/${baseName}.xlsx`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild variant="outline" size="sm" className="gap-2">
        <a href={markdownHref} download={`${baseName}.md`}>
          <DownloadSimple size={16} />
          <span>{markdownLabel}</span>
        </a>
      </Button>
      <Button asChild variant="secondary" size="sm" className="gap-2">
        <a href={excelHref} download={`${baseName}.xlsx`}>
          <Table size={16} />
          <span>{excelLabel}</span>
        </a>
      </Button>
    </div>
  );
};

export default ToolkitDownloadButtons;









