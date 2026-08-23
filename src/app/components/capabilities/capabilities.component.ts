import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { CAPABILITIES } from '../../data/capabilities.data';

@Component({
  selector: 'app-capabilities',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, RevealDirective],
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.scss'],
})
export class CapabilitiesComponent {
  capabilities = CAPABILITIES;
}
