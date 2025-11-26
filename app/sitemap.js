export default function sitemap() {
  const base = "https://drjuanpablosalerno.com";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/speaking`, lastModified: new Date() },
    { url: `${base}/consulting`, lastModified: new Date() },
    { url: `${base}/meditations`, lastModified: new Date() },
    { url: `${base}/resources`, lastModified: new Date() },
    { url: `${base}/books`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/membership`, lastModified: new Date() },
  ];
}
