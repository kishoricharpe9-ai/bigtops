'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media-query hook.
 *
 * Returns `false` on the server and the first client render (so server/client
 * markup match — no hydration mismatch), then resolves to the real match after
 * mount. Used to keep the desktop-only and mobile-only sections inert on the
 * device where they are visually hidden, without changing their markup or
 * causing layout shift.
 */
export function useMatchMedia(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = e => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
