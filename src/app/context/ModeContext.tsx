import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Mode = 'developer' | 'editor';
export type Theme = 'light' | 'dark';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

const MODE_STORAGE_KEY = 'portfolio-mode';
const THEME_STORAGE_KEY = 'portfolio-theme';

const getInitialMode = (): Mode => {
  if (typeof window === 'undefined') {
    return 'developer';
  }

  const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY);
  return storedMode === 'developer' || storedMode === 'editor' ? storedMode : 'developer';
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>(getInitialMode);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      theme,
      setTheme,
      toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light')),
    }),
    [mode, theme]
  );

  return (
    <ModeContext.Provider value={contextValue}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
