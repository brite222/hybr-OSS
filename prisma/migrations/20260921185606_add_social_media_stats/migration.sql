-- CreateTable
CREATE TABLE "SocialMediaStat" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "periodLabel" TEXT NOT NULL,
    "followers" INTEGER,
    "impressions" INTEGER,
    "likes" INTEGER,
    "views" INTEGER,
    "listGrowth" INTEGER,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialMediaStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialMediaStat_platform_periodLabel_key" ON "SocialMediaStat"("platform", "periodLabel");
