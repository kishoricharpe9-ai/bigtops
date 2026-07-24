import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FooterTimezones } from '@/components/layout/FooterTimezones';

export function Footer() {
  return (
    <footer className="relative z-50 bg-black pt-12 sm:pt-16 pb-12 text-white overflow-hidden">
      {/* VIDEO BACKGROUND (Same as Hero Section) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="https://res.cloudinary.com/diqnwnz6x/video/upload/v1779957986/herovideo2_qdgibs.mp4"
            type="video/mp4"
          />
        </video>
        {/* Seamless blend from the previous section */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black via-black/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* Timezones */}
        <div className="w-full flex justify-center items-center mb-10 sm:mb-14">
          <FooterTimezones />
        </div>
      </Container>

      {/* Giant Wordmark */}
      <div className="relative z-10 w-[95vw] mx-auto flex flex-col items-center justify-center mb-20 overflow-visible pt-4 pb-8">
        <h1 className="font-sans text-[18vw] font-black leading-[0.9] tracking-[-0.09em] text-white select-none text-center lowercase whitespace-nowrap">
          bigtopsocial
        </h1>
      </div>

      <Container className="relative z-10">
        {/* Horizontal Divider Line */}
        <div className="w-full h-px bg-white/10 my-8" />

        {/* Footer Bottom Links, Socials and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          {/* Left: Social Icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.5 20.5 12 20.5 12 20.5s7.5 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          {/* Center: Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-white/85">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/project" className="hover:text-white transition-colors">
              Case Studies
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>

          {/* Right: Copyright Info */}
          <div className="text-xs text-white/90 leading-relaxed md:text-right font-normal">
            <p>Proudly created in India.</p>
            <p>All Right Reserved, All Wrong Reversed.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
