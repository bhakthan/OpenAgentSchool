import React from 'react';
import { SEO, pageSEOConfigs } from '@/components/seo/SEO';
import ValueMapSunburst from '@/components/visualization/ValueMapSunburst';

export default function ValueMapPage() {
  return (
    <>
      <SEO {...pageSEOConfigs['/value-map']} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <ValueMapSunburst />
        </div>
      </div>
    </>
  );
}
