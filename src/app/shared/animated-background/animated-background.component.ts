import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

interface Node { x: number; y: number; vx: number; vy: number; r: number; }

/**
 * Soft, slow canvas network background - same technique as the other
 * portfolio project (plain Canvas 2D, no libraries), recolored to the
 * pink/lavender palette and reading ThemeService directly for dark mode.
 */
@Component({
  selector: 'app-animated-background',
  standalone: true,
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.scss'],
})
export class AnimatedBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private themeService = inject(ThemeService);

  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private raf: number | null = null;
  private running = true;
  private reducedMotion = false;
  private width = 0;
  private height = 0;
  private dpr = Math.min(window.devicePixelRatio || 1, 2);

  private onVisibilityChange = () => {
    this.running = document.visibilityState === 'visible' && !this.reducedMotion;
    if (this.running && this.raf === null) this.step();
  };
  private onResize = () => this.resize();

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize();
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    window.addEventListener('resize', this.onResize);

    if (!this.reducedMotion) this.step();
    else this.drawStaticFrame();
  }

  ngOnDestroy(): void {
    this.running = false;
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    window.removeEventListener('resize', this.onResize);
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    canvas.width = this.width * this.dpr;
    canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const count = this.width < 700 ? 14 : 26;
    this.nodes = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
      r: Math.random() * 1.6 + 1.2,
    }));
  }

  private colors() {
    const dark = this.themeService.theme() === 'dark';
    return {
      line: dark ? '150,140,220' : '190,150,200',
      node: dark ? '190,180,240' : '210,160,190',
    };
  }

  private drawStaticFrame(): void {
    const { node } = this.colors();
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const n of this.nodes) {
      this.ctx.fillStyle = `rgba(${node},0.35)`;
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private step = (): void => {
    if (!this.running) return;
    const ctx = this.ctx;
    const { line, node } = this.colors();
    ctx.clearRect(0, 0, this.width, this.height);

    for (const n of this.nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > this.width) n.vx *= -1;
      if (n.y < 0 || n.y > this.height) n.vy *= -1;
    }

    const maxDist = this.width < 700 ? 100 : 140;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i], b = this.nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < maxDist) {
          ctx.strokeStyle = `rgba(${line},${0.10 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of this.nodes) {
      ctx.fillStyle = `rgba(${node},0.5)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    this.raf = requestAnimationFrame(this.step);
  };
}
