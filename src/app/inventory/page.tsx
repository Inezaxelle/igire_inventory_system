import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import AddItemForm from "@/components/AddItemForm"

const prisma = new PrismaClient()

export default async function Inventory() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to access the inventory.</div>
  }

  const items = await prisma.inventoryItem.findMany()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <AddItemForm />
      <ul className="mt-6">
        {items.map((item: any) => (
          <li key={item.id} className="mb-2">
            {item.name} - {item.category} - {item.status} - {item.condition}
          </li>
        ))}
      </ul>
    </div>
  )
}