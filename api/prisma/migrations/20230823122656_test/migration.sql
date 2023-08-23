/*
  Warnings:

  - Made the column `desc` on table `lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseId` on table `lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lessonId` on table `lessonimage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lessonId` on table `lessonvideo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `lessonimage` DROP FOREIGN KEY `LessonImage_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `lessonvideo` DROP FOREIGN KEY `LessonVideo_lessonId_fkey`;

-- AlterTable
ALTER TABLE `lesson` MODIFY `desc` VARCHAR(191) NOT NULL,
    MODIFY `courseId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `lessonimage` MODIFY `lessonId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `lessonvideo` MODIFY `lessonId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonImage` ADD CONSTRAINT `LessonImage_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonVideo` ADD CONSTRAINT `LessonVideo_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
