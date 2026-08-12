import localFont from 'next/font/local';
import './globals.css';
import '@/components/BorderGlow.css';
import SmoothScroll from '@/components/layout/SmoothScroll';

const helveticaNeue = localFont({
  src: '../public/helvetica-neue-5/HelveticaNeueMedium.otf',
  variable: '--font-helvetica-neue',
  display: 'swap',
  weight: '200',
});

export const metadata = {
  metadataBase: new URL('https://bigtopsocial.framer.media'),
  title: {
    default: 'Home - BIGTOPSOCIAL',
    template: '%s | BIGTOPSOCIAL',
  },
  description:
    'We help ambitious brands scale with performance marketing, creative strategy, and conversion-focused campaigns.',
  openGraph: {
    type: 'website',
    siteName: 'BIGTOPSOCIAL',
    title: 'Home - BIGTOPSOCIAL',
    description:
      'We help ambitious brands scale with performance marketing, creative strategy, and conversion-focused campaigns.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={helveticaNeue.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}