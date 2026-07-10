"use client";

import { useState } from "react";

export default function KnowledgeAgent() {
  const [question, setQuestion] =
    useState("");
  const [answer, setAnswer] =
    useState("");

  const ask = () => {
    const q = question.toLowerCase();

    if (q.includes("docker")) {
      setAnswer(
        "Docker is a containerization platform used to package applications and their dependencies."
      );
    } else if (
      q.includes("kubernetes")
    ) {
      setAnswer(
        "Kubernetes is a container orchestration platform."
      );
    } else if (q.includes("ci/cd")) {
      setAnswer(
        "CI/CD stands for Continuous Integration and Continuous Deployment."
      );
    } else {
      setAnswer(
        "Sorry, I don't know that answer."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        📚 Knowledge Agent
      </h1>

      <input
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask a question..."
        className="w-full p-4 rounded-lg bg-slate-900"
      />

      <button
        onClick={ask}
        className="mt-6 bg-cyan-500 px-6 py-3 rounded-lg"
      >
        Ask
      </button>

      {answer && (
        <div className="mt-8 bg-slate-900 p-6 rounded-xl">
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}