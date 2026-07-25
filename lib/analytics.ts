export function trackEvent(
  name: string,
  params?: Record<string, string>,
): void {
  if (typeof window === "undefined") return;

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return;

  const gtag = (
    window as Window & {
      gtag?: (...args: unknown[]) => void;
    }
  ).gtag;

  if (typeof gtag !== "function") return;

  gtag("event", name, params);
}
