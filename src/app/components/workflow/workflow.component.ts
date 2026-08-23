import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { WORKFLOW } from '../../data/workflow.data';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, RevealDirective],
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent {
  steps = WORKFLOW;
}
