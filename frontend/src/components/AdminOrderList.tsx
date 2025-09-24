/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import api from "../lib/api";

export default function AdminOrderList({
  orders,
  partners,
  onRefresh,
}: {
  orders: any[];
  partners: any[];
  onRefresh?: () => void;
}) {
  const [assigning, setAssigning] = useState<string | null>(null);

  const assign = async (orderId: string, partnerId: string) => {
    try {
      setAssigning(orderId);
      await api.put(`/orders/${orderId}/assign`, { partnerId });
      onRefresh && onRefresh();
    } catch (err) {
      console.error(err);
      alert("Assign failed");
    } finally {
      setAssigning(null);
    }
  };

  return (
    <div className="bg-gray-800 rounded shadow p-4">
      <h3 className="font-medium mb-2">Orders</h3>
      <ul>
        {orders.map((o) => (
          <li key={o._id} className="border-b py-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{o.customerName}</div>
                <div className="text-sm text-slate-500">{o.address}</div>
                <div className="text-sm text-slate-500 capitalize">
                  Status: {o.status}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <select
                  defaultValue=""
                  onChange={(e) => assign(o._id, e.target.value)}
                  className="p-2 border rounded"
                  disabled={o.partner ? o.partner.name : "-"}
                >
                  <option value={o.partner.name}>Assign to</option>
                  {partners.map((p) => (
                    <option
                      selected={p.name === o.partner ? o.partner.name : "-"}
                      key={p._id}
                      value={p._id}
                    >
                      {p.name} ({p.availability ? "A" : "U"})
                    </option>
                  ))}
                </select>
                <div className="text-sm ">
                  {o.partner ? o.partner.name : "-"}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
