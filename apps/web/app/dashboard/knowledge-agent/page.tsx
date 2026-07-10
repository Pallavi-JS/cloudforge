"use client";

import { useState } from "react";

export default function KnowledgeAgentPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = () => {
    const q = question.toLowerCase();

    if (q.includes("docker")) {
      setAnswer(
        "Docker is a platform that packages applications into containers so they can run consistently on any machine."
      );
    }

    else if (q.includes("cpu")) {
      setAnswer(
        "CPU Usage represents how much processor power a server is currently using."
      );
    }

    else if (q.includes("memory")) {
      setAnswer(
        "Memory Usage indicates how much RAM is currently being consumed by running applications."
      );
    }

    else if (q.includes("load balancing")) {
      setAnswer(
        "Load Balancing distributes incoming traffic across multiple servers to improve performance and reliability."
      );
    }

    else if (q.includes("kubernetes")) {
      setAnswer(
        "Kubernetes is a container orchestration platform used to automate deployment and scaling of containers."
      );
    }

    else if (q.includes("deployment")) {
      setAnswer(
        "Deployment is the process of releasing an application onto a server so users can access it."
      );
    }

    else if (q.includes("memory leak")) {
      setAnswer(
        "A memory leak occurs when an application continuously consumes memory without releasing it."
      );
    }

    else {
      setAnswer(
        "Sorry, I don't know that yet. Try asking about Docker, CPU, Memory, Deployment, Kubernetes or Load Balancing."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        📚 Knowledge Agent
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">
          Ask a Cloud Question
        </h2>

        <input
          type="text"
          placeholder="Ask something..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="w-full p-4 rounded-lg bg-slate-800 mb-6"
        />

        <button
          onClick={askQuestion}
          className="bg-cyan-500 px-6 py-3 rounded-lg"
        >
          Ask Agent
        </button>

        {answer && (
          <div className="mt-8 bg-slate-800 p-6 rounded-lg">
            {answer}
          </div>
        )}
      </div>
    </main>
  );
}