import { auth } from "@clerk/nextjs/server"
import Dashboard from "@/components/Dashboard"

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to access the dashboard.</div>
  }

  return <Dashboard />
}

// User needs to first sign in before accessing dashboard