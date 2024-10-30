'use client';

import React, { useEffect } from 'react';
import { ToastProps } from '@/types/types';

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md animate-slide-in max-w-sm ${
        type === 'success'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      <div className='flex justify-between items-center gap-2'>
        <p>{message}</p>
        <button
          onClick={onClose}
          className='text-gray-500 hover:text-gray-700'
          aria-label='Close'
        >
          ×
        </button>
      </div>
    </div>
  );
};
