/*
  Warnings:

  - You are about to drop the column `imageId` on the `artisan` table. All the data in the column will be lost.
  - You are about to drop the column `ArtisanId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `artisan` DROP FOREIGN KEY `Artisan_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_imageId_fkey`;

-- DropIndex
DROP INDEX `Image_id_ArtisanId_key` ON `image`;

-- DropIndex
DROP INDEX `Image_id_userId_key` ON `image`;

-- AlterTable
ALTER TABLE `artisan` DROP COLUMN `imageId`,
    ADD COLUMN `ImgUrl` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `ArtisanId`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `imageId`,
    ADD COLUMN `ImgUrl` VARCHAR(100) NULL;
