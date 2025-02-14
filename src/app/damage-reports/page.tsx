import { auth } from "@clerk/nextjs/server"
import DamageReportClient from "./damage-report-client"

export default async function DamageReportPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to access the damage reports.</div>
  }

  return <DamageReportClient />
}
