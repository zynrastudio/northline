import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const debugMode = process.env.NEXT_PUBLIC_GA_DEBUG === "true";

export function GoogleAnalytics() {
  if (!measurementId) return null;

  const configArgs = debugMode
    ? `'${measurementId}', { debug_mode: true }`
    : `'${measurementId}'`;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${configArgs});
        `}
      </Script>
    </>
  );
}
