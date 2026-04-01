"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addExecutive(formData: FormData) {
  const name = formData.get("name") as string
  const position = formData.get("position") as string
  const imageUrl = formData.get("imageUrl") as string
  const order = parseInt(formData.get("order") as string) || 0

  await db.executive.create({
    data: { name, position, imageUrl, order }
  })

  // อัปเดตข้อมูลหน้าเว็บทันที
  revalidatePath("/admin/executives")
  revalidatePath("/")
  revalidatePath("/about/executives")
}

export async function deleteExecutive(id: string) {
  await db.executive.delete({
    where: { id }
  })

  revalidatePath("/admin/executives")
  revalidatePath("/")
  revalidatePath("/about/executives")
}