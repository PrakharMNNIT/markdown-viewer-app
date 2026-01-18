import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CodeBlockCopyService } from '../../../src/js/services/CodeBlockCopyService';

describe('CodeBlockCopyService', () => {
  let service;
  let container;

  beforeEach(() => {
    service = new CodeBlockCopyService();
    container = document.createElement('div');

    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(),
      },
    });

    // Mock timers
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should add copy buttons to pre elements', () => {
    // Setup
    const pre = document.createElement('pre');
    pre.innerHTML = '<code>const x = 1;</code>';
    container.appendChild(pre);

    // Execute
    service.addCopyButtons(container);

    // Verify
    const btn = pre.querySelector('.code-copy-btn');
    expect(btn).toBeTruthy();
    expect(pre.style.position).toBe('relative');
    expect(btn.innerHTML).toContain('<svg');
  });

  it('should remove existing buttons before adding new ones', () => {
    // Setup
    const pre = document.createElement('pre');
    pre.innerHTML = '<button class="code-copy-btn">Old</button><code>code</code>';
    container.appendChild(pre);

    // Execute
    service.addCopyButtons(container);

    // Verify
    const buttons = pre.querySelectorAll('.code-copy-btn');
    expect(buttons.length).toBe(1);
    expect(buttons[0].textContent).not.toBe('Old');
  });

  it('should copy code to clipboard on click', async () => {
    // Setup
    const pre = document.createElement('pre');
    pre.innerHTML = '<code>const test = "value";</code>';
    container.appendChild(pre);
    service.addCopyButtons(container);

    const btn = pre.querySelector('.code-copy-btn');

    // Execute
    await btn.click();

    // Verify
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const test = "value";');
  });

  it('should fall back to pre textContent if code element missing', async () => {
    // Setup
    const pre = document.createElement('pre');
    pre.textContent = 'raw text content';
    container.appendChild(pre);
    service.addCopyButtons(container);

    const btn = pre.querySelector('.code-copy-btn');

    // Execute
    await btn.click();

    // Verify
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('raw text content');
  });

  it('should show copied state on success', async () => {
    // Setup
    const pre = document.createElement('pre');
    pre.innerHTML = '<code>code</code>';
    container.appendChild(pre);
    service.addCopyButtons(container);
    const btn = pre.querySelector('.code-copy-btn');

    // Execute
    await btn.click();

    // Verify
    expect(btn.classList.contains('copied')).toBe(true);

    // Fast-forward timer
    vi.advanceTimersByTime(2000);
    expect(btn.classList.contains('copied')).toBe(false);
  });

  it('should show error state on failure', async () => {
    // Setup
    navigator.clipboard.writeText.mockRejectedValue(new Error('Failed'));

    const pre = document.createElement('pre');
    pre.innerHTML = '<code>code</code>';
    container.appendChild(pre);
    service.addCopyButtons(container);
    const btn = pre.querySelector('.code-copy-btn');

    // Execute
    await btn.click();

    // Verify
    expect(btn.classList.contains('error')).toBe(true);

    // Fast-forward timer
    vi.advanceTimersByTime(1000);
    expect(btn.classList.contains('error')).toBe(false);
  });
});
