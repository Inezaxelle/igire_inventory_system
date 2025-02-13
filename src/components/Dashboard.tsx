import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Dashboard() {
  // Dummy data for demonstration
  const stats = {
    totalItems: 100,
    availableItems: 80,
    borrowedItems: 15,
    damagedItems: 5,
  }

  const recentActivity = [
    { action: "Borrowed", item: "Laptop", user: "John Doe" },
    { action: "Returned", item: "Chair", user: "Jane Smith" },
    { action: "Added", item: "Projector", user: "Admin" },
  ]

  const overdueItems = [{ item: "Tablet", user: "Alice Johnson", dueDate: "2023-05-01" }]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

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
              <Alert key={index} variant="destructive">
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

      <div className="mt-6 flex space-x-4">
        <Button>Add Item</Button>
        <Button>Assign Item</Button>
        <Button>Return Item</Button>
      </div>
    </div>
  )
}