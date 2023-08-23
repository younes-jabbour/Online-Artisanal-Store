/*
  Warnings:

  - You are about to drop the column `title` on the `appah` table. All the data in the column will be lost.
  - Added the required column `titre` to the `Appah` table without a default value. This is not possible if the table is not empty.
  - Made the column `text` on table `appah` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `appah` DROP COLUMN `title`,
    ADD COLUMN `titre` VARCHAR(191) NOT NULL,
    MODIFY `text` VARCHAR(191) NOT NULL;
