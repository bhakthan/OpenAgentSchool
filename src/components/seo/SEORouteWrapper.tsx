import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEO, pageSEOConfigs } from './SEO';

interface SEORouteWrapperProps {
  children: React.ReactNode;
}

export const SEORouteWrapper: React.FC<SEORouteWrapperProps> = ({ children }) => {
  const location = useLocation();
  const pathKey = location.pathname as keyof typeof pageSEOConfigs;
  const seoConfig = pageSEOConfigs[pathKey] || pageSEOConfigs['/'];

  return (
    <>
      <SEO {...seoConfig} />
      {children}
    </>
  );
};
