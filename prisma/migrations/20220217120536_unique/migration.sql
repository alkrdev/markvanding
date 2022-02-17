/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Pump` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Pump` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pump_name_key" ON "Pump"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pump_number_key" ON "Pump"("number");
