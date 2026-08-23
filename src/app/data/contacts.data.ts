import { ContactLink } from '../models/contact-link.model';

export const CONTACTS: ContactLink[] = [
  { id: 'email',    label: 'Email',    value: '[YOUR EMAIL]',    mark: '@',  bg: '#E38FB0', href: 'mailto:[YOUR EMAIL]' },
  { id: 'linkedin', label: 'LinkedIn', value: '[YOUR LINKEDIN]', mark: 'in', bg: '#0A66C2', href: '[YOUR LINKEDIN]' },
  { id: 'facebook', label: 'Facebook', value: '[YOUR FACEBOOK]', mark: 'f',  bg: '#1877F2', href: '[YOUR FACEBOOK]' },
  { id: 'whatsapp', label: 'WhatsApp', value: '[YOUR WHATSAPP]', mark: 'W',  bg: '#25D366', href: '[YOUR WHATSAPP]' },
  { id: 'viber',    label: 'Viber',    value: '[YOUR VIBER]',    mark: 'V',  bg: '#7360F2', href: '[YOUR VIBER]' },
];
