/*
  Warnings:

  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "file_url" TEXT,
    "chat_id" TEXT,
    "read" BOOLEAN DEFAULT false,
    "owner_id" TEXT NOT NULL,
    CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Message_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("chat_id", "content", "created_at", "file_url", "id", "read", "type") SELECT "chat_id", "content", "created_at", "file_url", "id", "read", "type" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
