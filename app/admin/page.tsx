import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, MessageCircle, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">แผงควบคุม (Dashboard)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="ข่าวสารทั้งหมด" value="48" icon={<FileText className="text-blue-500"/>} trend="+3 ในสัปดาห์นี้" />
        <StatCard title="เอกสารดาวน์โหลด" value="152" icon={<Users className="text-emerald-500"/>} trend="+5 รายการใหม่" />
        <StatCard title="เรื่องร้องเรียนใหม่" value="12" icon={<MessageCircle className="text-rose-500"/>} trend="รอการตรวจสอบ" />
        <StatCard title="ผู้เข้าชมวันนี้" value="1,240" icon={<ArrowUpRight className="text-amber-500"/>} trend="+12% จากเมื่อวาน" />
      </div>

      {/* ตารางแสดงเรื่องร้องเรียนล่าสุด */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">เรื่องร้องเรียนล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y text-sm">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">ปัญหาเรื่องการแบ่งมรดกในครอบครัว</p>
                  <p className="text-slate-500 text-xs">จาก: นายมูฮัมหมัด ส. • 2 ชั่วโมงที่แล้ว</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">รอดำเนินการ</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-slate-100 rounded-xl">{icon}</div>
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
        <p className="text-xs mt-2 text-slate-400">{trend}</p>
      </CardContent>
    </Card>
  )
}