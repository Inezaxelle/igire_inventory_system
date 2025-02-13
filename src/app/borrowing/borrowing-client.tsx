"use client"

import { useState } from "react"
import { useInventory } from "@/contexts/InventoryContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BorrowingClient() {
  const { items } = useInventory()
  const [selectedItem, setSelectedItem] = useState("")
  const [borrowerName, setBorrowerName] = useState("")

  const availableItems = items.filter((item) => item.status === "AVAILABLE")

  const handleBorrow = () => {
    if (selectedItem && borrowerName) {
      // Update the item status to BORROWED
      const updatedItems = items.map((item) => (item.id === selectedItem ? { ...item, status: "BORROWED" } : item))
      // Here you would typically update the state and possibly send this to a backend
      console.log(`${borrowerName} borrowed item ${selectedItem}`)
      // Reset form
      setSelectedItem("")
      setBorrowerName("")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Borrowing</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Borrow an Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleBorrow()
            }}
            className="space-y-4"
          >
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger>
                <SelectValue placeholder="Select an item to borrow" />
              </SelectTrigger>
              <SelectContent>
                {availableItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              placeholder="Borrower's name"
              required
            />
            <Button type="submit">Borrow Item</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Currently Borrowed Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {items
              .filter((item) => item.status === "BORROWED")
              .map((item) => (
                <li key={item.id} className="mb-2">
                  {item.name}
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
