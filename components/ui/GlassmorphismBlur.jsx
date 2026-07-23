import React from 'react';

export function GlassmorphismBlur({
  height = '150px',
  zIndex = 10,
  intensity = 'medium',
  className = '',
}) {
  const blurSettings = {
    light: {
      filter: 'blur(15px) saturate(150%)',
      gradient:
        'linear-gradient(to top, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 40%, transparent 100%)',
      border: 'rgba(255,255,255,0.1)',
    },
    medium: {
      filter: 'blur(25px) saturate(200%)',
      gradient:
        'linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.06) 40%, transparent 100%)',
      border: 'rgba(255,255,255,0.2)',
    },
    strong: {
      filter: 'blur(35px) saturate(220%)',
      gradient:
        'linear-gradient(to top, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 40%, transparent 100%)',
      border: 'rgba(255,255,255,0.25)',
    },
  };

  const settings = blurSettings[intensity];

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 pointer-events-none ${className}`}
      style={{
        height,
        zIndex,
        background: settings.gradient,
        backdropFilter: settings.filter,
        WebkitBackdropFilter: settings.filter,
        borderTop: `1px solid ${settings.border}`,
      }}
    />
  );
}
