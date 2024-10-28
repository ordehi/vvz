export type SocialLink = {
  href: string;
  label: string;
  type: 'facebook' | 'twitter' | 'linkedin' | 'instagram'; // Specify valid types here
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
