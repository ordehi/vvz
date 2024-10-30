import React from 'react';
import { ButtonProps } from '@/types/types';

const baseStyles =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 focus:ring-gray-500',
  outline:
    'border-2 border-gray-300 bg-transparent text-current hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
  ghost:
    'bg-transparent text-current hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
};

const darkVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary:
    'bg-gray-700 text-gray-100 hover:bg-gray-600 hover:text-white focus:ring-gray-500',
  outline:
    'border-2 border-gray-400 bg-transparent text-current hover:bg-gray-800 hover:text-white focus:ring-gray-500',
  ghost:
    'bg-transparent text-current hover:bg-gray-800 hover:text-white focus:ring-gray-500',
};

const sizes = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
};

const LoadingSpinner: React.FC = () => (
  <svg
    className='animate-spin -ml-1 mr-2 h-4 w-4'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
    />
  </svg>
);

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDarkMode =
    className?.includes('dark') ||
    props['data-dark'] === true ||
    props['aria-theme'] === 'dark';

  const variantStyles = isDarkMode ? darkVariants[variant] : variants[variant];

  const classes = [
    baseStyles,
    variantStyles,
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && <LoadingSpinner />}
      {icon && !isLoading && <span className='mr-2'>{icon}</span>}
      {children}
    </button>
  );
}
