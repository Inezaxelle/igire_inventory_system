"use client"

import { useState } from "react"
import { useInventory } from "@/contexts/InventoryContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BorrowingClient() {
  const { items, borrowItem } = useInventory()
  const [selectedItem, setSelectedItem] = useState("")
  const [borrowerName, setBorrowerName] = useState("")

  const availableItems = items.filter((item) => item.status === "AVAILABLE")

  const handleBorrow = () => {
    if (selectedItem && borrowerName) {
      borrowItem(selectedItem, borrowerName)
      console.log(`${borrowerName} borrowed item ${selectedItem}`)
      setSelectedItem("")
      setBorrowerName("")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
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
            className="space-y-6"
          >
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger className="w-full">
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
              className="w-full"
            />
            <Button type="submit" className="w-full">Borrow Item</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Currently Borrowed Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {items
              .filter((item) => item.status === "BORROWED")
              .map((item) => (
                <li key={item.id} className="text-sm">
                  {item.name} - Borrowed by: {item.borrower}
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}