/*
  Warnings:

  - Added the required column `contact_unread_count` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_unread_count` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN "read" BOOLEAN DEFAULT false;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "owner_unread_count" INTEGER NOT NULL,
    "contact_unread_count" INTEGER NOT NULL,
    CONSTRAINT "Chat_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Chat_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Chat" ("contact_id", "created_at", "id", "owner_id") SELECT "contact_id", "created_at", "id", "owner_id" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
