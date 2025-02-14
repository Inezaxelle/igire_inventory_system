"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { InventoryItem, Category, Status, Condition } from "@/contexts/InventoryContext"

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

  const handleChange = <K extends keyof Omit<InventoryItem, "id">>(field: K, value: Omit<InventoryItem, "id">[K]) => {
    setItem((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onItemAdded(item)
    setItem({ name: "", category: "DEVICE", status: "AVAILABLE", condition: "NEW", serialNumber: "", quantity: 1 })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={item.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Item name"
        required
      />

      <Input
        type="text"
        value={item.serialNumber}
        onChange={(e) => handleChange("serialNumber", e.target.value)}
        placeholder="Serial Number"
        required
      />

      <Input
        type="number"
        value={item.quantity}
        onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
        placeholder="Quantity"
        required
        min="1"
      />

      <Select value={item.category} onValueChange={(value) => handleChange("category", value as Category)}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DEVICE">Device</SelectItem>
          <SelectItem value="FURNITURE">Furniture</SelectItem>
          <SelectItem value="CLEANING_MATERIAL">Cleaning Material</SelectItem>
          <SelectItem value="FOOD_UTENSIL">Food Utensil</SelectItem>
        </SelectContent>
      </Select>

      <Select value={item.status} onValueChange={(value) => handleChange("status", value as Status)}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AVAILABLE">Available</SelectItem>
          <SelectItem value="BORROWED">Borrowed</SelectItem>
          <SelectItem value="DAMAGED">Damaged</SelectItem>
          <SelectItem value="DISPOSED">Disposed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={item.condition} onValueChange={(value) => handleChange("condition", value as Condition)}>
        <SelectTrigger>
          <SelectValue placeholder="Select condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NEW">New</SelectItem>
          <SelectItem value="GOOD">Good</SelectItem>
          <SelectItem value="WORN_OUT">Worn Out</SelectItem>
          <SelectItem value="BROKEN">Broken</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit">Add Item</Button>
    </form>
  )
}