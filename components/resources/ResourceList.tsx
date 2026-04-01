"use client"
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Search, Calendar, HardDrive, Eye, ExternalLink } from "lucide-react"

interface Resource {
  id: string
  title: string
  category: string
  fileUrl: string
  fileSize: string | null
  createdAt: Date
}

export default function ResourceList({ initialResources }: { initialResources: Resource[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด")

  const categories = ["ทั้งหมด", "คุตบะฮ์", "แบบฟอร์ม", "ฮาลาล", "ประกาศ"]

  // --- ฟังก์ชันอัจฉริยะสำหรับจัดการลิงก์ดาวน์โหลด ---
  const getDownloadUrl = (url: string) => {
    if (!url) return "#";
    // เทคนิคระดับโลก: เปลี่ยน /upload/ เป็น /upload/fl_attachment/ 
    // เพื่อสั่งให้ Cloudinary บังคับดาวน์โหลดไฟล์ลงเครื่องทันที (ไม่แค่เปิดดู)
    if (url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }
    return url;
  };

  // Logic การกรองข้อมูล
  const filteredResources = initialResources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "ทั้งหมด" || res.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* ส่วนควบคุม: ค้นหาและหมวดหมู่ */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "ghost"}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-6 transition-all ${
                activeCategory === cat 
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/20" 
                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
          <input
            type="text"
            placeholder="ค้นหาชื่อคุตบะฮ์หรือเอกสาร..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* รายการเอกสาร */}
      <div className="grid gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => (
            <Card key={res.id} className="group hover:shadow-2xl transition-all duration-500 border-none shadow-sm overflow-hidden bg-white ring-1 ring-slate-100 hover:ring-emerald-200">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 md:p-8 gap-6">
                  <div className="flex items-start md:items-center gap-5 w-full lg:w-auto">
                    <div className="bg-emerald-50 text-emerald-600 p-5 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
                      <FileText size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-slate-800 text-xl leading-tight group-hover:text-emerald-700 transition-colors">
                        {res.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 items-center">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
                          {res.category}
                        </span>
                        <span className="flex items-center gap-1.5 border-l pl-4 border-slate-200">
                          <Calendar size={14} className="text-slate-400" /> 
                          {new Date(res.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5 border-l pl-4 border-slate-200">
                          <HardDrive size={14} className="text-slate-400" /> 
                          {res.fileSize || "ไม่ระบุขนาด"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* ปุ่มการจัดการไฟล์ */}
                  <div className="flex items-center gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-6 lg:pt-0">
                    {/* ปุ่มเปิดดูไฟล์ (View) */}
                    <a 
                      href={res.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-none"
                    >
                      <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 rounded-xl gap-2 h-12 px-6 transition-all">
                        <Eye size={18} />
                        เปิดดูไฟล์
                      </Button>
                    </a>

                    {/* ปุ่มดาวน์โหลด (Download - บังคับลงเครื่อง) */}
                    <a 
                      href={getDownloadUrl(res.fileUrl)} 
                      download={res.title}
                      className="flex-1 lg:flex-none"
                    >
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl h-12 px-8 shadow-lg shadow-emerald-900/10 active:scale-95 transition-all">
                        <Download size={18} />
                        ดาวน์โหลด
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-400">ไม่พบเอกสารที่ท่านกำลังค้นหา</h3>
            <p className="text-slate-400 mt-2">โปรดลองใช้คำค้นหาอื่นหรือเลือกหมวดหมู่ใหม่</p>
          </div>
        )}
      </div>
    </div>
  )
}