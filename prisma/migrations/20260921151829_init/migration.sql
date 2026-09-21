-- CreateEnum
CREATE TYPE "AppRole" AS ENUM ('CEO', 'DEPARTMENT_LEAD', 'PROJECT_MANAGER', 'TEAM_MEMBER', 'FINANCE_ADMIN', 'SYSTEM_ADMIN');

-- CreateEnum
CREATE TYPE "AlertLevel" AS ENUM ('red', 'amber', 'green', 'info');

-- CreateEnum
CREATE TYPE "ActionPriority" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "ActionStatus" AS ENUM ('Today', 'ThisWeek', 'Overdue', 'Upcoming', 'Completed');

-- CreateEnum
CREATE TYPE "PipelineStage" AS ENUM ('Identified', 'Engaged', 'Qualified', 'SolutionFit', 'Proposal', 'CommercialAlignment');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('Due', 'Overdue', 'Paid');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Healthy', 'Watch', 'AtRisk');

-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('Ready', 'Draft', 'Published', 'Upcoming');

-- CreateEnum
CREATE TYPE "KpiPriority" AS ENUM ('P1', 'P2', 'P3');

-- CreateEnum
CREATE TYPE "KpiStatus" AS ENUM ('Active', 'Draft', 'Deprecated');

-- CreateEnum
CREATE TYPE "IntegrationMethod" AS ENUM ('API', 'Webhooks', 'Manual', 'Scheduled');

-- CreateEnum
CREATE TYPE "ExperimentStatus" AS ENUM ('Validated', 'Testing', 'Stalled');

-- CreateEnum
CREATE TYPE "ExperimentDecision" AS ENUM ('Continue', 'Iterate', 'Stop', 'Scale', 'Pending');

-- CreateEnum
CREATE TYPE "TeamRisk" AS ENUM ('Optimal', 'Utilization', 'Healthy', 'Watch');

-- CreateEnum
CREATE TYPE "PersonStatus" AS ENUM ('Good', 'Overloaded', 'Available', 'Watch');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AppRole" NOT NULL DEFAULT 'TEAM_MEMBER',
    "department" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "dueLabel" TEXT NOT NULL,
    "priority" "ActionPriority" NOT NULL,
    "status" "ActionStatus" NOT NULL,
    "source" TEXT NOT NULL,
    "expectedOutcome" TEXT NOT NULL,
    "linkedKpi" TEXT,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "blockedReason" TEXT,
    "completionEvidence" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyPriority" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "connectedActions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WeeklyPriority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertItem" (
    "id" TEXT NOT NULL,
    "level" "AlertLevel" NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "AlertItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "stage" "PipelineStage" NOT NULL,
    "owner" TEXT NOT NULL,
    "closeDate" TEXT NOT NULL,
    "probability" INTEGER NOT NULL,
    "buyingGroup" JSONB NOT NULL,
    "activity" JSONB NOT NULL,
    "aiInsight" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "icpReach" INTEGER NOT NULL,
    "engaged" INTEGER NOT NULL,
    "intent" INTEGER NOT NULL,
    "meetings" INTEGER NOT NULL,
    "pipeline" INTEGER NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntentAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "signal" TEXT NOT NULL,

    CONSTRAINT "IntentAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "issued" TEXT NOT NULL,
    "due" TEXT NOT NULL,
    "overdueDays" INTEGER NOT NULL DEFAULT 0,
    "status" "InvoiceStatus" NOT NULL,
    "owner" TEXT NOT NULL,
    "collectionActions" JSONB NOT NULL,
    "source" JSONB NOT NULL,
    "aiNote" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashWeek" (
    "id" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "level" "AlertLevel" NOT NULL,

    CONSTRAINT "CashWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "pm" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "margin" INTEGER,
    "nextMilestone" TEXT NOT NULL,
    "currentStepIndex" INTEGER NOT NULL,
    "health" JSONB NOT NULL,
    "aiRiskNote" TEXT NOT NULL,
    "risks" JSONB NOT NULL,
    "outcome" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentExecution" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "assigned" INTEGER NOT NULL,
    "done" INTEGER NOT NULL,
    "late" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "DepartmentExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "when" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "actionsCount" INTEGER NOT NULL,
    "status" "MeetingStatus" NOT NULL,
    "agenda" JSONB NOT NULL,
    "decisions" JSONB NOT NULL,
    "aiDetected" JSONB NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrategicPriority" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "StrategicPriority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formula" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "cadence" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "threshold" TEXT NOT NULL,
    "priority" "KpiPriority" NOT NULL,
    "status" "KpiStatus" NOT NULL,
    "effectiveDate" TEXT NOT NULL,

    CONSTRAINT "KpiDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationSource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" "IntegrationMethod" NOT NULL,
    "status" "AlertLevel" NOT NULL,
    "lastSync" TEXT NOT NULL,

    CONSTRAINT "IntegrationSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLogEntry" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "updated" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "AuditLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hypothesis" TEXT NOT NULL,
    "status" "ExperimentStatus" NOT NULL,
    "decision" "ExperimentDecision" NOT NULL,
    "evidence" TEXT NOT NULL,
    "successCriteria" TEXT NOT NULL,

    CONSTRAINT "Experiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamCapacity" (
    "id" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "execution" INTEGER NOT NULL,
    "risk" "TeamRisk" NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "TeamCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonCapacity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "currentLoad" INTEGER NOT NULL,
    "status" "PersonStatus" NOT NULL,
    "execution" INTEGER NOT NULL,
    "developmentGoals" INTEGER NOT NULL,
    "priorities" JSONB NOT NULL,
    "managerNote" TEXT NOT NULL,

    CONSTRAINT "PersonCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
