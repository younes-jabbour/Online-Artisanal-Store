/*
  Warnings:

  - You are about to drop the `lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `limage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lvideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `limage` DROP FOREIGN KEY `LImage_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `lvideo` DROP FOREIGN KEY `LVideo_lessonId_fkey`;

-- DropTable
DROP TABLE `lesson`;

-- DropTable
DROP TABLE `limage`;

-- DropTable
DROP TABLE `lvideo`;

-- CreateTable
CREATE TABLE `lecon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `courseId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lecon` ADD CONSTRAINT `lecon_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
