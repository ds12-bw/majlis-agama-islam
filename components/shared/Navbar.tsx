"use client"
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react" // ตัวช่วยจัดการ Session
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogOut, LogIn, User } from "lucide-react"

const Navbar = () => {
  const { data: session, status } = useSession() // ดึงข้อมูลการล็อกอิน

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold group-hover:bg-emerald-600 transition-colors">
            ยล
          </div>
          <div>
            <h1 className="font-bold text-emerald-800 leading-none text-lg">สอจ. ยะลา</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Majlis Agama Islam Jala</p>
          </div>
        </Link>
        
        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-emerald-700 transition">หน้าหลัก</Link>
          <Link href="/zakat" className="hover:text-emerald-700 transition">ซะกาต</Link>
          <Link href="/faraid" className="hover:text-emerald-700 transition">มรดก</Link>
          <Link href="/resources" className="hover:text-emerald-700 transition">คลังความรู้</Link>
          <Link href="/complaints" className="hover:text-emerald-700 transition">ติดต่อ/ร้องเรียน</Link>
        </div>

        {/* ส่วนปุ่ม Login / Logout */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-lg" />
          ) : session ? (
            // --- กรณีล็อกอินแล้ว ---
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="ghost" className="text-emerald-700 hover:bg-emerald-50 gap-2 font-bold">
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:inline">แผงควบคุม</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => signOut({ callbackUrl: '/' })} // ออกจากระบบแล้วดีดไปหน้าหลัก
                className="border-rose-200 text-rose-600 hover:bg-rose-50 gap-2"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">ออกจากระบบ</span>
              </Button>
            </div>
          ) : (
            // --- กรณีที่ยังไม่ได้ล็อกอิน ---
            <Link href="/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 px-6 rounded-xl shadow-lg shadow-emerald-900/20 transition-all active:scale-95">
                <LogIn size={18} />
                เข้าสู่ระบบ
              </Button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar