/** @type {import('next').NextConfig} */
const ROOT = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "nexora.app";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // typedRoutes is too strict for dynamic strings + cross-host links (app.* / admin.*)
  typedRoutes: false,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      ],
    }];
  },
  env: { ROOT_DOMAIN: ROOT },
};

module.exports = nextConfig;
