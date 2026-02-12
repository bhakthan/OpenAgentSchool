import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

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

  root.classList.remove("light", "dark");
  body.classList.remove("light", "dark");

  root.classList.add(theme);
  body.classList.add(theme);

  root.setAttribute('data-theme', theme);
  root.setAttribute('data-appearance', theme);
  body.setAttribute('data-theme', theme);
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
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
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
    const initialTheme = localStorage.getItem(storageKey) as Theme || 
                        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : defaultTheme);
    
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
    isDarkMode: theme === "dark",
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
      syncTheme(newTheme);
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