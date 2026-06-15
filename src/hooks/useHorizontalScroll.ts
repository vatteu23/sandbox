import { useEffect, useRef } from "react";

/**
 * Converts vertical mouse-wheel delta to smooth horizontal scroll on the
 * returned ref. Uses a requestAnimationFrame loop that eases toward a target
 * position so wheel input feels fluid instead of stepping.
 * Trackpad two-finger swipe passes through naturally (deltaX > deltaY).
 */
export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let target = el.scrollLeft;
    let raf = 0;
    let animating = false;

    const animate = () => {
      const current = el.scrollLeft;
      const diff = target - current;

      // Ease toward target; snap when close enough
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target;
        animating = false;
        return;
      }

      el.scrollLeft = current + diff * 0.18;
      raf = requestAnimationFrame(animate);
    };

    const onWheel = (e: WheelEvent) => {
      // Let native horizontal scroll (trackpad swipe) pass through
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;

      // Nothing to scroll horizontally → let the page scroll vertically
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      // At the edges, release control back to the page so it doesn't hang
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= maxScroll - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;

      e.preventDefault();

      // Re-sync target if the user wasn't mid-animation (e.g. dragged scrollbar)
      if (!animating) target = el.scrollLeft;
      target = Math.max(0, Math.min(maxScroll, target + e.deltaY));

      if (!animating) {
        animating = true;
        raf = requestAnimationFrame(animate);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
