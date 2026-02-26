import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export type Theme =
  | "light"
  | "dark"
  | "aurora"
  | "rose"
  | "cyber"
  | "abyss"
  | "velvet"
  | "ember"
  | "verdant"
  | "solar"
  | "arctic"
  | "sakura"
  | "sandstone"
  | "ivory"
  | "mono"
  | "crimson"
  | "malachite";

/** Themes that use a dark background — used to derive `isDarkMode`. */
const DARK_THEMES = new Set<Theme>([
  "dark",
  "aurora",
  "rose",
  "cyber",
  "abyss",
  "velvet",
  "ember",
  "verdant",
  "solar",
  "mono",
  "crimson",
  "malachite",
]);

/** Every valid theme id. */
export const ALL_THEMES: Theme[] = [
  "dark",
  "light",
  "aurora",
  "rose",
  "cyber",
  "abyss",
  "velvet",
  "ember",
  "verdant",
  "solar",
  "mono",
  "crimson",
  "malachite",
  "arctic",
  "sakura",
  "sandstone",
  "ivory",
];

/** Human-readable labels and accent swatches for the theme picker. */
export const THEME_META: Record<Theme, { label: string; swatch: string; group: "dark" | "light" }> = {
  dark:      { label: "Void Black",     swatch: "#1a1d23", group: "dark" },
  light:     { label: "Warm Parchment", swatch: "#f8f6f0", group: "light" },
  aurora:    { label: "Aurora",         swatch: "#00d4aa", group: "dark" },
  rose:      { label: "Rosé",           swatch: "#ff6b9d", group: "dark" },
  cyber:     { label: "Cyber",          swatch: "#00ffd5", group: "dark" },
  abyss:     { label: "Abyss",          swatch: "#4a9eff", group: "dark" },
  velvet:    { label: "Velvet",         swatch: "#a855f7", group: "dark" },
  ember:     { label: "Ember",          swatch: "#ff8c42", group: "dark" },
  verdant:   { label: "Verdant",        swatch: "#10b981", group: "dark" },
  solar:     { label: "Solar",          swatch: "#f59e0b", group: "dark" },
  mono:      { label: "Mono",           swatch: "#888888", group: "dark" },
  crimson:   { label: "Crimson",        swatch: "#dc2626", group: "dark" },
  malachite: { label: "Malachite",      swatch: "#059669", group: "dark" },
  arctic:    { label: "Arctic",         swatch: "#0077cc", group: "light" },
  sakura:    { label: "Sakura",         swatch: "#db2777", group: "light" },
  sandstone: { label: "Sandstone",      swatch: "#a07040", group: "light" },
  ivory:     { label: "Ivory",          swatch: "#8b7355", group: "light" },
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: (x?: number, y?: number) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  isDarkMode: true,
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Synchronize theme classes and data attributes
const syncTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  const body = window.document.body;

  // Remove every possible theme class
  const allClasses: string[] = ALL_THEMES as string[];
  root.classList.remove(...allClasses);
  body.classList.remove(...allClasses);

  // Always add the specific theme class (e.g., "aurora")
  root.classList.add(theme);
  body.classList.add(theme);

  // For Tailwind `dark:` variant compat, also toggle `dark` / `light`
  const baseMode = DARK_THEMES.has(theme) ? "dark" : "light";
  if (theme !== "dark" && theme !== "light") {
    root.classList.remove("dark", "light");
    body.classList.remove("dark", "light");
    root.classList.add(baseMode);
    body.classList.add(baseMode);
  }

  root.setAttribute("data-theme", theme);
  root.setAttribute("data-appearance", baseMode);
  body.setAttribute("data-theme", theme);
};

/**
 * Perform the theme change through the View Transitions API.
 * An expanding circle clip-path reveals the new theme from (x, y),
 * creating the directional sweep effect seen on DeepWiki.
 * Falls back to an instant swap on browsers without support.
 */
const transitionTheme = (theme: Theme, x: number, y: number) => {
  // Calculate the maximum radius needed to cover the entire viewport
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  // Set a CSS custom property so the clip-path keyframes know the origin
  document.documentElement.style.setProperty('--vt-x', `${x}px`);
  document.documentElement.style.setProperty('--vt-y', `${y}px`);
  document.documentElement.style.setProperty('--vt-r', `${endRadius}px`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = document as any;
  if (!doc.startViewTransition) {
    // Fallback: instant swap
    syncTheme(theme);
    return;
  }

  const transition = doc.startViewTransition(() => {
    syncTheme(theme);
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  });
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => {
      if (typeof window === 'undefined') return defaultTheme;
      
      // Check for saved theme preference
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme && ALL_THEMES.includes(savedTheme)) {
        return savedTheme;
      }
      
      // Check for system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemPrefersDark ? "dark" : defaultTheme;
    }
  );

  // Skip syncTheme in the useEffect when a view transition is driving it
  const skipSyncRef = useRef(false);

  // Apply theme on initial render and theme changes
  useEffect(() => {
    if (!skipSyncRef.current) {
      syncTheme(theme);
    }
    skipSyncRef.current = false;
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as Theme | null;
    const initialTheme: Theme =
      (saved && ALL_THEMES.includes(saved)) ? saved :
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : defaultTheme;
    
    syncTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no manual preference was set
      if (!localStorage.getItem(storageKey)) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        syncTheme(newTheme);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [storageKey]);

  const toggleTheme = (x?: number, y?: number) => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Prevent the useEffect from applying the theme before
    // startViewTransition captures the old-state snapshot
    skipSyncRef.current = true;
    setTheme(newTheme);

    // The view transition callback will call syncTheme at the right moment
    transitionTheme(newTheme, x ?? 0, y ?? 0);
  };

  const value = {
    theme,
    isDarkMode: DARK_THEMES.has(theme),
    setTheme: (newTheme: Theme) => {
      skipSyncRef.current = true;
      setTheme(newTheme);
      transitionTheme(newTheme, window.innerWidth / 2, window.innerHeight / 2);
    },
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};