import Link from "next/link";
import AuthForm from "../ui/auth-form";

export default function LoginPage() {
  return (
    <main className="auth-layout">
      <aside className="auth-aside">
        <Link className="brand brand-light" href="/">
          <span className="brand-mark">D</span>
          <span>DIT205<span className="brand-divider">/</span>PORTAL</span>
        </Link>
        <div className="aside-content">
          <p className="eyebrow eyebrow-light">WELCOME BACK</p>
          <h1>กลับมา<br />ต่อเรื่องราว<br /><span className="serif-accent">ของคุณ</span></h1>
          <p>พื้นที่สมาชิกของคุณพร้อมแล้ว เข้าสู่ระบบเพื่อไปต่อ</p>
        </div>
        <div className="aside-footer"><span>DIT205 · MEMBER PORTAL</span><span>01 — 03</span></div>
        <span className="aside-orbit" aria-hidden="true" />
      </aside>
      <section className="auth-main">
        <Link className="back-link" href="/">← กลับหน้าแรก</Link>
        <div className="auth-panel">
          <p className="eyebrow">MEMBER ACCESS</p>
          <h2>เข้าสู่ระบบ<span className="heading-period">.</span></h2>
          <p className="auth-subtitle">กรอกข้อมูลเพื่อเข้าสู่พื้นที่สมาชิก</p>
          <AuthForm mode="login" />
          <p className="auth-switch">ยังไม่มีบัญชี? <Link href="/register">สมัครสมาชิก <span aria-hidden="true">↗</span></Link></p>
        </div>
        <p className="auth-legal">การเข้าสู่ระบบแสดงว่าคุณยอมรับเงื่อนไขการใช้งาน</p>
      </section>
    </main>
  );
}
