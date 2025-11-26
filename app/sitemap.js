// app/sitemap.js

export default function sitemap() {
  const base = "https://drjuanpablosalerno.com";
  const lastModified = new Date().toISOString();

  return [
    { url: `${base}/`, lastModified },
    { url: `${base}/about`, lastModified },
    { url: `${base}/speaking`, lastModified },
    { url: `${base}/consulting`, lastModified },
    { url: `${base}/meditations`, lastModified },
    // REMOVE resources because it's no longer public
    { url: `${base}/books`, lastModified },
    { url: `${base}/contact`, lastModified },
    { url: `${base}/membership`, lastModified },
  ];
}
