import { auth } from "@clerk/nextjs/server"

export default async function Borrowing() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to access the borrowing page.</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Borrowing</h1>
      <p>This page will handle item borrowing and returns.</p>
    </div>
  )
}

