import React from 'react'
import DeepDiveAgenticAITaxonomyTree from "../concepts/DeepDiveAgenticAITaxonomyTree"

export default function DeepDiveTaxonomyPage() {
  // Full-viewport page specifically for the heavy deep-dive visualization
  return (
    <div className="min-h-screen w-screen bg-background text-foreground p-4">
      <div className="max-w-[96vw] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">Deep Dive: Agentic AI Taxonomy</h1>
          <a href="/" className="text-sm underline opacity-80 hover:opacity-100">Back to Home</a>
        </div>
        <div className="h-[84vh] w-full overflow-auto rounded-lg border">
          <div className="p-2">
            <DeepDiveAgenticAITaxonomyTree height={Math.floor(window.innerHeight * 0.80)} autoFitOnMount />
          </div>
        </div>
      </div>
    </div>
  )
}
