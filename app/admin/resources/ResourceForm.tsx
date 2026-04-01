"use client"
import { useState } from "react"
import { addResource } from "./actions"
import PDFUpload from "@/components/admin/PDFUpload"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
// บรรทัดนี้คือสิ่งที่ขาดไปครับ!
import { Card } from "@/components/ui/card" 

export default function ResourceForm() {
  const [fileData, setFileData] = useState({ url: "", size: "" })

  return (
    <Card className="p-6 border-none shadow-sm">
      <form action={async (formData) => {
        // เพิ่มข้อมูลไฟล์เข้าไปใน formData ก่อนส่งไปที่ Server Action
        formData.append("fileUrl", fileData.url)
        formData.append("fileSize", fileData.size)
        
        await addResource(formData)
        
        // ล้างค่าหลังจากบันทึกสำเร็จ
        setFileData({ url: "", size: "" })
        const formElement = document.getElementById("resource-form") as HTMLFormElement
        if (formElement) formElement.reset()
        
        alert("บันทึกไฟล์เรียบร้อยแล้ว!")
      }} id="resource-form" className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">ชื่อเอกสาร/หัวข้อคุตบะฮ์</label>
            <input 
                name="title" 
                className="w-full p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-100" 
                required 
                placeholder="เช่น คุตบะฮ์ประจำวันที่..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">หมวดหมู่</label>
            <select 
                name="category" 
                className="w-full p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-100" 
                required
            >
              <option value="คุตบะฮ์">คุตบะฮ์วันศุกร์</option>
              <option value="แบบฟอร์ม">แบบฟอร์ม/คำร้อง</option>
              <option value="ฮาลาล">ข้อมูลฮาลาล</option>
              <option value="ประกาศ">ประกาศทั่วไป</option>
            </select>
          </div>
        </div>

        {/* ตัวอัปโหลด PDF ที่เราสร้างไว้ */}
        <PDFUpload value={fileData.url} onUpload={(url, size) => setFileData({ url, size })} />
        
        <Button 
            type="submit" 
            disabled={!fileData.url} 
            className="bg-emerald-600 w-full h-12 rounded-xl text-white font-bold shadow-lg shadow-emerald-900/20"
        >
          <Plus className="mr-2" /> บันทึกไฟล์ลงคลังความรู้
        </Button>
      </form>
    </Card>
  )
}