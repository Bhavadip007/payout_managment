"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Payout System</h1>

      <div className="flex gap-4 items-center">
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        <button onClick={() => router.push("/vendors")}>Vendors</button>
        <button onClick={() => router.push("/payouts")}>Payouts</button>

        <button
          onClick={logout}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}