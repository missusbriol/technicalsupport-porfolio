import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-international',
  standalone: true,
  imports: [SectionHeaderComponent, RevealDirective],
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.scss'],
})
export class InternationalComponent {}
