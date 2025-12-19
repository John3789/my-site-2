export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://drjuanpablosalerno.com/sitemap.xml", // Next.js will generate this automatically
  };
} 
