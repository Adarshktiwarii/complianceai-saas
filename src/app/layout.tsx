import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kavach.ai - AI-Powered Legal Compliance Platform',
  description: 'AI-powered legal compliance and document generation for Indian startups',
  keywords: 'legal compliance, document generation, Indian startups, GST, TDS',
  authors: [{ name: 'Kavach.ai Team' }],
  openGraph: {
    title: 'Kavach.ai - AI-Powered Legal Compliance Platform',
    description: 'AI-powered legal compliance for Indian startups',
    url: 'https://kavach.ai',
    siteName: 'Kavach.ai',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
