import { Moon, Settings, Sun } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

export function Header({ theme, onToggleTheme, onOpenSettings }: HeaderProps) {
  const isDark = theme === 'dark';

  return (
    <header className="app-header flex items-center justify-between h-14 px-4 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🍬</span>
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            Markdown Preview
          </h1>
          <span className="text-xs text-muted-foreground font-medium">EE</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Switch - Sun/Moon Toggle */}
        <div className="px-2">
          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            data-state={isDark ? 'checked' : 'unchecked'}
            onClick={onToggleTheme}
            className="theme-switch"
          >
            <span
              data-state={isDark ? 'checked' : 'unchecked'}
              className="theme-switch-thumb"
            >
              {isDark ? (
                <Moon className="size-3" />
              ) : (
                <Sun className="size-3" />
              )}
            </span>
          </button>
        </div>

        <button
          onClick={onOpenSettings}
          className="btn-icon"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}
