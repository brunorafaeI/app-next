import { dbConnect } from "@/db"
import { users } from "@/db/schemas/users"
import { revalidatePath } from "next/cache"

export default async function Home() {
  const allUsers = await dbConnect.select().from(users)

  const createUser = async (data: FormData) => {
    "use server"
    
    const fullName = data.get('fullname')?.toString()
    const phone = data.get('phone')?.toString()

    if (!fullName || !phone) {
      return
    }

    await dbConnect.insert(users).values({
      fullName,
      phone
    })

    revalidatePath('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-50 flex-col gap-6">
      
      {JSON.stringify(allUsers, null, 2)}

      <form action={createUser} name="form_create_user" className="flex flex-col gap-3">
        <input type="text" name="fullname" placeholder="Full name" className="p-2 bg-zinc-800" />
        <input type="text" name="phone" placeholder="Phone" className="p-2 bg-zinc-800" />

        <button type="submit" name="send_form_create_user">Create</button>

      </form>
      
    </div>
  )
}
