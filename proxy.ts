import { auth } from "@/auth"

// Next.js 16 ต้องการให้ระบุฟังก์ชันให้ชัดเจน
export default auth((req) => {
  // ฟังก์ชันนี้จะทำงานร่วมกับ callbacks authorized ใน auth.ts
  // เพื่อตรวจสอบว่าใครเข้าหน้า /admin ได้บ้าง
})

export const config = {
  matcher: ["/admin/:path*"],
}