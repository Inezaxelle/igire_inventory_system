import { mockDeep, MockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { GET, POST } from "./route";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(),
}));

let mockPrisma: MockProxy<PrismaClient>;

beforeEach(() => {
  mockPrisma = mockDeep<PrismaClient>();
  (PrismaClient as jest.Mock).mockReturnValue(mockPrisma);
});

describe("Inventory API", () => {
  describe("GET", () => {
    it("should return all inventory items", async () => {
      const mockItems = [
        {
          id: "1",
          name: "Item 1",
          category: "DEVICE",
          status: "AVAILABLE",
          condition: "GOOD",
          createdAt: new Date(),
        },
        {
          id: "2",
          name: "Item 2",
          category: "FURNITURE",
          status: "BORROWED",
          condition: "WORN_OUT",
          createdAt: new Date(),
        },
      ];

      (mockPrisma.inventoryItem.findMany as jest.Mock).mockResolvedValue(
        mockItems
      );

      const response = await GET(mockPrisma);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(
        mockItems.map((item) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
        }))
      );
    });
  });

  describe("POST", () => {
    it("should create a new inventory item", async () => {
      const newItem = { name: "New Item", category: "DEVICE" };
      const createdItem = {
        id: "3",
        ...newItem,
        status: "AVAILABLE",
        condition: "NEW",
        createdAt: new Date(),
      };

      (mockPrisma.inventoryItem.create as jest.Mock).mockResolvedValue(
        createdItem
      );

      const request = new Request("http://localhost:3000/api/inventory", {
        method: "POST",
        body: JSON.stringify(newItem),
      });

      const response = await POST(mockPrisma, request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual({
        ...createdItem,
        createdAt: createdItem.createdAt.toISOString(),
      });
    });
  });
});
