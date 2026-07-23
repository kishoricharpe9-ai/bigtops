'use client';

import { useState, useEffect } from 'react';

export function FooterTimezones() {
  const [times, setTimes] = useState({
    india: '',
    london: '',
    amsterdam: '',
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const formatTime = (timeZone) => {
        return now.toLocaleTimeString('en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
      };

      setTimes({
        india: formatTime('Asia/Kolkata'),
        london: formatTime('Europe/London'),
        amsterdam: formatTime('Europe/Amsterdam'),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-6">
      <div className="border border-white/25 rounded-full px-5 py-2 sm:px-7 sm:py-2.5 text-sm sm:text-base text-white flex items-center gap-1.5 shadow-sm bg-white/5 backdrop-blur-md hover:border-white/50 transition-all select-none">
        <span className="font-bold text-white">India:</span>
        <span className="font-normal text-white/90">{times.india || '04:32 PM'}</span>
      </div>
      <div className="border border-white/25 rounded-full px-5 py-2 sm:px-7 sm:py-2.5 text-sm sm:text-base text-white flex items-center gap-1.5 shadow-sm bg-white/5 backdrop-blur-md hover:border-white/50 transition-all select-none">
        <span className="font-bold text-white">London:</span>
        <span className="font-normal text-white/90">{times.london || '12:02 PM'}</span>
      </div>
      <div className="border border-white/25 rounded-full px-5 py-2 sm:px-7 sm:py-2.5 text-sm sm:text-base text-white flex items-center gap-1.5 shadow-sm bg-white/5 backdrop-blur-md hover:border-white/50 transition-all select-none">
        <span className="font-bold text-white">Amsterdam:</span>
        <span className="font-normal text-white/90">{times.amsterdam || '01:02 PM'}</span>
      </div>
    </div>
  );
}
