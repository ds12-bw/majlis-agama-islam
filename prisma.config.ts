import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// บรรทัดนี้จะบังคับให้โหลดค่าจากไฟล์ .env เข้ามาในระบบก่อน
dotenv.config();

export default defineConfig({
  schema: {
    kind: 'local',
    path: './prisma/schema.prisma', // เพิ่ม ./ เข้าไปข้างหน้า
  },
  datasource: {
    url: "postgresql://postgres:รหัสผ่านของคุณ@localhost:5432/majlis_yala?schema=public",
  },
});