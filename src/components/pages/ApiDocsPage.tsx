import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth/AuthContext'
import { FileCode } from '@phosphor-icons/react/dist/ssr/FileCode'

// Direct assignment so Vite can statically analyze and bundle the env vars
const CORE_API_URL = import.meta.env.VITE_CORE_API_URL as string | undefined

function guessBackendBase(): string[] {
  const origin = window.location.origin
  const hrefs: string[] = []
  // prefer env-configured core API when provided (supports split repos/backends)
  if (CORE_API_URL) hrefs.push(CORE_API_URL)
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
  const { isAuthenticated } = useAuth()
  const candidates = useMemo(() => guessBackendBase(), [])
  const [base, setBase] = useState(candidates[0] || 'http://localhost:8000')
  const redocUrl = `${base}/redoc`
  const swaggerUrl = `${base}/docs`
  const yamlUrl = `${base}/openapi.yaml`

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="text-center p-12">
          <FileCode size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Sign In to Access API Docs</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The API documentation provides access to backend endpoints and testing tools. Sign in to continue.
          </p>
          <Link to="/auth">
            <Button size="lg">Sign In</Button>
          </Link>
        </Card>
      </div>
    );
  }

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
