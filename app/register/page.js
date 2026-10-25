import Link from "next/link";
import AuthForm from "../ui/auth-form";

export default function RegisterPage() {
  return (
    <main className="auth-layout">
      <aside className="auth-aside">
        <Link className="brand brand-light" href="/">
          <span className="brand-mark">D</span>
          <span>DIT205<span className="brand-divider">/</span>PORTAL</span>
        </Link>
        <div className="aside-content">
          <p className="eyebrow eyebrow-light">A GOOD PLACE TO BEGIN</p>
          <h1>ก้าวแรก<br />สู่พื้นที่<br /><span className="serif-accent">ของคุณ</span></h1>
          <p>สร้างบัญชีวันนี้ แล้วเริ่มต้นประสบการณ์ใหม่ไปด้วยกัน</p>
        </div>
        <div className="aside-footer"><span>DIT205 · MEMBER PORTAL</span><span>02 — 03</span></div>
        <span className="aside-orbit" aria-hidden="true" />
      </aside>
      <section className="auth-main">
        <Link className="back-link" href="/">← กลับหน้าแรก</Link>
        <div className="auth-panel">
          <p className="eyebrow">JOIN THE COMMUNITY</p>
          <h2>สร้างบัญชี<span className="heading-period">.</span></h2>
          <p className="auth-subtitle">กรอกข้อมูลด้านล่างเพื่อเริ่มต้นใช้งาน</p>
          <AuthForm mode="register" />
          <p className="auth-switch">มีบัญชีอยู่แล้ว? <Link href="/login">เข้าสู่ระบบ <span aria-hidden="true">↗</span></Link></p>
        </div>
        <p className="auth-legal">ข้อมูลของคุณจะถูกจัดเก็บอย่างปลอดภัย</p>
      </section>
    </main>
  );
}
