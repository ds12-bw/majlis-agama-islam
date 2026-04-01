/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // ลบส่วน eslint ออกไปเลยครับ เพราะ Next.js 16 ไม่ใช้ตรงนี้แล้ว
};

export default nextConfig;