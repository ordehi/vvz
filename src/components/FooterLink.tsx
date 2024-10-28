import React from 'react';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  icon: React.ComponentType<{ className: string }>;
  children: React.ReactNode;
}

export default function FooterLink({
  href,
  icon: Icon,
  children,
}: FooterLinkProps) {
  return (
    <Link
      href={href}
      className='flex items-center gap-2 text-gray-300 hover:text-white'
    >
      <Icon className='w-5 h-5' />
      {children}
    </Link>
  );
}
