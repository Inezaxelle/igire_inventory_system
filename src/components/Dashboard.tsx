"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { useInventory } from "@/contexts/InventoryContext"

export default function Dashboard() {
  const { items } = useInventory()

  const stats = {
    totalItems: items.length,
    availableItems: items.filter((item) => item.status === "AVAILABLE").length,
    borrowedItems: items.filter((item) => item.status === "BORROWED").length,
    damagedItems: items.filter((item) => item.status === "DAMAGED").length,
  }

  // Dummy data for demonstration (you can replace these with real data later)
  const recentActivity = [
    { action: "Borrowed", item: "Laptop", user: "John Doe" },
    { action: "Returned", item: "Chair", user: "Jane Smith" },
    { action: "Added", item: "Projector", user: "Admin" },
  ]

  const overdueItems = [
    { item: "Tablet", user: "Alice Johnson", dueDate: "2023-05-01" },
    { item: "Laptop", user: "Bella Ciao", dueDate: "2023-06-01" },
    { item: "Tablet", user: "Niki Minaj", dueDate: "2023-05-03" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mt-6 flex space-x-4 mb-6">
        <Link href="/inventory">
          <Button>Add Item</Button>
        </Link>
        <Button>Assign Item</Button>
        <Button>Return Item</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.borrowedItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Damaged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.damagedItems}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {recentActivity.map((activity, index) => (
                <li key={index} className="mb-2">
                  {activity.action} - {activity.item} by {activity.user}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overdue Items</CardTitle>
          </CardHeader>
          <CardContent>
            {overdueItems.map((item, index) => (
              <Alert key={index} variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Overdue</AlertTitle>
                <AlertDescription>
                  {item.item} - {item.user} (Due: {item.dueDate})
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}