/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
      domains: [
        'images.unsplash.com',
        'kpsalesengineers.com'
      ],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    },
    // Ensure strict mode is enabled for better React practices
    reactStrictMode: true,
  }
  
  export default nextConfig;
  
  