"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const isRegister = mode === "register";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (isRegister) {
      payload.fullname = formData.get("fullname");
      payload.confirmPassword = formData.get("confirmPassword");
    }

    try {
      const response = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "ไม่สามารถดำเนินการได้ กรุณาลองอีกครั้ง");
        return;
      }

      router.push(isRegister ? "/login?registered=1" : "/dashboard");
      router.refresh();
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {isRegister && (
        <label className="form-field">
          <span>ชื่อ-นามสกุล</span>
          <input name="fullname" type="text" placeholder="เช่น ธนิสร บุญสิริ" autoComplete="name" maxLength={255} required />
        </label>
      )}
      <label className="form-field">
        <span>อีเมล</span>
        <input name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={255} required />
      </label>
      <label className="form-field">
        <span>รหัสผ่าน</span>
        <input name="password" type="password" placeholder={isRegister ? "อย่างน้อย 8 ตัวอักษร" : "กรอกรหัสผ่านของคุณ"} autoComplete={isRegister ? "new-password" : "current-password"} minLength={8} required />
      </label>
      {isRegister && (
        <label className="form-field">
          <span>ยืนยันรหัสผ่าน</span>
          <input name="confirmPassword" type="password" placeholder="กรอกรหัสผ่านอีกครั้ง" autoComplete="new-password" minLength={8} required />
        </label>
      )}
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-primary submit-button" type="submit" disabled={loading}>
        {loading ? "กำลังดำเนินการ..." : isRegister ? "สร้างบัญชี" : "เข้าสู่ระบบ"}
        {!loading && <span aria-hidden="true">↗</span>}
      </button>
      <p className="form-footnote"><span className="lock-icon" aria-hidden="true">⌑</span> ข้อมูลของคุณถูกเข้ารหัสและจัดเก็บอย่างปลอดภัย</p>
    </form>
  );
}
