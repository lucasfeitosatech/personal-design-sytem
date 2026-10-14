import { useEffect, useState } from 'react';

/**
 * Keeps its children mounted for `exitMs` after `open` turns false, so an exit animation can play
 * before the tree unmounts. While that window is open the tree is flagged `closing`. With
 * `exitMs` at zero it is plain mount/unmount: reduced motion never waits out an exit.
 */
export function usePresence(open: boolean, exitMs: number): { mounted: boolean; closing: boolean } {
  const [lingering, setLingering] = useState(open);

  useEffect(() => {
    if (open) {
      setLingering(true);
      return;
    }
    if (exitMs <= 0) {
      setLingering(false);
      return;
    }
    const timer = setTimeout(() => setLingering(false), exitMs);
    return () => clearTimeout(timer);
  }, [open, exitMs]);

  // Mounted on the very render that opens: effects keyed to `open` (focus, the key trap) run after
  // that commit and must find the tree already in place, not one render later.
  return { mounted: open || lingering, closing: !open && lingering };
}
