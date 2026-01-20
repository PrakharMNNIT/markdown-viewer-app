import { useRef, useEffect } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  isFullWidth?: boolean;
}

export function Editor({ content, onChange, isFullWidth = false }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle tab key for indentation
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        textarea.value = value.substring(0, start) + '  ' + value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        onChange(textarea.value);
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);
    return () => textarea.removeEventListener('keydown', handleKeyDown);
  }, [onChange]);

  return (
    <div className={`app-editor flex flex-col bg-bg-primary ${isFullWidth ? 'flex-1' : 'flex-1'}`}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full h-full p-6 font-mono text-sm leading-relaxed text-text-primary bg-transparent border-none resize-none focus:outline-none placeholder:text-text-muted"
        placeholder="Start writing markdown..."
        spellCheck={false}
        aria-label="Markdown editor"
      />
    </div>
  );
}