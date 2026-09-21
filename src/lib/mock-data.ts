import type {
  ActionItem,
  AlertItem,
  CashWeek,
  ContentItem,
  Invoice,
  Kpi,
  Opportunity,
  Project,
  WeeklyPriority,
} from "@/lib/types";

export const homeStats: Kpi[] = [
  { id: "execution", label: "Execution", value: "87%", sublabel: "This period", level: "green", trend: "up" },
  { id: "due-today", label: "Due today", value: "4", sublabel: "Actions", level: "amber" },
  { id: "alerts", label: "Alerts", value: "3", sublabel: "Need action", level: "red" },
  { id: "next-mtg", label: "Next mtg", value: "11:00", sublabel: "GTM check-in", level: "info" },
];

export const ceoScorecard: Kpi[] = [
  { id: "booked", label: "Booked Revenue", value: "$320K / $1M", sublabel: "32% of goal", level: "info" },
  { id: "coverage", label: "Pipeline Coverage", value: "2.8x", sublabel: "Target 3x+", level: "amber" },
  { id: "execution", label: "Execution", value: "87%", sublabel: "+4%", level: "green" },
  { id: "delivery", label: "Delivery Health", value: "8 / 10", sublabel: "1 at risk", level: "green" },
  { id: "cash", label: "Cash Runway", value: "4.2 mo", sublabel: "Watch", level: "amber" },
];

export const myPriorities = [
  "Complete UI review pack",
  "Approve sales stage fields",
  "Review overdue AR",
];

export const aiBrief =
  "Pipeline coverage fell below 3x because two opportunities moved into next quarter. Review the three at-risk deals.";

export const attentionAlerts: AlertItem[] = [
  {
    id: "a1",
    level: "red",
    title: "Pipeline coverage fell below 3x",
    detail: "Revenue target is at risk without $85K new qualified pipeline.",
    owner: "Growth Lead",
    action: "Create 3 account activation actions",
  },
  {
    id: "a2",
    level: "amber",
    title: "Project Beta milestone overdue",
    detail: "Delivery schedule may slip by 9 days.",
    owner: "Project Manager",
    action: "Resolve blocker or reset delivery plan",
  },
  {
    id: "a3",
    level: "amber",
    title: "Overdue receivables: $48K",
    detail: "Cash forecast at risk this month.",
    owner: "Finance/Admin",
    action: "Send reminder and escalate two clients",
  },
];

export const myActions: ActionItem[] = [
  {
    id: "act1",
    title: "Complete GTM account analysis",
    owner: "Charles",
    dueLabel: "Today",
    priority: "High",
    status: "Today",
    source: "GTM Check-in",
    expectedOutcome: "3 accounts prioritized for outreach this week",
    linkedKpi: "Pipeline Coverage",
  },
  {
    id: "act2",
    title: "Review HYBR OS design deck",
    owner: "Charles",
    dueLabel: "Today",
    priority: "High",
    status: "Today",
    source: "Product review",
    expectedOutcome: "Design system approved for Figma handoff",
  },
  {
    id: "act3",
    title: "Send invoice reminder",
    owner: "Charles",
    dueLabel: "Today",
    priority: "Medium",
    status: "Today",
    source: "Finance collections",
    expectedOutcome: "Client B reminded before Friday escalation",
    linkedKpi: "Overdue AR",
  },
  {
    id: "act4",
    title: "Send revised proposal to Access Bank",
    owner: "Charles",
    dueLabel: "Friday, Sep 4",
    priority: "High",
    status: "This Week",
    source: "GTM Check-in",
    expectedOutcome: "Move Access Bank to Commercial Alignment",
    linkedKpi: "Pipeline Coverage",
  },
  {
    id: "act5",
    title: "Approve sales stage fields",
    owner: "Charles",
    dueLabel: "This week",
    priority: "Medium",
    status: "This Week",
    source: "Admin — KPI dictionary",
    expectedOutcome: "Stage exit criteria enforced in pipeline",
  },
  {
    id: "act6",
    title: "Update Project Beta risk",
    owner: "Charles",
    dueLabel: "Overdue",
    priority: "High",
    status: "Overdue",
    source: "Delivery — Prototype-to-Proof Sprint",
    expectedOutcome: "Risk register reflects recruiting delay and mitigation",
    linkedKpi: "Project Health",
    blocked: true,
    blockedReason: "Need read from CTO before sending scope note",
  },
  {
    id: "act7",
    title: "Review overdue AR",
    owner: "Charles",
    dueLabel: "Overdue",
    priority: "High",
    status: "Overdue",
    source: "Finance dashboard",
    expectedOutcome: "Escalation path confirmed for Client D",
    linkedKpi: "Overdue AR",
  },
  {
    id: "act8",
    title: "Book UX reviewer for HYBR OS MVP",
    owner: "Charles",
    dueLabel: "Next week",
    priority: "Medium",
    status: "Upcoming",
    source: "Delivery — HYBR OS MVP",
    expectedOutcome: "UX review scheduled, unblocking critical path",
  },
  {
    id: "act9",
    title: "Prepare Q3 GTM/offer review",
    owner: "Charles",
    dueLabel: "Sep 15",
    priority: "Low",
    status: "Upcoming",
    source: "Quarterly cadence",
    expectedOutcome: "ICP and offer review deck drafted",
  },
  {
    id: "act10",
    title: "Publish HYBR OS design system pack",
    owner: "Charles",
    dueLabel: "Completed Sep 18",
    priority: "High",
    status: "Completed",
    source: "Product review",
    expectedOutcome: "Design tokens and components ready for build",
    completionEvidence: "Design system committed to repo, reviewed with partner.",
  },
];

