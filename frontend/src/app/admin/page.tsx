/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import AdminOrderList from "../../components/AdminOrderList";
import CreateOrderForm from "@/components/CreateOrderForm";
import CreatePartnerForm from "@/components/CreatePartnerForm";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const [oRes, pRes] = await Promise.all([
        api.get("/orders"),
        api.get("/partners"),
      ]);
      setOrders(oRes.data);
      setPartners(pRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch admin data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CreateOrderForm onCreated={fetchData} />
          <CreatePartnerForm onCreated={fetchData} />
          <div className="bg-gray-800 rounded shadow p-4">
            <h3 className="font-medium mb-2">Delivery Partners</h3>
            <ul>
              {partners.map((p) => (
                <li key={p._id} className="flex justify-between border-b py-2">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-slate-500">{p.email}</div>
                  </div>
                  <div className="text-sm">
                    {p.availability ? "Available" : "Unavailable"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <AdminOrderList
            orders={orders}
            partners={partners}
            onRefresh={fetchData}
          />
        </div>
      </div>
    </div>
  );
}
