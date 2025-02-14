"use client"

import { useState } from "react"
import { useInventory } from "@/contexts/InventoryContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"

export default function DamageReportClient() {
  const { items, reportDamage } = useInventory()
  const [selectedItem, setSelectedItem] = useState("")
  const [damageDescription, setDamageDescription] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleDamageReport = () => {
    if (selectedItem && damageDescription) {
      reportDamage(selectedItem, damageDescription)
      setSuccessMessage(`Damage reported for ${selectedItem}.`)
      setTimeout(() => setSuccessMessage(""), 3000)
      setSelectedItem("")
      setDamageDescription("")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Damage Reports</h1>
      {successMessage && <Alert>{successMessage}</Alert>}
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
            className="space-y-6"
          >
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger className="w-full">
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
              className="w-full"
            />
            <Button type="submit" className="w-full">Submit Damage Report</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
