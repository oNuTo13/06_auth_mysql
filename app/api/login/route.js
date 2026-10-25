import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSession, SESSION_COOKIE, SESSION_DURATION_SECONDS } from "../../../lib/auth";
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

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || email.length > 255 || !password || Buffer.byteLength(password, "utf8") > 72) {
    return NextResponse.json({ error: "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน" }, { status: 400 });
  }

  try {
    const [rows] = await getPool().execute(
      "SELECT id, email, password, fullname FROM users WHERE email = ? LIMIT 1",
      [email],
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    const token = await createSession(user);
    const response = NextResponse.json({ message: "เข้าสู่ระบบสำเร็จ" });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
    });
    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ error: "ระบบเข้าสู่ระบบขัดข้อง กรุณาลองใหม่ภายหลัง" }, { status: 500 });
  }
}
