import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // เข้ารหัสผ่านก่อนบันทึก (สำคัญมาก!)
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'เจ้าหน้าที่ สอจ. ยะลา',
    },
  })

  console.log({ admin })
  console.log("สร้างแอดมินคนแรกสำเร็จ! User: admin / Pass: admin123")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })