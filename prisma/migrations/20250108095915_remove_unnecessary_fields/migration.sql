/*
  Warnings:

  - You are about to drop the column `date` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `FeedUsage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `FeedUsage` DROP FOREIGN KEY `FeedUsage_expenseId_fkey`;

-- DropIndex
DROP INDEX `FeedUsage_expenseId_fkey` ON `FeedUsage`;

-- AlterTable
ALTER TABLE `Expense` DROP COLUMN `date`;

-- AlterTable
ALTER TABLE `FeedUsage` DROP COLUMN `expenseId`;

-- AlterTable
ALTER TABLE `VaccinationRecord` ADD COLUMN `vaccinationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
