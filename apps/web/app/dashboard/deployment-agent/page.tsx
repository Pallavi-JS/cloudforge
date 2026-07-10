"use client";

import { useEffect, useState } from "react";

export default function DeploymentAgentPage() {
  const [bestServer, setBestServer] = useState<any>(null);

  useEffect(() => {
    getBestServer();
  }, []);

  const getBestServer = async () => {
    const res = await fetch("/api/server");
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      setBestServer(null);
      return;
    }

    const servers = data.map((server: any) => {
      const deploymentScore =
        server.healthScore -
        server.cpuUsage * 0.4 -
        server.memoryUsage * 0.3 -
        server.responseTime * 0.1;

      return {
        ...server,
        deploymentScore: Math.round(deploymentScore),
      };
    });

    servers.sort(
      (a: any, b: any) =>
        b.deploymentScore - a.deploymentScore
    );

    setBestServer(servers[0]);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🚀 Deployment Agent
      </h1>

      {!bestServer ? (
        <div className="bg-slate-900 p-8 rounded-xl">
          No servers available.
        </div>
      ) : (
        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-green-400 mb-6">
            Recommended Server
          </h2>

          <div className="space-y-4 text-xl">
            <p>
              <span className="font-bold">
                Server Name:
              </span>{" "}
              {bestServer.name}
            </p>

            <p>
              <span className="font-bold">
                IP Address:
              </span>{" "}
              {bestServer.ipAddress}
            </p>

            <p>
              <span className="font-bold">
                Health Score:
              </span>{" "}
              {bestServer.healthScore}
            </p>

            <p>
              <span className="font-bold">
                CPU Usage:
              </span>{" "}
              {bestServer.cpuUsage}%
            </p>

            <p>
              <span className="font-bold">
                Memory Usage:
              </span>{" "}
              {bestServer.memoryUsage}%
            </p>

            <p>
              <span className="font-bold">
                Response Time:
              </span>{" "}
              {bestServer.responseTime} ms
            </p>

            <p className="text-cyan-400 text-2xl font-bold">
              Deployment Score:{" "}
              {bestServer.deploymentScore}
            </p>

            <div className="mt-6 p-4 bg-slate-800 rounded-lg">
              ✅ This server is recommended because it has the
              highest deployment score considering health,
              CPU usage, memory usage and response time.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}