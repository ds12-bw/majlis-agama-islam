"use client"
import { useState } from "react"
import { addExecutive } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, UserPlus, Loader2 } from "lucide-react"
import ImageUploadSupabase from "@/components/admin/ImageUploadSupabase" // ตัวที่เราทำไว้ก่อนหน้านี้

export default function ExecutiveForm() {
  const [imageUrl, setImageUrl] = useState("")
  const [isPending, setIsPending] = useState(false)

  return (
    <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden">
      <div className="bg-emerald-600 p-4 text-white flex items-center gap-2">
        <UserPlus size={20} />
        <span className="font-bold">เพิ่มรายชื่อคณะกรรมการ / ผู้บริหาร</span>
      </div>
      <CardContent className="p-8">
        <form 
          action={async (formData) => {
            setIsPending(true)
            formData.append("imageUrl", imageUrl)
            await addExecutive(formData)
            setImageUrl("")
            const form = document.getElementById("exec-form") as HTMLFormElement
            form.reset()
            setIsPending(false)
          }} 
          id="exec-form" 
          className="grid md:grid-cols-3 gap-8"
        >
          {/* ส่วนอัปโหลดรูป */}
          <div className="flex flex-col items-center justify-center">
            <label className="text-sm font-bold text-slate-500 mb-2">รูปถ่ายผู้บริหาร</label>
            <ImageUploadSupabase value={imageUrl} onUpload={setImageUrl} />
          </div>

          {/* ส่วนกรอกข้อมูล */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">ชื่อ-นามสกุล</label>
                <input name="name" className="w-full p-3 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 border-none" placeholder="เช่น นายมูฮัมหมัด ยะลา" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">ตำแหน่ง</label>
                <input name="position" className="w-full p-3 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 border-none" placeholder="เช่น ประธานกรรมการ" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">ลำดับการแสดงผล (ใส่ตัวเลข 1, 2, 3...)</label>
              <input type="number" name="order" className="w-full p-3 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 border-none" placeholder="เลขน้อยจะขึ้นก่อน เช่น 1 คือประธาน" required />
            </div>

            <Button 
              type="submit" 
              disabled={!imageUrl || isPending} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-900/10"
            >
              {isPending ? <Loader2 className="animate-spin" /> : <><Plus className="mr-2" /> บันทึกข้อมูลผู้บริหาร</>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}