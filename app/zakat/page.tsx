"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Coins, Wallet } from "lucide-react"

export default function ZakatPage() {
  const [cash, setCash] = useState<number>(0)
  const [gold, setGold] = useState<number>(0)
  const [goldPrice, setGoldPrice] = useState<number>(34500) // ราคาทองสมมติ (ควรดึง API ในอนาคต)

  // เกณฑ์นิซอบ (Nisab) คือ ราคาทองคำแท่ง 5.6 บาท (85 กรัม)
  const nisabThreshold = goldPrice * 5.6
  
  const totalWealth = Number(cash) + (Number(gold) * (goldPrice / 15.244) * 15.2) // คำนวณจากน้ำหนักทอง
  const isEligible = totalWealth >= nisabThreshold
  const zakatAmount = isEligible ? totalWealth * 0.025 : 0

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-emerald-800 flex items-center justify-center gap-2">
            <Calculator className="text-emerald-600" /> ระบบคำนวณซะกาตออนไลน์
          </h1>
          <p className="text-slate-600 mt-2">คำนวณซะกาตเงินสดและทองคำ ตามหลักการศาสนาอิสลาม</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ส่วนกรอกข้อมูล */}
          <div className="space-y-6">
            <Card className="border-t-4 border-t-emerald-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet size={20} className="text-emerald-600"/> ทรัพย์สินเงินสด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <label className="text-sm text-slate-500 mb-2 block">เงินสดรวม (เงินฝาก, เงินเก็บ, เงินลงทุน)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full p-3 bg-slate-100 border-none rounded-lg text-lg font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                    onChange={(e) => setCash(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-3 text-slate-400">บาท</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-yellow-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Coins size={20} className="text-yellow-600"/> ทองคำสะสม
                </CardTitle>
              </CardHeader>
              <CardContent>
                <label className="text-sm text-slate-500 mb-2 block">น้ำหนักทองคำรวม (กรัม หรือ บาททอง)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full p-3 bg-slate-100 border-none rounded-lg text-lg font-semibold focus:ring-2 focus:ring-yellow-500 outline-none"
                    onChange={(e) => setGold(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-3 text-slate-400">บาท</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ส่วนแสดงผลลัพธ์ */}
          <div className="flex flex-col h-full">
            <Card className="bg-emerald-900 text-white flex-grow shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Calculator size={120} />
               </div>
              <CardHeader>
                <CardTitle className="text-emerald-300">สรุปยอดที่ต้องชำระ</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10 relative z-10">
                <p className="text-sm opacity-80 mb-2 text-center">
                  เกณฑ์นิซอบปัจจุบัน (อ้างอิงราคาทอง): <br/>
                  <span className="font-bold text-yellow-400">฿{nisabThreshold.toLocaleString()}</span>
                </p>
                <div className="text-5xl font-bold mb-4 tracking-tight">
                  ฿{zakatAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </div>
                {isEligible ? (
                  <div className="bg-emerald-800/50 p-4 rounded-lg border border-emerald-500 text-center">
                    <p className="text-emerald-200 text-sm">ทรัพย์สินของคุณถึงเกณฑ์ที่ต้องจ่ายซะกาต</p>
                    <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-emerald-950 font-bold w-full">
                      ชำระซะกาตออนไลน์
                    </Button>
                  </div>
                ) : (
                  <p className="text-emerald-400 text-sm italic text-center">
                    *ทรัพย์สินยังไม่ถึงเกณฑ์นิซอบ (ไม่ต้องจ่ายซะกาต)
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}