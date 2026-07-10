"use client";

import jsPDF from "jspdf";
import ReportSummary from "@/components/ReportSummary";

export default function ReportsPage() {
  const generateReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("CloudForge Deployment Report", 20, 20);

    doc.setFontSize(14);
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      40
    );

    doc.text(
      "Applications: 5",
      20,
      60
    );

    doc.text(
      "Servers: 3",
      20,
      75
    );

    doc.text(
      "Deployments: 8",
      20,
      90
    );

    doc.text(
      "System Status: Healthy",
      20,
      105
    );

    doc.text(
      "AI Recommendation: Deployment Successful",
      20,
      120
    );

    doc.save(
      "cloudforge-report.pdf"
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        📄 Reports
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">
          Generate Deployment Report
        </h2>

        <button
          onClick={generateReport}
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          Download PDF Report
        </button>
      </div>
      <ReportSummary />
    </main>
  );
}