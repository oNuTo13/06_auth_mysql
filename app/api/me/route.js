import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Session verification failed", error);
    return NextResponse.json({ error: "ไม่สามารถตรวจสอบ session ได้" }, { status: 500 });
  }
}
