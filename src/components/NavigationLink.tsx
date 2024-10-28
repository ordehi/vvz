import Link from 'next/link';

interface NavigationLinkProps {
  href: string;
  icon: React.ComponentType<{ className: string }>;
  children: React.ReactNode;
  className?: string;
}

export default function NavigationLink({
  href,
  icon: Icon,
  children,
}: NavigationLinkProps) {
  return (
    <Link
      href={href}
      className='flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
    >
      <Icon className='h-5 w-5' />
      {children}
    </Link>
  );
}
