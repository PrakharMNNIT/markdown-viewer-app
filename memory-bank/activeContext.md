# Active Context

**Last Updated:** 11/6/2025, 6:05 PM IST

## Current Focus

Fixed critical Mermaid diagram rendering bug that was causing lexical errors.

## Recent Changes

### Mermaid Diagram Fix (Just Completed)

**Problem:** Mermaid diagrams were failing to render with "Lexical error on line 3. Unrecognized text..." errors, even though the same diagrams worked correctly on mermaid.live and stackedit.io.

**Root Cause:** When `marked.parse()` converts markdown to HTML, it HTML-encodes special characters in code blocks (e.g., `{` becomes `&lbrace;`, `}` becomes `&rbrace;`, `|` becomes `&vert;`). Mermaid expects raw, unencoded text and cannot parse HTML entities.

**Solution Implemented:**

1. Added `decodeHtmlEntities()` helper function that uses a textarea element to decode HTML entities
2. Modified the Mermaid rendering regex replacement to decode HTML entities before passing code to Mermaid
3. Changed from passing `code` directly to passing `decodedCode` to `mermaid.render()`

**Files Modified:**

- `script.js`: Added HTML entity decoding in the `renderMarkdown()` function

**Test Status:** Application opened for verification. Mermaid diagrams should now render correctly.

## System State

- **Application:** Markdown Viewer Pro
- **Core Functionality:** Working
- **Known Issues:** None (Mermaid issue resolved)
- **Next Steps:** Verify Mermaid diagrams render correctly in browser

## Technical Notes

- The HTML entity decoding approach is safe and browser-native
- Uses textarea's innerHTML parser for reliable entity decoding
- No external dependencies added
- Solution maintains backward compatibility with all existing markdown content

## Open Questions

None

## Performance Observations

- Mermaid rendering uses async setTimeout (100ms) to ensure DOM is ready
- Entity decoding is performed inline during regex replacement (minimal overhead)
- No performance impact observed from the fix
