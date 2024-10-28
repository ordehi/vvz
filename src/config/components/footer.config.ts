'use client';

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';

export const footerConfig = {
  company: {
    name: 'Business Name',
    logo: '/api/placeholder/120/60',
    description:
      'We provide exceptional services to our customers with a commitment to quality and innovation.',
  },
  contact: {
    email: 'contact@business.com',
    phone: '+1 (555) 123-4567',
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
      icon: FaFacebookF,
      href: 'https://facebook.com/business',
      label: 'Facebook',
    },
    { icon: FaTwitter, href: 'https://twitter.com/business', label: 'Twitter' },
    {
      icon: FaLinkedinIn,
      href: 'https://linkedin.com/company/business',
      label: 'LinkedIn',
    },
    {
      icon: FaInstagram,
      href: 'https://instagram.com/business',
      label: 'Instagram',
    },
  ],
  legal: [
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Cookie Policy', href: '/cookies' },
  ],
};
