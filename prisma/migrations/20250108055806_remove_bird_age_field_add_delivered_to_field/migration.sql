/*
  Warnings:

  - You are about to drop the column `birdAge` on the `Flock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Flock` DROP COLUMN `birdAge`;

-- AlterTable
ALTER TABLE `SlaughterLog` ADD COLUMN `deliveredTo` VARCHAR(191) NULL;
