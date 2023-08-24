/*
  Warnings:

  - You are about to drop the column `correctOptionId` on the `question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `option` ADD COLUMN `IsCorrect` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `question` DROP COLUMN `correctOptionId`;
