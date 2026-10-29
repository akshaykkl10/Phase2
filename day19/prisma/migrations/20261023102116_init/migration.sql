-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AGENT', 'USER');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "author_id" TEXT NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT LOCALTIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status_history" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "status_from" TEXT NOT NULL,
    "status_to" VARCHAR(10) NOT NULL,
    "changed_by_id" TEXT NOT NULL,
    "changed_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "assigned_to_id" TEXT,
    "title" VARCHAR(500) NOT NULL,
    "description" VARCHAR(3000),
    "priority" "TicketPriority" NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT LOCALTIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT LOCALTIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket_tags" (
    "ticket_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "Ticket_tags_pkey" PRIMARY KEY ("ticket_id","tag_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "ticket_title" ON "Ticket"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "user_name" ON "Users"("name");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Status_history" ADD CONSTRAINT "Status_history_changed_by_id_fkey" FOREIGN KEY ("changed_by_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Status_history" ADD CONSTRAINT "Status_history_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ticket_tags" ADD CONSTRAINT "Ticket_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ticket_tags" ADD CONSTRAINT "Ticket_tags_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
