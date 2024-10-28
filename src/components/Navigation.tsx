'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaEnvelope, FaStar } from 'react-icons/fa';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: '/', icon: FaHome, text: 'Home' },
    { href: '/contact', icon: FaEnvelope, text: 'Contact' },
    { href: '/testimonials', icon: FaStar, text: 'Testimonials' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-gray-800 text-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='text-lg font-bold'>My Business Card</div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {navigationItems.map((item) => (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.text}
                </NavigationLink>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='-mr-2 flex md:hidden'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-expanded={isOpen}
              aria-controls='mobile-menu'
            >
              <span className='sr-only'>
                {isOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {isOpen ? (
                <FaTimes className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <FaBars className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id='mobile-menu' className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {navigationItems.map((item) => (
              <NavigationLink key={item.href} href={item.href} icon={item.icon}>
                {item.text}
              </NavigationLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
