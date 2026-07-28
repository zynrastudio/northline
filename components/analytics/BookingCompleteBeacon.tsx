"use client";

import { useEffect, useRef } from "react";
import { trackCalendarBookingComplete } from "@/lib/analytics";

/** Fires once on mount so Cal.com redirect landings are measured in GA4. */
export function BookingCompleteBeacon() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackCalendarBookingComplete();
  }, []);

  return null;
}
