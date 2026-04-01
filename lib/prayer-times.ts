// lib/prayer-times.ts

export async function getPrayerTimes() {
  // พิกัดจังหวัดยะลา: Lat 6.5411, Lng 101.2813
  // Method 3 = Muslim World League (ใช้กันแพร่หลายในไทย)
  const res = await fetch(
    'https://api.aladhan.com/v1/timingsByCity?city=Yala&country=Thailand&method=3',
    { next: { revalidate: 3600 } } // Cache ข้อมูลไว้ 1 ชั่วโมงเพื่อความเร็ว
  )

  if (!res.ok) {
    throw new Error('Failed to fetch prayer times')
  }

  const data = await res.json()
  return data.data.timings
}