"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      localStorage.setItem("role", payload.role);

      router.push("/dashboard");
    } catch (e) {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow rounded w-80">
        <h2 className="mb-4 font-bold">Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mt-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white mt-3 w-full"
          onClick={login}
        >
          Login
        </button>

        {err && <p className="text-red-500 mt-2">{err}</p>}
      </div>
    </div>
  );
}