export const weeklyPriorities: WeeklyPriority[] = [
  {
    id: "wp1",
    title: "Close pipeline gap",
    description: "Target $85K new qualified pipeline",
    connectedActions: 3,
  },
  {
    id: "wp2",
    title: "Approve HYBR OS UX blueprint",
    description: "Move to Figma design",
    connectedActions: 1,
  },
  {
    id: "wp3",
    title: "Resolve Project Beta blocker",
    description: "Return to green health status",
    connectedActions: 2,
  },
];

// --- Growth: Marketing ---

export const marketingStats: Kpi[] = [
  { id: "tier1-intent", label: "Tier-1 Accounts w/ New Intent", value: "9", sublabel: "Accounts this week", level: "green" },
  { id: "sourced-meetings", label: "Marketing-Sourced Meetings", value: "2", sublabel: "Completed", level: "info" },
  { id: "sourced-pipeline", label: "Marketing-Sourced Pipeline", value: "$95K", sublabel: "Qualified", level: "green" },
  { id: "content-intent", label: "Content-to-Intent Rate", value: "4.8%", sublabel: "High-intent / unique views", level: "amber" },
  { id: "indx", label: "INDX Completions", value: "6", sublabel: "Diagnostics", level: "info" },
];

export const marketingAiSummary =
  "The strongest commercial signal is coming from INDX completions and repeat visits to the Growth Opportunity page.";

export const contentItems: ContentItem[] = [
  { id: "c1", title: "Growth Playbook by Guesswork", theme: "GTM", icpReach: 2100, engaged: 320, intent: 18, meetings: 2, pipeline: 65000 },
  { id: "c2", title: "JD Breakdown", theme: "Framework", icpReach: 1450, engaged: 210, intent: 11, meetings: 1, pipeline: 30000 },
  { id: "c3", title: "Workflow Before AI", theme: "AI Ops", icpReach: 1820, engaged: 260, intent: 15, meetings: 0, pipeline: 0 },
  { id: "c4", title: "Case Study: Airline", theme: "Proof", icpReach: 940, engaged: 148, intent: 9, meetings: 1, pipeline: 0 },
  { id: "c5", title: "Friday Signal", theme: "Trigger", icpReach: 1260, engaged: 176, intent: 5, meetings: 0, pipeline: 0 },
];

export const intentAccounts = [
  { id: "ia1", name: "Access Bank", score: 67, signal: "INDX completed · viewed Growth Sprint page · 5 visits in 7 days" },
  { id: "ia2", name: "DFI Program X", score: 54, signal: "Webinar attended · service page visit · email click" },
  { id: "ia3", name: "Scale-up Logistics Co.", score: 42, signal: "Case study view · LinkedIn comment · funding trigger" },
];

