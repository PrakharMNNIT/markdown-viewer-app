/**
 * @file slugHelpers.js
 * @description Utilities for generating URL-safe slugs from text (for anchor links)
 * @module utils/slugHelpers
 */

// Singleton map to track duplicate headings per parse session
const headingSlugMap = new Map();

// Pre-compiled slug replacements (zero GC pressure per render)
const SLUG_REPLACEMENTS = [
  [/c\+\+/gi, 'cpp'],
  [/c#/gi, 'csharp'],
  [/f#/gi, 'fsharp'],
  [/\.net/gi, 'dotnet'],
];

/**
 * Reset slug map (call before each parse)
 */
export function resetSlugMap() {
  headingSlugMap.clear();
}

/**
 * Generate URL-safe slug from heading text
 * @param {string} text - Raw heading text (may include HTML)
 * @param {Map<string, number>} [seen] - Duplicate tracking map (defaults to module singleton)
 * @returns {string} URL-safe slug
 */
export function generateSlug(text, seen = headingSlugMap) {
  // Strip HTML tags
  let slug = text.replace(/<[^>]*>/g, '');

  // Normalize Unicode
  slug = slug.normalize('NFC').toLowerCase();

  // Replace programming terms (pre-compiled patterns)
  for (const [pattern, replacement] of SLUG_REPLACEMENTS) {
    slug = slug.replace(pattern, replacement);
  }

  // Clean up: remove non-word chars, spaces to hyphens, collapse hyphens
  slug = slug
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Fallback for empty result
  if (!slug) slug = 'section';

  // Handle duplicates (header, header-1, header-2)
  const baseSlug = slug;
  const count = seen.get(baseSlug) || 0;
  if (count > 0) slug = `${baseSlug}-${count}`;
  seen.set(baseSlug, count + 1);

  return slug;
}
