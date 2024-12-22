/*
  Warnings:

  - You are about to drop the `_StudentToCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StudentToCourse" DROP CONSTRAINT "_StudentToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToCourse" DROP CONSTRAINT "_StudentToCourse_B_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "courses" TEXT[];

-- DropTable
DROP TABLE "_StudentToCourse";
