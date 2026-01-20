import { FolderOpen, Save, FilePlus, Download, Sparkles, Columns, FileCode, Eye, Loader2, Palette } from 'lucide-react';
import type { ViewMode, PreviewTheme } from '../App';

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  previewTheme: PreviewTheme;
  onPreviewThemeChange: (theme: PreviewTheme) => void;
  onOpenFile: () => void;
  onSaveFile: () => void;
  onNewFile: () => void;
  onExportPdf: () => void;
  onAiOrganize: () => void;
  lastSaved: Date;
  isLoading?: boolean;
  currentFileName?: string;
}

const THEMES: { value: PreviewTheme; label: string; emoji: string }[] = [
  { value: 'candyland', label: 'Candyland', emoji: '🍬' },
  { value: 'doom64', label: 'Doom64', emoji: '💀' },
];

export function Toolbar({
  viewMode,
  onViewModeChange,
  previewTheme,
  onPreviewThemeChange,
  onOpenFile,
  onSaveFile,
  onNewFile,
  onExportPdf,
  onAiOrganize,
  lastSaved,
  isLoading = false,
  currentFileName,
}: ToolbarProps) {
  const formatLastSaved = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 5) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.floor(seconds / 60)}m ago`;
  };

  return (
    <div className="app-toolbar flex items-center h-12 px-4 gap-2 bg-card border-b border-border">
      <div className="flex items-center gap-1">
        <button onClick={onOpenFile} disabled={isLoading} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground bg-transparent rounded-lg hover:bg-muted hover:text-foreground transition-all disabled:opacity-50" title="Open Folder">
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <FolderOpen size={18} />}
          <span>Open</span>
        </button>
        <button onClick={onSaveFile} disabled={isLoading} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground bg-transparent rounded-lg hover:bg-muted hover:text-foreground transition-all disabled:opacity-50" title="Save">
          <Save size={18} />
          <span>Save</span>
        </button>
        <button onClick={onNewFile} disabled={isLoading} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground bg-transparent rounded-lg hover:bg-muted hover:text-foreground transition-all disabled:opacity-50" title="New">
          <FilePlus size={18} />
          <span>New</span>
        </button>
      </div>

      {currentFileName && (
        <>
          <div className="w-px h-6 bg-border mx-2" />
          <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md max-w-[200px]">
            <span>📄</span>
            <span className="text-sm font-medium truncate text-foreground">{currentFileName}</span>
          </div>
        </>
      )}

      <div className="w-px h-6 bg-border mx-2" />

      <button onClick={onExportPdf} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground bg-transparent rounded-lg hover:bg-muted hover:text-foreground transition-all" title="Export PDF">
        <Download size={18} />
        <span>Export</span>
      </button>

      <div className="w-px h-6 bg-border mx-2" />

      <button onClick={onAiOrganize} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-accent bg-transparent rounded-lg hover:bg-accent/10 transition-all" title="AI Organize">
        <Sparkles size={18} className="animate-pulse" />
        <span>AI Organize</span>
      </button>

      <div className="w-px h-6 bg-border mx-2" />

      <div className="flex items-center gap-2">
        <Palette size={16} className="text-muted-foreground" />
        <select
          value={previewTheme}
          onChange={(e) => onPreviewThemeChange(e.target.value as PreviewTheme)}
          className="text-sm bg-muted border border-border rounded-md px-2 py-1 text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {THEMES.map(({ value, label, emoji }) => (
            <option key={value} value={value}>{emoji} {label}</option>
          ))}
        </select>
      </div>

      <div className="flex-1" />

      <div className="flex items-center p-0.5 bg-muted rounded-lg">
        <button
          onClick={() => onViewModeChange('editor')}
          className={`flex items-center justify-center w-8 h-8 rounded-md transition-all ${viewMode === 'editor' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          title="Editor Only"
        >
          <FileCode size={18} />
        </button>
        <button
          onClick={() => onViewModeChange('split')}
          className={`flex items-center justify-center w-8 h-8 rounded-md transition-all ${viewMode === 'split' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          title="Split View"
        >
          <Columns size={18} />
        </button>
        <button
          onClick={() => onViewModeChange('preview')}
          className={`flex items-center justify-center w-8 h-8 rounded-md transition-all ${viewMode === 'preview' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          title="Preview Only"
        >
          <Eye size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-border mx-2" />

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
        <span>Saved {formatLastSaved(lastSaved)}</span>
      </div>
    </div>
  );
}