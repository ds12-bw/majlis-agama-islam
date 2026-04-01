import db from "@/lib/db"
import { deleteExecutive } from "./actions"
import { Button } from "@/components/ui/button"
import { Trash2, Users, ArrowUpDown } from "lucide-react"
import ExecutiveForm from "./ExecutiveForm"

export default async function AdminExecutivesPage() {
  // ดึงข้อมูลเรียงตามลำดับ Order
  const executives = await db.executive.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <Users className="text-emerald-600" size={36} /> จัดการทำเนียบผู้บริหาร
        </h1>
      </div>

      {/* ส่วนฟอร์มเพิ่มข้อมูล */}
      <ExecutiveForm />

      {/* ส่วนตารางรายการ */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b bg-slate-50/50 flex items-center gap-2 text-slate-500 font-bold text-sm uppercase tracking-widest">
          <ArrowUpDown size={16} /> รายชื่อผู้บริหารปัจจุบัน ({executives.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs uppercase border-b">
                <th className="p-6 font-bold">ลำดับ</th>
                <th className="p-6 font-bold">รูปภาพ</th>
                <th className="p-6 font-bold">ชื่อ - ตำแหน่ง</th>
                <th className="p-6 text-right font-bold">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {executives.map((ex) => (
                <tr key={ex.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-6">
                    <span className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full font-mono font-bold text-slate-500">
                      {ex.order}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="w-14 h-20 rounded-xl overflow-hidden shadow-md ring-2 ring-white">
                      <img src={ex.imageUrl || ""} className="w-full h-full object-cover" alt={ex.name} />
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-slate-800 text-lg">{ex.name}</p>
                    <p className="text-emerald-600 font-medium">{ex.position}</p>
                  </td>
                  <td className="p-6 text-right">
                    <form action={async () => { "use server"; await deleteExecutive(ex.id); }}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {executives.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Users size={40} />
            </div>
            <p className="text-slate-400 font-medium">ยังไม่มีรายชื่อผู้บริหารในระบบ</p>
          </div>
        )}
      </div>
    </div>
  )
}