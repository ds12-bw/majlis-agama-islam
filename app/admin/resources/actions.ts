"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addResource(formData: FormData) {
  const title = formData.get("title") as string
  const category = formData.get("category") as string
  const fileUrl = formData.get("fileUrl") as string
  const fileSize = formData.get("fileSize") as string

  await db.resource.create({
    data: { title, category, fileUrl, fileSize }
  })

  revalidatePath("/admin/resources")
  revalidatePath("/resources") // อัปเดตหน้าบ้านด้วย
}

export async function deleteResource(id: string) {
  await db.resource.delete({ where: { id } })
  revalidatePath("/admin/resources")
  revalidatePath("/resources")
}