

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats when supported (fallback to JPG/PNG automatically)
    formats: ['image/avif', 'image/webp'],

    // Optional: tune generated widths for your breakpoints
    deviceSizes: [360, 390, 414, 640, 768, 1100, 1400, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // If you load remote images, add allowlist here:
    // domains: ['your-cdn.com'],
    // remotePatterns: [{ protocol: 'https', hostname: 'your-cdn.com' }],
  },
};

export default nextConfig;
