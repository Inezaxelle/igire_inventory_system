"use client";

import { useInventory } from "@/contexts/InventoryContext";

export default function List() {
  const { items } = useInventory();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Item List</h1>
      <ul className="mt-6">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="mb-2 p-2 border rounded">
              {item.name} - {item.category} - {item.status} - {item.condition}
            </li>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </ul>
    </div>
  );
}
