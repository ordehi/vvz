'use client';

import React from 'react';
import Image from 'next/image';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';
import FooterLink from './FooterLink';

const footerConfig = {
  company: {
    name: 'Business Name',
    logo: '/api/placeholder/120/60', // Placeholder logo
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-gray-300'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <Image
              src={footerConfig.company.logo}
              alt='logo'
              width={120}
              height={60}
            />
            <p className='text-sm'>{footerConfig.company.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {footerConfig.quickLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.text}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Contact Us</h3>
            <ul className='space-y-2'>
              <li className='flex items-center gap-2'>
                <MdEmail size={16} />
                <FooterLink href={`mailto:${footerConfig.contact.email}`}>
                  {footerConfig.contact.email}
                </FooterLink>
              </li>
              <li className='flex items-center gap-2'>
                <MdPhone size={16} />
                <FooterLink href={`tel:${footerConfig.contact.phone}`}>
                  {footerConfig.contact.phone}
                </FooterLink>
              </li>
              <li className='flex items-center gap-2'>
                <MdLocationOn size={16} />
                <span className='text-sm'>{footerConfig.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Follow Us</h3>
            <div className='flex gap-4'>
              {footerConfig.social.map((social) => (
                <FooterLink
                  key={social.href}
                  href={social.href}
                  className='hover:text-white'
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-700'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            {/* Copyright */}
            <p className='text-sm'>
              © {currentYear} {footerConfig.company.name}. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className='flex gap-6'>
              {footerConfig.legal.map((link) => (
                <FooterLink
                  key={link.href}
                  href={link.href}
                  className='text-sm'
                >
                  {link.text}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
