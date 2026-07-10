"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface Props {
  applications: number;
  deployments: number;
  servers: number;
}

export default function DashboardCharts({
  applications,
  deployments,
  servers,
}: Props) {
  const data = [
    {
      name: "Applications",
      value: applications,
    },
    {
      name: "Deployments",
      value: deployments,
    },
    {
      name: "Servers",
      value: servers,
    },
  ];

  const COLORS = [
    "#06b6d4",
    "#22c55e",
    "#eab308",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">
      <div className="bg-slate-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          Resource Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          System Statistics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={data}>
            <CartesianGrid stroke="#333" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#06b6d4"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}