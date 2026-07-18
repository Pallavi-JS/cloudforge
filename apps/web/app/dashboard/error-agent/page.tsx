"use client";

import { useState } from "react";

export default function ErrorAgentPage() {
  const [log, setLog] = useState(
    "Error: Connection refused to PostgreSQL database.\nThe application cannot connect to the database server."
  );

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeLog = async () => {
    if (!log.trim()) {
      alert("Please enter an error log.");
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
        body: JSON.stringify({
          log,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI diagnosis failed");
      }

      setResult(data.diagnosis);
    } catch (error) {
      setResult(
        `❌ AI Diagnosis Failed\n\n${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🔍 AI Error Diagnosis Agent
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">
          Paste Error Logs
        </h2>

        <textarea
          rows={10}
          value={log}
          onChange={(e) => setLog(e.target.value)}
          placeholder="Paste your error log here..."
          className="w-full p-4 rounded-lg bg-slate-800 mb-6"
        />

        <button
          onClick={analyzeLog}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 px-6 py-3 rounded-lg font-bold"
        >
          {loading ? "🤖 AI Analyzing..." : "🔍 Diagnose Error"}
        </button>

        {result && (
          <div className="mt-8 bg-slate-800 p-6 rounded-lg whitespace-pre-line">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">
              🤖 Gemini AI Diagnosis
            </h2>

            {result}
          </div>
        )}
      </div>
    </main>
  );
}