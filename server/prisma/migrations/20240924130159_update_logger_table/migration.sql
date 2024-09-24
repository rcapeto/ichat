-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Logger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Logger" ("action", "id", "payload", "type") SELECT "action", "id", "payload", "type" FROM "Logger";
DROP TABLE "Logger";
ALTER TABLE "new_Logger" RENAME TO "Logger";
CREATE UNIQUE INDEX "Logger_id_key" ON "Logger"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
