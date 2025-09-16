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

      {/* Favicons for broad browser support, including Safari */}
      {/* SVG favicon is preferred for modern browsers including Safari 15+ */}
      <link rel="icon" href="/Logo.svg" type="image/svg+xml" />
      {/* Fallback ICO for older browsers */}
      <link rel="alternate icon" href="/Logo.ico" />
      {/* Safari pinned tab (uses monochrome mask) */}
      <link rel="mask-icon" href="/Logo.svg" color="#111827" />
      {/* Apple touch icon - Safari iOS homescreen. If a PNG isn't available, Safari will fallback. */}
      <link rel="apple-touch-icon" href="/Logo.ico" />
    </>
  );
}


