"use client";

import { useState } from "react";

export default function ErrorAgentPage() {
  const [log, setLog] = useState("");
  const [result, setResult] = useState("");

  const analyzeLog = () => {
    const text = log.toLowerCase();

    if (text.includes("out of memory")) {
      setResult(`
🟡 Memory Issue Detected.

Possible Solution:
• Restart services
• Increase server RAM
• Check for memory leaks
      `);
    }

    else if (text.includes("connection refused")) {
      setResult(`
🔴 Connection Error Detected.

Possible Solution:
• Server may be down
• Check firewall settings
• Verify IP address and port
• Restart the application
      `);
    }

    else if (text.includes("disk full")) {
      setResult(`
🟠 Disk Space Issue Detected.

Possible Solution:
• Delete unnecessary files
• Clear logs and cache
• Increase storage capacity
      `);
    }

    else if (text.includes("timeout")) {
      setResult(`
🟠 Timeout Error Detected.

Possible Solution:
• Check network connectivity
• Restart server
• Increase timeout configuration
• Investigate heavy CPU usage
      `);
    }

    else if (
      text.includes("permission denied")
    ) {
      setResult(`
🔴 Permission Error Detected.

Possible Solution:
• Check file permissions
• Verify user roles
• Run application with proper privileges
      `);
    }

    else if (
      text.includes("database") ||
      text.includes("sql")
    ) {
      setResult(`
🔵 Database Error Detected.

Possible Solution:
• Check database server status
• Verify connection string
• Check username and password
• Restart database service
      `);
    }

    else if (
      text.includes("cpu") ||
      text.includes("high cpu")
    ) {
      setResult(`
🟠 High CPU Usage Detected.

Possible Solution:
• Stop unnecessary processes
• Scale server resources
• Investigate infinite loops
• Restart services
      `);
    }

    else {
      setResult(`
⚪ Unknown Error.

Possible Solution:
• Check application logs
• Restart the service
• Contact administrator
      `);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        🔍 Error Diagnosis Agent
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">
          Paste Error Logs
        </h2>

        <textarea
          rows={8}
          value={log}
          onChange={(e) =>
            setLog(e.target.value)
          }
          placeholder="Paste your error log here..."
          className="w-full p-4 rounded-lg bg-slate-800 mb-6"
        />

        <button
          onClick={analyzeLog}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          Analyze Log
        </button>

        {result && (
          <div className="mt-8 bg-slate-800 p-6 rounded-lg whitespace-pre-line">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}