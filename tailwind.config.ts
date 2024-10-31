import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  variants: {
    extend: {
      transform: ['peer-checked'],
      maxHeight: ['peer-checked'],
      opacity: ['peer-checked'],
      padding: ['peer-checked'],
    },
  },
  plugins: [],
};

export default config;
