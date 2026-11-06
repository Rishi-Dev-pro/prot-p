export interface NavItem {
  label: string;
  href: string;
  code: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'INDEX', href: '#hero', code: '00' },
  { label: 'ABOUT', href: '#about', code: '01' },
  { label: 'PROJECTS', href: '#projects', code: '02' },
  { label: 'ARCHITECTURE', href: '#architecture', code: '03' },
  { label: 'STACK', href: '#stack', code: '04' },
  { label: 'EXPERIMENTS', href: '#experiments', code: '05' },
  { label: 'CONTACT', href: '#contact', code: '06' },
];

export const SOCIAL_LINKS = {
  name: 'Rishi Kumar Shaw',
  navbarName: 'Rishi',
  github: 'https://github.com/Rishi-Dev-pro/',
  email: 'rishishaw23022006@gmail.com',
  phone: '6291169468',
  phoneFormatted: '+91 6291169468',
  linkedin: 'https://www.linkedin.com/in/rishi-shaw-389800389/',
};
