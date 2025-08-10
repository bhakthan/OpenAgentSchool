import React from 'react';

interface LadderIconProps {
  size?: number;
  className?: string;
}

const LadderIcon: React.FC<LadderIconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`inline-block ${className}`}>
    <defs>
      <style>
        {`.ms-red { fill: #F25022; }
         .ms-green { fill: #7FBA00; }
         .ms-blue { fill: #00A4EF; }
         .ms-yellow { fill: #FFB900; }
         .support { fill: currentColor; }`}
      </style>
    </defs>
    
    <rect x="3" y="2" width="1.5" height="12" rx="0.75" className="support"/>
    <rect x="11.5" y="2" width="1.5" height="12" rx="0.75" className="support"/>
    
    <rect x="3.5" y="4" width="9" height="1.5" rx="0.75" className="ms-red"/>
    <rect x="3.5" y="7" width="9" height="1.5" rx="0.75" className="ms-green"/>
    <rect x="3.5" y="10" width="9" height="1.5" rx="0.75" className="ms-blue"/>
    <rect x="3.5" y="13" width="9" height="1.5" rx="0.75" className="ms-yellow"/>
  </svg>
);

export { LadderIcon };
export default LadderIcon;
