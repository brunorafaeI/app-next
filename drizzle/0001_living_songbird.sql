ALTER TABLE "users" ALTER COLUMN "phone" SET DATA TYPE varchar(22);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_full_name_unique" UNIQUE("full_name");