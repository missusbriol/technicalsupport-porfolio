import { Component, EventEmitter, Output, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const INIT_LINES = [
  'CUSTOMER SUPPORT',
  'TECHNICAL SUPPORT',
  'L2 / L3 SUPPORT',
  'QA DIAGNOSTICS',
  'APPLICATION SUPPORT',
];

/**
 * Full-screen splash shown once on load. Reveals each line on a
 * stagger, then auto-dismisses (~2s total) - well under the "don't
 * make the recruiter wait" ceiling. Skippable at any point, and
 * skipped entirely for prefers-reduced-motion.
 */
@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit, OnDestroy {
  @Output() finished = new EventEmitter<void>();

  lines = INIT_LINES;
  step = signal(0);
  ready = signal(false);

  private timers: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      this.finished.emit();
      return;
    }

    this.lines.forEach((_, i) => {
      this.timers.push(setTimeout(() => this.step.set(i + 1), 260 + i * 220));
    });
    this.timers.push(
      setTimeout(() => this.ready.set(true), 260 + this.lines.length * 220 + 200)
    );
    this.timers.push(
      setTimeout(() => this.finished.emit(), 260 + this.lines.length * 220 + 900)
    );
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
  }

  skip(): void {
    this.finished.emit();
  }
}