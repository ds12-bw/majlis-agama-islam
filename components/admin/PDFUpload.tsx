"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { FileUp, FileText, CheckCircle, Loader2, X, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface PDFUploadProps {
  onUpload: (url: string, size: string) => void
  value: string
}

export default function PDFUpload({ onUpload, value }: PDFUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      // ตรวจสอบว่าเป็น PDF จริงไหม
      if (file.type !== "application/pdf") {
        setError("กรุณาเลือกไฟล์ PDF เท่านั้น")
        return
      }

      setIsUploading(true)
      setError("")

      // 1. ตั้งชื่อไฟล์ใหม่ (ป้องกันชื่อซ้ำและตัดอักขระแปลกๆ)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `khutbah/${fileName}`

      // 2. อัปโหลดไปที่ Supabase Bucket ชื่อ 'resources'
      const { data, error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

      if (uploadError) throw uploadError

      // 3. ดึง Public URL ของไฟล์ออกมา
      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath)

      // 4. คำนวณขนาดไฟล์เป็น MB
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + " MB"

      // 5. ส่งค่ากลับไปที่ฟอร์มแอดมิน
      onUpload(publicUrl, sizeInMB)
      
    } catch (err: any) {
      console.error("Upload Error:", err)
      setError("เกิดข้อผิดพลาด: " + err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onUpload("", "")
    setError("")
  }

  return (
    <div className="space-y-4 w-full">
      {error && (
        <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-rose-100">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {value ? (
        // --- แสดงผลเมื่ออัปโหลดสำเร็จ ---
        <div className="flex items-center gap-4 p-5 bg-emerald-50 border-2 border-emerald-200 rounded-[1.5rem] animate-in fade-in zoom-in duration-300">
          <div className="bg-emerald-600 p-3 rounded-xl text-white shadow-lg">
            <FileText size={28} />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-bold text-emerald-900 flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-600" />
              ไฟล์ PDF พร้อมบน Supabase แล้ว
            </p>
            <p className="text-[10px] text-emerald-600 truncate mt-1 opacity-60">
              {value}
            </p>
          </div>
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            onClick={handleRemove} 
            className="text-rose-500 hover:bg-rose-100 rounded-full h-10 w-10"
          >
            <X size={20} />
          </Button>
        </div>
      ) : (
        // --- ปุ่มเลือกไฟล์ (Input File) ---
        <label className={`w-full h-44 flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-dashed border-2 cursor-pointer transition-all duration-300 group
          ${isUploading 
            ? "bg-slate-50 border-slate-200 cursor-not-allowed" 
            : "border-slate-300 bg-white hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-xl hover:shadow-emerald-900/5"
          }`}>
          
          {isUploading ? (
            <>
              <Loader2 className="animate-spin text-emerald-500" size={48} />
              <div className="text-center">
                <span className="block text-sm font-bold text-slate-700">กำลังอัปโหลดไฟล์...</span>
                <span className="text-xs text-slate-400 mt-1">ส่งไฟล์ไปยัง Supabase Storage</span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-100 p-5 rounded-3xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                <FileUp size={36} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-center px-4">
                <span className="block text-base font-bold text-slate-700 group-hover:text-emerald-800">
                  คลิกเพื่อเลือกไฟล์ PDF
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  ไฟล์คุตบะฮ์หรือแบบฟอร์ม (แนะนำไม่เกิน 10MB)
                </span>
              </div>
            </>
          )}
          <input 
            type="file" 
            accept="application/pdf" 
            className="hidden" 
            onChange={handleUpload} 
            disabled={isUploading} 
          />
        </label>
      )}
    </div>
  )
}