'use client';

import { useRef } from 'react';
import { testimonials } from '@/lib/content/home';

export function VideoTestimonials() {
  const scrollContainerRef = useRef(null);

  const placeholderVideos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // rough width of a card
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mt-12 group">
      {/* Scroll Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform hover:scale-110 opacity-0 group-hover:opacity-100"
        aria-label="Scroll left"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform hover:scale-110 opacity-0 group-hover:opacity-100"
        aria-label="Scroll right"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Cards Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory scrollbar-hide pb-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
        `}} />
        {testimonials.map((t, idx) => (
          <div 
            key={idx} 
            className="group/card relative flex-none w-[300px] sm:w-[340px] md:w-[380px] h-[400px] sm:h-[480px] md:h-[520px] overflow-hidden rounded-[20px] bg-black border border-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.15] snap-center"
          >
            {/* Video Placeholder Area */}
            <div className="absolute inset-0 bg-black">
              {/* Placeholder Video */}
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity duration-500 group-hover/card:opacity-70"
                autoPlay
                muted
                loop
                playsInline
                src={placeholderVideos[idx % placeholderVideos.length]}
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                {/* Play Button */}
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-white/10 group-hover/card:border-white/40">
                  <svg className="h-4 w-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Dark gradient for text readability overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 z-10" />

            {/* Content Area Overlay */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 flex flex-col w-full z-20">
              <span className="text-[10px] font-bold tracking-[0.15em] text-[#12ced6] uppercase mb-3">
                Video Review
              </span>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/90 font-medium line-clamp-3 mb-5">
                &quot;{t.quote}&quot;
              </p>
              
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                {/* Author Details */}
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-white leading-tight">{t.name}</span>
                  <span className="text-[10px] text-white/50 mt-0.5">{t.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
