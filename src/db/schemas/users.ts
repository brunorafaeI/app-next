import { pgTable, serial, text, varchar, date } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').unique(),
  phone: varchar('phone', { length: 22 }),
  createdAt: date('created_at'),
})