import React from 'react';
import FooterLink from './FooterLink';
import { FaEnvelope, FaGlobe } from 'react-icons/fa';

export default function Footer() {
  const footerItems = [
    {
      href: 'mailto:john.doe@example.com',
      icon: FaEnvelope,
      text: 'john.doe@example.com',
    },
    {
      href: 'https://www.linkedin.com/in/johndoe',
      icon: FaGlobe,
      text: 'LinkedIn',
    },
  ];

  return (
    <footer className='bg-gray-800 text-white p-4 text-center'>
      <div className='container mx-auto flex flex-col items-center gap-4'>
        {footerItems.map((item) => (
          <FooterLink key={item.href} href={item.href} icon={item.icon}>
            {item.text}
          </FooterLink>
        ))}
      </div>
    </footer>
  );
}
