/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import api from "../lib/api";

export default function PartnerOrderList({
  orders,
  onAction,
}: {
  orders: any[];
  onAction?: () => void;
}) {
  const markPicked = async (id: string) => {
    await api.put(`/orders/${id}/status`, { status: "picked" });
    onAction && onAction();
  };
  const markDelivered = async (id: string) => {
    await api.put(`/orders/${id}/status`, { status: "delivered" });
    onAction && onAction();
  };

  return (
    <div className="bg-gray-800 rounded shadow p-4">
      <h3 className="font-medium mb-2">Assigned Orders</h3>
      <ul>
        {orders.map((o) => (
          <li
            key={o._id}
            className="border-b py-3 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{o.customerName}</div>
              <div className="text-sm text-slate-500">{o.address}</div>
              <div className="text-sm">Status: {o.status}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => markPicked(o._id)}
                className="px-3 py-1 rounded bg-amber-500 text-white"
              >
                Picked
              </button>
              <button
                onClick={() => markDelivered(o._id)}
                className="px-3 py-1 rounded bg-green-600 text-white"
              >
                Delivered
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
