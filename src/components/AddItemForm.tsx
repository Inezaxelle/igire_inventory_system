"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import type { Category, Status, Condition } from "@/contexts/InventoryContext"

interface InventoryItem {
  name: string
  category: Category
  status: Status
  condition: Condition
}

interface AddItemFormProps {
  onItemAdded: (item: InventoryItem) => void
}

export default function AddItemForm({ onItemAdded }: AddItemFormProps) {
  const [item, setItem] = useState<InventoryItem>({
    name: "",
    category: "DEVICE",
    status: "AVAILABLE",
    condition: "NEW",
  })

  const handleChange = (field: keyof InventoryItem, value: string) => {
    setItem((prev) => ({ ...prev, [field]: value as any }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onItemAdded(item)
    setItem({ name: "", category: "DEVICE", status: "AVAILABLE", condition: "NEW" })
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

