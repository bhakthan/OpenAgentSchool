import React from 'react';

export const MicroCtaRibbon: React.FC = () => {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const hideOnCTA = () => { if (window.location.pathname === '/cta' || window.location.pathname === '/cta-alt') setVisible(false); };
    hideOnCTA();
    window.addEventListener('popstate', hideOnCTA);
    return () => window.removeEventListener('popstate', hideOnCTA);
  }, []);
  if (!visible) return null;
  return (
    <div className="micro-cta-ribbon">
      <span className="hidden sm:inline">Architect → Evaluate → Operationalize</span>
      <button
        className="cta-btn"
        onClick={() => {
          try { window.dispatchEvent(new CustomEvent('analytics:ctaClick',{ detail:{ tier:'ribbon', source:'micro-ribbon'} })); } catch {}
          window.location.href = '/cta';
        }}
      >Get Clarity</button>
      <button className="dismiss-btn" aria-label="Dismiss" onClick={() => setVisible(false)}>×</button>
    </div>
  );
};

export default MicroCtaRibbon;
