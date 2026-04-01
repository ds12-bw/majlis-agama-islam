"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash2 } from "lucide-react"
import Script from 'next/script'

interface ImageUploadProps {
  onUpload: (url: string) => void
  value: string
}

export default function ImageUpload({ onUpload, value }: ImageUploadProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onUploadSuccess = (result: any) => {
    onUpload(result.info.secure_url)
  }

  const openWidget = () => {
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget({
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    }, (error: any, result: any) => {
      if (!error && result && result.event === "success") {
        onUploadSuccess(result)
      }
    })
    widget.open()
  }

  if (!mounted) return null

  return (
    <div className="space-y-4">
      {/* โหลด Library ของ Cloudinary */}
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="afterInteractive" />
      
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-emerald-500">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => onUpload("")} 
              className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full hover:bg-rose-600 shadow-lg"
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <Button 
            type="button" 
            variant="outline" 
            onClick={openWidget}
            className="w-40 h-40 flex flex-col gap-2 rounded-xl border-dashed border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
          >
            <ImagePlus className="text-slate-400" />
            <span className="text-xs text-slate-500">อัปโหลดรูปภาพข่าว</span>
          </Button>
        )}
      </div>
    </div>
  )
}