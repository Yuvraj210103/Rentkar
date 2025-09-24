/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
import api from "../../lib/api";
import MapView from "../../components/MapView";

export default function PartnerPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [oRes, meRes] = await Promise.all([
        api.get("/orders"),
        api.get("/auth/me"),
      ]);
      setOrders(oRes.data);
      setMe(meRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const myAssigned = useMemo(
    () => orders.filter((o) => o.partner && me && o.partner._id === me._id),
    [orders, me]
  );

  const markers = myAssigned.map((o) => ({
    id: o._id,
    lat: o.lat || 19.076,
    lng: o.lng || 72.8777,
    title: o.customerName,
  }));

  const changeStatus = async (id: string, status: string) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAvailability = async () => {
    try {
      await api.put(`/partners/${me._id}/availability`, {
        availability: !me.availability,
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (!me) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Partner Dashboard — {me.name}</h2>
        <div>
          <button
            onClick={toggleAvailability}
            className="px-3 py-1 rounded bg-blue-600 text-white cursor-pointer"
          >
            {me.availability ? "Go Unavailable" : "Go Available"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-gray-800 rounded shadow p-4">
            <h3 className="font-medium mb-2">My Assigned Orders</h3>
            <ul>
              {myAssigned.map((o) => (
                <li key={o._id} className="border-b py-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{o.customerName}</div>
                      <div className="text-sm text-slate-500">{o.address}</div>
                      <div className="text-sm text-slate-500 capitalize">
                        Status:{" "}
                        <span className="font-bold text-white/50">
                          {o.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 space-x-2">
                      {o.status !== "picked" && o.status !== "delivered" && (
                        <button
                          onClick={() => changeStatus(o._id, "picked")}
                          className="cursor-pointer px-3 py-1 rounded bg-amber-500 text-white"
                        >
                          Mark Picked
                        </button>
                      )}
                      {o.status === "picked" && (
                        <button
                          onClick={() => changeStatus(o._id, "delivered")}
                          className="cursor-pointer px-3 py-1 rounded bg-green-600 text-white"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-gray-800 rounded shadow p-4">
            <h3 className="font-medium mb-2">Map</h3>
            <MapView markers={markers} />
          </div>
        </div>
      </div>
    </div>
  );
}
