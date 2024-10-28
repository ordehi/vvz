import { FooterConfig } from '@/types/types';

export const footerConfig: FooterConfig = {
  company: {
    name: 'Business Name',
    logo: '/api/placeholder/120/60',
    description:
      'We provide exceptional services to our customers with a commitment to quality and innovation.',
  },
  contact: {
    email: 'contact@business.com',
    phone: '+1 (555) 123-4568',
    address: '123 Business Street, City, State 12345',
  },
  quickLinks: [
    { text: 'About Us', href: '/about' },
    { text: 'Services', href: '/services' },
    { text: 'Products', href: '/products' },
    { text: 'Contact', href: '/contact' },
  ],
  social: [
    {
      href: 'https://facebook.com/business',
      label: 'Facebook',
      type: 'facebook',
    },
    { href: 'https://twitter.com/business', label: 'Twitter', type: 'twitter' },
    {
      href: 'https://linkedin.com/company/business',
      label: 'LinkedIn',
      type: 'linkedin',
    },
    {
      href: 'https://instagram.com/business',
      label: 'Instagram',
      type: 'instagram',
    },
  ],
  legal: [
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Cookie Policy', href: '/cookies' },
  ],
};
