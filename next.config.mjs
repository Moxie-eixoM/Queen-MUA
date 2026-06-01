/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Perfect for zero-config static exports and deployment compatibility
  },
};

export default nextConfig;
