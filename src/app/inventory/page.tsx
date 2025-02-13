"use client"

import AddItemForm from "@/components/AddItemForm"
import { useInventory } from "@/contexts/InventoryContext"

export default function Inventory() {
  const { items, addItem } = useInventory()

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <AddItemForm onItemAdded={addItem} />
      <ul className="mt-6">
        {items.map((item) => (
          <li key={item.id} className="mb-2 p-2 border rounded">
            {item.name} - {item.category} - {item.status} - {item.condition}
          </li>
        ))}
      </ul>
    </div>
  )
}
