/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ Use modern formats (Next automatically falls back to JPEG/PNG)
    formats: ['image/avif', 'image/webp'],

    // ✅ Target device widths that cover all your actual breakpoints + retina variants
    //  - 896 = 448 × 2 (for DPR=2 Retina)
    //  - 1344 = 448 × 3 (for DPR≈3 iPhones / 4K monitors)
    deviceSizes: [360, 390, 414, 640, 768, 896, 1080, 1200, 1344, 1536, 1920],

    // ✅ Small inline images or icons (same as before)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Optional: allow external image domains here
    // domains: ['your-cdn.com'],
    // remotePatterns: [{ protocol: 'https', hostname: 'your-cdn.com' }],
  },

  // (Optional but good practice)
  reactStrictMode: true,
};

export default nextConfig;
