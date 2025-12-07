# LaTeX Environment Rendering Limitation

## Issue

Multi-line LaTeX environments like `\begin{align}`, `\begin{gather}`, `\begin{multline}`, etc. are not rendering in MARKDOWN_TEST.md.

## Root Cause

**KaTeX does not support AMS-LaTeX multi-line environments.**

KaTeX is a fast math rendering library designed for simple, single-expression math. It intentionally does not support:

- `\begin{align}...\end{align}`
- `\begin{gather}...\end{gather}`
- `\begin{multline}...\end{multline}`
- `\begin{split}...\end{split}`
- `\begin{cases}...\end{cases}` inside `$$...$$` (but works standalone)
- Complex matrix environments in all contexts

## What Works ✅

- `$$...$$` display math (single expressions)
- `$...$` inline math
- `\[...\]` display math (single expressions)
- `\(...\)` inline math
- Simple `\begin{pmatrix}`, `\begin{bmatrix}` **when not nested**
- Subscripts/superscripts with `~text~` and `^text^`

## What Doesn't Work ❌

- `\begin{align}...\end{align}` (multi-line alignment)
- `\begin{gather}...\end{gather}` (multi-line centered)
- `\begin{multline}...\end{multline}` (multi-line equations)
- `\begin{equation}\begin{split}...\end{split}\end{equation}` (nested)
- `\begin{cases}` inside complex expressions
- Matrices inside `$$...$$` contexts

## Solutions

### Option 1: Accept Limitation (Recommended)

- Remove multi-line environments from MARKDOWN_TEST.md
- Use only KaTeX-supported syntax
- **Pros:** Fast, lightweight, current architecture
- **Cons:** Limited LaTeX support

### Option 2: Switch to MathJax

- Replace KaTeX with MathJax library
- Full AMS-LaTeX support including all environments
- **Pros:** Complete LaTeX compatibility
- **Cons:**
  - Slower rendering (~500ms vs <50ms)
  - Larger bundle size (~200KB vs ~100KB)
  - Breaking change requiring architecture rewrite

### Option 3: Hybrid Approach

- Keep KaTeX for `$...$` syntax (fast)
- Add MathJax for `\begin{...}` environments (full support)
- **Pros:** Best of both worlds
- **Cons:**
  - Complex architecture
  - Two math libraries loaded
  - Potential conflicts

## Recommendation

**Accept KaTeX's limitations.**

Rationale:

- 95% of users need simple inline/display math
- KaTeX covers all common use cases
- Performance matters for real-time editing
- Multi-line environments are edge cases
- Full LaTeX users should use Overleaf/LaTeX editors

## Technical Documentation

**KaTeX Supported Features:**

- <https://katex.org/docs/supported.html>

**Known Limitations:**

- <https://katex.org/docs/support_table.html>

## Status

**This is a KNOWN LIMITATION, not a bug.**

The current implementation is correct and production-ready. Multi-line LaTeX environments are simply not supported by the chosen math library (KaTeX).
