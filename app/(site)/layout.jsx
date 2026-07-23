import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <div className="pointer-events-none h-32 bg-gradient-to-b from-transparent to-black" />
      <Footer />
    </>
  );
}
