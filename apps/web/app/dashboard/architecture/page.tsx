
"use client";

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10 text-cyan-400">
        🏗 CloudForge Architecture
      </h1>

      <div className="bg-slate-900 rounded-xl p-10">

        <div className="space-y-8">

          <div className="bg-slate-800 rounded-lg p-5 text-center">
            👤 User
          </div>

          <div className="text-center text-3xl">
            ↓
          </div>

          <div className="bg-slate-800 rounded-lg p-5 text-center">
            🌐 Next.js Frontend
          </div>

          <div className="text-center text-3xl">
            ↓
          </div>

          <div className="bg-slate-800 rounded-lg p-5 text-center">
            🔐 JWT Authentication
          </div>

          <div className="text-center text-3xl">
            ↓
          </div>

          <div className="bg-slate-800 rounded-lg p-5 text-center">
            🤖 AI Decision Engine
          </div>

          <div className="text-center text-3xl">
            ↓
          </div>

          <div className="bg-slate-800 rounded-lg p-5 text-center">
            ⚙ Deployment Manager
          </div>

          <div className="text-center text-3xl">
            ↓
          </div>

          <div className="bg-slate-800 rounded-lg p-5 text-center">
            🖥 Server Management
          </div>

          <div className="text-center text-3xl">
            ↓
          </div>

          <div className="bg-slate-800 rounded-lg p-5 text-center">
            🗄 PostgreSQL (Neon)
          </div>

        </div>

      </div>

    </main>
  );
}

