"use client";

export default function SystemOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

      <div className="bg-slate-900 rounded-xl p-6">
        <h3 className="text-slate-400">CPU Usage</h3>
        <p className="text-3xl font-bold text-cyan-400 mt-2">32%</p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h3 className="text-slate-400">Memory</h3>
        <p className="text-3xl font-bold text-yellow-400 mt-2">48%</p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h3 className="text-slate-400">Network</h3>
        <p className="text-3xl font-bold text-green-400 mt-2">1.2 GB/s</p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h3 className="text-slate-400">Health</h3>
        <p className="text-3xl font-bold text-green-500 mt-2">98%</p>
      </div>

    </div>
  );
}