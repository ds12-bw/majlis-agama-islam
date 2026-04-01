// app/admin/layout.tsx
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Newspaper, 
  FolderDown, 
  MessageSquare, 
  LogOut, 
  Globe,
  Users // <--- มั่นใจว่า import Users เข้ามาแล้ว
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-50">
        <div className="p-6 text-white font-bold text-xl border-b border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">ย</div>
          Admin Panel
        </div>
        
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <MenuLink href="/admin" icon={<LayoutDashboard size={20}/>} label="แผงควบคุม" />
          <MenuLink href="/admin/news" icon={<Newspaper size={20}/>} label="จัดการข่าวสาร" />
          
          {/* --- เพิ่มปุ่มจัดการคณะกรรมการตรงนี้ --- */}
          <MenuLink href="/admin/executives" icon={<Users size={20}/>} label="จัดการคณะกรรมการ" />
          {/* ---------------------------------- */}
          
          <MenuLink href="/admin/resources" icon={<FolderDown size={20}/>} label="จัดการคลังความรู้" />
          <MenuLink href="/admin/complaints" icon={<MessageSquare size={20}/>} label="เรื่องร้องเรียน" />
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <MenuLink href="/" icon={<Globe size={20}/>} label="ดูหน้าเว็บไซต์" />
          {/* ปุ่มออกจากระบบ (ใส่โค้ด signOut ที่เราทำไว้ก่อนหน้านี้) */}
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition text-sm font-medium text-left">
            <LogOut size={20} /> ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

// คอมโพเนนต์ย่อยสำหรับ Link เมนู
function MenuLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 hover:text-white transition text-sm font-medium">
      {icon} {label}
    </Link>
  )
}