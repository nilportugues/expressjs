-- CreateTable
CREATE TABLE "UserLoginToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "hasBeenUsed" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "UserPushToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceOs" TEXT NOT NULL,
    "deviceToken" TEXT NOT NULL,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "UserFavorites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quoteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserKVStore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "valueKey" TEXT NOT NULL,
    "valueData" TEXT NOT NULL
);
