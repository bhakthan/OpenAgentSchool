import React from 'react'
import StaticSVGTaxonomyTree from "../concepts/StaticSVGTaxonomyTree"

export default function DeepDiveTaxonomyPage() {
  // Full-viewport page specifically for the heavy deep-dive visualization
  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">Deep Dive: Agentic AI Taxonomy</h1>
          <a href="/" className="text-sm underline opacity-80 hover:opacity-100">Back to Home</a>
        </div>
        <div className="flex-1 overflow-hidden">
          <StaticSVGTaxonomyTree />
        </div>
      </div>
    </div>
  )
}
