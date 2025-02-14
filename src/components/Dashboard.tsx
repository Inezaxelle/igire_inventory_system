"use client";

import { useInventory } from "@/contexts/InventoryContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, RotateCcw, AlertOctagon } from "lucide-react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  const { items } = useInventory();

  const stats = {
    totalItems: items.length,
    availableItems: items.filter((item) => item.status === "AVAILABLE").length,
    borrowedItems: items.filter((item) => item.status === "BORROWED").length,
    damagedItems: items.filter((item) => item.status === "DAMAGED").length,
  };

  const recentActivity = [
    { action: "Borrowed", item: "Laptop", user: "John Doe" },
    { action: "Returned", item: "Chair", user: "Jane Smith" },
    { action: "Added", item: "Projector", user: "Admin" },
  ];

  const overdueItems = [
    { item: "Tablet", user: "Alice Johnson", dueDate: "2023-05-01" },
    { item: "Laptop", user: "Bella Ciao", dueDate: "2023-06-01" },
  ];

  const pieChartData = [
    { name: "Available", value: stats.availableItems },
    { name: "Borrowed", value: stats.borrowedItems },
    { name: "Damaged", value: stats.damagedItems },
  ];

  const barChartData = [
    { name: "Laptop", borrowed: 15 },
    { name: "Projector", borrowed: 8 },
    { name: "Chair", borrowed: 12 },
    { name: "Tablet", borrowed: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Link href="/inventory" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <Plus size={16} className="mr-2" /> Add Item
            </Button>
          </Link>
          <Link href="/borrowing" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <RotateCcw size={16} className="mr-2" /> Borrow item
            </Button>
          </Link>
          <Link href="/damage-reports" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <AlertOctagon size={16} className="mr-2" /> Report Damage
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-600 text-sm">Total Items</h3>
          <p className="text-3xl font-bold">{stats.totalItems}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-600 text-sm">
            Available Items
          </h3>
          <p className="text-3xl font-bold">{stats.availableItems}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-600 text-sm">
            Borrowed Items
          </h3>
          <p className="text-3xl font-bold">{stats.borrowedItems}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-600 text-sm">Damaged Items</h3>
          <p className="text-3xl font-bold">{stats.damagedItems}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <ul className="space-y-2">
            {recentActivity.map((activity, index) => (
              <li key={index} className="text-sm">
                <span className="font-medium">{activity.action}</span> -{" "}
                {activity.item} by {activity.user}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Overdue Items</h3>
          {overdueItems.map((item, index) => (
            <Alert key={index} variant="destructive" className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Overdue</AlertTitle>
              <AlertDescription>
                {item.item} - {item.user} (Due: {item.dueDate})
              </AlertDescription>
            </Alert>
          ))}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">
            Item Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Most Borrowed Items</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="borrowed" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
