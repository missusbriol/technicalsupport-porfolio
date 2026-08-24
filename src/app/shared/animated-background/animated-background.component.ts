import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

interface Node { x: number; y: number; vx: number; vy: number; r: number; }
interface Pulse { x: number; y: number; tx: number; ty: number; t: number; }

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
  private pulses: Pulse[] = [];
  private pulseTimer = 0;
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

    const count = this.width < 700 ? 18 : 34;
    this.nodes = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.07,
      vy: (Math.random() - 0.5) * 0.07,
      r: Math.random() * 1.4 + 1,
    }));
    this.pulses = [];
  }

  private drawStaticFrame(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const n of this.nodes) {
      this.ctx.fillStyle = 'rgba(140,170,245,0.4)';
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private step = (): void => {
    if (!this.running) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Layer 2: nodes drift
    for (const n of this.nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > this.width) n.vx *= -1;
      if (n.y < 0 || n.y > this.height) n.vy *= -1;
    }

    // Layer 3: connection lines between nearby nodes
    const maxDist = this.width < 700 ? 110 : 150;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i], b = this.nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < maxDist) {
          ctx.strokeStyle = `rgba(94,141,239,${0.14 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of this.nodes) {
      ctx.fillStyle = 'rgba(140,170,245,0.55)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Layer 4: occasional glowing pulse traveling between two nodes
    this.pulseTimer++;
    if (this.pulseTimer > 90 && this.nodes.length > 4) {
      this.pulseTimer = 0;
      const a = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      const b = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      this.pulses.push({ x: a.x, y: a.y, tx: b.x, ty: b.y, t: 0 });
    }
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.t += 0.02;
      if (p.t >= 1) { this.pulses.splice(i, 1); continue; }
      const px = p.x + (p.tx - p.x) * p.t;
      const py = p.y + (p.ty - p.y) * p.t;
      ctx.fillStyle = 'rgba(227,168,87,0.85)';
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    this.raf = requestAnimationFrame(this.step);
  };
}