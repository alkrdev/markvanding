/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pump` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pump` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Machine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pumpname" TEXT,
    "time" DATETIME,
    "active" BOOLEAN NOT NULL
);
INSERT INTO "new_Machine" ("active", "id", "pumpname", "time") SELECT "active", "id", "pumpname", "time" FROM "Machine";
DROP TABLE "Machine";
ALTER TABLE "new_Machine" RENAME TO "Machine";
CREATE TABLE "new_Maintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machineId" INTEGER,
    "time" DATETIME,
    "note" TEXT,
    CONSTRAINT "Maintenance_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Maintenance" ("id", "machineId", "note", "time") SELECT "id", "machineId", "note", "time" FROM "Maintenance";
DROP TABLE "Maintenance";
ALTER TABLE "new_Maintenance" RENAME TO "Maintenance";
CREATE TABLE "new_Pump" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "number" TEXT,
    "active" BOOLEAN,
    "startcode" TEXT,
    "stopcode" TEXT
);
INSERT INTO "new_Pump" ("active", "id", "name", "number", "startcode", "stopcode") SELECT "active", "id", "name", "number", "startcode", "stopcode" FROM "Pump";
DROP TABLE "Pump";
ALTER TABLE "new_Pump" RENAME TO "Pump";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
