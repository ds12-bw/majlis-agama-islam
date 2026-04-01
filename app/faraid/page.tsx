"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Scale, AlertCircle } from "lucide-react"

export default function FaraidPage() {
  const [estate, setEstate] = useState<number>(0)
  const [heirs, setHeirs] = useState({
    husband: false,
    wife: false,
    sons: 0,
    daughters: 0,
    father: false,
    mother: false
  })

  // ฟังก์ชันคำนวณแบบง่าย (ตัวอย่างหลักการเบื้องต้น)
  const calculateFaraid = () => {
    let results = []
    let remaining = estate

    // 1. สามี/ภรรยา
    if (heirs.husband) {
      const share = (heirs.sons > 0 || heirs.daughters > 0) ? estate * (1/4) : estate * (1/2)
      results.push({ label: "สามี", amount: share, fraction: (heirs.sons > 0 || heirs.daughters > 0) ? "1/4" : "1/2" })
      remaining -= share
    }
    if (heirs.wife) {
      const share = (heirs.sons > 0 || heirs.daughters > 0) ? estate * (1/8) : estate * (1/4)
      results.push({ label: "ภรรยา", amount: share, fraction: (heirs.sons > 0 || heirs.daughters > 0) ? "1/8" : "1/4" })
      remaining -= share
    }

    // 2. พ่อ/แม่
    if (heirs.father) {
      const share = estate * (1/6)
      results.push({ label: "บิดา", amount: share, fraction: "1/6" })
      remaining -= share
    }
    if (heirs.mother) {
      const share = estate * (1/6)
      results.push({ label: "มารดา", amount: share, fraction: "1/6" })
      remaining -= share
    }

    // 3. ลูก (Asabah - ส่วนที่เหลือ)
    if (remaining > 0 && (heirs.sons > 0 || heirs.daughters > 0)) {
      const totalUnits = (heirs.sons * 2) + heirs.daughters
      const perUnit = remaining / totalUnits
      if (heirs.sons > 0) {
        results.push({ label: `บุตรชาย (${heirs.sons} คน)`, amount: perUnit * 2 * heirs.sons, fraction: "ส่วนแบ่ง 2:1" })
      }
      if (heirs.daughters > 0) {
        results.push({ label: `บุตรสาว (${heirs.daughters} คน)`, amount: perUnit * heirs.daughters, fraction: "ส่วนแบ่ง 1:1" })
      }
    }

    return results
  }

  const results = calculateFaraid()

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-emerald-600 p-3 rounded-2xl text-white">
            <Scale size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">ระบบคำนวณมรดก (ฟารออิต)</h1>
            <p className="text-slate-500">คำนวณสัดส่วนการแบ่งมรดกเบื้องต้นตามหลักการอิสลาม</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ข้อมูลทายาท */}
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>ข้อมูลผู้เสียชีวิตและทายาท</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">มูลค่ามรดกสุทธิ (บาท)</label>
                <input 
                  type="number" 
                  className="w-full p-4 bg-slate-100 rounded-xl text-xl font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="เช่น 1,000,000"
                  onChange={(e) => setEstate(Number(e.target.value))}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-emerald-700">คู่ครอง/บุพการี</h3>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" onChange={(e) => setHeirs({...heirs, husband: e.target.checked})} />
                    <label>สามี (ยังมีชีวิต)</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" onChange={(e) => setHeirs({...heirs, wife: e.target.checked})} />
                    <label>ภรรยา (ยังมีชีวิต)</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" onChange={(e) => setHeirs({...heirs, father: e.target.checked})} />
                    <label>บิดา (ยังมีชีวิต)</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" onChange={(e) => setHeirs({...heirs, mother: e.target.checked})} />
                    <label>มารดา (ยังมีชีวิต)</label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-emerald-700">บุตร</h3>
                  <div>
                    <label className="text-sm block">จำนวนบุตรชาย</label>
                    <input type="number" min="0" className="border p-2 w-20 rounded" onChange={(e) => setHeirs({...heirs, sons: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-sm block">จำนวนบุตรสาว</label>
                    <input type="number" min="0" className="border p-2 w-20 rounded" onChange={(e) => setHeirs({...heirs, daughters: Number(e.target.value)})} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* สรุปผล */}
          <div className="space-y-6">
            <Card className="bg-emerald-800 text-white shadow-xl">
              <CardHeader><CardTitle>สัดส่วนมรดก</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {results.length > 0 && estate > 0 ? (
                  results.map((res, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-emerald-700 pb-2">
                      <div>
                        <p className="font-medium">{res.label}</p>
                        <p className="text-xs text-emerald-300">{res.fraction}</p>
                      </div>
                      <p className="font-bold">฿{res.amount.toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-emerald-300 text-center py-10">กรุณากรอกข้อมูลมรดกและทายาท</p>
                )}
              </CardContent>
            </Card>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 flex gap-3 text-amber-800 text-sm">
              <AlertCircle className="shrink-0" />
              <p>นี่คือการคำนวณเบื้องต้น โปรดปรึกษาผู้เชี่ยวชาญจาก สอจ. อีกครั้งเพื่อความถูกต้องตามนิติบัญญัติ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}