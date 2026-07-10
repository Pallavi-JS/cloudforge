
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ServersPage() {
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [servers, setServers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadServers = async () => {
    const res = await fetch("/api/server");
    const data = await res.json();
    setServers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadServers();
  }, []);
  useEffect(() => {
  const interval = setInterval(() => {
    setServers((prev) =>
      prev.map((server) => {
        const cpu = Math.floor(
          Math.random() * 100
        );

        const memory = Math.floor(
          Math.random() * 100
        );

        const uptime =
          Math.floor(
            Math.random() * 20
          ) + 80;

        const responseTime =
          Math.floor(
            Math.random() * 200
          ) + 20;

        const healthScore =
          Math.max(
            0,
            Math.min(
              100,
              Math.floor(
                100 -
                  cpu * 0.4 -
                  memory * 0.3 +
                  uptime * 0.3
              )
            )
          );

        let status = "Running";

        if (healthScore < 50) {
          status = "Critical";
        } else if (healthScore < 80) {
          status = "Warning";
        }

        return {
          ...server,
          cpuUsage: cpu,
          memoryUsage: memory,
          uptime,
          responseTime,
          healthScore,
          status,
        };
      })
    );
  }, 3000);

  return () =>
    clearInterval(interval);
}, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        ipAddress,
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Server added!");
      setName("");
      setIpAddress("");
      loadServers();
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this server?"
      )
    ) {
      return;
    }

    setDeletingId(id);

    await fetch("/api/server", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    setDeletingId(null);

    toast.success("Server deleted!");
    loadServers();
  };

  const handleEdit = (server: any) => {
    setEditingId(server.id);
    setName(server.name);
    setIpAddress(server.ipAddress);
  };

  const handleUpdate = async () => {
    setLoading(true);

    await fetch("/api/server", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        name,
        ipAddress,
      }),
    });

    setLoading(false);

    toast.success("Server updated!");

    setEditingId(null);
    setName("");
    setIpAddress("");

    loadServers();
  };

  const filteredServers =
    servers.filter((server) =>
      server.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Servers
      </h1>

      <input
        type="text"
        placeholder="Search servers..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full max-w-md p-4 rounded-lg bg-slate-800 mb-8"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl mb-10"
      >
        <input
          type="text"
          placeholder="Server Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
          required
        />

        <input
          type="text"
          placeholder="IP Address"
          value={ipAddress}
          onChange={(e) =>
            setIpAddress(e.target.value)
          }
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
          required
        />

        {editingId ? (
          <div className="space-x-3">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-yellow-500 px-6 py-3 rounded-lg"
            >
              Update Server
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setName("");
                setIpAddress("");
              }}
              className="bg-gray-600 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 px-6 py-3 rounded-lg"
          >
            {loading
              ? "Adding..."
              : "Add Server"}
          </button>
        )}
      </form>

      <div className="grid gap-6">
        {filteredServers.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-xl text-center text-slate-400">
            No servers found.
          </div>
        ) : (
          filteredServers.map((server) => {
            const cpu =
              server.cpuUsage ??
              Math.floor(
                Math.random() * 80 + 10
              );

            const memory =
              server.memoryUsage ??
              Math.floor(
                Math.random() * 80 + 10
              );

            const uptime =
              server.uptime ??
              Math.floor(
                Math.random() * 20 + 80
              );

            const response =
              server.responseTime ??
              Math.floor(
                Math.random() * 150 + 20
              );

            const health =
              server.healthScore ??
              Math.floor(
                (100 -
                  cpu * 0.4 -
                  memory * 0.3 +
                  uptime * 0.3)
              );

            const status =
              health >= 80
                ? "Running"
                : health >= 50
                ? "Warning"
                : "Critical";

            return (
              <div
                key={server.id}
                className="bg-slate-900 p-6 rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {server.name}
                    </h2>

                    <p className="text-slate-400 mt-1">
                      {server.ipAddress}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-bold ${
                      status === "Running"
                        ? "bg-green-500"
                        : status === "Warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <p>CPU Usage: {cpu}%</p>

                    <div className="w-full bg-slate-700 rounded-full h-3 mt-1">
                      <div
                        className="bg-cyan-500 h-3 rounded-full"
                        style={{
                          width: `${cpu}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <p>
                      Memory Usage: {memory}%
                    </p>

                    <div className="w-full bg-slate-700 rounded-full h-3 mt-1">
                      <div
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{
                          width: `${memory}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <p>Uptime: {uptime}%</p>
                  </div>

                  <div>
                    <p>
                      Response Time: {response} ms
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-cyan-400">
                      Health Score: {health}
                    </p>

                    <div className="w-full bg-slate-700 rounded-full h-3 mt-1">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{
                          width: `${health}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-x-3">
                  <button
                    onClick={() =>
                      handleEdit(server)
                    }
                    className="bg-yellow-500 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(server.id)
                    }
                    disabled={
                      deletingId === server.id
                    }
                    className="bg-red-600 px-4 py-2 rounded-lg"
                  >
                    {deletingId === server.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
