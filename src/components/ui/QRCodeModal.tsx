import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ArrowSquareOut } from '@phosphor-icons/react';

interface QRCodeModalProps {
  children: React.ReactNode;
  url: string;
  title?: string;
  description?: string;
  qrCodeSrc: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  children,
  url,
  title = "Scan QR Code",
  description = "Scan with your mobile device or click to open directly",
  qrCodeSrc
}) => {
  const [open, setOpen] = useState(false);

  const handleDirectOpen = () => {
    window.open(url, '_blank');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          {/* Large QR Code for scanning */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <img 
              src={qrCodeSrc}
              alt="QR Code" 
              className="w-48 h-48 sm:w-56 sm:h-56"
            />
          </div>
          
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            {description}
          </p>
          
          {/* Action buttons */}
          <div className="flex gap-2 w-full">
            <Button 
              onClick={handleDirectOpen}
              className="flex-1 flex items-center gap-2"
            >
              <ArrowSquareOut size={16} />
              Open Directly
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
