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
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  // Initialize collapsed state (default expanded)
  useEffect(() => {
    setCollapsed(prev => {
      const next = { ...prev }
      categories.forEach(c => { if (next[c.id] === undefined) next[c.id] = false })
      return next
    })
  }, [categories])

  const toggleCategory = (id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const expandAll = () => setCollapsed(Object.fromEntries(categories.map(c => [c.id, false])))
  const collapseAll = () => setCollapsed(Object.fromEntries(categories.map(c => [c.id, true])))

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

  // Auto-expand category if activeModule is inside it
  useEffect(() => {
    if (!activeModule) return
    const cat = categories.find(c => c.moduleIds.includes(activeModule))
    if (cat && collapsed[cat.id]) {
      setCollapsed(prev => ({ ...prev, [cat.id]: false }))
    }
  }, [activeModule, categories, collapsed])

  return (
  <nav aria-label="Applied AI Skills navigation" className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 text-sm hidden lg:block w-64">
      <div className="mb-3 flex items-center justify-between">
  <span className="font-semibold tracking-wide text-muted-foreground text-xs">Applied AI Skills Map</span>
      </div>
      <div className="flex gap-2 mb-4">
  <Button size="sm" variant="outline" className="h-6 px-2 text-[10px]" onClick={expandAll}>Expand All</Button>
  <Button size="sm" variant="outline" className="h-6 px-2 text-[10px]" onClick={collapseAll}>Collapse All</Button>
      </div>
      <ul className="space-y-4">
        {categories.map(cat => {
          const isCollapsed = collapsed[cat.id]
          const completedCount = cat.moduleIds.filter(m => progress[m]).length
          return (
            <li key={cat.id} className="group">
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center justify-between text-left text-xs font-medium uppercase tracking-wider mb-1 hover:text-primary focus:outline-none"
                aria-expanded={!isCollapsed}
              >
                <span className="flex items-center gap-1">
                  <span className={`transition-transform duration-200 inline-block ${isCollapsed ? 'rotate-0' : 'rotate-90'}`}>▶</span>
                  {cat.title}
                </span>
                <span className="text-[10px] text-muted-foreground">{completedCount}/{cat.moduleIds.length}</span>
              </button>
              {!isCollapsed && (
                <ul className="space-y-1 pl-4 border-l border-border/40">
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
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AISkillsSideNav