import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// แก้ไขส่วนการ Import (บรรทัดที่ 4-19)
import { 
  Calculator, 
  Scale, 
  BookOpen, 
  MessageSquare, 
  ChevronRight, 
  Bell, 
  Calendar,
  Users,
  ArrowRight,
  MapPin,
  Phone, // แก้จาก PHone เป็น Phone
  Mail,
  Share2, // ใช้ Share2 แทน Facebook
  Globe
} from "lucide-react"
import PrayerTimesCard from "@/components/PrayerTimesCard"
import { Suspense } from 'react'
import db from "@/lib/db"

// --- MAIN PAGE COMPONENT ---
export default async function Home() {
  // ดึงข้อมูลจริงจาก Database
  const latestNews = await db.news.findMany({ orderBy: { createdAt: 'desc' }, take: 3 })
  const topExecutives = await db.executive.findMany({ orderBy: { order: 'asc' }, take: 12 })

  // กรองข้อมูลสำหรับโครงสร้างพีระมิด
  const pinnacle = topExecutives.filter(ex => ex.order === 1)
  const pillars = topExecutives.filter(ex => ex.order > 1 && ex.order <= 4)
  const council = topExecutives.filter(ex => ex.order > 4)

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      
      {/* 1. HERO & PRAYER TIMES SECTION */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#022c22]">
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/islamic-exercise.png')] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-emerald-400/10 border border-emerald-400/20 backdrop-blur-md px-5 py-2 rounded-full text-emerald-400 text-sm font-bold tracking-wide">
                <Bell size={16} className="animate-bounce" />
                MAJLIS AGAMA ISLAM WILAYAH JALA
              </div>
              <h1 className="text-5xl md:text-8xl font-black leading-[1.05] text-white tracking-tighter">
                ศูนย์รวมศรัทธา <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-100 font-serif italic">พัฒนาสังคมมุสลิม</span>
              </h1>
              <p className="text-xl text-emerald-100/50 max-w-2xl leading-relaxed font-light">
                ยกระดับการบริหารกิจการศาสนาสู่มาตรฐานสากล เพื่อคุณภาพชีวิตที่ดีขึ้นของพี่น้องชาวจังหวัดยะลา
              </p>
              <div className="flex flex-wrap gap-5 justify-center lg:justify-start pt-4">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-10 h-16 text-lg rounded-3xl font-bold shadow-2xl transition-all hover:-translate-y-1">
                  บริการออนไลน์ <ArrowRight className="ml-2" />
                </Button>
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 h-16 px-10 text-lg rounded-3xl backdrop-blur-sm transition-all font-medium">
                  ข่าวประชาสัมพันธ์
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <Suspense fallback={<div className="h-[400px] bg-white/5 animate-pulse rounded-[3rem]" />}>
                <div className="relative group">
                   <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-emerald-900/50 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                   <PrayerTimesCard />
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICES (Premium Grid) */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-30 w-full mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceItem href="/zakat" icon={<Calculator size={28}/>} title="ระบบซะกาต" desc="คำนวณและชำระออนไลน์" color="emerald" />
          <ServiceItem href="/faraid" icon={<Scale size={28}/>} title="คำนวณมรดก" desc="สัดส่วนตามหลักฟารออิต" color="amber" />
          <ServiceItem href="/resources" icon={<BookOpen size={28}/>} title="คลังคุตบะฮ์" desc="ดาวน์โหลดเอกสาร PDF" color="blue" />
          <ServiceItem href="/complaints" icon={<MessageSquare size={28}/>} title="ศูนย์ร้องเรียน" desc="แจ้งปัญหาและสอบถาม" color="rose" />
        </div>
      </section>

      {/* --- 3. THE ADMINISTRATIVE COUNCIL (Premium Compact) --- */}
<section className="max-w-6xl mx-auto px-6 py-24 w-full relative">
  <div className="text-center mb-20">
    <h2 className="text-emerald-600 font-bold tracking-[0.4em] uppercase text-[10px] mb-3">Institutional Leadership</h2>
    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif italic">ทำเนียบคณะกรรมการบริหาร</h3>
    <div className="w-12 h-0.5 bg-emerald-500 mx-auto mt-4 opacity-30"></div>
  </div>

  <div className="space-y-16">
    {/* Tier 1: ประธาน (The Pinnacle) - เล็กลงแต่เด่นด้วยกรอบทองจางๆ */}
    <div className="flex justify-center">
      {pinnacle.map(ex => (
        <div key={ex.id} className="w-56">
          <ExecutiveCard person={ex} size="lg" />
        </div>
      ))}
    </div>

    {/* Tier 2: รองประธาน / เลขานุการ (The Pillars) - จัดเรียงแบบกระชับ */}
    <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-4xl mx-auto">
      {pillars.map(ex => (
        <div key={ex.id} className="w-44">
          <ExecutiveCard person={ex} size="md" />
        </div>
      ))}
    </div>

    {/* Tier 3: กรรมการ (The Council) - ขนาดเล็ก มินิมอล */}
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-8 border-t border-slate-100">
      {council.map(ex => (
        <ExecutiveCard key={ex.id} person={ex} size="sm" />
      ))}
    </div>
  </div>
</section>

      {/* 4. LATEST NEWS (Modern Masonry) */}
      <section className="bg-slate-50 py-32 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
            <div className="space-y-3">
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight italic">ข่าวสารและกิจกรรมล่าสุด</h3>
              <p className="text-slate-500">เกาะติดทุกข่าวประกาศสำคัญจากทางสำนักงานคณะกรรมการอิสลามประจำจังหวัดยะลา</p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="rounded-full px-8 border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all font-bold">
                ข่าวทั้งหมด <ChevronRight className="ml-1" size={16}/>
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {latestNews.map((news) => (
              <Card key={news.id} className="group border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white transition-all duration-500 hover:shadow-2xl">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={news.imageUrl || "https://images.unsplash.com/photo-1584551271111-70bb96eeaf9a?q=80&w=800"} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={news.title}
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-800 shadow-xl">
                      {news.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
                    <Calendar size={12} /> {new Date(news.createdAt).toLocaleDateString('th-TH', { dateStyle: 'long' })}
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {news.title}
                  </h4>
                  <p className="text-slate-500 text-sm line-clamp-3 font-light leading-relaxed">
                    {news.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER (High-End Corporate) */}
      <footer className="bg-[#021b16] text-white pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 border-b border-white/5 pb-24">
          <div className="md:col-span-5 space-y-10">
            <div className="flex items-center gap-5">
               <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-800 rounded-3xl flex items-center justify-center font-black text-3xl shadow-2xl">ยล</div>
               <div>
                  <h5 className="text-2xl font-bold tracking-tight">สอจ. ยะลา</h5>
                  <p className="text-emerald-500/60 text-xs font-bold uppercase tracking-[0.3em]">Official MAI Jala Portal</p>
               </div>
            </div>
            <p className="text-emerald-100/30 font-light leading-relaxed max-w-sm">
              มุ่งมั่นให้บริการตามหลักชะรีอะฮ์และธรรมาภิบาล เพื่อส่งเสริมความสมานฉันท์และความเจริญรุ่งเรืองในแผ่นดินยะลา
            </p>
            <div className="flex gap-4">
   <SocialIcon icon={<Share2 size={18}/>} /> {/* เปลี่ยนตรงนี้ */}
   <SocialIcon icon={<Mail size={18}/>} />
   <SocialIcon icon={<Globe size={18}/>} />
</div>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <FooterCol title="บริการออนไลน์" links={['คำนวณซะกาต', 'แบ่งมรดก', 'ระบบนิกะฮ์', 'รับรองฮาลาล']} />
            <FooterCol title="ข้อมูลหน่วยงาน" links={['เกี่ยวกับเรา', 'โครงสร้างองค์กร', 'ทำเนียบผู้บริหาร', 'ระเบียบปฏิบัติ']} />
            <div className="space-y-6">
               <h6 className="font-bold text-emerald-400 text-sm uppercase tracking-widest">ติดต่อสำนักงาน</h6>
               <div className="space-y-5 text-sm text-emerald-100/40 font-light">
                  <p className="flex items-start gap-4 leading-relaxed"><MapPin size={20} className="text-emerald-500 shrink-0" /> ถนนสุขยางค์ ตำบลสะเตง อำเภอเมือง จังหวัดยะลา 95000</p>
                  <p className="flex items-center gap-4"><Phone size={20} className="text-emerald-500 shrink-0" /> 073-212-xxx</p>
               </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-500/20">
          <p>© 2026 MAJLIS AGAMA ISLAM WILAYAH JALA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
             <span>ยะลา เมืองแห่งความสมานฉันท์</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// --- SUB-COMPONENTS (Defined OUTSIDE to avoid bugs) ---

function ExecutiveCard({ person, size }: { person: any; size: 'lg' | 'md' | 'sm' }) {
  // กำหนดขนาดตามระดับ
  const dimensions = {
    lg: "aspect-[3/4] w-full shadow-emerald-900/10",
    md: "aspect-[3/4] w-full shadow-slate-200/50",
    sm: "aspect-[3/4] w-full shadow-slate-100"
  }
  
  const textStyles = {
    lg: { name: "text-xl", pos: "text-[9px]" },
    md: { name: "text-base", pos: "text-[8px]" },
    sm: { name: "text-xs", pos: "text-[7px]" }
  }

  return (
    <div className="flex flex-col items-center text-center group">
      <div className={`relative ${dimensions[size]} rounded-[2rem] overflow-hidden mb-4 transition-all duration-700 group-hover:-translate-y-2 ring-1 ring-slate-100 bg-white`}>
        {/* รูปภาพที่มีฟิลเตอร์ Soft Grayscale */}
        <img 
          src={person.imageUrl || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800"} 
          alt={person.name} 
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        />
        
        {/* Gradient Overlay แบบนุ่มนวล */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
        
        {/* เลเยอร์แสงสะท้อนขอบรูป (Inner Glow) */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] pointer-events-none"></div>
      </div>

      <div className="space-y-1 px-2">
         <p className={`text-emerald-600 font-bold uppercase tracking-[0.2em] ${textStyles[size].pos}`}>
           {person.position}
         </p>
         <h4 className={`text-slate-800 font-bold tracking-tight leading-tight transition-colors group-hover:text-emerald-700 ${textStyles[size].name}`}>
           {person.name}
         </h4>
      </div>
    </div>
  )
}

function ServiceItem({ href, icon, title, desc, color }: any) {
  const colors: any = {
    emerald: "bg-emerald-500 shadow-emerald-200",
    amber: "bg-amber-500 shadow-amber-200",
    blue: "bg-blue-600 shadow-blue-200",
    rose: "bg-rose-600 shadow-rose-200",
  }
  return (
    <Link href={href} className="group">
      <Card className="border-none shadow-[0_30px_60px_rgba(0,0,0,0.03)] rounded-[2.5rem] p-8 h-full transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl group-hover:bg-emerald-950">
        <CardContent className="p-0 flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
          <div className={`${colors[color]} w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]`}>
            {icon}
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-black text-slate-800 group-hover:text-white transition-colors">{title}</h4>
            <p className="text-slate-400 text-sm font-light group-hover:text-emerald-200/50 transition-colors leading-relaxed">{desc}</p>
          </div>
          <div className="w-8 h-1 bg-slate-100 rounded-full group-hover:w-full group-hover:bg-emerald-500/30 transition-all duration-700"></div>
        </CardContent>
      </Card>
    </Link>
  )
}

function SocialIcon({ icon }: any) {
  return (
    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-400 transition-all cursor-pointer">
      {icon}
    </div>
  )
}

function FooterCol({ title, links }: any) {
  return (
    <div className="space-y-8">
      <h6 className="font-bold text-emerald-400 text-sm uppercase tracking-widest">{title}</h6>
      <ul className="space-y-4 text-sm text-emerald-100/30 font-light">
        {links.map((l: any) => <li key={l} className="hover:text-emerald-400 transition-colors cursor-pointer">{l}</li>)}
      </ul>
    </div>
  )
}