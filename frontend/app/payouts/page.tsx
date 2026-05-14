"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import API from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Payouts() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("");
  const [vendor, setVendor] = useState("");
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const router = useRouter();

  // 🔹 Load payouts with filters
  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get("/payouts", {
        params: { status, vendor },
      });
      setList(res.data);
    } catch {
      console.log("Error loading payouts");
    }
    setLoading(false);
  };
  // 🔹 Load vendors for filter
  const loadVendors = async () => {
    const res = await API.get("/vendors");
    setVendors(res.data);
  };

  useEffect(() => {
    load();
  }, [status, vendor]);

  useEffect(() => {
    loadVendors();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        {/* 🔹 Create Button */}
        {role === "OPS" && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
            onClick={() => router.push("/payouts/create")}
          >
            Create
          </button>
        )}

        {/* 🔹 Filters */}
        <div className="flex gap-2 mb-4">
          <select
            className="border p-2 w-1/2"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Draft</option>
            <option>Submitted</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <select
            className="border p-2 w-1/2"
            onChange={(e) => setVendor(e.target.value)}
          >
            <option value="">All Vendors</option>
            {vendors.map((v: any) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 List */}
        <div className="bg-white p-4 shadow rounded space-y-2">

          {loading && (
    <p className="text-gray-500 text-sm">Loading payouts...</p>
  )}

          {!loading && list.length === 0 && (
    <p className="text-gray-500 text-sm">No payouts found</p>
  )}

          {!loading && list.map((p: any) => (
            <div
              key={p._id}
              className="border p-2 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => router.push(`/payouts/${p._id}`)}
            >
              <p className="font-medium">₹{p.amount}</p>

              <p className="text-sm text-gray-600">Status: {p.status}</p>

              <p className="text-xs text-gray-400">
                {new Date(p.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
