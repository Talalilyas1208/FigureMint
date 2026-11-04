const LEGACY_SLUG_MAP = [
  ["tiktok-shop-profit", "tiktok-shop-fee-calculator"],
  ["etsy-offsite-ads-profit", "etsy-fee-profit-calculator"],
  ["break-even-roas", "break-even-roas-calculator"],
  ["stripe-vs-paypal-payout", "stripe-vs-paypal-fee-calculator"],
  ["shopify-pod-margin", "shopify-print-on-demand-calculator"],
  ["freelance-upwork-net-rate", "upwork-freelance-fee-calculator"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  transpilePackages: ["antd", "@ant-design/icons"],
  async redirects() {
    const legacyRedirects = LEGACY_SLUG_MAP.flatMap(([oldSlug, newSlug]) => [
      { source: `/${oldSlug}`, destination: `/${newSlug}`, permanent: true },
      { source: `/calculators/${oldSlug}`, destination: `/${newSlug}`, permanent: true },
    ]);
    return [
      ...legacyRedirects,
      { source: "/calculators", destination: "/profit-margin-calculators", permanent: true },
      { source: "/calculators/:slug", destination: "/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
