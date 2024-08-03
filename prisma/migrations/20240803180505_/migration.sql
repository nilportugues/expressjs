/*
  Warnings:

  - You are about to drop the column `email` on the `UserLoginToken` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserLoginToken` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserLoginToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "hasBeenUsed" BOOLEAN NOT NULL
);
INSERT INTO "new_UserLoginToken" ("hasBeenUsed", "id", "token") SELECT "hasBeenUsed", "id", "token" FROM "UserLoginToken";
DROP TABLE "UserLoginToken";
ALTER TABLE "new_UserLoginToken" RENAME TO "UserLoginToken";
CREATE INDEX "UserLoginToken_userId_token_hasBeenUsed_idx" ON "UserLoginToken"("userId", "token", "hasBeenUsed");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserFavorites_userId_idx" ON "UserFavorites"("userId");

-- CreateIndex
CREATE INDEX "UserKVStore_userId_valueKey_idx" ON "UserKVStore"("userId", "valueKey");
