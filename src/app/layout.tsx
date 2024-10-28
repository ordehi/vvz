import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { footerConfig } from '@/config/components/footer.server';
import { navigationConfig } from '@/config/components/navigation.server';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Business Card',
  description: 'Scalable Business Card with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation navigationConfig={navigationConfig} />
        {children}
        <Footer footerConfig={footerConfig} />
      </body>
    </html>
  );
}
