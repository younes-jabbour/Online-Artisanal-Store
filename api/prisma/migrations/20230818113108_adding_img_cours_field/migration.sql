/*
  Warnings:

  - Added the required column `img` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `img` VARCHAR(100) NOT NULL;
