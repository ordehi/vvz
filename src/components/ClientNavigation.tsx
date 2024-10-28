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

type NavItem = {
  href: string;
  text: string;
  type: 'home' | 'envelope' | 'star';
};

interface ClientNavigationProps {
  navigationConfig: {
    items: NavItem[];
  };
}

const iconMap = {
  home: FaHome,
  envelope: FaEnvelope,
  star: FaStar,
};

export default function ClientNavigation({
  navigationConfig,
}: ClientNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { items } = navigationConfig;
  const visibleItems = items.slice(0, 3);
  const overflowItems = items.slice(3);

  useEffect(() => {
    const checkOverflow = () => {
      if (navRef.current) {
        const navWidth = navRef.current.offsetWidth;
        const itemsWidth = Array.from(
          navRef.current.children as HTMLCollectionOf<HTMLElement>
        )
          .slice(0, 4)
          .reduce((total, item) => total + item.offsetWidth, 0);

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
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className='max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between h-16'>
        {/* Desktop Navigation */}
        <div className='hidden md:flex md:items-center md:justify-end md:flex-1'>
          <div className='flex items-center justify-end space-x-2' ref={navRef}>
            {visibleItems.map((item) => {
              const Icon = iconMap[item.type];
              return (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  icon={Icon}
                  className='px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap hover:bg-gray-700 text-gray-300 hover:text-white'
                >
                  {item.text}
                </NavigationLink>
              );
            })}

            {/* Overflow Dropdown */}
            {overflowItems.length > 0 && !shouldShowDropdown && (
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className='px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 hover:bg-gray-700 text-gray-300 hover:text-white'
                >
                  <span>More</span>
                  <FaChevronDown
                    className={`ml-1 w-4 h-4 transition-transform ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-50'>
                    <div className='py-1'>
                      {overflowItems.map((item) => {
                        const Icon = iconMap[item.type];
                        return (
                          <NavigationLink
                            key={item.href}
                            href={item.href}
                            icon={Icon}
                            className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white whitespace-nowrap'
                          >
                            {item.text}
                          </NavigationLink>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className='flex md:hidden'>
          <button
            onClick={toggleMobileMenu}
            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700'
            aria-expanded={isMobileMenuOpen}
          >
            <span className='sr-only'>
              {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            </span>
            {isMobileMenuOpen ? (
              <FaTimes className='block h-6 w-6' aria-hidden='true' />
            ) : (
              <FaBars className='block h-6 w-6' aria-hidden='true' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden absolute top-16 left-0 w-full bg-gray-800 border-t border-gray-700'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {items.map((item) => {
              const Icon = iconMap[item.type];
              return (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  icon={Icon}
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'
                >
                  {item.text}
                </NavigationLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
