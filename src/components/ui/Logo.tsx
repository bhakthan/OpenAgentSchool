import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  className = '' 
}) => {
  const sizeConfig = {
    small: { width: 32, height: 38, textSize: 'text-lg', logoGap: 'gap-2' },
    medium: { width: 48, height: 58, textSize: 'text-2xl', logoGap: 'gap-3' },
    large: { width: 64, height: 77, textSize: 'text-3xl', logoGap: 'gap-4' },
    hero: { width: 120, height: 144, textSize: 'text-5xl', logoGap: 'gap-6' }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${config.logoGap} ${className}`}>
      {/* SVG Logo */}
      <div className="relative">
        <svg 
          width={config.width} 
          height={config.height} 
          viewBox="0 0 200 240" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          <defs>
            <style>
              {`.ms-red { fill: #F25022; }
               .ms-green { fill: #7FBA00; }
               .ms-blue { fill: #00A4EF; }
               .ms-yellow { fill: #FFB900; }
               .ladder-support { fill: #2B2B2B; stroke: #1A1A1A; stroke-width: 2; }
               .rung-shadow { fill: rgba(0,0,0,0.1); }`}
            </style>
          </defs>
          
          {/* Ladder Supports (Vertical Rails) */}
          <rect x="60" y="20" width="12" height="200" rx="6" className="ladder-support"/>
          <rect x="128" y="20" width="12" height="200" rx="6" className="ladder-support"/>
          
          {/* Rung Shadows (for depth) */}
          <rect x="65" y="52" width="78" height="8" rx="4" className="rung-shadow"/>
          <rect x="65" y="92" width="78" height="8" rx="4" className="rung-shadow"/>
          <rect x="65" y="132" width="78" height="8" rx="4" className="rung-shadow"/>
          <rect x="65" y="172" width="78" height="8" rx="4" className="rung-shadow"/>
          
          {/* Microsoft Colored Rungs */}
          <rect x="62" y="50" width="78" height="8" rx="4" className="ms-red"/>
          <circle cx="71" cy="54" r="3" fill="#FFFFFF" opacity="0.3"/>
          
          <rect x="62" y="90" width="78" height="8" rx="4" className="ms-green"/>
          <circle cx="71" cy="94" r="3" fill="#FFFFFF" opacity="0.3"/>
          
          <rect x="62" y="130" width="78" height="8" rx="4" className="ms-blue"/>
          <circle cx="71" cy="134" r="3" fill="#FFFFFF" opacity="0.3"/>
          
          <rect x="62" y="170" width="78" height="8" rx="4" className="ms-yellow"/>
          <circle cx="71" cy="174" r="3" fill="#FFFFFF" opacity="0.3"/>
          
          {/* Learning Path Indicators */}
          <path d="M 100 45 Q 110 65 100 85" stroke="#00A4EF" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="3,3"/>
          <path d="M 100 85 Q 90 105 100 125" stroke="#7FBA00" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="3,3"/>
          <path d="M 100 125 Q 110 145 100 165" stroke="#FFB900" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="3,3"/>
          
          {/* Progress Arrows */}
          <polygon points="150,55 160,50 160,60" className="ms-red" opacity="0.6"/>
          <polygon points="150,95 160,90 160,100" className="ms-green" opacity="0.6"/>
          <polygon points="150,135 160,130 160,140" className="ms-blue" opacity="0.6"/>
          <polygon points="150,175 160,170 160,180" className="ms-yellow" opacity="0.6"/>
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${config.textSize} font-bold text-foreground leading-tight`}>
            Open Agent School
          </h1>
          {size === 'hero' ? (
            <p className="text-lg text-muted-foreground font-medium">
              Where AI Agent Concepts Come to Life
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Agentic Learning for everyone
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
