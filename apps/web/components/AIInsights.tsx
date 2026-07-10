
"use client";

import { useEffect, useState } from "react";

interface Server {
  id: string;
  name: string;
  cpuUsage: number;
  memoryUsage: number;
  healthScore: number;
}

export default function AIInsights() {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    fetch("/api/server")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServers(data);
        }
      });
  }, []);

  const healthyServers = servers.filter(
    (s) => s.healthScore >= 80
  ).length;

  const criticalServers = servers.filter(
    (s) => s.healthScore < 50
  ).length;

  const bestServer =
    servers.length > 0
      ? [...servers].sort(
          (a, b) => b.healthScore - a.healthScore
        )[0]
      : null;

  return (
    <div className="bg-slate-900 rounded-xl p-8 mb-10">

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        🤖 AI Infrastructure Insights
      </h2>

      <div className="space-y-4">

        <div className="bg-slate-800 rounded-lg p-4">
          🟢 Healthy Servers: {healthyServers}
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          🔴 Critical Servers: {criticalServers}
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          🚀 Best Deployment Target:
          <span className="text-green-400 font-bold">
            {" "}
            {bestServer ? bestServer.name : "No Server"}
          </span>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          📊 Total Servers: {servers.length}
        </div>

      </div>

    </div>
  );
}

