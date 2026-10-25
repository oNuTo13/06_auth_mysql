import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getPool } from "../../../lib/db";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const fullname = typeof body.fullname === "string" ? body.fullname.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : "";

  if (!fullname || fullname.length > 255 || !email || email.length > 255 || !email.includes("@")) {
    return NextResponse.json({ error: "กรุณากรอกชื่อและอีเมลให้ถูกต้อง" }, { status: 400 });
  }
  if (Buffer.byteLength(password, "utf8") < 8 || Buffer.byteLength(password, "utf8") > 72) {
    return NextResponse.json({ error: "รหัสผ่านต้องมีความยาว 8–72 ไบต์" }, { status: 400 });
  }
  if (password !== confirmPassword) {
    return NextResponse.json({ error: "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน" }, { status: 400 });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    await getPool().execute(
      "INSERT INTO users (email, password, fullname) VALUES (?, ?, ?)",
      [email, passwordHash, fullname],
    );
    return NextResponse.json({ message: "สมัครสมาชิกสำเร็จ" }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 409 });
    }
    console.error("Registration failed", error);
    return NextResponse.json({ error: "ระบบสมัครสมาชิกขัดข้อง กรุณาลองใหม่ภายหลัง" }, { status: 500 });
  }
}
