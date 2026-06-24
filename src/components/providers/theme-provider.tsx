"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Dark mode CSS to inject directly
const DARK_CSS = `
html.dark, html.dark * {
  --color-background: #061d29 !important;
  --color-foreground: #f5f5f5 !important;
  --color-card: #072626 !important;
  --color-card-foreground: #f5f5f5 !important;
  --color-popover: #072626 !important;
  --color-popover-foreground: #f5f5f5 !important;
  --color-primary: #0b978e !important;
  --color-primary-foreground: #061d29 !important;
  --color-secondary: #1a3a3a !important;
  --color-secondary-foreground: #f5f5f5 !important;
  --color-muted: #1a3a3a !important;
  --color-muted-foreground: #94a3b8 !important;
  --color-accent: #006e75 !important;
  --color-accent-foreground: #f5f5f5 !important;
  --color-destructive: #ff492c !important;
  --color-destructive-foreground: #f5f5f5 !important;
  --color-border: #1e3a4a !important;
  --color-input: #1e3a4a !important;
  --color-ring: #0b978e !important;
  --color-paper: #072626 !important;
  --color-cream: #1a3a3a !important;
  --color-hairline: #1e3a4a !important;
  --color-mist: #94a3b8 !important;
  --color-ink: #f5f5f5 !important;
  --color-sidebar: #061d29 !important;
  --color-sidebar-foreground: #f5f5f5 !important;
  --color-sidebar-primary: #0b978e !important;
  --color-sidebar-primary-foreground: #061d29 !important;
  --color-sidebar-accent: #1a3a3a !important;
  --color-sidebar-accent-foreground: #f5f5f5 !important;
  --color-sidebar-border: #1e3a4a !important;
  --color-sidebar-ring: #0b978e !important;
}
html.dark body {
  background-color: #061d29 !important;
  color: #f5f5f5 !important;
  background-image: none !important;
}
html.dark .bg-paper { background-color: #072626 !important; }
html.dark .bg-cream { background-color: #1a3a3a !important; }
html.dark .bg-mint-glass { background-color: #0a3a3a !important; }
html.dark .text-ink { color: #f5f5f5 !important; }
html.dark .text-mist { color: #94a3b8 !important; }
html.dark .text-deep-teal { color: #b9ffe8 !important; }
html.dark .border-hairline { border-color: #1e3a4a !important; }
html.dark .nav-glass { background: rgba(6,29,41,0.95) !important; }
html.dark .badge-mint { background-color: #0a3a3a !important; color: #b9ffe8 !important; }
html.dark .announcement-banner { background: linear-gradient(90deg, #0a3a3a 0%, #1a3a3a 50%, #2a1a3a 100%) !important; }
html.dark .hook-highlight { background: linear-gradient(135deg, #0a3a3a 0%, #1a3a3a 100%) !important; }
html.dark ::selection { background: #006e75 !important; color: #f5f5f5 !important; }
html.dark .headline-serif, html.dark h1, html.dark h2, html.dark h3, html.dark h4 { color: #f5f5f5 !important; }
html.dark p, html.dark li, html.dark span:not(.btn-teal):not(.btn-teal-glow) { color: inherit; }
html.dark a { color: #b9ffe8; }
`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    applyTheme(initial);

    // Inject dark mode CSS
    let style = document.getElementById("gem-dark-mode");
    if (!style) {
      style = document.createElement("style");
      style.id = "gem-dark-mode";
      style.textContent = DARK_CSS;
      document.head.appendChild(style);
    }
  }, []);

  const applyTheme = (t: Theme) => {
    setTheme(t);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", t);
      document.documentElement.classList.toggle("dark", t === "dark");
      document.documentElement.setAttribute("data-theme", t);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) return { theme: "light" as const, toggleTheme: () => {} };
  return context;
}
