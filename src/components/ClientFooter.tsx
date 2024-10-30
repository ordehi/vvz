import React from 'react';
import Link from 'next/link';
import { FooterConfig, FooterLinkProps } from '../types/types';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export const socialIcons = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  email: MdEmail,
  phone: MdPhone,
  location: MdLocationOn,
};

function FooterLink({ href, children, className = '' }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={`hover:text-gray-300 transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  );
}

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
                type: keyof typeof socialIcons;
                href: string;
                label: string;
              }) => {
                const Icon = socialIcons[social.type];
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
