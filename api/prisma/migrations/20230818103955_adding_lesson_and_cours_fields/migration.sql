-- CreateTable
CREATE TABLE `lesson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(40) NOT NULL,
    `desc` LONGTEXT NOT NULL,
    `img` VARCHAR(100) NOT NULL,
    `video` VARCHAR(100) NOT NULL,
    `courseId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lesson` ADD CONSTRAINT `lesson_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
