export default function Head() {
  return (
    <>
      {/* Preconnects to reduce render-blocking and connection setup time */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      {/* Static origin preconnect (same-origin is implicit, but okay for hinting) */}
      <link rel="preconnect" href="https://krazykreators.com" />
      <link rel="dns-prefetch" href="https://krazykreators.com" />

      {/* Favicon for Safari compatibility with cache busting */}
      <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico?v=3" type="image/x-icon" />
      <link rel="shortcut icon" href="/favicon.ico?v=3" />
      <link rel="apple-touch-icon" href="/favicon.ico?v=3" />
      <link rel="mask-icon" href="/favicon.svg?v=3" color="#122730" />
    </>
  );
}
