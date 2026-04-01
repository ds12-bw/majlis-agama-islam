import "./globals.css"
import Navbar from "@/components/shared/Navbar"
import { AuthProvider } from "@/components/providers/SessionProvider" // Import ตัวใหม่

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <AuthProvider> {/* หุ้มลูกทั้งหมดไว้ที่นี่ */}
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}