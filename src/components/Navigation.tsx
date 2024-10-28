'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaEnvelope,
  FaStar,
  FaChevronDown,
} from 'react-icons/fa';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverflow, setShowOverflow] = useState(false);
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { href: '/', icon: FaHome, text: 'Home' },
    { href: '/contact', icon: FaEnvelope, text: 'Contact' },
    { href: '/testimonials', icon: FaStar, text: 'Testimonials' },
    { href: '/about', icon: FaStar, text: 'About' },
    { href: '/services', icon: FaStar, text: 'Services' },
    { href: '/portfolio', icon: FaStar, text: 'Portfolio' },
    { href: '/blog', icon: FaStar, text: 'Blog' },
    { href: '/pricing', icon: FaStar, text: 'Pricing' },
  ];

  const visibleItems = navigationItems.slice(0, 3);
  const overflowItems = navigationItems.slice(3);

  useEffect(() => {
    const checkOverflow = () => {
      if (navRef.current) {
        const navWidth = navRef.current.offsetWidth;
        const itemsWidth = Array.from(
          navRef.current.children as HTMLCollectionOf<HTMLElement>
        )
          .slice(0, 4) // 3 items + dropdown button
          .reduce(
            (total, item) => total + (item as HTMLElement).offsetWidth,
            0
          );
        setShouldShowDropdown(itemsWidth > navWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOverflow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleOverflow = () => {
    setShowOverflow(!showOverflow);
  };

  return (
    <nav className='bg-gray-800 text-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='text-lg font-bold whitespace-nowrap'>
              My Business Card
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center' ref={navRef}>
              {visibleItems.map((item) => (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  className='px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap'
                >
                  {item.text}
                </NavigationLink>
              ))}

              {/* Overflow Dropdown */}
              {overflowItems.length > 0 && !shouldShowDropdown && (
                <div className='relative' ref={dropdownRef}>
                  <button
                    onClick={toggleOverflow}
                    className='px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 hover:bg-gray-700'
                  >
                    <span>More</span>
                    <FaChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showOverflow ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {showOverflow && (
                    <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5'>
                      <div className='py-1'>
                        {overflowItems.map((item) => (
                          <NavigationLink
                            key={item.href}
                            href={item.href}
                            icon={item.icon}
                            className='block px-4 py-2 text-sm hover:bg-gray-600 whitespace-nowrap'
                          >
                            {item.text}
                          </NavigationLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
              <NavigationLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700'
              >
                {item.text}
              </NavigationLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
