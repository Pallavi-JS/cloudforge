"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import DashboardCharts from "@/components/DashboardCharts";
import SystemOverview from "@/components/SystemOverview";
import AIInsights from "@/components/AIInsights";
import CloudMetrics from "@/components/CloudMetrics";
import DeploymentPipeline from "@/components/DeploymentPipeline";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const router = useRouter();

  const [stats, setStats] = useState({
    applications: 0,
    deployments: 0,
    servers: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <section className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8">
          Dashboard Overview
        </h1>
        <SystemOverview />
        <AIInsights />
        <CloudMetrics />
        <DeploymentPipeline />

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl">
            <div className="text-5xl">📦</div>

            <h2 className="text-xl font-semibold mt-4">
              Applications
            </h2>

            <p className="text-5xl mt-4 text-cyan-400">
              {stats.applications}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <div className="text-5xl">🚀</div>

            <h2 className="text-xl font-semibold mt-4">
              Deployments
            </h2>

            <p className="text-5xl mt-4 text-green-400">
              {stats.deployments}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <div className="text-5xl">🖥️</div>

            <h2 className="text-xl font-semibold mt-4">
              Servers
            </h2>

            <p className="text-5xl mt-4 text-yellow-400">
              {stats.servers}
            </p>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-12 bg-slate-900 p-8 rounded-xl">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="flex gap-4 flex-wrap">

            <Link
              href="/dashboard/applications"
              className="bg-cyan-500 px-6 py-3 rounded-lg"
            >
              Add Application
            </Link>

            <Link
              href="/dashboard/servers"
              className="bg-yellow-500 px-6 py-3 rounded-lg"
            >
              Add Server
            </Link>

            <Link
              href="/dashboard/deployments"
              className="bg-green-500 px-6 py-3 rounded-lg"
            >
              Create Deployment
            </Link>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="mt-12 bg-slate-900 p-8 rounded-xl">

          <h2 className="text-2xl font-bold mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-slate-300">
            <li>✅ Applications are being managed.</li>
            <li>✅ Servers are connected.</li>
            <li>✅ Deployments are active.</li>
            <li>🚀 CloudForge is running successfully.</li>
          </ul>

        </div>

        {/* Charts */}

        <div className="mt-12">

          <DashboardCharts
            applications={stats.applications}
            deployments={stats.deployments}
            servers={stats.servers}
          />
          <Footer />

        </div>

      </section>

    </main>
  );
}