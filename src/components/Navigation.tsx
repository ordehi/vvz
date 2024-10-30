import Link from 'next/link';
import { NavigationConfig, NavigationLinkProps } from '../types/types';
import { FaHome, FaEnvelope, FaStar, FaChevronDown } from 'react-icons/fa';

const iconMap = {
  home: FaHome,
  envelope: FaEnvelope,
  star: FaStar,
};

const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  icon: Icon,
  children,
  className,
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${className}`}
    >
      <Icon className='h-5 w-5' />
      {children}
    </Link>
  );
};

export default function Navigation({
  navigationConfig,
}: {
  navigationConfig: NavigationConfig;
}) {
  const { items } = navigationConfig;
  const visibleItems = items.slice(0, 3);
  const overflowItems = items.slice(3);

  return (
    <nav className='bg-gray-800 text-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='text-lg font-bold whitespace-nowrap'>
            Smart Analytics
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-2'>
            {visibleItems.map((item) => {
              const Icon = iconMap[item.type];
              return (
                <NavigationLink key={item.href} href={item.href} icon={Icon}>
                  {item.text}
                </NavigationLink>
              );
            })}
            {overflowItems.length > 0 && (
              <div className='relative group'>
                <button className='flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                  <span>More</span>
                  <FaChevronDown className='w-4 h-4' />
                </button>
                <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <div className='py-1'>
                    {overflowItems.map((item) => {
                      const Icon = iconMap[item.type];
                      return (
                        <NavigationLink
                          key={item.href}
                          href={item.href}
                          icon={Icon}
                          className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white'
                        >
                          {item.text}
                        </NavigationLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <input type='checkbox' id='menu-toggle' className='hidden peer' />
            <label
              htmlFor='menu-toggle'
              className='cursor-pointer p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700'
            >
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </label>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden'>
        <div className='hidden peer-checked:block bg-gray-800'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
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
      </div>
    </nav>
  );
}
