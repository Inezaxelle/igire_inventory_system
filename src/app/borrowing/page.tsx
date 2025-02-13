import { auth } from "@clerk/nextjs/server"
import BorrowingClient from "./borrowing-client"

export default async function BorrowingPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to access the borrowing page.</div>
  }

  return <BorrowingClient />
}