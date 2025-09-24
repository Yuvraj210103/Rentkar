"use client";
import { useState } from "react";
import api from "../lib/api";

export default function CreateOrderForm({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const submit = async () => {
    try {
      await api.post("/orders", {
        customerName: name,
        address,
        lat: lat ? Number(lat) : undefined,
        lng: lng ? Number(lng) : undefined,
      });
      setName("");
      setAddress("");
      setLat("");
      setLng("");
      onCreated && onCreated();
    } catch (err) {
      console.error(err);
      alert("Failed to create");
    }
  };

  return (
    <div className="bg-gray-800 rounded shadow p-4">
      <h3 className="font-medium mb-2">Create Order</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Customer name"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full p-2 border rounded mb-2"
      />
      <div className="flex gap-2 mb-2">
        <input
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="lat (optional)"
          className="w-1/2 p-2 border rounded"
        />
        <input
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="lng (optional)"
          className="w-1/2 p-2 border rounded"
        />
      </div>
      <button
        onClick={submit}
        className="px-4 py-2 rounded bg-green-600 text-white cursor-pointer"
      >
        Create
      </button>
    </div>
  );
}
