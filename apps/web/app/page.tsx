import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-cyan-400">
          ☁️ CloudForge
        </h1>

        <div className="space-x-4">
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-cyan-500 px-5 py-2 rounded-lg hover:bg-cyan-600"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-28 px-6">
        <h1 className="text-6xl font-bold leading-tight">
          Intelligent Cloud Deployment
          <br />
          <span className="text-cyan-400">
            Powered by AI Agents
          </span>
        </h1>

        <p className="mt-8 text-xl text-slate-400 max-w-3xl mx-auto">
          Deploy, monitor and manage cloud infrastructure with AI-powered
          deployment recommendations, health monitoring, error diagnosis,
          analytics and automated reporting.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <Link
            href="/register"
            className="bg-cyan-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-cyan-600"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-slate-700 px-8 py-4 rounded-xl text-lg hover:bg-slate-800"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <h2 className="text-4xl font-bold text-center mb-16">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 rounded-xl p-8">
            <div className="text-5xl">🚀</div>
            <h3 className="text-2xl font-bold mt-5">
              Smart Deployment
            </h3>
            <p className="mt-4 text-slate-400">
              AI recommends the healthiest server for application deployment.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-8">
            <div className="text-5xl">🤖</div>
            <h3 className="text-2xl font-bold mt-5">
              AI Monitoring
            </h3>
            <p className="mt-4 text-slate-400">
              Continuously analyzes server health, CPU, memory and uptime.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-8">
            <div className="text-5xl">📊</div>
            <h3 className="text-2xl font-bold mt-5">
              Analytics Dashboard
            </h3>
            <p className="mt-4 text-slate-400">
              Visualize deployments, servers and cloud resources in real time.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-8">
            <div className="text-5xl">🩺</div>
            <h3 className="text-2xl font-bold mt-5">
              Health Agent
            </h3>
            <p className="mt-4 text-slate-400">
              Detect unhealthy servers before deployment failures occur.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-8">
            <div className="text-5xl">🔍</div>
            <h3 className="text-2xl font-bold mt-5">
              Error Diagnosis
            </h3>
            <p className="mt-4 text-slate-400">
              Analyze deployment logs and suggest possible solutions instantly.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-8">
            <div className="text-5xl">📄</div>
            <h3 className="text-2xl font-bold mt-5">
              Reports
            </h3>
            <p className="mt-4 text-slate-400">
              Generate deployment summaries and infrastructure reports.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
        © 2026 CloudForge • AI Cloud Deployment Platform
      </footer>

    </main>
  );
}