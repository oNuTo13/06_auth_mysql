# DIT205 Member Portal

ระบบสมาชิก Next.js ตามบทเรียน **04 Login and Register with Next.js and MySQL** และ **05 Deploy Next.js on Vercel and MySQL on TiDB Cloud** ประกอบด้วยหน้าแรก หน้า Register หน้า Login และหน้า Dashboard ที่ต้องเข้าสู่ระบบก่อน

## เริ่มต้นใช้งานในเครื่อง

1. ติดตั้ง Node.js LTS และ MySQL ที่รองรับ MySQL protocol
2. สร้างฐานข้อมูล/ต     ารางโดยรัน [`database/schema.sql`](./database/schema.sql) ใน SQL client
3. คัดลอก `.env.example` เป็น `.env.local` แล้วกำหนดค่าการเชื่อมต่อฐานข้อมูลและ `JWT_SECRET` (อย่างน้อย 32 ตัวอักษร) ให้ตรงกับเครื่องของคุณ
4. ติดตั้งแพ็กเกจและเริ่มแอป:

   ```bash
   npm install
   npm run dev
   ```

5. เปิด [http://localhost:3000](http://localhost:3000), สมัครสมาชิก แล้วเข้าสู่ระบบ

## Deploy ด้วย TiDB Cloud และ Vercel

1. สร้าง TiDB Cloud Starter instance (เลือก Singapore หากมีให้เลือก) แล้วสร้าง schema โดยรัน [`database/schema.sql`](./database/schema.sql) ใน SQL Editor
2. ใน TiDB Cloud เปิด **Connect** แล้วจด Host, Port, Username และ Password ไว้เป็นความลับ
3. สร้าง GitHub repository ของตัวเอง แล้ว push โค้ดชุดนี้ขึ้น repository โดยไม่ push `.env.local`
4. ใน Vercel เลือก **Add New → Project**, นำเข้า GitHub repository แล้วตั้ง Environment Variables สำหรับ Production:

   | Variable | ค่า |
   | --- | --- |
   | `DB_HOST` | Host จาก TiDB Cloud |
   | `DB_PORT` | Port จาก TiDB Cloud (โดยทั่วไป `4000`) |
   | `DB_USERNAME` | Username จาก TiDB Cloud |
   | `DB_PASSWORD` | Password จาก TiDB Cloud |
   | `DB_DATABASE` | `dit205_db` |
   | `DB_SSL` | `true` |
   | `JWT_SECRET` | สุ่ม secret ใหม่ที่ยาวอย่างน้อย 32 ตัวอักษร |

5. Deploy แล้วทดสอบสมัครสมาชิก/เข้าสู่ระบบบน URL `.vercel.app` ที่ Vercel สร้างให้ ตรวจสอบว่า Environment Variables ครบก่อนใช้งานจริง

> ห้ามแชร์หรือ commit credentials ของ TiDB, `JWT_SECRET` หรือไฟล์ `.env.local` ลง GitHub

## Pages และ API

- `/` หน้าแนะนำโปรเจกต์พร้อมชื่อและรหัสนักศึกษา
- `/register` สมัครสมาชิก
- `/login` เข้าสู่ระบบ
- `/dashboard` พื้นที่สมาชิก (redirect ไป Login หากไม่มี session)
- `POST /api/register`, `POST /api/login`, `GET /api/me`, `POST /api/logout`
