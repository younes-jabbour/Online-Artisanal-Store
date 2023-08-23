/*
  Warnings:

  - You are about to drop the column `img` on the `course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `img`,
    ADD COLUMN `imageId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Course_imageId_key` ON `Course`(`imageId`);

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
