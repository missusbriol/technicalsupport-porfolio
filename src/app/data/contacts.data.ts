import { ContactLink } from '../models/contact-link.model';

export const CONTACTS: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'briolmacasandra@gmail.com',
    icon: 'assets/icons/gmail.svg',
    bg: '#E38FB0',
    href: 'mailto:briolmacasandra@gmail.com'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/ma-casandra-briol',
    icon: 'assets/icons/linkedin.svg',
    bg: '#0A66C2',
    href: 'https://www.linkedin.com/in/ma-casandra-briol-368548264'
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Available for chat',
    icon: 'assets/icons/whatsapp.svg',
    bg: '#25D366',
    href: 'https://wa.me/639662697289'
  }
];
