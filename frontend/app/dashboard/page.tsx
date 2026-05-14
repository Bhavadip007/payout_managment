"use client";

import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-2 gap-4">
        <div
          className="bg-white p-6 shadow cursor-pointer"
          onClick={() => router.push("/vendors")}
        >
          Vendors
        </div>

        <div
          className="bg-white p-6 shadow cursor-pointer"
          onClick={() => router.push("/payouts")}
        >
          Payouts
        </div>
      </div>
    </>
  );
}