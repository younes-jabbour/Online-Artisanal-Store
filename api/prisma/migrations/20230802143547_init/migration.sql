/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `imageId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `productId` INTEGER NULL,

    UNIQUE INDEX `Image_id_productId_key`(`id`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_imageId_key` ON `Product`(`imageId`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
