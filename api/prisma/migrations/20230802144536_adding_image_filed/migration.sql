/*
  Warnings:

  - You are about to drop the column `product_img` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_artisanId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `product_img`,
    MODIFY `artisanId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `Artisan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
