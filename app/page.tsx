export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Calculator, Scale, BookOpen, MessageSquare, 
  ChevronRight, Bell, Calendar, Users, 
  ArrowRight, MapPin, Phone, Mail, Share2, Globe 
} from "lucide-react"
import PrayerTimesCard from "@/components/PrayerTimesCard"
import { Suspense } from 'react'
import db from "@/lib/db"

export default async function Home() {
  const latestNews = await db.news.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }).catch(() => [])
  const topExecutives = await db.executive.findMany({ orderBy: { order: 'asc' }, take: 12 }).catch(() => [])

  const pinnacle = topExecutives.filter(ex => ex.order === 1)
  const pillars = topExecutives.filter(ex => ex.order > 1 && ex.order <= 4)
  const council = topExecutives.filter(ex => ex.order > 4)

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#022c22]">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-emerald-400/10 border border-emerald-400/20 backdrop-blur-md px-5 py-2 rounded-full text-emerald-400 text-sm font-bold">
                <Bell size={16} /> MAJLIS AGAMA ISLAM YALA
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter">ศูนย์รวมศรัทธา <br/><span className="text-emerald-400 font-serif italic">พัฒนาสังคมมุสลิม</span></h1>
              <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-10 h-16 rounded-3xl font-bold">บริการออนไลน์</Button>
              </div>
            </div>
            <div className="lg:col-span-5 w-full">
              <Suspense fallback={<div className="h-80 bg-white/5 animate-pulse rounded-[3rem]" />}>
                <PrayerTimesCard />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-30 w-full mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceItem href="/zakat" icon={<Calculator />} title="ระบบซะกาต" desc="คำนวณและชำระออนไลน์" color="emerald" />
          <ServiceItem href="/faraid" icon={<Scale />} title="คำนวณมรดก" desc="สัดส่วนตามหลักฟารออิต" color="amber" />
          <ServiceItem href="/resources" icon={<BookOpen />} title="คลังคุตบะฮ์" desc="ดาวน์โหลดเอกสาร PDF" color="blue" />
          <ServiceItem href="/complaints" icon={<MessageSquare />} title="ศูนย์ร้องเรียน" desc="แจ้งปัญหาและสอบถาม" color="rose" />
        </div>
      </section>

      {/* Executives */}
      <section className="max-w-6xl mx-auto px-6 py-24 w-full text-center">
        <h3 className="text-3xl font-bold text-slate-900 mb-16 font-serif italic">ทำเนียบคณะกรรมการบริหาร</h3>
        <div className="space-y-16">
          <div className="flex justify-center">{pinnacle.map(ex => <div key={ex.id} className="w-56"><ExecutiveCard person={ex} size="lg" /></div>)}</div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">{pillars.map(ex => <div key={ex.id} className="w-44"><ExecutiveCard person={ex} size="md" /></div>)}</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 pt-8 border-t border-slate-100">{council.map(ex => <ExecutiveCard key={ex.id} person={ex} size="sm" />)}</div>
        </div>
      </section>
    </div>
  )
}

function ExecutiveCard({ person, size }: any) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden mb-4 transition-all duration-700 group-hover:-translate-y-2 ring-1 ring-slate-100 bg-white">
        <img src={person.imageUrl || ""} alt={person.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-0 right-0 px-2 text-white">
          <p className="text-[8px] font-bold uppercase text-emerald-400">{person.position}</p>
          <h4 className="font-bold text-xs">{person.name}</h4>
        </div>
      </div>
    </div>
  )
}

function ServiceItem({ href, icon, title, desc, color }: any) {
  return (
    <Link href={href} className="group">
      <Card className="border-none shadow-xl rounded-[2.5rem] p-8 h-full transition-all group-hover:-translate-y-4">
        <div className="bg-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6">{icon}</div>
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-slate-400 text-sm">{desc}</p>
      </Card>
    </Link>
  )
}