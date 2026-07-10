"use client";

import { useState } from "react";

export default function DiagnosisAgent() {
  const [log, setLog] = useState("");
  const [result, setResult] = useState("");

  const diagnose = () => {
    const text = log.toLowerCase();

    if (text.includes("database")) {
      setResult(
        "Database server may be down. Restart database service."
      );
    } else if (text.includes("memory")) {
      setResult(
        "High memory usage detected. Increase RAM or restart services."
      );
    } else if (text.includes("cpu")) {
      setResult(
        "CPU overload detected. Scale the application or restart server."
      );
    } else {
      setResult(
        "Unknown issue. Please check logs manually."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🔍 Error Diagnosis Agent
      </h1>

      <textarea
        value={log}
        onChange={(e) => setLog(e.target.value)}
        placeholder="Paste error log..."
        className="w-full h-40 p-4 bg-slate-900 rounded-lg"
      />

      <button
        onClick={diagnose}
        className="mt-6 bg-cyan-500 px-6 py-3 rounded-lg"
      >
        Diagnose
      </button>

      {result && (
        <div className="mt-8 bg-slate-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            AI Suggestion
          </h2>

          <p>{result}</p>
        </div>
      )}
    </main>
  );
}