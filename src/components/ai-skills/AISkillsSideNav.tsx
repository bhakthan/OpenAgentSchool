import React, { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface SideNavCategory {
  id: string
  title: string
  moduleIds: string[]
}

interface AISkillsSideNavProps {
  categories: SideNavCategory[]
  progress: Record<string, boolean>
  onJump: (id: string) => void
}

// Utility to slug to readable label fallback
const toTitle = (id: string) => id
  .replace(/-/g, ' ')
  .replace(/\b\w/g, c => c.toUpperCase())

export const AISkillsSideNav: React.FC<AISkillsSideNavProps> = ({ categories, progress, onJump }) => {
  const [activeModule, setActiveModule] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const targets: HTMLElement[] = []
    observerRef.current?.disconnect()
    const observer = new IntersectionObserver((entries) => {
      // Pick the top-most intersecting entry
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => (a.boundingClientRect.top - b.boundingClientRect.top))
      if (visible[0]) {
        setActiveModule(visible[0].target.id)
      }
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] })
    categories.forEach(cat => {
      cat.moduleIds.forEach(id => {
        const el = document.getElementById(id)
        if (el) { observer.observe(el); targets.push(el as HTMLElement) }
      })
    })
    observerRef.current = observer
    return () => { observer.disconnect() }
  }, [categories])

  return (
    <nav aria-label="AI-Native skills navigation" className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 text-sm hidden lg:block w-64">
      <div className="mb-3 font-semibold tracking-wide text-muted-foreground text-xs">AI‑Native Skills Map</div>
      <ul className="space-y-6">
        {categories.map(cat => (
          <li key={cat.id}>
            <div className="mb-1 font-medium text-foreground/90 text-xs uppercase tracking-wider">{cat.title}</div>
            <ul className="space-y-1">
              {cat.moduleIds.map(mid => {
                const complete = !!progress[mid]
                const active = activeModule === mid
                return (
                  <li key={mid}>
                    <button
                      onClick={() => onJump(mid)}
                      className={`group w-full text-left rounded px-2 py-1.5 transition-colors border border-transparent hover:bg-accent/50 hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${active ? 'bg-primary/10 border-primary/30 text-primary font-medium' : ''}`}
                      aria-current={active ? 'true' : undefined}
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex-1 truncate">{toTitle(mid)}</span>
                        {complete && <Badge variant="secondary" className="text-[10px] px-1 py-0">Done</Badge>}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default AISkillsSideNav