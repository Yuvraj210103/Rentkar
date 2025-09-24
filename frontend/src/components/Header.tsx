"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearToken, getToken } from "../lib/auth";
import { setAuthToken } from "../lib/api";

export default function Header() {
  const router = useRouter();

  const logout = () => {
    clearToken();
    setAuthToken();
    router.push("/");
    location.reload();
  };

  return (
    <header className="h-16 bg-white shadow flex items-center px-6 text-black">
      <div className="flex-1">
        <Link href="/" className="font-bold text-lg">
          Rentkar
        </Link>
      </div>
      <nav className="space-x-4">
        {getToken() ? (
          <button
            onClick={logout}
            className="ml-4 text-sm bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
          >
            Logout
          </button>
        ) : null}
      </nav>
    </header>
  );
}
