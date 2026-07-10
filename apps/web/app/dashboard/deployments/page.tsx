"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DeploymentsPage() {
  const [applications, setApplications] =
    useState<any[]>([]);
  const [servers, setServers] =
    useState<any[]>([]);
  const [deployments, setDeployments] =
    useState<any[]>([]);

  const [applicationId, setApplicationId] =
    useState("");
  const [serverId, setServerId] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const loadData = async () => {
    const apps = await fetch(
      "/api/applications"
    );
    const appsData = await apps.json();

    const serv = await fetch(
      "/api/server"
    );
    const servData = await serv.json();

    const dep = await fetch(
      "/api/deployments"
    );
    const depData = await dep.json();

    setApplications(
      Array.isArray(appsData)
        ? appsData
        : []
    );

    setServers(
      Array.isArray(servData)
        ? servData
        : []
    );

    setDeployments(
      Array.isArray(depData)
        ? depData
        : []
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeploy = async () => {
    if (!applicationId || !serverId) {
      toast.error(
        "Select application and server"
      );
      return;
    }

    setLoading(true);

    const res = await fetch(
      "/api/deployments",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          applicationId,
          serverId,
        }),
      }
    );

    setLoading(false);

    if (res.ok) {
      toast.success(
        "Deployment created!"
      );

      setApplicationId("");
      setServerId("");

      loadData();
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this deployment?"
      );

    if (!confirmDelete) return;

    setDeletingId(id);

    await fetch("/api/deployments", {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    setDeletingId(null);

    toast.success(
      "Deployment deleted!"
    );

    loadData();
  };

  const filteredDeployments =
    deployments.filter((deployment) =>
      deployment.application.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Deployments
      </h1>

      <input
        type="text"
        placeholder="Search deployments..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full max-w-md p-4 rounded-lg bg-slate-800 mb-8"
      />

      <div className="bg-slate-900 p-8 rounded-xl mb-10">
        <select
          value={applicationId}
          onChange={(e) =>
            setApplicationId(
              e.target.value
            )
          }
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        >
          <option value="">
            Select Application
          </option>

          {applications.map((app) => (
            <option
              key={app.id}
              value={app.id}
            >
              {app.name}
            </option>
          ))}
        </select>

        <select
          value={serverId}
          onChange={(e) =>
            setServerId(
              e.target.value
            )
          }
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        >
          <option value="">
            Select Server
          </option>

          {servers.map((server) => (
            <option
              key={server.id}
              value={server.id}
            >
              {server.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleDeploy}
          disabled={loading}
          className="bg-cyan-500 px-6 py-3 rounded-lg"
        >
          {loading
            ? "Deploying..."
            : "Deploy"}
        </button>
      </div>

      <div className="space-y-4">
        {filteredDeployments.length ===
        0 ? (
          <div className="bg-slate-900 p-8 rounded-xl text-center text-slate-400">
            No deployments found.
          </div>
        ) : (
          filteredDeployments.map(
            (deployment) => (
              <div
                key={deployment.id}
                className="bg-slate-900 p-6 rounded-xl"
              >
                <h2 className="text-2xl font-bold">
                  {
                    deployment.application
                      .name
                  }
                </h2>

                <p className="mt-2">
                  Server:{" "}
                  {
                    deployment.server
                      .name
                  }
                </p>

                <p className="text-green-400 mt-2">
                  {
                    deployment.status
                  }
                </p>

                <button
                  onClick={() =>
                    handleDelete(
                      deployment.id
                    )
                  }
                  disabled={
                    deletingId ===
                    deployment.id
                  }
                  className="mt-4 bg-red-600 px-4 py-2 rounded-lg"
                >
                  {deletingId ===
                  deployment.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            )
          )
        )}
      </div>
    </main>
  );
}