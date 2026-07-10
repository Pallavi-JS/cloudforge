"use client";

import { useEffect, useState } from "react";

export default function DeploymentAgent() {
  const [bestServer, setBestServer] = useState<any>(null);

  useEffect(() => {
    fetch("/api/server")
      .then((res) => res.json())
      .then((servers) => {
        if (!servers.length) return;

        const sorted = [...servers].sort(
          (a, b) => b.healthScore - a.healthScore
        );

        setBestServer(sorted[0]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🚀 Smart Deployment Agent
      </h1>

      {bestServer ? (
        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-green-400">
            Recommended Server:
          </h2>

          <p className="text-4xl mt-5">
            {bestServer.name}
          </p>

          <div className="mt-6 space-y-3">
            <p>CPU Usage: {bestServer.cpuUsage}%</p>
            <p>Memory Usage: {bestServer.memoryUsage}%</p>
            <p>Health Score: {bestServer.healthScore}</p>
          </div>

          <div className="mt-8 bg-slate-800 p-5 rounded-lg">
            ✅ This server has the best health score and is recommended for deployment.
          </div>
        </div>
      ) : (
        <p>No servers found.</p>
      )}
    </main>
  );
}