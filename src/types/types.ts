export type SocialLink = {
  href: string;
  label: string;
  type: 'facebook' | 'twitter' | 'linkedin' | 'instagram';
};

export interface FooterConfig {
  company?: {
    logo?: string;
    description?: string;
    name?: string;
  };
  quickLinks?: { href: string; text: string }[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  social?: SocialLink[];
  legal?: { href: string; text: string }[];
}

export interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export type NavItem = {
  href: string;
  text: string;
  type: 'home' | 'envelope' | 'star';
};

export interface NavigationConfig {
  items: NavItem[];
}

export interface CompanyInfoProps {
  company?: FooterConfig['company'];
}

export interface QuickLinksProps {
  quickLinks?: FooterConfig['quickLinks'];
}

export interface ContactInfoProps {
  contact?: FooterConfig['contact'];
}

export interface SocialLinksProps {
  social?: FooterConfig['social'];
}

export interface NavigationLinkProps {
  href: string;
  icon: React.ComponentType<{ className: string }>;
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  'data-dark'?: boolean;
  'aria-theme'?: string;
}
