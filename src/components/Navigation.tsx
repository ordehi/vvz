import { NavigationConfig } from '../types/types';
import ClientNavigation from './ClientNavigation';

export default function Navigation({
  navigationConfig,
}: {
  navigationConfig: NavigationConfig;
}) {
  return (
    <nav className='bg-gray-800 text-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-grow-0 text-lg font-bold whitespace-nowrap'>
            Smart Analytics
          </div>

          {/* Render client-side component for interactive elements */}
          <ClientNavigation navigationConfig={navigationConfig} />
        </div>
      </div>
    </nav>
  );
}
