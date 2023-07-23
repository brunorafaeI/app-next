import { dbConnect } from "@/db"
import { users } from "@/db/schemas/users"

export default async function Home() {
  const allUsers = await dbConnect.select().from(users)
  return (
    <pre>{JSON.stringify(allUsers, null, 2)}</pre>
  )
}
