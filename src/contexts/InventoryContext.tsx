"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

export type Category = "DEVICE" | "FURNITURE" | "CLEANING_MATERIAL" | "FOOD_UTENSIL";
export type Status = "AVAILABLE" | "BORROWED" | "DAMAGED" | "DISPOSED";
export type Condition = "NEW" | "GOOD" | "WORN_OUT" | "BROKEN";

export interface InventoryItem {
  id: string;
  name: string;
  category: Category;
  status: Status;
  condition: Condition;
  serialNumber: string;
  quantity: number;
  borrower?: string;
  borrowDate?: string;
  damageDescription?: string;
  damageReportDate?: string;
}

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, "id">) => void;
  borrowItem: (itemId: string, borrower: string) => void;
  reportDamage: (itemId: string, damageDescription: string) => void;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === null) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("inventoryItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<InventoryItem, "id">) => {
    const itemWithId = { ...newItem, id: Date.now().toString() };
    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  const borrowItem = (itemId: string, borrower: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, status: "BORROWED", borrower, borrowDate: new Date().toISOString() }
          : item
      )
    );
  };

  const reportDamage = (itemId: string, damageDescription: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, status: "DAMAGED", damageDescription, damageReportDate: new Date().toISOString() }
          : item
      )
    );
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, borrowItem, reportDamage }}>
      {children}
    </InventoryContext.Provider>
  );
};