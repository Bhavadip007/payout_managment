"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import API from "../../lib/api";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    upi_id: "",
    bank_account: "",
    ifsc: "",
  });
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get("/vendors");
      setVendors(res.data);
    } catch {
      setError("Failed to load vendors");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    setError("");

    if (!form.name.trim()) {
      return setError("Vendor name is required");
    }

    try {
      await API.post("/vendors", form);

      // reset form
      setForm({
        name: "",
        upi_id: "",
        bank_account: "",
        ifsc: "",
      });

      load();
    } catch (err: any) {
      setError(err.response?.data?.msg || "Error adding vendor");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        {/* 🔹 FORM */}
        <div className="bg-white p-4 shadow rounded mb-4 space-y-2">
          <h2 className="text-lg font-semibold">Add Vendor</h2>

          <input
            className="w-full border p-2 rounded"
            placeholder="Vendor Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="UPI ID (optional)"
            value={form.upi_id}
            onChange={(e) => setForm({ ...form, upi_id: e.target.value })}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Bank Account (optional)"
            value={form.bank_account}
            onChange={(e) => setForm({ ...form, bank_account: e.target.value })}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="IFSC (optional)"
            value={form.ifsc}
            onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
          />

          {/* 🔹 ERROR */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
            onClick={add}
          >
            Add Vendor
          </button>
        </div>

        {/* 🔹 LIST */}
        <div className="bg-white p-4 shadow rounded space-y-2">
          <h2 className="text-lg font-semibold mb-2">Vendor List</h2>

          {loading && (
            <p className="text-gray-500 text-sm">Loading vendors...</p>
          )}

          {!loading && vendors.length === 0 && (
            <p className="text-gray-500 text-sm">No vendors found</p>
          )}

          {!loading && vendors.map((v: any) => (
            <div key={v._id} className="border p-2 rounded text-sm">
              <p className="font-medium">{v.name}</p>

              <p className="text-gray-500">UPI: {v.upi_id || "-"}</p>

              <p className="text-gray-500">A/C: {v.bank_account || "-"}</p>

              <p className="text-gray-500">IFSC: {v.ifsc || "-"}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
