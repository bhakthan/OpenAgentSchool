import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon } from "@phosphor-icons/react/dist/ssr/Moon";
import { Sun } from "@phosphor-icons/react/dist/ssr/Sun";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState, type MouseEvent } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [mounted, setMounted] = useState(false);
  
  // Only show the toggle after hydration to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder with same dimensions
  }

  const handleClick = (_e: MouseEvent<HTMLButtonElement>) => {
    // Sweep always expands from the top-left corner
    toggleTheme(0, 0);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleClick}
            className={`rounded-full h-9 w-9 ${
              !isDarkMode 
              ? "border-primary/20 bg-background" 
              : "border-primary/40 bg-primary/10"
            }`}
            aria-label="Toggle theme"
          >
            {/* Cross-fade between sun and moon icons */}
            <div className="relative w-[18px] h-[18px]">
              <Sun
                size={18}
                weight="fill"
                className={`text-primary absolute inset-0 transition-all duration-300 ${
                  isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`}
              />
              <Moon
                size={18}
                weight="fill"
                className={`text-primary absolute inset-0 transition-all duration-300 ${
                  !isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
                }`}
              />
            </div>
            <span className="sr-only">
              {!isDarkMode ? "Switch to dark mode" : "Switch to light mode"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{!isDarkMode ? "Switch to dark mode" : "Switch to light mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}