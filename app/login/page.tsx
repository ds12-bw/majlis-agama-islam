"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // สำหรับ Auth.js v5 (beta) การใช้ signIn ใน Client Component
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Username หรือ Password ไม่ถูกต้อง')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
            <Lock size={32} />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">ระบบจัดการ สอจ. ยะลา</CardTitle>
          <p className="text-slate-500 text-sm">เข้าสู่ระบบเพื่อจัดการข้อมูลข่าวสาร</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm text-center font-medium border border-rose-100">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">ชื่อผู้ใช้งาน</label>
              <input 
                type="text" 
                className="w-full p-3 bg-white rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">รหัสผ่าน</label>
              <input 
                type="password" 
                className="w-full p-3 bg-white rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl text-lg font-bold shadow-lg shadow-emerald-900/20">
              เข้าสู่ระบบ
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}