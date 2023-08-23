/*
  Warnings:

  - A unique constraint covering the columns `[id,CourseId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `CourseId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_id_CourseId_key` ON `Image`(`id`, `CourseId`);
