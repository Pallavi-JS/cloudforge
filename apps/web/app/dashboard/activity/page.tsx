"use client";

import { useState } from "react";

export default function ActivityPage() {
  const [activities] = useState([
    {
      id: 1,
      time: "11:30 AM",
      action: "🖥️ New Server Added",
      description:
        "Production Server was added successfully.",
    },
    {
      id: 2,
      time: "11:35 AM",
      action: "📦 Application Created",
      description:
        "Inventory Management App was created.",
    },
    {
      id: 3,
      time: "11:40 AM",
      action: "🚀 Deployment Started",
      description:
        "Deployment initiated on Production Server.",
    },
    {
      id: 4,
      time: "11:42 AM",
      action: "✅ Deployment Completed",
      description:
        "Application deployed successfully.",
    },
    {
      id: 5,
      time: "11:50 AM",
      action: "🔍 Error Diagnosed",
      description:
        "High CPU usage issue detected and analyzed.",
    },
    {
      id: 6,
      time: "12:00 PM",
      action: "🤖 AI Recommendation",
      description:
        "AI Health Agent recommended server optimization.",
    },
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        📈 Activity Timeline
      </h1>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-slate-900 p-6 rounded-xl border-l-4 border-cyan-500"
          >
            <p className="text-cyan-400 font-bold">
              {activity.time}
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {activity.action}
            </h2>

            <p className="text-slate-400 mt-3">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}