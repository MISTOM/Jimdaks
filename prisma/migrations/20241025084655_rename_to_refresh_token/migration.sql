/*
  Warnings:

  - You are about to drop the column `refreshKey` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `refreshKey`,
    ADD COLUMN `refreshToken` VARCHAR(191) NULL;
