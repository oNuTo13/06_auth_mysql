import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "../../lib/auth";
import LogoutButton from "../ui/logout-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="dashboard-shell">
      <header className="topbar dashboard-topbar">
        <Link className="brand" href="/"><span className="brand-mark">D</span><span>DIT205<span className="brand-divider">/</span>PORTAL</span></Link>
        <div className="dashboard-nav"><span className="member-chip"><span className="status-dot" /> MEMBER SPACE</span><LogoutButton /></div>
      </header>
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow"><span className="status-dot" /> YOUR PERSONAL SPACE</p>
          <h1>สวัสดี,<br /><span className="serif-accent">{user.fullname}</span></h1>
          <p className="hero-description">ยินดีต้อนรับกลับมา นี่คือพื้นที่ของคุณ</p>
        </div>
        <div className="dashboard-emblem"><span>DIT</span><strong>205</strong><small>MEMBER<br />PORTAL</small></div>
      </section>
      <section className="profile-card">
        <div className="profile-card-heading"><div><p className="eyebrow">ACCOUNT OVERVIEW</p><h2>ข้อมูลสมาชิก</h2></div><span className="profile-number">01 / PROFILE</span></div>
        <div className="profile-details">
          <div className="profile-avatar">{user.fullname.charAt(0).toUpperCase()}</div>
          <div className="profile-info"><span>ชื่อ-นามสกุล</span><strong>{user.fullname}</strong></div>
          <div className="profile-info"><span>อีเมล</span><strong>{user.email}</strong></div>
          <div className="verified-badge"><span>✓</span> สมาชิก</div>
        </div>
      </section>
      <section className="dashboard-bottom">
        <div className="dashboard-message"><span className="message-star">✳</span><div><p className="eyebrow">KEEP MOVING FORWARD</p><h2>พื้นที่นี้เป็นของคุณ</h2><p>ทุกการเริ่มต้นที่ดี เริ่มจากก้าวเล็ก ๆ วันนี้</p></div></div>
        <div className="student-card"><span className="student-card-label">COURSE PROJECT</span><strong>DIT205</strong><span>ธนิสร บุญสิริ · 6706073</span></div>
      </section>
      <footer className="footer dashboard-footer"><Link className="brand brand-footer" href="/"><span className="brand-mark">D</span><span>DIT205<span className="brand-divider">/</span>PORTAL</span></Link><span>ระบบสมาชิก DIT205</span><span>© 2026 ธนิสร บุญสิริ</span></footer>
    </main>
  );
}
