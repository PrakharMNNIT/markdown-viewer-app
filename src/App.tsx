import { useCallback, useEffect, useState } from 'react';
import { Editor } from './components/Editor';
import { Header } from './components/Header';
import { Preview } from './components/Preview';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { useFileSystem } from './hooks/useFileSystem';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';

export type ViewMode = 'editor' | 'preview' | 'split';
export type PreviewTheme = 'candyland' | 'doom64';

const DEFAULT_CONTENT = `# Welcome to Markdown Preview EE 🍬

> The most beautiful markdown preview tool — now with **distinctive themes**!

## Features

- ✨ **Live Preview** — See your markdown rendered in real-time
- 🎨 **Unique Themes** — Candyland (sweet) & Doom64 (industrial)
- 🌙 **Dark Mode** — Easy on the eyes
- 📤 **PDF Export** — Print-perfect output with preserved styling
- 🤖 **AI Organize** — Let AI structure your notes (BYOK)

## Code Example

\`\`\`typescript
const greeting = (name: string): string => {
  return \`Hello, \${name}! Welcome to Markdown Preview EE 🍭\`;
};

console.log(greeting('Developer'));
\`\`\`

## Table Demo

| Feature | Status | Priority |
|---------|--------|----------|
| Editor | ✅ Done | P0 |
| Preview | ✅ Done | P0 |
| Themes | ✅ Done | P1 |
| Export | 📋 Planned | P1 |

---

*Built with precision and passion* ✨
`;

function App() {
  const { theme, toggleTheme } = useTheme();
  const [content, setContent] = useLocalStorage('markdown-content', DEFAULT_CONTENT);
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('view-mode', 'split');
  const [previewTheme, setPreviewTheme] = useLocalStorage<PreviewTheme>('preview-theme', 'candyland');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  const {
    folder,
    isLoading: fsLoading,
    error: fsError,
    openFolder,
    readFile,
    saveFile
  } = useFileSystem();

  // Apply global theme to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', previewTheme);
  }, [previewTheme]);

  useEffect(() => {
    setLastSaved(new Date());
  }, [content]);

  useEffect(() => {
    if (fsError) {
      console.error(fsError);
    }
  }, [fsError]);

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, [setContent]);

  const handleOpenFolder = useCallback(async () => {
    const success = await openFolder();
    if (success) {
      setSidebarOpen(true);
    }
  }, [openFolder]);

  const handleSaveFile = useCallback(async () => {
    if (folder.currentFile) {
      await saveFile(content);
      setLastSaved(new Date());
    }
  }, [folder.currentFile, saveFile, content]);

  const handleNewFile = useCallback(() => {
    setContent('# New Document\n\nStart writing here...');
    setLastSaved(new Date());
  }, [setContent]);

  const handleExportPdf = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => { }}
      />

      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        previewTheme={previewTheme}
        onPreviewThemeChange={setPreviewTheme}
        onOpenFile={handleOpenFolder}
        onSaveFile={handleSaveFile}
        onNewFile={handleNewFile}
        onExportPdf={handleExportPdf}
        onAiOrganize={() => { }}
        lastSaved={lastSaved}
        isLoading={fsLoading}
        currentFileName={folder.currentFile?.name}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          files={folder.files}
          currentFile={folder.currentFile}
          onFileSelect={async (file) => {
            const fileContent = await readFile(file);
            if (fileContent !== null) {
              setContent(fileContent);
            }
          }}
        />

        <div className="flex flex-1 overflow-hidden">
          {(viewMode === 'editor' || viewMode === 'split') && (
            <Editor
              content={content}
              onChange={handleContentChange}
              isFullWidth={viewMode === 'editor'}
            />
          )}

          {viewMode === 'split' && (
            <div className="w-px bg-border" aria-hidden="true" />
          )}

          {(viewMode === 'preview' || viewMode === 'split') && (
            <Preview 
              content={content}
              isFullWidth={viewMode === 'preview'}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;