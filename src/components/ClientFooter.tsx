'use client';

import React from 'react';
import FooterLink from './FooterLink';
import { clientIcons } from '@/config/components/footer.client';
import { FooterConfig } from '../types/types';

interface ClientFooterProps {
  footerConfig: FooterConfig;
}

export default function ClientFooter({ footerConfig }: ClientFooterProps) {
  return (
    <>
      {/* Contact Info */}
      {footerConfig?.contact && (
        <div>
          <h3 className='text-white font-semibold mb-4'>Contact Us</h3>
          <ul className='space-y-2'>
            {footerConfig.contact.email && (
              <li className='flex items-center gap-2'>
                <clientIcons.MdEmail size={16} />
                <FooterLink href={`mailto:${footerConfig.contact.email}`}>
                  {footerConfig.contact.email}
                </FooterLink>
              </li>
            )}
            {footerConfig.contact.phone && (
              <li className='flex items-center gap-2'>
                <clientIcons.MdPhone size={16} />
                <FooterLink href={`tel:${footerConfig.contact.phone}`}>
                  {footerConfig.contact.phone}
                </FooterLink>
              </li>
            )}
            {footerConfig.contact.address && (
              <li className='flex items-center gap-2'>
                <clientIcons.MdLocationOn size={16} />
                <span className='text-sm'>{footerConfig.contact.address}</span>
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
            {footerConfig.social?.map(
              (social: {
                type: keyof typeof clientIcons;
                href: string;
                label: string;
              }) => {
                const Icon = clientIcons[social.type];
                return (
                  <FooterLink
                    key={social.href}
                    href={social.href}
                    className='hover:text-white'
                    aria-label={social.label}
                  >
                    {Icon && <Icon size={20} />}
                  </FooterLink>
                );
              }
            )}
          </div>
        </div>
      )}
    </>
  );
}
