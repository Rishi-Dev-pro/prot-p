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
  github: 'https://github.com/rishikumarshaw',
  email: 'rishi.shaw.dev@gmail.com',
  linkedin: 'https://linkedin.com/in/rishi-kumar-shaw',
};

