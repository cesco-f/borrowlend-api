/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ItemToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[api_id]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `api_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ItemToUser" DROP CONSTRAINT "_ItemToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToUser" DROP CONSTRAINT "_ItemToUser_B_fkey";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "id",
ADD COLUMN     "api_id" TEXT NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("api_id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Barcelona',
ADD COLUMN     "photo_url" TEXT;

-- DropTable
DROP TABLE "_ItemToUser";

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sender_id" UUID NOT NULL,
    "receiver_id" UUID NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "item_id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserItem_user_id_item_id_key" ON "UserItem"("user_id", "item_id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_api_id_key" ON "Item"("api_id");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("api_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
