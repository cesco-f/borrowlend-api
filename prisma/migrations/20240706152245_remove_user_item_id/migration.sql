/*
  Warnings:

  - The primary key for the `UserItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserItem" DROP CONSTRAINT "UserItem_pkey",
DROP COLUMN "id";
