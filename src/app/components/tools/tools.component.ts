import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { TOOLS } from '../../data/tools.data';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent {
  tools = TOOLS;

  floatDelay(i: number): string { return `${(i % 5) * 0.7}s`; }
  floatDur(i: number): string { return `${6 + (i % 4)}s`; }
}
