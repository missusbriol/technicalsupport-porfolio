import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { L2, L3 } from '../../data/support.data';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, RevealDirective],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  l2 = L2;
  l3 = L3;
}
