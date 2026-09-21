-- CreateTable
CREATE TABLE "DashboardStat" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sublabel" TEXT,
    "level" "AlertLevel",
    "trend" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DashboardStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiBrief" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "AiBrief_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevenueGoal" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'default',
    "goal" INTEGER NOT NULL,
    "booked" INTEGER NOT NULL,
    "openPipeline" INTEGER NOT NULL,
    "weighted" INTEGER NOT NULL,
    "gap" INTEGER NOT NULL,
    "monthsLeft" INTEGER NOT NULL,
    "runRate" INTEGER NOT NULL,

    CONSTRAINT "RevenueGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleAccess" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "performance" TEXT NOT NULL,
    "finance" TEXT NOT NULL,
    "people" TEXT NOT NULL,
    "admin" TEXT NOT NULL,
    "defaultView" TEXT NOT NULL,

    CONSTRAINT "RoleAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DashboardStat_page_key_key" ON "DashboardStat"("page", "key");

-- CreateIndex
CREATE UNIQUE INDEX "AiBrief_scope_key" ON "AiBrief"("scope");

-- CreateIndex
CREATE UNIQUE INDEX "RevenueGoal_scope_key" ON "RevenueGoal"("scope");

-- CreateIndex
CREATE UNIQUE INDEX "RoleAccess_role_key" ON "RoleAccess"("role");
