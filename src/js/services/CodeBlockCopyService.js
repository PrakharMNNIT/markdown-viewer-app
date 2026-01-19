/**
 * CodeBlockCopyService - Modern Copy Button Management
 *
 * Adds premium glassmorphism copy buttons to code blocks with:
 * - Smooth animations and state transitions
 * - Visual feedback (copied state with checkmark)
 * - Keyboard accessibility
 * - Theme-aware styling
 */

export class CodeBlockCopyService {
  constructor() {
    this.copyTimeout = null;
  }

  /**
   * Add modern copy buttons to all code blocks in container
   * @param {HTMLElement} container - Container with code blocks
   */
  addCopyButtons(container) {
    const codeBlocks = container.querySelectorAll('pre');

    codeBlocks.forEach(pre => {
      // Remove old button if exists
      const existingBtn = pre.querySelector('.code-copy-btn');
      if (existingBtn) {
        existingBtn.remove();
      }

      // Create button wrapper
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      copyBtn.setAttribute('title', 'Copy code');

      // SVG Icons
      const copyIcon = `
        <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;

      const checkIcon = `
        <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;

      copyBtn.innerHTML = copyIcon + checkIcon;

      // Click handler
      copyBtn.addEventListener('click', async e => {
        e.preventDefault();
        e.stopPropagation();

        const codeElement = pre.querySelector('code');
        const textToCopy = codeElement ? codeElement.textContent : pre.textContent;

        try {
          await navigator.clipboard.writeText(textToCopy);
          this.showCopiedState(copyBtn);
        } catch (err) {
          console.error('Copy failed:', err);
          this.showErrorState(copyBtn);
        }
      });

      // Position relative for absolute button
      pre.style.position = 'relative';
      pre.appendChild(copyBtn);
    });
  }

  /**
   * Show "copied" state with checkmark animation
   * @param {HTMLElement} btn - Copy button element
   */
  showCopiedState(btn) {
    btn.classList.add('copied');

    // Clear existing timeout
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }

    // Reset after 2 seconds
    this.copyTimeout = setTimeout(() => {
      btn.classList.remove('copied');
    }, 2000);
  }

  /**
   * Show error state briefly
   * @param {HTMLElement} btn - Copy button element
   */
  showErrorState(btn) {
    btn.classList.add('error');
    setTimeout(() => {
      btn.classList.remove('error');
    }, 1000);
  }
}
