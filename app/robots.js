export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://my-site-2-coral.vercel.app/sitemap.xml", // Next.js will generate this automatically
  };
}
