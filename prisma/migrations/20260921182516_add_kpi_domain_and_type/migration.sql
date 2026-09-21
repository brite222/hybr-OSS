/*
  Warnings:

  - Added the required column `domain` to the `KpiDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `KpiDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KpiType" AS ENUM ('Leading', 'Pipeline', 'Outcome', 'Execution', 'Risk', 'Financial');

-- AlterTable
ALTER TABLE "KpiDefinition" ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "type" "KpiType" NOT NULL;
