/*
  Warnings:

  - You are about to drop the column `artisanId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `artisanId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `artisan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `UserId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_artisanId_fkey`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `artisanId`,
    ADD COLUMN `UserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `clientId`,
    ADD COLUMN `UserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `artisanId`,
    ADD COLUMN `UserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `desc` LONGTEXT NULL DEFAULT ' ',
    ADD COLUMN `role` ENUM('artisan', 'visitor') NOT NULL;

-- DropTable
DROP TABLE `artisan`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
