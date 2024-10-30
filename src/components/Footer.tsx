import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import {
  FooterConfig,
  FooterLinkProps,
  CompanyInfoProps,
  QuickLinksProps,
  ContactInfoProps,
  SocialLinksProps,
} from '../types/types';

const socialIcons = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  email: MdEmail,
  phone: MdPhone,
  location: MdLocationOn,
};

const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={`hover:text-gray-300 transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  );
};

const CompanyInfo: React.FC<CompanyInfoProps> = ({ company }) => {
  if (!company) return null;

  return (
    <div className='space-y-4'>
      {company.logo && (
        <Image src={company.logo} alt='logo' width={120} height={60} />
      )}
      {company.description && <p className='text-sm'>{company.description}</p>}
    </div>
  );
};

const QuickLinks: React.FC<QuickLinksProps> = ({ quickLinks }) => {
  if (!quickLinks?.length) return null;

  return (
    <div>
      <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
      <ul className='space-y-2'>
        {quickLinks.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.text}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  if (!contact) return null;

  return (
    <div>
      <h3 className='text-white font-semibold mb-4'>Contact Us</h3>
      <ul className='space-y-2'>
        {contact.email && (
          <li className='flex items-center gap-2'>
            <MdEmail size={16} />
            <FooterLink href={`mailto:${contact.email}`}>
              {contact.email}
            </FooterLink>
          </li>
        )}
        {contact.phone && (
          <li className='flex items-center gap-2'>
            <MdPhone size={16} />
            <FooterLink href={`tel:${contact.phone}`}>
              {contact.phone}
            </FooterLink>
          </li>
        )}
        {contact.address && (
          <li className='flex items-center gap-2'>
            <MdLocationOn size={16} />
            <span className='text-sm'>{contact.address}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

const SocialLinks: React.FC<SocialLinksProps> = ({ social }) => {
  if (!social?.length) return null;

  return (
    <div>
      <h3 className='text-white font-semibold mb-4'>Follow Us</h3>
      <div className='flex gap-4'>
        {social.map(({ type, href, label }) => {
          const Icon = socialIcons[type];
          return (
            <FooterLink
              key={href}
              href={href}
              className='hover:text-white'
              aria-label={label}
            >
              {Icon && <Icon size={20} />}
            </FooterLink>
          );
        })}
      </div>
    </div>
  );
};

export default function Footer({
  footerConfig,
}: {
  footerConfig: FooterConfig;
}) {
  const currentYear = new Date().getFullYear();

  function getSectionCount() {
    let count = 0;
    if (footerConfig.company) count++;
    if (footerConfig.quickLinks?.length) count++;
    if (footerConfig.contact) count++;
    if (footerConfig.social?.length) count++;
    return count;
  }

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

  const sections = [
    footerConfig.company && (
      <CompanyInfo company={footerConfig.company} key='company' />
    ),
    footerConfig.quickLinks?.length && (
      <QuickLinks quickLinks={footerConfig.quickLinks} key='quickLinks' />
    ),
    footerConfig.contact && (
      <ContactInfo contact={footerConfig.contact} key='contact' />
    ),
    footerConfig.social?.length && (
      <SocialLinks social={footerConfig.social} key='social' />
    ),
  ].filter(Boolean);

  return (
    <footer className='bg-gray-800 text-gray-300'>
      <div className='container mx-auto px-4 py-8'>
        <div className={`grid grid-cols-1 ${getGridClass()} gap-8`}>
          {sections}
        </div>
      </div>

      {(footerConfig.company?.name || footerConfig.legal?.length) && (
        <div className='border-t border-gray-700'>
          <div className='container mx-auto px-4 py-4'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              {footerConfig?.company?.name && (
                <p className='text-sm'>
                  © {currentYear} {footerConfig.company.name}. All rights
                  reserved.
                </p>
              )}

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
