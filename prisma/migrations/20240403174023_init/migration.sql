-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCount" (
    "itemId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ItemCount_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "BoxCount" (
    "boxId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "BoxCount_pkey" PRIMARY KEY ("boxId")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Box" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoxToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoxToItem_AB_unique" ON "_BoxToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_BoxToItem_B_index" ON "_BoxToItem"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoxToItem" ADD CONSTRAINT "_BoxToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoxToItem" ADD CONSTRAINT "_BoxToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
