"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

export type Category = "DEVICE" | "FURNITURE" | "CLEANING_MATERIAL" | "FOOD_UTENSIL"
export type Status = "AVAILABLE" | "BORROWED" | "DAMAGED" | "DISPOSED"
export type Condition = "NEW" | "GOOD" | "WORN_OUT" | "BROKEN"

export interface InventoryItem {
  id: string
  name: string
  category: Category
  status: Status
  condition: Condition
}

interface InventoryContextType {
  items: InventoryItem[]
  addItem: (item: Omit<InventoryItem, "id">) => void
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

export const useInventory = () => {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider")
  }
  return context
}

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>([])

  useEffect(() => {
    // Load items from localStorage on initial render
    const savedItems = localStorage.getItem("inventoryItems")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  useEffect(() => {
    // Save items to localStorage whenever they change
    localStorage.setItem("inventoryItems", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<InventoryItem, "id">) => {
    const itemWithId = { ...newItem, id: Date.now().toString() }
    setItems((prevItems) => [...prevItems, itemWithId])
  }

  return <InventoryContext.Provider value={{ items, addItem }}>{children}</InventoryContext.Provider>
}

