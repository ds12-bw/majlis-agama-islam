/** @type {import('next').NextConfig} */
const nextConfig = {
  // สั่งให้ข้ามการตรวจ Error ของ TypeScript ขณะ Build
  typescript: {
    ignoreBuildErrors: true,
  },
  // สั่งให้ข้ามการตรวจ ESLint ขณะ Build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // (ออปชันเสริม) ถ้ามีรูปภาพจากภายนอกเยอะๆ ใส่ตรงนี้ได้
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;