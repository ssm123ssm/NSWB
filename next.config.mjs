/** @type {import('next').NextConfig} */
const nextConfig = {
  // `next dev` and `next build` both own `.next` by default, so a verification
  // build silently replaces the running dev server's working directory with a
  // production one and every route starts failing. `npm run build:check` sets
  // NEXT_DIST_DIR so that build lands somewhere else and leaves dev alone.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
