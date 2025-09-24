"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api, { setAuthToken } from "../lib/api";
import { saveToken } from "../lib/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      saveToken(token);
      setAuthToken(token);
      const role = res.data.user.role;
      if (role === "admin") router.push("/admin");
      else router.push("/partner");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <label className="block mb-2 text-sm">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="w-full py-2 rounded bg-blue-600 text-white cursor-pointer"
      >
        Sign In
      </button>
      <div className="text-sm text-slate-500 mt-3">
        Demo: admin@rentkar.com - Admin123!
      </div>
    </div>
  );
}
