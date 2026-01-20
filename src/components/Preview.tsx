import { useMemo, useDeferredValue } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface PreviewProps {
  content: string;
  isFullWidth?: boolean;
}

// Configure marked for GFM
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function Preview({ content, isFullWidth = false }: PreviewProps) {
  // Defer heavy parsing to prevent UI jank
  const deferredContent = useDeferredValue(content);
  
  const html = useMemo(() => {
    // Parse markdown with marked
    const rawHtml = marked.parse(deferredContent, { async: false }) as string;
    // Sanitize with DOMPurify to prevent XSS
    return DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['target', 'rel'],
    });
  }, [deferredContent]);

  return (
    <div 
      className={`preview-container flex-1 overflow-auto bg-background text-foreground ${isFullWidth ? '' : ''}`}
    >
      <article 
        className="preview-content max-w-prose mx-auto p-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}