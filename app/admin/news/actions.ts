"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"

/**
 * ฟังก์ชันสำหรับเพิ่มข่าวสารใหม่ลงใน Database
 * @param formData ข้อมูลจากฟอร์มที่ส่งมาจาก NewsForm.tsx
 */
export async function addNews(formData: FormData) {
  try {
    // 1. ดึงข้อมูลจากฟอร์ม
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const imageUrl = formData.get("imageUrl") as string // รับ URL รูปภาพจาก Cloudinary

    // 2. ตรวจสอบข้อมูลเบื้องต้น (Validation)
    if (!title || !content || !category) {
      throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน")
    }

    // 3. บันทึกลง PostgreSQL ผ่าน Prisma
    await db.news.create({
      data: {
        title,
        content,
        category,
        imageUrl: imageUrl || null, // ถ้าไม่มีรูปให้เป็น null
      }
    })

    // 4. สั่งให้ Next.js อัปเดตหน้าเว็บใหม่ (Clear Cache)
    // เพื่อให้ข้อมูลที่เพิ่มเข้าไปปรากฏทันทีที่หน้า Admin และหน้าแรก (Home)
    revalidatePath("/admin/news")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error adding news:", error)
    return { success: false, error: "ไม่สามารถเพิ่มข่าวสารได้" }
  }
}

/**
 * ฟังก์ชันสำหรับลบข่าวสาร
 * @param id ID ของข่าวที่ต้องการลบ
 */
export async function deleteNews(id: string) {
  try {
    // 1. ลบข้อมูลจาก Database
    await db.news.delete({
      where: {
        id: id
      }
    })

    // 2. อัปเดตหน้าเว็บใหม่
    revalidatePath("/admin/news")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting news:", error)
    return { success: false, error: "ไม่สามารถลบข่าวสารได้" }
  }
}