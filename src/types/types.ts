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
  actionType?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
}

// Form-related types
export type FieldType =
  | 'text'
  | 'email'
  | 'textarea'
  | 'tel'
  | 'number'
  | 'date';

export interface FormField {
  name: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface ContactFormConfig {
  title: string;
  description?: string;
  fields: FormField[];
  submitButton: {
    text: string;
    variant: string;
  };
}

export type FormDataType = Record<string, string | number | Date>;

// New types for the form component props
export interface ContactFormProps {
  config: ContactFormConfig;
  onSubmit?: (data: FormDataType) => Promise<void>;
  className?: string;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

type Testimonial = {
  image: string;
  text: string;
  additionalText?: string;
};

export interface TestimonialsConfig {
  testimonials: Testimonial[];
  layout: 'default' | 'otherLayout'; // Placeholder for future layouts
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export interface TestimonialItemProps {
  testimonial: Testimonial;
  index: number;
}

export interface TestimonialsProps {
  config: TestimonialsConfig;
}
