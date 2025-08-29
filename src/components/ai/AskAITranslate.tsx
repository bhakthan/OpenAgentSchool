import React, { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { sanitizeHtml } from '@/lib/sanitizeHtml'
import { callLlm } from '@/lib/llm'
import { getTranslateTargets, TranslateTargetCode } from '@/lib/languages'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  sourceHtml: string
}

const ALL_LANGS = getTranslateTargets()
type LangCode = TranslateTargetCode

export default function AskAITranslate({ open, onOpenChange, sourceHtml }: Props) {
  const sortedLangs = useMemo(() => [...ALL_LANGS].sort((a, b) => a.label.localeCompare(b.label)), [])
  const defaultLang = useMemo<LangCode>(() => (sortedLangs.find(l => l.code === 'es')?.code ?? (sortedLangs[0]?.code as LangCode) ?? 'es'), [sortedLangs])
  const [lang, setLang] = useState<LangCode>(defaultLang)
  const [out, setOut] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(false)

  const plainSource = useMemo(() => {
    try {
      const div = document.createElement('div')
      div.innerHTML = sourceHtml
      return div.textContent || div.innerText || ''
    } catch {
      return sourceHtml
    }
  }, [sourceHtml])

  // Keep basic markup structure to help the model preserve formatting
  const structuredSourceHtml = useMemo(() => {
    try {
      return sanitizeHtml(sourceHtml)
    } catch {
      return sourceHtml
    }
  }, [sourceHtml])

  function plainToHtml(text: string): string {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    // Convert double newlines to paragraphs, singles to <br>
    const paragraphs = escaped.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    return paragraphs.map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('\n')
  }

  async function translate() {
    setLoading(true)
    setError(null)
    try {
  const prompt = `You are a precise translator. Maintain meaning and tone. Preserve headings, lists, paragraphs, emphasis, and links. Output clean HTML only (no <html> or <body>, no scripts/styles). Translate the following HTML fragment into language code: ${lang}.\n\nHTML:\n${structuredSourceHtml}`
  const { content } = await callLlm(prompt, 'openrouter')
  const trimmed = (content || '').trim()
  const looksLikeHtml = /<\w+[^>]*>/.test(trimmed)
  setOut(looksLikeHtml ? trimmed : plainToHtml(trimmed))
    } catch (e: any) {
      setError(e?.message || 'Translation failed')
    } finally {
      setLoading(false)
    }
  }

  const hasOut = (out?.trim()?.length ?? 0) > 0

  useEffect(() => {
    if (open) setShowControls(false)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl md:max-w-5xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Translate with AI</DialogTitle>
            {hasOut && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowControls(v => !v)}
                aria-label={showControls ? 'Hide options' : 'Change language'}
              >
                {showControls ? 'Hide options' : 'Change language'}
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className={`grid ${hasOut && !showControls ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4 min-h-0`}>
          <div className={`md:col-span-1 space-y-2 ${hasOut && !showControls ? 'hidden' : ''}`}>
            <label className="text-sm font-medium">Language</label>
            <select
              className="w-full rounded-md border bg-background p-2"
              value={lang}
              onChange={(e) => setLang(e.target.value as LangCode)}
            >
              {sortedLangs.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <Button onClick={translate} disabled={loading} className="w-full">
              {loading ? 'Translating…' : 'Translate'}
            </Button>
            {error && <div className="text-xs text-red-500">{error}</div>}
            <div className="text-xs text-muted-foreground">
              Source: {plainSource.trim().length} chars
              {plainSource.trim().length === 0 && (
                <>
                  {' '}— no content detected. Try selecting text on the page, or ensure the button targets the correct element.
                </>
              )}
            </div>
            <div className="text-xs text-muted-foreground">Uses your configured provider (OpenRouter). Returns sanitized HTML.</div>
          </div>
          <div className={`${hasOut && !showControls ? 'md:col-span-3' : 'md:col-span-2'} min-h-0 max-h-[65vh] sm:max-h-[75vh] overflow-y-auto`}> 
            {out ? (
              <div className="prose prose-sm max-w-none p-3 rounded-md border bg-card" dangerouslySetInnerHTML={{ __html: sanitizeHtml(out) }} />
            ) : (
              <textarea
                className="w-full h-64 rounded-md border bg-background p-3 text-sm"
                readOnly
                value={plainSource}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
