import { FooterConfig } from '../types/types';
import Image from 'next/image';
import FooterLink from './FooterLink';
import ClientFooter from './ClientFooter';

export default function Footer({
  footerConfig,
}: {
  footerConfig: FooterConfig;
}) {
  const currentYear = new Date().getFullYear();

  function getSectionCount() {
    let count = 0;
    if (footerConfig?.company) count++;
    if (footerConfig?.quickLinks?.length) count++;
    if (footerConfig?.contact) count++;
    if (footerConfig?.social?.length) count++;
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

          {/* Render client-side components */}
          <ClientFooter footerConfig={footerConfig} />
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
