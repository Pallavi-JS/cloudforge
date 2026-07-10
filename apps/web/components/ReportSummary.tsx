
"use client";

export default function ReportSummary() {
  return (
    <div className="bg-slate-900 rounded-xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Deployment Summary
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-800 p-5 rounded-lg">
          <h3 className="font-bold mb-2">Applications</h3>
          <p>Managed Successfully</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-lg">
          <h3 className="font-bold mb-2">Deployments</h3>
          <p>Completed Successfully</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-lg">
          <h3 className="font-bold mb-2">Infrastructure</h3>
          <p>Healthy</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-lg">
          <h3 className="font-bold mb-2">AI Recommendation</h3>
          <p>Deployment Safe</p>
        </div>

      </div>

    </div>
  );
}

