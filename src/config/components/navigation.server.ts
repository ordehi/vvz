import { NavigationConfig } from '@/types/types';

export const navigationConfig: NavigationConfig = {
  items: [
    { href: '/', text: 'Home', type: 'home' },
    { href: '/contact', text: 'Contact', type: 'envelope' },
    { href: '/testimonials', text: 'Testimonials', type: 'star' },
    { href: '/about', text: 'About', type: 'star' },
    { href: '/services', text: 'Services', type: 'star' },
    { href: '/portfolio', text: 'Portfolio', type: 'star' },
    { href: '/blog', text: 'Blog', type: 'star' },
    { href: '/pricing', text: 'Pricing', type: 'star' },
  ],
};
