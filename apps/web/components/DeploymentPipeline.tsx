
"use client";

export default function DeploymentPipeline() {
  const steps = [
    "📦 Application",
    "🤖 AI Validation",
    "🚀 Deployment Agent",
    "🖥️ Best Server",
    "⚙️ Deployment",
    "📊 Monitoring",
    "✅ Success",
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-cyan-400 mb-8">
        Cloud Deployment Pipeline
      </h2>

      <div className="flex flex-wrap justify-between items-center gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="bg-slate-800 px-5 py-4 rounded-xl shadow-lg text-center min-w-[140px]">
              {step}
            </div>

            {index !== steps.length - 1 && (
              <div className="text-cyan-400 text-3xl mx-3">
                ➜
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

