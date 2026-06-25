import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Service Pricing | CyberSage Web Solutions',
  description:
    'Transparent, precision-engineered pricing for world-class web design and development services. Landing pages, portfolios, corporate sites, and full e-commerce solutions.',
  keywords: 'web design, pricing, landing page, portfolio, e-commerce, Next.js, Nigeria, CyberSage',
  openGraph: {
    title: 'Service Pricing | CyberSage Web Solutions',
    description: 'Transparent pricing for world-class web solutions.',
    type: 'website',
    url: 'https://pricing.cybersagee.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Scroll progress bar */}
        <div id="scroll-progress" aria-hidden />
        {children}
      </body>
    </html>
  );
}
