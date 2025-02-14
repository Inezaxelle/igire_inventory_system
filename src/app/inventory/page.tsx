"use client";

import AddItemForm from "@/components/AddItemForm";
import { useInventory } from "@/contexts/InventoryContext";

export default function Inventory() {
  const { addItem } = useInventory();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <AddItemForm onItemAdded={addItem} />
    </div>
  );
}