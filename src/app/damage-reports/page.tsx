import { auth } from "@clerk/nextjs/server"

export default async function DamageReports() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to access the damage reports.</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Damage Reports</h1>
      <p>This page will display and manage damage reports.</p>
    </div>
  )
}

