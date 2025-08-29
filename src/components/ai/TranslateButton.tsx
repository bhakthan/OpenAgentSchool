import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import AskAITranslate from '@/components/ai/AskAITranslate'
import { Languages } from 'lucide-react'

type CaptureMode = 'inner' | 'outer' | 'text'

export type TranslateButtonProps = {
  /** Provide a ref to the element whose content should be translated. */
  targetRef?: React.RefObject<HTMLElement | null>
  /** Alternatively, provide a CSS selector to find the element at click time. */
  selector?: string
  /** Or, provide a function that returns the HTML/text to translate. */
  getHtml?: () => string
  /** Choose how to capture content from the target element. Defaults to 'inner'. */
  capture?: CaptureMode
  /** Optional button label. Defaults to "Translate". */
  children?: React.ReactNode
  /** Optional custom icon (shown before label). */
  icon?: React.ReactNode
  /** Optional className for the Button. */
  className?: string
  /** Pass-through props for Button variant/size if your UI library supports them. */
  variant?: any
  size?: any
  /** Disable the button. */
  disabled?: boolean
  /** Optional hover hint (title attribute). */
  title?: string
}

/**
 * Small reusable button that opens the AskAITranslate modal.
 * It can capture content from a ref, a CSS selector, or a custom getter.
 */
export default function TranslateButton({
  targetRef,
  selector,
  getHtml,
  capture = 'inner',
  children,
  icon,
  className,
  variant = 'outline',
  size = 'sm',
  disabled,
  title
}: TranslateButtonProps) {
  const [open, setOpen] = useState(false)
  const [sourceHtml, setSourceHtml] = useState<string>('')

  const resolvedIcon = useMemo(() => icon ?? <Languages className="w-4 h-4" />, [icon])

  function resolveFromElement(el: Element | null | undefined): string {
    if (!el) return ''
    if (capture === 'outer') return (el as HTMLElement).outerHTML
    if (capture === 'text') return (el as HTMLElement).textContent || ''
    return (el as HTMLElement).innerHTML
  }

  function resolveHtml(): string {
    // 1) Custom getter
    if (typeof getHtml === 'function') {
      try {
        const v = getHtml() ?? ''
        if (v && v.trim().length > 0) return v
      } catch {
        // ignore
      }
    }
    // 2) Ref
    if (targetRef?.current) {
      const inner = resolveFromElement(targetRef.current)
      if (inner && inner.trim().length > 0) return inner
      const text = (targetRef.current.textContent || '').trim()
      if (text.length > 0) return text
    }
    // 3) Selector
    if (selector) {
      const el = typeof document !== 'undefined' ? document.querySelector(selector) : null
      const inner = resolveFromElement(el || undefined)
      if (inner && inner.trim().length > 0) return inner
      const text = (el?.textContent || '').trim()
      if (text.length > 0) return text
    }
    // 4) As a last resort, use the user's current selection
    if (typeof window !== 'undefined') {
      const sel = window.getSelection()?.toString()
      if (sel && sel.trim().length > 0) return sel
    }
    return ''
  }

  function onClick() {
    const html = resolveHtml()
    setSourceHtml(html)
    setOpen(true)
  }

  return (
    <>
      <Button
        onClick={onClick}
        className={className}
        variant={variant}
        size={size}
        aria-label={typeof children === 'string' ? children : 'Translate'}
        disabled={disabled}
  title={title}
      >
        <span className="inline-flex items-center gap-2">
          {resolvedIcon}
          <span className="text-foreground text-xs">{children ?? 'Translate'}</span>
        </span>
      </Button>
      <AskAITranslate open={open} onOpenChange={setOpen} sourceHtml={sourceHtml} />
    </>
  )
}
