import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MagnifyingGlass, FileSql, Key, ListChecks } from '@phosphor-icons/react';

export const QueryIntentAccessVisual: React.FC = () => (
  <Card className="bg-muted/30 border-dashed">
    <CardContent className="p-4 space-y-3 text-xs">
      <div className="flex items-center gap-2 font-semibold text-primary"><MagnifyingGlass size={18}/> Query Intent → Access Plan</div>
      <ol className="list-decimal ml-4 space-y-1">
        <li>Intent classify</li>
        <li className="flex items-center gap-1">Entity bind <FileSql size={12}/></li>
        <li className="flex items-center gap-1">Param validate <ListChecks size={12}/></li>
        <li className="flex items-center gap-1">Access policy check <Key size={12}/></li>
        <li>Emit structured plan</li>
      </ol>
    </CardContent>
  </Card>
);
