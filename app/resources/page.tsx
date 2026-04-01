import db from "@/lib/db"
import ResourceList from "@/components/resources/ResourceList"
import { BookOpen } from "lucide-react"

// ปิด Cache เพื่อให้เห็นไฟล์ใหม่ทันทีหลังจากแอดมินอัปโหลด
export const revalidate = 0 

export default async function ResourcesPage() {
  // 1. ดึงข้อมูลจริงจาก Database
  const resources = await db.resource.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <section className="bg-emerald-900 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/islamic-exercise.png')]"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="bg-emerald-400/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-emerald-400/30">
            <BookOpen size={40} className="text-emerald-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">คลังทรัพยากรดิจิทัล</h1>
          <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto leading-relaxed">
            ศูนย์รวมคุตบะฮ์วันศุกร์ประจำสัปดาห์ แบบฟอร์มคำร้องต่าง ๆ และคำวินิจฉัยทางศาสนา 
            เพื่ออำนวยความสะดวกแก่พี่น้องมุสลิมจังหวัดยะลา
          </p>
        </div>
      </section>

      {/* Main Content (Resource List) */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <ResourceList initialResources={resources} />
      </div>
    </div>
  )
}