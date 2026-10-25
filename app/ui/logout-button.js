"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (!response.ok) throw new Error("Logout request failed");
      router.replace("/login");
      router.refresh();
    } catch {
      setError("ออกจากระบบไม่สำเร็จ");
      setLoading(false);
    }
  }

  return <>{error && <span className="logout-error" role="alert">{error}</span>}<button className="button button-outline button-small" type="button" onClick={logout} disabled={loading}>{loading ? "กำลังออก..." : "ออกจากระบบ"} <span aria-hidden="true">↗</span></button></>;
}
