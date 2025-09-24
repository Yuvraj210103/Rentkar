"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import { getToken } from "../lib/auth";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "admin" | "partner";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const token = getToken();
      if (!token) {
        router.push("/");
        return;
      }
      try {
        const res = await api.get("/auth/me");
        if (role && res.data.role !== role) router.push("/");
      } catch (err) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  if (loading) return <div className="p-6">Checking authentication...</div>;
  return <>{children}</>;
}
