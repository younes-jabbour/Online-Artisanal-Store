/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Artisan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,ArtisanId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `artisan` ADD COLUMN `imageId` INTEGER NULL;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `ArtisanId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `imageId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Artisan_imageId_key` ON `Artisan`(`imageId`);

-- CreateIndex
CREATE UNIQUE INDEX `Image_id_userId_key` ON `Image`(`id`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Image_id_ArtisanId_key` ON `Image`(`id`, `ArtisanId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_imageId_key` ON `User`(`imageId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artisan` ADD CONSTRAINT `Artisan_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
