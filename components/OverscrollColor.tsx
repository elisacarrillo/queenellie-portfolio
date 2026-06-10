"use client";
import { useEffect, useRef } from "react";

export default function OverscrollColor() {
  const startY = useRef(0);

  useEffect(() => {
    const setBottom = (isBottom: boolean) => {
      document.documentElement.classList.toggle("overscroll-bottom", isBottom);
      document.body.classList.toggle("overscroll-bottom", isBottom);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) setBottom(false);
      else if (e.deltaY > 0) setBottom(true);
    };

    const onTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const delta = startY.current - e.touches[0].clientY;
      if (delta < 0) setBottom(false);
      else if (delta > 0) setBottom(true);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      setBottom(false);
    };
  }, []);

  return null;
}
