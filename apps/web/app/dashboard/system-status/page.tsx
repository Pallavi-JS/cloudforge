"use client";

import { useEffect, useState } from "react";

export default function SystemStatusPage() {
  const [status, setStatus] = useState({
    cpu: 0,
    memory: 0,
    servers: 0,
    deployments: 0,
  });

  useEffect(() => {
    generateStatus();
  }, []);

  const generateStatus = () => {
    setStatus({
      cpu: Math.floor(Math.random() * 40) + 20,
      memory: Math.floor(Math.random() * 40) + 20,
      servers: 3,
      deployments: 1,
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🟢 System Status
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl">CPU Usage</h2>
          <p className="text-5xl text-cyan-400 mt-4">
            {status.cpu}%
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl">Memory Usage</h2>
          <p className="text-5xl text-yellow-400 mt-4">
            {status.memory}%
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl">Servers Online</h2>
          <p className="text-5xl text-green-400 mt-4">
            {status.servers}
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl">Deployments</h2>
          <p className="text-5xl text-cyan-400 mt-4">
            {status.deployments}
          </p>
        </div>
      </div>
    </main>
  );
}