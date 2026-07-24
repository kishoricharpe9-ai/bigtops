# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
  - `/components/BorderGlow.jsx` - Border glow effect component
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
- Image optimization: Next.js Image component used throughout
- Custom CSS: BorderGlow.jsx provides animated border effects
- Fonts: Local Helvetica Neue loaded via next/font/local

## Common Patterns

1. **Content Sections**: Homepage built from reusable sections in components/home/
2. **Data Flow**: Content imported from lib/content/ as TypeScript constants
3. **Animation**: Components wrapped in Reveal for scroll-triggered animations
4. **Styling**: Heavy use of Tailwind utility classes with custom CSS classes for complex effects
5. **Assets**: Images/videos referenced from public/ directory
6. **Component Composition**: Complex UI built from small, reusable primitives

## File Conventions

- Component files: PascalCase (e.g., HomeSections.tsx, Wobble-card.jsx)
- Style files: .css or .jsx with styling (BorderGlow.css/.jsx)
- Content files: TypeScript const exports (lib/content/\*.ts)
- Configuration: .ts, .js, .mjs, .json files in root
