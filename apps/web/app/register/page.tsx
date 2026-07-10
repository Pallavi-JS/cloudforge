"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg mb-6 bg-slate-800 text-white"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-cyan-500 p-3 rounded-lg text-white font-semibold"
        >
          Register
        </button>
      </div>
    </main>
  );
}