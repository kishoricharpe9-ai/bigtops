# ANTIGRAVITY.md

This file provides guidance and project context for the Antigravity AI coding assistant when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting
- `npm run typecheck` - Run TypeScript type checking without emitting files

## Project Structure

- `/app` - Next.js app router pages and layouts
  - `/app/(site)` - Main site pages (about, blog, contact, etc.)
  - `app/layout.tsx` - Root layout with fonts, metadata, and global styles
  - `app/globals.css` - Global CSS styles and Tailwind imports
- `/components` - Reusable UI components organized by feature
  - `/components/home` - Homepage sections and components
  - `/components/layout` - Layout components (Container, SmoothScroll)
  - `/components/ui` - Primitive UI components (wobble-card, etc.)
  - `/components/faq` - FAQ accordion component
  - `/components/motion` - Motion/reveal animations
- `/lib` - Utility functions and content data
  - `/lib/content` - Content constants (homepage data, blog posts, testimonials, etc.)
- `/public` - Static assets (images, videos, fonts)
- `/types` - TypeScript type definitions
- Next.js configuration files: `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`

## Key Technologies

- **Framework**: Next.js 16.2.6 with App Router
- **Language**: TypeScript 5.7.2 (strict mode)
- **Styling**: Tailwind CSS 3.4.17
- **Animation**: Framer Motion, GSAP, Lenis (smooth scrolling)
- **3D Graphics**: Three.js with @react-three/fiber
- **Icons**: React-icons (via HeroIcons implicitly used)
- **Content**: Static data files in lib/content/

## Architecture Notes

- Uses route groups (`(site)`) for organizing pages without affecting URL paths
- Layouts are shared via `app/layout.tsx` and route group layouts
- Content-driven components: Homepage sections map data from lib/content/home.ts
- Reusable patterns: Container component for consistent spacing, Reveal for scroll animations
- Custom CSS: BorderGlow.jsx provides animated border effects
- Fonts: Local Helvetica Neue loaded via next/font/local

## Antigravity Specific Instructions

- Always prioritize building rich, highly dynamic UI with modern aesthetics (glassmorphism, vibrant colors, dark mode, smooth scroll).
- Use `Next.js` and `TailwindCSS` by default as established in the project.
- Implement explicit SEO best practices.
