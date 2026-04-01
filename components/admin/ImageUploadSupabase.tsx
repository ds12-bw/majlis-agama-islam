"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ImagePlus, Loader2, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ImageUploadSupabase({ onUpload, value }: { onUpload: (url: string) => void, value: string }) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `exec-${Math.random()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('resources') // ใช้ Bucket เดิมที่เราตั้งเป็น Public ไว้
        .upload(`executives/${fileName}`, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(`executives/${fileName}`)

      onUpload(publicUrl)
    } catch (err) {
      alert("อัปโหลดรูปภาพไม่สำเร็จ")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {value ? (
        <div className="relative w-40 h-52 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xl">
          <img src={value} className="w-full h-full object-cover" alt="Executive" />
          <button onClick={() => onUpload("")} className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full"><X size={16}/></button>
        </div>
      ) : (
        <label className="w-40 h-52 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-all">
          {isUploading ? <Loader2 className="animate-spin text-emerald-500" /> : <ImagePlus className="text-slate-400" />}
          <span className="text-xs text-slate-400 mt-2">{isUploading ? "กำลังโหลด..." : "เพิ่มรูปผู้บริหาร"}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      )}
    </div>
  )
}