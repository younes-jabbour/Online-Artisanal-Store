/*
  Warnings:

  - You are about to drop the `lessonimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lessonvideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `lessonimage` DROP FOREIGN KEY `LessonImage_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `lessonvideo` DROP FOREIGN KEY `LessonVideo_lessonId_fkey`;

-- AlterTable
ALTER TABLE `lesson` MODIFY `desc` LONGTEXT NULL DEFAULT ' ';

-- DropTable
DROP TABLE `lessonimage`;

-- DropTable
DROP TABLE `lessonvideo`;

-- CreateTable
CREATE TABLE `LImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `lessonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LVideo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `lessonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LImage` ADD CONSTRAINT `LImage_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LVideo` ADD CONSTRAINT `LVideo_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
