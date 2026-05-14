"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import Navbar from "../../../components/Navbar";
import API from "../../../lib/api";

type Audit = {
  action: string;
  user_id?: {
    email: string;
  };
};

type ResponseType = {
  payout: {
    _id: string;
    amount: number;
    status: string;
    decision_reason?: string;
  };
  audits: Audit[];
};

export default function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [data, setData] = useState<ResponseType | null>(null);

  const [role, setRole] = useState<string | null>(null);

useEffect(() => {
  setRole(localStorage.getItem("role"));
}, []);

  const load = async () => {
    try {
      const res = await API.get(`/payouts/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load payout");
    }
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  if (!data) {
    return (
      <>
        <Navbar />
        <p className="p-6">Loading...</p>
      </>
    );
  }

  const btn = "px-3 py-1 text-white rounded";

  return (
    <>
      <Navbar />

      <div className="p-6 flex justify-center">
        <div className="bg-white p-6 rounded shadow w-96 space-y-4">
          <h2 className="text-2xl font-bold">₹{data.payout.amount}</h2>

          <p>
            Status: <span className="font-semibold">{data.payout.status}</span>
          </p>

          <div className="flex gap-2">
            {/* OPS → Submit only */}
            {role === "OPS" && data.payout.status === "Draft" && (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={async () => {
                  await API.post(`/payouts/${id}/submit`);
                  load();
                }}
              >
                Submit
              </button>
            )}

            {/* FINANCE → Approve / Reject only */}
            {role === "FINANCE" && data.payout.status === "Submitted" && (
              <>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={async () => {
                    await API.post(`/payouts/${id}/approve`);
                    load();
                  }}
                >
                  Approve
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={async () => {
                    const reason = prompt("Enter reason");
                    if (!reason) return;

                    await API.post(`/payouts/${id}/reject`, { reason });
                    load();
                  }}
                >
                  Reject
                </button>
              </>
            )}
          </div>

          {/* ✅ SAFE AUDIT RENDER */}
          <div>
            <h3 className="font-semibold mb-2">Audit Trail</h3>

            {data.audits?.length ? (
              data.audits.map((a, i) => (
                <div key={i} className="text-sm border-b py-2">
                  <p>
                    <span className="font-medium">{a.action}</span> by{" "}
                    {a.user_id?.email || "Unknown"}
                  </p>

                  {/* ✅ SHOW REASON ONLY FOR REJECTED */}
                  {a.action === "REJECTED" && data.payout.decision_reason && (
                    <p className="text-red-500 text-sm mt-1">
                      Reason: {data.payout.decision_reason}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No audit history</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
