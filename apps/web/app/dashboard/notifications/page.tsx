"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const msgs = [
      "🚀 Deployment completed successfully.",
      "⚠️ Server 'Web-01' CPU usage exceeded 80%.",
      "✅ AI Health Agent marked Server-2 as healthy.",
      "📦 New application has been deployed.",
      "🔔 System backup completed successfully.",
    ];

    setNotifications(msgs);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🔔 Notifications
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl">
        <div className="space-y-4">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-lg border-l-4 border-cyan-400"
            >
              {note}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}