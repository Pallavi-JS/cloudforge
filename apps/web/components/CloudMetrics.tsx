
"use client";

export default function CloudMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

      <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6 rounded-xl shadow-lg">
        <h3 className="text-sm text-white">Deployment Success</h3>
        <p className="text-4xl font-bold mt-2">98%</p>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <h3 className="text-sm text-white">Infrastructure Health</h3>
        <p className="text-4xl font-bold mt-2">96%</p>
      </div>

      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 rounded-xl shadow-lg">
        <h3 className="text-sm text-white">Average Response</h3>
        <p className="text-4xl font-bold mt-2">41 ms</p>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 rounded-xl shadow-lg">
        <h3 className="text-sm text-white">AI Confidence</h3>
        <p className="text-4xl font-bold mt-2">94%</p>
      </div>

    </div>
  );
}

