import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';
import { TRAITS } from '../../data/traits.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  traits = TRAITS;

  // Floating "support concept" cards - visual only, not live data.
  // (title + short status line, matching the reference layout)
  floatCards = [
    { title: 'Ticket #10482', sub: 'In Progress', delay: 0 },
    { title: 'System Status', sub: 'All Systems Operational', delay: 0.5 },
    { title: 'User Supported', sub: 'Laptop issue resolved', delay: 1.0 },
    { title: 'Issue Resolved', sub: 'User can now access shared documents', delay: 1.5 },
  ];

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
