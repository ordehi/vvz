'use client';

import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { FaBars, FaTimes, FaHome, FaEnvelope, FaStar } from 'react-icons/fa';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const navigationItems = [
    { href: '/', icon: FaHome, text: 'Home' },
    { href: '/contact', icon: FaEnvelope, text: 'Contact' },
    { href: '/testimonials', icon: FaStar, text: 'Testimonials' },
  ];

  return (
    <Disclosure as='nav' className='bg-gray-800 text-white'>
      {({ open }) => (
        <>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <div className='text-lg font-bold'>My Business Card</div>
              </div>
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
              <div className='-mr-2 flex md:hidden'>
                <DisclosureButton className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <FaTimes className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <FaBars className='block h-6 w-6' aria-hidden='true' />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
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
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
