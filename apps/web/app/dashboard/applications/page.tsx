"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ApplicationsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [applications, setApplications] =
    useState<any[]>([]);
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const fetchApplications =
    async () => {
      const res = await fetch(
        "/api/applications"
      );
      const data = await res.json();

      setApplications(
        Array.isArray(data) ? data : []
      );
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(
      "/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    setLoading(false);

    if (res.ok) {
      toast.success(
        "Application added!"
      );

      setName("");
      setDescription("");

      fetchApplications();
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this application?"
      );

    if (!confirmDelete) return;

    setDeletingId(id);

    await fetch("/api/applications", {
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
      "Application deleted!"
    );

    setEditingId(null);
    setName("");
    setDescription("");

    fetchApplications();
  };

  const handleEdit = (app: any) => {
    setEditingId(app.id);
    setName(app.name);
    setDescription(app.description);
  };

  const handleUpdate = async () => {
    setLoading(true);

    await fetch("/api/applications", {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        name,
        description,
      }),
    });

    setLoading(false);

    toast.success(
      "Application updated!"
    );

    setEditingId(null);
    setName("");
    setDescription("");

    fetchApplications();
  };

  const filteredApplications =
    applications.filter((app) =>
      app.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Applications
      </h1>

      <input
        type="text"
        placeholder="Search applications..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full max-w-md p-4 rounded-lg bg-slate-800 mb-8"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl max-w-3xl"
      >
        <input
          type="text"
          placeholder="Application Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
          required
        />

        {editingId ? (
          <div className="space-x-3">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="bg-yellow-500 px-6 py-3 rounded-lg"
            >
              {loading
                ? "Updating..."
                : "Update Application"}
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setName("");
                setDescription("");
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
              : "Add Application"}
          </button>
        )}
      </form>

      <div className="mt-10 space-y-4">
        {filteredApplications.length ===
        0 ? (
          <div className="bg-slate-900 p-8 rounded-xl text-center text-slate-400">
            No applications found.
          </div>
        ) : (
          filteredApplications.map(
            (app) => (
              <div
                key={app.id}
                className="bg-slate-900 p-6 rounded-xl"
              >
                <h2 className="text-3xl font-bold">
                  {app.name}
                </h2>

                <p className="text-slate-400 mt-2">
                  {app.description}
                </p>

                <div className="mt-4 space-x-3">
                  <button
                    onClick={() =>
                      handleEdit(app)
                    }
                    className="bg-yellow-500 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        app.id
                      )
                    }
                    disabled={
                      deletingId ===
                      app.id
                    }
                    className="bg-red-600 px-4 py-2 rounded-lg"
                  >
                    {deletingId ===
                    app.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </main>
  );
}