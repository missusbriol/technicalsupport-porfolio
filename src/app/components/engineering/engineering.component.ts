import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-engineering',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './engineering.component.html',
  styleUrls: ['./engineering.component.scss'],
})
export class EngineeringComponent {
  nodes = ['Customer', 'Support', 'QA', 'Engineering'];
}
