"use client";

import LoginForm from "@/components/LoginForm";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-black">
      <div className="w-full max-w-md bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Rentkar — Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
