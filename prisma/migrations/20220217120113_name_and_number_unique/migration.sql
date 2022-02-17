/*
  Warnings:

  - Made the column `name` on table `Pump` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number` on table `Pump` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pump" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "active" BOOLEAN,
    "startcode" TEXT,
    "stopcode" TEXT
);
INSERT INTO "new_Pump" ("active", "id", "name", "number", "startcode", "stopcode") SELECT "active", "id", "name", "number", "startcode", "stopcode" FROM "Pump";
DROP TABLE "Pump";
ALTER TABLE "new_Pump" RENAME TO "Pump";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
