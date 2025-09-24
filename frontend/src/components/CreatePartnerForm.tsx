"use client";
import { useState } from "react";
import api from "../lib/api";

export default function CreatePartnerForm({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setMessage("❌ Please fill all fields");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "partner",
      });
      setMessage("✅ Partner created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      onCreated && onCreated();
    } catch (err) {
      setMessage("❌ Failed to create partner");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded shadow p-4">
      <h3 className="font-medium mb-2">Create Partner</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Partner name"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        {loading ? "Creating..." : "Create Partner"}
      </button>
      {message && <div className="mt-2 text-sm">{message}</div>}
    </div>
  );
}
