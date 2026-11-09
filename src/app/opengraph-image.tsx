import { ImageResponse } from "next/og";

export const alt = "FigureMint — 2026 Online Seller, ROAS & Freelance Net Profit Calculators";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#FAFAF7",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          border: "16px solid #10A37F",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#10A37F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAFAF7",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            F
          </div>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#222925" }}>FigureMint</span>
          <div
            style={{
              marginLeft: "auto",
              backgroundColor: "#FEF6E6",
              color: "#9A5B06",
              border: "1px solid #F6DFA8",
              padding: "8px 18px",
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            2026 Verified Rates
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <h1
            style={{
              fontSize: 54,
              fontWeight: 800,
              color: "#222925",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Know Your True Net Profit Before You Price or Scale.
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "#525854",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: 960,
            }}
          >
            Free fee &amp; profit calculators for TikTok Shop, Etsy Offsite Ads, Shopify POD, Stripe vs. PayPal &amp; Upwork.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E4E4DC",
            paddingTop: 24,
            color: "#6E7570",
            fontSize: 20,
          }}
        >
          <span>100% Free · Browser-Local Privacy · No Sign-Up</span>
          <span style={{ fontWeight: 700, color: "#10A37F" }}>figuremint.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
