"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send, ShieldCheck, HelpCircle } from "lucide-react"

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-rose-100 text-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">ศูนย์รับเรื่องร้องเรียนและสอบถาม</h1>
          <p className="text-slate-500">ท่านสามารถส่งข้อร้องเรียนหรือสอบถามปัญหาศาสนามายัง สอจ. ยะลา ได้โดยตรง</p>
        </div>

        <Card className="border-none shadow-xl overflow-hidden">
          <div className="bg-rose-600 py-2 px-6">
            <p className="text-rose-100 text-xs flex items-center gap-2">
              <ShieldCheck size={14} /> ข้อมูลของท่านจะถูกเก็บเป็นความลับตามนโยบาย PDPA
            </p>
          </div>
          <CardHeader className="pt-8">
            <CardTitle>แบบฟอร์มส่งข้อมูล</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ชื่อ-นามสกุล</label>
                <input className="w-full p-3 bg-slate-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-rose-500" placeholder="ระบุชื่อของท่าน" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">เบอร์โทรศัพท์ติดต่อ</label>
                <input className="w-full p-3 bg-slate-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-rose-500" placeholder="08x-xxxxxxx" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">ประเภทเรื่อง</label>
              <select className="w-full p-3 bg-slate-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-rose-500">
                <option>สอบถามปัญหาศาสนา</option>
                <option>ร้องเรียนการบริการ</option>
                <option>แจ้งปัญหาความขัดแย้งในชุมชน</option>
                <option>อื่นๆ</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">รายละเอียด</label>
              <textarea 
                className="w-full p-3 bg-slate-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-rose-500 min-h-[150px]" 
                placeholder="กรุณาระบุรายละเอียดที่ท่านต้องการแจ้ง..."
              ></textarea>
            </div>

            <Button className="w-full bg-rose-600 hover:bg-rose-700 h-14 text-lg rounded-2xl gap-2 shadow-lg shadow-rose-900/20">
              <Send size={20} /> ส่งข้อมูลถึงเจ้าหน้าที่
            </Button>
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
              <HelpCircle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">คำถามที่พบบ่อย (FAQ)</h4>
              <p className="text-sm text-slate-500 mt-1">ค้นหาคำตอบเบื้องต้นสำหรับปัญหาที่ถูกสอบถามบ่อย</p>
            </div>
          </div>
          {/* สามารถเพิ่มปุ่มหรือลิงก์อื่นๆ ได้ที่นี่ */}
        </div>
      </div>
    </div>
  )
}