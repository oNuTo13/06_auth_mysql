import Link from "next/link";

const highlights = [
  {
    number: "01",
    title: "สมัครสมาชิก",
    description: "สร้างบัญชีด้วยอีเมลและรหัสผ่านที่ปลอดภัย",
  },
  {
    number: "02",
    title: "เข้าสู่ระบบ",
    description: "ยืนยันตัวตนด้วย session cookie แบบ httpOnly",
  },
  {
    number: "03",
    title: "พื้นที่สมาชิก",
    description: "หน้า Dashboard ส่วนตัวที่เข้าถึงได้หลัง Login",
  },
];

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="DIT205 หน้าแรก">
          <span className="brand-mark">D</span>
          <span>DIT205<span className="brand-divider">/</span>PORTAL</span>
        </Link>
        <nav className="top-nav" aria-label="เมนูหลัก">
          <Link className="nav-link" href="/login">เข้าสู่ระบบ</Link>
          <Link className="button button-small button-dark" href="/register">เริ่มต้นใช้งาน <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> DIT205 · WEB APPLICATION</p>
          <h1>พื้นที่ของคุณ<br />เริ่มต้น<span className="serif-accent">ที่นี่</span></h1>
          <p className="hero-description">
            ระบบสมาชิกที่ออกแบบให้เรียบง่าย ปลอดภัย และพร้อมเติบโตไปกับทุกไอเดียของคุณ
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/register">สร้างบัญชีฟรี <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" href="/login">มีบัญชีอยู่แล้ว <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-note"><span className="note-line" /> ออกแบบเพื่อการเรียนรู้และการใช้งานจริง</div>
        </div>

        <div className="hero-art" aria-label="ภาพประกอบพื้นที่สมาชิก">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-sun" />
          <div className="art-card">
            <div className="art-card-top"><span>MEMBER SPACE</span><span className="art-card-dots">•••</span></div>
            <div className="art-avatar">D</div>
            <div className="art-name">ยินดีต้อนรับ</div>
            <div className="art-caption">Your next chapter starts here.</div>
            <div className="art-progress"><span /></div>
            <div className="art-card-bottom"><span>สมาชิก DIT205</span><span>01 / 03</span></div>
          </div>
          <span className="art-label label-top">LEARN · BUILD · GROW</span>
          <span className="art-label label-bottom">MEMBER NO. 6706073</span>
          <span className="art-star star-one">✳</span>
          <span className="art-star star-two">✳</span>
        </div>
      </section>

      <section className="student-strip" aria-label="ข้อมูลนักศึกษา">
        <div className="student-title">จัดทำโดย</div>
        <div className="student-name">ธนิสร บุญสิริ</div>
        <div className="student-id">STUDENT ID <strong>6706073</strong></div>
        <div className="student-course">DIT205 <span>·</span> NEXT.JS &amp; DATABASE</div>
      </section>

      <section className="features">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR SPACE, YOUR PACE</p>
            <h2>ทุกอย่างที่จำเป็น<br />ใน<span className="serif-accent">ที่เดียว</span></h2>
          </div>
          <p className="section-intro">ประสบการณ์สมาชิกครบวงจร ตั้งแต่ก้าวแรกจนถึงพื้นที่ส่วนตัวของคุณ</p>
        </div>
        <div className="feature-grid">
          {highlights.map((item) => (
            <article className="feature-card" key={item.number}>
              <span className="feature-number">{item.number}</span>
              <div className="feature-icon" aria-hidden="true">{item.number === "01" ? "＋" : item.number === "02" ? "↗" : "⌂"}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="feature-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <Link className="brand brand-footer" href="/"><span className="brand-mark">D</span><span>DIT205<span className="brand-divider">/</span>PORTAL</span></Link>
        <span>สร้างด้วย Next.js · MySQL · TiDB Cloud</span>
        <span>© 2026 ธนิสร บุญสิริ</span>
      </footer>
    </main>
  );
}
