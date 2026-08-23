import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Reusable "eyebrow + heading (+ optional subtext)" pair. */
@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent {
  @Input() eyebrow = '';
  @Input() heading = '';
  @Input() subtext = '';
}
