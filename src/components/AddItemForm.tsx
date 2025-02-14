"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { InventoryItem, Category } from "@/contexts/InventoryContext"

interface AddItemFormProps {
  onItemAdded: (item: Omit<InventoryItem, "id">) => void
}

export default function AddItemForm({ onItemAdded }: AddItemFormProps) {
  const [item, setItem] = useState<Omit<InventoryItem, "id">>({
    name: "",
    category: "DEVICE",
    status: "AVAILABLE",
    condition: "NEW",
    serialNumber: "",
    quantity: 1,
  })
  const [success, setSuccess] = useState(false)

  const handleChange = <K extends keyof Omit<InventoryItem, "id">>(field: K, value: Omit<InventoryItem, "id">[K]) => {
    setItem((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onItemAdded(item)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    setItem({ name: "", category: "DEVICE", status: "AVAILABLE", condition: "NEW", serialNumber: "", quantity: 1 })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" value={item.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Item name" required />
      <Input type="text" value={item.serialNumber} onChange={(e) => handleChange("serialNumber", e.target.value)} placeholder="Serial Number" required />
      <Input type="number" value={item.quantity} onChange={(e) => handleChange("quantity", parseInt(e.target.value))} placeholder="Quantity" required min="1" />
      <Select value={item.category} onValueChange={(value) => handleChange("category", value as Category)}>
        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="DEVICE">Device</SelectItem>
          <SelectItem value="FURNITURE">Furniture</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Add Item</Button>
      {success && <p className="text-green-500">Item added successfully!</p>}
    </form>
  )
}