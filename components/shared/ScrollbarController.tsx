"use client";

import { useEffect } from "react";

/**
 * Reveals the custom scrollbar (via the `is-scrolling` class on <html>)
 * only while the user is actively scrolling, then fades it back out.
 */
export function ScrollbarController() {
  useEffect(() => {
    const root = document.documentElement;
    let hideTimer: number | undefined;

    const show = () => {
      root.classList.add("is-scrolling");
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        root.classList.remove("is-scrolling");
      }, 900);
    };

    window.addEventListener("scroll", show, { passive: true });
    window.addEventListener("wheel", show, { passive: true });
    window.addEventListener("touchmove", show, { passive: true });

    return () => {
      window.removeEventListener("scroll", show);
      window.removeEventListener("wheel", show);
      window.removeEventListener("touchmove", show);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  return null;
}
