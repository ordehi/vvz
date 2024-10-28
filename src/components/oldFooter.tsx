'use client';

import React from 'react';
import Image from 'next/image';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import FooterLink from './FooterLink';

type SocialLink = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
};

interface FooterConfig {
  company?: {
    logo?: string;
    description?: string;
    name?: string;
  };
  quickLinks?: { href: string; text: string }[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  social?: SocialLink[];
  legal?: { href: string; text: string }[];
}

export default function Footer({
  footerConfig,
}: {
  footerConfig: FooterConfig;
}) {
  const currentYear = new Date().getFullYear();

  // Calculate the number of sections to determine grid columns
  function getSectionCount() {
    let count = 0;
    if (footerConfig?.company) count++;
    if (footerConfig?.quickLinks?.length) count++;
    if (footerConfig?.contact) count++;
    if (footerConfig?.social?.length) count++;
    return count;
  }

  // Get grid columns class based on section count
  function getGridClass() {
    const count = getSectionCount();
    switch (count) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'md:grid-cols-2';
      case 3:
        return 'md:grid-cols-2 lg:grid-cols-3';
      default:
        return 'md:grid-cols-2 lg:grid-cols-4';
    }
  }

  return (
    <footer className='bg-gray-800 text-gray-300'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className={`grid grid-cols-1 ${getGridClass()} gap-8`}>
          {/* Company Info */}
          {footerConfig?.company && (
            <div className='space-y-4'>
              {footerConfig.company.logo && (
                <Image
                  src={footerConfig.company.logo}
                  alt='logo'
                  width={120}
                  height={60}
                />
              )}
              {footerConfig.company.description && (
                <p className='text-sm'>{footerConfig.company.description}</p>
              )}
            </div>
          )}

          {/* Quick Links */}
          {(footerConfig?.quickLinks?.length ?? 0) > 0 && (
            <div>
              <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
              <ul className='space-y-2'>
                {footerConfig.quickLinks?.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.text}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          {footerConfig?.contact && (
            <div>
              <h3 className='text-white font-semibold mb-4'>Contact Us</h3>
              <ul className='space-y-2'>
                {footerConfig.contact.email && (
                  <li className='flex items-center gap-2'>
                    <MdEmail size={16} />
                    <FooterLink href={`mailto:${footerConfig.contact.email}`}>
                      {footerConfig.contact.email}
                    </FooterLink>
                  </li>
                )}
                {footerConfig.contact.phone && (
                  <li className='flex items-center gap-2'>
                    <MdPhone size={16} />
                    <FooterLink href={`tel:${footerConfig.contact.phone}`}>
                      {footerConfig.contact.phone}
                    </FooterLink>
                  </li>
                )}
                {footerConfig.contact.address && (
                  <li className='flex items-center gap-2'>
                    <MdLocationOn size={16} />
                    <span className='text-sm'>
                      {footerConfig.contact.address}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {(footerConfig?.social?.length ?? 0) > 0 && (
            <div>
              <h3 className='text-white font-semibold mb-4'>Follow Us</h3>
              <div className='flex gap-4'>
                {footerConfig.social?.map((social: SocialLink) => (
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
          )}
        </div>
      </div>

      {/* Bottom Bar - Only render if company name or legal links exist */}
      {(footerConfig?.company?.name ||
        (footerConfig?.legal?.length ?? 0) > 0) && (
        <div className='border-t border-gray-700'>
          <div className='container mx-auto px-4 py-4'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              {/* Copyright */}
              {footerConfig?.company?.name && (
                <p className='text-sm'>
                  © {currentYear} {footerConfig.company.name}. All rights
                  reserved.
                </p>
              )}

              {/* Legal Links */}
              {(footerConfig?.legal?.length ?? 0) > 0 && (
                <div className='flex gap-6'>
                  {footerConfig.legal?.map((link) => (
                    <FooterLink
                      key={link.href}
                      href={link.href}
                      className='text-sm'
                    >
                      {link.text}
                    </FooterLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
