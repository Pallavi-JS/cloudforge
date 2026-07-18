"use client";

import { useState } from "react";

export default function DiagnosisAgent() {
  const [log, setLog] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const diagnose = async () => {
    if (!log.trim()) {
      setResult("Please enter an error log first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/ai/diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ log }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.diagnosis);
      } else {
        setResult("AI diagnosis failed.");
      }
    } catch (error) {
      console.error(error);
      setResult("Unable to connect to the AI diagnosis service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🔍 AI Error Diagnosis Agent
      </h1>

      <textarea
        value={log}
        onChange={(e) => setLog(e.target.value)}
        placeholder="Paste error log here..."
        className="w-full h-48 p-4 bg-slate-900 rounded-lg border border-slate-700"
      />

      <button
        onClick={diagnose}
        disabled={loading}
        className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold"
      >
        {loading ? "🤖 AI Analyzing..." : "🔍 Diagnose Error"}
      </button>

      {result && (
        <div className="mt-8 bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            🤖 Gemini AI Diagnosis
          </h2>

          <p className="whitespace-pre-line leading-8">
            {result}
          </p>
        </div>
      )}
    </main>
  );
}