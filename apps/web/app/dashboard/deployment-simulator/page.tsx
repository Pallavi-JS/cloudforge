"use client";

import { useState } from "react";

export default function DeploymentSimulator() {
  const [logs, setLogs] = useState<string[]>([]);
  const [deploying, setDeploying] = useState(false);

  const startDeployment = async () => {
    setDeploying(true);
    setLogs([]);

    const steps = [
      "🚀 Initializing deployment...",
      "📦 Building application...",
      "🐳 Creating container...",
      "⚙️ Configuring server...",
      "✅ Deployment successful."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) =>
        setTimeout(r, 1500)
      );

      setLogs((prev) => [
        ...prev,
        steps[i],
      ]);
    }

    setDeploying(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🚀 Deployment Simulator
      </h1>

      <button
        onClick={startDeployment}
        disabled={deploying}
        className="bg-green-500 px-6 py-3 rounded-lg"
      >
        {deploying
          ? "Deploying..."
          : "Start Deployment"}
      </button>

      <div className="mt-8 bg-slate-900 p-8 rounded-xl">
        {logs.map((log, index) => (
          <div
            key={index}
            className="mb-4"
          >
            {log}
          </div>
        ))}
      </div>
    </main>
  );
}