import "dotenv/config";
import pg from "pg";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function mapPipelineStage(stage: string) {
  return stage.replace(/\s+/g, "") as
    | "Identified"
    | "Engaged"
    | "Qualified"
    | "SolutionFit"
    | "Proposal"
    | "CommercialAlignment";
}

function mapActionStatus(status: string) {
  return status.replace(/\s+/g, "") as
    | "Today"
    | "ThisWeek"
    | "Overdue"
    | "Upcoming"
    | "Completed";
}

function mapProjectStatus(status: string) {
  return status.replace(/\s+/g, "") as "Healthy" | "Watch" | "AtRisk";
}

async function main() {
  console.log("Seeding users...");
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
  const users: { email: string; name: string; role: Prisma.UserCreateInput["role"]; department?: string }[] = [
    { email: "charles@hybr.com", name: "Charles Q.", role: "CEO" },
    { email: "growth.lead@hybr.com", name: "Growth Lead", role: "DEPARTMENT_LEAD", department: "Growth" },
    { email: "pm@hybr.com", name: "Project Manager", role: "PROJECT_MANAGER", department: "Delivery" },
    { email: "team.member@hybr.com", name: "Team Member", role: "TEAM_MEMBER" },
    { email: "finance@hybr.com", name: "Finance Admin", role: "FINANCE_ADMIN", department: "Finance" },
    { email: "admin@hybr.com", name: "System Admin", role: "SYSTEM_ADMIN" },
  ];
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, passwordHash },
    });
  }

  console.log("Seeding dashboard stats...");
  const statPages: Record<string, { id: string; label: string; value: string; sublabel?: string; level?: string; trend?: string }[]> = {
    home: [
      { id: "execution", label: "Execution", value: "87%", sublabel: "This period", level: "green", trend: "up" },
      { id: "due-today", label: "Due today", value: "4", sublabel: "Actions", level: "amber" },
      { id: "alerts", label: "Alerts", value: "3", sublabel: "Need action", level: "red" },
      { id: "next-mtg", label: "Next mtg", value: "11:00", sublabel: "GTM check-in", level: "info" },
    ],
    performance: [
      { id: "booked", label: "Booked Revenue", value: "$320K / $1M", sublabel: "32% of goal", level: "info" },
      { id: "coverage", label: "Pipeline Coverage", value: "2.8x", sublabel: "Target 3x+", level: "amber" },
      { id: "execution", label: "Execution", value: "87%", sublabel: "+4%", level: "green" },
      { id: "delivery", label: "Delivery Health", value: "8 / 10", sublabel: "1 at risk", level: "green" },
      { id: "cash", label: "Cash Runway", value: "4.2 mo", sublabel: "Watch", level: "amber" },
    ],
    "growth-marketing": [
      { id: "tier1-intent", label: "Tier-1 Accounts w/ New Intent", value: "9", sublabel: "Accounts this week", level: "green" },
      { id: "sourced-meetings", label: "Marketing-Sourced Meetings", value: "2", sublabel: "Completed", level: "info" },
      { id: "sourced-pipeline", label: "Marketing-Sourced Pipeline", value: "$95K", sublabel: "Qualified", level: "green" },
      { id: "content-intent", label: "Content-to-Intent Rate", value: "4.8%", sublabel: "High-intent / unique views", level: "amber" },
      { id: "indx", label: "INDX Completions", value: "6", sublabel: "Diagnostics", level: "info" },
    ],
    "growth-sales": [
      { id: "booked", label: "Booked", value: "$320K", sublabel: "YTD", level: "info" },
      { id: "coverage", label: "Coverage", value: "2.8x", sublabel: "Below 3x target", level: "amber" },
      { id: "new-pipeline", label: "New Pipeline", value: "$65K", sublabel: "This week", level: "green" },
      { id: "meetings", label: "Meetings", value: "2", sublabel: "Qualified", level: "info" },
      { id: "next-actions", label: "Next Actions", value: "100%", sublabel: "Compliant", level: "green" },
    ],
    finance: [
      { id: "cash-balance", label: "Cash Balance", value: "$142K", sublabel: "4.2 months runway", level: "amber" },
      { id: "invoiced", label: "Invoiced Revenue", value: "$88K", sublabel: "This month", level: "info" },
      { id: "collections", label: "Collections", value: "$64K", sublabel: "73% collected", level: "green" },
      { id: "overdue-ar", label: "Overdue AR", value: "$48K", sublabel: "Needs escalation", level: "red" },
      { id: "dso", label: "DSO", value: "34 days", sublabel: "Target 30", level: "amber" },
    ],
    "finance-flow": [
      { id: "booked", label: "Booked", value: "$320K" },
      { id: "invoice", label: "Invoice", value: "$88K" },
      { id: "receivable", label: "Receivable", value: "$74K" },
      { id: "collected", label: "Collected", value: "$64K" },
      { id: "margin", label: "Margin", value: "36%" },
      { id: "cash", label: "Cash", value: "4.2 mo" },
    ],
    delivery: [
      { id: "project-health", label: "Project Health", value: "8 / 10", sublabel: "Healthy", level: "green" },
      { id: "milestone-ontime", label: "Milestone On-Time Rate", value: "84%", sublabel: "Target 90%", level: "amber" },
      { id: "quality", label: "Delivery Quality Score", value: "4.6 / 5", sublabel: "Client acceptance", level: "green" },
      { id: "project-margin", label: "Project Gross Margin", value: "36%", sublabel: "Blended", level: "amber" },
      { id: "client-outcome", label: "Client Outcome", value: "78%", sublabel: "NPS/CSAT", level: "green" },
    ],
    operations: [
      { id: "company-execution", label: "Company Execution", value: "87%", sublabel: "Actions completed / due", level: "green" },
      { id: "on-time", label: "On-Time Execution", value: "79%", sublabel: "Target 85%", level: "amber" },
      { id: "overdue-rate", label: "Overdue Rate", value: "11%", sublabel: "Of actions", level: "amber" },
      { id: "strategic-priority", label: "Strategic Priority", value: "72%", sublabel: "This quarter", level: "green" },
      { id: "blocker-resolution", label: "Blocker Resolution Time", value: "2.8d", sublabel: "Avg days", level: "green" },
    ],
    product: [
      { id: "insights", label: "Validated Insights", value: "18", sublabel: "Documented with evidence", level: "green" },
      { id: "experiments", label: "Experiments Completed", value: "4", sublabel: "This quarter", level: "info" },
      { id: "time-to-prototype", label: "Time to Prototype", value: "12d", sublabel: "Idea to testable", level: "green" },
      { id: "validation-rate", label: "Prototype Validation Rate", value: "50%", sublabel: "Meeting success criteria", level: "amber" },
      { id: "value-created", label: "Product / AI Value Created", value: "78h", sublabel: "Hours saved / month", level: "green" },
    ],
    people: [
      { id: "revenue-per-fte", label: "Revenue / FTE", value: "$52K", sublabel: "Booked / recognized", level: "green" },
      { id: "team-execution", label: "Team Execution Score", value: "87%", sublabel: "Actions completed / due", level: "green" },
      { id: "capacity", label: "Capacity Utilization", value: "86%", sublabel: "Assigned / available", level: "amber" },
      { id: "engagement", label: "Engagement / Culture Index", value: "4.2 / 5", sublabel: "Survey score", level: "green" },
      { id: "time-to-productivity", label: "Time to Productivity", value: "21d", sublabel: "Start to threshold", level: "green" },
    ],
  };
  for (const [page, stats] of Object.entries(statPages)) {
    for (let i = 0; i < stats.length; i++) {
      const s = stats[i];
      await prisma.dashboardStat.upsert({
        where: { page_key: { page, key: s.id } },
        update: { label: s.label, value: s.value, sublabel: s.sublabel, level: s.level as never, trend: s.trend, order: i },
        create: { page, key: s.id, label: s.label, value: s.value, sublabel: s.sublabel, level: s.level as never, trend: s.trend, order: i },
      });
    }
  }

  console.log("Seeding AI briefs...");
  const briefs: { scope: string; content: string }[] = [
    {
      scope: "home",
      content:
        "Pipeline coverage fell below 3x because two opportunities moved into next quarter. Review the three at-risk deals.",
    },
    {
      scope: "growth-marketing",
      content:
        "The strongest commercial signal is coming from INDX completions and repeat visits to the Growth Opportunity page.",
    },
    {
      scope: "finance-forecast",
      content: "Two overdue invoices and one delayed contract could reduce runway below 3 months.",
    },
    {
      scope: "performance",
      content:
        "The biggest risk is insufficient qualified pipeline for the next 90 days. Three high-intent accounts need human follow-up this week.",
    },
  ];
  for (const b of briefs) {
    await prisma.aiBrief.upsert({ where: { scope: b.scope }, update: { content: b.content }, create: b });
  }

  console.log("Seeding revenue goal...");
  await prisma.revenueGoal.upsert({
    where: { scope: "default" },
    update: {},
    create: {
      scope: "default",
      goal: 1_000_000,
      booked: 320_000,
      openPipeline: 1_800_000,
      weighted: 720_000,
      gap: 680_000,
      monthsLeft: 8,
      runRate: 85_000,
    },
  });

  console.log("Seeding role access matrix...");
  const roleAccess = [
    { role: "CEO", performance: "All", finance: "All", people: "All", admin: "Limited", defaultView: "Command Center" },
    { role: "Department Lead", performance: "Dept", finance: "No", people: "Dept", admin: "No", defaultView: "Department dashboard" },
    { role: "Project Manager", performance: "Project only", finance: "No", people: "No", admin: "No", defaultView: "Project detail" },
    { role: "Team Member", performance: "Own", finance: "No", people: "Own", admin: "No", defaultView: "My Work" },
    { role: "Finance/Admin", performance: "No", finance: "All", people: "No", admin: "No", defaultView: "Finance dashboard" },
    { role: "System Admin", performance: "Limited", finance: "Limited", people: "Limited", admin: "All", defaultView: "Admin" },
  ];
  for (const r of roleAccess) {
    await prisma.roleAccess.upsert({ where: { role: r.role }, update: r, create: r });
  }

  console.log("Seeding actions...");
  await prisma.action.deleteMany();
  await prisma.action.createMany({
    data: [
      { title: "Complete GTM account analysis", owner: "Charles", dueLabel: "Today", priority: "High", status: mapActionStatus("Today"), source: "GTM Check-in", expectedOutcome: "3 accounts prioritized for outreach this week", linkedKpi: "Pipeline Coverage" },
      { title: "Review HYBR OS design deck", owner: "Charles", dueLabel: "Today", priority: "High", status: mapActionStatus("Today"), source: "Product review", expectedOutcome: "Design system approved for Figma handoff" },
      { title: "Send invoice reminder", owner: "Charles", dueLabel: "Today", priority: "Medium", status: mapActionStatus("Today"), source: "Finance collections", expectedOutcome: "Client B reminded before Friday escalation", linkedKpi: "Overdue AR" },
      { title: "Send revised proposal to Access Bank", owner: "Charles", dueLabel: "Friday, Sep 4", priority: "High", status: mapActionStatus("This Week"), source: "GTM Check-in", expectedOutcome: "Move Access Bank to Commercial Alignment", linkedKpi: "Pipeline Coverage" },
      { title: "Approve sales stage fields", owner: "Charles", dueLabel: "This week", priority: "Medium", status: mapActionStatus("This Week"), source: "Admin — KPI dictionary", expectedOutcome: "Stage exit criteria enforced in pipeline" },
      { title: "Update Project Beta risk", owner: "Charles", dueLabel: "Overdue", priority: "High", status: mapActionStatus("Overdue"), source: "Delivery — Prototype-to-Proof Sprint", expectedOutcome: "Risk register reflects recruiting delay and mitigation", linkedKpi: "Project Health", blocked: true, blockedReason: "Need read from CTO before sending scope note" },
      { title: "Review overdue AR", owner: "Charles", dueLabel: "Overdue", priority: "High", status: mapActionStatus("Overdue"), source: "Finance dashboard", expectedOutcome: "Escalation path confirmed for Client D", linkedKpi: "Overdue AR" },
      { title: "Book UX reviewer for HYBR OS MVP", owner: "Charles", dueLabel: "Next week", priority: "Medium", status: mapActionStatus("Upcoming"), source: "Delivery — HYBR OS MVP", expectedOutcome: "UX review scheduled, unblocking critical path" },
      { title: "Prepare Q3 GTM/offer review", owner: "Charles", dueLabel: "Sep 15", priority: "Low", status: mapActionStatus("Upcoming"), source: "Quarterly cadence", expectedOutcome: "ICP and offer review deck drafted" },
      { title: "Publish HYBR OS design system pack", owner: "Charles", dueLabel: "Completed Sep 18", priority: "High", status: mapActionStatus("Completed"), source: "Product review", expectedOutcome: "Design tokens and components ready for build", completionEvidence: "Design system committed to repo, reviewed with partner." },
    ],
  });

  console.log("Seeding weekly priorities...");
  await prisma.weeklyPriority.deleteMany();
  await prisma.weeklyPriority.createMany({
    data: [
      { title: "Close pipeline gap", description: "Target $85K new qualified pipeline", connectedActions: 3 },
      { title: "Approve HYBR OS UX blueprint", description: "Move to Figma design", connectedActions: 1 },
      { title: "Resolve Project Beta blocker", description: "Return to green health status", connectedActions: 2 },
    ],
  });

  console.log("Seeding alerts...");
  await prisma.alertItem.deleteMany();
  await prisma.alertItem.createMany({
    data: [
      { level: "red", title: "Pipeline coverage fell below 3x", detail: "Revenue target is at risk without $85K new qualified pipeline.", owner: "Growth Lead", action: "Create 3 account activation actions" },
      { level: "amber", title: "Project Beta milestone overdue", detail: "Delivery schedule may slip by 9 days.", owner: "Project Manager", action: "Resolve blocker or reset delivery plan" },
      { level: "amber", title: "Overdue receivables: $48K", detail: "Cash forecast at risk this month.", owner: "Finance/Admin", action: "Send reminder and escalate two clients" },
    ],
  });

  console.log("Seeding content items + intent accounts...");
  await prisma.contentItem.deleteMany();
  await prisma.contentItem.createMany({
    data: [
      { title: "Growth Playbook by Guesswork", theme: "GTM", icpReach: 2100, engaged: 320, intent: 18, meetings: 2, pipeline: 65000 },
      { title: "JD Breakdown", theme: "Framework", icpReach: 1450, engaged: 210, intent: 11, meetings: 1, pipeline: 30000 },
      { title: "Workflow Before AI", theme: "AI Ops", icpReach: 1820, engaged: 260, intent: 15, meetings: 0, pipeline: 0 },
      { title: "Case Study: Airline", theme: "Proof", icpReach: 940, engaged: 148, intent: 9, meetings: 1, pipeline: 0 },
      { title: "Friday Signal", theme: "Trigger", icpReach: 1260, engaged: 176, intent: 5, meetings: 0, pipeline: 0 },
    ],
  });
  await prisma.intentAccount.deleteMany();
  await prisma.intentAccount.createMany({
    data: [
      { name: "Access Bank", score: 67, signal: "INDX completed · viewed Growth Sprint page · 5 visits in 7 days" },
      { name: "DFI Program X", score: 54, signal: "Webinar attended · service page visit · email click" },
      { name: "Scale-up Logistics Co.", score: 42, signal: "Case study view · LinkedIn comment · funding trigger" },
    ],
  });

  console.log("Seeding opportunities...");
  await prisma.opportunity.deleteMany();
  await prisma.opportunity.createMany({
    data: [
      {
        name: "Growth Opportunity Sprint",
        account: "Access Bank",
        value: 120_000,
        stage: mapPipelineStage("Proposal"),
        owner: "Charles",
        closeDate: "2026-09-30",
        probability: 45,
        buyingGroup: [
          { name: "CEO", role: "Economic buyer" },
          { name: "Head of Strategy", role: "Champion" },
          { name: "CFO", role: "Budget approver" },
          { name: "Procurement", role: "Process" },
        ],
        activity: [
          { label: "Discovery call completed", done: true },
          { label: "Proposal sent", done: true },
          { label: "Budget review scheduled", done: true },
          { label: "Next action: Exec follow-up", done: false },
        ],
        aiInsight: "Buyer emphasized speed and board pressure and failed pilots. Recommend framing proposal around decision speed and proof in 30 days.",
      },
      {
        name: "Program Modernization",
        account: "DFI Program X",
        value: 88_000,
        stage: mapPipelineStage("Qualified"),
        owner: "Charles",
        closeDate: "2026-10-15",
        probability: 30,
        buyingGroup: [
          { name: "Program Director", role: "Champion" },
          { name: "CFO", role: "Budget approver" },
        ],
        activity: [
          { label: "Webinar attended", done: true },
          { label: "Discovery call scheduled", done: false },
        ],
        aiInsight: "High engagement but no economic buyer identified yet — prioritize a discovery call this week.",
      },
      {
        name: "Logistics Ops Diagnostic",
        account: "Scale-up Logistics Co.",
        value: 54_000,
        stage: mapPipelineStage("Engaged"),
        owner: "Charles",
        closeDate: "2026-11-01",
        probability: 20,
        buyingGroup: [{ name: "COO", role: "Champion" }],
        activity: [{ label: "Case study viewed", done: true }],
        aiInsight: "Funding trigger detected — reach out before the round closes and priorities shift.",
      },
    ],
  });

  console.log("Seeding invoices + cash forecast...");
  await prisma.invoice.deleteMany();
  await prisma.invoice.createMany({
    data: [
      { number: "INV-201", client: "Client A", value: 26_000, issued: "2026-08-12", due: "2026-09-11", overdueDays: 0, status: "Due", owner: "Finance", collectionActions: [{ label: "Reminder scheduled Sep 8", done: false }], source: ["Contract terms", "Milestone accepted", "Invoice issued", "Payment due date"], aiNote: "On track. No action required yet." },
      { number: "INV-204", client: "Client B", value: 18_000, issued: "2026-08-01", due: "2026-08-31", overdueDays: 12, status: "Overdue", owner: "Finance", collectionActions: [{ label: "Reminder sent Aug 28", done: true }, { label: "Follow-up scheduled today", done: false }, { label: "Escalate if unpaid by Friday", done: false }], source: ["Contract terms", "Milestone accepted", "Invoice issued", "Payment due date"], aiNote: "This invoice is tied to a completed deliverable. Escalation is recommended if not paid by Friday." },
      { number: "INV-198", client: "Client C", value: 24_000, issued: "2026-08-20", due: "2026-09-19", overdueDays: 0, status: "Due", owner: "Finance", collectionActions: [{ label: "No action required", done: true }], source: ["Contract terms", "Milestone accepted", "Invoice issued", "Payment due date"], aiNote: "On track. No action required yet." },
      { number: "INV-195", client: "Client D", value: 30_000, issued: "2026-07-22", due: "2026-08-21", overdueDays: 21, status: "Overdue", owner: "Finance", collectionActions: [{ label: "Reminder sent Aug 25", done: true }, { label: "Escalation email sent Sep 3", done: true }, { label: "Awaiting client finance response", done: false }], source: ["Contract terms", "Milestone accepted", "Invoice issued", "Payment due date"], aiNote: "21 days overdue and past the standard escalation window. Recommend a CEO-level call this week." },
    ],
  });
  await prisma.cashWeek.deleteMany();
  await prisma.cashWeek.createMany({
    data: [
      { week: 1, balance: 142_000, level: "green" }, { week: 2, balance: 138_000, level: "green" },
      { week: 3, balance: 131_000, level: "green" }, { week: 4, balance: 126_000, level: "green" },
      { week: 5, balance: 118_000, level: "green" }, { week: 6, balance: 104_000, level: "amber" },
      { week: 7, balance: 96_000, level: "amber" }, { week: 8, balance: 88_000, level: "amber" },
      { week: 9, balance: 79_000, level: "amber" }, { week: 10, balance: 61_000, level: "red" },
      { week: 11, balance: 49_000, level: "red" }, { week: 12, balance: 38_000, level: "red" },
      { week: 13, balance: 30_000, level: "red" },
    ],
  });

  console.log("Seeding projects...");
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        name: "GTM Clarity Sprint", client: "Client A", status: mapProjectStatus("Healthy"), pm: "Charles", progress: 92, margin: 42,
        nextMilestone: "First review", currentStepIndex: 6,
        health: [{ label: "Schedule", score: 90, level: "green" }, { label: "Scope", score: 88, level: "green" }, { label: "Quality", score: 92, level: "green" }, { label: "Budget", score: 85, level: "green" }, { label: "Team", score: 90, level: "green" }],
        aiRiskNote: "On track for on-time delivery. No corrective action required.",
        risks: [{ id: "r1", risk: "Client feedback delay", severity: "Low", owner: "Lead", action: "Send reminder", due: "Thu" }],
        outcome: {
          reviewChecklist: [{ label: "Decision brief accepted", done: true }, { label: "Evidence threshold met", done: true }, { label: "Client next-value need identified", done: true }, { label: "Case study potential confirmed", done: true }],
          expansionSignal: "Deploy opportunity", expansionValue: 110_000,
          caseEvidence: "Client quote, measurable result, before/after images, decision impact and a real deployment narrative captured for the case study.",
        },
      },
      {
        name: "HYBR OS MVP", client: "Internal", status: mapProjectStatus("Watch"), pm: "Product Lead", progress: 58, margin: null,
        nextMilestone: "UX review", currentStepIndex: 3,
        health: [{ label: "Schedule", score: 65, level: "amber" }, { label: "Scope", score: 70, level: "amber" }, { label: "Quality", score: 80, level: "green" }, { label: "Budget", score: 75, level: "green" }, { label: "Team", score: 72, level: "amber" }],
        aiRiskNote: "UX review pending is the critical path item. Confirm reviewer availability this week.",
        risks: [{ id: "r2", risk: "UX review not scheduled", severity: "Medium", owner: "PM", action: "Book reviewer", due: "Wed" }],
      },
      {
        name: "Prototype-to-Proof Sprint", client: "Client B", status: mapProjectStatus("At Risk"), pm: "Adia", progress: 38, margin: 22,
        nextMilestone: "Validation", currentStepIndex: 3,
        health: [{ label: "Schedule", score: 40, level: "red" }, { label: "Scope", score: 55, level: "amber" }, { label: "Quality", score: 70, level: "green" }, { label: "Budget", score: 35, level: "red" }, { label: "Team", score: 60, level: "amber" }],
        aiRiskNote: "Margin risk is driven by external research costs running 18% above plan. Review scope before the next validation round.",
        risks: [
          { id: "r3", risk: "Recruiting delay", severity: "High", owner: "PM", action: "Escalate with agency", due: "Today" },
          { id: "r4", risk: "Budget overrun", severity: "High", owner: "Product", action: "Renegotiate scope", due: "Fri" },
          { id: "r5", risk: "Contributor idle", severity: "Medium", owner: "Delivery", action: "Confirm resume date", due: "Wed" },
          { id: "r6", risk: "QA gaps", severity: "Low", owner: "Lead", action: "Schedule QA pass", due: "Thu" },
        ],
      },
      {
        name: "AI Productivity Reset", client: "Client C", status: mapProjectStatus("Healthy"), pm: "Charles", progress: 80, margin: 44,
        nextMilestone: "Pilot design", currentStepIndex: 5,
        health: [{ label: "Schedule", score: 88, level: "green" }, { label: "Scope", score: 84, level: "green" }, { label: "Quality", score: 90, level: "green" }, { label: "Budget", score: 86, level: "green" }, { label: "Team", score: 88, level: "green" }],
        aiRiskNote: "On track. Pilot design is the next milestone with no open blockers.",
        risks: [],
      },
      {
        name: "INDX Lite", client: "HYBR", status: mapProjectStatus("Watch"), pm: "Product Lead", progress: 45, margin: null,
        nextMilestone: "Beta users", currentStepIndex: 2,
        health: [{ label: "Schedule", score: 68, level: "amber" }, { label: "Scope", score: 72, level: "amber" }, { label: "Quality", score: 75, level: "green" }, { label: "Budget", score: 80, level: "green" }, { label: "Team", score: 70, level: "amber" }],
        aiRiskNote: "Beta user recruitment is behind plan by one week.",
        risks: [{ id: "r7", risk: "Beta recruitment behind", severity: "Medium", owner: "Product", action: "Widen outreach", due: "Mon" }],
      },
      {
        name: "Innovation Diagnostic", client: "Client D", status: mapProjectStatus("Healthy"), pm: "Charles", progress: 95, margin: 38,
        nextMilestone: "Final report", currentStepIndex: 6,
        health: [{ label: "Schedule", score: 92, level: "green" }, { label: "Scope", score: 90, level: "green" }, { label: "Quality", score: 94, level: "green" }, { label: "Budget", score: 88, level: "green" }, { label: "Team", score: 90, level: "green" }],
        aiRiskNote: "On track to close this week with no open risks.",
        risks: [],
      },
    ],
  });

  console.log("Seeding department execution + meetings + strategic priorities...");
  await prisma.departmentExecution.deleteMany();
  await prisma.departmentExecution.createMany({
    data: [
      { owner: "Growth", assigned: 18, done: 16, late: 1, score: 89 },
      { owner: "Delivery", assigned: 22, done: 17, late: 4, score: 77 },
      { owner: "Product", assigned: 11, done: 10, late: 0, score: 91 },
    ],
  });
  await prisma.meeting.deleteMany();
  await prisma.meeting.createMany({
    data: [
      { title: "GTM Check-In", when: "Fri, this week", owner: "Growth", actionsCount: 7, status: "Ready", agenda: ["Revenue clock", "Scorecard exceptions", "Pipeline movement", "Demand & signals", "Experiments", "Commitments"], decisions: ["Prioritize Bank X", "Pause TikTok test", "Move DFI proposal to CEO"], aiDetected: { decisions: 3, actions: 7, risks: 2, overdueFollowUps: 1 } },
      { title: "Project Review", when: "Tue", owner: "Project Manager", actionsCount: 4, status: "Draft", agenda: ["Milestone status", "Budget review", "Risk register"], decisions: ["Extend Prototype Sprint validation by one week"], aiDetected: { decisions: 1, actions: 4, risks: 1, overdueFollowUps: 0 } },
      { title: "Leadership Review", when: "Mon, this week", owner: "CEO", actionsCount: 12, status: "Published", agenda: ["Enterprise scorecard", "Cash position", "Delivery risk", "People capacity"], decisions: ["Approve HYBR OS MVP scope", "Escalate Client D collection to CEO"], aiDetected: { decisions: 2, actions: 12, risks: 3, overdueFollowUps: 2 } },
      { title: "1:1s", when: "This week", owner: "Lead", actionsCount: 3, status: "Upcoming", agenda: ["Priorities", "Capacity", "Development goals"], decisions: [], aiDetected: { decisions: 0, actions: 3, risks: 0, overdueFollowUps: 0 } },
    ],
  });
  await prisma.strategicPriority.deleteMany();
  await prisma.strategicPriority.createMany({
    data: [
      { title: "$1M GTM System", owner: "Growth Lead", progress: 72, note: "Pipeline coverage below target" },
      { title: "HYBR OS MVP", owner: "Project Lead", progress: 58, note: "UX review pending" },
      { title: "3D Productization", owner: "Product Lead", progress: 35, note: "Needs test users" },
      { title: "Key Client Expansion", owner: "Delivery Lead", progress: 62, note: "2 expansion signals" },
    ],
  });

  console.log("Seeding KPI dictionary, integrations, audit log...");
  await prisma.kpiDefinition.deleteMany();
  await prisma.kpiDefinition.createMany({
    data: [
      { name: "Pipeline Coverage", formula: "Qualified pipeline ÷ next-90-day bookings target", owner: "Growth Lead", source: "Pipedrive", cadence: "Weekly", target: "≥ 3x", threshold: "< 3x amber, < 2x red", priority: "P1", status: "Active", effectiveDate: "2026-08-01" },
      { name: "Booked Revenue", formula: "Signed contract value vs monthly/YTD target", owner: "CEO", source: "Pipedrive + Finance", cadence: "Weekly", target: "$1M ARR", threshold: "< 90% of pace amber", priority: "P1", status: "Active", effectiveDate: "2026-08-01" },
      { name: "Company Execution Score", formula: "Actions completed ÷ actions due/committed in period", owner: "Operations Lead", source: "HYBR OS actions", cadence: "Weekly", target: "≥ 90%", threshold: "< 85% amber, < 75% red", priority: "P1", status: "Active", effectiveDate: "2026-08-01" },
      { name: "Overdue AR", formula: "Sum of receivable value past due date", owner: "Finance/Admin", source: "Finance records", cadence: "Daily", target: "$0", threshold: "> $20K amber, > $40K red", priority: "P1", status: "Active", effectiveDate: "2026-08-01" },
      { name: "Project Health Index", formula: "Composite of schedule, quality, margin, risk and client health", owner: "Project Manager", source: "Delivery records", cadence: "Weekly", target: "≥ 8 / 10", threshold: "< 7 amber, < 5 red", priority: "P1", status: "Active", effectiveDate: "2026-08-01" },
      { name: "DSO", formula: "Accounts receivable ÷ credit sales × days", owner: "Finance/Admin", source: "Finance records", cadence: "Monthly", target: "≤ 30 days", threshold: "> 35 days amber, > 45 days red", priority: "P2", status: "Active", effectiveDate: "2026-08-01" },
      { name: "Content-to-Intent Rate", formula: "High-intent signals ÷ unique ICP content views", owner: "Growth Lead", source: "Website analytics + INDX", cadence: "Weekly", target: "≥ 5%", threshold: "< 3% amber", priority: "P2", status: "Draft", effectiveDate: "2026-09-01" },
    ],
  });
  await prisma.integrationSource.deleteMany();
  await prisma.integrationSource.createMany({
    data: [
      { name: "Pipedrive", method: "Manual", status: "green", lastSync: "7 min ago" },
      { name: "Website Analytics", method: "API", status: "green", lastSync: "Synced" },
      { name: "LinkedIn", method: "API", status: "amber", lastSync: "Last sync 18 hrs" },
      { name: "Email / Newsletter", method: "Webhooks", status: "green", lastSync: "Synced" },
      { name: "Google Workspace", method: "Manual", status: "green", lastSync: "Updated today" },
      { name: "Calendar / Meet", method: "Scheduled", status: "green", lastSync: "Synced 2 min ago" },
      { name: "Finance Records", method: "Webhooks", status: "green", lastSync: "Updated today" },
      { name: "HR Records", method: "Manual", status: "amber", lastSync: "Manual upload due" },
      { name: "Product Analytics", method: "Manual", status: "info", lastSync: "Not yet connected" },
    ],
  });
  await prisma.auditLogEntry.deleteMany();
  await prisma.auditLogEntry.createMany({
    data: [
      { user: "Admin", object: "KPI target", original: "2.5x", updated: "3.0x", reason: "Q3 pipeline coverage target updated" },
      { user: "Growth Lead", object: "Opportunity stage", original: "Qualified", updated: "Proposal", reason: "Access Bank proposal sent" },
      { user: "PM", object: "Action status", original: "Open", updated: "Blocked", reason: "Contributor idle, escalated" },
      { user: "Finance", object: "Invoice status", original: "Due", updated: "Paid", reason: "Payment received from Client C" },
    ],
  });

  console.log("Seeding experiments...");
  await prisma.experiment.deleteMany();
  await prisma.experiment.createMany({
    data: [
      { title: "Meeting Action Extraction", hypothesis: "AI can reduce meeting action capture time by 80% while maintaining accuracy.", status: "Validated", decision: "Scale", evidence: "20 meeting transcripts, manual comparison, user confirmation — 92% action accuracy, 100% visibility within 24h.", successCriteria: "≥ 90% action accuracy, ≤ 24h visibility, high manager trust." },
      { title: "INDX Opportunity Scoring", hypothesis: "Diagnostic completion signals predict qualified pipeline better than page views alone.", status: "Testing", decision: "Pending", evidence: "6 weeks of INDX completions cross-referenced against sourced pipeline value.", successCriteria: "Score correlates with meeting conversion at ≥ 30%." },
    ],
  });

  console.log("Seeding team + person capacity...");
  await prisma.teamCapacity.deleteMany();
  await prisma.teamCapacity.createMany({
    data: [
      { team: "Growth", capacity: 92, execution: 84, risk: "Optimal", action: "Reallocate" },
      { team: "Delivery", capacity: 88, execution: 78, risk: "Utilization", action: "Compare" },
      { team: "Product", capacity: 72, execution: 90, risk: "Healthy", action: "Monitor" },
      { team: "Finance", capacity: 68, execution: 82, risk: "Healthy", action: "Monitor" },
    ],
  });
  await prisma.personCapacity.deleteMany();
  await prisma.personCapacity.createMany({
    data: [
      { name: "Sarah", role: "Designer", capacity: 100, currentLoad: 78, status: "Good", execution: 88, developmentGoals: 1, priorities: ["HYBR OS design system", "Component library polish"], managerNote: "Healthy load. Good candidate for the next design review." },
      { name: "Tobi A.", role: "AI Engineer", capacity: 100, currentLoad: 108, status: "Overloaded", execution: 90, developmentGoals: 2, priorities: ["Meeting action AI prototype", "KPI explainability demo", "Data quality rules"], managerNote: "High productivity but current workload is above healthy capacity. Reprioritize before adding new tasks." },
      { name: "Daniel", role: "Analyst", capacity: 100, currentLoad: 60, status: "Available", execution: 82, developmentGoals: 1, priorities: ["Cash forecast model", "KPI dictionary QA"], managerNote: "Has room for additional analysis work this sprint." },
      { name: "Jenna", role: "Project Manager", capacity: 100, currentLoad: 92, status: "Watch", execution: 85, developmentGoals: 1, priorities: ["Prototype Sprint recovery plan", "HYBR OS MVP schedule"], managerNote: "Near capacity. Watch for overload if Prototype Sprint risk escalates." },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