// --- Growth: Sales ---

export const salesRevenueClock: Kpi[] = [
  { id: "booked", label: "Booked", value: "$320K", sublabel: "YTD", level: "info" },
  { id: "coverage", label: "Coverage", value: "2.8x", sublabel: "Below 3x target", level: "amber" },
  { id: "new-pipeline", label: "New Pipeline", value: "$65K", sublabel: "This week", level: "green" },
  { id: "meetings", label: "Meetings", value: "2", sublabel: "Qualified", level: "info" },
  { id: "next-actions", label: "Next Actions", value: "100%", sublabel: "Compliant", level: "green" },
];

export const revenueGoal = {
  goal: 1_000_000,
  booked: 320_000,
  openPipeline: 1_800_000,
  weighted: 720_000,
  gap: 680_000,
  monthsLeft: 8,
  runRate: 85_000,
};

// --- Finance ---

export const financeStats: Kpi[] = [
  { id: "cash-balance", label: "Cash Balance", value: "$142K", sublabel: "4.2 months runway", level: "amber" },
  { id: "invoiced", label: "Invoiced Revenue", value: "$88K", sublabel: "This month", level: "info" },
  { id: "collections", label: "Collections", value: "$64K", sublabel: "73% collected", level: "green" },
  { id: "overdue-ar", label: "Overdue AR", value: "$48K", sublabel: "Needs escalation", level: "red" },
  { id: "dso", label: "DSO", value: "34 days", sublabel: "Target 30", level: "amber" },
];

export const revenueFlow = [
  { id: "booked", label: "Booked", value: "$320K" },
  { id: "invoice", label: "Invoice", value: "$88K" },
  { id: "receivable", label: "Receivable", value: "$74K" },
  { id: "collected", label: "Collected", value: "$64K" },
  { id: "margin", label: "Margin", value: "36%" },
  { id: "cash", label: "Cash", value: "4.2 mo" },
];

export const invoices: Invoice[] = [
  {
    id: "inv-201",
    number: "INV-201",
    client: "Client A",
    value: 26_000,
    issued: "2026-08-12",
    due: "2026-09-11",
    overdueDays: 0,
    status: "Due",
    owner: "Finance",
    collectionActions: [{ label: "Reminder scheduled Sep 8", done: false }],
    source: ["Contract terms", "Milestone accepted", "Invoice issued", "Payment due date"],
    aiNote: "On track. No action required yet.",
  },
  {
    id: "inv-204",
    number: "INV-204",
    client: "Client B",
    value: 18_000,
    issued: "2026-08-01",
    due: "2026-08-31",
    overdueDays: 12,
    status: "Overdue",
    owner: "Finance",
    collectionActions: [
      { label: "Reminder sent Aug 28", done: true },
      { label: "Follow-up scheduled today", done: false },
      { label: "Escalate if unpaid by Friday", done: false },
    ],
    source: ["Contract terms", "Milestone accepted", "Invoice issued", "Payment due date"],
    aiNote: "This invoice is tied to a completed deliverable. Escalation is recommended if not paid by Friday.",
  },
  {
    id: "inv-198",
    number: "INV-198",
    client: "Client C",
    value: 24_000,
    issued: "2026-08-20",
    due: "2026-09-19",
    overdueDays: 0,
    status: "Due",
    owner: "Finance",
    collectionActions: [{ label: "No action required", done: true }],
    source: ["Contract terms", "Milestone accepted", "Invoice issued", "Payment due date"],
    aiNote: "On track. No action required yet.",
  },
  {
    id: "inv-195",
    number: "INV-195",
    client: "Client D",
    value: 30_000,
    issued: "2026-07-22",
    due: "2026-08-21",
    overdueDays: 21,
    status: "Overdue",
    owner: "Finance",
    collectionActions: [
      { label: "Reminder sent Aug 25", done: true },
      { label: "Escalation email sent Sep 3", done: true },
      { label: "Awaiting client finance response", done: false },
    ],
    source: ["Contract terms", "Milestone accepted", "Invoice issued", "Payment due date"],
    aiNote: "21 days overdue and past the standard escalation window. Recommend a CEO-level call this week.",
  },
];

