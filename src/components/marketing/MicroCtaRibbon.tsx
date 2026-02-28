import React from 'react';
import { trackEvent } from '@/lib/analytics/ga';

export const MicroCtaRibbon: React.FC = () => {
  const [visible, setVisible] = React.useState(true);
  
  React.useEffect(() => {
    const hideOnCTA = () => { if (window.location.pathname === '/cta' || window.location.pathname === '/cta-alt') setVisible(false); };
    hideOnCTA();
    window.addEventListener('popstate', hideOnCTA);
    return () => window.removeEventListener('popstate', hideOnCTA);
  }, []);

  // Auto-dismiss after 4 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) return null;
  return (
    <div className="micro-cta-ribbon">
      <span className="hidden sm:inline">Architect → Evaluate → Operationalize</span>
      <button
        className="cta-btn"
        onClick={() => {
          trackEvent({ action: 'cta_click', category: 'marketing', label: 'micro-ribbon' });
          try { window.dispatchEvent(new CustomEvent('analytics:ctaClick',{ detail:{ tier:'ribbon', source:'micro-ribbon'} })); } catch {}
          window.location.href = '/cta';
        }}
      >Get Clarity</button>
      <button className="dismiss-btn" aria-label="Dismiss" onClick={() => setVisible(false)}>×</button>
    </div>
  );
};

export default MicroCtaRibbon;
