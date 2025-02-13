"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function AddItemForm() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("DEVICE")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category }),
      })
      if (response.ok) {
        setName("")
        setCategory("DEVICE")
        // You might want to refresh the inventory list here
      }
    } catch (error) {
      console.error("Failed to add item:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" required />
      <Select value={category} onValueChange={setCategory}>
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
      <Button type="submit">Add Item</Button>
    </form>
  )
}

