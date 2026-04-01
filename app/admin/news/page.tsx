export const dynamic = 'force-dynamic'
// ใส่ไว้ด้านบนสุดของไฟล์ เพื่อดึง Component ใหม่มาใช้
import db from "@/lib/db"
import { addNews, deleteNews } from "./actions"
import { Button } from "@/components/ui/button"
import { Trash2, Newspaper } from "lucide-react"
import NewsForm from "./NewsForm" // เดี๋ยวเราจะสร้างไฟล์นี้ครับ

export default async function AdminNewsPage() {
  const newsItems = await db.news.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
        <Newspaper className="text-emerald-600" /> จัดการข่าวสาร
      </h1>

      {/* เรียกใช้ Client Component สำหรับฟอร์ม */}
      <NewsForm />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* ... (ตารางแสดงข่าวสาร เหมือนเดิมที่คุณทำไว้) ... */}
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="p-4">รูปภาพ</th>
              <th className="p-4">หัวข้อข่าว</th>
              <th className="p-4 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {newsItems.map((news) => (
              <tr key={news.id}>
                <td className="p-4">
                  <img src={news.imageUrl || "/placeholder.jpg"} className="w-16 h-10 object-cover rounded-md" />
                </td>
                <td className="p-4 font-medium">{news.title}</td>
                <td className="p-4 text-right">
                  <form action={async () => { "use server"; await deleteNews(news.id); }}>
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