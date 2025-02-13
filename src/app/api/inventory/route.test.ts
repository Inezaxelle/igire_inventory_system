import { mockDeep } from "jest-mock-extended";
import { PrismaClient, Category, Status, Condition } from "@prisma/client";
import { NextRequest } from "next/server";
import { GET, POST } from "./route";

jest.mock("@prisma/client");

const mockPrisma = mockDeep<PrismaClient>();

describe("Inventory API", () => {
  beforeEach(() => {
    (PrismaClient as jest.Mock).mockImplementation(() => mockPrisma);
  });

  describe("GET", () => {
    it("should return all inventory items", async () => {
      const mockItems = [
        {
          id: "1",
          name: "Item 1",
          category: Category.DEVICE, // Use Enum
          status: Status.AVAILABLE, // Use Enum
          condition: Condition.GOOD, // Use Enum
          createdAt: new Date(),
        },
        {
          id: "2",
          name: "Item 2",
          category: Category.FURNITURE, // Use Enum
          status: Status.BORROWED, // Use Enum
          condition: Condition.WORN_OUT, // Use Enum
          createdAt: new Date(),
        },
      ];

      mockPrisma.inventoryItem.findMany.mockResolvedValue(mockItems);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockItems);
    });
  });

  describe("POST", () => {
    it("should create a new inventory item", async () => {
      const newItem = { name: "New Item", category: Category.DEVICE }; // Use Enum
      const createdItem = {
        id: "3",
        ...newItem,
        status: Status.AVAILABLE, // Use Enum
        condition: Condition.NEW, // Use Enum
        createdAt: new Date(),
      };

      mockPrisma.inventoryItem.create.mockResolvedValue(createdItem);

      const request = new NextRequest("http://localhost:3000/api/inventory", {
        method: "POST",
        body: JSON.stringify(newItem),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(createdItem);
    });
  });
});