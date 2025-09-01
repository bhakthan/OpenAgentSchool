import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

function guessBackendBase(): string[] {
  const origin = window.location.origin
  const hrefs: string[] = []
  // prefer env-configured core API when provided (supports split repos/backends)
  const envCore = (import.meta as any)?.env?.VITE_CORE_API_URL as string | undefined
  if (envCore) hrefs.push(envCore)
  // same-origin (works when frontend is reverse-proxying backend)
  hrefs.push(origin)
  // localhost:8000 as fallback for dev
  try {
    const url = new URL(origin)
    hrefs.push(`${url.protocol}//${url.hostname}:8000`)
  } catch {
    hrefs.push('http://localhost:8000')
  }
  return Array.from(new Set(hrefs))
}

export default function ApiDocsPage() {
  const candidates = useMemo(() => guessBackendBase(), [])
  const [base, setBase] = useState(candidates[0] || 'http://localhost:8000')
  const redocUrl = `${base}/redoc`
  const swaggerUrl = `${base}/docs`
  const yamlUrl = `${base}/openapi.yaml`

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Backend base:</span>
        {candidates.map((b) => (
          <Button key={b} variant={b === base ? 'default' : 'outline'} size="sm" onClick={() => setBase(b)}>
            {b}
          </Button>
        ))}
        <a href={yamlUrl} target="_blank" rel="noreferrer" className="ml-auto text-sm underline">
          Download openapi.yaml
        </a>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="border rounded-md overflow-hidden">
          <div className="px-3 py-2 border-b text-sm font-medium">Swagger UI (/docs)</div>
          <iframe title="Swagger UI" src={swaggerUrl} className="w-full h-[70vh] bg-background" />
        </section>
        <section className="border rounded-md overflow-hidden">
          <div className="px-3 py-2 border-b text-sm font-medium">ReDoc (/redoc)</div>
          <iframe title="ReDoc" src={redocUrl} className="w-full h-[70vh] bg-background" />
        </section>
      </div>
    </div>
  )
}