export const cashForecast: CashWeek[] = [
  { week: 1, balance: 142_000, level: "green" },
  { week: 2, balance: 138_000, level: "green" },
  { week: 3, balance: 131_000, level: "green" },
  { week: 4, balance: 126_000, level: "green" },
  { week: 5, balance: 118_000, level: "green" },
  { week: 6, balance: 104_000, level: "amber" },
  { week: 7, balance: 96_000, level: "amber" },
  { week: 8, balance: 88_000, level: "amber" },
  { week: 9, balance: 79_000, level: "amber" },
  { week: 10, balance: 61_000, level: "red" },
  { week: 11, balance: 49_000, level: "red" },
  { week: 12, balance: 38_000, level: "red" },
  { week: 13, balance: 30_000, level: "red" },
];

export const cashGapTrigger =
  "Two overdue invoices and one delayed contract could reduce runway below 3 months.";

export const opportunities: Opportunity[] = [
  {
    id: "access-bank",
    name: "Growth Opportunity Sprint",
    account: "Access Bank",
    value: 120_000,
    stage: "Proposal",
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
    aiInsight:
      "Buyer emphasized speed and board pressure and failed pilots. Recommend framing proposal around decision speed and proof in 30 days.",
  },
  {
    id: "dfi-y",
    name: "Program Modernization",
    account: "DFI Program X",
    value: 88_000,
    stage: "Qualified",
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
    id: "scaleup-z",
    name: "Logistics Ops Diagnostic",
    account: "Scale-up Logistics Co.",
    value: 54_000,
    stage: "Engaged",
    owner: "Charles",
    closeDate: "2026-11-01",
    probability: 20,
    buyingGroup: [{ name: "COO", role: "Champion" }],
    activity: [{ label: "Case study viewed", done: true }],
    aiInsight: "Funding trigger detected — reach out before the round closes and priorities shift.",
  },
];

// --- Delivery ---

export const deliveryStats: Kpi[] = [
  { id: "project-health", label: "Project Health", value: "8 / 10", sublabel: "Healthy", level: "green" },
  { id: "milestone-ontime", label: "Milestone On-Time Rate", value: "84%", sublabel: "Target 90%", level: "amber" },
  { id: "quality", label: "Delivery Quality Score", value: "4.6 / 5", sublabel: "Client acceptance", level: "green" },
  { id: "project-margin", label: "Project Gross Margin", value: "36%", sublabel: "Blended", level: "amber" },
  { id: "client-outcome", label: "Client Outcome", value: "78%", sublabel: "NPS/CSAT", level: "green" },
];

