import { ChevronLeft, ChevronRight, FileText, FolderOpen } from 'lucide-react';
import type { FileEntry } from '../hooks/useFileSystem';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  files?: FileEntry[];
  currentFile?: FileEntry | null;
  onFileSelect?: (file: FileEntry) => void;
}

export function Sidebar({ 
  isOpen, 
  onToggle, 
  files = [],
  currentFile,
  onFileSelect 
}: SidebarProps) {
  const hasFiles = files.length > 0;

  return (
    <aside className={`app-sidebar relative bg-bg-secondary border-r border-border-light transition-[width] duration-normal ${isOpen ? 'w-64' : 'w-10'}`}>
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute top-3 right-2 w-7 h-7 flex items-center justify-center text-text-muted bg-bg-tertiary rounded-md hover:text-text-primary hover:bg-border-light transition-colors z-10"
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {isOpen && (
        <div className="p-4 pt-12">
          {/* File Browser */}
          {hasFiles && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                <FolderOpen size={16} />
                Files
              </h3>
              <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
                {files.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => onFileSelect?.(file)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm text-left w-full rounded-md border transition-colors ${
                      currentFile?.path === file.path 
                        ? 'bg-bg-tertiary border-coral text-text-primary' 
                        : 'bg-transparent border-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                    }`}
                    title={file.path}
                  >
                    <FileText size={14} className="flex-shrink-0 text-blueberry" />
                    <span className="flex-1 truncate font-medium">{file.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!hasFiles && (
            <div className="text-center py-8">
              <FolderOpen size={32} className="mx-auto text-text-muted mb-2" />
              <p className="text-sm text-text-muted">No folder open</p>
              <p className="text-xs text-text-muted mt-1">Click Open to browse files</p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}