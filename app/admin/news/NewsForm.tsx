"use client"
import { useState } from "react"
import { addNews } from "./actions"
import ImageUpload from "@/components/admin/ImageUpload"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function NewsForm() {
  const [imageUrl, setImageUrl] = useState("")

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="font-bold mb-4 text-emerald-800">ประกาศข่าวใหม่</h2>
      
      <form action={async (formData) => {
        formData.append("imageUrl", imageUrl) // ส่ง URL รูปภาพเข้าไปในฟอร์มด้วย
        await addNews(formData)
        setImageUrl("") // ล้างค่ารูปหลังจากบันทึกเสร็จ
        // @ts-ignore
        document.getElementById("news-form").reset() // ล้างค่าฟอร์ม
      }} id="news-form" className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">หัวข้อข่าว</label>
            <input name="title" className="w-full p-3 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-500" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">หมวดหมู่</label>
            <input name="category" className="w-full p-3 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-500" placeholder="เช่น ข่าวประชาสัมพันธ์" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">เนื้อหาข่าว</label>
          <textarea name="content" className="w-full p-3 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px]" required />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium block">รูปภาพประกอบข่าว</label>
          <ImageUpload value={imageUrl} onUpload={(url) => setImageUrl(url)} />
        </div>

        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl w-full md:w-auto px-8">
          <Plus size={20} className="mr-2" /> บันทึกข่าวสารลงหน้าเว็บ
        </Button>
      </form>
    </div>
  )
}