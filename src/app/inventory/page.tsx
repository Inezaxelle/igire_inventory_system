"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import AddItemForm from "@/components/AddItemForm"

export default function Inventory() {
  const [items, setItems] = useState<any[]>([]) // Ensure items is initialized as an empty array
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/inventory")
        if (!response.ok) {
          throw new Error("Failed to fetch inventory")
        }
        const data = await response.json()

        // Ensure the data is an array before setting the state
        if (Array.isArray(data)) {
          setItems(data)
        } else {
          console.error("Invalid data format:", data)
          setItems([]) // Fallback to an empty array in case of invalid format
        }
      } catch (error) {
        console.error("Error fetching items:", error)
        setItems([]) // Fallback to an empty array in case of error
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <AddItemForm />
      {loading ? <p>Loading...</p> : (
        <ul className="mt-6">
          {items.map((item: any) => (
            <li key={item.id} className="mb-2">
              {item.name} - {item.category} - {item.status} - {item.condition}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
