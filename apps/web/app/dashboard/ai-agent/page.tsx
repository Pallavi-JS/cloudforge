"use client";

import { useEffect, useState } from "react";

export default function AIAgentPage() {
  const [servers, setServers] = useState<any[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const [selectedAgent, setSelectedAgent] =
    useState("health");

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = async () => {
    const res = await fetch("/api/server");
    const data = await res.json();

    const serverData = Array.isArray(data)
      ? data
      : [];

    setServers(serverData);
  };

  // =====================
  // HEALTH AGENT
  // =====================
  const runHealthAgent = () => {
    const advice: string[] = [];

    servers.forEach((server) => {
      if (server.cpuUsage > 80) {
        advice.push(
          `⚠️ ${server.name}: High CPU Usage (${server.cpuUsage}%).`
        );
      }

      if (server.memoryUsage > 80) {
        advice.push(
          `⚠️ ${server.name}: High Memory Usage (${server.memoryUsage}%).`
        );
      }

      if (server.healthScore < 50) {
        advice.push(
          `🔴 ${server.name}: Critical Health Score (${server.healthScore}).`
        );
      }

      if (
        server.healthScore >= 80 &&
        server.cpuUsage < 50 &&
        server.memoryUsage < 50
      ) {
        advice.push(
          `✅ ${server.name}: Healthy server.`
        );
      }
    });

    if (advice.length === 0) {
      advice.push("All servers are healthy.");
    }

    setResult(advice);
  };

  // =====================
  // DEPLOYMENT AGENT
  // =====================
  const runDeploymentAgent = () => {
    if (servers.length === 0) {
      setResult(["No servers available."]);
      return;
    }

    const bestServer = servers.reduce(
      (best, current) =>
        current.healthScore >
        best.healthScore
          ? current
          : best
    );

    setResult([
      `🚀 Recommended Server: ${bestServer.name}`,
      `Health Score: ${bestServer.healthScore}`,
      `CPU Usage: ${bestServer.cpuUsage}%`,
      `Memory Usage: ${bestServer.memoryUsage}%`,
    ]);
  };

  // =====================
  // ERROR AGENT
  // =====================
  const runErrorAgent = () => {
    const logs = [
      "Database connection failed",
      "High CPU detected",
      "Deployment timeout",
      "Memory leak suspected",
    ];

    setResult(logs);
  };

  // =====================
  // KNOWLEDGE AGENT
  // =====================
  const runKnowledgeAgent = () => {
    setResult([
      "Docker is used to package applications into containers.",
      "CPU Usage shows how busy the server is.",
      "Health Score is calculated from CPU, memory and uptime.",
      "Deployments are recommended on healthy servers only.",
    ]);
  };

  const runAgent = () => {
    if (selectedAgent === "health")
      runHealthAgent();

    if (selectedAgent === "deployment")
      runDeploymentAgent();

    if (selectedAgent === "error")
      runErrorAgent();

    if (selectedAgent === "knowledge")
      runKnowledgeAgent();
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🤖 AI Multi-Agent System
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Select Agent
        </h2>

        <select
          value={selectedAgent}
          onChange={(e) =>
            setSelectedAgent(
              e.target.value
            )
          }
          className="bg-slate-800 p-4 rounded-lg w-full mb-6"
        >
          <option value="health">
            Health Agent
          </option>

          <option value="deployment">
            Deployment Agent
          </option>

          <option value="error">
            Error Diagnosis Agent
          </option>

          <option value="knowledge">
            Knowledge Agent
          </option>
        </select>

        <button
          onClick={runAgent}
          className="bg-cyan-500 px-6 py-3 rounded-lg"
        >
          Run Agent
        </button>
      </div>

      <div className="bg-slate-900 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">
          Results
        </h2>

        <div className="space-y-4">
          {result.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-lg"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}