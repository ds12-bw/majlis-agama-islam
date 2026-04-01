// components/PrayerTimesCard.tsx
import { getPrayerTimes } from "@/lib/prayer-times"
import { Clock, MapPin } from "lucide-react"

export default async function PrayerTimesCard() {
  const timings = await getPrayerTimes()

  const prayerList = [
    { name: "ซุบฮิ", time: timings.Fajr, icon: "🌅" },
    { name: "ซูฮรี", time: timings.Dhuhr, icon: "☀️" },
    { name: "อัสรี", time: timings.Asr, icon: "🌤️" },
    { name: "มักริบ", time: timings.Maghrib, icon: "🌆" },
    { name: "อีชา", time: timings.Isha, icon: "🌙" },
  ]

  return (
    <div className="relative overflow-hidden bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-8">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Clock className="text-emerald-400 animate-pulse" size={24} />
              เวลาละหมาดวันนี้
            </h3>
            <p className="text-emerald-300/60 text-xs flex items-center gap-1 font-medium uppercase tracking-widest">
              <MapPin size={12} /> จังหวัดยะลา (อำเภอเมือง)
            </p>
          </div>
          <div className="text-right">
             <p className="text-emerald-400 font-serif font-bold text-xl leading-none">ยะลา</p>
             <p className="text-[10px] text-white/40 uppercase tracking-tighter">Yala City</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {prayerList.map((p, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between bg-black/20 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/30 p-4 rounded-2xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl group-hover:scale-110 transition-transform">{p.icon}</span>
                <span className="text-white font-bold text-lg">{p.name}</span>
              </div>
              <div className="text-2xl font-mono font-bold text-emerald-400 tracking-tighter">
                {p.time}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/10 text-center">
           <p className="text-[10px] text-white/30 italic">
             อ้างอิง: Muslim World League • {new Date().toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
           </p>
        </div>
      </div>
    </div>
  )
}