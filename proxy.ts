import { auth } from "@/auth"

// ใน Next.js 16 เราใช้ฟังก์ชัน auth มาเป็นตัวจัดการ proxy (middleware)
export default auth((req) => {
  // ระบบจะตรวจสอบ Session จาก auth.ts อัตโนมัติ
  // ถ้าไม่ได้ล็อกอิน ระบบจะดีดไปหน้า /login ตามที่เราตั้งไว้ใน auth.ts
})

export const config = {
  // ระบุหน้าที่ต้องการให้ระบบตรวจสอบความปลอดภัย (ล็อกหน้าแอดมิน)
  matcher: ["/admin/:path*"],
}