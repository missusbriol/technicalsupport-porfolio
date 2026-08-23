import { WorkflowStep } from '../models/workflow-step.model';

export const WORKFLOW: WorkflowStep[] = [
  { n: '01', label: 'Understand', icon: '👤' },
  { n: '02', label: 'Clarify', icon: '💬' },
  { n: '03', label: 'Troubleshoot', icon: '🔧' },
  { n: '04', label: 'Investigate', icon: '🔍' },
  { n: '05', label: 'Resolve', icon: '✅' },
  { n: '06', label: 'Escalate when needed', icon: '⬆️' },
  { n: '07', label: 'Communicate', icon: '✉️' },
];
