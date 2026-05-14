"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import API from "../../../lib/api";
import { Vendor } from "../../../types";
import { useRouter } from "next/navigation";

export default function CreatePayout() {
  const Router = useRouter(); 
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [form, setForm] = useState({
    vendor_id: "",
    amount: "",
    mode: "UPI",
  });
  const [role, setRole] = useState<string | null>(null);

useEffect(() => {
  setRole(localStorage.getItem("role"));
}, []);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get("/vendors");
    setVendors(res.data);
  };

  const create = async () => {
  const amountNum = Number(form.amount);

  if (!form.vendor_id || amountNum <= 0) {
    return alert("Amount must be greater than 0 and vendor required");
  }

  try {
    await API.post("/payouts", {
      ...form,
      amount: amountNum,
    });

    // ✅ CLEAR FORM
    setForm({
      vendor_id: "",
      amount: "",
      mode: "UPI",
    });

    // ✅ REDIRECT
    Router.push("/payouts");

  } catch (err: any) {
    alert(err.response?.data?.msg || "Error");
  }
};

  return (
    <>
      <Navbar />
      <div className="p-6 flex justify-center">
        <div className="bg-white p-6 rounded shadow w-96 space-y-4">
          <h2 className="text-xl font-semibold">Create Payout</h2>

          <select
            onChange={(e) => setForm({ ...form, vendor_id: e.target.value })}
          >
            <option value="">Select Vendor</option>
            {vendors.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <select onChange={(e) => setForm({ ...form, mode: e.target.value })}>
            <option>UPI</option>
            <option>IMPS</option>
            <option>NEFT</option>
          </select>

          {role === "OPS" && (
            <button
              className="bg-green-500 text-white w-full hover:bg-green-600"
              onClick={create}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </>
  );
}
