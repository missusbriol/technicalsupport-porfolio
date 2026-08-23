import { Tool } from '../models/tool.model';

/** Edit this array to add/remove tools - only list ones you actually use. */
export const TOOLS: Tool[] = [
  { id: 'gmail',       label: 'Gmail',       icon: 'assets/icons/gmail.svg',       bg: '#EA4335' },
  { id: 'word',        label: 'Word',        icon: 'assets/icons/word.svg',        bg: '#2B579A' },
  { id: 'excel',       label: 'Excel',       icon: 'assets/icons/excel.svg',       bg: '#217346' },
  { id: 'sharepoint',  label: 'SharePoint',  icon: 'assets/icons/sharepoint.svg',  bg: '#038387' },
  { id: 'teams',       label: 'Teams',       icon: 'assets/icons/teams.svg',       bg: '#6264A7' },
  { id: 'onedrive',    label: 'OneDrive',    icon: 'assets/icons/onedrive.svg',    bg: '#0364B8' },
  { id: 'bmc',         label: 'BMC',         icon: 'assets/icons/bmc.svg',         bg: '#FF6600' },
  { id: 'servicedesk', label: 'ServiceDesk', icon: 'assets/icons/servicedesk.svg', bg: '#4CAF93' },
];

/** Open slots shown as ghost/dashed boxes - replace or remove. */
export const TOOL_PLACEHOLDERS = ['[ADD TOOL]', '[ADD TOOL]', '[ADD TOOL]'];