export const projects: Project[] = [
  {
    id: "gtm-clarity-sprint",
    name: "GTM Clarity Sprint",
    client: "Client A",
    status: "Healthy",
    pm: "Charles",
    progress: 92,
    margin: 42,
    nextMilestone: "First review",
    currentStepIndex: 6,
    health: [
      { label: "Schedule", score: 90, level: "green" },
      { label: "Scope", score: 88, level: "green" },
      { label: "Quality", score: 92, level: "green" },
      { label: "Budget", score: 85, level: "green" },
      { label: "Team", score: 90, level: "green" },
    ],
    aiRiskNote: "On track for on-time delivery. No corrective action required.",
    risks: [
      { id: "r1", risk: "Client feedback delay", severity: "Low", owner: "Lead", action: "Send reminder", due: "Thu" },
    ],
    outcome: {
      reviewChecklist: [
        { label: "Decision brief accepted", done: true },
        { label: "Evidence threshold met", done: true },
        { label: "Client next-value need identified", done: true },
        { label: "Case study potential confirmed", done: true },
      ],
      expansionSignal: "Deploy opportunity",
      expansionValue: 110_000,
      caseEvidence:
        "Client quote, measurable result, before/after images, decision impact and a real deployment narrative captured for the case study.",
    },
  },
  {
    id: "hybr-os-mvp",
    name: "HYBR OS MVP",
    client: "Internal",
    status: "Watch",
    pm: "Product Lead",
    progress: 58,
    margin: null,
    nextMilestone: "UX review",
    currentStepIndex: 3,
    health: [
      { label: "Schedule", score: 65, level: "amber" },
      { label: "Scope", score: 70, level: "amber" },
      { label: "Quality", score: 80, level: "green" },
      { label: "Budget", score: 75, level: "green" },
      { label: "Team", score: 72, level: "amber" },
    ],
    aiRiskNote: "UX review pending is the critical path item. Confirm reviewer availability this week.",
    risks: [
      { id: "r2", risk: "UX review not scheduled", severity: "Medium", owner: "PM", action: "Book reviewer", due: "Wed" },
    ],
  },
  {
    id: "prototype-sprint",
    name: "Prototype-to-Proof Sprint",
    client: "Client B",
    status: "At Risk",
    pm: "Adia",
    progress: 38,
    margin: 22,
    nextMilestone: "Validation",
    currentStepIndex: 3,
    health: [
      { label: "Schedule", score: 40, level: "red" },
      { label: "Scope", score: 55, level: "amber" },
      { label: "Quality", score: 70, level: "green" },
      { label: "Budget", score: 35, level: "red" },
      { label: "Team", score: 60, level: "amber" },
    ],
    aiRiskNote:
      "Margin risk is driven by external research costs running 18% above plan. Review scope before the next validation round.",
    risks: [
      { id: "r3", risk: "Recruiting delay", severity: "High", owner: "PM", action: "Escalate with agency", due: "Today" },
      { id: "r4", risk: "Budget overrun", severity: "High", owner: "Product", action: "Renegotiate scope", due: "Fri" },
      { id: "r5", risk: "Contributor idle", severity: "Medium", owner: "Delivery", action: "Confirm resume date", due: "Wed" },
      { id: "r6", risk: "QA gaps", severity: "Low", owner: "Lead", action: "Schedule QA pass", due: "Thu" },
    ],
  },
  {
    id: "ai-productivity-reset",
    name: "AI Productivity Reset",
    client: "Client C",
    status: "Healthy",
    pm: "Charles",
    progress: 80,
    margin: 44,
    nextMilestone: "Pilot design",
    currentStepIndex: 5,
    health: [
      { label: "Schedule", score: 88, level: "green" },
      { label: "Scope", score: 84, level: "green" },
      { label: "Quality", score: 90, level: "green" },
      { label: "Budget", score: 86, level: "green" },
      { label: "Team", score: 88, level: "green" },
    ],
    aiRiskNote: "On track. Pilot design is the next milestone with no open blockers.",
    risks: [],
  },
  {
    id: "indx-lite",
    name: "INDX Lite",
    client: "HYBR",
    status: "Watch",
    pm: "Product Lead",
    progress: 45,
    margin: null,
    nextMilestone: "Beta users",
    currentStepIndex: 2,
    health: [
      { label: "Schedule", score: 68, level: "amber" },
      { label: "Scope", score: 72, level: "amber" },
      { label: "Quality", score: 75, level: "green" },
      { label: "Budget", score: 80, level: "green" },
      { label: "Team", score: 70, level: "amber" },
    ],
    aiRiskNote: "Beta user recruitment is behind plan by one week.",
    risks: [
      { id: "r7", risk: "Beta recruitment behind", severity: "Medium", owner: "Product", action: "Widen outreach", due: "Mon" },
    ],
  },
  {
    id: "innovation-diagnostic",
    name: "Innovation Diagnostic",
    client: "Client D",
    status: "Healthy",
    pm: "Charles",
    progress: 95,
    margin: 38,
    nextMilestone: "Final report",
    currentStepIndex: 6,
    health: [
      { label: "Schedule", score: 92, level: "green" },
      { label: "Scope", score: 90, level: "green" },
      { label: "Quality", score: 94, level: "green" },
      { label: "Budget", score: 88, level: "green" },
      { label: "Team", score: 90, level: "green" },
    ],
    aiRiskNote: "On track to close this week with no open risks.",
    risks: [],
  },
];
