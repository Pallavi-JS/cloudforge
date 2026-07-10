
"use client";

import { useEffect, useState } from "react";

export default function DeploymentPlannerPage() {
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    generatePlan();
  }, []);

  const generatePlan = async () => {
    const res = await fetch("/api/server");
    const servers = await res.json();

    if (!Array.isArray(servers) || servers.length === 0) {
      return;
    }

    const sorted = [...servers].sort(
      (a, b) => b.healthScore - a.healthScore
    );

    const best = sorted[0];

    let risk = "LOW";

    if (best.healthScore < 80) risk = "MEDIUM";
    if (best.healthScore < 60) risk = "HIGH";

    setPlan({
      application: "CloudForge Application",
      server: best.name,
      cpu: best.cpuUsage,
      memory: best.memoryUsage,
      health: best.healthScore,
      response: best.responseTime,
      risk,
      recommendation:
        risk === "LOW"
          ? "Proceed with deployment."
          : risk === "MEDIUM"
          ? "Deploy with monitoring enabled."
          : "Deployment not recommended.",
    });
  };

  if (!plan)
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </main>
    );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        📋 AI Deployment Planner
      </h1>

      <div className="bg-slate-900 rounded-xl p-8 space-y-6">

        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            Application
          </h2>
          <p>{plan.application}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            Recommended Server
          </h2>
          <p>{plan.server}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            Server Statistics
          </h2>

          <p>CPU Usage : {plan.cpu}%</p>
          <p>Memory Usage : {plan.memory}%</p>
          <p>Health Score : {plan.health}</p>
          <p>Response Time : {plan.response} ms</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            Estimated Downtime
          </h2>

          <p>
            {plan.risk === "LOW"
              ? "1 Minute"
              : plan.risk === "MEDIUM"
              ? "3 Minutes"
              : "Unknown"}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            Risk Level
          </h2>

          <p
            className={
              plan.risk === "LOW"
                ? "text-green-400"
                : plan.risk === "MEDIUM"
                ? "text-yellow-400"
                : "text-red-400"
            }
          >
            {plan.risk}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            AI Recommendation
          </h2>

          <p>{plan.recommendation}</p>
        </div>

      </div>
    </main>
  );
}

