export const dynamic = 'force-dynamic'
import db from "@/lib/db"
import { deleteResource } from "./actions"
import { Button } from "@/components/ui/button"
import { Trash2, FileText, Download } from "lucide-react"
import ResourceForm from "./ResourceForm"

export default async function AdminResourcesPage() {
  const resources = (await db.resource.findMany())
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
        <FileText className="text-emerald-600" /> จัดการคลังความรู้/ไฟล์ PDF
      </h1>

      <ResourceForm />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4">ชื่อเอกสาร</th>
              <th className="p-4">หมวดหมู่</th>
              <th className="p-4">ขนาด</th>
              <th className="p-4 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {resources.map((res) => (
              <tr key={res.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-800">{res.title}</td>
                <td className="p-4 text-slate-500">{res.category}</td>
                <td className="p-4 text-slate-400">{res.fileSize}</td>
                <td className="p-4 text-right space-x-2">
                   <a href={res.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="text-emerald-600"><Download size={18}/></Button>
                  </a>
                  <form action={async () => { "use server"; await deleteResource(res.id); }} className="inline">
                    <Button variant="ghost" size="icon" className="text-rose-500"><Trash2 size={18} /></Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}