import { Button } from "@/components/ui/button";
import { useTheme, ALL_THEMES, THEME_META, type Theme } from "./ThemeProvider";
import { Moon } from "@phosphor-icons/react/dist/ssr/Moon";
import { Sun } from "@phosphor-icons/react/dist/ssr/Sun";
import { Palette } from "@phosphor-icons/react/dist/ssr/Palette";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState, useRef } from "react";

export function ThemeToggle() {
  const { theme, isDarkMode, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on outside-click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const darkThemes = ALL_THEMES.filter(t => THEME_META[t].group === "dark");
  const lightThemes = ALL_THEMES.filter(t => THEME_META[t].group === "light");

  const selectTheme = (t: Theme) => {
    setTheme(t);
    setOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={btnRef}
              variant="outline"
              size="icon"
              onClick={() => setOpen(!open)}
              className={`rounded-full h-9 w-9 ${
                !isDarkMode 
                ? "border-primary/20 bg-background" 
                : "border-primary/40 bg-primary/10"
              }`}
              aria-label="Choose theme"
              aria-expanded={open}
            >
              <div className="relative w-[18px] h-[18px]">
                <Sun
                  size={18}
                  weight="fill"
                  className={`text-primary absolute inset-0 transition-all duration-300 ${
                    isDarkMode ? "opacity-0 -rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <Moon
                  size={18}
                  weight="fill"
                  className={`text-primary absolute inset-0 transition-all duration-300 ${
                    isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
                  }`}
                />
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Themes</p>
          </TooltipContent>
        </Tooltip>

        {/* ── Theme picker panel ── */}
        {open && (
          <div
            ref={panelRef}
            className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-border bg-popover p-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {/* Current theme indicator */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
              <Palette size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">
                {THEME_META[theme].label}
              </span>
            </div>

            {/* Dark themes */}
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold flex items-center gap-1">
              <Moon size={10} weight="bold" /> Dark
            </p>
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {darkThemes.map(t => (
                <button
                  key={t}
                  onClick={() => selectTheme(t)}
                  className={`group flex flex-col items-center gap-0.5 rounded-lg p-1.5 transition-colors hover:bg-accent/20 ${
                    theme === t ? "bg-accent/30 ring-1 ring-primary" : ""
                  }`}
                  title={THEME_META[t].label}
                >
                  <span
                    className="block w-6 h-6 rounded-full border border-border/50 shadow-sm transition-transform group-hover:scale-110"
                    style={{ background: THEME_META[t].swatch }}
                  />
                  <span className="text-[9px] text-muted-foreground leading-tight truncate max-w-full">
                    {THEME_META[t].label}
                  </span>
                </button>
              ))}
            </div>

            {/* Light themes */}
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold flex items-center gap-1">
              <Sun size={10} weight="bold" /> Light
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {lightThemes.map(t => (
                <button
                  key={t}
                  onClick={() => selectTheme(t)}
                  className={`group flex flex-col items-center gap-0.5 rounded-lg p-1.5 transition-colors hover:bg-accent/20 ${
                    theme === t ? "bg-accent/30 ring-1 ring-primary" : ""
                  }`}
                  title={THEME_META[t].label}
                >
                  <span
                    className="block w-6 h-6 rounded-full border border-border/50 shadow-sm transition-transform group-hover:scale-110"
                    style={{ background: THEME_META[t].swatch }}
                  />
                  <span className="text-[9px] text-muted-foreground leading-tight truncate max-w-full">
                    {THEME_META[t].label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}