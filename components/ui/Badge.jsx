export function Badge({ children, className = '' }) {
  return (
    <div
      className={`relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md transition hover:border-white/20 hover:bg-black/80 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-[''] ${className}`}
    >
      {children}
    </div>
  );
}
