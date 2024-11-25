/*
  Warnings:

  - A unique constraint covering the columns `[feedType]` on the table `FeedInventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FeedInventory_feedType_key` ON `FeedInventory`(`feedType`);
