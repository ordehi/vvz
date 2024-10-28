import React from 'react';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function FooterLink({
  href,
  children,
  className = '',
}: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={`hover:text-gray-300 transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  );
}
