// Prepend NEXT_PUBLIC_BASE_PATH to root-relative asset paths.
// Required because next/image with `unoptimized: true` (used for static export)
// passes `src` through unchanged and does not auto-apply basePath.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  if (path.startsWith("/")) return `${basePath}${path}`;
  return path;
}
