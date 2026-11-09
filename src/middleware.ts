import { NextRequest, NextResponse } from "next/server";

const MAX_API_BODY_BYTES = 16_384;

function buildCspHeader(): string {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptEval = isDev ? " 'unsafe-eval'" : "";
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${scriptEval} https://pagead2.googlesyndication.com https://partner.googleadservices.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
    "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
    "connect-src 'self' https://pagead2.googlesyndication.com",
    "font-src 'self' data:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/api/") && req.method === "GET") {
    const normalizedPath = pathname.toLowerCase().replace(/_/g, "-");
    if (normalizedPath !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = normalizedPath;
      return NextResponse.redirect(url, 308);
    }
  }

  if (pathname.startsWith("/api/") && req.method === "POST") {
    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > MAX_API_BODY_BYTES) {
      return NextResponse.json(
        { error: "Payload exceeds maximum allowed size." },
        { status: 413 }
      );
    }

    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json(
            { error: "Cross-origin request blocked by CSRF policy." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json({ error: "Invalid origin header." }, { status: 403 });
      }
    }
  }

  const res = NextResponse.next();
  res.headers.set("Content-Security-Policy", buildCspHeader());
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|og-image.png|og-image.svg|opengraph-image|twitter-image|ads.txt|robots.txt|sitemap.xml).*)",
  ],
};
