
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white p-6 border-r border-slate-800">

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        ☁️ CloudForge
      </h1>

      <nav className="space-y-2">

        <Link href="/dashboard" className="block p-3 rounded-lg hover:bg-slate-800">
          📊 Dashboard
        </Link>

        <Link href="/dashboard/applications" className="block p-3 rounded-lg hover:bg-slate-800">
          📦 Applications
        </Link>

        <Link href="/dashboard/servers" className="block p-3 rounded-lg hover:bg-slate-800">
          🖥️ Servers
        </Link>

        <Link href="/dashboard/deployments" className="block p-3 rounded-lg hover:bg-slate-800">
          🚀 Deployments
        </Link>

        <hr className="border-slate-700 my-4" />

        <Link href="/dashboard/ai-agent" className="block p-3 rounded-lg hover:bg-slate-800">
          🤖 AI Health Agent
        </Link>

        <Link href="/dashboard/deployment-agent" className="block p-3 rounded-lg hover:bg-slate-800">
          🚀 Deployment Agent
        </Link>

        <Link href="/dashboard/error-agent" className="block p-3 rounded-lg hover:bg-slate-800">
          🔍 Error Diagnosis
        </Link>

        <Link href="/dashboard/knowledge-agent" className="block p-3 rounded-lg hover:bg-slate-800">
          📚 Knowledge Agent
        </Link>

        <Link href="/dashboard/deployment-simulator" className="block p-3 rounded-lg hover:bg-slate-800">
          ⚙️ Deployment Simulator
        </Link>

        <Link href="/dashboard/deployment-planner" className="block p-3 rounded-lg hover:bg-slate-800">
          📋 Deployment Planner
        </Link>

        <hr className="border-slate-700 my-4" />

        <Link href="/dashboard/notifications" className="block p-3 rounded-lg hover:bg-slate-800">
          🔔 Notifications
        </Link>

        <Link href="/dashboard/activity" className="block p-3 rounded-lg hover:bg-slate-800">
          📈 Activity Timeline
        </Link>

        <Link href="/dashboard/reports" className="block p-3 rounded-lg hover:bg-slate-800">
          📄 Reports
        </Link>

        <Link href="/dashboard/system-status" className="block p-3 rounded-lg hover:bg-slate-800">
          🟢 System Status
        </Link>
        <Link href="/dashboard/architecture" className="block p-3 rounded-lg hover:bg-slate-800">
          🏗 Architecture
        </Link>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 p-3 rounded-lg"
        >
          Logout
        </button>

      </nav>
    </aside>
  );
}

