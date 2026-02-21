import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { APISettingsForm } from './APISettingsForm';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsSheet: React.FC<SettingsSheetProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl p-0">
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle>API Settings</SheetTitle>
          <SheetDescription>
            Bring Your Own Keys — configure LLM providers and services.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] px-6 pb-6">
          <APISettingsForm compact onSaved={() => onOpenChange(false)} />
          <div className="pt-4 pb-2">
            <Link
              to="/settings"
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Full Settings Page <ArrowRight size={12} />
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
