"use client"

import { useState } from "react"
import { useInventory } from "@/contexts/InventoryContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DamageReportClient() {
  const { items } = useInventory()
  const [selectedItem, setSelectedItem] = useState("")
  const [damageDescription, setDamageDescription] = useState("")

  const handleDamageReport = () => {
    if (selectedItem && damageDescription) {
      // Log damage report (replace with backend update if needed)
      console.log(`Damage reported for item ${selectedItem}: ${damageDescription}`)
      // Reset form
      setSelectedItem("")
      setDamageDescription("")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Damage Reports</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Report Damaged Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleDamageReport()
            }}
            className="space-y-4"
          >
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger>
                <SelectValue placeholder="Select an item to report" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              value={damageDescription}
              onChange={(e) => setDamageDescription(e.target.value)}
              placeholder="Describe the damage"
              required
            />
            <Button type="submit">Submit Damage Report</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Damaged Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {items
              .filter((item) => item.status === "DAMAGED")
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