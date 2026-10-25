import "./globals.css";

export const metadata = {
  title: "DIT205 | Member Portal",
  description: "ระบบสมาชิก DIT205 สมัครสมาชิก เข้าสู่ระบบ และจัดการโปรไฟล์",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
