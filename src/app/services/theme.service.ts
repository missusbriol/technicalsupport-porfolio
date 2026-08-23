import { Injectable, signal } from '@angular/core';

/**
 * Same pattern as the other portfolio project: a signal-based theme
 * state, persisted to localStorage, falling back to the OS
 * `prefers-color-scheme` on first visit. `data-theme` on <body>
 * drives the color variables defined in styles.scss.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'elegant-portfolio-theme';

  readonly theme = signal<'light' | 'dark'>('light');

  constructor() {
    const saved = localStorage.getItem(this.storageKey) as 'light' | 'dark' | null;
    if (saved === 'light' || saved === 'dark') {
      this.setTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  toggle(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(value: 'light' | 'dark'): void {
    this.theme.set(value);
    localStorage.setItem(this.storageKey, value);
    document.body.setAttribute('data-theme', value);
  }
}
