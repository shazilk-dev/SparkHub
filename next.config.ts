import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    // Performance optimization
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    ppr: "incremental",
    after: true, // Always enable after
    optimizePackageImports: ["lucide-react"],
  },

  // Optimize dev indicators
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false, // Disable for faster builds
    buildActivityPosition: "bottom-right",
  },

  // Skip TypeScript checking during build for speed
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },

  // Skip ESLint during build for speed
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "development",
  },
};

export default process.env.NODE_ENV === "production"
  ? withSentryConfig(nextConfig, {
      org: "shazil-khan",
      project: "javascript-nextjs",
      silent: !process.env.CI,
      widenClientFileUpload: true,
      automaticVercelMonitors: true,
      reactComponentAnnotation: { enabled: true },
      hideSourceMaps: true,
      disableLogger: false,
    })
  : nextConfig;
